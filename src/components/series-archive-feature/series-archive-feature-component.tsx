import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { seriesHref, type SeriesWithArticles } from "@/lib/content";
import { cn } from "@/lib/utils";

export type SeriesArchiveFeatureComponentProps = {
  data: SeriesWithArticles;
  className?: string;
};

export function SeriesArchiveFeatureComponent({
  data,
  className,
}: SeriesArchiveFeatureComponentProps) {
  const { series, articles } = data;

  return (
    <section
      aria-labelledby="article-series-heading"
      className={cn("border-y border-border py-6", className)}
    >
      <p className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
        Series
      </p>
      <div className="mt-2 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2
            id="article-series-heading"
            className="font-heading text-2xl font-bold text-ink"
          >
            {series.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {series.status === "ongoing" ? "Ongoing" : "Complete"} ·{" "}
            {articles.length} published{" "}
            {articles.length === 1 ? "article" : "articles"}
          </p>
        </div>
        <Link
          href={seriesHref(series.slug)}
          className="inline-flex items-center gap-1 text-sm font-medium text-link no-underline hover:underline"
        >
          View the series
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
