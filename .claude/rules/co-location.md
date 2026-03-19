---
paths:
  - "ui/src/**"
---

# Co-location Rules

Code belongs next to what uses it. Only promote to a shared directory when a second consumer appears.

## Top-level shared directories

```
ui/src/
├── components/ui/         # Shadcn primitives
├── components/{domain}/   # Reusable domain components (used by 2+ pages)
├── hooks/                 # Shared hooks (used by 2+ pages)
├── lib/                   # Shared utility functions
├── types/                 # Shared type definitions
├── context/               # React contexts
├── graphql/               # GraphQL operation documents
└── app/{route}/           # Pages (Next.js App Router)
```

## Decision: scoped vs shared

| Used by | Location | Example |
|---------|----------|---------|
| 1 page | inside `ui/src/app/{route}/` | `ui/src/app/watchlist/watchlist.helpers.ts` |
| 1 component | next to the component file | `ui/src/components/search/search.helpers.ts` |
| 2+ pages/components | shared directory | `ui/src/hooks/use-debounce.ts` |

## Promoting scoped → shared

When a second consumer needs the same code:
1. Move the file from the page folder to the shared directory.
2. Rename to shared convention.
3. Update all imports.

Never pre-emptively place code in shared directories "in case" it's reused later.
