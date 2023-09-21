# highlight.js support for Cedar policy language

[highlight.js](https://highlightjs.org/) (syntax highlighting for the Web) support for Cedar based on [Grammar specification for Cedar policy syntax](https://docs.cedarpolicy.com/syntax-grammar.html) based on structure from [language contributor checklist](https://highlightjs.readthedocs.io/en/latest/language-contribution.html) and mapped to the [Stylable Scopes](https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html).

See it in action on <https://docs.cedarpolicy.com/>

## Install

Install the project dependencies using `npm install`.

`src/cedar.js` is the main source file in ECMAScript module format.

## Build

The `npm run build` script uses [esbuild](https://esbuild.github.io/api/)to create multiple files in the `dist` folder:

- `hljs-cedar.js` - Web browser `<script src=>` compatible version.  Sets `window.hljsCedar` to highlight function.
- `hljs-cedar.min.js` - Minified web browser `<script src=>` compatible version.
- `hljs-cedar.mjs` - ECMAScript module version with default export.  Used by `test/cedar-esm.test.js` test cases and `test\vite\main.js` from Vite web app.
  - `import hljsCedar from '../dist/hljs-cedar.mjs';`
- `hljs-cedar.cjs` - CommonJS module version with default export.  Used by `test/cedar-commonjs.test.js` test cases.
  - `const hljsCedar = require('../dist/hljs-cedar.cjs').default;`

## Test

`npm run test` uses [vitest](https://vitest.dev) to syntax highlight `test/data/*.cedar` files and compares against a generated `.html`
[File Snapshots](https://vitest.dev/guide/snapshot.html#file-snapshots) for each Cedar file.

View either the static `test/static/index.html` on your browser or `npm run dev` and `test/vite/index.html` renders in your browser:  <http://localhost:5173/>

When new `test/data/*.cedar` files are created, `npm run testdata` will update the contents of each `index.html` file.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
