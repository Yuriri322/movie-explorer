# Movie Explorer

## Overview

Movie Explorer is a dashboard for browsing movies and TV shows. Users search TMDB, view results with posters/ratings, and maintain a localStorage-persisted watchlist.

**Tech Stack**: Next.js 15 (App Router), NestJS 11 + Apollo Server 5 (GraphQL BFF), Shadcn/ui + Tailwind CSS v4, Apollo Client 3, graphql-codegen, TypeScript 5.7 strict.

**Architecture**: Monorepo with npm workspaces. `bff/` is the GraphQL BFF, `ui/` is the Next.js frontend. Shared `schema.graphql` at root.

## Commands

```bash
npm run dev               # Start both BFF and UI in watch mode
npm run build             # Build both workspaces for production
npm run codegen           # Generate TypeScript types from GraphQL schema

npm run dev -w bff        # BFF only
npm run dev -w ui         # UI only
npm run build -w bff      # Build BFF only
npm run build -w ui       # Build UI only
```

## Architecture

### Data Flow

```
UI (Next.js) → GraphQL (Apollo Client) → BFF (NestJS + Apollo Server) → TMDB REST API
```

### BFF Structure (`bff/src/`)

```
bff/src/
├── main.ts                # NestJS bootstrap, CORS config
├── app.module.ts          # Root module, GraphQL setup
├── search/
│   ├── search.module.ts
│   ├── search.resolver.ts
│   └── search.service.ts
├── tmdb/
│   ├── tmdb.module.ts
│   ├── tmdb.service.ts
│   └── tmdb.types.ts
└── generated/graphql.ts   # codegen output
```

### UI Structure (`ui/src/`)

```
ui/src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx           # Search page
│   └── watchlist/
│       └── page.tsx       # Watchlist page
├── components/
│   ├── ui/                # Shadcn primitives
│   └── {domain}/          # Domain components
├── lib/                   # Apollo client, utils
├── hooks/                 # Shared hooks
├── context/               # React contexts
├── graphql/               # .graphql operation files
└── generated/graphql.ts   # codegen output
```

## Code Rules (Quick Reference)

- **React Compiler compatible**: No `useCallback`, `useMemo`, `memo`. Plain functions and values.
- **No comments** except on complex algorithms. **No logging** in production code.
- **Named exports only**. Exception: Next.js pages require `export default`.
- **Named function declarations** for components. Never arrow-function components.
- **Tailwind + Shadcn only**. Use `cn()` for conditional classes.
- **Semantic color tokens** from theme. No raw hex/rgb values.
- **Co-location**: single-consumer hooks/types/helpers stay in the page folder.
- **Path aliases**: `@/*` → `src/*`.
- **File naming**: dash-case everywhere. Suffixes: `.types.ts`, `.helpers.ts`, `.constants.ts`.
- **Props**: `interface FooProps {}` directly above the component. Destructure in signature.
- **Hooks**: explicit return type interface. `UseFooOptions` and `UseFooReturn` interfaces.

## Environment Variables

### BFF (`bff/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `TMDB_API_KEY` | Yes | — | TMDB API Read Access Token |
| `CORS_ORIGIN` | No | `http://localhost:3000` | Allowed CORS origin |
| `PORT` | No | `4000` | Server port |

### UI (`ui/.env.local`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_GRAPHQL_URL` | No | `http://localhost:4000/graphql` | BFF GraphQL endpoint |

## Git Policy

Never use git commands (no commits, pushes, pulls, checkouts, etc.). The user handles all version control manually.

## Response Format

Always run `npm run build` before finishing any code task. End every response with exactly 2 short paragraphs:

1. **Changes**: What was changed and why (1-2 sentences).
2. **Files**: File paths with line numbers to see the fixes (1-2 sentences).
