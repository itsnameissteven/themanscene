import type { NextPage } from 'next';
import Head from 'next/head';
import { RetroBorder } from '../components';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Man Scene</title>
        <meta name="the Man Scene" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeMiddle}>
          <div className={styles.welcomeInner}>
            <h1>Hello</h1>
          </div>
        </div>
      </div>
      <RetroBorder>
        <h1 className={styles.octogonContent}>Hello</h1>
      </RetroBorder>
    </div>
  );
};

export default Home;
