import styles from "@/app/components/Login.module.css";
export default function Login() {
  return (
    <section className={`${styles.bgImageVertical} vh-100`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4">
              <img
                src="/logo1.png"
                alt="Logo"
                className="logo-img"
                style={{ maxWidth: "100px", height: "auto" }}
              />
            </div>

            <div
              className={`d-flex align-items-center ${styles.hCustom2} px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5`}
            >
              <form className={styles.formContainer}>
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Log in
                </h3>

                <div className={styles.formOutline}>
                  <input
                    type="email"
                    id="form2Example18"
                    className={`${styles.formControlLg} form-control`}
                  />
                  <label className={styles.formLabel} htmlFor="form2Example18">
                    Email address
                  </label>
                </div>

                <div className={styles.formOutline}>
                  <input
                    type="password"
                    id="form2Example28"
                    className={`${styles.formControlLg} form-control`}
                  />
                  <label className={styles.formLabel} htmlFor="form2Example28">
                    Password
                  </label>
                </div>

                <div className="pt-1 mb-4">
                  <button
                    className={`${styles.btnInfo} btn btn-lg btn-block`}
                    type="button"
                  >
                    Login
                  </button>
                </div>

                <p className={`${styles.textMuted} small mb-5 pb-lg-2`}>
                  <a className="text-muted" href="#!">
                    Forgot password?
                  </a>
                </p>
                <p>
                  Don't have an account?{" "}
                  <a href="#!" className={styles.linkInfo}>
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>

          <div className={`col-sm-6 px-0 d-none d-sm-block ${styles.colImage}`}>
            <img
              src="https://wallpapers.com/images/high/cute-animated-house-cleaning-materials-mrqe2lt7krdpg4fq.webp"
              alt="Login image"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
