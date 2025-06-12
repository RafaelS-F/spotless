// src/app/api/auth/logout/route.js
export const runtime = 'nodejs';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST() {
  // Apaga o cookie definindo sua idade máxima como -1
  const seralized = serialize('sessionToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });

  const response = NextResponse.json({ success: true, message: 'Logout bem-sucedido!' });
  response.headers.set('Set-Cookie', seralized);

  return response;
}
