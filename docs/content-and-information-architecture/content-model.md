# Content Model

> Built from an interview on 2026-07-26 and the existing content in `backup/articles`. This defines the content types the site renders and their fields. It does not cover how content is written: see `editorial-style-guide.md`.

## Content types
The rebuild models three content types now:
- **Article:** the main long-form content. Modeled on the existing `backup/articles` frontmatter.
- **Project:** a case study of something built. Outcome-first.
- **Book:** a compact record for the curated Bookshelf.

Future types (Note, Paper note, Book note, Talk, Course) reuse the Article shape or a small variant when those surfaces launch.

## Article
### Fields
Derived from `backup/articles`, canonicalized for the rebuild. Legacy field names are noted for migration.

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | yes | string | Post title in Title Case |
| `description` | yes | string | One or two sentences. Used for SEO and previews |
| `author` | no | string | Defaults to "Ganessh Kumar" |
| `pubDate` | yes | date | Published date. Legacy: `date` and `pubDate` both exist and match |
| `updatedDate` | no | date | Last meaningful update. Legacy: `modified_date` |
| `tags` | yes | list | 2 to 5, lowercase, hyphenated |
| `categories` | yes | list | One or more broad groupings |
| `series` | no | object | New. `{ name, order }` for multi-part posts |
| `image` | no | object | `{ url, alt }` cover image. Legacy: sometimes a bare string |
| `thumbnail` | no | string | Listing thumbnail path |
| `disqus` | no | bool | Comments flag. Legacy default true |
| `mathjax` | no | bool | Enable math rendering. Default false |
| `type` | no | string | Authoring sub-type (see below). Not shown on the site by default |

### Sub-type
Articles have an authoring sub-type: tutorial, tool-review, opinion, cheat-sheet or quick-tip (see `editorial-style-guide.md`). It drives how the piece is written and its length band. It is authoring-only by default and not surfaced on the site. It can become a visible label or filter later if it earns its place.

### Migration notes
When bringing `backup/articles` into the rebuild, normalize:
- Collapse `date`, `pubDate` and `modified_date` into `pubDate` and `updatedDate`.
- Make `image` a consistent `{ url, alt }` object, and supply alt text where missing.
- Add `series` only where a post is genuinely part of a set.
- Keep `tags` lowercase and hyphenated, and reconcile duplicates and near-duplicates.

## Project
Projects render inline on the `/projects` index. There is no per-project detail route today, so the summary fields below (led by `problem` and `outcome`) carry the case on the index row, and deeper writing lives in cross-linked articles.

### Fields
Proposed, from the project responsibilities in `page-responsibility.md` (outcome, problem, constraints, decisions, lessons).

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | yes | string | Project name |
| `description` | yes | string | One line on what it is |
| `outcome` | yes | string | What it achieved. Lead with this |
| `problem` | yes | string | The problem it solved |
| `constraints` | no | string | Real constraints that shaped it |
| `decisions` | no | list | Key technical decisions and why |
| `learned` | no | string | What you learned |
| `stack` | no | list | Technologies used |
| `role` | no | string | Your role |
| `status` | no | string | shipped, in progress or archived |
| `links` | no | list | Repo, live demo, related article |
| `pubDate` | yes | date | When it shipped or was written up |
| `updatedDate` | no | date | Last update |
| `tags` | no | list | Shared with articles for cross-linking |
| `image` | no | object | `{ url, alt }` cover |
| `featured` | no | bool | Surface on home or projects index |

## Book
Books render in source order on `/bookshelf`. The page introduction owns the shared curation criterion, so each record can remain compact until a useful personal note exists.

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | yes | string | Full published title, including subtitle and punctuation |
| `authors` | yes | list | Published author credits, in display order |
| `links` | no | list | Ranked retailer, publisher or affiliate destinations |

Each link supports `url` plus optional `provider`, `regions`, `affiliate` and `priority` fields. Lower priority numbers rank first. Affiliate relationships must be disclosed clearly when affiliate links are present.

## Taxonomy
Three ways to group content:
- **Tags:** granular topics (azure, docker, neural-network). Lowercase, hyphenated, 2 to 5 per article. The primary discovery path.
- **Categories:** a smaller, stable set of broad groupings (self-hosting, distributed-systems, life-style). One or more per article.
- **Series:** an ordered, named set for multi-part posts. Each member carries `{ name, order }`. Optional.

Rules:
- Tags are for discovery, categories are for structure. Do not overload one to do the other's job.
- Keep the category set small and stable. Add a category only when several posts need it.
- A tag is worth adding only if it will group at least a few posts.

## Relationship to authoring
- Articles may carry authoring-only frontmatter during production (like `stage` and `type`). The website consumes only the published fields above.
- How articles are written, including the no-invention and provenance rules, lives in `editorial-style-guide.md`.

## Related
- Editorial and writing craft: `editorial-style-guide.md`.
- SEO and metadata fields: `seo-metadata.md`.
- Page ownership: `page-responsibility.md`.
