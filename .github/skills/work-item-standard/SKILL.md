---
name: work-item-standard
user-invocable: false
description: "Use when defining, revising, or reviewing the project item schema in docs/work-item-standard.md; when deciding front matter fields, item taxonomy, body expectations, or placement rules for epics, features, user stories, and tasks under projects/."
---

# Work Item Standard

## What this skill is for
Use this skill when a task affects the schema or authoring rules for project work items.

It covers:
- required front matter,
- recommended front matter,
- item taxonomy,
- body expectations,
- status language,
- and the rule for what belongs in a project item versus docs.

## Default file targets
- `docs/work-item-standard.md`
- a project's `items/` folder with `epics/`, `features/`, `user-stories/`, and `tasks/` subfolders

## What belongs here
Use this skill for questions such as:
- what front matter fields are required,
- when an item should be an epic, feature, user story, or task,
- how item status should be expressed,
- and what the body of a work item should explain.

## Decision rules
If the change affects how project items are encoded or categorized, it belongs here.

If the change affects broader project workflow, coordinate with `project-workspace-management`.

If the content is guidance that should outlive project items, keep it in `docs/` rather than inside an item file.

## How to work
1. Start with `docs/work-item-standard.md` as the schema source of truth.
2. Keep the front matter minimal but sufficient.
3. Keep type definitions distinct so item folders stay meaningful.
4. Make sure item bodies explain what, why, how, and completion conditions.
5. Prefer one consistent schema over project-specific variations.

## Output expectation
When using this skill, explain:
- which schema or taxonomy rule changed,
- which item types are affected,
- whether existing item files need migration,
- and what future agents should assume when authoring work items.