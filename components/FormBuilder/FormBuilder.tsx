import React, { useCallback } from 'react';

// Hooks
import { useFormBuilder } from '../../hooks';

// Components
import { Input, Textarea, Button } from '..';

// Utils

// Styles
import styles from './FormBuilder.module.scss';

// Interfaces and Types

export interface IFormBuilderProps {
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

const FormBuilder = ({ className = '' }: IFormBuilderProps) => {
  // State
  const { formInputs, handleChange, handleTouch } = useFormBuilder({
    data: inputs,
  });
  // const newHandleChange = useCallback(() => handleChange(), [handleChange]);
  // Hooks

  // Interaction Handlers

  // Display Methods

  // Return
  return (
    <div className={`${styles.formBuilder} ${className}`}>
      {formInputs.map((val) => {
        const { type, id, priority, value, placeholder } = val;
        if (type === 'input') {
          return (
            <Input
              key={`${id}`}
              id={id}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              isError={val.displayError()}
              onBlurCapture={handleTouch}
            />
          );
        }
        if (type === 'textarea') {
          return (
            <Textarea
              key={`${id}-${priority}`}
              id={id}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              onBlurCapture={handleTouch}
            />
          );
        }
        return null;
      })}
    </div>
  );
};
export default FormBuilder;
