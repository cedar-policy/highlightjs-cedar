var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var cedar_exports = {};
__export(cedar_exports, {
  default: () => cedar_default
});
module.exports = __toCommonJS(cedar_exports);
//! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
//! SPDX-License-Identifier: Apache-2.0
function cedar_default(hljs) {
  const GLOBALS = {
    match: /\b(?:ip|decimal)(?=\()/,
    scope: "built_in"
  };
  const VARIABLES = {
    match: /\b(?<!\.)(principal|action|resource|context)\b/,
    scope: "variable"
  };
  const TEMPLATES = {
    match: /(?:\?resource|\?principal)\b/,
    scope: "template-variable"
  };
  const POLICY = {
    match: /\b(?<!\.)(permit|forbid|when|unless)\b/,
    scope: "keyword"
  };
  const KEYWORDS = {
    keyword: ["if", "then", "else"],
    literal: ["true", "false"]
  };
  const PUNCTUATION = {
    match: /(?:,|;|\.|\[|\]|\(|\)|{|})/,
    scope: "punctuation"
  };
  const OPERATORS = {
    begin: /(?<!\w)/.source + "(" + [
      "&&",
      "\\|\\|",
      "==",
      "!=",
      ">=",
      "<=",
      ">",
      "<",
      "\\+",
      "-",
      "\\*",
      "in",
      "like",
      "has"
    ].join("|") + ")" + /(?!\w)/.source,
    scope: "operator",
    relevance: 0
  };
  const INTEGER = {
    scope: "number",
    begin: `0|-?[1-9](_?[0-9])*`,
    relevance: 0
  };
  const METHODS = {
    scope: "title.function.invoke",
    begin: `(?=.)(contains|containsAll|containsAny)(?=\\()`,
    relevance: 0
  };
  const DECIMAL_METHODS = {
    scope: "title.function.invoke",
    begin: `(?=.)(lessThan|lessThanOrEqual|greaterThan|greaterThanOrEqual)(?=\\()`,
    relevance: 0
  };
  const IP_METHODS = {
    scope: "title.function.invoke",
    begin: `(?=.)(isIpv4|isIpv6|isLoopback|isMulticast|isInRange)(?=\\()`,
    relevance: 0
  };
  return {
    name: "Cedar",
    aliases: ["cedar"],
    case_insensitive: false,
    keywords: KEYWORDS,
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      GLOBALS,
      VARIABLES,
      POLICY,
      INTEGER,
      PUNCTUATION,
      OPERATORS,
      METHODS,
      DECIMAL_METHODS,
      IP_METHODS,
      TEMPLATES
    ]
  };
}
