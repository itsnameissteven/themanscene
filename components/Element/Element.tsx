import React from 'react';

const Element: PolymorphicComponent = <C extends React.ElementType = 'button'>({
  as,
  children,
  ...props
}: PolymorphicComponentProps<C>) => {
  const Component = as || 'button';

  return (
    <Component {...props} className={props.className}>
      {children}
    </Component>
  );
};

export default Element;
