export const runtime = "nodejs";
import { connectToDatabase } from "@/lib/db";
import sql from "mssql";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret"
);

export async function GET(request) {
  try {
    // Verificar o token do usuário
    const tokenCookie = request.cookies.get("sessionToken");
    if (!tokenCookie) {
      return NextResponse.json(
        { error: "Não autorizado: Sem token" },
        { status: 401 }
      );
    }

    const token = tokenCookie.value;
    let decodedPayload;
    try {
      const { payload } = await jwtVerify(token, SECRET);
      decodedPayload = payload;
    } catch (e) {
      console.error("Erro de verificação de token:", e);
      return NextResponse.json(
        { error: "Não autorizado: Token inválido" },
        { status: 401 }
      );
    }

    const userId = decodedPayload.userId;

    // Conectar ao banco
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("id_usuario", sql.Int, userId)
      .query("SELECT * FROM dbo.servicos WHERE id_usuario = @id_usuario");

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return NextResponse.json(
      { error: "Falha ao buscar serviços", details: error.message },
      { status: 500 }
    );
  }
}
