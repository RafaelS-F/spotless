
'use client';

import React, { useState } from 'react';
import styles from './UserProfilePage.module.css';

const mockUserData = {
  name: 'Ana Silva',
  email: 'ana.silva@email.com',
  phone: '(31) 99999-8888',
  address: 'Rua das Flores, 123, Belo Horizonte, MG',
};

const mockServices = [
  { id: 1, type: 'Limpeza Padrão', date: '2025-05-10', status: 'Agendado' },
  { id: 2, type: 'Limpeza Pesada', date: '2025-04-15', status: 'Concluído' },
  { id: 3, type: 'Limpeza de Vidros', date: '2025-03-20', status: 'Concluído' },
];

const mockReviews = [
  { id: 1, author: 'Carlos Pereira', rating: 5, comment: 'Serviço impecável, recomendo!' },
  { id: 2, author: 'Mariana Costa', rating: 4, comment: 'Gostei muito da limpeza, profissional atenciosa.' },
  { id: 3, author: 'João Souza', rating: 5, comment: 'Rápido, eficiente e cuidadoso. Excelente!' },
];

type Tab = 'services' | 'data' | 'reviews';

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>('services');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUserData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      console.log('Salvando dados:', userData);
    }
    setIsEditing(!isEditing);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <div className={styles.serviceList}>
            <h2>Meus Serviços</h2>
            {mockServices.length > 0 ? (
              mockServices.map(service => (
                <div key={service.id} className={styles.serviceItem}>
                  <p><strong>Tipo:</strong> {service.type}</p>
                  <p><strong>Data:</strong> {service.date}</p>
                  <p><strong>Status:</strong> <span className={`${styles.status} ${styles[service.status.toLowerCase()]}`}>{service.status}</span></p>
                </div>
              ))
            ) : (
              <p>Você ainda não agendou nenhum serviço.</p>
            )}
          </div>
        );
      case 'data':
        return (
          <div className={styles.dataForm}>
            <h2>Meus Dados</h2>
            <div className={styles.formField}>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={!isEditing ? styles.readOnly : ''}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
                 className={!isEditing ? styles.readOnly : ''}
             />
            </div>
            <div className={styles.formField}>
              <label htmlFor="phone">Telefone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                readOnly={!isEditing}
                 className={!isEditing ? styles.readOnly : ''}
             />
            </div>
            <div className={styles.formField}>
              <label htmlFor="address">Endereço:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                readOnly={!isEditing}
                 className={!isEditing ? styles.readOnly : ''}
             />
            </div>
            <button onClick={toggleEdit} className={styles.editButton}>
              {isEditing ? 'Salvar Alterações' : 'Editar Dados'}
            </button>
          </div>
        );
      case 'reviews':
        return (
          <div className={styles.reviewList}>
            <h2>Avaliações de Clientes</h2>
            {mockReviews.map(review => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <strong>{review.author}</strong>
                  <span className={styles.rating}>{'⭐'.repeat(review.rating)}</span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Minha Conta Spotless</h1>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'services' ? styles.active : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Serviços
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'data' ? styles.active : ''}`}
          onClick={() => setActiveTab('data')}
        >
          Meus Dados
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Avaliações
        </button>
      </div>
      <div className={styles.tabContent}>
        {renderContent()}
      </div>
    </div>
  );
}
