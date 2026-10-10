# Stack Decisions

This document captures the implementation choices for the rebuild. Design and UX rules live in the design-system folder. This doc is the engineering stack.

It is long-lived. If any of these decisions change, update this file.

## Implementation stack
- **Framework:** Next.js with the App Router.
- **UI library:** React.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS, with simple, durable utility patterns over custom one-off CSS.
- **Components:** shadcn/ui is the base. Build on top of it when a shared primitive needs more. For specific needs, a component may come from a third-party library that is itself built on shadcn/ui.
- **Markdown:** unified with remark and rehype plugins, with KaTeX for build-time LaTeX rendering.
- **State:** Zustand, when client state or browser-session persistence is genuinely needed.
- **Motion:** to be decided. Not chosen yet because no surface has needed it. Pick it when motion is first actually required (see Open decisions).

## Version policy
- Use the latest stable versions available at the time of implementation.
- Prefer stable releases over prereleases unless a prerelease is explicitly required.
- Avoid version churn unless it unlocks a clear capability or fixes a concrete problem.

## Component sourcing rules
- Prefer shared, reusable primitives over page-specific bespoke components.
- Reuse component families for reading, proof, curation and conversion blocks.
- Do not introduce a new component family unless the existing ones cannot absorb the requirement cleanly.
- shadcn/ui first. A third-party shadcn-based component is acceptable when it saves real work and keeps the same token and styling model.
- Component contracts live in `../design-system/component-specs.md`.

## State and data rules
- Keep local component state minimal.
- Add global or shared state only when multiple routes or modules genuinely need it.
- Use Zustand for shared client state and for small data persisted in the browser session.
- Favor server-first rendering and static content patterns where possible.
- Render article math at build time with `remark-math`, `rehype-katex` and KaTeX. Do not add a client-side MathJax runtime for article formulas.

## Styling and build rules
- Style with Tailwind and the semantic tokens in `../design-system/design-foundations.md`. Never hardcode raw hex or ad-hoc sizes.
- Keep styling stable and maintainable. Avoid heavy decorative systems that do not improve clarity.
- Treat responsive behavior as a first-class requirement.
- Keep ad or monetization styling visually separate from core reading content.

## Open decisions
- **Motion library.** Not chosen. Candidates: `tailwindcss-animate` for small transitions and micro-interactions, or Motion (Framer Motion) if richer animation is needed. Decide when the first real motion need appears, and keep it restrained per the motion tokens in `../design-system/design-foundations.md`.

## What future agents should assume
- The site is a Next.js, React and TypeScript build on stable, well-supported primitives.
- shadcn/ui is the default shared component source. Third-party shadcn-based components are allowed when they fit.
- Zustand is the choice for client state and browser-session persistence when needed.
- Article Markdown supports inline and display LaTeX through KaTeX.
- Styling stays durable and conservative rather than experimental, and always references design tokens.

## Related docs
- Design and UX: `../design-system/ux-patterns.md`, `../design-system/design-foundations.md`.
- Architecture and pages: `../content-and-information-architecture/system-design.md`.
- Monetization-safe layout: `../quality-and-growth/content-and-sidebar-strategy.md`.
- Quality bar: `../quality-and-growth/performance-indicators.md`.
- Project work: `../../projects/README.md`.
