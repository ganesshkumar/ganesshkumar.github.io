import { getRecentArticles } from "@/lib/home-content";
import { ArticleListComponent } from "./article-list-component";

/**
 * Selects recent articles and renders the presentational list.
 * Article summaries come from the markdown files in `src/content/articles`.
 */
export function ArticleListContainer() {
  return (
    <ArticleListComponent
      articles={getRecentArticles()}
      description="Practical notes from real problems."
    />
  );
}
