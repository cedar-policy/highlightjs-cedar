//! Copyright Cedar Contributors
//! SPDX-License-Identifier: Apache-2.0
function hljsCedar(hljs) {
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
      "has",
      "is"
    ].join("|") + ")" + /(?!\w)/.source,
    scope: "operator",
    relevance: 0
  };
  const INTEGER = {
    scope: "number",
    begin: `0|-?[1-9](_?[0-9])*`,
    relevance: 0
  };
  const ENTITIES = {
    match: /(?=\b)(([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*)(?=::)/,
    scope: "title.class"
  };
  const ISENTITY = {
    match: [/is/, /\s+/, /([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*/],
    scope: {
      1: "operator",
      3: "title.class"
    }
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
      ENTITIES,
      ISENTITY,
      OPERATORS,
      METHODS,
      DECIMAL_METHODS,
      IP_METHODS,
      TEMPLATES
    ]
  };
}
function hljsCedarschema(hljs) {
  const KEYWORDS = {
    match: /\b(?:namespace|type|entity|action)(?=\s+)/,
    scope: "keyword"
  };
  const MOREKEYWORDS = {
    begin: "\\b(?:in)\\b|\\b(?:appliesTo)(?=\\s*{)",
    scope: "keyword"
  };
  const OPERATORS = {
    begin: "=",
    scope: "operator"
  };
  const PUNCTUATION = {
    begin: "{|}|\\[|]|;",
    scope: "punctuation"
  };
  const ATTRS = {
    begin: /\b(?:[_a-zA-Z][_a-zA-Z0-9]*)(?=[?]?:(?!:))/,
    scope: "property"
  };
  return {
    name: "Cedar schema",
    aliases: ["cedarschema"],
    case_insensitive: false,
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      KEYWORDS,
      MOREKEYWORDS,
      OPERATORS,
      PUNCTUATION,
      ATTRS
    ]
  };
}
var cedar_default = hljsCedar;
export {
  cedar_default as default,
  hljsCedar,
  hljsCedarschema
};
