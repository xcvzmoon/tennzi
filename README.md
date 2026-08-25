# tennzi

A todo app built on Nuxt 4, Tauri 2, and Zero. Bun workspace monorepo.

## Structure

- `apps/desktop` - Nuxt 4 + Tauri 2 desktop client
- `apps/api` - Nitro server that handles Zero's custom queries and mutators
- `packages/zero` - shared schema, queries, and mutators, plus the Postgres connection for `apps/api`

Data flows like this: the desktop app talks to zero-cache over a websocket. Zero-cache serves reads from its local sync replica and forwards custom mutations, and any query it can't answer from cache, to `apps/api`, which runs them against Postgres.

## Setup

You need Postgres 15+ with `wal_level=logical`, since zero-cache replicates from it.

```bash
bun install
cp apps/desktop/.env.example apps/desktop/.env
cp apps/api/.env.example apps/api/.env
cp packages/zero/.env.example packages/zero/.env
```

Set `ZERO_UPSTREAM_DB` in `apps/api/.env` and `packages/zero/.env` to your Postgres connection string.

## Running

The stack is three processes. Start each in its own terminal:

```bash
bun run zero   # zero-cache, port 4848
bun run api    # Nitro API, port 3001
bun run dev    # desktop app (Nuxt + Tauri)
```

`bun run dev` only starts the desktop app. Without zero-cache and the API running, custom queries and mutations (everything in `packages/zero/src/queries.ts` and `mutators.ts`) fail.

## Commands

```bash
bun run build      # Tauri build (desktop)
bun run fmt        # oxfmt + cargo fmt
bun run fmt:check  # check formatting
bun run lint       # oxlint + cargo clippy
bun run check      # fmt + fmt:check + lint
bun run test       # vitest run + cargo test
```

See `AGENTS.md` for the full command list and code conventions.

## Tech

Bun workspaces, Nuxt 4, Tauri 2, Nitro, Zero, Postgres, Tailwind, Nuxt UI, oxlint/oxfmt, Vitest, lefthook.
