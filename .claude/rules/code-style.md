---
paths:
  - "ui/src/**"
  - "bff/src/**"
---

# Code Style

## React Compiler

React Compiler compatible code. Never use manual memoization:
- No `useCallback`, `useMemo`, `memo`, `React.lazy`.
- Pass plain functions and values directly — the compiler optimizes automatically.
- No `deps` arrays to maintain. If you see existing ones, remove them.

## Components

- Named function declarations. Never arrow-function components.
- Named exports only. Exception: Next.js pages require `export default`.
- Props: `interface FooProps {}` directly above the component. Use intersection for composed props.
- Destructure props in the function signature.
- Event handlers: named functions inside the component (`function handlePress() {}`), not inline arrows in JSX.
- Group multiple related components in one file only for tightly coupled primitives (e.g., Card + CardHeader + CardContent). Otherwise one component per file.

## Hooks

- `export function useFoo(options?: UseFooOptions): UseFooReturn {}`
- Define `UseFooOptions` and `UseFooReturn` interfaces above the hook.
- Explicit return type interface — never rely on inference for public hooks.
- Use `useRef` for subscriptions/timers, `useState` for reactive state, `useEffect` for side effects.
- Internal helpers as named functions inside the hook body.
- Cleanup: every useEffect that sets up listeners/timers must return a cleanup function.

## Types

- Prefer `interface` over `type` for object shapes.
- `export type` for type-only exports.
- PascalCase for all types/interfaces.
- Optional fields: `fieldName?: Type` (not `fieldName: Type | undefined`).
- Constants: `export const FOO = { ... } as const` with derived types via `keyof typeof`.
- Group related types in domain files.

## Utilities / Lib

- One domain per file.
- All functions as named exports.
- Constants at top, functions below, types alongside their constants.

## Error Handling

- Hooks: return an `error` state field. Never throw from hooks.
- Services (BFF): throw `HttpException` with appropriate status. Never swallow silently.
- Pages: Apollo `error` object renders `ErrorState` component.

## Comments & Logging

- No comments by default. Code should be self-documenting through clear naming.
- Only exception: complex algorithms. Briefly explain the formula or logic.
- No `console.log`, `console.warn`, `console.error` in production code.
- If temporary debugging is needed, remove all logs before committing.

## Import Order

React/Next → external packages → `@/` hooks → `@/` components → `@/` lib/utils → `@/` types. Blank line between groups.
