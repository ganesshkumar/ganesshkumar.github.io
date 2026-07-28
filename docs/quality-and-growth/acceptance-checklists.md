# Acceptance Checklists

> Merged on 2026-07-26 from the core page acceptance gate, the Next.js implementation checklist and the fillable run template. Part 1 is the ship gate. Part 2 is the detailed implementation checklist. Part 3 is the per-page run form.

## Part 1: Core page acceptance gate
The acceptance gate for every core page. A core page may ship only when it satisfies the global gates and its page-specific items. This turns the responsibility matrix into a concrete "ready to ship" definition.

### Global acceptance gates
Every core page must pass all of these.

#### Structure and semantics
- [ ] Exactly one primary `h1` that matches the page purpose.
- [ ] Logical heading order with no skipped levels.
- [ ] Landmark structure (header, main, footer) is present.
- [ ] The page maps to a route in `../content-and-information-architecture/route-map.md`.

#### Metadata and discoverability
- [ ] Unique, accurate title and meta description.
- [ ] Canonical URL is set and uses the correct trailing-slash form.
- [ ] Open Graph and social metadata are present.
- [ ] The route is included in sitemap coverage.
- [ ] Structured data, if used, matches real page content.

#### Accessibility
- [ ] Color contrast meets accessibility thresholds.
- [ ] All interactive elements are keyboard reachable and focus-visible.
- [ ] Images have meaningful alt text or are marked decorative.
- [ ] No accessibility errors in an automated pass.

#### Performance and stability
- [ ] No layout shift from late-loading modules in the primary reading area.
- [ ] Images use explicit dimensions or reserved space.
- [ ] The page renders correctly as a static export.

#### Trust and monetization safety
- [ ] Monetization modules are subordinate to content.
- [ ] No ad or sponsor block sits directly under the primary heading.
- [ ] No sponsor module is styled to mimic core editorial content.
- [ ] The page respects the relevant tenets in `../website-tenets.md`.

### Page-specific acceptance

#### Home (`/`)
- [ ] Clear positioning and current focus are visible above the fold.
- [ ] Featured articles and featured projects are present.
- [ ] At least one trust signal is present.
- [ ] Exactly one primary conversion path is offered.
- [ ] The page does not behave like a dense portal or heavy ad surface.

#### Articles index (`/articles`)
- [ ] The archive is scannable and not chronology-only.
- [ ] Topic or tag entry points are available or clearly stubbed for the planned tag routes.
- [ ] Internal links point to canonical article routes.
- [ ] The intro communicates what the reader will find.

#### Article detail (`/articles/[slug]`)
- [ ] Clean metadata header with title, date and reading context.
- [ ] Readable long-form rhythm for text, code and images.
- [ ] Related content is present and relevance-based.
- [ ] Exactly one newsletter call-to-action.
- [ ] Optional desktop sidebar follows the sidebar policy.
- [ ] In-article monetization follows ad-safe rules.

#### Projects index (`/projects`)
- [ ] Project rows communicate the problem solved and the outcome, not just links.
- [ ] Each row exposes a proof signal or result and its stack.
- [ ] Rows use shared primitives, not one-off layouts.
- [ ] Titles and actions link out to the live site or source repository.

#### Project detail
- [ ] There is no `/projects/[slug]` route: the index is the terminal proof surface.
- [ ] Case detail (problem, outcome, stack) is carried inline on the index row.
- [ ] Deeper decisions and lessons live in cross-linked articles.
- [ ] If a project ever needs a full write-up, add the route back to the route map first.

#### About (`/about`)
- [ ] States who you are, what you cover and current focus.
- [ ] Gives a clear reason to trust the perspective.
- [ ] Reads as editorial first; any skills grid stays a contained, themed secondary section.
- [ ] Links to supporting proof in articles or projects.

#### Contact (`/contact`)
- [ ] Clear contact intent paths (general, collaborate, speaking, feedback).
- [ ] Low-friction submission with minimal required fields.
- [ ] Sets a response or next-step expectation.
- [ ] Metadata and accessibility gates pass.

### Sign-off rule
A core page is accepted only when:
1. all global gates pass,
2. all page-specific items for that page pass,
3. and any failed item is either fixed or explicitly deferred with a linked follow-up work item.

If an item is deferred, the deferral must be recorded on the relevant task, not silently skipped.

## Part 2: Next.js implementation checklist
Use this before shipping any route in the App Router. It is intentionally detailed so the same process works for current surfaces and future content types such as blog posts, projects, books and papers.

### 0) Route and ownership
- [ ] The route is listed in `../content-and-information-architecture/route-map.md`.
- [ ] The route maps to one owner surface in `../content-and-information-architecture/page-responsibility.md`.
- [ ] The page purpose is explicit and not duplicated by another page.
- [ ] If this is a new route, navigation and redirect impact are documented.

