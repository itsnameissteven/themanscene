import React from 'react';

// Hooks

// Components

// Utils

// Styles
import styles from './RetroBorder.module.scss';

// Interfaces and Types

export interface IRetroBorderProps {
  /** Optional classname to pass to parent container */
  className?: string;
  children: string | JSX.Element | JSX.Element[];
}

const RetroBorder = ({ className = '', children }: IRetroBorderProps) => {
  // State

  // Hooks

  // Interaction Handlers

  // Display Methods

  // Return
  return (
    <div className={`${styles.retroBorder} ${className}`}>
      <span className={styles.octogonOuter}>
        <span className={styles.octogonMiddle}>
          <span className={styles.octogon}>
            <span className={styles.octogonContent}>{children}</span>
          </span>
        </span>
      </span>
    </div>
  );
};

export default RetroBorder;
