# Performance Budget

> Concrete performance targets for the rebuild. Reading pages come first, so the budget protects fast, stable loads on mobile.

## Core Web Vitals (field targets)
Measured on mobile at the 75th percentile:
- **LCP** under 2.5s.
- **INP** under 200ms.
- **CLS** under 0.1.

These are the launch floor. Reading pages should beat them comfortably.

## Lighthouse (lab targets)
- 95 or higher on Performance, Accessibility, Best Practices and SEO.
- Run on a representative article, the home page and the articles index.

## JavaScript budget
- First-load JS under about 130KB gzipped per route.
- Server-first. Ship the minimum client JS a page needs.
- Code-split by route. Do not pull a heavy client library into a reading page.
- Prefer a small dependency or none over a large one. Justify any dependency that adds meaningful weight.

## Fonts
- Self-host Fraunces, Poppins and Fira Code. Do not load them from a third-party CDN.
- Subset to the glyphs actually used.
- Preload the fonts needed for the first paint. Use `font-display: swap`.
- Keep the family and weight count small (see `../design-system/design-foundations.md`).

## Images
- Use `next/image` for all content images.
- Serve AVIF or WebP with responsive sizes.
- Set explicit width and height, or an aspect ratio, so images never shift layout.
- Lazy-load below-the-fold images. The LCP image is not lazy.

## CSS and markup
- Tailwind purged to the classes in use. No large unused stylesheet.
- Avoid render-blocking resources beyond the critical CSS and the preloaded fonts.

## Third-party scripts
- Keep third-party scripts to a minimum. Analytics (Plausible) is lightweight and loads without blocking.
- No heavy embeds or trackers on reading pages. Defer or lazy-load anything non-essential.
- Ad or sponsor scripts must not regress the Core Web Vitals targets (see `../quality-and-growth/content-and-sidebar-strategy.md`).

## Enforcement
- Treat these as a budget, not a hope. Check them before shipping.
- Measure with Lighthouse in the lab and with real-user field data.
- A change that pushes a route past budget does not ship until it is back under.

## Related
- KPIs and launch gate: `../quality-and-growth/performance-indicators.md`.
- Tokens (fonts, motion): `../design-system/design-foundations.md`.
- Stack: `stack-decisions.md`.
