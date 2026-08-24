# AGENTS.md

## Repository Overview

Monorepo with Bun workspaces containing two apps:

- **apps/api** - Nitro API server (Bun preset)
- **apps/desktop** - Nuxt 4 + Tauri 2 desktop app

## Key Commands

```bash
# Install dependencies
bun install

# Development
bun run dev              # Runs desktop dev (includes Nuxt + Tauri)
bun run api              # Runs API dev server (nitro dev)
bun run desktop dev      # Direct desktop dev

# Build
bun run build            # Tauri build (desktop)

# Format & Lint (JS/TS)
bun run fmt              # oxfmt + cargo fmt
bun run fmt:check        # Check formatting
bun run lint             # oxlint + cargo clippy
bun run check            # fmt + fmt:check + lint

# Format & Lint (Rust)
bun run cargo:fmt        # cargo fmt
bun run cargo:fmt:check  # cargo fmt --check
bun run cargo:lint       # cargo clippy --all-targets -D warnings
bun run cargo:build      # cargo build
bun run cargo:test       # cargo test

# Testing
bun run test             # vitest run + cargo test
bun run vitest:test      # vitest run (JS/TS tests in tests/*.test.ts)
bun run vitest:test:watch # vitest watch mode

# Typecheck
bun run desktop typecheck  # tsc (scripts) + nuxt typecheck
```

## Architecture Notes

- **Package Manager**: Bun 1.4.0 (lockfile: `bun.lock`)
- **Workspaces**: `apps/*` with catalog deps for `@types/bun`, `typescript`, `valibot`
- **API**: Nitro with Bun preset, server dir at `apps/api/server/`
- **Desktop**: Nuxt 4 (SSR disabled), Tauri 2, modules in `app/modules/`
- **Custom dev script**: `apps/desktop/scripts/dev.ts` finds available port, spawns `tauri dev`

## Tooling Config

- **Formatter**: oxfmt (config: `oxfmt.config.ts`) - sorts imports, single quotes, Tailwind class sorting
- **Linter**: oxlint (config: `oxlint.config.ts`) - TS-aware, strict TS rules, Vue/Unicorn/Import plugins
- **Rust**: cargo fmt + clippy (Tauri app at `apps/desktop/src-tauri/`)
- **Tests**: Vitest (config: `vitest.config.ts`) - node env, `tests/*.test.ts`
- **Git hooks**: lefthook (pre-commit: fmt+lint staged; pre-push: check+test+typecheck)

## Important Conventions

- TypeScript: strict mode, type-aware linting enabled
- Import sorting: type imports first, then value imports, grouped by source
- Unused vars: prefix with `_` to suppress warnings
- No `null` (unicorn/no-null: off), prefer `undefined`
- Tailwind CSS sorted via oxfmt (stylesheet: `apps/desktop/app/assets/css/main.css`)

## Gotchas

- Desktop dev uses custom port detection (default 3000, finds next available)
- Tauri dev watches ignored for `src-tauri/**` in Vite
- `bun run desktop` prefixes commands with `bun --cwd apps/desktop`
- No tests currently exist (vitest passes with `passWithNoTests: true`)
- Rust version pinned to 1.96.0 in Cargo.toml

## Bun

- Since this is using Bun, use native Bun APIs as much as possible

## Code conventions

- **`verbatimModuleSyntax`** — use `import type` for type-only imports
- **Explicit `.ts` extensions** in import paths
- **Single quotes**, no semicolons
- **`no-console`** only allows `console.error`
- **`no-non-null-assertion`** and **`no-unsafe-type-assertion`** are errors — no `!` or `as` casts
- Pre-commit: husky + lint-staged runs oxfmt and oxlint on staged files

## Editing Guidance

- Make the smallest correct change.
- Do not polish unrelated code.
- Do not remove correct comments or documentation.
- Do not rename broad parts of the codebase unless required.
- Do not expand a change into a repo-wide refactor unless necessary.
- Prefer leaving correct existing code in place.
- When touching production-sensitive code, prioritize reliability over clever abstractions.

