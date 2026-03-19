FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY bff/package.json ./bff/
COPY ui/package.json ./ui/
COPY schema.graphql ./
COPY codegen.ts ./

RUN npm ci

COPY bff/ ./bff/
COPY ui/src/graphql/ ./ui/src/graphql/

RUN npm run codegen
RUN npm run build --workspace=bff

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/bff/package.json ./bff/
COPY --from=builder /app/ui/package.json ./ui/
COPY --from=builder /app/schema.graphql ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/bff/dist ./bff/dist
COPY --from=builder /app/bff/node_modules ./bff/node_modules

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "bff/dist/main.js"]
