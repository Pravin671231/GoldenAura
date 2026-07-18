# Golden Aura

[![CI](https://github.com/Pravin671231/GoldenAura/actions/workflows/ci.yml/badge.svg)](https://github.com/Pravin671231/GoldenAura/actions/workflows/ci.yml)

Static-export Next.js catalog/lead-gen site for an ornamental plants shop. See [docs/SRS.md](docs/SRS.md) for requirements, [docs/MILESTONES.md](docs/MILESTONES.md) for the build plan, and [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the Cloudflare Pages CD setup.

## Workspace layout

- `app/` — Next.js (App Router) + TypeScript + Tailwind CSS, `output: 'export'`
- `e2e/` — Playwright + `@axe-core/playwright`, runs against `app`'s built `out/`
- `docs/` — SRS, milestones, component map

## Scripts

Run from the repo root (delegates to the relevant workspace):

```
npm run dev            # start the Next.js dev server
npm run build           # static export build -> app/out/
npm run lint             # ESLint
npm run typecheck        # tsc --noEmit
npm run test              # Vitest unit/component tests
npm run test:e2e          # Playwright smoke tests against app/out
npm run test:a11y         # axe-core accessibility scan
npm run test:lighthouse   # Lighthouse CI against app/out
```
