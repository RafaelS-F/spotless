import sql from 'mssql';

const requiredEnv = [
  'AZURE_SQL_SERVER',
  'AZURE_SQL_DATABASE',
  'AZURE_SQL_USER',
  'AZURE_SQL_PASSWORD'
];

// Mensagem de erro corrigida para Render
for (const name of requiredEnv) {
  if (!process.env[name]) {
    throw new Error(
      `Variável de ambiente "${name}" não definida. ` +
      `Verifique as configurações no Render.`
    );
  }
}

const config = {
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// Gerenciamento de conexão otimizado para serverless
let pool;
let connectionAttempts = 0;

export async function connectToDatabase() {
  if (pool && pool.connected) return pool;
  
  try {
    // Limitar tentativas de reconexão
    if (connectionAttempts > 2) {
      throw new Error('Máximo de tentativas de conexão excedido');
    }
    
    connectionAttempts++;
    pool = new sql.ConnectionPool(config);
    await pool.connect();
    console.log('✅ Conexão com SQL estabelecida');
    connectionAttempts = 0; // Resetar contador após sucesso
    return pool;
  } catch (error) {
    console.error('❌ Erro de conexão:', error);
    
    // Fechar pool em caso de erro
    if (pool) {
      try {
        await pool.close();
      } catch (e) {
        console.error('Erro ao fechar pool:', e);
      }
      pool = null;
    }
    
    throw new Error(`Falha na conexão com o banco: ${error.message}`);
  }
}

// Gerenciar fechamento de conexão
process.on('SIGTERM', async () => {
  if (pool) {
    try {
      await pool.close();
      console.log('Pool de conexão fechado');
    } catch (error) {
      console.error('Erro ao fechar pool:', error);
    }
  }
});