import type { ReactNode } from "react";

const KEYWORDS = new Set([
  "import", "from", "const", "let", "var", "new", "await", "async", "return", "function",
  "use", "fn", "pub", "mut", "package", "func", "def", "class", "public", "static", "void",
  "using", "namespace", "try", "catch", "throw", "if", "else", "for", "in", "with", "as",
  "curl", "fetch", "require", "echo", "true", "false", "null", "nil", "None", "True", "False",
]);

const TOKEN =
  /(\/\/[^\n]*|#(?!\[)[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(--?[a-zA-Z][\w-]*)|([A-Za-z_$][\w$]*)(?=\s*:(?!:))|([A-Za-z_$][\w$]*)/g;

/** Minimal syntax colouring for the static code samples. */
export function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of code.matchAll(TOKEN)) {
    const start = m.index ?? 0;
    if (start > last) out.push(code.slice(last, start));
    const [text, comment, str, flag, key, word] = m;
    let cls: string | undefined;
    if (comment) cls = "text-stone-400";
    else if (str) cls = "text-green-700";
    else if (word && KEYWORDS.has(word) && !key && !flag) cls = "text-stone-950";
    out.push(cls ? <span key={i++} className={cls}>{text}</span> : text);
    last = start + text.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}
