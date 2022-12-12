import React, { forwardRef } from 'react';

// Hooks

// Components
import { Element } from '..';

// Utils

// Styles
import styles from './Input.module.scss';

const Input = React.forwardRef(
  (
    { className = '', ...props }: PolymorphicComponentProps<'input'>,
    ref?: PolymorphicRef<'input'>
  ) => {
    // Return
    return (
      <Element
        ref={ref}
        {...props}
        as="input"
        className={`${styles.input} ${className}`}
      />
    );
  }
);

Input.displayName = 'Input';

export default React.memo(Input);
