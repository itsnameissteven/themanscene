import React from 'react';

// Hooks

// Components

// Utils

// Styles
import styles from './FormBuilder.module.scss';

// Interfaces and Types

export interface IFormBuilderProps {
  /** Optional classname to pass to parent container */
  className?: string;
}

const FormBuilder = ({ className = ''}: IFormBuilderProps) => {
  // State

  // Hooks

  // Interaction Handlers

  // Display Methods

  // Return
  return (
    <div className={`${styles.formBuilder} ${className}`}>
      Hello, I am a FormBuilder component.
    </div>
  )
};

export default FormBuilder
