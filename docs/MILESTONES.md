# Development Milestones
## Golden Aura — Ornamental Plants Shop Website

| | |
|---|---|
| **Document Version** | 1.0 |
| **Date** | 2026-07-17 |
| **Companion doc** | [SRS.md](./SRS.md) — feature/requirements source of truth |

---

## 0. Sequencing & Workflow Policy

Milestones run in the order below — each is a prerequisite for the next (test suite before CI, CI before CI/CD-driven Docker deploys, pipeline before feature build-out).

**Branching & rebase policy** (applies from M1 onward):
- `main` is always deployable (static export builds clean, CI green).
- One short-lived feature branch per unit of work (`feat/<scope>`, e.g. `feat/plants-catalog`, `feat/contact-form`).
- Before opening a PR: `git fetch origin && git rebase origin/main` — resolve conflicts locally, keep history linear (no merge commits from `main` into feature branches).
- PR merges to `main` via **rebase merge** (or squash if the branch has noisy WIP commits) — no merge commits on `main`.
- CI must be green (lint, typecheck, unit, build, E2E, a11y) before merge.

**Definition of Done (DoD)** — applies to every feature branch in M4+:
1. Implements the FRs from `SRS.md` §4 for that page/section.
2. Unit/component tests added for new logic/components.
3. Playwright smoke test added/updated for the new route.
4. `@axe-core/playwright` reports zero critical/serious violations on the new route.
5. `next build` (static export) succeeds with no warnings.
6. Branch rebased onto latest `main`; CI green; PR reviewed (self-review acceptable for solo dev, but diff must be read end-to-end).

**Workspace layout** (npm workspaces, established in M1):
```
/ (root package.json — "workspaces": ["app", "e2e"], Node version pinned via .nvmrc/engines)
  app/     — Next.js package: App Router lives at app/app/ (Next.js convention nested inside
             the workspace package of the same name), plus components/{ui,layout}/, lib/,
             data/, content/ (care-guide), public/ — own package.json, tsconfig.json, Vitest config
  e2e/     — Playwright + @axe-core/playwright package, own package.json/tsconfig.json —
             runs against app's built out/
  docs/    — plain markdown folder (SRS, MILESTONES, component-map.md, testcases.md, user manual)
             — not a workspace member, no install/build step
```
Root scripts delegate per package, e.g. `npm run test -w app`, `npm run test:e2e -w e2e`, `npm run build -w app`.

Deployment (M3) targets Vercel directly from the static export — no `docker/` folder or `.dockerignore` (see M3 for the 2026-07-18 decision dropping Docker/self-hosted-VPS in favor of a static host).

---

## Milestone 1 — Base Project Setup + Test Suite

**Goal:** A working npm-workspaces skeleton (`app` + `e2e` packages) with the full test/lint toolchain wired in and passing, and every mock-ui page mapped to a concrete component structure, before any real feature work starts.

| # | Task |
|---|---|
| 1.1 | Root `package.json` with `"workspaces": ["app", "e2e"]`; Node version pinned (`.nvmrc` + `engines` field) |
| 1.2 | Scaffold `app/`: Next.js 16.2.10 (App Router) + TypeScript + Tailwind CSS 4.3.2 |
| 1.3 | Configure `app/next.config` with `output: 'export'`; verify `next build` produces `app/out/` |
| 1.4 | Scaffold `e2e/`: Playwright + `@axe-core/playwright`, own `package.json`/`tsconfig.json`, pointed at `app`'s static `out/` |
| 1.5 | Page-wise component mapping: walk every `mock-ui/*.html` page against `SRS.md` §4 and record every shared/unique UI piece in `docs/component-map.md` |
| 1.6 | Define `app/components/ui/` (atoms: Button, Card, Container, Chip, …) vs `app/components/layout/` (Header, Footer, PageShell, Nav, FABs) structure, driven by the component map |
| 1.7 | ESLint + Prettier config in `app/`; `npm run lint` / `npm run format` scripts |
| 1.8 | Install & configure Vitest + React Testing Library in `app/`; one passing sample unit test |
| 1.9 | Install & configure Playwright in `e2e/`; one passing smoke test against `app`'s static output served locally (e.g. via `serve app/out`) |
| 1.10 | One passing `@axe-core/playwright` a11y scan test on the placeholder home page |
| 1.11 | Base layout shell in `app/`: `<html>`/`<body>`, header/nav placeholder, footer placeholder, global Tailwind styles — matching mock-ui's shared header/footer |
| 1.12 | Root + per-package `package.json` scripts: `dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`, `test:a11y` (delegating via `-w app` / `-w e2e`) |
| 1.13 | Git repo initialized, `.gitignore` (`node_modules`, `out/`, `.next/`, `test-results/`), initial commit |

