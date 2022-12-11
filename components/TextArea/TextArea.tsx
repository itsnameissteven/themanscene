import React from 'react';

// Hooks

// Components

// Utils

// Styles
import styles from './TextArea.module.scss';

// Interfaces and Types

export interface ITextAreaProps {
  /** Optional classname to pass to parent container */
  className?: string;
}

const TextArea = ({ className = ''}: ITextAreaProps) => {
  // State

  // Hooks

  // Interaction Handlers

  // Display Methods

  // Return
  return (
    <div className={`${styles.textArea} ${className}`}>
      Hello, I am a TextArea component.
    </div>
  )
};

export default TextArea
