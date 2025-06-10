// src/app/api/database/route.js

import { connectToDatabase } from '@/lib/db';
import { sql } from 'mssql';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      // Se quiser filtrar por tipo (user/services/reviews), descomente abaixo:
      // .input('tipo', sql.NVarChar, request.nextUrl.searchParams.get('tipo'))
      // .query('SELECT * FROM ' + (request.nextUrl.searchParams.get('tipo') || 'sua_tabela'));
      .query('SELECT * FROM sua_tabela');

    return NextResponse.json(result.recordset, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Database error', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { nome, email } = await request.json();
    const pool = await connectToDatabase();

    await pool.request()
      .input('nome', sql.NVarChar, nome)
      .input('email', sql.NVarChar, email)
      .query('INSERT INTO Usuarios (Nome, Email) VALUES (@nome, @email)');

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha na inserção', details: error.message },
      { status: 500 }
    );
  }
}
