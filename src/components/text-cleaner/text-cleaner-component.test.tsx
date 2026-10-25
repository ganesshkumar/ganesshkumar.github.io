import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextCleanerComponent } from "./text-cleaner-component";

describe("TextCleanerComponent", () => {
  it("ignores delayed clipboard feedback after the source changes", async () => {
    const user = userEvent.setup();
    let resolveCopy!: () => void;
    const pendingCopy = new Promise<void>((resolve) => { resolveCopy = resolve; });
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockReturnValue(pendingCopy);
    try {
      render(<TextCleanerComponent />);
      await user.type(screen.getByLabelText("Original text"), "hello");
      await user.click(screen.getByRole("button", { name: "Clean text" }));
      await user.click(screen.getByRole("button", { name: "Copy cleaned text" }));
      await user.type(screen.getByLabelText("Original text"), " new");
      await act(async () => { resolveCopy(); await pendingCopy; });
      expect(screen.getByRole("status")).not.toHaveTextContent("Copied");
      expect(screen.getByLabelText("Cleaned text")).toHaveValue("");
    } finally { writeText.mockRestore(); }
  });
  it("inspects preserved hidden characters before cleaning without changing input", async () => {
    const user = userEvent.setup();
    render(<TextCleanerComponent />);
    const input = 'a\u2060b\u00adc\u202ed';
    await user.click(screen.getByLabelText("Original text"));
    await user.paste(input);
    await user.click(screen.getByRole("checkbox", { name: "Show hidden characters" }));
    const markers = screen.getAllByRole("button", { name: /^Inspect / });
    expect(markers).toHaveLength(3);
    await user.click(markers[0]);
    expect(screen.getByRole("region", { name: "Character details" })).toHaveTextContent("U+2060");
    expect(screen.getByRole("region", { name: "Character details" })).toHaveTextContent("Preserve");
    expect(screen.getByLabelText("Original text")).toHaveValue(input);
    await user.click(screen.getByRole("button", { name: "Clean text" }));
    expect(screen.getByRole("status")).toHaveTextContent("No changes needed with the selected rules.");
    expect(screen.getByLabelText("Cleaned text")).toHaveValue(input);
    await user.click(screen.getByText("Advanced cleanup rules"));
    await user.click(screen.getByRole("checkbox", { name: "Remove word joiners" }));
    expect(screen.getByLabelText("Cleaned text")).toHaveValue("");
    await user.click(screen.getAllByRole("button", { name: /^Inspect / })[0]);
    expect(screen.getByRole("region", { name: "Character details" })).toHaveTextContent("Remove");
  });
  it("starts with conservative cleanup and offers opt-in whole-sequence emoji removal", async () => {
    const user = userEvent.setup();
    render(<TextCleanerComponent />);
    expect(screen.getByLabelText("Cleanup preset")).toHaveValue("conservative");
    expect(screen.getByRole("checkbox", { name: "Remove emojis" })).not.toBeChecked();
    await user.click(screen.getByLabelText("Original text"));
    await user.paste('Hi\u00a0👩🏽‍💻 — “world”');
    await user.click(screen.getByRole("button", { name: "Clean text" }));
    expect(screen.getByLabelText("Cleaned text")).toHaveValue('Hi 👩🏽‍💻 — “world”');
    await user.selectOptions(screen.getByLabelText("Cleanup preset"), "plainText");
    expect(screen.getByRole("checkbox", { name: "Remove emojis" })).not.toBeChecked();
    await user.click(screen.getByRole("checkbox", { name: "Remove emojis" }));
    await user.click(screen.getByRole("button", { name: "Clean text" }));
    expect(screen.getByLabelText("Cleaned text")).toHaveValue('Hi  - "world"');
    expect(screen.getByRole("table", { name: "Change report" })).toHaveTextContent(/emoji/i);
  });
  it("handles clipboard failure and invalidates stale output when input changes", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("Denied"));
    render(<TextCleanerComponent />);
    await user.click(screen.getByRole("button", { name: "Try an example" }));
    await user.selectOptions(screen.getByLabelText("Cleanup preset"), "plainText");
    await user.click(screen.getByRole("checkbox", { name: "Replace dash variations" }));
    await user.click(screen.getByRole("button", { name: "Clean text" }));
    expect((screen.getByLabelText("Cleaned text") as HTMLTextAreaElement).value).toContain("—");
    await user.click(screen.getByRole("button", { name: "Copy cleaned text" }));
    expect(screen.getByRole("status")).toHaveTextContent("Could not copy");
    await user.type(screen.getByLabelText("Original text"), "New");
    expect(screen.getByLabelText("Cleaned text")).toHaveValue("");
    expect(screen.getByRole("button", { name: "Copy cleaned text" })).toBeDisabled();
    expect(screen.getByRole("status")).not.toHaveTextContent("Could not copy");
    writeText.mockRestore();
  });
  it("loads a sample, copies the result, and clears both editors", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(<TextCleanerComponent />);
    expect(screen.getByRole("button", { name: "Copy cleaned text" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Try an example" }));
    await user.click(screen.getByRole("button", { name: "Clean text" }));
    await user.click(screen.getByRole("button", { name: "Copy cleaned text" }));
    expect(writeText).toHaveBeenCalledWith((screen.getByLabelText("Cleaned text") as HTMLTextAreaElement).value);
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.getByLabelText("Original text")).toHaveValue("");
    expect(screen.getByLabelText("Cleaned text")).toHaveValue("");
    writeText.mockRestore();
  });
  it("cleans pasted text on demand and reports the changes", async () => {
    const user = userEvent.setup();
    render(<TextCleanerComponent />);
    await user.click(screen.getByLabelText("Original text"));
    await user.paste("Hello\u200b — “world”");
    await user.selectOptions(screen.getByLabelText("Cleanup preset"), "plainText");
    await user.click(screen.getByText("Advanced cleanup rules"));
    await user.click(screen.getByRole("checkbox", { name: "Remove zero-width spaces and BOM" }));
    await user.click(screen.getByRole("button", { name: "Clean text" }));
    expect(screen.getByLabelText("Cleaned text")).toHaveValue('Hello - "world"');
    expect(screen.getByRole("status")).toHaveTextContent("4 changes made");
  });
});
