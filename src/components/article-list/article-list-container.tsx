import { getRecentArticles } from "@/lib/home-content";
import { ArticleListComponent } from "./article-list-component";

/**
 * Selects recent articles and renders the presentational list.
 * Data currently comes from seed content; swap the accessor for the
 * markdown pipeline when it lands.
 */
export function ArticleListContainer() {
  return (
    <ArticleListComponent
      articles={getRecentArticles()}
      description="Practical notes from real problems."
    />
  );
}
