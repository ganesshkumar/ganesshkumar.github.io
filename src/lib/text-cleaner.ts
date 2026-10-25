import emojiRegex from "emoji-regex";
import { CHARACTER_NAMES } from "./text-cleaner-names";

export interface CleanOptions {
  controls: boolean;
  invisible: boolean;
  spaces: boolean;
  dashes: boolean;
  quotes: boolean;
  primes: boolean;
  joiners: boolean;
  wordJoiners: boolean;
  softHyphens: boolean;
  bidi: boolean;
  emojis: boolean;
}
export type CleanCategory = keyof CleanOptions;

export const DEFAULT_CLEAN_OPTIONS: CleanOptions = {
  controls: true,
  invisible: false,
  spaces: true,
  dashes: false,
  quotes: false,
  primes: false,
  joiners: false,
  wordJoiners: false,
  softHyphens: false,
  bidi: false,
  emojis: false,
};

export const CLEAN_PRESETS = {
  conservative: { ...DEFAULT_CLEAN_OPTIONS },
  plainText: { ...DEFAULT_CLEAN_OPTIONS, dashes: true, quotes: true },
};

export interface TextFinding {
  id: string;
  category: CleanCategory;
  name: string;
  codePoints: string;
  start: number;
  end: number;
  line: number;
  column: number;
  original: string;
  replacement: string;
}

type Rule = readonly [CleanCategory, RegExp, string, string | ((character: string) => string)];
// Deliberately narrow: C0 except TAB/LF/CR, plus DEL. Not all Unicode Cf.
const RULES: readonly Rule[] = [
  ["controls", /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/, "Control character", ""],
  ["invisible", /[\u200b\ufeff]/, "Zero-width space or BOM", ""],
  ["spaces", /[\u00a0\u202f\u205f]/, "Nonstandard space", " "],
  ["joiners", /[\u200c\u200d]/, "Zero-width joiner or non-joiner", ""],
  ["wordJoiners", /\u2060/, "Word joiner", ""],
  ["softHyphens", /\u00ad/, "Soft hyphen", ""],
  ["bidi", /[\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/, "Bidirectional formatting mark", ""],
  ["dashes", /[—–‒―⁓]/, "Dash variant", "-"],
  ["quotes", /[“”‘’]/, "Curly quote", (character) => /[“”]/.test(character) ? '"' : "'"],
  ["primes", /[′″]/, "Prime mark", (character) => character === "″" ? '"' : "'"],
];

/** Original offsets are UTF-16; columns count code points, not graphemes. */
export function inspectText(input: string, options: Partial<CleanOptions> = {}): TextFinding[] {
  const enabled = { ...DEFAULT_CLEAN_OPTIONS, ...options };
  const findings: TextFinding[] = [];
  let start = 0;
  let line = 1;
  let column = 1;
  // A fresh regex per call avoids shared global lastIndex state.
  const emojiByStart = new Map(
    Array.from(input.matchAll(emojiRegex()))
      // The upstream regex includes textual representations. Keep bare text
      // symbols and any sequence explicitly followed by text presentation VS15.
      .filter((match) => !/^[0-9#*©®™]$/.test(match[0]) && input[match.index + match[0].length] !== "\ufe0e")
      .map((match) => [match.index, match[0]]),
  );
  while (start < input.length) {
    const emoji = emojiByStart.get(start);
    const original = emoji ?? String.fromCodePoint(input.codePointAt(start)!);
    const rule: Rule | undefined = emoji
      ? ["emojis", /./, "Emoji sequence", ""]
      : RULES.find(([, pattern]) => pattern.test(original));
    if (rule) {
      const [category, , name, replacement] = rule;
      findings.push({
        id: `${category}:${start}`, category, name: CHARACTER_NAMES[original] ?? name,
        codePoints: Array.from(original, (character) => `U+${character.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`).join(" "),
        start, end: start + original.length, line, column, original,
        replacement: enabled[category] ? (typeof replacement === "string" ? replacement : replacement(original)) : original,
      });
    }
    if (original === "\r" || (original === "\n" && input[start - 1] !== "\r")) {
      line += 1;
      column = 1;
    } else if (original !== "\n") column += Array.from(original).length;
    start += original.length;
  }
  return findings;
}

export interface TextEdit extends TextFinding {
  outputStart: number;
  outputEnd: number;
}

export function cleanText(input: string, options: Partial<CleanOptions> = {}) {
  const changes = Object.fromEntries(Object.keys(DEFAULT_CLEAN_OPTIONS).map((category) => [category, 0])) as Record<CleanCategory, number>;
  const findings = inspectText(input, options);
  const edits: TextEdit[] = [];
  let text = "";
  let cursor = 0;
  for (const finding of findings) {
    if (finding.original === finding.replacement) continue;
    text += input.slice(cursor, finding.start);
    const outputStart = text.length;
    text += finding.replacement;
    edits.push({ ...finding, outputStart, outputEnd: text.length });
    cursor = finding.end;
    changes[finding.category] += 1;
  }
  text += input.slice(cursor);
  return { text, changes, findings, edits };
}
