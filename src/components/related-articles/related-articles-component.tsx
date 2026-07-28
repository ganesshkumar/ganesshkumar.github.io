import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeaderComponent } from "@/components/section-header";
import { badgeVariants } from "@/components/ui/badge";
import { articleHref, type ArticleSummary } from "@/lib/content";
import { formatDate } from "@/lib/format";

export type RelatedArticlesComponentProps = {
  articles: ArticleSummary[];
  title?: string;
  className?: string;
};

/**
 * "Suggested posts" block shown after the article body. Cards link to related
 * articles (chosen by shared tags/category) to deepen reading and strengthen
 * internal linking. Renders nothing when there is nothing to suggest.
 */
export function RelatedArticlesComponent({
  articles,
  title = "Suggested posts",
  className,
}: RelatedArticlesComponentProps) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className={cn("flex flex-col gap-6", className)}
    >
      <SectionHeaderComponent
        title={title}
        headingId="related-heading"
        headingLevel={2}
      />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const published = formatDate(article.pubDate);
          return (
            <li key={article.slug}>
              <article className="flex h-full flex-col gap-2 border border-border bg-paper p-5 transition-colors hover:border-brand/40">
                {published ? (
                  <time
                    dateTime={article.pubDate}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    {published}
                  </time>
                ) : null}
                <h3 className="font-heading text-base font-bold leading-snug text-ink">
                  <Link
                    href={articleHref(article.slug)}
                    className="no-underline hover:text-brand"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-body">
                  {article.description}
                </p>
                {article.tags.length > 0 ? (
                  <ul
                    aria-label="Tags"
                    className="mt-auto flex flex-wrap gap-1.5 pt-1"
                  >
                    {article.tags.slice(0, 3).map((tag) => (
                      <li key={tag}>
                        <span className={badgeVariants({ variant: "outline" })}>
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
