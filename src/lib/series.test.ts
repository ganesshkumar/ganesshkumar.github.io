import { describe, expect, it } from "vitest";
import type { ArticleSummary } from "@/lib/content";
import {
  getArticleSeriesContext,
  getLocalSeriesArticles,
} from "@/lib/series";

const members: ArticleSummary[] = Array.from({ length: 10 }, (_, index) => ({
  slug: `part-${index + 1}`,
  title: `Part ${index + 1}`,
  description: "",
  pubDate: "2026-01-01",
  tags: [],
  series: {
    name: "Test series",
    slug: "test-series",
    order: index + 1,
  },
}));

describe("getArticleSeriesContext", () => {
  it("uses a strict three-before and three-after local window", () => {
    const context = getArticleSeriesContext({
      slug: "2026-10-11-understanding-gpt2-tokenization",
      series: {
        name: "Notes From a Software Engineer Learning LLMs",
        slug: "software-engineer-learning-llms",
        order: 2,
      },
    });

    expect(context?.previous?.series?.order).toBe(1);
    expect(context?.next?.series?.order).toBe(3);
    expect(context?.localArticles.map((article) => article.series?.order)).toEqual([
      1, 2, 3,
    ]);
  });

  it("returns no context for an article outside a series", () => {
    const article: Pick<ArticleSummary, "slug" | "series"> = {
      slug: "standalone",
    };
    expect(getArticleSeriesContext(article)).toBeUndefined();
  });

  it("shows at most three published articles on each side", () => {
    expect(
      getLocalSeriesArticles(members, 4).map(
        (article) => article.series?.order,
      ),
    ).toEqual([2, 3, 4, 5, 6, 7, 8]);
  });

  it("does not backfill unavailable previous articles", () => {
    expect(
      getLocalSeriesArticles(members, 0).map(
        (article) => article.series?.order,
      ),
    ).toEqual([1, 2, 3, 4]);
  });

  it("does not backfill unavailable next articles", () => {
    expect(
      getLocalSeriesArticles(members, 9).map(
        (article) => article.series?.order,
      ),
    ).toEqual([7, 8, 9, 10]);
  });
});
