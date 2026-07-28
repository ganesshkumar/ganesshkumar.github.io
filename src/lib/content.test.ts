import { describe, it, expect } from "vitest";
import {
  articleHref,
  selectRelatedArticles,
  tagHref,
  type ArticleSummary,
} from "./content";

const make = (
  over: Partial<ArticleSummary> & { slug: string },
): ArticleSummary => ({
  title: over.slug,
  description: "",
  pubDate: "2020-01-01",
  tags: [],
  ...over,
});

describe("selectRelatedArticles", () => {
  const all: ArticleSummary[] = [
    make({
      slug: "a",
      tags: ["docker", "linux"],
      category: "tech",
      pubDate: "2021-01-01",
    }),
    make({ slug: "b", tags: ["docker"], category: "tech", pubDate: "2022-01-01" }),
    make({ slug: "c", tags: ["react"], category: "web", pubDate: "2023-01-01" }),
    make({
      slug: "source",
      tags: ["docker", "linux"],
      category: "tech",
      pubDate: "2020-01-01",
    }),
  ];
  const source = all[3];

  it("excludes the source article", () => {
    const related = selectRelatedArticles(all, source);
    expect(related.map((article) => article.slug)).not.toContain("source");
  });

  it("ranks more shared tags first", () => {
    const related = selectRelatedArticles(all, source);
    expect(related[0].slug).toBe("a");
  });

  it("drops articles with no tag or category overlap", () => {
    const related = selectRelatedArticles(all, source);
    expect(related.map((article) => article.slug)).not.toContain("c");
  });

  it("respects the requested limit", () => {
    expect(selectRelatedArticles(all, source, 1)).toHaveLength(1);
  });
});

describe("href helpers", () => {
  it("builds article and tag hrefs", () => {
    expect(articleHref("x")).toBe("/articles/x");
    expect(tagHref("y")).toBe("/tags/y");
  });
});
