import { describe, expect, it } from "vitest";
import { getArticleSlugs } from "./articles";
import { getRecentArticles } from "./home-content";

describe("getRecentArticles", () => {
  it("returns the newest ten articles with canonical file slugs", () => {
    const articles = getRecentArticles();
    const articleSlugs = new Set(getArticleSlugs());

    expect(articles).toHaveLength(10);
    expect(articles[0].slug).toBe("2026-02-04-clean-obsidian-vault");
    expect(
      articles.every(
        (article) =>
          /^\d{4}-\d{2}-\d{2}-/.test(article.slug) &&
          articleSlugs.has(article.slug),
      ),
    ).toBe(true);
  });
});