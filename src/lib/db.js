// src/lib/db.js

import sql from 'mssql';

const requiredEnv = [
  'AZURE_SQL_SERVER',
  'AZURE_SQL_DATABASE',
  'AZURE_SQL_USER',
  'AZURE_SQL_PASSWORD'
];

for (const name of requiredEnv) {
  if (!process.env[name]) {
    throw new Error(
      `Variável de ambiente "${name}" não definida. ` +
      `Verifique seu .env.local e reinicie o servidor.`
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
    trustServerCertificate: false
  },
  pool: {
    max: parseInt(process.env.AZURE_SQL_POOL_MAX || '10', 10),
    min: parseInt(process.env.AZURE_SQL_POOL_MIN || '0', 10),
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
