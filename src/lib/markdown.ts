import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

/**
 * Server-only markdown renderer for article bodies. Produces a static HTML
 * string at build time so article pages ship fully-rendered, crawlable markup
 * with no client-side markdown work.
 *
 * Pipeline:
 * - remark-parse + remark-gfm + remark-math: CommonMark, GFM and LaTeX math.
 * - remark-rehype (+ rehype-raw): allow the first-party inline HTML a few
 *   articles use, re-parsed into the tree rather than dropped.
 * - rehype-katex: render inline and display math into static, accessible HTML.
 * - rehype-slug: stable `id`s on headings for deep links and jump-to-section.
 * - rehype-highlight: syntax highlighting classes on fenced code blocks
 *   (unknown languages degrade to plain, unhighlighted code).
 *
 * Content is authored in-repo (first party), so raw HTML is trusted.
 */
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeKatex)
  .use(rehypeSlug)
  .use(rehypeHighlight)
  .use(rehypeStringify, { allowDangerousHtml: true });

/** Render a markdown document body to an HTML string. */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await processor.process(markdown);
  return String(file);
}

const WORDS_PER_MINUTE = 200;

/** Estimate reading time in whole minutes (at least 1) from raw markdown. */
export function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
