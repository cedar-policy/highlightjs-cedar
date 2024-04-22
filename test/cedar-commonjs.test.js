// Copyright Cedar Contributors
// SPDX-License-Identifier: Apache-2.0
/*
 * vitest script of CommonJS module version of highlightjs-cedar
 */
import { describe, expect, it } from 'vitest';
const path = require('node:path');
const fs = require('node:fs');
const hljs = require('highlight.js');
const { hljsCedar, hljsCedarschema } = require('../dist/hljs-cedar.cjs');

hljs.registerLanguage('cedar', hljsCedar);
hljs.registerLanguage('cedarschema', hljsCedarschema);

const processLanguage = (language) => {
  const files = fs
    .readdirSync(path.join(__dirname, 'data'))
    .filter((f) => f.endsWith(`.${language}`));
  files.forEach((file) => {
    it(file, () => {
      const code = fs.readFileSync(path.join(__dirname, 'data', file), 'utf8');
      const result = hljs.highlight(code, { language: language }).value;

      expect(result).toMatchFileSnapshot(
        path.join(__dirname, 'data', file.replace(`.${language}`, '.html')),
      );
    });
  });
};

describe('data/*.cedar files', () => {
  processLanguage('cedar');
});

describe('data/*.cedarschema files', () => {
  processLanguage('cedarschema');
});
