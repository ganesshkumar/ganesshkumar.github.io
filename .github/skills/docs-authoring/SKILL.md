---
name: docs-authoring
user-invocable: false
description: "Use when writing, revising, or reviewing docs in docs/; when deciding whether content belongs in docs/ versus projects/ or skills/; when maintaining the docs graph, system design, UX, stack, content, or quality documents."
---

# Docs Authoring

## What this skill is for
Use this skill when a task is about the long-lived documentation system for the site.

It covers:
- creating or revising docs,
- keeping the docs graph consistent,
- deciding where content belongs,
- and preserving the difference between documentation, project work, and procedural skills.

## Default file targets
- `docs/README.md`
- `docs/content-and-information-architecture/system-design.md`
- `docs/design-system/ux-patterns.md`
- `docs/engineering/stack-decisions.md`
- `docs/quality-and-growth/content-and-sidebar-strategy.md`
- `docs/quality-and-growth/performance-indicators.md`

## Decision rule
If the content is a durable rule, standard, or design decision, keep it in `docs/`.

If the content is a project plan, tracker, or actionable work item, move it to `projects/`.

If the content describes how agents should repeatedly perform a workflow, consider a skill instead.

## How to work
1. Find the owning doc in the graph.
2. Update the smallest set of documents that actually define the rule.
3. Keep the language direct and stable.

## Output expectation
When using this skill, explain:
- what changed,
- which doc is authoritative,
- and whether anything should move to a skill or a project file instead.