import React from 'react';

// Hooks

// Components
import { Element } from '..';

// Utils

// Styles
import styles from './Textarea.module.scss';

// Interfaces and Types

const Textarea = React.forwardRef(
  (
    { className = '', children, ...props }: GenericComponentProps<'textarea'>,
    ref?: PolymorphicRef<'textarea'>
  ) => {
    return (
      <Element
        as="textarea"
        {...props}
        ref={ref}
        className={`${styles.textArea} ${className}`}
      >
        {children}
      </Element>
    );
  }
);

Textarea.displayName = 'Textarea';

export default React.memo(Textarea);
