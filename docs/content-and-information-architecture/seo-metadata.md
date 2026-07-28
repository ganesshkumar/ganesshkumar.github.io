# SEO and Metadata

> Built from an interview on 2026-07-26. This is the metadata standard every page follows: titles, descriptions, canonical URLs, social cards, structured data and the machine-readability files.

## Title tags
- Format: `{Page Title} | Ganessh Kumar`.
- Home: `Ganessh Kumar | Full-stack, distributed systems and AI agents`.
- Keep the visible title under about 60 characters so it does not truncate in search.
- The `{Page Title}` comes from the page or the article `title` field.

## Meta description
- One per page, unique, from the `description` field in `content-model.md`.
- Aim for 150 to 160 characters. Say what the page delivers, no keyword stuffing.
- Never leave it empty. A missing description is a defect.

## Canonical URLs
- Every page declares one canonical URL, its own clean site URL.
- Cross-posted articles (dev.to, Medium, a newsletter) set their canonical back to the site copy.
- Keep slugs stable once published. A published slug does not change.

## Social cards
Open Graph and Twitter/X cards on every page.
- `og:title`, `og:description`, `og:url`, `og:type` (article for posts, website otherwise), `og:image`.
- `twitter:card` is `summary_large_image`. `twitter:site` is the site's X handle.
- Image: the page or article image at 1200x630. When a page has none, fall back to a generated GK template (post title, the "GK" wordmark, a red accent bar) from `../brand/visual-identity.md`.
- Every OG image has meaningful alt text.

## Structured data (JSON-LD)
Emit JSON-LD per page type.

| Type | Where | Key fields |
|---|---|---|
| BlogPosting | Article pages | headline, description, datePublished, dateModified, author, image, keywords (tags), mainEntityOfPage, publisher |
| Person | Site-wide author identity | name "Ganessh Kumar", url, sameAs (social profiles), jobTitle |
| Organization | Site publisher | name, url, logo (the "GK" wordmark) |
| BreadcrumbList | Article, project, tag and series pages | itemListElement with position and name |
| WebSite + SearchAction | Home, only if a real search route exists | url, potentialAction pointing at the real `/search?q=` route |

Rules:
- Compose each page's schema.org data as a single JSON-LD `@graph` block in one `<script>`, with one top-level `@context`. Do not emit multiple separate JSON-LD blocks per page.
- Cross-reference shared entities (`Person`, `Organization`) by `@id` so every page resolves to one canonical identity.
- Do not emit `SearchAction` unless a working search route exists. Do not advertise search the site does not have.
- Author is the same `Person` across the site. Keep the name and profiles consistent.
- Structured-data dates match the `pubDate` and `updatedDate` fields exactly.

## Machine-readability files
- **`sitemap.xml`:** every indexable route, with `lastmod` from `updatedDate`. Regenerate on build.
- **`robots.txt`:** allow crawling of public pages, disallow private or duplicate routes and link the sitemap.
- **RSS feed:** a full feed at `/rss.xml` for articles, newest first, with title, link, date and summary.
- **`llms.txt`:** a plain-text index at `/llms.txt` describing the site and linking the key sections, so language models can read it cleanly.

## Per-page checklist
Before a page ships:
- Unique title in the `{Title} | Ganessh Kumar` format.
- Unique meta description, 150 to 160 characters.
- One canonical URL.
- Open Graph and Twitter cards with a valid image and alt.
- The right JSON-LD type for the page, with dates matching the content.
- The route is in `sitemap.xml` and reachable from navigation or an index.

## Related
- Content fields feeding metadata: `content-model.md`.
- Editorial rules (canonical, cross-post, internal links): `editorial-style-guide.md`.
- OG image template and wordmark: `../brand/visual-identity.md`.
