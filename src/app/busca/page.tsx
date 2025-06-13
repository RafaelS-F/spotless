"use client";

import React, { useState } from "react";
import styles from "../page.module.css";

const categorias = [
  "Limpeza Residencial",
  "Limpeza Pós-Obra",
  "Limpeza Comercial",
];

const resultadosMock = [
  {
    id: 1,
    usuario: "Carlos Souza",
    titulo: "Preciso de limpeza residencial em apartamento pequeno",
    descricao:
      "Preciso de alguém para limpar meu apartamento de 2 quartos. Já tenho produtos.",
    localizacao: "Belo Horizonte - MG",
    data: "2025-06-10",
    preco: "R$ 90,00",
  },
];

export default function PaginaBusca() {
  const [filtro, setFiltro] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const handleCategoriaClick = (cat: string) => {
    setCategoriaSelecionada(cat);
    setFiltro(cat);
  };

  const realizarBusca = () => {
    console.log("Buscando por:", filtro);
  };

  return (
    <section className={styles.section2}>
      <div className={styles.row1}>
        <h2>Buscar Serviços</h2>

        {/* Barra de busca + botão */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Digite o tipo de serviço..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
              width: "100%",
              maxWidth: "400px",
              fontSize: "1rem",
            }}
          />
          <button onClick={realizarBusca} className={styles.button}>
            Procurar
          </button>
        </div>

        {/* Botões de categorias */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          {categorias.map((cat) => {
            const isActive = categoriaSelecionada === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoriaClick(cat)}
                style={{
                  backgroundColor: isActive
                    ? "var(--background-button-primary)"
                    : "var(--background-card)",
                  color: isActive
                    ? "var(--text-on-primary-button)"
                    : "var(--text-headings)",
                  border: `2px solid ${
                    isActive
                      ? "var(--background-button-primary)"
                      : "var(--border-color)"
                  }`,
                  padding: "0.6rem 1.2rem",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  boxShadow: isActive
                    ? "0 4px 10px rgba(0, 0, 0, 0.2)"
                    : "0 2px 5px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span role="img" aria-label="ícone de busca">
                  🔎
                </span>{" "}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resultados da busca */}
      <div className={styles.row2} style={{ marginTop: "3rem" }}>
        {resultadosMock.map((item) => (
          <div key={item.id} className={styles.columnSecao2}>
            <div className={styles.tituloRow}>
              <h3>{item.titulo}</h3>
            </div>
            <div className={styles.descriptionRow}>
              <p>{item.descricao}</p>
            </div>
            <div className={styles.valueRow}>
              <p>{item.preco}</p>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              <strong>Local:</strong> {item.localizacao}
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              <strong>Data desejada:</strong> {item.data}
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              <strong>Solicitante:</strong> {item.usuario}
            </p>
            <div className={styles.buttonRow}>
              <button className={styles.button}>Ver Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
