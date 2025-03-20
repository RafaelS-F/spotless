import styles from '../app/components/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Minha Empresa. Todos os direitos reservados.</p>
      <nav>
        <ul className={styles.navList}>
          <li>
            <a href="/politica-de-privacidade">Política de Privacidade</a>
          </li>
          <li>
            <a href="/termos-de-uso">Termos de Uso</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}