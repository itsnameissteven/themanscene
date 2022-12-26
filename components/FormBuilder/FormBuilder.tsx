import React from 'react';

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

const inputs = [
  {
    type: 'input' as const,
    id: 'fullName',
    value: '',
  },
  {
    type: 'input' as const,
    id: 'email',
    value: '',
  },
];

const FormBuilder = ({ className = '' }: IFormBuilderProps) => {
  // State
  const { formInputs } = useFormBuilder({ data: inputs });

  // Hooks

  // Interaction Handlers

  // Display Methods

  // Return
  return (
    <div className={`${styles.formBuilder} ${className}`}>
      {formInputs.map((val) => {
        const { type, id, priority, value, placeholder, handleChange } = val;
        if (type === 'input') {
          return (
            <Input
              key={`${id}-${priority}`}
              id={id}
              value={value}
              onChange={handleChange()}
              placeholder={placeholder}
              // isError={isError && isTouched}
              // onBlurCapture={handleTouch}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default FormBuilder;
