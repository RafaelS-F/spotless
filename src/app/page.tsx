import Head from "next/head";
import styles from "../app/components/page.module.css";
import "./globals.css";
import { Belleza } from "next/font/google";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Minha Página Home</title>
        <meta name="description" content="Página home com várias seções" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section id="secao1" className={`${styles.section} ${styles.section1}`}>
          <div className={styles.logoContainer}>
            <img src="/logo1.png" alt="Logo do Site" className={styles.logo} />
          </div>
          <div>
            <h1 style={{ fontSize: "3rem" }}>
              Aproveite seu dia
              <br />
              e deixe a limpeza
              <br />
              com a gente.
            </h1>
            <p style={{ fontSize: "1.2rem", marginTop: "20px" }}>
              Conectamos você aos melhores profissionais de limpeza residencial.
            </p>
            <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
              <button className={styles.button}>Saiba mais</button>
              <button className={styles.button}>Agendar agora</button>
            </div>
          </div>
        </section>

        <section id="secao2" className={`${styles.section2}`}>
          <div className={styles.row1}>
            <h1 style={{ fontSize: "3em" }}>
              Encontre diaristas qualificadas
              <br /> para limpeza de sua casa.
            </h1>
          </div>
          <div className={styles.row2}>
            <div className={styles.columnSecao2}>
              <div className={styles.imageRow}>
                <img
                  src="imagem2.jfif"
                  alt="Limpeza Padrão"
                  className={styles.image}
                />
              </div>
              <div className={styles.tituloRow}>
                <h1>Limpeza Padrão</h1>
              </div>
              <div className={styles.descriptionRow}>
                <p>
                  Limpeza do dia a dia, focada em manter a ordem e higiene
                  básica, como varrer, passar pano e limpar superfícies.
                </p>
              </div>
              <div className={styles.valueRow}>
                <p>R$ 100,00</p>
              </div>
              <div className={styles.buttonRow}>
                <button className={styles.button}>Agende</button>
              </div>
            </div>

            <div className={styles.columnSecao2}>
              <div className={styles.imageRow}>
                <img
                  src="/imagem1.jfif"
                  alt="Limpeza Padrão"
                  className={styles.image}
                />
              </div>
              <div className={styles.tituloRow}>
                <h1>Limpeza Pesada</h1>
              </div>
              <div className={styles.descriptionRow}>
                <p>
                  Limpeza mais detalhada, incluindo tarefas como lavar cortinas,
                  limpar áreas de difícil acesso e higienizar estofados.
                </p>
              </div>
              <div className={styles.valueRow}>
                <p>R$ 100,00</p>
              </div>
              <div className={styles.buttonRow}>
                <button className={styles.button}>Agende</button>
              </div>
            </div>

            <div className={styles.columnSecao2}>
              <div className={styles.imageRow}>
                <img
                  src="/imagem3.jpeg"
                  alt="Limpeza Padrão"
                  className={styles.image}
                />
              </div>
              <div className={styles.tituloRow}>
                <h1>Limpeza Individual</h1>
              </div>
              <div className={styles.descriptionRow}>
                <p>
                  Limpeza focada em algo específico, como janelas, cortinas,
                  estantes, banheiros, quartos, entre outros.
                </p>
              </div>
              <div className={styles.valueRow}>
                <p>R$ 100,00</p>
              </div>
              <div className={styles.buttonRow}>
                <button className={styles.button}>Agende</button>
              </div>
            </div>
          </div>
        </section>

        <section id="secao3" className={`${styles.section} ${styles.section3}`}>
          <div className={styles.containerSecao3}>
            <div className={styles.imageContainerSecao3}>
              <img
                src="/secao3.jpg"
                alt="Imagem da Seção 3"
                className={styles.imageSecao3}
              />
            </div>
            <div className={styles.textContainerSecao3}>
              <h1>Sobre Nós</h1>
              <p>
                Bem-vindo ao nosso site! Somos especializados em conectar você a
                diaristas qualificadas para todos os tipos de limpeza
                residencial. Seja uma limpeza padrão, pesada ou concentrada,
                nossa equipe está pronta para deixar sua casa impecável. Agende
                agora e aproveite seu dia enquanto cuidamos da limpeza para
                você.
              </p>
              <button className={styles.button}>Agende</button>
            </div>
          </div>
        </section>

        <section
          id="secao3-5"
          className={`${styles.section} ${styles.section3_5}`}
        >
          <div className={styles.containerSecao3_5}>
            <h1
              style={{
                textAlign: "center",
                fontSize: "2.5rem",
                marginBottom: "40px",
                color: "#333",
              }}
            >
              Vantagens que você só encontra no Spotless
            </h1>
            <div className={styles.vantagensContainer}>
              <div className={styles.vantagem}>
                <h2>Praticidade</h2>
                <p>
                  Agende seu serviço em poucos cliques e tenha tudo resolvido de
                  forma rápida e eficiente.
                </p>
              </div>
              <div className={styles.vantagem}>
                <h2>Segurança</h2>
                <p>
                  Profissionais verificados e avaliados para garantir a sua
                  tranquilidade.
                </p>
              </div>
              <div className={styles.vantagem}>
                <h2>Qualidade</h2>
                <p>
                  Diárias com excelente avaliação, garantindo um serviço de alta
                  qualidade.
                </p>
              </div>
              <div className={styles.vantagem}>
                <h2>Preço Justo</h2>
                <p>
                  Pagamento transparente, sem taxas escondidas e de acordo com o
                  serviço prestado.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="secao4" className={`${styles.section} ${styles.section4}`}>
          <h1
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: "40px",
              color: "#ffffff",
            }}
          >
            O que nossos clientes dizem
          </h1>
          <div className={styles.depoimentosContainer}>
            <div className={styles.depoimento}>
              <img
                src="/pf1.jpeg"
                alt="Cliente 1"
                className={styles.depoimentoImagem}
              />
              <h3>Maria Silva</h3>
              <p>"Ótimo serviço! Minha casa ficou impecável."</p>
              <div className={styles.estrelas}>★★★★★</div>
            </div>
            <div className={styles.depoimento}>
              <img
                src="/pf2.jpeg"
                alt="Cliente 2"
                className={styles.depoimentoImagem}
              />
              <h3>João Santos</h3>
              <p>"Profissionais muito competentes e atenciosos."</p>
              <div className={styles.estrelas}>★★★★☆</div>
            </div>
            <div className={styles.depoimento}>
              <img
                src="/pf3.jpg"
                alt="Cliente 3"
                className={styles.depoimentoImagem}
              />
              <h3>Ana Oliveira</h3>
              <p>"Adorei a praticidade e a qualidade do serviço."</p>
              <div className={styles.estrelas}>★★★★★</div>
            </div>
          </div>
        </section>
        <section id="secao5" className={`${styles.section} ${styles.section5}`}>
          <div className={styles.footerContainer}>
            <div className={styles.footerColuna}>
              <h3>Sobre Nós</h3>
              <p>
                Conectamos você aos melhores profissionais de limpeza
                residencial.
              </p>
            </div>
            <div className={styles.footerColuna}>
              <h3>Links Rápidos</h3>
              <ul>
                <li>
                  <a href="#secao1">Home</a>
                </li>
                <li>
                  <a href="#secao2">Serviços</a>
                </li>
                <li>
                  <a href="#secao3">Sobre</a>
                </li>
                <li>
                  <a href="#secao4">Depoimentos</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerColuna}>
              <h3>Contato</h3>
              <p>Telefone: (11) 1234-5678</p>
              <p>E-mail: contato@limpezafacil.com</p>
              <p>Endereço: Rua Exemplo, 123 - São Paulo, SP</p>
            </div>
          </div>
          <div className={styles.footerDireitos}>
            <p>&copy; 2023 Limpeza Fácil. Todos os direitos reservados.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
