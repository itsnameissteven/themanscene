import type { NextPage } from 'next';
import styles from '../styles/Contact.module.scss';
import { ContactForm } from '../components';

const Contact: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>CONNECT</h1>
        <p>
          {`I'd love to connect with you please reach out with any feedbac. also
          this is what would happen if the text got even longer and I had a
          statement to work withk. oh no the text just keeps going and going
          what now`}
        </p>
        <ContactForm />
      </div>
    </main>
  );
};

export default Contact;
