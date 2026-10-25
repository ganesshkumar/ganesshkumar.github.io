# Page Responsibility

> Merged on 2026-07-26 from the responsibility matrix and the review checklist. The matrix defines page ownership. The checklist is the fast review companion.

## Purpose
This document converts website tenets and system design guidance into a page-level responsibility contract.

Use it to answer:
- which page owns which responsibility,
- what each page must include,
- what each page must avoid,
- and which tenets and system constraints each page must satisfy.

This is a long-lived rules document, not a sprint artifact.

## How to use this matrix
1. When designing or modifying a page, start from the corresponding row.
2. If a proposed change conflicts with a row, update this doc first or reject the change.
3. If a responsibility cannot be mapped to any row, do not ship until ownership is clear.

## Responsibility matrix

| Surface | Primary job | Must include | Must avoid | Tenets enforced | System constraints |
| --- | --- | --- | --- | --- | --- |
| Home | Orient first-time visitors and route repeat visitors | concise positioning, current focus, featured articles, featured projects, trust signals, one clear CTA path | portal sprawl, ad-heavy hero area, unclear positioning | 1, 2, 3, 4, 6 | stable top-nav anchors; readable section rhythm; metadata consistency |
| Articles index | Main discoverability engine | archive structure, scanning rhythm, topic/tag paths, strong internal links | chronology-only browsing, noisy promotion blocks | 1, 3, 5, 6 | predictable listing model; crawlable links; structured metadata |
| Article detail | Deep reading and retention | clean metadata header, readable long-form rhythm, related content, one newsletter CTA, optional desktop sidebar | disruptive ad interruptions, affiliate-like editorial cards, repeated CTA spam | 1, 4, 5, 6, 7 | semantic article structure; accessibility; ad-safe layout rules |
| Projects index | Proof of execution quality, with case detail inline | project case rows that state the problem, outcome and stack, explicit proof signals, links out to live site or repository | generic link dump, claim-only cards without evidence | 3, 6, 7 | reusable row/card primitives; clear problem and outcome fields; metadata alignment |
| Project detail (folded into index) | Explain what was shipped and why it matters | problem, outcome and stack shown inline on the projects index; deeper decisions and lessons live in cross-linked articles | a separate per-project route while the index carries the proof; shallow marketing copy | 1, 3, 6 | no `/projects/[slug]` route today; case rows on the index; cross-link to relevant articles |
| Tools index | Discover usable utilities | descriptive tool names, short purpose, direct tool links | empty placeholders, marketing-only cards | 2, 3, 5, 6 | secondary surface; no new top-nav item; canonical metadata |
| Tool detail | Perform one task in the browser | labeled input and output, explicit actions, result feedback, privacy scope, limitations and origin | unsupported watermark-removal claims, sending pasted text to analytics or servers, unrelated promotions | 3, 4, 5, 6, 7 | static export; client-side processing; sitemap coverage; keyboard access |
| About | Trust and identity framing | who you are, what you cover, current focus, trust rationale, optional skills shown as a themed tag/word grid | generic resume page patterns; skills grids that dominate the page or use non-editorial styling | 1, 3, 6 | editorial tone; proof links to articles and projects; skills grid uses design-system tokens and stays a secondary section |
| Contact | Low-friction conversation entry | clear intent paths (general, collaborate, speaking, feedback), concise fields, response expectations | vague form intent, heavy friction, unclear next step | 2, 6, 8 | clear action states; metadata quality; accessibility |
| Newsletter surface | Ongoing relationship channel | value proposition, cadence expectation, archive or sample links, clean subscribe path | aggressive pop-up style pressure, unclear content promise | 1, 4, 8 | one primary conversion action; minimal distraction |
| Tag / topic pages | Thematic depth navigation | topic intro, filtered content list, clear progression to adjacent topics | orphan pages without context, thin taxonomy pages | 1, 5, 8 | crawlable taxonomy; canonical links; coherent naming |
| Series pages | Structured multi-part learning | ordered sequence, progress context, links to entry points | unordered collections, missing sequence context | 1, 5, 8 | deterministic ordering; machine-readable breadcrumbs |
| Papershelf / Bookshelf | Curated learning references | page-level curation criteria, title and author; optional item notes and linkouts that support learning goals | unexplained list dumps, affiliate links without disclosure | 1, 3, 8 | consistent scan-friendly list structure; trust-first disclosure |
| Talks | Authority and teaching proof | topic summary, event/publish context, related learning links | vanity listing without learning value | 3, 6, 8 | clear proof metadata; cross-linking to articles/projects |
| Collaborate | Business-ready collaboration pathway | scope types, fit criteria, contact path, expected process | ambiguous offers, hidden intent, overpromising | 3, 4, 8 | transparent qualification flow; trust-preserving tone |

> About page note (updated 2026-07-27): The About page may present skills as a tag/word grid. This is an acknowledged, intentional exception to the earlier "no skill-tag wall" guidance. The grid must use the design-system tokens (square corners, zinc surfaces, editorial type), must stay a secondary section, and must not become the page's primary content. Identity, current focus and proof links remain the page's primary job.

## Cross-cutting obligations

### Accessibility and discoverability obligations
Every surface must maintain:
- semantic structure,
- clear heading hierarchy,
- metadata quality,
- valid sitemap coverage,
- robots compatibility,
- and machine-readable consistency, including `llms.txt` once enabled.

### Monetization safety obligations
Monetization can appear only where it does not reduce comprehension, trust or editorial clarity.

Non-negotiables:
- no ad overload above the fold,
- no ad blocks directly below critical headings,
- no sponsor modules disguised as editorial recommendations.

## Ownership rule
If two surfaces appear to own the same responsibility, the responsibility must be split explicitly before implementation proceeds.

## Review checklist
The fast review companion. Use it during implementation reviews to confirm a page still matches this contract without rereading the full matrix.

Use it:
- before shipping a page change,
- during code review,
- when deciding whether a surface needs scope changes,
- and when a page is shared across multiple responsibilities.

### Page intent
- [ ] The page has one primary job.
- [ ] The page purpose matches the matrix entry.
- [ ] The page is not trying to do two unrelated jobs at once.

### Content and structure
- [ ] The page includes everything listed under must include.
- [ ] The page avoids everything listed under must avoid.
- [ ] The content hierarchy is clear and predictable.
- [ ] The page does not introduce unnecessary surface clutter.

### Tenet alignment
- [ ] The page supports developer-first reading quality.
- [ ] The page preserves proof over self-description.
- [ ] The page keeps trust above monetization.
- [ ] The page respects accessibility and discoverability requirements.
- [ ] The page uses calm, editorial design language.
- [ ] The page uses reusable primitives instead of one-off patterns.

### System alignment
- [ ] Heading structure is semantic.
- [ ] Metadata is present and correct.
- [ ] Structured data or machine-readable rules are not contradictory.
- [ ] Sitemap and robots expectations are preserved.
- [ ] Any sidebar or monetization module follows the relevant policy.

### Conflict check
- [ ] No other surface owns this responsibility more clearly.
- [ ] If responsibility overlaps, the matrix has been updated first.
- [ ] If the page changed scope, the matrix and system docs were updated.

## Related docs
- `../website-tenets.md`
- `system-design.md`
- `../design-system/ux-patterns.md`
- `../quality-and-growth/content-and-sidebar-strategy.md`
- `../quality-and-growth/performance-indicators.md`
