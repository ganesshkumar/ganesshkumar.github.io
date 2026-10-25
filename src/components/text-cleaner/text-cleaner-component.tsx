"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cleanText, inspectText, CLEAN_PRESETS, type CleanCategory, type CleanOptions } from "@/lib/text-cleaner";
import { TextChanges } from "./text-changes";
import { TextInspection } from "./text-inspection";

const optionLabels: Record<CleanCategory, string> = {
  controls: "Remove control characters",
  spaces: "Normalize special spaces",
  dashes: "Replace dash variations",
  quotes: "Replace curly quotes",
  emojis: "Remove emojis",
  invisible: "Remove zero-width spaces and BOM",
  joiners: "Remove joiners outside emojis",
  primes: "Replace prime symbols",
  wordJoiners: "Remove word joiners",
  softHyphens: "Remove soft hyphens",
  bidi: "Remove text-direction controls",
};
const basicOptions: CleanCategory[] = ["controls", "spaces", "dashes", "quotes", "emojis"];
const advancedOptions: CleanCategory[] = ["invisible", "joiners", "primes", "wordJoiners", "softHyphens", "bidi"];

export function TextCleanerComponent() {
  const [input, setInput] = useState("");
  const revision = useRef(0);
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState<CleanOptions>(CLEAN_PRESETS.conservative);
  const [preset, setPreset] = useState("conservative");
  const [showHidden, setShowHidden] = useState(false);
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>(null);
  const findings = useMemo(() => showHidden ? inspectText(input, options) : [], [showHidden, input, options]);
  const [result, setResult] = useState<ReturnType<typeof cleanText> | null>(null);
  const [selectedChangeId, setSelectedChangeId] = useState<string | null>(null);
  const editorClass = "mt-3 min-h-72 w-full resize-y border border-border bg-background p-4 font-mono text-sm leading-relaxed text-ink sm:min-h-80";

  function invalidate() {
    revision.current += 1;
    setResult(null);
    setMessage("");
    setSelectedChangeId(null);
    setSelectedFindingId(null);
  }

  function renderOption(key: CleanCategory) {
    return <label key={key} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-body">
      <input type="checkbox" checked={options[key]} className="size-5 shrink-0 accent-brand" onChange={(event) => {
        setOptions({ ...options, [key]: event.target.checked });
        setPreset("custom");
        invalidate();
      }} />
      {optionLabels[key]}
    </label>;
  }

  return (
    <section aria-label="Text cleaner" className="mt-8">
      <fieldset className="border-y border-border py-5">
        <legend className="pr-3 font-heading text-lg font-bold text-ink">What to clean</legend>
        <div className="mb-4">
          <label htmlFor="cleaner-preset" className="block text-sm font-medium text-ink">Cleanup preset</label>
          <select id="cleaner-preset" value={preset} aria-describedby="preset-help" className="mt-2 min-h-11 max-w-full border border-border bg-background px-3 text-sm text-ink" onChange={(event) => {
            const next = event.target.value;
            if (next === "conservative" || next === "plainText") {
              setOptions({ ...CLEAN_PRESETS[next] });
              setPreset(next);
              invalidate();
            }
          }}>
            <option value="conservative">Conservative cleanup</option>
            <option value="plainText">Plain-text cleanup</option>
            <option value="custom" disabled>Custom rules</option>
          </select>
          <p id="preset-help" className="mt-2 text-sm text-muted-foreground">Conservative cleanup changes selected controls and special spaces only. Plain text also replaces dashes and curly quotes. Both preserve emojis and joiners.</p>
        </div>
        <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">{basicOptions.map(renderOption)}</div>
        <p className="mt-2 text-sm text-muted-foreground">Emoji removal is optional. It removes complete recognized sequences, including skin tones, flags and joined emojis. It does not trim the surrounding spaces.</p>
        <details className="mt-4 border-t border-border pt-2">
          <summary className="min-h-11 cursor-pointer py-2 text-sm font-medium text-ink">Advanced cleanup rules</summary>
          <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">{advancedOptions.map(renderOption)}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">These characters can be valid. Removing spaces or joiners can change words and language shaping. Removing direction controls can change text order. Prime symbols can represent measurements. Inspect first.</p>
        </details>
        <p className="mt-3 text-sm text-muted-foreground">Selected rules apply to all text, including code. Review the result before use.</p>
      </fieldset>
      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor="cleaner-input" className="font-heading text-xl font-bold text-ink">Original text</label>
          <textarea id="cleaner-input" value={input} spellCheck={false} placeholder="Paste your text here…" className={editorClass} onChange={(event) => {
            setInput(event.target.value);
            invalidate();
          }} />
        </div>
        <div className="min-w-0">
          <label htmlFor="cleaner-output" className="font-heading text-xl font-bold text-ink">Cleaned text</label>
          <textarea id="cleaner-output" value={result?.text ?? ""} readOnly spellCheck={false} placeholder="Your cleaned text will appear here." className={editorClass} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button size="lg" disabled={!input} onClick={() => {
          const cleaned = cleanText(input, options);
          setResult(cleaned);
          setSelectedChangeId(cleaned.edits[0]?.id ?? null);
          setMessage("");
        }}>Clean text</Button>
        <Button size="lg" variant="outline" disabled={!result?.text} onClick={async () => {
          if (!result) return;
          const copiedRevision = revision.current;
          try {
            await navigator.clipboard.writeText(result.text);
            if (copiedRevision === revision.current) setMessage("Copied cleaned text.");
          } catch {
            if (copiedRevision === revision.current) setMessage("Could not copy. Select the cleaned text and copy it manually.");
          }
        }}>Copy cleaned text</Button>
        <Button size="lg" variant="outline" onClick={() => {
          setInput("Here’s\u00a0an example — with\u200b hidden characters, “curly quotes” and 👩🏽‍💻.");
          invalidate();
        }}>Try an example</Button>
        <Button size="lg" variant="ghost" onClick={() => { setInput(""); invalidate(); }}>Clear</Button>
      </div>
      <p role="status" className="mt-5 text-sm text-body">
        {message || (result ? result.edits.length === 0 ? "No changes needed with the selected rules." : `${result.edits.length} ${result.edits.length === 1 ? "change" : "changes"} made.` : "Paste text, choose what to clean, then select Clean text.")}
      </p>
      <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-3 text-sm text-body">
        <input type="checkbox" checked={showHidden} className="size-5 accent-brand" onChange={(event) => {
          setShowHidden(event.target.checked);
          setSelectedFindingId(null);
        }} />
        Show hidden characters
      </label>
      {showHidden && <TextInspection input={input} findings={findings} selectedId={selectedFindingId} onSelect={setSelectedFindingId} />}
      {result && <TextChanges input={input} text={result.text} edits={result.edits} selectedId={selectedChangeId} onSelect={setSelectedChangeId} />}
    </section>
  );
}
