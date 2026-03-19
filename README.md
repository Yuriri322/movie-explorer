# Movie Explorer

A dashboard for browsing movies and TV shows, powered by the TMDB API.

## Architecture

- **BFF** (`bff/`) — NestJS GraphQL server that proxies TMDB REST API
- **UI** (`ui/`) — Next.js app with Shadcn/ui and Tailwind CSS
- **Communication** — UI queries BFF via GraphQL
- **Types** — Generated with graphql-codegen from a shared `schema.graphql`

## Prerequisites

- Node.js 22+
- npm 10+

## Getting a TMDB API Key

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/signup)
2. Go to [Settings → API](https://www.themoviedb.org/settings/api)
3. Request an API key (select "Developer" and fill in the form)
4. Copy the **API Read Access Token** (v4 auth / Bearer token)

## Setup

```bash
# Install all dependencies
npm install

# Create BFF environment file
cp .env.example bff/.env
# Edit bff/.env and set your TMDB_API_KEY

# Optionally create UI environment file (defaults work for local dev)
# cp .env.example ui/.env.local

# Generate TypeScript types from GraphQL schema
npm run codegen

# Start both BFF and UI in development mode
npm run dev
```

The UI will be available at http://localhost:3000 and the BFF Apollo Sandbox at http://localhost:4000/graphql.

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

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start both BFF and UI in watch mode |
| `npm run build` | Build both workspaces for production |
| `npm run codegen` | Generate TypeScript types from GraphQL schema |

## Deployment

### UI → Vercel

1. Import the repo in Vercel
2. Set root directory to `ui`
3. Set build command: `cd .. && npm run codegen && cd ui && npm run build`
4. Set environment variable: `NEXT_PUBLIC_GRAPHQL_URL` = your BFF URL

### BFF → Railway

1. Create a new project in Railway
2. Connect your repo
3. Use the Dockerfile at `bff/Dockerfile`
4. Set environment variables: `TMDB_API_KEY`, `CORS_ORIGIN` (your Vercel URL)
