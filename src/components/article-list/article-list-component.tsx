import { SectionHeaderComponent } from "@/components/section-header";
import { ArticleRowComponent } from "@/components/article-row";
import { type ArticleSummary } from "@/lib/content";

export type ArticleListComponentProps = {
  articles: ArticleSummary[];
  title?: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
};

export function ArticleListComponent({
  articles,
  title = "Recent Articles",
  description,
  viewAllHref = "/articles",
  viewAllLabel = "All Articles",
  className,
}: ArticleListComponentProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="recent-articles-heading" className={className}>
      <SectionHeaderComponent
        title={title}
        description={description}
        headingId="recent-articles-heading"
        action={{ label: viewAllLabel, href: viewAllHref }}
      />
      <ul className="mt-6 flex flex-col divide-y divide-border">
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticleRowComponent article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
