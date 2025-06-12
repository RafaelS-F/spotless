// src/app/api/auth/register/route.js
export const runtime = 'nodejs';
import { connectToDatabase } from '@/lib/db';
import sql from 'mssql';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      );
    }

    const pool = await connectToDatabase();

    // 1. Verificar se o usuário já existe
    const userExistsResult = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM dbo.usuarios WHERE email = @email');

    if (userExistsResult.recordset.length > 0) {
      return NextResponse.json(
        { error: 'Este email já está em uso.' },
        { status: 409 } // 409 Conflict
      );
    }

    // 2. Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Inserir o novo usuário no banco
    // CORREÇÃO FINAL: Usando 'contratante' que é o valor permitido pela regra do banco.
    await pool.request()
      .input('nome', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .input('senha', sql.NVarChar, hashedPassword)
      .query('INSERT INTO dbo.usuarios (nome, email, senha, tipo_usuario) VALUES (@nome, @email, @senha, \'contratante\')');

    return NextResponse.json(
      { success: true, message: 'Usuário cadastrado com sucesso!' },
      { status: 201 }
    );
  } catch (error) {
    // Log do erro completo no console do servidor para depuração
    console.error('Erro na API de registro:', error);
    return NextResponse.json(
      { error: 'Falha ao registrar usuário', details: error.message },
      { status: 500 }
    );
  }
}
