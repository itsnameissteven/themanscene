import React, { useCallback, useReducer } from 'react';
// Hooks

// Components
import { Input, Textarea, Button } from '..';

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
type ContactFormAction =
  | { type: 'RESET' | 'VALIDATE' }
  | {
      type: 'CHANGE';
      payload: { name: string; value: string };
    }
  | { type: 'TOUCH'; payload: string };

const baseValue = {
  value: '',
  isTouched: false,
  isError: false,
};

const initialState = {
  inputs: {
    email: {
      ...baseValue,
      priority: 1,
      type: 'input',
      placeholder: 'Email',
    },
    fullName: {
      ...baseValue,
      priority: 0,
      placeholder: 'Name',
      type: 'input',
    },
    message: {
      ...baseValue,
      priority: 2,
      placeholder: 'Message...',
      type: 'textarea',
    },
  },
  isValid: false,
};

type FormState = typeof initialState;

const isInvalidInput = (value: string, name: string) => {
  if (name === 'email') {
    return !value.length || !/\S+@\S+\.\S+/.test(value);
  } else {
    return !value.length && !value.trim().length;
  }
};

const contactFormReducer = (state: FormState, action: ContactFormAction) => {
  const { type } = action;
  if (type === 'CHANGE') {
    const { name, value } = action.payload;
    const newInputs = objMap(state.inputs, (val, key) => {
      if (key === name) {
        return {
          ...val,
          isError: isInvalidInput(value, name),
          value,
        };
      }
      return val;
    });

    return {
      ...state,
      inputs: newInputs as FormState['inputs'],
      isValid: !Object.values(newInputs).some((v) => v.isError),
    };
  }
  if (type === 'TOUCH') {
    const newInputs = objMap(state.inputs, (val, key) => {
      if (key === action.payload) {
        return { ...val, isTouched: true };
      }
      return val;
    });
    const newData = {
      ...state,
      inputs: newInputs as FormState['inputs'],
    };
    return newData;
  }
  if (type === 'VALIDATE') {
    const newInputs = objMap(state.inputs, (val, key) => {
      return {
        ...val,
        isError: isInvalidInput(val.value, key),
        isTouched: true,
      };
    });
    return {
      ...state,
      inputs: newInputs as FormState['inputs'],
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
  const { inputs, isValid } = formState;
  const { email, fullName, message } = inputs;
  const arr = objToArray(inputs, (val, key) => ({ ...val, key }));
  const sortedInputs = sortData({
    data: arr,
    sortKey: 'priority',
    sort: 'asc',
  });
  // Hooks
  const { mutate } = useMutation(() =>
    getEmail({
      email: email.value,
      fullName: fullName.value,
      message: message.value,
    })
  );

  // Interaction Handlers
  const handleChange = useCallback(<T extends Handler>(e: T) => {
    const { name, value } = e.target;
    formReducer({ type: 'CHANGE', payload: { name, value } });
  }, []);

  const handleTouch = useCallback(
    <T extends Handler>(e: T) => {
      const { name } = e.target;
      formReducer({ type: 'TOUCH', payload: name });
    },
    [formReducer]
  );

  const handleSubmit = () => {
    if (!isValid) {
      formReducer({ type: 'VALIDATE' });
      return;
    }
    mutate();
    formReducer({ type: 'RESET' });
  };
  // Display Methods
  console.log(formState);
  // Return
  return (
    <div className={`${styles.contactForm} ${className}`}>
      <div className={styles.inputContainer}>
        {sortedInputs.map((val) => {
          const {
            type,
            key,
            priority,
            isError,
            value,
            isTouched,
            placeholder,
          } = val;
          if (type === 'input') {
            return (
              <Input
                key={`inputs-${priority}`}
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                isError={isError && isTouched}
                onBlurCapture={handleTouch}
              />
            );
          }
          if (type === 'textarea') {
            return (
              <Textarea
                key={`inputs-${priority}`}
                id="message"
                name="message"
                value={value}
                onChange={handleChange}
                isError={isError && isTouched}
                placeholder={placeholder}
                onBlurCapture={handleTouch}
              />
            );
          }
        })}
      </div>
      <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
};

export default ContactForm;
