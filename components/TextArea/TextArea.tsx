import React from 'react';

// Hooks

// Components
import { Element } from '..';

// Utils

// Styles
import styles from './Textarea.module.scss';

// Interfaces and Types

const Textarea = ({
  className = '',
  children,
  ...props
}: PolymorphicComponentProps<'textarea'>) => {
  return (
    <Element
      as="textarea"
      {...props}
      className={`${styles.textArea} ${className}`}
    >
      {children}
    </Element>
  );
};

export default React.memo(Textarea);
