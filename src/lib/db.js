// src/lib/db.js
import sql from 'mssql';

const requiredEnv = [
  'AZURE_SQL_SERVER',
  'AZURE_SQL_DATABASE',
  'AZURE_SQL_USER',
  'AZURE_SQL_PASSWORD'
];

// Validação das variáveis de ambiente
for (const name of requiredEnv) {
  if (!process.env[name]) {
    throw new Error(
      `Variável de ambiente "${name}" não definida. Verifique as configurações no Netlify.`
    );
  }
}

// Configuração da conexão com o SQL Server
const config = {
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  options: {
    encrypt: true,
    trustServerCertificate: false
  },
  pool: {
    max: parseInt(process.env.AZURE_SQL_POOL_MAX || '10', 10),
    min: parseInt(process.env.AZURE_SQL_POOL_MIN || '0', 10),
    idleTimeoutMillis: 30000
  }
};

// Instância de pool global para evitar múltiplas conexões em ambientes serverless
let pool;

export async function connectToDatabase() {
  if (pool) return pool;

  try {
    pool = await sql.connect(config);
    console.log('✅ Conectado ao banco de dados SQL Server com sucesso.');
    return pool;
  } catch (error) {
    console.error('❌ Erro ao conectar no banco de dados:', error);
    throw new Error(`Erro de conexão com o banco de dados: ${error.message}`);
  }
}
