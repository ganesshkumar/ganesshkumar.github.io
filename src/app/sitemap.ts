import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { SITE } from "@/lib/navigation";

/**
 * Static sitemap generated at build time. Static export cannot run a route
 * handler at request time, so this file is emitted to `out/sitemap.xml`.
 *
 * URLs carry the trailing slash the site canonicalizes to (`trailingSlash:
 * true`) and cover the routes that exist today. Planned routes (tags, series,
 * newsletter, legal pages) are added here as they ship.
 */
export const dynamic = "force-static";

const ORIGIN = SITE.url.replace(/\/$/, "");
const url = (path: string) => `${ORIGIN}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/articles/"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/projects/"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/bookshelf/"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/about/"), changeFrequency: "monthly", priority: 0.5 },
    { url: url("/contact/"), changeFrequency: "yearly", priority: 0.5 },
  ];

  const articleEntries: MetadataRoute.Sitemap = getAllArticles().map(
    (article) => ({
      url: url(`/articles/${article.slug}/`),
      lastModified: article.updatedDate ?? (article.pubDate || undefined),
      changeFrequency: "yearly",
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...articleEntries];
}
