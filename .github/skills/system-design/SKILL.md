---
name: system-design
user-invocable: false
description: "Use when defining, revising, or reviewing the site architecture in docs/content-and-information-architecture/system-design.md; when deciding page responsibilities, navigation structure, secondary surfaces, phased system growth, or cross-page structural rules for the website rebuild."
---

# System Design

## What this skill is for
Use this skill when a task affects the structural model of the site.

It covers:
- site architecture,
- top-level navigation,
- page responsibilities,
- secondary surfaces,
- phased system growth,
- and the rules that connect the site into one coherent platform.

## Default file targets
- `docs/content-and-information-architecture/system-design.md`
- `docs/README.md`

## What belongs here
Use this skill for questions such as:
- what pages exist,
- what each page is responsible for,
- which surfaces stay in top navigation,
- which surfaces grow later,
- how trust, proof, curation, and packaging connect,
- and how implementation phases map to the site model.

## What this skill should also catch
If typography, spacing, colors, or other visual rules are being introduced as system-level constraints that affect page structure or cross-page consistency, this skill should still notice them and coordinate with `ux-patterns`.

The split is:
- `system-design`: architecture and structural intent,
- `ux-patterns`: visual and interaction patterns.

## Decision rules
If the change answers "what the site is" or "how the site is organized," it belongs here.

If the change answers "how the site should look and feel," hand it to `ux-patterns` or update both skills together when the decision crosses both layers.

If the change is temporary sequencing, tracker state, or delivery bookkeeping, keep it in `projects/` and coordinate with `project-workspace-management`.

## How to work
1. Start with `docs/content-and-information-architecture/system-design.md` as the architectural source of truth.
2. Check whether the same decision also affects roadmap, priorities, or tracker files.
3. Preserve the distinction between fixed top navigation and secondary growth surfaces.
4. Keep page purpose explicit before adding implementation detail.
5. If a structural decision affects layout primitives, call out the dependency on `ux-patterns`.

## Output expectation
When using this skill, explain:
- what structural rule changed,
- which document is authoritative,
- what project files must stay aligned,
- and whether the change also needs a UX pattern update.