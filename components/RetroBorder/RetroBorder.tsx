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
      <div className={styles.octogonOuter}>
        <div className={styles.octogonMiddle}>
          <div className={styles.octogon}>
            <div className={styles.octogonContent}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroBorder;
