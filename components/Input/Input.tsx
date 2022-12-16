import clsx from 'clsx';
import React, { forwardRef } from 'react';

// Hooks

// Components
import { Element } from '..';

// Utils

// Styles
import styles from './Input.module.scss';

interface IInput extends GenericComponentProps<'input'> {
  isError?: boolean;
}

const Input = React.forwardRef(
  (
    { className = '', isError = false, ...props }: IInput,
    ref?: PolymorphicRef<'input'>
  ) => {
    console.log(isError);
    // Return
    return (
      <Element
        ref={ref}
        {...props}
        as="input"
        className={clsx(`${styles.input} ${className}`, {
          [styles.error]: isError,
        })}
      />
    );
  }
);

Input.displayName = 'Input';

export default React.memo(Input);
