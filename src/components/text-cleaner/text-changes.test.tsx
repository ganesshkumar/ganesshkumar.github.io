import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextChanges } from "./text-changes";

const edits = [1, 3].map((start, index) => ({
  id: `invisible:${start}`, category: "invisible" as const,
  name: "ZERO WIDTH SPACE", codePoints: "U+200B",
  start, end: start + 1, line: 1, column: start + 1,
  original: "\u200b", replacement: "", outputStart: index + 1, outputEnd: index + 1,
}));

function Harness() {
  const [selectedId, onSelect] = useState<string | null>(null);
  return <TextChanges input={"a\u200ba\u200b"} text="aa" edits={edits} selectedId={selectedId} onSelect={onSelect} />;
}

describe("TextChanges", () => {
  it("scrolls highlights only after navigation, not when results first appear", async () => {
    const scroll = vi.fn();
    const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollIntoView");
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: scroll });
    try {
      render(<Harness />);
      expect(scroll).not.toHaveBeenCalled();
      await userEvent.click(screen.getByRole("button", { name: "Next change" }));
      expect(scroll).toHaveBeenCalledTimes(1);
    } finally {
      if (descriptor) Object.defineProperty(HTMLElement.prototype, "scrollIntoView", descriptor);
      else Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
    }
  });
  it("groups actual changes and highlights distinct occurrences in both previews", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const table = screen.getByRole("table", { name: "Change report" });
    expect(within(table).getAllByRole("row")).toHaveLength(2);
    expect(within(table).getByRole("cell", { name: "2" })).toBeInTheDocument();
    expect(screen.getByText("Change 1 of 2 · line 1, column 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous change" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Next change" }));
    expect(screen.getByText("Change 2 of 2 · line 1, column 4")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next change" })).toBeDisabled();
    expect(screen.getByRole("region", { name: "Original changes" }).querySelector('[aria-current="true"]')).toHaveAttribute("data-change-id", "invisible:3");
    expect(screen.getByRole("region", { name: "Cleaned changes" }).querySelector('[aria-current="true"]')).toHaveAttribute("data-change-id", "invisible:3");
    await user.click(screen.getByRole("button", { name: "Previous change" }));
    expect(screen.getByText("Change 1 of 2 · line 1, column 2")).toBeInTheDocument();
  });
});
