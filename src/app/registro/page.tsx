import styles from "@/app/login/Login.module.css";

export default function Register() {
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

            <form className={styles.formContainer}>
              <div className={styles.formOutline}>
                <label className={styles.formLabel} htmlFor="name">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className={styles.formControlLg}
                  placeholder="Digite seu nome completo"
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
