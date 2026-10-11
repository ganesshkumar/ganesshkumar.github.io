import { describe, it, expect } from "vitest";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleSlugs,
  groupArticlesByYear,
  parseSeriesRef,
  validateSeriesMembership,
} from "./articles";
import type {
  ArticleSummary,
  SeriesDefinition,
} from "@/lib/content";

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

describe("series metadata", () => {
  const definition: SeriesDefinition = {
    name: "A Software Engineer Learns",
    slug: "software-engineer-learns",
    description: "A test series.",
    status: "ongoing",
  };
  const article = (
    slug: string,
    order?: number,
    name = definition.name,
  ): ArticleSummary => ({
    slug,
    title: slug,
    description: "",
    pubDate: "2026-01-01",
    tags: [],
    ...(order
      ? {
          series: {
            name,
            slug: definition.slug,
            order,
          },
        }
      : {}),
  });

  it("parses valid series metadata", () => {
    expect(
      parseSeriesRef(
        { name: definition.name, slug: definition.slug, order: 2 },
        "article.md",
      ),
    ).toEqual({
      name: definition.name,
      slug: definition.slug,
      order: 2,
    });
  });

  it("accepts absent series metadata", () => {
    expect(parseSeriesRef(undefined, "article.md")).toBeUndefined();
  });

  it.each([
    [{ name: definition.name, slug: definition.slug }, "incomplete"],
    [
      { name: definition.name, slug: definition.slug, order: 0 },
      "zero",
    ],
    [
      { name: definition.name, slug: definition.slug, order: -1 },
      "negative",
    ],
    [
      { name: definition.name, slug: definition.slug, order: 1.5 },
      "fraction",
    ],
  ])("rejects %s series metadata", (metadata) => {
    expect(() => parseSeriesRef(metadata, "article.md")).toThrow(
      "positive integer order",
    );
  });

  it("rejects duplicate orders", () => {
    expect(() =>
      validateSeriesMembership(
        [article("first", 1), article("second", 1)],
        [definition],
      ),
    ).toThrow("duplicate series order 1");
  });

  it("rejects inconsistent names", () => {
    expect(() =>
      validateSeriesMembership(
        [article("first", 1, "Different name")],
        [definition],
      ),
    ).toThrow("series name does not match");
  });

  it("allows gaps in published order", () => {
    expect(() =>
      validateSeriesMembership(
        [article("first", 1), article("third", 3)],
        [definition],
      ),
    ).not.toThrow();
  });
});
