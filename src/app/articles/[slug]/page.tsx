import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { BreadcrumbsComponent } from "@/components/breadcrumbs";
import { ArticleHeroComponent } from "@/components/article-hero";
import { ArticleMetaComponent } from "@/components/article-meta";
import { ArticleBodyComponent } from "@/components/article-body";
import { RelatedArticlesComponent } from "@/components/related-articles";
import { ReadingCtaComponent } from "@/components/reading-cta";

import {
  getAllArticles,
  getArticleBySlug,
  getArticleSlugs,
} from "@/lib/articles";
import { selectRelatedArticles } from "@/lib/content";
import {
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  articleCanonicalUrl,
  buildArticleGraphJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

/** All article routes are known at build time (static export). */
export const dynamicParams = false;

/** Deduplicate the file read + markdown render between metadata and the page. */
const loadArticle = cache(getArticleBySlug);

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) return {};

  const canonical = articleCanonicalUrl(slug);
  const images = article.coverImage
    ? [
        {
          url: absoluteUrl(article.coverImage.src),
          alt: article.coverImage.alt,
        },
      ]
    : [{ url: DEFAULT_OG_IMAGE.url, alt: DEFAULT_OG_IMAGE.alt }];

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    authors: [{ name: article.author, url: absoluteUrl("/about/") }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: article.title,
      description: article.description,
      siteName: "Ganessh Kumar",
      publishedTime: article.pubDate,
      modifiedTime: article.updatedDate ?? article.pubDate,
      authors: [article.author],
      tags: article.tags,
      ...(article.category ? { section: article.category } : {}),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      creator: "@ganesshkumar",
      images: images.map((image) => image.url),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) notFound();

  const related = selectRelatedArticles(getAllArticles(), article, 3);

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildArticleGraphJsonLd(article)),
        }}
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <BreadcrumbsComponent
          items={[
            { label: "Home", href: "/" },
            { label: "Articles", href: "/articles" },
            { label: article.title },
          ]}
        />

        <article className="mt-6">
          <ArticleHeroComponent
            title={article.title}
            eyebrow={article.category}
            image={article.coverImage}
          />

          <div className="mt-8">
            <ArticleMetaComponent
              author={article.author}
              pubDate={article.pubDate}
              updatedDate={article.updatedDate}
              readingTimeMinutes={article.readingTimeMinutes}
              tags={article.tags}
            />

            <ArticleBodyComponent html={article.contentHtml} className="mt-8" />
          </div>
        </article>

        <div className="mt-10 border-t border-border pt-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-medium text-link no-underline hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to Articles
          </Link>
        </div>
      </div>

      {related.length > 0 ? (
        <div className="mx-auto w-full max-w-5xl px-4 pb-2 sm:px-6">
          <RelatedArticlesComponent articles={related} />
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
        <ReadingCtaComponent
          title="Keep reading"
          description="I write about full-stack development, developer tooling and the problems I run into building things. Here is everything else on the blog."
          primaryCta={{ label: "Read more articles", href: "/articles" }}
          secondaryCta={{ label: "About the author", href: "/about" }}
        />
      </div>
    </main>
  );
}
