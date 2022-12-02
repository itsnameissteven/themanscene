import React from 'react';

// Hooks

// Components

// Utils

// Styles
import styles from './MenuButton.module.scss';

// Interfaces and Types

export interface IMenuButtonProps {
  /** Optional classname to pass to parent container */
  className?: string;
}

const MenuButton = ({ className = '' }: IMenuButtonProps) => {
  // State

  // Interaction Handlers

  // Display Methods

  // Return
  return (
    <div className={`${styles.menuButton} ${className}`}>
      <div className={styles.color}>
        <div className={styles.top} />
        <div className={styles.t2} />
        <div className={styles.t3} />
        <div className={styles.t4} />
        <div className={styles.t5} />
      </div>
      <p>More</p>
    </div>
  );
};

export default MenuButton;