**Exit criteria:** `npm run lint`, `npm run typecheck`, `npm run test -w app`, `npm run build -w app`, `npm run test:e2e -w e2e` all pass locally on a from-scratch clone.

---

## Milestone 2 — CI Pipeline (GitHub Actions)

**Goal:** Every push/PR is automatically validated — no change reaches `main` without lint, type, unit, build, E2E, and a11y checks passing.

| # | Task |
|---|---|
| 2.1 | `.github/workflows/ci.yml` triggered on `push` (main) and `pull_request` |
| 2.2 | Job: install deps (with npm/yarn cache) |
| 2.3 | Job: lint + typecheck |
| 2.4 | Job: unit/component tests (Vitest), upload coverage as artifact |
| 2.5 | Job: static build (`next build`), fail fast if export breaks |
| 2.6 | Job: Playwright E2E against the built `out/` (serve static output in CI, install Playwright browsers via cached step) |
| 2.7 | Job: `@axe-core/playwright` a11y scan (can run inside the E2E job) |
| 2.8 | Job: Lighthouse CI against built output, thresholds from `SRS.md` §9 (Perf ≥ 90, SEO ≥ 95, A11y ≥ 95) |
| 2.9 | Branch protection on `main`: require the CI workflow to pass before merge |
| 2.10 | Status badge in root `README.md` |

**Exit criteria:** Opening a throwaway PR with a deliberate lint error shows a red check; fixing it shows all green; direct pushes to `main` without passing CI are blocked.

---

## Milestone 3 — Deployment / CD Pipeline

**Goal:** GitHub Actions handles continuous deployment of the static export to Vercel on merge to `main`, gated behind CI (M2) passing, with an automated post-deploy health check and a documented, exercised rollback path.

