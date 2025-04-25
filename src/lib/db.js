import { sql } from 'mssql';

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
    max: parseInt(process.env.AZURE_SQL_POOL_MAX),
    min: parseInt(process.env.AZURE_SQL_POOL_MIN),
    idleTimeoutMillis: 30000
  }
};

let pool;

export async function connectToDatabase() {
  if (pool) return pool;
  
  try {
    pool = await sql.connect(config);
    console.log('Conectado ao Azure SQL');
    return pool;
  } catch (err) {
    console.error('Erro de conexão:', err);
    throw err;
  }
}