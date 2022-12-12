interface Handler {
  target: {
    name: string;
    id: string;
    value: string;
  };
}

type BaseProps<C extends React.ElementType> = {
  as?: C;
  className?: string;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (BaseProps<C> & P);

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & BaseProps<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponent = <C extends React.ElementType = 'span'>(
  props: PolymorphicComponentProps<C>
) => React.ReactElement | null;

type PolymorphicRef<C extends React.ElementType = 'span'> =
  React.ComponentPropsWithRef<C>['ref'];
