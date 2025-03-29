import styles from "@/app/login/Login.module.css";

export default function Login() {
  return (
    <section
      className={`${styles.bgImageVertical} vh-100 d-flex align-items-center justify-content-center`}
    >
      <div className="container py-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-6 col-lg-5 text-center text-md-start">
            <div className="mb-4">
              <img
                src="/logo1.png"
                alt="Logo"
                className="mb-4"
                style={{ maxWidth: "120px", height: "auto" }}
              />
              <h3 className="fw-bold mb-3">Bem-vindo de volta!</h3>
              <p className="text-muted">Faça login para continuar.</p>
            </div>

            <form className={styles.formContainer}>
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
                  placeholder="Digite sua senha"
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
                <a href="#" className={styles.linkInfo}>
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
