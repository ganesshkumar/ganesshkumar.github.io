---
name: stack-and-design-decisions
user-invocable: false
description: "Use when defining, revising, or reviewing implementation choices in docs/engineering/stack-decisions.md; when deciding framework, language, state management, styling direction, component sourcing, version policy, or stable UI implementation rules for the rebuild."
---

# Stack And Design Decisions

## What this skill is for
Use this skill when a task affects the technical implementation policy of the site.

It covers:
- framework and runtime choices,
- language and type policy,
- styling direction,
- component sourcing,
- state management defaults,
- version policy,
- and stable implementation constraints for UI work.

## Default file targets
- `docs/engineering/stack-decisions.md`
- `docs/content-and-information-architecture/system-design.md`
- `docs/design-system/ux-patterns.md`
- `docs/README.md`

## What belongs here
Use this skill for questions such as:
- should this be built with the documented stack,
- when should a new dependency be introduced,
- when is shared state justified,
- whether a component should come from shadcn/ui or be bespoke,
- and how styling should remain stable and maintainable.

## Decision rules
If the change affects implementation defaults or reusable engineering policy, it belongs here.

If the change is mostly about architecture, coordinate with `system-design`.

If the change is mostly about visual rhythm or layout behavior, coordinate with `ux-patterns`.

## How to work
1. Start with `docs/engineering/stack-decisions.md` as the implementation source of truth.
2. Prefer stable, durable choices over novelty.
3. Justify new dependencies against the existing stack.
4. Reuse documented component families before introducing bespoke primitives.
5. Keep state local unless there is a real multi-route or multi-module need.

## Output expectation
When using this skill, explain:
- which implementation rule changed,
- what default future agents should now assume,
- whether the change alters dependency or component policy,
- and which adjacent docs must stay aligned.