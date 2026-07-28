# Component Specs

> Built from an interview on 2026-07-26. Components are built on shadcn/ui (see `../engineering/stack-decisions.md`). This doc holds the spec template and the component list. Detail each component's full spec at build time.

## Approach
- **shadcn/ui is the base for every component.** Compose and restyle shadcn primitives rather than building from scratch.
- Components reference **semantic tokens** from `design-foundations.md`, never raw hex or ad-hoc sizes.
- Reuse a component family before adding a new one. See the families in `ux-patterns.md`.
- Keep props minimal. Add a variant only when a real use needs it.

## Spec template
When a component is built, its spec should define:
- **Purpose:** the one job this component does, and which family it belongs to (reading, proof, curation, conversion).
- **shadcn base:** which shadcn/ui primitive it composes (Button, Card, Input).
- **Anatomy:** the parts (container, media, title, meta, actions).
- **Variants:** the allowed variants and when to use each.
- **Sizes:** the size options, in spacing and type tokens.
- **States:** default, hover, focus, active, disabled, loading, error, empty where relevant.
- **Tokens:** the color, spacing, radius and type tokens it uses.
- **Content rules:** label casing and microcopy (see `microcopy.md`), max lines, truncation.
- **Accessibility:** roles, labels, keyboard behavior, focus order, contrast.
- **Responsive:** how it reflows from mobile to desktop.
- **Do and don't:** one or two guardrails.

## Component list
Each is built on a shadcn/ui base and specced in full at build time.

### Core components
| Component | shadcn/ui base | Family |
|---|---|---|
| Button | Button | shared |
| Navbar | NavigationMenu + Button | shared |
| Footer | custom layout + Button | shared |
| Hero / positioning block | custom layout | conversion |
| Section header | custom layout | shared |
| Article card | Card | curation |
| Project card | Card | proof |
| Reading CTA block | Card + Button | conversion |
| Proof / trust signal strip | custom layout | proof |
| Tag list | Badge | curation |
| Search or filter module | Input + Command + Select | curation |
| Sidebar module | Card | reading |
| Newsletter signup block | Card + Input + Button | conversion |

### Future expansion components
| Component | shadcn/ui base | Family |
|---|---|---|
| Paper note card | Card | curation |
| Book note card | Card | curation |
| Talk card | Card | proof |
| Course card | Card | conversion |
| Collaboration offering card | Card | conversion |

## Rules for new components
Before adding one, answer the questions in `ux-patterns.md`:
- does this belong to reading, proof, curation or conversion?
- can an existing family absorb it?
- does it improve clarity or just add UI noise?

If it earns a place, compose it from a shadcn/ui primitive and spec it with the template above.

## Related
- Tokens: `design-foundations.md`.
- Families and layout: `ux-patterns.md`.
- UI text: `microcopy.md`.
- Stack and component sourcing: `../engineering/stack-decisions.md`.
