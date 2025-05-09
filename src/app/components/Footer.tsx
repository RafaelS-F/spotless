
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <Link href="/termos" className={styles.link}>
            Termos de Serviço
          </Link>
          <Link href="/privacidade" className={styles.link}>
            Política de Privacidade
          </Link>
          <Link href="/contato" className={styles.link}>
            Contato
          </Link>
        </div>
        <div className={styles.copyright}>
          © {currentYear} Spotless Limpeza. Todos os direitos reservados.
        </div>
        {}
      </div>
    </footer>
  );
}
