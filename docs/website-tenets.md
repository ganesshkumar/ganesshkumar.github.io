# Website Tenets

## Purpose
This document defines the non-negotiable rules of the website.

Use it to answer:
- what this website fundamentally is,
- what it must protect as it evolves,
- and which rules future implementation work should not quietly erode.

## Core tenets

### 1. Developer-first reading environment
The site must feel like a high-quality developer reading environment before it feels like a monetization surface.

Reading quality, comprehension, and trust come first.

### 2. Simple top-level structure
The fixed top navigation remains simple:
- Articles
- Projects
- About
- Contact

Depth should grow through secondary surfaces, not by bloating the top navigation.

### 3. Proof over self-description
The site should earn credibility through:
- useful articles,
- shipped work,
- explicit project outcomes,
- and well-structured case studies.

Claims without proof are weak signals.

### 4. Trust before monetization
Monetization is allowed, but it must remain subordinate to trust.

Ads, affiliates, and sponsor surfaces must never degrade reading quality or mimic core content too closely.

### 5. Accessibility and discoverability are first-class requirements
Accessibility, metadata quality, and machine-readable site surfaces are not polish work.

They are part of the product itself.

This includes:
- semantic page structure,
- strong metadata,
- structured data,
- sitemap coverage,
- robots rules,
- and `llms.txt` support when the site is ready for it.

### 6. Calm, editorial design language
The design should stay:
- modern,
- elegant,
- lightweight,
- editorial,
- and quietly confident.

Avoid startup-loud patterns, decorative excess, clutter, and hype-heavy modules.

### 7. Systemized design primitives
Typography, spacing, accent color restraint, and reusable page primitives should be treated as system rules, not page-by-page improvisation.

Navbar, footer, cards, CTA blocks, sidebars, and trust modules should behave like reusable parts of one product.

### 8. Structured growth by trust loop
The site should grow through the trust loop:
- teach,
- prove,
- curate,
- package.

Secondary surfaces should be added only when they clearly strengthen one of those roles.

## What future agents should assume
- This is not a generic portfolio.
- This is not a startup landing page.
- This is a developer knowledge platform with a personal brand at the center.
- Reading quality, proof, trust, accessibility, and structured discoverability must not be traded away for short-term growth tricks.

## Operationalization rule
Use `content-and-information-architecture/page-responsibility.md` to translate these tenets into page-level implementation decisions.

If a page change conflicts with the matrix, update the matrix (or reject the change) before implementation.