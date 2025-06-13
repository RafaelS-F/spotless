// src/app/api/auth/login/route.js
export const runtime = 'nodejs';
import { connectToDatabase } from '@/lib/db';
import sql from 'mssql';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
// Usando 'jose' para criar o token, para ser consistente
import { SignJWT } from 'jose';
import { serialize } from 'cookie';
export const dynamic = 'force-dynamic';

const MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios.' }, { status: 400 });
    }

    const pool = await connectToDatabase();
    const userResult = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM dbo.usuarios WHERE email = @email');

    if (userResult.recordset.length === 0) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
    }

    const user = userResult.recordset[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.senha);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
    }
    
    // Se a senha estiver correta, crie o token JWT com 'jose'
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
    const token = await new SignJWT({ 
        userId: user.id_usuario,
        email: user.email, 
        name: user.nome, 
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${MAX_AGE}s`)
      .sign(secret);

    const seralized = serialize('sessionToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: MAX_AGE,
      path: '/',
    });

    const response = NextResponse.json({ success: true, message: 'Login bem-sucedido!' });
    response.headers.set('Set-Cookie', seralized);

    return response;

  } catch (error) {
    console.error('Erro na API de login:', error);
    return NextResponse.json({ error: 'Falha ao tentar fazer login', details: error.message }, { status: 500 });
  }
}
