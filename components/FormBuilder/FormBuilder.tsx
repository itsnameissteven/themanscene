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
  /** Action on Submit when form is valid */
  onSubmit: (data: FormInputDef) => void;
  data: FormInputDef;
}

const FormBuilder = ({ className = '', onSubmit, data }: IFormBuilderProps) => {
  // State
  const { formInputs, handleChange, handleTouch, handleSubmit } =
    useFormBuilder({
      data,
      onSubmit,
    });

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
              isError={val.displayError()}
              onChange={handleChange}
              placeholder={placeholder}
              onBlurCapture={handleTouch}
            />
          );
        }
        return null;
      })}
      <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
};
export default FormBuilder;
