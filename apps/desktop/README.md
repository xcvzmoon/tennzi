# Desktop

Nuxt 4 (SSR disabled) frontend running inside a Tauri 2 shell.

Data comes from Zero. `app/composables/useZero.ts` creates a single `Zero` client per session, pointed at zero-cache via `NUXT_PUBLIC_CACHE_URL`. `useQuery` materializes a live-updating view from `packages/zero/src/queries.ts`; `useMutation` sends mutations from `packages/zero/src/mutators.ts` and tracks pending/error state.

## Setup

```bash
cp .env.example .env
```

- `NUXT_PORT` - dev server port (default 3000)
- `TAURI_HOST` - host to bind for Tauri's dev server, and to enable the HMR websocket config in `nuxt.config.ts`
- `NUXT_PUBLIC_CACHE_URL` - zero-cache URL, e.g. `http://localhost:4848`

## Running

```bash
bun run dev
```

This runs `scripts/dev.ts`, not `nuxt dev` directly. It checks whether `NUXT_PORT` is free, walks forward to the next open port if not, and starts `tauri dev` with a generated config pointing at that port. Nuxt alone won't get you a working app window; you need the Tauri process.

For the Nuxt dev server without Tauri:

```bash
bun run nuxt:dev
```

## Other commands

```bash
bun run typecheck    # tsc (scripts) + nuxt typecheck
bun run tauri:build  # production build
```
