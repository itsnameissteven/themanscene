import React from 'react';

// Hooks

// Components

// Utils

// Styles
import styles from './Layout.module.scss';

// Interfaces and Types

export interface ILayoutProps {
  /** Optional classname to pass to parent container */
  children: JSX.Element[] | JSX.Element;
}

const Layout = ({ children }: ILayoutProps) => {
  // State

  // Hooks

  // Interaction Handlers

  // Display Methods

  // Return
  return <div className={styles.layout}>{children}</div>;
};

export default Layout;
