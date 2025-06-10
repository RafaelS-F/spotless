// src/app/usuario/page.tsx
'use client'; 

import React, { useState, useEffect } from 'react';
import styles from './UserProfilePage.module.css'; 

// Interface para os dados do usuário
interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function UserProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // LOG DE DIAGNÓSTICO DO CLIENTE
      console.log("[CLIENTE] Tentando buscar dados do usuário em /api/user/me...");

      try {
        const res = await fetch('/api/user/me');
        if (!res.ok) {
          // Tenta ler a mensagem de erro da API
          const errorData = await res.json().catch(() => ({})); // Evita erro se o corpo não for JSON
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
        console.error("[CLIENTE] Erro ao buscar dados do usuário:", e);
        setError(e.message);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData!, [name]: value }));
  };

  const handleSave = async () => {
    if (!userData) return;
    setError('');
    setSuccess('');

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

  if (isLoading) {
      return <div className={styles.profileContainer}>Carregando...</div>;
  }
  
  if (error) {
      return <div className={styles.profileContainer}><div className="alert alert-danger">{error}</div></div>;
  }
  
  if (!userData) {
    return <div className={styles.profileContainer}>Não foi possível carregar os dados.</div>
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Minha Conta Spotless</h1>
      <div className={styles.tabContent}>
        <div className={styles.dataForm}>
            <h2>Meus Dados</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
            <div className={styles.formField}>
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" name="name" value={userData.name} onChange={handleInputChange} readOnly={!isEditing} className={!isEditing ? styles.readOnly : ''} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={userData.email} readOnly className={styles.readOnly} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="phone">Telefone:</label>
              <input type="tel" id="phone" name="phone" value={userData.phone} onChange={handleInputChange} readOnly={!isEditing} className={!isEditing ? styles.readOnly : ''} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="address">Endereço:</label>
              <input type="text" id="address" name="address" value={userData.address} onChange={handleInputChange} readOnly={!isEditing} className={!isEditing ? styles.readOnly : ''} />
            </div>
            
            {isEditing ? (
              <button onClick={handleSave} className={styles.editButton}>Salvar Alterações</button>
            ) : (
              <button onClick={() => setIsEditing(true)} className={styles.editButton}>Editar Dados</button>
            )}
        </div>
      </div>
    </div>
  );
}
