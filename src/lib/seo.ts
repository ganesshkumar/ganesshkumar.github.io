import type { Metadata } from "next";
import { SITE, SOCIAL_NAV } from "@/lib/navigation";
import type {
  ArticleDetail,
  ProjectSummary,
  SeriesWithArticles,
} from "@/lib/content";

/**
 * SEO/AEO helpers: absolute URL resolution and JSON-LD (schema.org) builders.
 * Structured data makes article pages eligible for rich results and gives
 * answer engines an explicit, machine-readable summary of each page.
 */

const ORIGIN = SITE.url.replace(/\/$/, "");

/** Resolve an app path (or pass through an absolute URL) to an absolute URL. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${ORIGIN}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/** Canonical URL for an article, with the trailing slash the site uses. */
export function articleCanonicalUrl(slug: string): string {
  return `${ORIGIN}/articles/${slug}/`;
}

export function seriesCanonicalUrl(slug: string): string {
  return `${ORIGIN}/series/${slug}/`;
}

/** X/Twitter handle used for `twitter:site` and `twitter:creator`. */
const TWITTER_HANDLE = "@ganesshkumar";

/** Default social share image, reused across pages without a bespoke image. */
export const DEFAULT_OG_IMAGE = {
  url: absoluteUrl("/assets/images/og-default.png"),
  alt: `${SITE.name} — full-stack engineering, distributed systems and agentic systems`,
} as const;

/**
 * Build Open Graph + Twitter metadata for a page. Each page owns its own
 * social title, description and canonical path, so previews stay accurate
 * and configurable per route rather than sharing one site-wide default.
 */
export function buildSocialMetadata(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const path = opts.path.endsWith("/") ? opts.path : `${opts.path}/`;
  const url = absoluteUrl(path);
  return {
    openGraph: {
      type: opts.type ?? "website",
      url,
      siteName: SITE.name,
      locale: "en_US",
      title: opts.title,
      description: opts.description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: opts.title,
      description: opts.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

/** The author's public profiles, for `sameAs` identity resolution. */
function authorSameAs(): string[] {
  return SOCIAL_NAV.filter((link) => /^https?:\/\//i.test(link.href)).map(
    (link) => link.href,
  );
}

const AUTHOR = {
  "@type": "Person",
  "@id": `${ORIGIN}/#person`,
  name: SITE.name,
  url: `${ORIGIN}/about/`,
  sameAs: authorSameAs(),
} as const;

const PUBLISHER = {
  "@type": "Organization",
  name: SITE.name,
  url: `${ORIGIN}/`,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/assets/images/logo.png"),
  },
} as const;

/**
 * Home page structured data: a cross-referenced graph of the site (WebSite),
 * the publishing entity (Organization) and the person behind it (Person).
 * The shared `@id` anchors let other pages' `publisher`/`author` references
 * resolve to a single canonical identity.
 */
export function buildHomeJsonLd(): Record<string, unknown> {
  const sameAs = authorSameAs();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${ORIGIN}/#website`,
        url: `${ORIGIN}/`,
        name: SITE.name,
        description: SITE.tagline,
        publisher: { "@id": `${ORIGIN}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        "@id": `${ORIGIN}/#organization`,
        name: SITE.name,
        url: `${ORIGIN}/`,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/assets/images/logo.png"),
        },
        sameAs,
      },
      {
        "@type": "Person",
        "@id": `${ORIGIN}/#person`,
        name: SITE.name,
        url: `${ORIGIN}/about/`,
        sameAs,
      },
    ],
  };
}

/** BlogPosting structured data for an article detail page. */
export function buildArticleJsonLd(article: ArticleDetail): Record<string, unknown> {
  const canonical = articleCanonicalUrl(article.slug);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.coverImage
      ? [absoluteUrl(article.coverImage.src)]
      : [DEFAULT_OG_IMAGE.url],
    datePublished: article.pubDate,
    dateModified: article.updatedDate ?? article.pubDate,
    ...(article.readingTimeMinutes
      ? { timeRequired: `PT${article.readingTimeMinutes}M` }
      : {}),
    author: AUTHOR,
    publisher: PUBLISHER,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    ...(article.tags.length > 0 ? { keywords: article.tags.join(", ") } : {}),
    ...(article.category ? { articleSection: article.category } : {}),
    ...(article.series
      ? {
          isPartOf: {
            "@type": "CollectionPage",
            name: article.series.name,
            url: seriesCanonicalUrl(article.series.slug),
          },
        }
      : {}),
    inLanguage: "en",
    isAccessibleForFree: true,
  };
}

export function buildSeriesGraphJsonLd(
  data: SeriesWithArticles,
): Record<string, unknown> {
  const canonical = seriesCanonicalUrl(data.series.slug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": canonical,
        url: canonical,
        name: data.series.name,
        description: data.series.description,
        isPartOf: { "@type": "WebSite", url: `${ORIGIN}/` },
        author: AUTHOR,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: data.articles.length,
          itemListElement: data.articles.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "BlogPosting",
              name: article.title,
              description: article.description,
              url: articleCanonicalUrl(article.slug),
              datePublished: article.pubDate,
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${ORIGIN}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: data.series.name,
            item: canonical,
          },
        ],
      },
    ],
  };
}

/** Breadcrumb structured data: Home > Articles > this article. */
export function buildBreadcrumbJsonLd(
  article: Pick<ArticleDetail, "slug" | "title">,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${ORIGIN}/articles/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleCanonicalUrl(article.slug),
      },
    ],
  };
}

/**
 * Article detail structured data as a single schema.org `@graph`: the
 * BlogPosting and its BreadcrumbList share one top-level `@context`, matching
 * the site convention set by `buildHomeJsonLd`. Reuses the standalone builders
 * so all their fields flow through, then hoists the `@context` off each node.
 */
export function buildArticleGraphJsonLd(
  article: ArticleDetail,
): Record<string, unknown> {
  const { "@context": _articleContext, ...blogPosting } =
    buildArticleJsonLd(article);
  const { "@context": _breadcrumbContext, ...breadcrumb } =
    buildBreadcrumbJsonLd(article);
  void _articleContext;
  void _breadcrumbContext;
  return {
    "@context": "https://schema.org",
    "@graph": [blogPosting, breadcrumb],
  };
}

/**
 * CollectionPage + ItemList structured data for the projects index. There are
 * no per-project detail routes, so each list item points straight at the live
 * site or source repository.
 */
export function buildProjectsJsonLd(
  projects: ProjectSummary[],
  description: string,
): Record<string, unknown> {
  const url = `${ORIGIN}/projects/`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url,
    name: "Projects",
    description,
    isPartOf: { "@type": "WebSite", url: `${ORIGIN}/` },
    author: AUTHOR,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.problem ?? project.description,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Any",
          ...(project.liveUrl ? { url: project.liveUrl } : {}),
          ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
          author: AUTHOR,
        },
      })),
    },
  };
}

/**
 * Serialize structured data for safe inlining in a <script> tag. Escapes `<`
 * so a stray `</script>` in any string field cannot break out of the element.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
