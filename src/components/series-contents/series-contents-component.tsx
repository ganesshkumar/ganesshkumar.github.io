import Link from "next/link";

import {
  articleHref,
  seriesHref,
  type ArticleSeriesContext,
} from "@/lib/content";
import { cn } from "@/lib/utils";

export type SeriesContentsComponentProps = {
  context: ArticleSeriesContext;
  className?: string;
};

export function SeriesContentsComponent({
  context,
  className,
}: SeriesContentsComponentProps) {
  const { series, current, localArticles } = context;

  return (
    <section
      aria-labelledby="series-contents-heading"
      className={cn(
        "border-y border-border bg-surface px-4 py-5 sm:px-6",
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="series-contents-heading"
          className="font-heading text-xl font-bold text-ink"
        >
          Series contents
        </h2>
        <span className="text-sm text-muted-foreground">
          Part {current.series?.order} · {series.articles.length} published
        </span>
      </div>
      <ol className="mt-4 divide-y divide-border border-y border-border">
        {localArticles.map((article) => {
          const isCurrent = article.slug === current.slug;
          const content = (
            <>
              <span className="font-mono text-xs text-muted-foreground">
                Part {article.series?.order}
              </span>
              <span className="font-medium text-body">{article.title}</span>
              {isCurrent ? (
                <span className="text-xs font-bold uppercase tracking-[0.06em] text-brand">
                  Current
                </span>
              ) : null}
            </>
          );
          return (
            <li key={article.slug}>
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="grid gap-1 py-3 sm:grid-cols-[5rem_1fr_auto] sm:items-baseline sm:gap-3"
                >
                  {content}
                </span>
              ) : (
                <Link
                  href={articleHref(article.slug)}
                  className="grid gap-1 py-3 no-underline hover:text-brand sm:grid-cols-[5rem_1fr] sm:items-baseline sm:gap-3"
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <Link
        href={seriesHref(series.series.slug)}
        className="mt-4 inline-block text-sm font-medium text-link"
      >
        View all published articles in this series
      </Link>
    </section>
  );
}
