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

// A .cedar and a .cedarschema input sharing a base name would both snapshot to
// <base>.html and silently overwrite each other, so guard against it.
describe('data/ snapshot targets', () => {
  it('no two inputs map to the same .html snapshot', () => {
    const seen = new Map();
    const collisions = [];
    fs.readdirSync(path.join(__dirname, 'data'))
      .filter((f) => f.endsWith('.cedar') || f.endsWith('.cedarschema'))
      .forEach((file) => {
        const html = file.replace(/\.cedarschema$|\.cedar$/, '.html');
        if (seen.has(html)) {
          collisions.push(`${seen.get(html)} and ${file} both map to ${html}`);
        }
        seen.set(html, file);
      });
    expect(collisions).toEqual([]);
  });
});
