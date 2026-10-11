import { describe, expect, it } from "vitest";
import { getArticleSlugs } from "./articles";
import {
  getRecentArticles,
  getRecentProjects,
  getShowcaseProjects,
} from "./home-content";
import { getFeaturedSeries } from "./series";

describe("getRecentArticles", () => {
  it("returns the newest ten articles with canonical file slugs", () => {
    const articles = getRecentArticles();
    const articleSlugs = new Set(getArticleSlugs());

    expect(articles).toHaveLength(10);
    expect(articles[0].slug).toBe(
      "2026-10-11-understanding-gpt2-token-embeddings",
    );
    expect(
      articles.every(
        (article) =>
          /^\d{4}-\d{2}-\d{2}-/.test(article.slug) &&
          articleSlugs.has(article.slug),
      ),
    ).toBe(true);
  });

  describe("project ordering", () => {
    it("shows Pico GPT first on the home page and projects index", () => {
      expect(getRecentProjects()[0].slug).toBe("pico-gpt");
      expect(getShowcaseProjects()[0].slug).toBe("pico-gpt");
      expect(getShowcaseProjects()[0].featured).toBe(true);
    });
  });

  it("omits members of the featured series when requested", () => {
    const featured = getFeaturedSeries();
    expect(featured).toBeDefined();

    const articles = getRecentArticles(featured?.series.slug);
    expect(
      articles.some(
        (article) => article.series?.slug === featured?.series.slug,
      ),
    ).toBe(false);
  });
});