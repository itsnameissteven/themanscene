import React from 'react';

// Hooks

// Components

// Utils

// Styles
import styles from './Arrow.module.scss';

// Interfaces and Types

export interface IArrowProps {
  /** Optional classname to pass to parent container */
  className?: string;
}

const Arrow = ({ className = '' }: IArrowProps) => {
  // State

  // Hooks

  // Interaction Handlers

  // Display Methods

  // Return
  return (
    <div className={`${styles.arrow} ${className}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Arrow;
