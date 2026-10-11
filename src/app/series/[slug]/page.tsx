import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { BreadcrumbsComponent } from "@/components/breadcrumbs";
import { SectionHeaderComponent } from "@/components/section-header";
import { VisualDeckComponent } from "@/components/visual-deck";
import { buttonVariants } from "@/components/ui/button";
import { articleHref } from "@/lib/content";
import { formatDate } from "@/lib/format";
import {
  getSeriesBySlug,
  getSeriesSlugs,
} from "@/lib/series";
import {
  absoluteUrl,
  buildSeriesGraphJsonLd,
  serializeJsonLd,
  seriesCanonicalUrl,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSeriesSlugs().map((slug) => ({ slug }));
}

type SeriesPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getSeriesBySlug(slug);
  if (!data) return {};

  const canonical = seriesCanonicalUrl(slug);
  const image = data.series.visualDeck?.cards[0]?.image;

  return {
    title: data.series.name,
    description: data.series.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: data.series.name,
      description: data.series.description,
      siteName: "Ganessh Kumar",
      ...(image
        ? {
            images: [
              {
                url: absoluteUrl(image.src),
                alt: image.alt,
                width: 1200,
                height: 900,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: data.series.name,
      description: data.series.description,
      ...(image ? { images: [absoluteUrl(image.src)] } : {}),
    },
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const data = getSeriesBySlug(slug);
  if (!data) notFound();

  const { series, articles, firstArticle } = data;

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildSeriesGraphJsonLd(data)),
        }}
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <BreadcrumbsComponent
          items={[
            { label: "Home", href: "/" },
            { label: series.name },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
            Article series
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            {series.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-body">
            {series.description}
          </p>
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            {series.status === "ongoing" ? "Ongoing" : "Complete"} ·{" "}
            {articles.length} {articles.length === 1 ? "article" : "articles"}{" "}
            published
          </p>
          <Link
            href={articleHref(firstArticle.slug)}
            className={cn(buttonVariants({ variant: "default" }), "mt-6")}
          >
            Start with Part {firstArticle.series?.order}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </header>

        {series.visualDeck ? (
          <section
            aria-labelledby="visual-notes-heading"
            className="mt-14 border-t border-border pt-10"
          >
            <SectionHeaderComponent
              title="Visual notes"
              description="A precise system view that will grow only as the related articles are published."
              headingId="visual-notes-heading"
            />
            <VisualDeckComponent
              deck={series.visualDeck}
              variant="full"
              className="mt-6"
            />
          </section>
        ) : null}

        <section
          aria-labelledby="published-articles-heading"
          className="mt-14 border-t border-border pt-10"
        >
          <SectionHeaderComponent
            title="Published articles"
            description="The complete published sequence. Unpublished work does not appear here."
            headingId="published-articles-heading"
          />
          <ol className="mt-6 divide-y divide-border border-y border-border">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={articleHref(article.slug)}
                  className="group grid gap-2 py-5 no-underline sm:grid-cols-[6rem_1fr_auto] sm:gap-5"
                >
                  <span className="font-mono text-sm text-muted-foreground">
                    Part {article.series?.order}
                  </span>
                  <span>
                    <span className="block font-heading text-xl font-bold text-ink group-hover:text-brand">
                      {article.title}
                    </span>
                    <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-body">
                      {article.description}
                    </span>
                  </span>
                  <span className="flex gap-2 text-xs text-muted-foreground sm:flex-col sm:items-end">
                    <time dateTime={article.pubDate}>
                      {formatDate(article.pubDate)}
                    </time>
                    {article.readingTimeMinutes ? (
                      <span>{article.readingTimeMinutes} min read</span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
