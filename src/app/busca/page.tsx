// src/app/busca/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import { Clock } from "lucide-react"; // Importando ícone para status

// Interface para os serviços
interface Service {
  id_servico: number;
  id_usuario: number;
  usuario: string;
  titulo: string;
  descricao: string;
  valor: number;
  localizacao: string;
  data_servico: string;
  status: string; // Adicionando status para possível uso futuro
}

const categorias = [
  "Limpeza Residencial",
  "Limpeza Pós-Obra",
  "Limpeza Comercial",
];

export default function PaginaBusca() {
  const [filtro, setFiltro] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [servicos, setServicos] = useState<Service[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Função para buscar serviços
  const buscarServicos = async (termo: string) => {
    setCarregando(true);
    setErro("");
    try {
      const res = await fetch(
        `/api/servicos/buscar?filtro=${encodeURIComponent(termo)}`
      );
      if (!res.ok) {
        throw new Error("Falha ao buscar serviços");
      }
      const dados = await res.json();
      setServicos(dados);
    } catch (err) {
      setErro("Erro ao carregar serviços. Tente novamente.");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  // Busca inicial ao montar o componente
  useEffect(() => {
    buscarServicos("");
  }, []);

  const handleCategoriaClick = (cat: string) => {
    setCategoriaSelecionada(cat);
    setFiltro(cat);
    buscarServicos(cat);
  };

  const realizarBusca = () => {
    buscarServicos(filtro);
  };

  // Formatar data para exibição
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
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
        {carregando ? (
          <p>Carregando serviços...</p>
        ) : erro ? (
          <p className={styles.erro}>{erro}</p>
        ) : servicos.length === 0 ? (
          <p>Nenhum serviço encontrado.</p>
        ) : (
          servicos.map((servico) => (
            <div key={servico.id_servico} className={styles.columnSecao2}>
              <div className={styles.tituloRow}>
                <h3>{servico.titulo}</h3>
              </div>
              <div className={styles.descriptionRow}>
                <p>{servico.descricao}</p>
              </div>
              <div className={styles.valueRow}>
                <p>R${servico.valor.toFixed(2)}</p>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                <strong>Local:</strong> {servico.localizacao}
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                <strong>Data:</strong> {formatarData(servico.data_servico)}
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                <strong>Solicitante:</strong> {servico.usuario}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "10px",
                  color: "#f57f17",
                  backgroundColor: "#fff8e1",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  width: "fit-content",
                }}
              >
                <Clock size={16} />
                <span>Disponível</span>
              </div>
              <div className={styles.buttonRow}>
                <button className={styles.button}>Ver Detalhes</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
