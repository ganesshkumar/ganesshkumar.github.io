import { CLEAN_PRESETS, type CleanOptions } from "./text-cleaner";

/** Visible examples are checked against the real engine by the page SEO tests. */
export const TEXT_CLEANER_EXAMPLES: {
  input: string;
  inputDisplay: string;
  output: string;
  rule: string;
  options: Partial<CleanOptions>;
}[] = [
  {
    input: "Hello\u200b world",
    inputDisplay: "Hello[ZERO WIDTH SPACE] world",
    output: "Hello world",
    rule: "Remove zero-width spaces and BOM (advanced rule)",
    options: { invisible: true },
  },
  {
    input: "“Hello” — world",
    inputDisplay: "“Hello” — world",
    output: '"Hello" - world',
    rule: "Plain-text cleanup",
    options: CLEAN_PRESETS.plainText,
  },
  {
    input: "Hi👩🏽‍💻!",
    inputDisplay: "Hi👩🏽‍💻!",
    output: "Hi!",
    rule: "Remove emojis (optional rule)",
    options: { emojis: true },
  },
];
