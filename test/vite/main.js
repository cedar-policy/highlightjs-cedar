// Copyright Cedar Contributors
// SPDX-License-Identifier: Apache-2.0
import '../../node_modules/highlight.js/styles/github.css';
import hljs from 'highlight.js';
import hljsCedar from '../../dist/hljs-cedar.mjs';
hljs.registerLanguage('cedar', hljsCedar);
hljs.highlightAll();
