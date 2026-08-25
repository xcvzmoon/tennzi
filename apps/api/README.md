# API

Nitro server (Bun preset) that backs Zero's custom queries and mutators for the desktop app.

Zero-cache forwards two kinds of requests here: custom mutations, and any query it can't serve from its own sync replica. Both handlers pull their logic straight from `@tennzi/zero`, so `apps/api` has no business logic of its own.

- `server/api/zero/query.post.ts` runs queries defined in `packages/zero/src/queries.ts` against the schema.
- `server/api/zero/mutate.post.ts` runs mutators defined in `packages/zero/src/mutators.ts` against Postgres, via `db` from `@tennzi/zero/server`.

## Setup

```bash
cp .env.example .env
```

Set `ZERO_UPSTREAM_DB` to the same Postgres instance zero-cache replicates from (`wal_level=logical` required).

## Running

```bash
bun run dev   # nitro dev, port 3001
```

Zero-cache needs to be pointed at this server. `packages/zero/.env.example` sets `ZERO_QUERY_URL` and `ZERO_MUTATE_URL` to `http://localhost:3001/api/zero/{query,mutate}`, matching the port above.
