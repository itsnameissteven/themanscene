import type { NextPage } from 'next';
import Head from 'next/head';
import { RetroBorder, RoundFrame, Arrow } from '../components';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <Head>
        <title>The Man Scene</title>
        <meta name="the Man Scene" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoundFrame>
        <h1 className={styles.hello}>Coming Soon...</h1>
      </RoundFrame>
      <RetroBorder className={styles.nameTag}>
        <div className={styles.octogonContent}>
          <div className={styles.headline}>
            <h1>Hello</h1>
            <h2>My Name Is</h2>
          </div>
          <div className={styles.name}>
            <h3>Steven</h3>
          </div>
        </div>
      </RetroBorder>
      {/* <Arrow /> */}
    </main>
  );
};

export default Home;
