// Copyright Cedar Contributors
// SPDX-License-Identifier: Apache-2.0
/*
 * vitest script of ECMAScript module version of highlightjs-cedar
 */
import { describe, expect, it } from 'vitest';
import * as path from 'node:path';
import * as fs from 'node:fs';
import hljs from 'highlight.js';
import hljsCedar, { hljsCedarschema } from '../dist/hljs-cedar.mjs';

hljs.registerLanguage('cedar', hljsCedar);
hljs.registerLanguage('cedarschema', hljsCedarschema);

const processLanguage = (language) => {
  const files = fs
    .readdirSync(path.join(__dirname, 'data'))
    .filter((f) => f.endsWith(`.${language}`));
  files.forEach((file) => {
    it(file, async () => {
      const code = fs.readFileSync(path.join(__dirname, 'data', file), 'utf8');
      const result = hljs.highlight(code, { language: language }).value;

      await expect(result).toMatchFileSnapshot(
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
