# UX Patterns

> Foundations note: design tokens (color, typography, spacing, radius, elevation, motion and theme) live in `design-foundations.md`. This document governs how those tokens are composed into layouts, components and reading flow, not their raw values.

## Design intent
The site should feel:
- clear and high-contrast,
- typographic and editorial,
- lightweight and uncluttered,
- calm but confident.

This is not a startup landing page and not a generic portfolio. It should feel like a high-quality developer reading environment, with the clarity discipline of gov.uk: obvious links, bold focus and a hierarchy that does the work.

## Visual direction
### What to aim for
- Strong typography hierarchy: type and spacing do the work, not chrome.
- High contrast: near-black text on white, so the page never feels washed out.
- Underlined links in one blue, where the underline thickens on hover.
- Bold, accessible focus (a solid blue outline) on every interactive element.
- Tighter spacing to start: use the calm end of the scale and open it up only where reading needs it.
- Clear visual distinction between reading, proof and conversion modules.

### What to avoid
- Card clutter.
- Overuse of badges and pills.
- Large skill icon walls as a primary credibility device.
- Excessive section chrome and heavy shadows.
- Aggressive ad intrusions.
- Landing-page-style hype patterns.

### Buttons and links
- Buttons follow the gov.uk button pattern: **square corners** and a **2px bold bottom edge** (a solid strip under the button in a darker shade of its fill). On press the button nudges down 2px and the edge collapses; hover darkens the fill.
- Primary buttons are red (brand), secondary buttons are amber with dark text, and outline buttons are bordered with ink text and a grey bottom edge (a darker shade of their light fill, per gov.uk).
- Links are underlined blue. On hover the underline thickens rather than changing color. Hover and visited color states are deferred.
- Footer and card links opt out of the underline and use color and hover states. Nav links carry a red (brand) underline set below the text with a gap: it marks the current page (shown with red text) and appears on hover while the text darkens.

## Page layout patterns
### Pattern 1: Standard content page
Use for:
- About
- Contact
- legal pages

Layout:
- centered content column,
- optional supporting aside on desktop,
- no heavy promotional interruptions.

### Pattern 2: Archive page
Use for:
- Articles index
- future Papershelf
- future Bookshelf

Layout:
- strong heading and intro,
- filters or series links,
- scan-friendly list or cards,
- optional featured block.

### Pattern 3: Long-form article page
Use for:
- article detail pages

Layout:
- one shared content width for the article hero, metadata, body and footer,
- optional right sidebar on desktop only,
- clean header metadata,
- related content and CTA after article body.

### Pattern 4: Proof page
Use for:
- Projects
- Talks
- case studies

Layout:
- stacked case rows (media or icon left, editorial text right) or a card grid,
- evidence modules,
- explicit outcomes and links.

The projects index uses stacked case rows and is the terminal proof surface: there is no per-project detail route, so each row states the problem and outcome inline and links out to the live site or repository.

### Text tool inspection
Browser text tools belong to the proof/utility surface. Keep the working input and
output visible, with conservative defaults and explicit actions. Keep uncommon or
destructive rules in a labeled advanced disclosure. Always label emoji removal as
optional and leave it off by default.

Inspection markers are display-only buttons with readable names and code points.
They must work with a keyboard and must not enter raw text or clipboard output.
Explain that detected formatting can be valid. Use one shared detail panel rather
than a popup per character. Keep text-direction controls visible as inert markers
instead of allowing them to rearrange the inspection view.

Change previews show original text and cleaned text with semantic labels. Use
borders, underlining and the secondary highlight; do not rely on color alone.
Show an explicit deletion marker where output has no replacement. Navigate edits
by saved occurrence offsets, never by matching text. Report names, actions and
occurrence counts. A no-op result says no changes are needed with the selected
rules. Long reports and inspection text scroll within bounded areas on small screens.
Reset selection and copy feedback when the source or options change.

## Sidebar policy
Sidebars should not appear everywhere.

Use sidebars only where they genuinely improve reading or monetization without damaging the experience.

Recommended use:
- article detail pages on desktop,
- future resource-heavy long-form pages,
- future papershelf/book note pages if useful.

Avoid sidebars on:
- homepage,
- contact,
- about,
- projects index unless there is a compelling reason.

## Reading experience patterns
### Article header
Should include:
- title,
- short description,
- publish/update date,
- tags,
- estimated reading time,
- and optionally series or topic marker.

### In-article flow
Should support:
- clean code blocks,
- images that do not break rhythm,
- optional callouts,
- and enough whitespace between sections.

### Article footer block
Should include:
- suggested articles,
- one newsletter CTA,
- one related project or resource link.

## Content UX patterns
### Suggested articles
Base suggestions on:
- shared tags,
- shared categories,
- recency as tie-breaker.

Do not suggest only by date.

### Topic hubs
A topic hub should help a reader go deeper on a theme.

Each hub should include:
- short topic intro,
- article list,
- related projects,
- optional papers or books if relevant.

### Proof modules
Use proof modules sparingly and credibly.

Examples:
- projects built,
- years writing,
- newsletter readers,
- talks delivered,
- recurring readers,
- collaborations.

Only show numbers that are true and maintained.

## Component families
### Core components
- Navbar
- Footer
- Hero / positioning block
- Section header
- Article card
- Project card
- Reading CTA block
- Proof / trust signal strip
- Tag list
- Search or filter module
- Sidebar module

### Future expansion components
- Paper note card
- Book note card
- Talk card
- Course card
- Collaboration offering card
- Newsletter signup block

## Design system rule for future agents
Before introducing a new component, ask:
- does this belong to reading, proof, curation or conversion?
- is there already a component family that can absorb it?
- does it improve clarity or just add UI noise?
