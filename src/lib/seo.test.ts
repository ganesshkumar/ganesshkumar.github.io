import { describe, it, expect } from "vitest";
import {
  absoluteUrl,
  articleCanonicalUrl,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  serializeJsonLd,
} from "./seo";
import { SITE } from "./navigation";
import type { ArticleDetail } from "./content";

const article: ArticleDetail = {
  slug: "2026-02-04-clean-obsidian-vault",
  title: "Clean Obsidian Vault",
  description: "Scripts to clean an Obsidian vault.",
  pubDate: "2026-02-04",
  updatedDate: "2026-02-05",
  author: "Ganessh Kumar",
  tags: ["obsidian", "nodejs"],
  categories: ["technology"],
  category: "technology",
  coverImage: { src: "/assets/images/x/cover.webp", alt: "cover" },
  readingTimeMinutes: 4,
  contentHtml: "<p>hi</p>",
};

describe("absoluteUrl", () => {
  it("prefixes app paths with the site origin", () => {
    expect(absoluteUrl("/about/")).toBe(`${SITE.url}/about/`);
  });

  it("passes through absolute urls unchanged", () => {
    expect(absoluteUrl("https://cdn.example.com/a.png")).toBe(
      "https://cdn.example.com/a.png",
    );
  });
});

describe("articleCanonicalUrl", () => {
  it("builds a trailing-slash canonical url", () => {
    expect(articleCanonicalUrl("my-post")).toBe(
      `${SITE.url}/articles/my-post/`,
    );
  });
});

describe("buildArticleJsonLd", () => {
  const data = buildArticleJsonLd(article);

  it("is a BlogPosting with the article headline", () => {
    expect(data["@type"]).toBe("BlogPosting");
    expect(data.headline).toBe(article.title);
  });

  it("uses the updated date for dateModified", () => {
    expect(data.dateModified).toBe("2026-02-05");
  });

  it("includes an absolute cover image", () => {
    expect(data.image).toEqual([`${SITE.url}/assets/images/x/cover.webp`]);
  });

  it("names the author and publisher", () => {
    expect((data.author as { name: string }).name).toBe("Ganessh Kumar");
    expect((data.publisher as { name: string }).name).toBe("Ganessh Kumar");
  });

  it("carries keywords and section", () => {
    expect(data.keywords).toBe("obsidian, nodejs");
    expect(data.articleSection).toBe("technology");
  });
});

describe("buildBreadcrumbJsonLd", () => {
  it("lists home, articles and the current post", () => {
    const data = buildBreadcrumbJsonLd(article);
    const items = data.itemListElement as Array<{
      name: string;
      position: number;
    }>;
    expect(items).toHaveLength(3);
    expect(items[0].name).toBe("Home");
    expect(items[2].name).toBe(article.title);
  });
});

describe("serializeJsonLd", () => {
  it("escapes angle brackets to prevent script breakout", () => {
    const out = serializeJsonLd({ x: "</script>" });
    expect(out).not.toContain("</script>");
    expect(out).toContain("\\u003c/script>");
  });
});
