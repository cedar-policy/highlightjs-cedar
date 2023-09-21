// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/*
 * vitest script of ECMAScript module version of highlightjs-cedar
 */
import { describe, expect, it } from 'vitest';
import * as path from 'path';
import * as fs from 'fs';
import hljs from 'highlight.js';
import hljsCedar from '../dist/hljs-cedar.mjs';

hljs.registerLanguage('cedar', hljsCedar);

describe('data/*.cedar files', () => {
  const files = fs
    .readdirSync(path.join(__dirname, 'data'))
    .filter((f) => f.endsWith('.cedar'));
  files.forEach((file) => {
    it(file, () => {
      const code = fs.readFileSync(path.join(__dirname, 'data', file), 'utf8');
      const result = hljs.highlight(code, { language: 'cedar' }).value;

      expect(result).toMatchFileSnapshot(
        path.join(__dirname, 'data', file.replace('.cedar', '.html')),
      );
    });
  });
});
