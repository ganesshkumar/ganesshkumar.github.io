# Coding Standards

> Conventions for the Next.js, React and TypeScript build. Stack choices live in `stack-decisions.md`.

## Language and types
- TypeScript strict mode.
- Prefer type inference. Add explicit types at boundaries: props, exported function signatures, and API and data shapes.
- No `any` without a short comment explaining why.

## Folder structure
- `app/`: routes and layouts (App Router).
- `components/ui/`: shadcn/ui primitives, as generated (kebab-case single files, for example `button.tsx`).
- `components/`: app-level components (folder-per-component, see below).
- `lib/`: utilities and helpers (`lib/utils.ts` holds `cn`).
- `hooks/`: shared React hooks.

## Component structure
Each app-level component lives in its own kebab-case folder:
```text
components/
  article-card/
    article-card-component.tsx   # ArticleCardComponent (presentational)
    article-card-container.tsx   # ArticleCardContainer (data, state, logic)
    article-card-component.test.tsx
    index.ts                     # re-exports the public component
```
Rules:
- Folder and file names are kebab-case. The React component inside is PascalCase.
- `-component` is presentational: props in, UI out. `-container` handles data, state and logic, then renders the component.
- A component with no logic needs only the `-component` file. Add a `-container` only when there is real data or state.
- Colocate the test as `*.test.tsx` or `*.spec.tsx`, next to the code it tests.
- `index.ts` re-exports the component so imports stay clean.
- shadcn/ui primitives in `components/ui/` keep shadcn's own convention (single kebab-case file). Do not restructure them.

## Naming
- Components: PascalCase (`ArticleCardComponent`).
- Files and folders: kebab-case (`article-card/article-card-component.tsx`).
- Hooks: `useThing` in `hooks/use-thing.ts`.
- Utilities and variables: camelCase.
- Types and interfaces: PascalCase. Prefer `type` for shapes. Use `interface` when extending.
- Constants: UPPER_SNAKE_CASE for true constants.

## Imports
- Use the `@/` path alias for internal imports, not long relative chains.
- Order: external packages, then internal `@/` imports, then relative, then styles.
- Import a component through its folder `index.ts`, not a deep path.

## React and Next.js
- Server Components by default. Add `"use client"` only when the component needs interactivity or browser APIs.
- Keep data fetching on the server where possible.
- Presentational components stay pure. Side effects and data live in containers or server components.
- Zustand for shared client state and browser-session persistence (see `stack-decisions.md`).

## Styling
- Tailwind utility classes with the semantic tokens from `../design-system/design-foundations.md`.
- Compose class names with the `cn` helper from `lib/utils.ts`.
- No raw hex or ad-hoc sizes. No inline style objects except for truly dynamic values.

## Linting and formatting
- ESLint with the flat config (`eslint.config.mjs`) and Prettier.
- Formatting is not a review discussion. Run the formatter before committing.
- Fix lint warnings. Do not disable a rule without a short reason comment.

## Testing
- Colocate tests with components as `*.test.tsx` or `*.spec.tsx`.
- Test behavior and accessibility, not implementation detail.
- The test runner and coverage depth are set in the quality folder.

## Related
- Stack and versions: `stack-decisions.md`.
- Component contracts: `../design-system/component-specs.md`.
- Tokens: `../design-system/design-foundations.md`.