**Decision (2026-07-18):** Docker/self-hosted-VPS deployment (the milestone's original scope) was dropped in favor of deploying the static `app/out/` directly to Vercel. Rationale: `output: 'export'` produces a plain static site with no server-side runtime requirement, so a container + reverse proxy adds operational overhead (image builds, registry, host management, SSH deploy) without buying anything a static host doesn't already provide — Vercel's own build/deploy/rollback tooling covers the milestone's actual goals (reproducible deploy on merge, health check, rollback) more simply. `docker/` is removed from the workspace layout in §0.

| # | Task |
|---|---|
| 3.1 | `.github/workflows/cd.yml`: triggered on push to `main` (branch protection from M2 already guarantees CI passed before code lands there) |
| 3.2 | Vercel CLI deploy (`vercel pull` / `vercel build` / `vercel deploy --prebuilt --prod`), authenticated via `VERCEL_TOKEN`/`VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` repo secrets |
| 3.3 | Post-deploy health check: `curl` the deployment URL, expect HTTP 200, fail the workflow otherwise |
| 3.4 | Document rollback procedure (Vercel's instant-rollback to a previous deployment) and exercise it at least once |

**Exit criteria:** A merge to `main` results in an updated Vercel deployment automatically built, deployed, and health-checked, with zero manual steps; a documented rollback has been exercised successfully at least once.

---

## Milestone 4 — Feature Build-Out (page by page, rebase workflow)

**Goal:** Implement every page/section from `SRS.md` §4, in priority order, each on its own branch, following the DoD in §0.

Order chosen for dependency + business priority (shared shell first; lead-gen-critical Contact page pulled forward since header/footer CTAs depend on it):

| # | Branch | Scope (SRS ref) | Priority reason |
|---|---|---|---|
| 4.1 | `feat/design-system` | Shared layout, header/nav, footer, base components (Button, Card, Container, Section) | Everything else depends on this |
| 4.2 | `feat/contact-page` | `/contact` — FR-8.x, form + map + WhatsApp/tel | Sitewide CTAs (floating WhatsApp/call) need real targets early |
| 4.3 | `feat/home-page` | `/` — FR-1.x | Primary entry point |
| 4.4 | `feat/plants-catalog` | `/plants`, `/plants/[category]` — FR-3.x, core categories (SRS §6.1) | Core content, primary SEO surface |
| 4.5 | `feat/services-page` | `/services` — FR-5.x, core services (SRS §6.2) | Second revenue driver after plant sales |
| 4.6 | `feat/about-page` | `/about` — FR-2.x | Trust-building, low complexity |
| 4.7 | `feat/pots-accessories` | `/pots-accessories` — FR-4.x | Secondary catalog |
| 4.8 | `feat/care-guide` | `/care-guide`, `/care-guide/[slug]` — FR-6.x | SEO content hub, can ship after core catalog |
| 4.9 | `feat/gallery` | `/gallery` — FR-7.x | Supporting content |
| 4.10 | `feat/faq` | `/faq` — FR-9.x | Supporting content |
| 4.11 | `feat/seo-structured-data` | JSON-LD `GardenStore`, sitemap.xml, robots.txt, OG/meta across all routes — NFR-2.x | Cuts across all pages, done once content pages exist |
| 4.12 | `feat/a11y-perf-audit` | Full-site accessibility + Lighthouse pass, fix findings — NFR-3.x, NFR-1.x | Final hardening pass |
| 4.13 | `feat/cross-browser-qa` | Manual + automated check across target browsers/viewports — NFR-6.x | Pre-launch QA |

**Per-branch workflow** (applies to every row above — incremental TDD per page, not a whole-site batch):
1. Pull the page's components from `docs/component-map.md` (M1.5); reuse existing `ui/`/`layout/` pieces or add new ones there.
2. Write unit tests for the page's new components/logic (red).
3. Implement until unit tests pass (green).
4. Write the page's E2E scenario(s); append them to `docs/testcases.md` — built up incrementally, one page at a time, not as a single end-of-project pass.
5. Implement/fix until the E2E scenarios pass; run the a11y scan.
6. Rebase onto `main` → PR → CI green → merge → CD deploys automatically (from M3).

**Exit criteria:** All routes in the SRS §3 site map are live, CI green on `main`, deployed container/site reflects the full feature set.

---

## Milestone 5 — Launch Readiness (post-M4)

| # | Task |
|---|---|
| 5.1 | Final content pass with real shop data (address, hours, phone, actual plant/service photography) replacing placeholders |
| 5.2 | Lighthouse CI thresholds re-verified on final content (real images are heavier than placeholders) |
| 5.3 | Google Search Console + sitemap submission |
| 5.4 | Analytics verified firing correctly in production |
| 5.5 | Domain + HTTPS confirmed on the deployment target |
| 5.6 | User manual (`docs/user-manual.md`): site navigation and content-update workflow (plants/services/pricing) for shop staff, written against the finished production site |
| 5.7 | Monorepo documentation pass: root `README.md` covers the `app`/`e2e`/`docs` workspace layout, per-package scripts, and Node version requirement (`.nvmrc`/`engines`) |

---

## Summary Timeline View

```
M1 Base + Test Suite  ──▶  M2 CI Pipeline  ──▶  M3 Docker + CD  ──▶  M4 Feature Build-Out  ──▶  M5 Launch
   (foundation)              (safety net)          (delivery path)      (13 sub-milestones)      (go-live)
```
