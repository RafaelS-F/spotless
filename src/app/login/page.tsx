// src/app/login/page.tsx
'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "@/app/login/Login.module.css";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Falha no login.');
      }
      
    
      router.push('/usuario');
      
      
      router.refresh();

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
              <h3 className={`fw-bold mb-3 ${styles.modeAwareTitle}`}>
                Acesse sua conta
              </h3>
              <p className={`${styles.modeAwareSubtitle}`}>
                Bem-vindo de volta!
              </p>
            </div>

            <form className={styles.formContainer} onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              
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
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <a className={styles.linkInfo} href="#">
                  Esqueceu a senha?
                </a>
              </div>

              <button className={styles.btnInfo} type="submit">
                Entrar
              </button>

              <p className="mt-3 text-center">
                Ainda não tem uma conta?{" "}
                <a href="/registro" className={styles.linkInfo}>
                  Cadastre-se
                </a>
              </p>
            </form>
          </div>

          <div className={`col-md-6 d-none d-md-block ${styles.colImage}`}>
            <img
              src="/Login.jpg"
              alt="Imagem de login"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
