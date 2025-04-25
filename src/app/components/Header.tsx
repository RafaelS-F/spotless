// src/components/Header.tsx
'use client'; // Pode ser necessário se usar hooks ou event handlers no futuro

import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
            <Image
                src="/logo1.png"
                alt="Spotless Logo"
                width={150}
                height={40}
            />
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Início
          </Link>
          <Link href="/servicos" className={styles.navLink}>
            Serviços
          </Link>
          <Link href="/contato" className={styles.navLink}>
            Contato
          </Link>
          <Link href="/usuario" className={styles.navLinkAccount}>
            Minha Conta
          </Link>
        </nav>
        {/* Adicionar um botão de menu hamburguer para mobile aqui se necessário */}
      </div>
    </header>
  );
}
