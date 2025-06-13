// src/app/api/user/me/route.js
export const runtime = 'nodejs';
import { connectToDatabase } from '@/lib/db';
import sql from 'mssql';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
export const dynamic = 'force-dynamic';
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');

export async function GET(request) {
  console.log("1. API /api/user/me chamada."); // LOG 1
  try {
    const tokenCookie = request.cookies.get('sessionToken');
    if (!tokenCookie) {
      console.log("Erro: Token não encontrado no cookie.");
      return NextResponse.json({ error: 'Não autorizado: Sem token' }, { status: 401 });
    }
    
    console.log("2. Token encontrado. Verificando..."); // LOG 2
    const token = tokenCookie.value;
    let decodedPayload;

    try {
      const { payload } = await jwtVerify(token, SECRET);
      decodedPayload = payload;
      console.log("3. Token verificado com sucesso. UserID:", decodedPayload.userId); // LOG 3
    } catch (e) {
      console.error('Erro de verificação de token:', e);
      return NextResponse.json({ error: 'Não autorizado: Token inválido' }, { status: 401 });
    }

    const userId = decodedPayload.userId;

    console.log("4. Conectando ao banco de dados..."); // LOG 4
    const pool = await connectToDatabase();
    console.log("5. Conectado! Buscando dados do usuário..."); // LOG 5
    
    const result = await pool.request()
      .input('id_usuario', sql.Int, userId)
      .query('SELECT nome, email, telefone, endereco FROM dbo.usuarios WHERE id_usuario = @id_usuario');
    
    console.log("6. Busca no banco de dados concluída."); // LOG 6

    if (result.recordset.length === 0) {
      console.log("Erro: Usuário não encontrado no banco de dados com ID:", userId);
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const user = result.recordset[0];
    console.log("7. Retornando dados do usuário."); // LOG 7

    return NextResponse.json(user);

  } catch (error) {
    console.error('Erro crítico na API /api/user/me:', error);
    return NextResponse.json({ error: 'Falha ao buscar dados do usuário', details: error.message }, { status: 500 });
  }
}
