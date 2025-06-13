// src/app/api/servicos/buscar/route.js
export const runtime = "nodejs";
import { connectToDatabase } from "@/lib/db";
import sql from "mssql";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filtro = searchParams.get("filtro") || "";

    const pool = await connectToDatabase();

    let query = `
      SELECT 
        s.id_servico,
        s.titulo,
        s.descricao,
        s.valor,
        s.localizacao,
        s.data_servico,
        u.nome AS usuario
      FROM dbo.servicos s
      INNER JOIN dbo.usuarios u ON s.id_usuario = u.id_usuario
      WHERE s.titulo LIKE '%' + @filtro + '%' 
         OR s.descricao LIKE '%' + @filtro + '%'
         OR u.nome LIKE '%' + @filtro + '%'
    `;

    const result = await pool
      .request()
      .input("filtro", sql.NVarChar, filtro)
      .query(query);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return NextResponse.json(
      { error: "Falha ao buscar serviços", details: error.message },
      { status: 500 }
    );
  }
}