### 1) Rendering strategy (SSR vs SSG vs ISR)
Decision:
- [ ] Content changes rarely and can be prebuilt: choose static generation.
- [ ] Content changes on schedule (hourly or daily): choose ISR with `revalidate`.
- [ ] Content is user-specific, permission-based or request-context sensitive: choose dynamic rendering.
- [ ] If uncertain, default to static plus targeted revalidation.

Next.js knobs:
- [ ] `generateStaticParams` is used for known dynamic slugs when prebuilding is feasible.
- [ ] Route-level `revalidate` value is set intentionally (for ISR pages).
- [ ] Route-level `dynamic` behavior is explicit when required (`auto`, `force-static`, `force-dynamic`).
- [ ] Any use of `cookies()`, `headers()` or `searchParams` is intentional and understood for cache implications.
- [ ] Data fetching cache mode is explicit where needed (`force-cache`, `no-store`, `revalidate`).
- [ ] On-demand invalidation exists (`revalidatePath` or `revalidateTag`) for content updates.

Revalidation defaults:
- [ ] Homepage and article index: revalidate every 1 to 6 hours unless build-time static is enough.
- [ ] Article detail pages: static with on-demand revalidation on publish or edit.
- [ ] Projects pages: static or ISR based on update frequency.
- [ ] Legal pages: fully static unless a policy update requires faster refresh.

### 2) Caching
- [ ] CDN and browser caching policy is defined for page HTML and assets.
- [ ] API and route-handler cache headers are explicit where used.
- [ ] No confidential data is cached publicly.
- [ ] Stale content risk is acceptable for the chosen TTL.
- [ ] Cache-busting and invalidation flow is documented for editors.
- [ ] Image optimization strategy is set (dimensions, quality, responsive sizes, priority usage).

### 3) Content model
Shared fields:
- [ ] `type` (blog, project, book, paper).
- [ ] `slug` and canonical path.
- [ ] `title` and `description`.
- [ ] `publishedAt` and optional `updatedAt`.
- [ ] `tags` and optional category or series.
- [ ] `coverImage` with alt text.
- [ ] `author` and attribution data.

Type-specific:
- [ ] Blog includes reading-time and topic context.
- [ ] Project includes outcomes, constraints, evidence and related links.
- [ ] Book includes creator, publisher, publication metadata and rationale for recommendation.
- [ ] Paper includes authors, publication venue or date and learning context.
- [ ] Unknown future type has schema and validation rules before launch.

See `../content-and-information-architecture/content-model.md` for the site's content model.

### 4) Metadata (Next.js metadata API)
- [ ] `title` is unique and aligned with page purpose.
- [ ] `description` is specific and non-duplicative.
- [ ] Canonical URL is present and follows trailing-slash policy.
- [ ] `metadataBase` is correct and consistent with the canonical host.
- [ ] Open Graph values are set (type, title, description, url, images).
- [ ] Twitter card values are set.
- [ ] Robots directives are explicit for indexable vs non-indexable pages.
- [ ] Alternates are configured if locale variants exist.
- [ ] Pagination metadata (`prev`, `next`) is present where applicable.
- [ ] Metadata generation is static or dynamic by design, not by accident.

### 5) JSON-LD
Schema selection:
- [ ] Home: `WebSite` and identity schema (`Person` or `Organization`).
- [ ] Listing pages: `ItemList` plus optional page schema.
- [ ] Blog detail: `BlogPosting` or `Article`.
- [ ] Project detail: `CreativeWork` or `SoftwareApplication` when applicable.
- [ ] Book detail: `Book`.
- [ ] Paper detail: `ScholarlyArticle`.
- [ ] Breadcrumbs: `BreadcrumbList` for nested routes.

Quality:
- [ ] All entities have stable `@id` values.
- [ ] Schema fields reflect visible page content.
- [ ] Dates and canonical URLs match metadata.
- [ ] Author and publisher identity is consistent across pages.
- [ ] No duplicate or contradictory schema blocks on one page.
- [ ] Rich-results validation passes for representative URLs.

### 6) Accessibility
- [ ] Exactly one meaningful `h1`.
- [ ] Semantic landmarks are present (`header`, `main`, `footer`, `nav`).
- [ ] Keyboard navigation works end-to-end.
- [ ] Visible focus indicators exist for interactive controls.
- [ ] Color contrast is verified.
- [ ] Forms have labels, hints and error messaging.
- [ ] Images use meaningful alt text or are decorative.
- [ ] Motion and autoplay respect reduced-motion preferences.
- [ ] Screen-reader flow is validated on key templates.
- [ ] Automated accessibility checks pass.

Conformance target is WCAG 2.2 AA. See `../engineering/accessibility-standard.md`.

### 7) Analytics and events
Baseline:
- [ ] Page view is tracked once per navigation.
- [ ] Referrer or source context is captured where allowed.
- [ ] Content type and slug are included as event properties.
- [ ] Logged metrics map directly to KPI definitions.

Taxonomy:
- [ ] Newsletter CTA impressions and clicks are tracked.
- [ ] Related-content impressions and clicks are tracked.
- [ ] Contact and collaboration funnel events are tracked.
- [ ] External link and outbound conversion events are tracked.
- [ ] Ad impression and click metrics are captured per policy.
- [ ] Event names and property keys are documented and consistent.

