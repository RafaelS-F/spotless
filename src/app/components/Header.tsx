// src/app/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
// Importe o hook useAuth
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Use o estado de autenticação do nosso contexto
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Chama a função de logout do contexto
    router.push('/login');
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo1.png" alt="Spotless Logo" width={170} height={50} />
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Início</Link>
          <Link href="/servicos" className={styles.navLink}>Serviços</Link>
          <Link href="/contato" className={styles.navLink}>Contato</Link>
          
          {isAuthenticated ? (
            <>
              <Link href="/usuario" className={styles.navLinkAccount}>Minha Conta</Link>
              <button onClick={handleLogout} className={styles.navLink}>Sair</button>
            </>
          ) : (
            <Link href="/login" className={styles.navLinkAccount}>Login</Link>
          )}
        </nav>

        {/* ... restante do código para mobile ... */}
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Abrir menu">
          <div /><div /><div />
        </button>
        <nav className={`${styles.navMobile} ${menuOpen ? styles.open : ''}`}>
           <Link href="/" onClick={toggleMenu} className={styles.navLink}>Início</Link>
           <Link href="/servicos" onClick={toggleMenu} className={styles.navLink}>Serviços</Link>
           <Link href="/contato" onClick={toggleMenu} className={styles.navLink}>Contato</Link>
           {isAuthenticated ? (
            <>
              <Link href="/usuario" onClick={toggleMenu} className={styles.navLinkAccount}>Minha Conta</Link>
              <button onClick={handleLogout} className={styles.navLink}>Sair</button>
            </>
          ) : (
            <Link href="/login" onClick={toggleMenu} className={styles.navLinkAccount}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
