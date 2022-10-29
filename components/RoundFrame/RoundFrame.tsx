import React from 'react';

// Hooks

// Components

// Utils

// Styles
import styles from './RoundFrame.module.scss';

// Interfaces and Types

export interface IRoundFrameProps {
  /** Optional classname to pass to parent container */
  className?: string;
  children: JSX.Element | JSX.Element[] | string;
}

const RoundFrame = ({ className = '', children }: IRoundFrameProps) => {
  // State

  // Hooks

  // Interaction Handlers

  // Display Methods

  // Return
  return (
    <div className={`${styles.roundFrame} ${className}`}>
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeMiddle}>
          <div className={styles.welcomeInner}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default RoundFrame;
