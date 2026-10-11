import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  articleHref,
  seriesHref,
  type ArticleSeriesContext,
} from "@/lib/content";
import { cn } from "@/lib/utils";

export type SeriesNavigationComponentProps = {
  context: ArticleSeriesContext;
  className?: string;
};

export function SeriesNavigationComponent({
  context,
  className,
}: SeriesNavigationComponentProps) {
  const { previous, next, series } = context;

  return (
    <nav
      aria-label="Series navigation"
      className={cn("border-y border-border bg-surface", className)}
    >
      <div className="grid sm:grid-cols-2">
        {previous ? (
          <Link
            href={articleHref(previous.slug)}
            className="group flex gap-3 px-4 py-5 no-underline sm:px-6"
          >
            <ArrowLeft className="mt-1 size-4 shrink-0" aria-hidden />
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
                Previous article
              </span>
              <span className="mt-1 block font-heading font-bold text-ink group-hover:text-brand">
                {previous.title}
              </span>
            </span>
          </Link>
        ) : (
          <span aria-hidden className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={articleHref(next.slug)}
            className="group flex justify-end gap-3 border-t border-border px-4 py-5 text-right no-underline sm:border-l sm:border-t-0 sm:px-6"
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
                Next article
              </span>
              <span className="mt-1 block font-heading font-bold text-ink group-hover:text-brand">
                {next.title}
              </span>
            </span>
            <ArrowRight className="mt-1 size-4 shrink-0" aria-hidden />
          </Link>
        ) : null}
      </div>
      <div className="border-t border-border px-4 py-3 text-center sm:px-6">
        <Link
          href={seriesHref(series.series.slug)}
          className="text-sm font-medium text-link"
        >
          View all published articles in this series
        </Link>
      </div>
    </nav>
  );
}
