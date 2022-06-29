const nameToClass = (name) => {
  return name.charAt(0).toLowerCase() + name.slice(1);
};

const stylesClass = (name) =>
  '`' + '${styles.' + `${name}` + '}' + ' ${className}' + '`';

exports.component = (name) => `import React from 'react';

// Hooks

// Components

// Utils

// Styles
import styles from './${name}.module.scss';

// Interfaces and Types

export interface I${name}Props {
  /** Optional classname to pass to parent container */
  className?: string;
}

const ${name} = ({ className = ''}: I${name}Props) => {
  // State

  // Hooks

  // Interaction Handlers

  // Display Methods

  // Return
  return (
    <div className={${stylesClass(nameToClass(name))}}>
      Hello, I am a ${name} component.
    </div>
  )
};

export default ${name}
`;

// component.scss

exports.style = (name) => `@import '../../styles/';

.${nameToClass(name)} {}
`;

// index.test

exports.barrel = (name) => `import ${name} from './${name}';

export default ${name}
`;
