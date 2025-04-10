import { connectToDatabase } from '@/lib/db';
import { sql } from 'mssql';

export async function GET() {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT * FROM sua_tabela');
    return Response.json(result.recordset);
  } catch (error) {
    return Response.json(
      { error: 'Database error', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const { nome, email } = await request.json();
  
  try {
    const pool = await connectToDatabase();
    await pool.request()
      .input('nome', sql.NVarChar, nome)
      .input('email', sql.NVarChar, email)
      .query('INSERT INTO Usuarios (Nome, Email) VALUES (@nome, @email)');
    
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: 'Falha na inserção', details: error.message },
      { status: 500 }
    );
  }
}