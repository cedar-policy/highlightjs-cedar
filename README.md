# highlight.js support for Cedar policy language and Cedar human-readable schema

[highlight.js](https://highlightjs.org/) (syntax highlighting for the Web) support for Cedar based on [Grammar specification for Cedar policy syntax](https://docs.cedarpolicy.com/syntax-grammar.html) and for Cedar human-readable schema based on [Grammar specification for human-readable schemas](https://docs.cedarpolicy.com/schema/human-readable-schema-grammar.html). Project structure derived from [language contributor checklist](https://highlightjs.readthedocs.io/en/latest/language-contribution.html) and mapped to the [Stylable Scopes](https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html).

See it in action on <https://docs.cedarpolicy.com/>

## Use

Web browser `<script src=>` usage example from `test/static/index.html` (adjust the script `src` paths as required):

```html
    <script src="highlight.min.js"></script>
    <script src="hljs-cedar.min.js"></script>
    <script type="text/javascript">
      window.onload = () => {
        hljs.registerLanguage('cedar', hljsCedar);
        hljs.registerLanguage('cedarschema', hljsCedarschema);
        hljs.highlightAll();
      };
    </script>
```

ECMAScript module `import` usage example from `test/vite/index.html` (adjust the import `from` paths as required):

```javascript
import hljs from 'highlight.js';
import { hljsCedar, hljsCedarschema } from 'hljs-cedar.mjs';
hljs.registerLanguage('cedar', hljsCedar);
hljs.registerLanguage('cedarschema', hljsCedarschema);
hljs.highlightAll();
```

## Development

### Install

Install the project dependencies using `npm install`.

`src/cedar.js` is the main source file in ECMAScript module format.

### Build

The `npm run build` script uses [esbuild](https://esbuild.github.io/api/)to create multiple files in the `dist` folder:

- `hljs-cedar.js` - Web browser `<script src=>` compatible version.  Sets `window.hljsCedar` and `window.hljsCedarschema` to highlight functions.
- `hljs-cedar.min.js` - Minified web browser `<script src=>` compatible version.
- `hljs-cedar.mjs` - ECMAScript module version with default export.  Used by `test/cedar-esm.test.js` test cases and `test\vite\main.js` from Vite web app.
  - `import hljsCedar from '../dist/hljs-cedar.mjs';`
- `hljs-cedar.cjs` - CommonJS module version with default export.  Used by `test/cedar-commonjs.test.js` test cases.
  - `const hljsCedar = require('../dist/hljs-cedar.cjs').default;`

### Test

`npm run test` uses [vitest](https://vitest.dev) to syntax highlight `test/data/*.cedar` and `test/data/*.cedarschema` files and compares against a generated `.html`
[File Snapshots](https://vitest.dev/guide/snapshot.html#file-snapshots) for each Cedar and Cedar human-readable schema file.

View either the static `test/static/index.html` on your browser or `npm run dev` and `test/vite/index.html` renders in your browser:  <http://localhost:5173/>

When new `test/data/*.cedar` or `test/data/*.cedarschema` files are created, `npm run testdata` will update the contents of each `index.html` file.

### Pull Request

Pull requests require a [Developer Certificate of Origin (DCO)](https://probot.github.io/apps/dco/) to certify the right to submit the code they are contributing to the project.  Either add the `-s` or the `--signoff` flag to your commits or update your `.vscode/settings.json` with `git.alwaysSignOff`.

```json
{
  "git.alwaysSignOff": true
}
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
