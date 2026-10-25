import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInspection } from "./text-inspection";

const finding = {
  id: "invisible:1", category: "invisible" as const,
  name: "ZERO WIDTH SPACE", codePoints: "U+200B",
  start: 1, end: 2, line: 1, column: 2,
  original: "\u200b", replacement: "\u200b",
};

describe("TextInspection", () => {
  it("shows display-only markers and selected character details", async () => {
    const onSelect = vi.fn();
    render(<TextInspection input={"a\u200bb"} findings={[finding]} selectedId={finding.id} onSelect={onSelect} />);
    const marker = screen.getByRole("button", { name: "Inspect ZERO WIDTH SPACE, U+200B, line 1, column 2" });
    await userEvent.click(marker);
    expect(onSelect).toHaveBeenCalledWith(finding.id);
    expect(screen.getByRole("region", { name: "Character details" })).toHaveTextContent("Preserve");
    expect(screen.getByRole("region", { name: "Character details" })).toHaveTextContent("Line 1, column 2");
    expect(screen.getByRole("region", { name: "Character details" })).toHaveTextContent("1 occurrence");
    expect(screen.getByRole("region", { name: "Original text inspection" })).toHaveTextContent("a[ZERO WIDTH SPACE]b");
  });
});
