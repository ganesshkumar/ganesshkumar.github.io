import type { MetadataRoute } from "next";
import { SITE } from "@/lib/navigation";

/**
 * robots.txt generated at build time. Allows full crawling and points at the
 * sitemap so search and answer engines can discover every route.
 */
export const dynamic = "force-static";

const ORIGIN = SITE.url.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${ORIGIN}/sitemap.xml`,
    host: ORIGIN,
  };
}
