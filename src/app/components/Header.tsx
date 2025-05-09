'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo1.png"
            alt="Spotless Logo"
            width={170}
            height={50}
          />
        </Link>

        {}
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Início</Link>
          <Link href="/servicos" className={styles.navLink}>Serviços</Link>
          <Link href="/contato" className={styles.navLink}>Contato</Link>
          <Link href="/usuario" className={styles.navLinkAccount}>Minha Conta</Link>
        </nav>

        {}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <div />
          <div />
          <div />
        </button>

        {}
        <nav
          className={`${styles.navMobile} ${menuOpen ? styles.open : ''}`}
          aria-hidden={!menuOpen}
        >
          <Link href="/" onClick={toggleMenu} className={styles.navLink}>Início</Link>
          <Link href="/servicos" onClick={toggleMenu} className={styles.navLink}>Serviços</Link>
          <Link href="/contato" onClick={toggleMenu} className={styles.navLink}>Contato</Link>
          <Link href="/usuario" onClick={toggleMenu} className={styles.navLinkAccount}>Minha Conta</Link>
        </nav>
      </div>
    </header>
  );
}
