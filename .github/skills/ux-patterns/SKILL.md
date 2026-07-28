---
name: ux-patterns
user-invocable: false
description: "Use when defining, revising, or reviewing the site’s UX patterns in docs/design-system/ux-patterns.md; when deciding typography, whitespace, spacing, colors, editorial rhythm, page layout patterns, component families, sidebars, reading flow, or design-system behavior for the website rebuild."
---

# UX Patterns

## What this skill is for
Use this skill when a task affects how the site should look, read, and behave for users.

It covers:
- typography,
- whitespace and spacing,
- colors and accent discipline,
- editorial rhythm,
- page layout patterns,
- component families,
- sidebars,
- reading flow,
- and design-system behavior.

## Default file targets
- `docs/design-system/design-foundations.md`
- `docs/design-system/ux-patterns.md`
- `docs/quality-and-growth/content-and-sidebar-strategy.md`
- `docs/README.md`

## What belongs here
Use this skill for questions such as:
- what fonts or typographic hierarchy should be used,
- how much whitespace and spacing the pages need,
- how colors and accents should behave,
- what layout pattern a page should use,
- which component family should absorb a new UI need,
- and how reading, proof, curation, and conversion modules should feel in practice.

## Naming note
This skill is intentionally named `ux-patterns` even though the source doc is `docs/design-system/ux-patterns.md`.

The shorter skill name is the workflow entry point.
The longer doc name remains the content source of truth until or unless the repository renames the file itself.

## Decision rules
If the change answers "how should this page feel, look, or read," it belongs here.

If the change answers "what pages exist" or "how the site is structurally organized," coordinate with `system-design`.

If a new component is being introduced, first check whether an existing component family can absorb it.

## How to work
1. Use `docs/design-system/design-foundations.md` for token and theme values (color, type, spacing, radius, motion), and `docs/design-system/ux-patterns.md` for how those tokens are composed into layouts and components.
2. Preserve the design intent: modern, elegant, lightweight, editorial, and quietly confident.
3. Prefer calm spacing, readable hierarchy, and selective accents over visual noise.
4. Keep sidebars, badges, pills, and ad surfaces constrained by purpose.
5. When a visual rule changes multiple templates, call out the cross-page impact clearly.

## Output expectation
When using this skill, explain:
- which UX rule changed,
- which page pattern or component family it affects,
- whether the change also touches content/sidebar policy,
- and whether a system-design update is required.