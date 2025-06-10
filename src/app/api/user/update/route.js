// src/app/api/user/update/route.js
import { connectToDatabase } from '@/lib/db';
import sql from 'mssql';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function PUT(request) {
  try {
    // 1. Verificar o token do usuário
    const tokenCookie = request.cookies.get('sessionToken');
    if (!tokenCookie) {
      return NextResponse.json({ error: 'Não autorizado: Sem token' }, { status: 401 });
    }

    const token = tokenCookie.value;
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (e) {
      return NextResponse.json({ error: 'Não autorizado: Token inválido' }, { status: 401 });
    }

    const userId = decoded.userId;

    // 2. Pegar os dados da requisição
    const { name, phone, address } = await request.json();
    if (!name || !phone || !address) {
      return NextResponse.json({ error: 'Todos os campos são necessários.' }, { status: 400 });
    }

    // 3. Atualizar no banco de dados
    const pool = await connectToDatabase();
    await pool.request()
      .input('id_usuario', sql.Int, userId)
      .input('nome', sql.NVarChar, name)
      .input('telefone', sql.NVarChar, phone)
      .input('endereco', sql.NVarChar, address)
      .query('UPDATE dbo.usuarios SET nome = @nome, telefone = @telefone, endereco = @endereco WHERE id_usuario = @id_usuario');

    return NextResponse.json({ success: true, message: 'Dados atualizados com sucesso!' });

  } catch (error) {
    console.error('Erro na API de atualização de usuário:', error);
    return NextResponse.json({ error: 'Falha ao atualizar dados', details: error.message }, { status: 500 });
  }
}
