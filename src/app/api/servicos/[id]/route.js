export const runtime = "nodejs";
import { connectToDatabase } from "@/lib/db";
import sql from "mssql";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret"
);

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

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
      .input("id_servico", sql.Int, id)
      .input("id_usuario", sql.Int, userId)
      .query(
        "DELETE FROM dbo.servicos WHERE id_servico = @id_servico AND id_usuario = @id_usuario"
      );

    if (result.rowsAffected[0] > 0) {
      return NextResponse.json({
        success: true,
        message: "Serviço excluído com sucesso!",
      });
    } else {
      return NextResponse.json(
        {
          error:
            "Serviço não encontrado ou você não tem permissão para excluí-lo.",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Erro ao excluir serviço:", error);
    return NextResponse.json(
      { error: "Falha ao excluir serviço", details: error.message },
      { status: 500 }
    );
  }
}
