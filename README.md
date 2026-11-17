# Cloudflare Worker Template

A minimal Cloudflare Workers template using [Hono](https://hono.dev/) and TypeScript.

## Stack

- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **Language**: TypeScript
- **Test**: Vitest + `@cloudflare/vitest-pool-workers`
- **Linter/Formatter**: Biome

## Getting Started

Requires Node.js and [pnpm](https://pnpm.io/). With [mise](https://mise.jdx.dev/), `mise install` sets up the versions pinned in [mise.toml](mise.toml). Otherwise, run `corepack enable` to use the pnpm version pinned in `packageManager` in [package.json](package.json).

```bash
pnpm install
pnpm run dev
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start local dev server |
| `pnpm run deploy` | Deploy to Cloudflare Workers |
| `pnpm run test` | Run tests |
| `pnpm run check` | Lint and format check |
| `pnpm run check:fix` | Auto-fix lint and format issues |
| `pnpm run cf-typegen` | Generate Cloudflare binding types |

## Project Structure

```
src/
  index.ts   # Entry point
wrangler.jsonc # Wrangler configuration
```

## Configuration

Edit [wrangler.jsonc](wrangler.jsonc) to configure:

- Environment variables (`vars`)
- Secrets (`secrets`)
- Bindings (KV, R2, D1, AI, etc.)
- Static assets
- Service bindings
