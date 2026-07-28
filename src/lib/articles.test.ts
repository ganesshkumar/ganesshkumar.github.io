import { describe, it, expect } from "vitest";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleSlugs,
  groupArticlesByYear,
} from "./articles";
import type { ArticleSummary } from "@/lib/content";

describe("getAllArticles", () => {
  const articles = getAllArticles();

  it("returns a non-empty list", () => {
    expect(articles.length).toBeGreaterThan(0);
  });

  it("orders articles newest first", () => {
    for (let i = 1; i < articles.length; i += 1) {
      expect(articles[i - 1].pubDate >= articles[i].pubDate).toBe(true);
    }
  });

  it("derives a slug and an ISO date for every article", () => {
    expect(articles.every((article) => article.slug.length > 0)).toBe(true);
    expect(
      articles.every((article) => /^\d{4}-\d{2}-\d{2}$/.test(article.pubDate)),
    ).toBe(true);
  });
});

describe("groupArticlesByYear", () => {
  const sample: ArticleSummary[] = [
    {
      slug: "2026-02-04-a",
      title: "A",
      description: "",
      pubDate: "2026-02-04",
      tags: [],
    },
    {
      slug: "2025-05-01-b",
      title: "B",
      description: "",
      pubDate: "2025-05-01",
      tags: [],
    },
    {
      slug: "2025-01-01-c",
      title: "C",
      description: "",
      pubDate: "2025-01-01",
      tags: [],
    },
  ];

  it("groups by year in descending order", () => {
    const groups = groupArticlesByYear(sample);
    expect(groups.map((group) => group.year)).toEqual([2026, 2025]);
  });

  it("keeps every article in its year bucket", () => {
    const groups = groupArticlesByYear(sample);
    expect(groups[0].articles).toHaveLength(1);
    expect(groups[1].articles).toHaveLength(2);
  });
});

describe("getArticleSlugs", () => {
  it("returns a slug for every markdown file", () => {
    const slugs = getArticleSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(slugs).toContain("2026-02-04-clean-obsidian-vault");
  });
});

describe("getArticleBySlug", () => {
  it("returns null for an unknown slug", async () => {
    expect(await getArticleBySlug("does-not-exist")).toBeNull();
  });

  it("loads frontmatter, reading time and rendered html", async () => {
    const article = await getArticleBySlug("2026-02-04-clean-obsidian-vault");
    expect(article).not.toBeNull();
    expect(article?.title).toContain("Clean Obsidian Vault");
    expect(article?.author).toBe("Ganessh Kumar");
    expect(article?.tags).toContain("obsidian");
    expect(article?.readingTimeMinutes).toBeGreaterThan(0);
    expect(article?.contentHtml).toContain("<h2");
    expect(article?.coverImage?.src).toContain("clean-obsidian-vault.webp");
  });

  it("skips generic placeholder cover images", async () => {
    const article = await getArticleBySlug(
      "2014-01-02-installing-dropbox-from-source-code",
    );
    expect(article?.coverImage).toBeUndefined();
  });
});
