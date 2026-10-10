import { describe, it, expect } from "vitest";
import { renderMarkdown, estimateReadingMinutes } from "./markdown";

describe("renderMarkdown", () => {
  it("adds slug ids to headings for deep links", async () => {
    const html = await renderMarkdown("## Hello World");
    expect(html).toContain('id="hello-world"');
  });

  it("highlights fenced code blocks", async () => {
    const html = await renderMarkdown("```js\nconst a = 1;\n```");
    expect(html).toContain("language-js");
    expect(html).toContain("hljs-keyword");
  });

  it("supports GitHub-flavored tables", async () => {
    const html = await renderMarkdown("| a | b |\n| - | - |\n| 1 | 2 |");
    expect(html).toContain("<table>");
    expect(html).toContain("<th>");
  });

  it("keeps first-party inline HTML", async () => {
    const html = await renderMarkdown('<div class="note">hi</div>');
    expect(html).toContain('<div class="note">hi</div>');
  });

  it("renders links", async () => {
    const html = await renderMarkdown("[docs](https://example.com)");
    expect(html).toContain('href="https://example.com"');
  });

  it("renders inline and display LaTeX with KaTeX", async () => {
    const html = await renderMarkdown(
      "Inline $B \\times T$.\n\n$$\np_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}\n$$",
    );
    expect(html).toContain('<span class="katex">');
    expect(html).toContain('<span class="katex-display">');
    expect(html).toContain("<math");
  });
});

describe("estimateReadingMinutes", () => {
  it("returns at least one minute for short content", () => {
    expect(estimateReadingMinutes("one two three")).toBe(1);
  });

  it("scales with word count", () => {
    const words = Array.from({ length: 400 }, () => "word").join(" ");
    expect(estimateReadingMinutes(words)).toBe(2);
  });
});
