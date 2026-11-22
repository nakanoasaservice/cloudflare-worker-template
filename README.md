# Cloudflare Worker Template

A minimal Cloudflare Workers template using [Hono](https://hono.dev/) and TypeScript.

## Stack

- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **Language**: TypeScript
- **Toolchain**: [Vite+](https://viteplus.dev/) (Oxlint, Oxfmt and type checking via `vp check`; Vitest via `vp test`)
- **Test**: Vitest + `@cloudflare/vitest-plugin`

## Getting Started

Requires Node.js and [pnpm](https://pnpm.io/). With [mise](https://mise.jdx.dev/), `mise install` sets up the versions pinned in [mise.toml](mise.toml). Otherwise, run `corepack enable` to use the pnpm version pinned in `packageManager` in [package.json](package.json).

```bash
pnpm install
pnpm run dev
```

## Commands

| Command               | Description                       |
| --------------------- | --------------------------------- |
| `pnpm run dev`        | Start local dev server            |
| `pnpm run deploy`     | Deploy to Cloudflare Workers      |
| `pnpm run test`       | Run tests                         |
| `pnpm run check`      | Lint, format and type check       |
| `pnpm run check:fix`  | Auto-fix lint and format issues   |
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

### Runtime versions

`package.json` is the source of truth for development Node.js (`devEngines.runtime`)
and pnpm (`packageManager`). The major versions in `mise.toml` only bootstrap the
environment. Install the [global Vite+ CLI](https://viteplus.dev/guide/global-cli)
with environment management enabled, then use `vp install --frozen-lockfile`
and `vp run <script>` to run with the declared versions. `pnpm` commands also use
them when the Vite+ shims are active. The project-local CLI alone does not switch
Node.js versions.

CI reads the same manifest automatically; compatibility-test matrices explicitly
override Node.js. pnpm runtime management is disabled so it does not override
Vite+'s selection. Keep any consumer-facing `engines.node` support range separate
from the development pin.
