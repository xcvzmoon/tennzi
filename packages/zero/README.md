# @tennzi/zero

Shared Zero schema, queries, and mutators, plus the Postgres adapter used by `apps/api`. Both `apps/desktop` and `apps/api` depend on this package so the client and server agree on one definition of the data.

- `src/schema.ts` - table definitions and the `zql` query builder. Currently one table, `todo` (`id`, `title`, `done`).
- `src/queries.ts` - named queries, e.g. `todos.all`.
- `src/mutators.ts` - named mutators, e.g. `todos.create`, `todos.toggle`, `todos.remove`. Each mutator validates its args with Valibot before touching `tx`.
- `src/db.ts` - Postgres adapter (`zeroPostgresJS`) built from `ZERO_UPSTREAM_DB`, exported as `db` for `apps/api`'s mutate/query handlers.

## Setup

```bash
cp .env.example .env
```

- `ZERO_UPSTREAM_DB` - Postgres connection string, `wal_level=logical` required. Used by both this package and zero-cache.
- `ZERO_QUERY_URL` / `ZERO_MUTATE_URL` - where zero-cache sends queries and mutations it can't handle itself. Point these at `apps/api` (`http://localhost:3001/api/zero/query` and `.../mutate`).

## Running

```bash
bun run dev   # zero-cache-dev
```

Starts zero-cache against `ZERO_UPSTREAM_DB`. `apps/desktop` connects to it directly; `apps/api` shares the schema and mutator/query definitions from this package to actually execute them.
