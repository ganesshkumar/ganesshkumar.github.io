import type { LucideIcon } from "lucide-react";

/**
 * Content types the UI consumes, derived from the content model:
 * docs/content-and-information-architecture/content-model.md
 * These are the summary shapes used by cards and listings.
 */

export type ArticleSummary = {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  tags: string[];
  category?: string;
  readingTimeMinutes?: number;
};

/** A set of articles bucketed under a single publication year. */
export type ArticleYearGroup = {
  year: number;
  articles: ArticleSummary[];
};

/** A resolved article cover image, ready to render. */
export type ArticleImage = {
  src: string;
  alt: string;
};

/**
 * A fully-resolved article: frontmatter plus the rendered HTML body and the
 * derived fields the detail page needs (author, cover image, reading time).
 */
export type ArticleDetail = {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  author: string;
  tags: string[];
  categories: string[];
  category?: string;
  coverImage?: ArticleImage;
  readingTimeMinutes: number;
  contentHtml: string;
};

/**
 * Rank other articles by relevance to a source article: shared tags weigh
 * most, then a shared category, with recency breaking ties. Pure so it can be
 * unit tested without touching the filesystem.
 */
export function selectRelatedArticles(
  all: ArticleSummary[],
  source: Pick<ArticleSummary, "slug" | "tags" | "category">,
  limit = 3,
): ArticleSummary[] {
  const sourceTags = new Set(source.tags);
  return all
    .filter((article) => article.slug !== source.slug)
    .map((article) => {
      const sharedTags = article.tags.filter((tag) =>
        sourceTags.has(tag),
      ).length;
      const sharedCategory =
        source.category && article.category === source.category ? 1 : 0;
      return { article, score: sharedTags * 2 + sharedCategory };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.article.pubDate < b.article.pubDate ? 1 : -1;
    })
    .slice(0, limit)
    .map((entry) => entry.article);
}

export type ProjectStatus = "shipped" | "in-progress" | "archived";

export type ProjectSummary = {
  slug: string;
  title: string;
  description: string;
  /** The need the project addresses, stated plainly. Leads featured rows. */
  problem?: string;
  outcome: string;
  stack?: string[];
  status?: ProjectStatus;
  /** Marks the project for the large case-row tier on the projects index. */
  featured?: boolean;
  tags?: string[];
  icon?: LucideIcon;
  iconImage?: { src: string; alt: string };
  image?: { src: string; alt: string };
  repoUrl?: string;
  liveUrl?: string;
};

export type BookLink = {
  url: string;
  provider?: string;
  regions?: string[];
  affiliate?: boolean;
  priority?: number;
};

export type Book = {
  title: string;
  authors: string[];
  links?: BookLink[];
};

export function articleHref(slug: string): string {
  return `/articles/${slug}`;
}

/**
 * The project's primary off-site destination: the live site if it exists,
 * otherwise the source repository. There are no per-project detail routes, so
 * titles and cards link straight to the real proof.
 */
export function projectPrimaryUrl(
  project: Pick<ProjectSummary, "liveUrl" | "repoUrl">,
): string | undefined {
  return project.liveUrl ?? project.repoUrl;
}

export function tagHref(tag: string): string {
  return `/tags/${tag}`;
}
