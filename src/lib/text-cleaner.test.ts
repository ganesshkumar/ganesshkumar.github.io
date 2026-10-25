import { describe, expect, it } from "vitest";
import { cleanText, inspectText, CLEAN_PRESETS, DEFAULT_CLEAN_OPTIONS } from "./text-cleaner";

describe("cleanText", () => {
  it("reports exact Unicode character names rather than only cleanup categories", () => {
    expect(inspectText("\u200b\ufeff\u00a0\u202f\u205f\u200c\u200d\u202e—“′").map((finding) => finding.name)).toEqual([
      "ZERO WIDTH SPACE", "ZERO WIDTH NO-BREAK SPACE", "NO-BREAK SPACE",
      "NARROW NO-BREAK SPACE", "MEDIUM MATHEMATICAL SPACE", "ZERO WIDTH NON-JOINER",
      "ZERO WIDTH JOINER", "RIGHT-TO-LEFT OVERRIDE", "EM DASH",
      "LEFT DOUBLE QUOTATION MARK", "PRIME",
    ]);
    expect(inspectText("\u0000")[0].name).toBe("NULL");
  });
  it("limits controls to C0 excluding TAB LF CR plus DEL", () => {
    const controls = Array.from({ length: 32 }, (_, value) => String.fromCharCode(value)).join("") + "\u007f";
    const result = cleanText(controls + "\u0085\u009f");
    expect(result.text).toBe("\t\n\r\u0085\u009f");
    expect(result.changes.controls).toBe(30);
    expect(cleanText(controls, { controls: false }).text).toBe(controls);
  });
  it("is stateless and idempotent with every category enabled or disabled", () => {
    const enabled = Object.fromEntries(Object.keys(DEFAULT_CLEAN_OPTIONS).map((key) => [key, true]));
    const disabled = Object.fromEntries(Object.keys(DEFAULT_CLEAN_OPTIONS).map((key) => [key, false]));
    const input = "தமிழ் می\u200cروم 👩🏽‍💻\u0002\u200b\ufeff\u00a0—“′\u2060\u00ad\u202e\r\n\t";
    const result = cleanText(input, enabled);
    expect(cleanText(input, enabled)).toEqual(result);
    expect(cleanText(result.text, enabled).edits).toEqual([]);
    expect(cleanText(result.text, enabled).text).toBe(result.text);
    const preserved = cleanText(input, disabled);
    expect(preserved.text).toBe(input);
    expect(preserved.edits).toEqual([]);
    expect(Object.values(preserved.changes).every((count) => count === 0)).toBe(true);
    expect(preserved.findings).toHaveLength(12);
    expect(preserved.findings.every((finding) => finding.original === finding.replacement)).toBe(true);
    expect(cleanText("").findings).toEqual([]);
    expect(inspectText("")).toEqual([]);
  });
  it("keeps emoji-adjacent code-point columns and UTF-16 navigation ranges exact", () => {
    const result = cleanText("👍🏽—\r\n👨‍👩‍👧‍👦—", { emojis: true, dashes: true });
    expect(result.text).toBe("-\r\n-");
    expect(result.findings.map(({ start, end, line, column }) => [start, end, line, column])).toEqual([
      [0, 4, 1, 1], [4, 5, 1, 3], [7, 18, 2, 1], [18, 19, 2, 8],
    ]);
    expect(result.edits.map(({ outputStart, outputEnd }) => [outputStart, outputEnd])).toEqual([[0, 0], [0, 1], [3, 3], [3, 4]]);
  });
  it("preserves ASCII emoji components, plain copyright and explicit text presentation", () => {
    const input = "0123456789 # * © ® ™ ©\ufe0e ☀\ufe0e ⌚\ufe0e 😀\ufe0e";
    expect(cleanText(input, { emojis: true, joiners: true }).text).toBe(input);
    expect(inspectText(input).filter((finding) => finding.category === "emojis")).toEqual([]);
    expect(cleanText("©️ ☀️ ⌚ 😀", { emojis: true }).text).toBe("   ");
  });
  it("treats recognized emoji sequences atomically before standalone joiner cleanup", () => {
    const sequences = ["👨‍👩‍👧‍👦", "👍🏽", "🇮🇳", "1️⃣", "#️⃣", "*️⃣", "🏴\u{e0067}\u{e0062}\u{e0065}\u{e006e}\u{e0067}\u{e007f}"];
    const input = sequences.join("|") + "|می\u200cروم";
    const preserved = cleanText(input, { joiners: true });
    expect(preserved.text).toBe(sequences.join("|") + "|میروم");
    expect(preserved.findings.filter((finding) => finding.category === "emojis").map((finding) => finding.original)).toEqual(sequences);
    expect(preserved.changes.joiners).toBe(1);
    const removed = cleanText(input, { emojis: true, joiners: true });
    expect(removed.text).toBe("|||||||میروم");
    expect(removed.changes).toMatchObject({ emojis: 7, joiners: 1 });
    expect(removed.edits.filter((edit) => edit.category === "emojis")).toHaveLength(7);
    expect(inspectText("👍🏽")[0]).toMatchObject({ codePoints: "U+1F44D U+1F3FD", start: 0, end: 4, replacement: "👍🏽" });
    expect(cleanText(input, { emojis: true, joiners: true })).toEqual(removed);
  });
  it("maps only actual edits into unambiguous UTF-16 output ranges", () => {
    const input = "𝄞\u200b—\u00a0—\u200b";
    const result = cleanText(input, { invisible: true, dashes: true });
    expect(result.text).toBe("𝄞- -");
    expect(result.edits.map(({ start, end, outputStart, outputEnd }) => [start, end, outputStart, outputEnd])).toEqual([
      [2, 3, 2, 2], [3, 4, 2, 3], [4, 5, 3, 4], [5, 6, 4, 5], [6, 7, 5, 5],
    ]);
    for (const edit of result.edits) {
      expect(input.slice(edit.start, edit.end)).toBe(edit.original);
      expect(result.text.slice(edit.outputStart, edit.outputEnd)).toBe(edit.replacement);
    }
    expect(cleanText("—").edits).toEqual([]);
    expect(cleanText("").edits).toEqual([]);
  });
  it("inspects preserved and changed characters with deterministic original coordinates", () => {
    const input = "𝄞\u200b\r\nதமிழ்—\u00a0\r\u2060\n′";
    const findings = inspectText(input);
    expect(findings.map(({ category, start, end, line, column, original, replacement }) => ({ category, start, end, line, column, original, replacement }))).toEqual([
      { category: "invisible", start: 2, end: 3, line: 1, column: 2, original: "\u200b", replacement: "\u200b" },
      { category: "dashes", start: 10, end: 11, line: 2, column: 6, original: "—", replacement: "—" },
      { category: "spaces", start: 11, end: 12, line: 2, column: 7, original: "\u00a0", replacement: " " },
      { category: "wordJoiners", start: 13, end: 14, line: 3, column: 1, original: "\u2060", replacement: "\u2060" },
      { category: "primes", start: 15, end: 16, line: 4, column: 1, original: "′", replacement: "′" },
    ]);
    expect(findings[0]).toMatchObject({ id: "invisible:2", codePoints: "U+200B", name: expect.any(String) });
    expect(inspectText(input)).toEqual(findings);
    expect(cleanText(input).findings).toEqual(findings);
    expect(inspectText("—", { dashes: true })[0].replacement).toBe("-");
  });
  it("separates opt-in hidden categories without deleting unrelated format characters or language text", () => {
    const input = "\u200b\ufeffمی\u200cروم\u200d தமிழ்\u2060\u00ad\u061c\u200e\u200f\u202a\u202b\u202c\u202d\u202e\u2066\u2067\u2068\u2069\u2061";
    const result = cleanText(input, { invisible: true, joiners: true, wordJoiners: true, softHyphens: true, bidi: true });
    expect(result.text).toBe("میروم தமிழ்\u2061");
    expect(result.changes).toMatchObject({ invisible: 2, joiners: 2, wordJoiners: 1, softHyphens: 1, bidi: 12 });
  });
  it("offers conservative and plain-text presets without silently converting primes", () => {
    expect(CLEAN_PRESETS.conservative).toEqual(DEFAULT_CLEAN_OPTIONS);
    const result = cleanText('a\u00a0b\u202fc\u205fd —–‒―⁓ “x” ‘y’ ′″ `code`', CLEAN_PRESETS.plainText);
    expect(result.text).toBe('a b c d ----- "x" \'y\' ′″ `code`');
    expect(result.changes).toMatchObject({ spaces: 3, dashes: 5, quotes: 4, primes: 0 });
    expect(cleanText('′″', { primes: true }).text).toBe('\'"');
  });
  it("defaults to conservative cleanup while preserving meaningful typography and joiners", () => {
    const input = "a\u0000\u200b\u200c\u200d\ufeff\u00a0—“x”′″";
    expect(cleanText(input).text).toBe("a\u200b\u200c\u200d\ufeff —“x”′″");
    expect(cleanText("").changes).toEqual({ controls: 0, invisible: 0, spaces: 0, dashes: 0, quotes: 0, primes: 0, joiners: 0, wordJoiners: 0, softHyphens: 0, bidi: 0, emojis: 0 });
  });
});
