---
paths:
  - "ui/src/**"
  - "bff/src/**"
---

# File Naming Conventions

All file names use **dash-case**. Suffixes indicate the file's role.

| Category | Suffix | Directory | Example |
|----------|--------|-----------|---------|
| Hook (shared) | `use-*.ts` | `ui/src/hooks/` | `use-debounce.ts` |
| Types (shared) | `.types.ts` | `ui/src/types/` | `media.types.ts` |
| Types (scoped) | `.types.ts` | co-located with consumer | `search.types.ts` |
| Page | `page.tsx` | `ui/src/app/{route}/` | `page.tsx` |
| Component | `.tsx` (no suffix) | `ui/src/components/{domain}/` | `media-card.tsx` |
| Utility (shared) | `-utils.ts` or domain name | `ui/src/lib/` | `image.ts` |
| Helpers (scoped) | `.helpers.ts` | co-located with consumer | `search.helpers.ts` |
| Constants (scoped) | `.constants.ts` | co-located with consumer | `search.constants.ts` |
| Context | `*-context.tsx` | `ui/src/context/` | `watchlist-context.tsx` |
| GraphQL ops | `.graphql` | `ui/src/graphql/` | `operations.graphql` |
| NestJS module | `.module.ts` | `bff/src/{domain}/` | `search.module.ts` |
| NestJS service | `.service.ts` | `bff/src/{domain}/` | `search.service.ts` |
| NestJS resolver | `.resolver.ts` | `bff/src/{domain}/` | `search.resolver.ts` |
| NestJS types | `.types.ts` | `bff/src/{domain}/` | `tmdb.types.ts` |

## Rules

- Never use camelCase or PascalCase in file names.
- One module/service/resolver per file in BFF.
- Shared hook files always start with `use-`. Scoped hooks use `{domain}.hooks.ts`.
- Shared type-only files always end with `.types.ts`.
- Barrel `index.ts` files are allowed for component directories (`ui/src/components/ui/index.ts`).
