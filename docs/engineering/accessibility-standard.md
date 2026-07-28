# Accessibility Standard

> The site targets WCAG 2.2 AA. Accessibility is a launch requirement, not a later pass. Token-level rules (contrast, focus ring, target size) live in `../design-system/design-foundations.md`. This doc sets the conformance bar, the always-on rules and how they are verified.

## Target: WCAG 2.2 AA
- **AA** is the level almost every site and accessibility law expects. It covers readable contrast, keyboard access, clear labels and predictable behavior.
- **2.2** is the current version. It adds criteria like visible focus appearance and a minimum target size.
- **A** alone is too weak, and **AAA** across a whole site is impractical (for example 7:1 contrast everywhere). Aim for AAA only where it is easy, such as body-text contrast, which the tokens already target.

## Always honor
- **Full keyboard operability.** Every interaction works with the keyboard alone, in a logical tab order. No keyboard traps.
- **Visible focus on everything.** Every focusable element shows the focus ring from `../design-system/design-foundations.md`. Never remove the outline.
- **Skip-to-content link.** A skip link is the first focusable element on every page.
- **Honor `prefers-reduced-motion`.** Reduce or remove non-essential motion when the user asks for it.

## Color and contrast
- Body text meets at least 4.5:1. Large text and UI meet at least 3:1.
- Color is never the only signal. Pair it with text, an icon or an underline.
- Do not convey state such as error or success with color alone.

## Structure and semantics
- Use semantic HTML first: headings, lists, `button`, `a`, `nav`, `main`, `article`.
- One `h1` per page. Headings nest in order without skipping levels.
- Landmark regions (`header`, `nav`, `main`, `footer`) on every page.
- Link text makes sense out of context. No "click here".

## Interactive elements
- Prefer native elements over ARIA. Reach for ARIA only when no native element fits, and follow the correct pattern.
- Every control has an accessible name, a visible label or an `aria-label`.
- Minimum target size 44 by 44 CSS pixels on touch (WCAG 2.2).
- State changes such as open, selected or busy are announced through the right attributes.

## Forms
- Every field has a real, associated label.
- Errors are described in text, linked to the field, and moved to focus or announced.
- Do not block paste. Do not rely on placeholder text as the only label.

## Media
- Every meaningful image has alt text. Decorative images have empty alt.
- Video has captions. Do not autoplay audio.

## Motion
- Respect `prefers-reduced-motion` for all non-essential animation.
- No content flashes more than three times per second.

## Testing
- Automated: run axe and Lighthouse in the build. Accessibility errors block the ship.
- Manual: tab through the page with the keyboard, and check a screen reader (VoiceOver or NVDA) on the core templates (home, article, articles index, contact).
- Automated tools catch only part of it. The manual keyboard and screen-reader pass is required.

## Related
- Tokens (contrast, focus, target size): `../design-system/design-foundations.md`.
- Content accessibility (headings, alt, link text): `../design-system/content-design.md`.
- Quality gate: `../quality-and-growth/performance-indicators.md`.
