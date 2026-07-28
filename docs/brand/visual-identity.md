# Visual Identity

> Built from an interview on 2026-07-26. Color is a Tailwind CSS red brand with blue links, an amber secondary and zinc neutrals. Type is Poppins, Fraunces and Fira Code. The logo is a temporary "GK" wordmark. Sections marked _(placeholder)_ wait on assets. This is the upstream source for the tokens in [design-foundations.md](../design-system/design-foundations.md).

## Logo and wordmark
No full logo yet. For now the mark is a simple **"GK" wordmark**, the initials of Ganessh Kumar.
- Set in the heading font (Fraunces), bold.
- Default color is brand red (red-700 on light backgrounds). Reverse to white on dark or red fills.
- Uses: navbar, favicon, social avatar, OG images.
- Keep clear space around it equal to the height of the "G". Minimum size is 24px tall in the navbar.
- This is a placeholder direction. A full logo can replace it later without changing the color or type.

## Color
The palette is a **typographic, gov.uk-inspired** system: near-black text on white, one strong brand color, blue links and a warm secondary. Neutrals carry the layout; color marks intent.

### Brand color: red
The brand color is **Tailwind CSS red**. It carries the wordmark, primary buttons and brand accents. It stays reserved, so it reads as intentional rather than as a warning.

| Name | Tailwind | Hex | Use |
|---|---|---|---|
| Brand | red-700 | `#b91c1c` | Wordmark, primary buttons, brand accent text |
| Brand hover | red-800 | `#991b1b` | Hover state for brand actions |
| Brand edge | red-900 | `#7f1d1d` | The bold bottom edge on primary buttons |

Accessibility: use **red-700** for brand text and buttons on white, since it meets WCAG AA. Avoid red-600 as text: it dips just under AA.

### Links: blue
Links use one **Tailwind CSS blue**. For now there is no separate hover or visited color: links are underlined, and the underline thickens on hover.

| Name | Tailwind | Hex | Use |
|---|---|---|---|
| Link | blue-700 | `#1d4ed8` | All inline and content links |
| Focus | blue-600 | `#2563eb` | The bold focus outline on any interactive element |

Hover and visited color states are deferred. When we add them, keep them in one blue family.

### Secondary: amber
A warm **Tailwind CSS amber** is the secondary accent. It is a fill color with dark text, never link or body text, because amber fails contrast as text.

| Name | Tailwind | Hex | Use |
|---|---|---|---|
| Secondary | amber-400 | `#fbbf24` | Secondary buttons and small highlights |
| Secondary hover | amber-500 | `#f59e0b` | Hover state for secondary buttons |
| Secondary edge | amber-700 | `#b45309` | The bold bottom edge on secondary buttons |

### Neutrals: zinc
Neutrals come from **Tailwind CSS zinc**, a near-neutral gray. Contrast runs deliberately high so the page never feels washed out.

| Name | Tailwind | Hex | Use |
|---|---|---|---|
| Paper | white | `#ffffff` | Page background |
| Surface | zinc-100 | `#f4f4f5` | Cards and raised panels |
| Surface strong | zinc-200 | `#e4e4e7` | Hover or active panel |
| Border | zinc-300 | `#d4d4d8` | Hairlines and dividers |
| Muted text | zinc-500 | `#71717a` | Meta, captions, secondary text |
| Body text | zinc-700 | `#3f3f46` | Body copy |
| Ink | zinc-900 | `#18181b` | Headings and strong text |

### Core palette (the four)
Every UI needs four working roles at minimum: one accent, one text color, one background and one muted support tone.

| Role | Name | Hex | What it does |
|---|---|---|---|
| Brand | red-700 | `#b91c1c` | Identity, primary actions, brand accent |
| Ink (text) | zinc-900 | `#18181b` | Headings and body text |
| Paper (background) | white | `#ffffff` | The page canvas |
| Muted (support) | zinc-500 | `#71717a` | Secondary text, captions, borders |

Links use blue-700 and the secondary accent is amber-400. These sit alongside the four as the interactive and highlight roles.

### Reconciliation note
The design tokens use this red, blue, amber and zinc system with the Fraunces, Poppins and Fira Code fonts. Dark mode lightens each hue for contrast (red-500, blue-400, amber-400, zinc neutrals). Live tokens are in [design-foundations.md](../design-system/design-foundations.md).

## Typography
Three open-source families, one per role.

| Role | Font | Notes |
|---|---|---|
| Headings and UI | Fraunces | High-contrast display serif with strong bold weights, gives headings character |
| Body and prose | Poppins | Geometric sans with even, modern letterforms |
| Code and monospace | Fira Code | Monospace with ligatures for code blocks and inline code |

- All three are on Google Fonts and are open-source.
- The "GK" wordmark uses Fraunces Bold.
- Fraunces pairs a display serif for headings with Poppins for body; the serif and sans contrast gives headings character.
- This supersedes the earlier placeholder pairing in design-foundations (Inter, Source Serif 4, JetBrains Mono). Update that doc to Fraunces, Poppins and Fira Code.

## Iconography
- Line icons, a single set (lucide, which ships with the component library).
- Red used sparingly for active or accent icons. Otherwise icons inherit the text color.
- Consistent stroke, no mixed icon families. Detail lives in [../design-system/design-foundations.md](../design-system/design-foundations.md).

## Imagery and illustration _(placeholder)_
No image system yet. Intended direction:
- clean, calm and uncluttered, matching the editorial feel,
- diagrams and screenshots over stock photography,
- red as the one accent in diagrams.

To define once assets exist.

## OG and social images _(placeholder)_
No template yet. Intended direction:
- a simple template with the post title in Fraunces, the "GK" wordmark and a red accent bar,
- consistent size and safe margins.

To define once the wordmark and template are built.

## Related
- Seeds the tokens in [../design-system/design-foundations.md](../design-system/design-foundations.md).
- Voice and personality: [voice-and-tone.md](voice-and-tone.md), [brand-strategy.md](brand-strategy.md).
