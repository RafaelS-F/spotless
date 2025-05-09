import Head from "next/head";
import styles from "../app/page.module.css";
import "./globals.css";
import { Belleza } from "next/font/google";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotless Limpeza</title>
        <meta name="description" content="Serviços de limpeza com qualidade e praticidade" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {}
        <section id="secao1" className={`${styles.section} ${styles.section1}`}>
          <div className={styles.heroContent}>
            <h1>
              Aproveite seu dia<br />
              e deixe a limpeza<br />
              com a gente.
            </h1>
            <p>
              Conectamos você aos melhores profissionais de limpeza residencial.
            </p>
            <div className={styles.buttonGroup}>
              <Link href="/login"><button className={styles.button}>Login</button></Link>
              <button className={styles.button}>Agendar agora</button>
            </div>
          </div>
        </section>

        {}
        <section id="secao2" className={styles.section2}>
          <div className={styles.row1}>
            <h2>Encontre diaristas qualificadas</h2>
          </div>
          <div className={styles.row2}>
            {[{
              title: "Limpeza Residencial",
              desc: "Limpeza do dia a dia, focada em manter a ordem e higiene básica.",
              value: "R$ 100,00",
              img: "imagem2.jfif"
            }, {
              title: "Limpeza Pós-Obra",
              desc: "Precisando de Limpeza Pós Obra? Encontre os Melhores Profissionais.",
              value: "R$ 180,00",
              img: "/imagem1.jfif"
            }, {
              title: "Limpeza Comercial",
              desc: "Limpeza focada em estabelecimentos comerciais e empresariais.",
              value: "R$ 150,00",
              img: "/imagem3.jpeg"
            }].map((servico, idx) => (
              <div className={styles.columnSecao2} key={idx}>
                <div className={styles.imageRow}>
                  <img src={servico.img} alt={servico.title} className={styles.image} />
                </div>
                <div className={styles.tituloRow}><h3>{servico.title}</h3></div>
                <div className={styles.descriptionRow}><p>{servico.desc}</p></div>
                <div className={styles.valueRow}><p>{servico.value}</p></div>
                <div className={styles.buttonRow}><button className={styles.button}>Agende</button></div>
              </div>
            ))}
          </div>
        </section>

        {}
        <section id="secao3" className={`${styles.section} ${styles.section3}`}>
          <div className={styles.containerSecao3}>
            <div className={styles.imageContainerSecao3}>
              <img src="/secao3.jpg" alt="Equipe de limpeza" className={styles.imageSecao3} />
            </div>
            <div className={styles.textContainerSecao3}>
              <h2>Sobre Nós</h2>
              <p>
                Conectamos você a diaristas qualificadas para todos os tipos de limpeza residencial. Agende agora e aproveite seu dia enquanto cuidamos da limpeza para você.
              </p>
              <button className={styles.button}>Agende</button>
            </div>
          </div>
        </section>

        {}
        <section id="secao3-5" className={`${styles.section} ${styles.section3_5}`}>
          <div className={styles.containerSecao3_5}>
            <h2 className={styles.sectionTitle}>Vantagens que você só encontra no Spotless</h2>
            <div className={styles.vantagensContainer}>
              {[{
                title: "Praticidade",
                desc: "Agende seu serviço em poucos cliques de forma rápida e eficiente."
              }, {
                title: "Segurança",
                desc: "Profissionais verificados e avaliados para garantir tranquilidade."
              }, {
                title: "Qualidade",
                desc: "Diárias com excelente avaliação, garantindo serviço impecável."
              }, {
                title: "Preço Justo",
                desc: "Pagamento transparente, sem taxas escondidas."
              }].map((vant, i) => (
                <div className={styles.vantagem} key={i}>
                  <h3>{vant.title}</h3>
                  <p>{vant.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {}
        <section id="secao4" className={`${styles.section} ${styles.section4}`}>
          <h2 className={styles.sectionTitleWhite}>O que nossos clientes dizem</h2>
          <div className={styles.depoimentosContainer}>
            {[{
              nome: "Maria Silva",
              texto: "Ótimo serviço! Minha casa ficou impecável.",
              estrelas: "★★★★★",
              img: "/pf1.jpeg"
            }, {
              nome: "João Santos",
              texto: "Profissionais muito competentes e atenciosos.",
              estrelas: "★★★★☆",
              img: "/pf2.jpeg"
            }, {
              nome: "Ana Oliveira",
              texto: "Adorei a praticidade e a qualidade do serviço.",
              estrelas: "★★★★★",
              img: "/pf3.jpg"
            }].map((dep, idx) => (
              <div className={styles.depoimento} key={idx}>
                <img src={dep.img} alt={`Cliente ${dep.nome}`} className={styles.depoimentoImagem} />
                <h3>{dep.nome}</h3>
                <p>"{dep.texto}"</p>
                <div className={styles.estrelas}>{dep.estrelas}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
