---
name: project-workspace-management
user-invocable: false
description: "Use when managing project workspaces in projects/; when organizing priorities, roadmaps, execution trackers, reference notes, epics, features, user stories, tasks, or the front matter standard for project items."
---

# Project Workspace Management

## What this skill is for
Use this skill when a task is about the active project graph for the repository.

It covers:
- project workspace structure,
- project-level planning documents,
- reference analysis,
- execution tracking,
- and the work-item taxonomy and front matter.

## Default file targets
- `projects/README.md`
- each project's `README.md`, `priorities.md`, roadmap, and execution tracker
- each project's `reference/` notes
- each project's `items/` folder with `epics/`, `features/`, `user-stories/`, and `tasks/`

## Operating model
Treat the project workspace like a graph:
- the top README explains the project,
- priorities define order,
- the roadmap explains intent,
- the execution tracker records sequence,
- reference notes explain why,
- and item files capture the actionable pieces.

## Work-item rule
Use the front matter standard in `docs/work-item-standard.md` for every project item.

If the unit of work is large, make it an epic.
If it is a capability, make it a feature.
If it is a user-facing behavior, make it a user story.
If it is a small implementation step, make it a task.

## Decision rule
If something is long-lived guidance, it belongs in `docs/`.
If something is temporary or delivery-focused, it belongs in `projects/`.
If something is a reusable workflow for agents, it may belong in a skill.

## How to work
1. Identify the controlling file.
2. Avoid duplicating sequencing across roadmap, priorities, and tracker unless the distinction is explicit.
3. Keep reference analysis separate from active work items.
4. Prefer one README-led hierarchy per workspace.

## Output expectation
When using this skill, explain:
- which project file is the source of truth,
- which items need front matter,
- and whether anything should move back to `docs/`.