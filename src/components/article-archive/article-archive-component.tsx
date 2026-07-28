import { ArticleRowComponent } from "@/components/article-row";
import { cn } from "@/lib/utils";
import type { ArticleYearGroup } from "@/lib/content";

export type ArticleArchiveComponentProps = {
  groups: ArticleYearGroup[];
  className?: string;
};

/**
 * The full article archive, grouped by year with the newest year first. Each
 * year is a labelled section of scannable rows. Presentational only: the year
 * buckets are prepared by the caller.
 */
export function ArticleArchiveComponent({
  groups,
  className,
}: ArticleArchiveComponentProps) {
  if (groups.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-10", className)}>
      {groups.map((group) => (
        <section key={group.year} aria-labelledby={`archive-year-${group.year}`}>
          <h2
            id={`archive-year-${group.year}`}
            className="font-heading text-2xl font-bold tracking-tight text-ink"
          >
            {group.year}
          </h2>
          <ul className="mt-3 flex flex-col divide-y divide-border">
            {group.articles.map((article) => (
              <li key={article.slug}>
                <ArticleRowComponent article={article} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