See `analytics-instrumentation.md`.

### 8) Security and privacy
- [ ] Input validation and output escaping are in place for user input surfaces.
- [ ] Server actions or route handlers enforce authz and authn where relevant.
- [ ] Sensitive data is never exposed to client-side logs.
- [ ] Security headers strategy is defined (CSP, frame, content-type, referrer policy).
- [ ] Third-party scripts are minimized and reviewed.
- [ ] Dependency and package risk is reviewed before release.

See `../engineering/security-and-privacy.md`.

### 9) Cookies, storage and consent
Cookies:
- [ ] Cookie usage is documented by purpose (essential, analytics, ads, preferences).
- [ ] Non-essential cookies are gated by consent where required.
- [ ] Cookie expiration and scope are defined intentionally.
- [ ] Privacy and terms pages accurately disclose cookie behavior.

Local and session storage:
- [ ] Local and session storage use is documented with key names and payload purpose.
- [ ] No secrets or sensitive personal data are stored client-side.
- [ ] Data retention and cleanup behavior is defined.
- [ ] Feature behavior degrades safely when storage is unavailable.

### 10) Canonical URL and linking
- [ ] One route resolves to one canonical URL.
- [ ] Canonical host is consistent across metadata, sitemap and robots.
- [ ] Trailing slash policy is consistently applied.
- [ ] Internal links use canonical paths.
- [ ] Query params used for filtering do not replace crawlable canonical routes.
- [ ] Redirects exist for renamed or removed slugs.

### 11) SEO
- [ ] Route is present in sitemap where indexable.
- [ ] Robots directives align with indexing intent.
- [ ] Page is included in or excluded from the `llms.txt` policy intentionally.
- [ ] Heading hierarchy supports scanability and intent.
- [ ] Structured data and metadata are coherent.
- [ ] Duplicate title or description conflicts are avoided across similar pages.
- [ ] Pagination and archive pages avoid thin or near-duplicate content patterns.

### 12) AEO (AI answer optimization)
- [ ] The page answers the primary question early and clearly.
- [ ] Definitions, steps and takeaways are explicit and skimmable.
- [ ] Claims are backed by verifiable context, examples or references.
- [ ] Entity naming is consistent across title, headings and schema.
- [ ] FAQ-style subheadings are used when they improve clarity.
- [ ] Machine-readable content (metadata, JSON-LD, `llms.txt`) is aligned.
- [ ] Content avoids ambiguous pronouns and unclear references.
- [ ] Update timestamps are accurate to preserve trust.

### 13) Performance and stability
- [ ] Core Web Vitals risks are reviewed (LCP, INP, CLS).
- [ ] Images, embeds and ads reserve layout space.
- [ ] Large scripts are deferred or lazy loaded.
- [ ] Third-party widgets are performance-budgeted.
- [ ] Long lists use pagination or progressive loading.
- [ ] Error and empty states are designed and tested.

Targets live in `../engineering/performance-budget.md`.

### 14) Release and monitoring
- [ ] Pre-release validation includes metadata, schema, accessibility and performance checks.
- [ ] Monitoring includes page-level KPIs and error rates.
- [ ] Alert thresholds exist for major regressions.
- [ ] Rollback plan is documented for high-impact failures.
- [ ] Post-release review date is scheduled.

### 15) Definition of done (page level)
- [ ] The page passes the acceptance gate in Part 1.
- [ ] The page passes all relevant sections in this checklist.
- [ ] Any deferred items are documented with linked follow-up work items.

## Part 3: Per-page run template
Use one copy per page review. Record gaps against the sections in Part 2.

Run metadata:
- Route:
- Surface owner:
- Reviewer:
- Date:
- Environment:
- Content type: blog | project | book | paper | other
- Release target:

Summary status:
- Overall readiness: ready | needs-fixes | blocked
- Missing item count:
- High-risk gaps:

Per-section result (mark pass, or list what is missing, following Part 2):
- 0) Route and ownership:
- 1) Rendering strategy:
- 2) Caching:
- 3) Content model:
- 4) Metadata:
- 5) JSON-LD:
- 6) Accessibility:
- 7) Analytics and events:
- 8) Security and privacy:
- 9) Cookies and storage:
- 10) Canonical and linking:
- 11) SEO:
- 12) AEO:
- 13) Performance and stability:

Final decision:
- [ ] All blocking gaps resolved.
- [ ] Remaining gaps moved to tracked tasks.
- [ ] Page accepted against the Part 1 acceptance gate.

Follow-up tasks:
1.
2.
3.

## Related docs
- Page ownership: `../content-and-information-architecture/page-responsibility.md`.
- Routes: `../content-and-information-architecture/route-map.md`.
- Content model: `../content-and-information-architecture/content-model.md`.
- SEO and metadata: `../content-and-information-architecture/seo-metadata.md`.
- Quality bar: `performance-indicators.md`.
- Tenets: `../website-tenets.md`.
