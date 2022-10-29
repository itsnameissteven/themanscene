import React from 'react';
import { Icon } from 'neat-treats';

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
      <Icon className={styles.span} name="chevron-right" />
      <Icon className={styles.span} name="chevron-right" />
      <Icon className={styles.span} name="chevron-right" />
      <Icon className={styles.span} name="chevron-right" />
      <Icon className={styles.span} name="chevron-right" />
      <Icon className={styles.span} name="chevron-right" />
    </div>
  );
};

export default Arrow;