## Formatting And Style

- Match the surrounding file's formatting instead of hand-styling custom layouts.
- Prefer `function name()` for named functions and helpers.
- Do not prefer `const fn = () => {}` for normal top-level helpers.
- Exception: callbacks should stay as arrows, for example `items.map((item) => item.id)`.
- If only one or two properties is needed from iterated item and will not conflict other variables, prefer destructuring.
- Prefer functions over classes.
- Existing classes that are already correct can stay; do not rewrite them for style only.
- Keep diffs small and focused.

## Types And Naming

- Prefer `type` over `interface`.
- Avoid `any`; prefer `unknown` and narrow it explicitly but avoid creating isRecord function.
- Add explicit return types to exported functions and non-trivial helpers.
- Use string literal unions for small state enums like `'ok' | 'error'`.
- Keep generics minimal and purposeful.
- Reuse existing helper types before inventing new ones.
- Use descriptive names.
- Do not abbreviate iterable items; prefer `item`, `entry`, `record`, `status`.
- Avoid one-letter names except for conventional indexes.

## Validation, Errors, And Responses

- Use Valibot for environment parsing, form validation, and request validation.
- Prefer `camelCaseSchema` over `PascalCaseSchema` in generating schemas.
- Prefer composable `v.pipe()` schemas with built-in actions and reusable transform helpers instead of manual parsing or ad-hoc validation logic.
- Validate once at the boundary, not repeatedly in inner layers.
- Never throw raw strings.
- Catch infrastructure errors where graceful degradation is expected.
- Clean up temporary resources in `finally` blocks.
- Include stable error codes in config validation and app-level failures.

## Agents

- Disable co-author and never commit nor push.
- Do not preserve backward compatibility. Remove obsolete paths instead of adding compatibility layers, fallbacks, or migrations.
- Choose the simplest implementation that fully meets the current requirements. Avoid speculative abstractions, configuration, and indirection.
- Grow the system in layers. Start from the smallest version that works end to end, and add each new capability on top of a product that already works. Never trade a working product for unfinished complexity.
- Keep components modular and concerns clearly separated.
- Prefer established, well-maintained libraries when they reduce overall complexity or improve reliability. Do not reimplement common functionality without a clear reason.
- Lean on the dependencies already in the project before writing your own implementation or adding packages. Do not assume a library lacks a capability without checking its documentation and types.
- Make architectural decisions for the long term. Do not accept a stopgap that only works for now and is meant to be replaced later.
- If you need a paragraph-long comment to justify why the workaround is OK, the code is wrong — fix the code.
- Always use the unslop skill when generating texts as well as in adding jsdocs/tsdocs or just comments

<!-- Nitro Rules Start -->

This project is based on [Nitro v3](https://nitro.build), [h3](https://h3.dev/), and [Rolldown](https://rolldown.rs/).

Refer to `node_modules/nitro/dist/docs/README.md` when working on server (your knowledge about Nitro v3 is likely outdated!).

## Project Structure

`server/` contains server-side code with supported subdirs (create as needed): `api/` (/api prefixed handlers), `routes/` (non-prefixed route handlers), `middleware/`, `plugins/`, `utils/`, `assets/`, and `tasks/`. `public/` holds static assets (copied, not bundled). Config files: `nitro.config.ts` (serverDir, routeRules, preset, etc.), `tsconfig.json`.

## Conventions

- Path alias `~/*` (tsconfig), use explicit `.ts` extensions

<!-- Nitro Rules End -->

## LLM References

- Nuxt V4 <https://nuxt.com/llms.txt>
- Tauri V2 <https://v2.tauri.app/llms.txt>
- Nitro V3 <https://nitro.build/llms.txt>
- H3 V2 <https://h3.dev/llms.txt>
- Zero <https://zero.rocicorp.dev/llms.txt>
