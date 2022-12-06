import type { NextPage } from 'next';
import styles from '../styles/Contact.module.scss';
import { ContactForm } from '../components';

const Contact: NextPage = () => {
  return (
    <main className={styles.main}>
      <ContactForm />
    </main>
  );
};

export default Contact;
