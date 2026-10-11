import { getAllArticles } from "@/lib/articles";
import type {
  ArticleSeriesContext,
  ArticleSummary,
  SeriesWithArticles,
} from "@/lib/content";
import {
  getSeriesDefinition,
  getSeriesDefinitions,
} from "@/lib/series-config";

function buildSeries(
  slug: string,
  articles: ArticleSummary[],
): SeriesWithArticles | undefined {
  const series = getSeriesDefinition(slug);
  if (!series) return undefined;

  const members = articles
    .filter((article) => article.series?.slug === slug)
    .sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0));
  const firstArticle = members[0];
  const latestArticle = members.at(-1);
  if (!firstArticle || !latestArticle) return undefined;

  return { series, articles: members, firstArticle, latestArticle };
}

export function getLocalSeriesArticles(
  articles: ArticleSummary[],
  currentIndex: number,
): ArticleSummary[] {
  if (currentIndex < 0 || currentIndex >= articles.length) return [];
  return articles.slice(Math.max(0, currentIndex - 3), currentIndex + 4);
}

export function getAllSeries(): SeriesWithArticles[] {
  const articles = getAllArticles();
  return getSeriesDefinitions()
    .map((definition) => buildSeries(definition.slug, articles))
    .filter((series): series is SeriesWithArticles => Boolean(series));
}

export function getSeriesSlugs(): string[] {
  return getAllSeries().map(({ series }) => series.slug);
}

export function getSeriesBySlug(slug: string): SeriesWithArticles | undefined {
  return buildSeries(slug, getAllArticles());
}

export function getFeaturedSeries(): SeriesWithArticles | undefined {
  return getAllSeries().find(({ series }) => series.featured);
}

export function getArticleSeriesContext(
  article: Pick<ArticleSummary, "slug" | "series">,
): ArticleSeriesContext | undefined {
  if (!article.series) return undefined;
  const series = getSeriesBySlug(article.series.slug);
  if (!series) return undefined;

  const currentIndex = series.articles.findIndex(
    (member) => member.slug === article.slug,
  );
  if (currentIndex < 0) return undefined;

  return {
    series,
    current: series.articles[currentIndex],
    ...(currentIndex > 0
      ? { previous: series.articles[currentIndex - 1] }
      : {}),
    ...(currentIndex < series.articles.length - 1
      ? { next: series.articles[currentIndex + 1] }
      : {}),
    localArticles: getLocalSeriesArticles(series.articles, currentIndex),
  };
}
