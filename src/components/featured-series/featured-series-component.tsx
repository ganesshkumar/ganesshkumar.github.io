import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { VisualDeckComponent } from "@/components/visual-deck";
import { buttonVariants } from "@/components/ui/button";
import {
  articleHref,
  seriesHref,
  type SeriesWithArticles,
} from "@/lib/content";
import { cn } from "@/lib/utils";

export type FeaturedSeriesComponentProps = {
  data: SeriesWithArticles;
};

export function FeaturedSeriesComponent({
  data,
}: FeaturedSeriesComponentProps) {
  const { series, articles, firstArticle, latestArticle } = data;
  const latestIsFirst = latestArticle.slug === firstArticle.slug;

  return (
    <section
      aria-labelledby="featured-series-heading"
      className="border-y border-border bg-surface"
    >
      <div
        className={cn(
          "grid gap-8 px-5 py-8 sm:px-8 sm:py-10",
          series.visualDeck &&
            "lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:items-center",
        )}
      >
        <div className="flex flex-col items-start">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
            Current AI learning project
          </p>
          <h2
            id="featured-series-heading"
            className="mt-2 max-w-2xl font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            {series.name}
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-body">
            {series.description}
          </p>
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            {series.status === "ongoing" ? "Ongoing" : "Complete"} ·{" "}
            {articles.length} {articles.length === 1 ? "article" : "articles"}{" "}
            published
          </p>
          {series.project ? (
            <div className="mt-6 border-l-2 border-brand pl-4">
              <p className="text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
                Series build
              </p>
              <Link
                href={series.project.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 font-heading text-xl font-bold text-link"
              >
                {series.project.name}
                <ExternalLink className="size-4" aria-hidden />
              </Link>
              <p className="mt-1 max-w-[56ch] text-sm leading-relaxed text-body">
                {series.project.description}
              </p>
            </div>
          ) : null}
          <Link
            href={seriesHref(series.slug)}
            className={cn(buttonVariants({ variant: "outline" }), "mt-6")}
          >
            Explore the series
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {series.visualDeck ? (
          <VisualDeckComponent deck={series.visualDeck} variant="compact" />
        ) : null}
      </div>

      <div className="grid border-t border-border sm:grid-cols-2">
        <Link
          href={articleHref(firstArticle.slug)}
          className="group px-5 py-5 no-underline sm:px-8"
        >
          <span className="text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
            Start here · Part {firstArticle.series?.order}
          </span>
          <span className="mt-1 block font-heading text-lg font-bold text-ink group-hover:text-brand">
            {firstArticle.title}
          </span>
        </Link>
        {!latestIsFirst ? (
          <Link
            href={articleHref(latestArticle.slug)}
            className="group border-t border-border px-5 py-5 no-underline sm:border-l sm:border-t-0 sm:px-8"
          >
            <span className="text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
              Latest article · Part {latestArticle.series?.order}
            </span>
            <span className="mt-1 block font-heading text-lg font-bold text-ink group-hover:text-brand">
              {latestArticle.title}
            </span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
