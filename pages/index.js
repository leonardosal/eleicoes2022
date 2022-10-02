import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import styles from '../styles/Home.module.css'

export async function getStaticProps(context) {
 const reponse = await axios.get('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json');

  return {
    props: { 
      data: reponse.data 
    },
    revalidate: 10,
  }
}

export default function Home({ data }) {
  const { cand, pst } = data;

  setInterval(() => {
    window.location.reload();
   }, 10000)

  return (
    <div className={styles.container}>
      <Head>
        <title>Eleições 2022</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Eleições 2022
        </h1>

        <p className={styles.description}>
          Candidatos a Presidência da República
        </p>
        <span className={styles.description2}>
        Urnas Apuradas: {pst}%
        </span>
        <div className={styles.grid}>
          {cand.map(item => (
            <div key={item.seq} className={styles.card}>
              <h2>{item.pvap}%</h2>
              <p>{item.nm}</p>
              <p>Votos apurados: {item.vap}</p>
            </div>
          )
          )}
        </div>
      </main>
    </div>
  )
}
