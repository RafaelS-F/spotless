// src/app/usuario/page.tsx
'use client'; 

import React, { useState, useEffect } from 'react';
import styles from './UserProfilePage.module.css';
// IMPORTAÇÃO DOS ÍCONES
import { User, ClipboardList, Star, Clock, CheckCircle, Pencil } from 'lucide-react';

// Interface para os dados do usuário
interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// --- DADOS DE EXEMPLO (MOCK DATA) ---
const mockServices = [
  { id: 1, type: 'Limpeza Padrão', date: '2025-05-10', status: 'Agendado' },
  { id: 2, type: 'Limpeza Pesada', date: '2025-04-15', status: 'Concluído' },
  { id: 3, type: 'Limpeza de Vidros', date: '2025-03-20', status: 'Concluído' },
];

const mockReviews = [
  { id: 1, name: 'Carlos Pereira', text: 'Serviço impecável, recomendo!', rating: 5 },
  { id: 2, name: 'Mariana Costa', text: 'Gostei muito da limpeza, profissional atenciosa.', rating: 4 },
  { id: 3, name: 'João Souza', text: 'Rápido, eficiente e cuidadoso. Excelente!', rating: 5 },
];

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('meus-dados');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user/me');
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `Falha ao buscar dados (status: ${res.status}). Por favor, faça login novamente.`);
        }
        const data = await res.json();
        setUserData({
            name: data.nome || '',
            email: data.email || '',
            phone: data.telefone || '(Preencha seu telefone)', 
            address: data.endereco || '(Preencha seu endereço)',
        });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;
    setUserData(prevData => ({ ...prevData!, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!userData) return;
    setError(''); setSuccess('');
    try {
        const res = await fetch('/api/user/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userData.name, phone: userData.phone, address: userData.address })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha ao salvar');
        setSuccess('Dados salvos com sucesso!');
        setIsEditing(false);
    } catch (err: any) {
        setError(err.message);
    }
  };

  // NOVA FUNÇÃO PARA RENDERIZAR ÍCONES DE ESTRELA
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} size={20} className={index < rating ? styles.starFilled : styles.starEmpty} />
    ));
  };

  if (isLoading) {
      return <div className={styles.profileContainer}>Carregando...</div>;
  }
  
  if (error && !userData) {
      return <div className={styles.profileContainer}><div className="alert alert-danger">{error}</div></div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Minha Conta Spotless</h1>

      <div className={styles.tabs}>
        <button className={`${styles.tabButton} ${activeTab === 'servicos' ? styles.active : ''}`} onClick={() => setActiveTab('servicos')}>
          <ClipboardList className={styles.icon} /> <span>Serviços</span>
        </button>
        <button className={`${styles.tabButton} ${activeTab === 'meus-dados' ? styles.active : ''}`} onClick={() => setActiveTab('meus-dados')}>
          <User className={styles.icon} /> <span>Meus Dados</span>
        </button>
        <button className={`${styles.tabButton} ${activeTab === 'avaliacoes' ? styles.active : ''}`} onClick={() => setActiveTab('avaliacoes')}>
          <Star className={styles.icon} /> <span>Avaliações</span>
        </button>
      </div>
      
      {activeTab === 'meus-dados' && (
        <div className={styles.tabContent}>
          <div className={styles.dataForm}>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
            {userData && ( <>
              <div className={styles.formField}>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" value={userData.name} onChange={handleInputChange} readOnly={!isEditing} className={!isEditing ? styles.readOnly : ''} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={userData.email} readOnly className={styles.readOnly} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="phone">Telefone</label>
                <input type="tel" id="phone" name="phone" value={userData.phone} onChange={handleInputChange} readOnly={!isEditing} className={!isEditing ? styles.readOnly : ''} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="address">Endereço</label>
                <input type="text" id="address" name="address" value={userData.address} onChange={handleInputChange} readOnly={!isEditing} className={!isEditing ? styles.readOnly : ''} />
              </div>
              {isEditing ? (
                <button onClick={handleSave} className={styles.actionButton}>Salvar Alterações</button>
              ) : (
                <button onClick={() => { setIsEditing(true); setSuccess(''); }} className={styles.actionButton}>
                  <Pencil size={16} /> Editar Dados
                </button>
              )}
            </> )}
          </div>
        </div>
      )}

      {activeTab === 'servicos' && (
        <div className={`${styles.tabContent} ${styles.serviceList}`}>
            {mockServices.map(service => (
                <div key={service.id} className={styles.serviceItem}>
                    <div className={styles.serviceInfo}>
                        <span className={styles.serviceType}>{service.type}</span>
                        <span className={styles.serviceDate}>{new Date(service.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</span>
                    </div>
                    <div className={`${styles.status} ${service.status === 'Agendado' ? styles.agendado : styles.concluído}`}>
                        {service.status === 'Agendado' ? <Clock size={16} /> : <CheckCircle size={16} />}
                        <span>{service.status}</span>
                    </div>
                </div>
            ))}
        </div>
      )}

      {activeTab === 'avaliacoes' && (
        <div className={`${styles.tabContent} ${styles.reviewList}`}>
            {mockReviews.map(review => (
                <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                        <span className={styles.reviewName}>{review.name}</span>
                        <div className={styles.rating}>{renderStars(review.rating)}</div>
                    </div>
                    <p className={styles.reviewText}>"{review.text}"</p>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}