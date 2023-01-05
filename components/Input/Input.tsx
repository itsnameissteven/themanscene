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
  label?: string;
}

const Input = React.forwardRef(
  (
    { className = '', isError = false, label = '', ...props }: IInput,
    ref?: PolymorphicRef<'input'>
  ) => {
    // Return
    return (
      <label>
        {label}
        <Element
          ref={ref}
          {...props}
          as="input"
          className={clsx(`${styles.input} ${className}`, {
            [styles.error]: isError,
          })}
        />
      </label>
    );
  }
);

Input.displayName = 'Input';

export default React.memo(Input);
