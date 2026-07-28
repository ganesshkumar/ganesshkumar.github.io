import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  ArticleDetail,
  ArticleImage,
  ArticleSummary,
  ArticleYearGroup,
} from "@/lib/content";
import { SITE } from "@/lib/navigation";
import { estimateReadingMinutes, renderMarkdown } from "@/lib/markdown";

/**
 * Server-side article source. Reads the markdown files under
 * `src/content/articles` and exposes their frontmatter as the summary shapes
 * the UI consumes. Only import this from server components or tests; it touches
 * the filesystem and must never reach the client bundle.
 */

const ARTICLES_DIR = path.join(process.cwd(), "src", "content", "articles");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const FILE_DATE_PREFIX = /^(\d{4}-\d{2}-\d{2})-/;

/** Generic placeholder art we prefer to skip in favour of a branded header. */
const PLACEHOLDER_IMAGES = new Set(["random-img.jpg"]);

function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? trimmed.slice(0, 10) : undefined;
  }
  return undefined;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value.trim() : undefined;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);
}

/** Normalize the `image` frontmatter, which may be a string or `{ url, alt }`. */
function asImageInput(value: unknown): { url?: string; alt?: string } {
  if (typeof value === "string") return { url: value.trim() };
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    return { url: asString(obj.url), alt: asString(obj.alt) };
  }
  return {};
}

/** A root-absolute local image path exists on disk; external URLs pass through. */
function coverImageExists(url: string): boolean {
  if (!url.startsWith("/")) return true;
  return fs.existsSync(path.join(PUBLIC_DIR, url));
}

/**
 * Resolve a usable cover image from frontmatter, or nothing. Falls back through
 * `image` then `coverImage`, drops generic placeholders and skips local files
 * that are not present so the page can render a branded header instead.
 */
function resolveCoverImage(
  data: Record<string, unknown>,
  title: string,
): ArticleImage | undefined {
  const primary = asImageInput(data.image);
  const url = primary.url ?? asString(data.coverImage);
  if (!url) return undefined;

  const fileName = url.split("/").pop() ?? "";
  if (PLACEHOLDER_IMAGES.has(fileName)) return undefined;
  if (!coverImageExists(url)) return undefined;

  return { src: url, alt: primary.alt ?? title };
}


function readArticle(fileName: string): ArticleSummary {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, fileName), "utf8");
  const data = matter(raw).data as Record<string, unknown>;

  const fileDate = slug.match(FILE_DATE_PREFIX)?.[1];
  const pubDate =
    toIsoDate(data.pubDate) ?? toIsoDate(data.date) ?? fileDate ?? "";
  const updatedDate = toIsoDate(data.modified_date);
  const categories = asStringArray(data.categories);

  return {
    slug,
    title: asString(data.title) ?? slug,
    description: asString(data.description) ?? "",
    pubDate,
    ...(updatedDate && updatedDate !== pubDate ? { updatedDate } : {}),
    tags: asStringArray(data.tags),
    ...(categories.length > 0 ? { category: categories[0] } : {}),
  };
}

/** Every article, newest first, ties broken by title for a stable order. */
export function getAllArticles(): ArticleSummary[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readArticle)
    .sort((a, b) => {
      if (a.pubDate === b.pubDate) return a.title.localeCompare(b.title);
      return a.pubDate < b.pubDate ? 1 : -1;
    });
}

/** Bucket articles by publication year, most recent year first. */
export function groupArticlesByYear(
  articles: ArticleSummary[],
): ArticleYearGroup[] {
  const groups = new Map<number, ArticleSummary[]>();
  for (const article of articles) {
    const year = Number.parseInt(article.pubDate.slice(0, 4), 10);
    if (Number.isNaN(year)) continue;
    const bucket = groups.get(year);
    if (bucket) bucket.push(article);
    else groups.set(year, [article]);
  }
  return [...groups.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, articles: items }));
}

/** Every article slug, for static path generation. */
export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/**
 * Load a single article by slug: frontmatter, resolved cover image, reading
 * time and the rendered HTML body. Returns null when the slug does not exist.
 */
export async function getArticleBySlug(
  slug: string,
): Promise<ArticleDetail | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const data = parsed.data as Record<string, unknown>;

  const fileDate = slug.match(FILE_DATE_PREFIX)?.[1];
  const pubDate =
    toIsoDate(data.pubDate) ?? toIsoDate(data.date) ?? fileDate ?? "";
  const updatedDate = toIsoDate(data.modified_date);
  const title = asString(data.title) ?? slug;
  const categories = asStringArray(data.categories);
  const coverImage = resolveCoverImage(data, title);

  return {
    slug,
    title,
    description: asString(data.description) ?? "",
    pubDate,
    ...(updatedDate && updatedDate !== pubDate ? { updatedDate } : {}),
    author: asString(data.author) ?? SITE.name,
    tags: asStringArray(data.tags),
    categories,
    ...(categories.length > 0 ? { category: categories[0] } : {}),
    ...(coverImage ? { coverImage } : {}),
    readingTimeMinutes: estimateReadingMinutes(parsed.content),
    contentHtml: await renderMarkdown(parsed.content),
  };
}

