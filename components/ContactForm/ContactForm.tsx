import React, { useCallback, useReducer } from 'react';
// Hooks

// Components
import { Input, Textarea, Button, FormBuilder } from '..';

// Utils
import { useMutation } from '@tanstack/react-query';
import { getEmail } from '../../pages/api/email';

// Styles
import styles from './ContactForm.module.scss';
import { objMap, sortData } from '../../utils';
import { objToArray } from '../../utils/helpers/typescriptHelpers';

// Interfaces and Types

export interface IContactFormProps {
  /** Optional classname to pass to parent container */
  className?: string;
}
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

const isInvalidInput = (value: string, name: string) => {
  if (name === 'email') {
    return !value.length || !/\S+@\S+\.\S+/.test(value);
  } else {
    return !value.length && !value.trim().length;
  }
};

const ContactForm = ({ className = '' }: IContactFormProps) => {
  // State
  // Hooks
  const { mutate: sendEmail } = useMutation((vars: FormInputDef) => {
    const getValue = (str: string) =>
      vars.find((val) => val.id === str)?.value || '';
    return getEmail({
      email: getValue('email'),
      fullName: getValue('fullName'),
      message: getValue('message'),
    });
  });

  // Interaction Handlers

  // Display Methods

  // Return
  return (
    <div className={`${styles.contactForm} ${className}`}>
      <FormBuilder onSubmit={sendEmail} data={inputs} />
    </div>
  );
};

export default ContactForm;
