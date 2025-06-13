export const runtime = "nodejs";
import { connectToDatabase } from "@/lib/db";
import sql from "mssql";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret"
);

export async function POST(request) {
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
    const { titulo, descricao, valor, localizacao, data_servico } =
      await request.json();

    // Validar entrada
    if (!titulo || !descricao || !valor || !localizacao || !data_servico) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    // Conectar ao banco
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("id_usuario", sql.Int, userId)
      .input("titulo", sql.NVarChar, titulo)
      .input("descricao", sql.NVarChar, descricao)
      .input("valor", sql.Decimal(10, 2), valor)
      .input("localizacao", sql.NVarChar, localizacao)
      .input("data_servico", sql.Date, data_servico)
      .query(
        "INSERT INTO dbo.servicos (id_usuario, titulo, descricao, valor, localizacao, data_servico) OUTPUT INSERTED.* VALUES (@id_usuario, @titulo, @descricao, @valor, @localizacao, @data_servico)"
      );

    if (result.recordset.length > 0) {
      return NextResponse.json(result.recordset[0], { status: 201 });
    } else {
      throw new Error("Falha ao inserir serviço.");
    }
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    return NextResponse.json(
      { error: "Falha ao criar serviço", details: error.message },
      { status: 500 }
    );
  }
}
