// Copyright Cedar Contributors
// SPDX-License-Identifier: Apache-2.0
import '../../dist/github.min.css';
import hljs from 'highlight.js';
import { hljsCedar, hljsCedarschema } from '../../dist/hljs-cedar.mjs';
hljs.registerLanguage('cedar', hljsCedar);
hljs.registerLanguage('cedarschema', hljsCedarschema);
hljs.highlightAll();
