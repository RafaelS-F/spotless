
import sql from 'mssql';

const config = {
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
  pool: {
    max: 1,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

export async function connectToDatabase() {
  try {
    const pool = new sql.ConnectionPool(config);
    await pool.connect();
    console.log('✅ Conexão com SQL estabelecida');
    return pool;
  } catch (error) {
    console.error('❌ Erro de conexão:', error);
    throw new Error(`Falha na conexão com o banco: ${error.message}`);
  }
}