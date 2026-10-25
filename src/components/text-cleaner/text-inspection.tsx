import { Fragment } from "react";
import type { TextFinding } from "@/lib/text-cleaner";

export function TextInspection({ input, findings, selectedId, onSelect }: {
  input: string;
  findings: TextFinding[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const selected = findings.find((finding) => finding.id === selectedId);
  const occurrences = selected
    ? findings.filter((finding) => finding.original === selected.original && finding.category === selected.category).length
    : 0;
  return (
    <section className="mt-6" aria-labelledby="inspection-heading">
      <h3 id="inspection-heading" className="font-heading text-xl font-bold text-ink">Character inspection</h3>
      <p className="mt-2 text-sm text-muted-foreground">Markers are display-only. Select one for its name, location and planned action. Detected formatting is not necessarily an error.</p>
      <div role="region" aria-label="Original text inspection" tabIndex={0} className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words border border-border bg-background p-4 font-mono text-sm leading-loose text-ink [overflow-wrap:anywhere]">
        {findings.map((finding, index) => (
          <Fragment key={finding.id}>
            {input.slice(index === 0 ? 0 : findings[index - 1].end, finding.start)}
            <button type="button" aria-label={`Inspect ${finding.name}, ${finding.codePoints}, line ${finding.line}, column ${finding.column}`} aria-pressed={selectedId === finding.id} className="mx-0.5 inline min-h-11 max-w-full border border-border bg-surface px-1 align-baseline text-left text-link [overflow-wrap:anywhere] aria-pressed:border-link aria-pressed:bg-secondary/20" onClick={() => onSelect(finding.id)}>
              [{finding.name}]
            </button>
          </Fragment>
        ))}
        {input.slice(findings.at(-1)?.end ?? 0) || (!input ? "Paste text to inspect its characters." : "")}
      </div>
      {selected && <section aria-label="Character details" className="mt-4 border-l-4 border-link bg-surface p-4 text-sm text-body">
        <h4 className="font-heading text-lg font-bold text-ink">{selected.name}</h4>
        <dl className="mt-2 grid gap-2 sm:grid-cols-[auto_1fr] sm:gap-x-4">
          <dt className="font-medium">Code points</dt><dd className="break-words font-mono [overflow-wrap:anywhere]">{selected.codePoints}</dd>
          <dt className="font-medium">Original location</dt><dd>Line {selected.line}, column {selected.column}</dd>
          <dt className="font-medium">Occurrences</dt><dd>{occurrences} {occurrences === 1 ? "occurrence" : "occurrences"}</dd>
          <dt className="font-medium">Planned action</dt><dd>{selected.replacement === selected.original ? "Preserve" : selected.replacement === "" ? "Remove" : selected.replacement === " " ? "Replace with ordinary space" : `Replace with ${JSON.stringify(selected.replacement)}`}</dd>
        </dl>
      </section>}
    </section>
  );
}
