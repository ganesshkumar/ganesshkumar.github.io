import { Fragment, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { TextEdit } from "@/lib/text-cleaner";

// Display-only escaping. Never let direction controls rearrange the preview.
function previewText(text: string) {
  return text.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/g,
    (character) => `[U+${character.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")}]`);
}

export function TextChanges({ input, text, edits, selectedId, onSelect }: {
  input: string;
  text: string;
  edits: TextEdit[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const activeIndex = Math.max(0, edits.findIndex((edit) => edit.id === selectedId));
  const active = edits[activeIndex];
  const activeMark = useRef<HTMLElement>(null);
  const previousActiveId = useRef(active?.id);
  useEffect(() => {
    if (previousActiveId.current !== active?.id) {
      activeMark.current?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
      previousActiveId.current = active?.id;
    }
  }, [active?.id]);
  const groups = new Map<string, { edit: TextEdit; count: number }>();
  for (const edit of edits) {
    const key = JSON.stringify([edit.category, edit.codePoints, edit.replacement]);
    const group = groups.get(key);
    if (group) group.count += 1;
    else groups.set(key, { edit, count: 1 });
  }
  if (!active) return null;
  return (
    <section className="mt-8 border-t border-border pt-6" aria-labelledby="changes-heading">
      <h3 id="changes-heading" className="font-heading text-xl font-bold text-ink">Changes</h3>
      <div className="mt-4 max-h-96 overflow-auto" role="region" aria-label="Change report table" tabIndex={0}>
        <table aria-label="Change report" className="w-full min-w-[32rem] border-collapse text-left text-sm text-body">
          <thead className="sticky top-0 border-b border-border bg-surface"><tr>
            <th scope="col" className="p-3">Character or sequence</th>
            <th scope="col" className="p-3">Action</th>
            <th scope="col" className="p-3">Occurrences</th>
          </tr></thead>
          <tbody>{Array.from(groups.entries()).map(([key, { edit, count }]) => <tr key={key} className="border-b border-border">
            <th scope="row" className="p-3 text-left font-normal">
              <button type="button" className="min-h-11 text-left text-link underline underline-offset-4" onClick={() => onSelect(edit.id)}>{edit.name}</button>
              <span className="mt-1 block max-w-xs break-words font-mono text-xs text-muted-foreground [overflow-wrap:anywhere]">{edit.codePoints}</span>
            </th>
            <td className="p-3">{edit.replacement === "" ? "Removed" : edit.replacement === " " ? "Replaced with ordinary space" : `Replaced with ${JSON.stringify(edit.replacement)}`}</td>
            <td className="p-3">{count}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button size="lg" variant="outline" disabled={activeIndex === 0} onClick={() => onSelect(edits[activeIndex - 1].id)}>Previous change</Button>
        <Button size="lg" variant="outline" disabled={activeIndex === edits.length - 1} onClick={() => onSelect(edits[activeIndex + 1].id)}>Next change</Button>
        <p aria-live="polite" className="text-sm text-body">Change {activeIndex + 1} of {edits.length} · line {active.line}, column {active.column}</p>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Underlined highlights mark changes. Bracketed names show invisible characters; [removed] marks a deletion. These markers are not copied.</p>
      <div className="mt-4 grid min-w-0 gap-6 lg:grid-cols-2">
        {([false, true] as const).map((output) => {
          const value = output ? text : input;
          return <div key={String(output)} className="min-w-0">
            <h4 className="font-heading text-lg font-bold text-ink">{output ? "Cleaned changes" : "Original changes"}</h4>
            <div role="region" aria-label={output ? "Cleaned changes" : "Original changes"} tabIndex={0} className="mt-2 max-h-64 min-h-24 overflow-auto whitespace-pre-wrap break-words border border-border p-4 font-mono text-sm leading-relaxed text-ink [overflow-wrap:anywhere]">
              {edits.map((edit, index) => {
                const start = output ? edit.outputStart : edit.start;
                const previous = index === 0 ? 0 : output ? edits[index - 1].outputEnd : edits[index - 1].end;
                const selected = edit.id === active.id;
                const visibleOriginal = ["dashes", "quotes", "primes", "emojis"].includes(edit.category) ? edit.original : `[${edit.name}]`;
                return <Fragment key={edit.id}>
                  {previewText(value.slice(previous, start))}
                  <mark ref={output && selected ? activeMark : undefined} data-change-id={edit.id} aria-current={selected ? "true" : undefined} className={`border-b-2 bg-secondary/20 px-0.5 text-ink underline decoration-1 underline-offset-2 ${selected ? "border-link outline outline-2 outline-link" : "border-border"}`}>
                    {output ? edit.replacement === "" ? "[removed]" : edit.replacement === " " ? "[SPACE]" : previewText(edit.replacement) : visibleOriginal}
                  </mark>
                </Fragment>;
              })}
              {previewText(value.slice(output ? edits.at(-1)?.outputEnd ?? 0 : edits.at(-1)?.end ?? 0))}
            </div>
          </div>;
        })}
      </div>
    </section>
  );
}
