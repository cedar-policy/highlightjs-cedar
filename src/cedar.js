//! Copyright Cedar Contributors
//! SPDX-License-Identifier: Apache-2.0
/*
Language: Cedar
Description: Cedar is a language for writing authorization policies and making authorization decisions based on those policies.
Website: https://www.cedarpolicy.com/
*/
// Grammar references:
//   policy -> https://docs.cedarpolicy.com/policies/syntax-grammar.html
//   schema -> https://docs.cedarpolicy.com/schema/human-readable-schema-grammar.html
//
// Every pattern below is a regex literal. Do not use template literals here:
// `\.` is not a valid escape in a template literal, so JavaScript silently drops
// the backslash and `(?=\.)` becomes `(?=.)` -- a lookahead for any character.
export function hljsCedar(hljs) {
  // ExtFun ::= [Path '::'] IDENT -- the extension constructors.
  const GLOBALS = {
    match: /\b(?:ip|decimal|datetime|duration)(?=\()/,
    scope: 'built_in',
  };

  // VAR ::= 'principal' | 'action' | 'resource' | 'context'
  const VARIABLES = {
    match: /\b(?<!\.)(?:principal|action|resource|context)\b/,
    scope: 'variable',
  };

  const TEMPLATES = {
    match: /\?(?:principal|resource)\b/,
    scope: 'template-variable',
  };

  const POLICY = {
    match: /\b(?<!\.)(?:permit|forbid|when|unless)\b/,
    scope: 'keyword',
  };

  // Annotation ::= '@' ANYIDENT ( '('STR')' )?
  // ANYIDENT, not IDENT, so reserved words are legal annotation names (@is, @if).
  // The value is optional. Placed before the operator modes so that the `is` in
  // `@is(...)` is not scoped as an operator.
  const ANNOTATION = {
    match: /@[_a-zA-Z][_a-zA-Z0-9]*/,
    scope: 'meta',
  };

  const KEYWORDS = {
    keyword: ['if', 'then', 'else'],
    literal: ['true', 'false'],
  };

  const PUNCTUATION = {
    match: /::|[,;.[\](){}:]/,
    scope: 'punctuation',
  };

  // Symbolic operators carry no word-boundary guards. Wrapping the whole
  // alternation in (?<!\w) ... (?!\w) meant that `true&&false`, `context.a==1`
  // and `context.a+1>2` left their operators unscoped.
  // '!=' precedes '!' so the two-character operator wins.
  const OPERATORS = {
    match: /&&|\|\||==|!=|>=|<=|>|<|\+|-|\*|!/,
    scope: 'operator',
    relevance: 0,
  };

  // RELOP 'in' and the Relation-level word operators do need the guards.
  const WORD_OPERATORS = {
    match: /\b(?:in|like|has|is)\b/,
    scope: 'operator',
    relevance: 0,
  };

  // INT ::= '-'? ['0'-'9']+
  // The sign is left to OPERATORS so that `a - 1` keeps its operator, and the
  // \b anchors stop digits inside an identifier from being scoped as numbers
  // (`context.i18n`, `context.a1`, `k8s`).
  const INTEGER = {
    scope: 'number',
    match: /\b[0-9]+\b/,
    relevance: 0,
  };

  // Entity ::= Path '::' STR -- the '::"' lookahead keeps this from firing on a
  // bare Path such as the `__cedar::` prefix of an ExtFun call.
  const ENTITIES = {
    match: /\b(?:[_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*(?=::")/,
    scope: 'title.class',
  };

  // Relation ::= ... | Add 'is' Path ('in' Add)?
  // Must precede WORD_OPERATORS, which also matches `is` at the same offset.
  const ISENTITY = {
    match: [
      /\bis\b/,
      /\s+/,
      /(?:[_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*/,
    ],
    scope: {
      1: 'operator',
      3: 'title.class',
    },
  };

  // Access ::= '.' IDENT ['(' [ExprList] ')']
  // The lookbehind requires the receiver dot, so a bare `contains(` is not
  // scoped as a method. Longest alternatives first.
  const METHODS = {
    scope: 'title.function.invoke',
    match:
      /(?<=\.)(?:containsAll|containsAny|contains|isEmpty|getTag|hasTag)(?=\()/,
    relevance: 0,
  };

  const DECIMAL_METHODS = {
    scope: 'title.function.invoke',
    match:
      /(?<=\.)(?:lessThanOrEqual|lessThan|greaterThanOrEqual|greaterThan)(?=\()/,
    relevance: 0,
  };

  const IP_METHODS = {
    scope: 'title.function.invoke',
    match: /(?<=\.)(?:isIpv4|isIpv6|isLoopback|isMulticast|isInRange)(?=\()/,
    relevance: 0,
  };

  const DATETIME_METHODS = {
    scope: 'title.function.invoke',
    match: /(?<=\.)(?:offset|durationSince|toDate|toTime)(?=\()/,
    relevance: 0,
  };

  const DURATION_METHODS = {
    scope: 'title.function.invoke',
    match: /(?<=\.)(?:toMilliseconds|toSeconds|toMinutes|toHours|toDays)(?=\()/,
    relevance: 0,
  };

  return {
    name: 'Cedar',
    aliases: ['cedar'],
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
      TEMPLATES,
    ],
  };
}

export function hljsCedarschema(hljs) {
  // Annotation := '@' IDENT '(' STR ')' -- legal before a namespace, an entity,
  // an action, a type declaration and each attribute declaration.
  const ANNOTATION = {
    match: /@[_a-zA-Z][_a-zA-Z0-9]*/,
    scope: 'meta',
  };

  // Namespace := (Annotations 'namespace' Path '{' {Decl} '}') | Decl
  // The name is a Path, not a single IDENT.
  const NAMESPACE = {
    match: [
      /\bnamespace/,
      /\s+/,
      /(?:[_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*/,
    ],
    scope: {
      1: 'keyword',
      3: 'title.class',
    },
  };

  const KEYWORDS = {
    match: /\b(?:type|entity|action)(?=\s+)/,
    scope: 'keyword',
  };

  // 'in' takes an EntType or a bracketed list, so it is not gated on a '['.
  // 'enum' introduces a bracketed list of strings.
  // 'tags' is not gated on a preceding '}': RecType is optional, so
  // `entity E tags String;` and `entity E in [P] tags Set<String>;` are legal.
  // The `tags` assertion is negative -- excluding ':' ';' ',' '=' ')' ']' '}' --
  // so that `tags` used as an attribute name, an entity or action name, a
  // declared type name or a type reference is not scoped as a keyword. A real
  // `tags` clause is always followed by a Type, which starts with an identifier
  // or '{'. This matches the pattern used by prism-cedar.
  const MOREKEYWORDS = {
    match:
      /\bin\b|\benum\b(?=\s*\[)|\bappliesTo\b(?=\s*\{)|(?<!\b(?:entity|action|type)\s+)(?<!,\s*)\btags\b(?!\s*[?]?[:;,=})\]])/,
    scope: 'keyword',
  };

  const OPERATORS = {
    match: /=/,
    scope: 'operator',
  };

  // '<' and '>' are the SetType brackets.
  const PUNCTUATION = {
    match: /::|[{}[\](),;:<>]/,
    scope: 'punctuation',
  };

  // AttrDecls := Annotations Name ['?'] ':' Type
  const ATTRS = {
    match: /\b[_a-zA-Z][_a-zA-Z0-9]*(?=[?]?:(?!:))/,
    scope: 'property',
  };

  // Name := IDENT | STR, so a quoted attribute name is a property rather than a
  // string. Must precede QUOTE_STRING_MODE, which matches at the same offset.
  const STRING_ATTRS = {
    match: /"(?:\\[\s\S]|[^\\"\r\n])*"(?=\s*[?]?:(?!:))/,
    scope: 'property',
  };

  // PRIMTYPE := 'Long' | 'String' | 'Bool'; RESERVED adds Boolean, Entity,
  // Extension, Record and Set; the extension types are ipaddr, decimal,
  // datetime and duration. Restricted to type position -- after ':' in an
  // attribute, after '=' in a type declaration, inside 'Set<...>', or after
  // 'tags' -- so that `entity String;` and an attribute named `Set` are not
  // mistaken for built-in types.
  const BUILTIN_TYPES = {
    match:
      /(?<=[:=<]\s*|\btags\s+)(?<!::\s*)(?:Boolean|Bool|Long|String|Record|Entity|Extension|Set|ipaddr|decimal|datetime|duration)\b/,
    scope: 'type',
  };

  // EntType := Path
  const ENTITY_TYPES = {
    match: /\b(?:[_a-zA-Z][_a-zA-Z0-9]*::)+[_a-zA-Z][_a-zA-Z0-9]*/,
    scope: 'title.class',
  };

  return {
    name: 'Cedar schema',
    aliases: ['cedarschema'],
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
      ATTRS,
    ],
  };
}

// default export to support backward compatibility
// import hljsCedar from './cedar';
export default hljsCedar;
