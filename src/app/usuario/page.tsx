// src/app/usuario/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "./UserProfilePage.module.css";
// IMPORTAÇÃO DOS ÍCONES
import {
  User,
  ClipboardList,
  Star,
  Clock,
  CheckCircle,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

// Interface para os dados do usuário
interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Interface para os serviços
interface Service {
  id_servico: number;
  id_usuario: number;
  titulo: string;
  descricao: string;
  valor: number;
  localizacao: string;
  data_servico: string;
}

const mockReviews = [
  {
    id: 1,
    name: "Carlos Pereira",
    text: "Serviço impecável, recomendo!",
    rating: 5,
  },
  {
    id: 2,
    name: "Mariana Costa",
    text: "Gostei muito da limpeza, profissional atenciosa.",
    rating: 4,
  },
  {
    id: 3,
    name: "João Souza",
    text: "Rápido, eficiente e cuidadoso. Excelente!",
    rating: 5,
  },
];

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("meus-dados");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para novo serviço
  const [newService, setNewService] = useState({
    titulo: "",
    descricao: "",
    valor: "",
    localizacao: "",
    data_servico: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user/me");
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `Falha ao buscar dados (status: ${res.status}). Por favor, faça login novamente.`
          );
        }
        const data = await res.json();
        setUserData({
          name: data.nome || "",
          email: data.email || "",
          phone: data.telefone || "(Preencha seu telefone)",
          address: data.endereco || "(Preencha seu endereço)",
        });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (activeTab === "servicos") {
      fetchServices();
    }
  }, [activeTab]);

  const fetchServices = async () => {
    try {
      // Substituição da chamada mock por API real
      const res = await fetch("/api/servicos/meus-servicos");
      if (!res.ok) {
        throw new Error("Falha ao carregar serviços.");
      }
      const data = await res.json();
      setServices(data);
    } catch (err: any) {
      setError("Erro ao carregar serviços: " + err.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;
    setUserData((prevData) => ({
      ...prevData!,
      [e.target.name]: e.target.value,
    }));
  };

  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewService({
      ...newService,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!userData) return;
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao salvar");
      setSuccess("Dados salvos com sucesso!");
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmitService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Substituição da simulação por chamada real à API
      const res = await fetch("/api/servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha ao postar serviço.");
      }

      const newServiceObj = await res.json();
      setServices([...services, newServiceObj]);
      setSuccess("Serviço postado com sucesso!");
      setIsModalOpen(false);
      setNewService({
        titulo: "",
        descricao: "",
        valor: "",
        localizacao: "",
        data_servico: "",
      });
    } catch (err: any) {
      setError("Erro ao postar serviço: " + err.message);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        // Chamada real à API de exclusão
        const res = await fetch(`/api/servicos/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Falha ao excluir serviço.");
        }

        setServices(services.filter((service) => service.id_servico !== id));
        setSuccess("Serviço excluído com sucesso!");
      } catch (err: any) {
        setError("Erro ao excluir serviço: " + err.message);
      }
    }
  };

  // Renderizar ícones de estrela
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={index < rating ? styles.starFilled : styles.starEmpty}
      />
    ));
  };

  if (isLoading) {
    return <div className={styles.profileContainer}>Carregando...</div>;
  }

  if (error && !userData) {
    return (
      <div className={styles.profileContainer}>
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Minha Conta Spotless</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "servicos" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("servicos")}
        >
          <ClipboardList className={styles.icon} /> <span>Serviços</span>
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "meus-dados" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("meus-dados")}
        >
          <User className={styles.icon} /> <span>Meus Dados</span>
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "avaliacoes" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("avaliacoes")}
        >
          <Star className={styles.icon} /> <span>Avaliações</span>
        </button>
      </div>

      {activeTab === "meus-dados" && (
        <div className={styles.tabContent}>
          <div className={styles.dataForm}>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && (
              <div className="alert alert-success mt-3">{success}</div>
            )}
            {userData && (
              <>
                <div className={styles.formField}>
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={!isEditing ? styles.readOnly : ""}
                  />
                </div>
                <div className={styles.formField}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    readOnly
                    className={styles.readOnly}
                  />
                </div>
                <div className={styles.formField}>
                  <label htmlFor="phone">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={!isEditing ? styles.readOnly : ""}
                  />
                </div>
                <div className={styles.formField}>
                  <label htmlFor="address">Endereço</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={!isEditing ? styles.readOnly : ""}
                  />
                </div>
                {isEditing ? (
                  <button onClick={handleSave} className={styles.actionButton}>
                    Salvar Alterações
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setSuccess("");
                    }}
                    className={styles.actionButton}
                  >
                    <Pencil size={16} /> Editar Dados
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === "servicos" && (
        <div className={`${styles.tabContent} ${styles.serviceList}`}>
          <div className={styles.serviceHeader}>
            <h2>Meus Serviços Postados</h2>
            <button
              className={styles.postButton}
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18} /> Postar Serviço
            </button>
          </div>

          {services.length === 0 ? (
            <div className={styles.noServices}>
              <p>Você ainda não postou nenhum serviço.</p>
            </div>
          ) : (
            services.map((service) => (
              <div key={service.id_servico} className={styles.serviceItem}>
                <div className={styles.serviceInfo}>
                  <div>
                    <span className={styles.serviceType}>{service.titulo}</span>
                    <p className={styles.serviceDescription}>
                      {service.descricao}
                    </p>
                  </div>
                  <div className={styles.serviceDetails}>
                    <span>
                      <strong>Valor:</strong> R${service.valor.toFixed(2)}
                    </span>
                    <span>
                      <strong>Local:</strong> {service.localizacao}
                    </span>
                    <span>
                      <strong>Data:</strong>{" "}
                      {new Date(service.data_servico).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </div>
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteService(service.id_servico)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "avaliacoes" && (
        <div className={`${styles.tabContent} ${styles.reviewList}`}>
          {mockReviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewName}>{review.name}</span>
                <div className={styles.rating}>
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className={styles.reviewText}>"{review.text}"</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Postagem de Serviço */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Postar Novo Serviço</h2>
            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <form onSubmit={handleSubmitService} className={styles.serviceForm}>
              <div className={styles.formField}>
                <label htmlFor="titulo">Título*</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={newService.titulo}
                  onChange={handleServiceChange}
                  required
                />
              </div>

              <div className={styles.formField}>
                <label htmlFor="descricao">Descrição*</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={newService.descricao}
                  onChange={handleServiceChange}
                  required
                  rows={4}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label htmlFor="valor">Valor (R$)*</label>
                  <input
                    type="number"
                    id="valor"
                    name="valor"
                    value={newService.valor}
                    onChange={handleServiceChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label htmlFor="data_servico">Data do Serviço*</label>
                  <input
                    type="date"
                    id="data_servico"
                    name="data_servico"
                    value={newService.data_servico}
                    onChange={handleServiceChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formField}>
                <label htmlFor="localizacao">Localização*</label>
                <input
                  type="text"
                  id="localizacao"
                  name="localizacao"
                  value={newService.localizacao}
                  onChange={handleServiceChange}
                  required
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.submitButton}>
                  Postar Serviço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
