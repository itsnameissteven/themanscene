import React, { useReducer } from 'react';
import { Input } from 'neat-treats';
// Hooks

// Components

// Utils
import { useMutation } from '@tanstack/react-query';
import { getEmail } from '../../pages/api/email';

// Styles
import styles from './ContactForm.module.scss';

// Interfaces and Types

export interface IContactFormProps {
  /** Optional classname to pass to parent container */
  className?: string;
}
type ContactFormAction =
  | { type: 'RESET' }
  | { type: 'CHANGE'; payload: { name: string; value: string } };

const initialState = {
  inputs: {
    email: '',
    fullName: '',
    message: '',
  },
  isValid: false,
};

const contactFormReducer = (
  state: typeof initialState,
  action: ContactFormAction
) => {
  const { type } = action;
  if (type === 'CHANGE') {
    const { name, value } = action.payload;
    return {
      ...state,
      inputs: {
        ...state.inputs,
        [name]: value,
      },
    };
  }
  if (type === 'RESET') {
    return initialState;
  }
  return state;
};

const ContactForm = ({ className = '' }: IContactFormProps) => {
  // State
  const [formState, formReducer] = useReducer(contactFormReducer, initialState);
  const { email, fullName, message } = formState.inputs;
  // Hooks
  const { mutate } = useMutation(() => getEmail(formState.inputs));

  // Interaction Handlers
  const handleChange = <T extends Handler>(e: T) => {
    const { name, value } = e.target;
    formReducer({ type: 'CHANGE', payload: { name, value } });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate();
    formReducer({ type: 'RESET' });
  };
  // Display Methods

  // Return
  return (
    <div className={`${styles.contactForm} ${className}`}>
      <div className={styles.inputContainer}>
        <Input
          id="fullName"
          // label="Full Name"
          name="fullName"
          value={fullName}
          onChange={handleChange}
          placeholder={'Full Name'}
        />
        <Input
          id="email"
          label="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default ContactForm;
