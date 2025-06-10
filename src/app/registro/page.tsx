// src/app/registro/page.tsx
'use client'; // Converte para Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Hook para redirecionamento
import styles from "@/app/login/Login.module.css";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter(); // Instancia o router

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Algo deu errado.');
      }

      setSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');
      setTimeout(() => {
        router.push('/login'); // Redireciona para a página de login
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <section
      className={`${styles.bgImageVertical} vh-100 d-flex align-items-center justify-content-center`}
    >
      <div className="container py-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-6 col-lg-5 text-center text-md-start">
            <div className="mb-4">
              <h3 className="fw-bold mb-3" style={{ color: '#000000' }}>
                Crie sua conta
              </h3>
              <p className={`${styles.textMuted} mode-aware-subtitle`}>
                Registre-se para começar.
              </p>
            </div>

            <form className={styles.formContainer} onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <div className={styles.formOutline}>
                <label className={styles.formLabel} htmlFor="name">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className={styles.formControlLg}
                  placeholder="Digite seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formOutline}>
                <label className={styles.formLabel} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.formControlLg}
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formOutline}>
                <label className={styles.formLabel} htmlFor="password">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  className={styles.formControlLg}
                  placeholder="Crie uma senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formOutline}>
                <label className={styles.formLabel} htmlFor="confirmPassword">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={styles.formControlLg}
                  placeholder="Repita sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button className={styles.btnInfo} type="submit">
                Cadastrar
              </button>

              <p className="mt-3 text-center">
                Já tem uma conta?{' '}
                <a href="/login" className={styles.linkInfo}>
                  Entrar
                </a>
              </p>
            </form>
          </div>

          <div className={`col-md-6 d-none d-md-block ${styles.colImage}`}>
            <img
              src="/Login.jpg"
              alt="Imagem de registro"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}