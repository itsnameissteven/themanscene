import type { NextPage } from 'next';
import styles from '../styles/Contact.module.scss';
import { useMutation } from '@tanstack/react-query';
import { getEmail } from '../pages/api/email';
import { FormBuilder } from 'neat-form-builder';

const inputs: FormInputDef = [
  {
    type: 'input',
    id: 'fullName',
    value: '',
    placeholder: 'Name',
    required: true,
  },
  {
    type: 'input',
    id: 'email',
    value: '',
    placeholder: 'Email',
    required: true,
  },
  {
    type: 'textarea',
    id: 'message',
    value: '',
    placeholder: 'Message',
    required: true,
  },
];

const Contact: NextPage = () => {
  const { mutate: sendEmail } = useMutation((vars: FormInputDef) => {
    const getValue = (str: string) =>
      vars.find((val) => val.id === str)?.value || '';
    return getEmail({
      email: getValue('email'),
      fullName: getValue('fullName'),
      message: getValue('message'),
    });
  });
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
        <div className={`${styles.form}`}>
          <FormBuilder onSubmit={sendEmail} data={inputs} />
        </div>
      </div>
    </main>
  );
};

export default Contact;
