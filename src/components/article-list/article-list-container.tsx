import { getRecentArticles } from "@/lib/home-content";
import { getFeaturedSeries } from "@/lib/series";
import { ArticleListComponent } from "./article-list-component";

/**
 * Selects recent articles and renders the presentational list.
 * Article summaries come from the markdown files in `src/content/articles`.
 */
export function ArticleListContainer() {
  const featuredSeries = getFeaturedSeries();
  return (
    <ArticleListComponent
      articles={getRecentArticles(featuredSeries?.series.slug)}
      description="Practical notes from real problems."
    />
  );
}
