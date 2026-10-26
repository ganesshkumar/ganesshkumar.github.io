# Route Map and Navigation Contract

## Purpose
This document defines the target route map for the rebuilt site and the navigation contract that all pages must follow.

Use it to answer:
- which routes exist and what each route is for,
- how routes map to page responsibilities,
- how navigation surfaces must behave,
- and what rules govern adding, changing or removing a route.

This is a long-lived rules document. It describes the target rebuild, not only the current implementation.

## Relationship to other docs
- Page ownership comes from `page-responsibility.md`.
- Architectural intent comes from `system-design.md`.
- Non-negotiable rules come from `../website-tenets.md`.

If this contract conflicts with those documents, resolve the conflict there first, then update this file.

## Route status legend
- `stable`: part of the first rebuild scope and expected at launch.
- `planned`: architecturally supported, delivered in a later phase.
- `system`: machine-facing route, not a reading surface.

## Route map

| Route | Purpose | Owning surface (matrix) | Status | Rendering |
| --- | --- | --- | --- | --- |
| `/` | Orientation and routing into the site | Home | stable | static |
| `/articles` | Primary discoverability and archive | Articles index | stable | static |
| `/articles/[slug]` | Long-form reading surface | Article detail | stable | static per article |
| `/projects` | Proof of execution quality, case detail included | Projects index | stable | static |
| `/tools` | Discover usable browser utilities | Tools index | stable | static |
| `/tools/ai-text-cleaner` | Clean invisible characters, spaces and punctuation | Tool detail | stable | static shell, client-side processing |
| `/tags` | Topic entry index | Tag / topic pages | planned | static |
| `/tags/[tag]` | Filtered topic navigation | Tag / topic pages | planned | static per tag |
| `/series/[series]` | Ordered multi-part learning | Series pages | planned | static per series |
| `/about` | Trust and identity framing | About | stable | static |
| `/contact` | Low-friction conversation entry | Contact | stable | static |
| `/newsletter` | Ongoing relationship channel | Newsletter surface | planned | static |
| `/papershelf` | Curated paper references | Papershelf / Bookshelf | planned | static |
| `/bookshelf` | Curated book references | Papershelf / Bookshelf | stable | static |
| `/talks` | Authority and teaching proof | Talks | planned | static |
| `/collaborate` | Business-ready collaboration path | Collaborate | planned | static |
| `/uses` | Tools and setup reference | Papershelf / Bookshelf family | planned | static |
| `/privacy` | Legal: privacy policy | utility | stable | static |
| `/terms` | Legal: terms of use | utility | stable | static |
| `/404` | Recovery for unknown routes | utility | stable | static |
| `/sitemap.xml` | Crawl coverage | system | stable | generated |
| `/robots.txt` | Crawl rules | system | stable | generated |
| `/llms.txt` | Machine-readable site summary | system | planned | generated |

Projects have no per-project detail route. The `/projects` index is the terminal proof surface: each project renders as a case row (problem, outcome, stack) that links out to its live site or source repository. A dedicated `/projects/[slug]` route can return later if a single project needs a full write-up, but it is deliberately not part of the current contract.

## Tools catalog and sitemap
- Register every published tool in `TOOL_CATALOG` in `src/lib/tools.ts`.
- The tools index and sitemap consume the same validated `getTools()` result.
- Adding a tool does not require a separate sitemap entry or a hardcoded index row.
- The static build checks public tool pages against the catalog. Missing registrations,
  duplicate slugs and catalog entries without pages must fail the build.
- Use concrete canonical paths. Route groups do not enter URLs; private folders and
  parallel slots do not create independent sitemap entries.

## Canonical URL rules
- Trailing slash is required for content routes, matching the current build convention (`trailingSlash: true`).
- Every content route resolves to exactly one canonical URL.
- Category and topic browsing must use real routes (`/tags/[tag]`), not query-string filters, once tag pages ship.
- Query-string filtering may exist as a convenience but must never be the only crawlable path to content.
- No content should be reachable only through a query parameter.

## Navigation contract

### Fixed top navigation
The top navigation contains exactly these destinations:
- Articles
- Projects
- Bookshelf
- About
- Contact

Rules:
- The site wordmark or logo links to `/`.
- The top navigation must not expand to include other secondary surfaces.
- Depth grows through secondary surfaces and in-content links, not by adding top-nav items.

### Secondary surface navigation
Secondary surfaces (Tools, Newsletter, Papershelf, Talks, Collaborate, Uses) are reached through:
- contextual links inside relevant pages,
- footer navigation,
- and related-content modules.

A secondary surface is promoted to top navigation only if the system design is updated first.

### Footer navigation
The footer may contain:
- primary destinations (Articles, Projects, Bookshelf, About, Contact),
- a curated set of secondary surfaces once launched,
- legal links (Privacy, Terms),
- and external or social links.

Rules:
- Footer links must point to canonical routes.
- Footer taxonomy links must resolve to real pages, not dead query-string filters.

### In-content navigation
- Article pages link to related articles by relevance.
- The projects index links each project to its live site or source repository, and to related articles.
- Topic and series navigation connects related reading in a deterministic order.

### Breadcrumbs
- Breadcrumbs apply to nested content routes such as `/articles/[slug]`, `/tags/[tag]` and `/series/[series]`.
- Breadcrumb structure must match the canonical route hierarchy.
- Breadcrumb markup must not describe a hierarchy that does not exist.

## Rules for changing routes
1. A new route must map to a surface in `page-responsibility.md`. If it does not, define ownership first.
2. Removing or renaming a route requires a redirect plan to preserve inbound links and crawl equity.
3. A route must not duplicate the primary responsibility of an existing route.
4. Any new top-level route must be checked against the fixed top-navigation rule before shipping.
5. Structural route changes should be reflected in `system-design.md` when they change the site model.

## Related docs
- `page-responsibility.md`
- `system-design.md`
- `../website-tenets.md`
- `../quality-and-growth/acceptance-checklists.md`
