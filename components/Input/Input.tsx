import React from 'react';

// Hooks

// Components
import { Element } from '..';

// Utils

// Styles
import styles from './Input.module.scss';

export interface IInputProps {
  /** Optional classname to pass to parent container */
  className?: string;
}

const Input: PolymorphicComponent = <C extends React.ElementType = 'input'>({
  className = '',
  ...props
}: PolymorphicComponentProps<C>) => {
  // Return
  return (
    <Element {...props} as="input" className={`${styles.input} ${className}`} />
  );
};

export default React.memo(Input);
