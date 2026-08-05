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
  default: () => cedar_default,
  hljsCedar: () => hljsCedar,
  hljsCedarschema: () => hljsCedarschema
});
module.exports = __toCommonJS(cedar_exports);
//! Copyright Cedar Contributors
//! SPDX-License-Identifier: Apache-2.0
function hljsCedar(hljs) {
  const GLOBALS = {
    match: /\b(?:ip|decimal|datetime|duration)(?=\()/,
    scope: "built_in"
  };
  const VARIABLES = {
    match: /\b(?<!\.)(?:principal|action|resource|context)\b/,
    scope: "variable"
  };
  const TEMPLATES = {
    match: /\?(?:principal|resource)\b/,
    scope: "template-variable"
  };
  const POLICY = {
    match: /\b(?<!\.)(?:permit|forbid|when|unless)\b/,
    scope: "keyword"
  };
  const ANNOTATION = {
    match: /@[_a-zA-Z][_a-zA-Z0-9]*/,
    scope: "meta"
  };
  const KEYWORDS = {
    keyword: ["if", "then", "else"],
    literal: ["true", "false"]
  };
  const PUNCTUATION = {
    match: /::|[,;.[\](){}:]/,
    scope: "punctuation"
  };
  const OPERATORS = {
    match: /&&|\|\||==|!=|>=|<=|>|<|\+|-|\*|!/,
    scope: "operator",
    relevance: 0
  };
  const WORD_OPERATORS = {
    match: /\b(?:in|like|has|is)\b/,
    scope: "operator",
    relevance: 0
  };
  const INTEGER = {
    scope: "number",
    match: /\b[0-9]+\b/,
    relevance: 0
  };
  const ENTITIES = {
    match: /\b(?:[_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*(?=::")/,
    scope: "title.class"
  };
  const ISENTITY = {
    match: [
      /\bis\b/,
      /\s+/,
      /(?:[_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*/
    ],
    scope: {
      1: "operator",
      3: "title.class"
    }
  };
  const METHODS = {
    scope: "title.function.invoke",
    match: /(?<=\.)(?:containsAll|containsAny|contains|isEmpty|getTag|hasTag)(?=\()/,
    relevance: 0
  };
  const DECIMAL_METHODS = {
    scope: "title.function.invoke",
    match: /(?<=\.)(?:lessThanOrEqual|lessThan|greaterThanOrEqual|greaterThan)(?=\()/,
    relevance: 0
  };
  const IP_METHODS = {
    scope: "title.function.invoke",
    match: /(?<=\.)(?:isIpv4|isIpv6|isLoopback|isMulticast|isInRange)(?=\()/,
    relevance: 0
  };
  const DATETIME_METHODS = {
    scope: "title.function.invoke",
    match: /(?<=\.)(?:offset|durationSince|toDate|toTime)(?=\()/,
    relevance: 0
  };
  const DURATION_METHODS = {
    scope: "title.function.invoke",
    match: /(?<=\.)(?:toMilliseconds|toSeconds|toMinutes|toHours|toDays)(?=\()/,
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
      ANNOTATION,
      GLOBALS,
      VARIABLES,
      POLICY,
      INTEGER,
      PUNCTUATION,
      ENTITIES,
      ISENTITY,
      WORD_OPERATORS,
      OPERATORS,
      METHODS,
      DECIMAL_METHODS,
      IP_METHODS,
      DATETIME_METHODS,
      DURATION_METHODS,
      TEMPLATES
    ]
  };
}
function hljsCedarschema(hljs) {
  const ANNOTATION = {
    match: /@[_a-zA-Z][_a-zA-Z0-9]*/,
    scope: "meta"
  };
  const NAMESPACE = {
    match: [
      /\bnamespace/,
      /\s+/,
      /(?:[_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*/
    ],
    scope: {
      1: "keyword",
      3: "title.class"
    }
  };
  const KEYWORDS = {
    match: /\b(?:type|entity|action)(?=\s+)/,
    scope: "keyword"
  };
  const MOREKEYWORDS = {
    match: /\bin\b|\benum\b(?=\s*\[)|\bappliesTo\b(?=\s*\{)|(?<!\b(?:entity|action|type)\s+)(?<!,\s*)\btags\b(?!\s*[?]?[:;,=})\]])/,
    scope: "keyword"
  };
  const OPERATORS = {
    match: /=/,
    scope: "operator"
  };
  const PUNCTUATION = {
    match: /::|[{}[\](),;:<>]/,
    scope: "punctuation"
  };
  const ATTRS = {
    match: /\b[_a-zA-Z][_a-zA-Z0-9]*(?=[?]?:(?!:))/,
    scope: "property"
  };
  const STRING_ATTRS = {
    match: /"(?:\\[\s\S]|[^\\"\r\n])*"(?=\s*[?]?:(?!:))/,
    scope: "property"
  };
  const BUILTIN_TYPES = {
    match: /(?<=[:=<]\s*|\btags\s+)(?<!::\s*)(?:Boolean|Bool|Long|String|Record|Entity|Extension|Set|ipaddr|decimal|datetime|duration)\b/,
    scope: "type"
  };
  const ENTITY_TYPES = {
    match: /\b(?:[_a-zA-Z][_a-zA-Z0-9]*::)+[_a-zA-Z][_a-zA-Z0-9]*/,
    scope: "title.class"
  };
  return {
    name: "Cedar schema",
    aliases: ["cedarschema"],
    case_insensitive: false,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      STRING_ATTRS,
      hljs.QUOTE_STRING_MODE,
      ANNOTATION,
      NAMESPACE,
      KEYWORDS,
      MOREKEYWORDS,
      BUILTIN_TYPES,
      ENTITY_TYPES,
      OPERATORS,
      PUNCTUATION,
      ATTRS
    ]
  };
}
var cedar_default = hljsCedar;
