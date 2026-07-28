# Agent Instructions

This repository uses two planning hubs:
- `docs/README.md` for long-lived website rules, design patterns, and evaluation criteria.
- `projects/README.md` for active workstreams, execution trackers, and time-bounded plans.

## Read order
1. `docs/README.md`
2. `projects/README.md`

## Skills layer
- Repo skills live in `.github/skills/`.
- Use skills for procedural workflows.
- Use `docs/` for long-lived rules.
- Use `projects/` for active work.

## Working rule
- If a change affects long-lived site behavior, UX, content structure, monetization rules, or quality criteria, update `docs/` first or alongside the implementation.
- If a change is temporary, initiative-specific, or delivery-focused, keep it under `projects/`.
- If a change is procedural and reusable across turns, consider encoding it as a skill in `.github/skills/` instead of burying it in prose.

## Current focus
There is no active project workspace under `projects/` right now. When one starts, add it beside `projects/README.md` with its own README-led structure.