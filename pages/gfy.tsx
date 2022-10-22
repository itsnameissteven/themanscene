import type { NextPage } from 'next';
import styles from '../styles/Gfy.module.scss';
import { GoFuckYourSelf } from '../components';

const Gfy: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <GoFuckYourSelf className={styles.goFuckYourselfNow} width="100%" />
      </main>
    </div>
  );
};

export default Gfy;
