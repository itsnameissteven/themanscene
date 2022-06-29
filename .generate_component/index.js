const fs = require('fs');
const { component, style, barrel } = require('./component_template.js');

// grab  component name from terminal argument
const [name] = process.argv.slice(2);
if (!name) throw new Error('You must include a component name!');

// create folder
const dir = `./components/${name}/`;
if (fs.existsSync(dir))
  throw new Error('A component already exists with that name :(');
fs.mkdirSync(dir);

function fileWriteCallback(err) {
  if (err) throw err;
}

// component.tsx
fs.writeFile(`${dir}/${name}.tsx`, component(name), fileWriteCallback);
// component.scss
fs.writeFile(`${dir}/${name}.module.scss`, style(name), fileWriteCallback);
// index.ts
fs.writeFile(`${dir}/index.ts`, barrel(name), fileWriteCallback);
// Add component to main index.test
fs.readFile('./components/index.ts', 'utf8', function (err, data) {
  if (err) throw err;

  // grab all existing components and combine with new component
  const currentComponents = data.match(/(?<=import )(.*?)(?= from)/g);
  const newComponents = [name, ...currentComponents].sort();

  // create the import and export statements
  const importStatements = newComponents
    .map((importName) => `import ${importName} from './${importName}';\n`)
    .join('');
  const newComponentsExportStatements = newComponents
    .map((component) => ` ${component},\n`)
    .join('');
  const exportStatements = `export {\n${newComponentsExportStatements}};\n`;

  fileContent = `${importStatements}\n${exportStatements}`;

  fs.writeFile(`./components/index.ts`, fileContent, fileWriteCallback);
});
