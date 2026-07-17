# Development Process — GitHub Issues
## Golden Aura — Ornamental Plants Shop Website

| | |
|---|---|
| **Document Version** | 1.0 |
| **Date** | 2026-07-17 |
| **Companion docs** | [SRS.md](./SRS.md) — requirements source of truth · [MILESTONES.md](./MILESTONES.md) — milestone/task breakdown this document converts into issues |

---

## 0. How to use this document

Each `###` section below is a ready-to-file GitHub issue, 1:1 with a milestone or feature branch in `MILESTONES.md`. Copy a section's body into `gh issue create --title "..." --body-file -` (or paste into the GitHub UI) to file it.

**Filing order:** top to bottom. Numbering below (`M1`, `M2`, …, `M4.1`…`M4.13`, `M5`) is a local reference key, not a GitHub issue number — if filed in this order, GitHub's auto-incrementing issue numbers will land in the same sequence.

**GitHub Milestones** (native milestone object, not a label) — create five, matching `MILESTONES.md`:
`M1 — Base Project Setup + Test Suite`, `M2 — CI Pipeline`, `M3 — Docker & Deployment / CD Pipeline`, `M4 — Feature Build-Out`, `M5 — Launch Readiness`. Assign each issue to its matching milestone.

**Labels** — two axes:
| Axis | Values |
|---|---|
| `type:*` | `type:setup`, `type:ci`, `type:infra`, `type:feature`, `type:seo`, `type:a11y`, `type:qa`, `type:docs` |
| Structural | `epic` (M4 tracking issue only) |

**M4 structure:** M4 is filed as one **epic/tracking issue** plus **13 sub-issues** (one per feature branch in `MILESTONES.md` §Milestone 4) — each page has distinct acceptance criteria and test requirements, so a single combined issue would lose that specificity. Link sub-issues to the epic via GitHub's native **sub-issues** feature (or, if unavailable, a task list of `- [ ] #<number> <title>` in the epic body).

**Issue index:**

| Ref | Title | Milestone | Depends on |
|---|---|---|---|
| M1 | Base Project Setup + Test Suite (Workspace Scaffold) | M1 | — |
| M2 | CI Pipeline (GitHub Actions) | M2 | M1 |
| M3 | Docker & Deployment / CD Pipeline | M3 | M2 |
| M4 | Feature Build-Out (epic) | M4 | M3 |
| M4.1 | `feat/design-system` | M4 | M3 |
| M4.2 | `feat/contact-page` | M4 | M4.1 |
| M4.3 | `feat/home-page` | M4 | M4.1 |
| M4.4 | `feat/plants-catalog` | M4 | M4.1 |
| M4.5 | `feat/services-page` | M4 | M4.1, M4.2 |
| M4.6 | `feat/about-page` | M4 | M4.1 |
| M4.7 | `feat/pots-accessories` | M4 | M4.1 |
| M4.8 | `feat/care-guide` | M4 | M4.1 |
| M4.9 | `feat/gallery` | M4 | M4.1 |
| M4.10 | `feat/faq` | M4 | M4.1 |
| M4.11 | `feat/seo-structured-data` | M4 | M4.2–M4.10 |
| M4.12 | `feat/a11y-perf-audit` | M4 | M4.2–M4.10 |
| M4.13 | `feat/cross-browser-qa` | M4 | M4.2–M4.10 |
| M5 | Launch Readiness | M5 | M4 (all sub-issues closed) |

---

## Issue: M1 — Base Project Setup + Test Suite (Workspace Scaffold)

**GitHub Milestone:** M1 — Base Project Setup + Test Suite
**Labels:** `type:setup`
**Depends on:** none · **Blocks:** M2, M4 (all)

### Context
Golden Aura is a static-export Next.js catalog/lead-gen site (`SRS.md` §1–2) with no backend — discovery, SEO, and click-to-call/WhatsApp/quote-form conversion are the whole point. Before any feature page is built, the repo needs a real npm-workspaces skeleton (`app` + `e2e` packages, `MILESTONES.md` §0 Workspace layout) with the full lint/test toolchain wired and green, plus a page-by-page mapping of the existing `mock-ui/` prototype (12 static HTML pages, see `mock-ui/README.md`) into a concrete component inventory — every later milestone's per-branch workflow (`MILESTONES.md` §Milestone 4) depends on `docs/component-map.md` and the `components/ui/` vs `components/layout/` split existing first.

### Scope
**In scope:**
- Root `package.json` workspaces (`app`, `e2e`), Node version pin
- `app/` package: Next.js 16.2.10 (App Router) + TypeScript + Tailwind CSS 4.3.2, `output: 'export'`
- `e2e/` package: Playwright + `@axe-core/playwright`
- `docs/component-map.md`: every `mock-ui/*.html` page walked against `SRS.md` §4
- `app/components/ui/` vs `app/components/layout/` structure definition
- Lint/format config, Vitest + RTL, base layout shell, npm scripts, git init

**Out of scope:** actual feature-page implementation (M4), CI automation (M2), Docker (M3).

### Implementation Tasks
- [ ] 1.1 Root `package.json` with `"workspaces": ["app", "e2e"]`; Node version pinned (`.nvmrc` + `engines`)
- [ ] 1.2 Scaffold `app/`: Next.js 16.2.10 (App Router) + TypeScript + Tailwind CSS 4.3.2
- [ ] 1.3 Configure `app/next.config` with `output: 'export'`; verify `next build` produces `app/out/`
- [ ] 1.4 Scaffold `e2e/`: Playwright + `@axe-core/playwright`, own `package.json`/`tsconfig.json`, pointed at `app`'s static `out/`
- [ ] 1.5 Page-wise component mapping: walk every `mock-ui/*.html` page against `SRS.md` §4, record every shared/unique UI piece in `docs/component-map.md`
- [ ] 1.6 Define `app/components/ui/` (Button, Card, Container, Chip, …) vs `app/components/layout/` (Header, Footer, PageShell, Nav, FABs), driven by the component map
- [ ] 1.7 ESLint + Prettier config in `app/`; `npm run lint` / `npm run format` scripts
- [ ] 1.8 Install & configure Vitest + React Testing Library in `app/`; one passing sample unit test
- [ ] 1.9 Install & configure Playwright in `e2e/`; one passing smoke test against `app`'s static output served locally
- [ ] 1.10 One passing `@axe-core/playwright` a11y scan on the placeholder home page
- [ ] 1.11 Base layout shell in `app/` (header/nav placeholder, footer placeholder, global Tailwind styles) matching mock-ui's shared header/footer
- [ ] 1.12 Root + per-package scripts: `dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`, `test:a11y`
- [ ] 1.13 Git repo initialized, `.gitignore`, initial commit

### Acceptance Criteria
- [ ] `npm install` at repo root resolves both `app` and `e2e` workspace packages
- [ ] `npm run build -w app` produces `app/out/` with no warnings (`output: 'export'` verified)
- [ ] `docs/component-map.md` covers all 12 `mock-ui/*.html` pages with no unmapped shared chrome (header/footer/FABs)
- [ ] `app/components/ui/` and `app/components/layout/` exist as distinct directories matching the component map
- [ ] `npm run lint`, `npm run typecheck`, `npm run test -w app`, `npm run build -w app`, `npm run test:e2e -w e2e` all pass on a from-scratch clone

### Test Requirements
- **Unit:** one passing Vitest + RTL sample test in `app`
- **E2E:** one passing Playwright smoke test against the served static `app/out`, not `next dev`
- **A11y:** one passing `@axe-core/playwright` scan on the placeholder home page, zero critical/serious violations

### References
`MILESTONES.md` §Milestone 1, §0 Workspace layout · `SRS.md` §7 (tech stack), §5.5 (maintainability), `mock-ui/README.md`

---

## Issue: M2 — CI Pipeline (GitHub Actions)

**GitHub Milestone:** M2 — CI Pipeline
**Labels:** `type:ci`
**Depends on:** M1 · **Blocks:** M3, M4 (all)

### Context
Per `MILESTONES.md` §0 sequencing policy, the test suite (M1) must exist before CI, and CI must exist before feature build-out (M4) so no change ever reaches `main` unvetted. This issue wires every check from M1 (lint, typecheck, unit, build, E2E, a11y) plus Lighthouse thresholds into GitHub Actions and gates `main` behind it.

### Scope
**In scope:** `.github/workflows/ci.yml`, jobs for install/lint/typecheck/unit/build/E2E/a11y/Lighthouse, branch protection, README status badge.
**Out of scope:** deployment/CD (M3), feature content (M4).

### Implementation Tasks
- [ ] 2.1 `.github/workflows/ci.yml` triggered on `push` (main) and `pull_request`
- [ ] 2.2 Job: install deps (with npm cache)
- [ ] 2.3 Job: lint + typecheck
- [ ] 2.4 Job: unit/component tests (Vitest), upload coverage as artifact
- [ ] 2.5 Job: static build (`next build`), fail fast if export breaks
- [ ] 2.6 Job: Playwright E2E against the built `out/` (serve static output in CI, cached browser install)
- [ ] 2.7 Job: `@axe-core/playwright` a11y scan (can run inside the E2E job)
- [ ] 2.8 Job: Lighthouse CI against built output, thresholds from `SRS.md` §9 (Perf ≥ 90, SEO ≥ 95, A11y ≥ 95)
- [ ] 2.9 Branch protection on `main`: require the CI workflow to pass before merge
- [ ] 2.10 Status badge in root `README.md`

### Acceptance Criteria
- [ ] A throwaway PR with a deliberate lint error shows a red check
- [ ] Fixing that error shows all jobs green
- [ ] Direct pushes to `main` without passing CI are blocked (branch protection verified)
- [ ] Lighthouse CI enforces Perf ≥ 90, SEO ≥ 95, A11y ≥ 95 and fails the build below threshold
- [ ] E2E/a11y jobs run against the served static `out/`, not `next dev` (`SRS.md` §9)

### Test Requirements
- CI itself **is** the test surface here — every job listed above must run against the workspace packages (`-w app`, `-w e2e`), not a flattened single-package layout
- Verify with a deliberate-failure PR (lint) and a deliberate-fix PR, both observed to produce the correct check state

### References
`MILESTONES.md` §Milestone 2, §0 Sequencing policy · `SRS.md` §9 (Testing Requirements Summary)

---

## Issue: M3 — Docker & Deployment / CD Pipeline

**GitHub Milestone:** M3 — Docker & Deployment / CD Pipeline
**Labels:** `type:infra`
**Depends on:** M2 · **Blocks:** M4 (all)

### Context
A reproducible, containerized build-and-serve path with GitHub Actions handling continuous deployment on merge to `main`, once CI (M2) is green. Docker configuration lives in a dedicated `docker/` folder (not repo root) per the workspace layout in `MILESTONES.md` §0 — the build context is still the repo root (so the image can see the workspace lockfile and `app/`), invoked as `docker build -f docker/Dockerfile .`. `.dockerignore` is the one exception kept at the repo root, since Docker resolves it against the build context rather than the Dockerfile's own directory.

Because this is a static export, Docker/Nginx is one valid hosting path (useful for self-hosted VPS control) — plain static hosts (Netlify/Cloudflare Pages/Vercel static) remain a simpler alternative if self-hosting isn't required. **Confirm the hosting target before building this out fully.**

### Scope
**In scope:** `docker/Dockerfile`, `docker/docker-compose.yml`, root `.dockerignore`, `cd.yml`, GHCR push, deploy + health check, rollback documentation.
**Out of scope:** final hosting-target decision (flagged above as a pre-req), feature pages (M4).

### Implementation Tasks
- [ ] 3.1 Multi-stage `docker/Dockerfile`: stage 1 (Node 20) installs deps + runs `next build` (static export) from `app/`; stage 2 (nginx:alpine) copies `app/out/` and serves it
- [ ] 3.2 `docker/docker-compose.yml` for local preview (`context: ..`, `dockerfile: docker/Dockerfile`)
- [ ] 3.3 `.dockerignore` at repo root — build-context root, not `docker/`
- [ ] 3.4 `.github/workflows/cd.yml`: on merge to `main` (after CI passes) — `docker build -f docker/Dockerfile .`, tag with commit SHA + `latest`
- [ ] 3.5 Push image to GitHub Container Registry (ghcr.io)
- [ ] 3.6 Deploy step: pull + run the image on the target host (SSH action or redeploy webhook)
- [ ] 3.7 Document rollback procedure: redeploy previous image tag
- [ ] 3.8 Health check: container serves `/` with HTTP 200 post-deploy, workflow fails the deploy if not

### Acceptance Criteria
- [ ] A merge to `main` results in an updated container image automatically built, pushed to GHCR, and deployed with zero manual steps
- [ ] The running container serves `/` with HTTP 200 (automated post-deploy health check)
- [ ] Rollback procedure is documented and has been exercised at least once (redeploy previous tag succeeds)
- [ ] `docker compose up` against `docker/docker-compose.yml` from repo root produces a working local preview

### Test Requirements
- CD workflow health-check step (3.8) is the automated test gate for this milestone
- Manual verification: build the image locally with the exact CI command (`docker build -f docker/Dockerfile .`) and confirm it matches what CI produces

### References
`MILESTONES.md` §Milestone 3, §0 Workspace layout (`docker/` folder + `.dockerignore` exception)

---

## Issue: M4 — Feature Build-Out (epic)

**GitHub Milestone:** M4 — Feature Build-Out
**Labels:** `epic`
**Depends on:** M3 · **Blocks:** M5

### Context
Tracking issue for implementing every page/section from `SRS.md` §4, in priority order, each on its own branch. Order is chosen for dependency + business priority: shared shell first (`M4.1`), then the lead-gen-critical Contact page pulled forward (`M4.2`) since sitewide header/footer CTAs (floating WhatsApp/call) need real targets early.

### Scope
This issue tracks the 13 sub-issues below; it has no implementation tasks of its own.

### Implementation Tasks (tracked sub-issues)
- [ ] M4.1 `feat/design-system` — Shared layout, header/nav, footer, base components
- [ ] M4.2 `feat/contact-page` — `/contact`
- [ ] M4.3 `feat/home-page` — `/`
- [ ] M4.4 `feat/plants-catalog` — `/plants`, `/plants/[category]`
- [ ] M4.5 `feat/services-page` — `/services`
- [ ] M4.6 `feat/about-page` — `/about`
- [ ] M4.7 `feat/pots-accessories` — `/pots-accessories`
- [ ] M4.8 `feat/care-guide` — `/care-guide`, `/care-guide/[slug]`
- [ ] M4.9 `feat/gallery` — `/gallery`
- [ ] M4.10 `feat/faq` — `/faq`
- [ ] M4.11 `feat/seo-structured-data` — sitewide JSON-LD/sitemap/robots/OG
- [ ] M4.12 `feat/a11y-perf-audit` — full-site hardening pass
- [ ] M4.13 `feat/cross-browser-qa` — pre-launch QA

### Acceptance Criteria
- [ ] All 13 sub-issues closed
- [ ] All routes in the `SRS.md` §3 site map are live
- [ ] CI green on `main`; deployed container/site reflects the full feature set

### Test Requirements
See each sub-issue — every branch follows the same per-branch workflow (unit tests → implement → E2E scenario → implement → a11y scan → merge), documented once in `MILESTONES.md` §Milestone 4 rather than repeated per sub-issue.

### References
`MILESTONES.md` §Milestone 4 (priority table + per-branch workflow) · `SRS.md` §3 (site map), §4 (functional requirements)

---

## Issue: M4.1 — `feat/design-system`

**GitHub Milestone:** M4 · **Labels:** `type:feature` · **Parent:** M4
**Depends on:** M3 · **Blocks:** M4.2–M4.13

### Context
Everything else in M4 depends on this branch. `mock-ui/`'s 12 pages each repeat the same header, footer, and floating WhatsApp/call buttons inline (per `mock-ui/README.md`, since the mockup has no templating) — this branch extracts that shared chrome into real `app/components/layout/` components once, plus the base `app/components/ui/` atoms every later page reuses.

### Scope
**In scope:** Header (pill-nav + mobile hamburger collapse), Footer, PageShell/layout wrapper, floating WhatsApp/call buttons, base atoms (Button, Card, Container, Section, Chip).
**Out of scope:** any page-specific content (M4.2 onward).

### Implementation Tasks
- [ ] Pull components from `docs/component-map.md` (M1.5); confirm `ui/`/`layout/` split matches what M1.6 defined
- [ ] Write unit/component tests for Header, Footer, Nav, FABs, Button, Card, Container, Section, Chip (red)
- [ ] Implement until unit tests pass (green)
- [ ] Write E2E scenario(s) for sitewide chrome; append to `docs/testcases.md`
- [ ] Implement/fix until E2E scenarios pass; run the a11y scan
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] Header, footer, and floating WhatsApp/call buttons render on a placeholder route and are structurally reusable (not copy-pasted per page) — FR-1.6, FR-10.1
- [ ] Mobile nav collapses to a hamburger below the breakpoint carried over from `mock-ui` (1280px) and is keyboard-operable — NFR-3.4
- [ ] Layout is responsive from 360px to 1920px+ — NFR-6.1
- [ ] Semantic landmarks present (`header`, `nav`, `main`, `footer`) — NFR-3.2
- [ ] `<title>`/meta description settable per route via the Next.js Metadata API from this shell — FR-10.3

### Test Requirements
- **Unit/component:** RTL tests for Header, Footer, Nav (open/close), FABs, and each base `ui/` atom
- **E2E:** Playwright assertion that header/footer/FABs are present and correctly targeted (tel:/wa.me) across at least two placeholder routes
- **A11y:** zero critical/serious axe-core violations on the shell

### References
`SRS.md` FR-1.6, FR-10.1, FR-10.3, NFR-3.2, NFR-3.4, NFR-6.1 · `mock-ui/README.md` (shared header/footer note, navbar rounds 6–7, FAB rounds 8–9)

---

## Issue: M4.2 — `feat/contact-page`

**GitHub Milestone:** M4 · **Labels:** `type:feature` · **Parent:** M4
**Depends on:** M4.1 · **Blocks:** M4.5, M4.11, M4.12, M4.13

### Context
Pulled forward ahead of Home in build order because the sitewide floating WhatsApp/call CTAs (from M4.1) need real targets early, and because this is the site's primary lead-gen conversion point (`SRS.md` §2.2 business goal 3).

### Scope
**In scope:** `/contact` — address/map/hours, click-to-call + WhatsApp deep link, quote form with client-side validation and third-party submission.
**Out of scope:** service-specific pre-fill routing from `/services` (that query-param contract is defined here but wired from the other side in M4.5).

### Implementation Tasks
- [ ] Pull Contact-page components from `docs/component-map.md`
- [ ] Write unit tests for the `zod` validation schema; component tests for form states (idle/submitting/success/error)
- [ ] Implement page + form (react-hook-form + zod, Web3Forms/Formspree submission)
- [ ] Write E2E scenario(s) — submission success path, submission failure path, WhatsApp/tel link correctness; append to `docs/testcases.md`
- [ ] Implement/fix until E2E scenarios pass; run the a11y scan
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] Store address, embedded Google Map, and operating hours display — FR-8.1
- [ ] Click-to-call `tel:` link and `wa.me` deep link with pre-filled message are present and correctly formatted — FR-8.2
- [ ] Form fields (name, phone, email optional, message, optional service-type dropdown) validate client-side before submission — FR-8.3
- [ ] Successful submission shows a confirmation state; failed submission shows an error state plus fallback phone/WhatsApp contact options — FR-8.4
- [ ] Any `target="_blank"` external link (Maps, social) includes `rel="noopener noreferrer"` — NFR-4.2
- [ ] No form-backend secret is committed; only public endpoint keys used per Web3Forms/Formspree design — NFR-4.1

### Test Requirements
- **Unit:** `zod` schema validation tests (required fields, email-optional handling)
- **Component:** form renders each of its states (idle/submitting/success/error) correctly
- **E2E:** submission success path, submission failure path (mocked/forced), WhatsApp/tel link presence and correctness — explicitly required by `SRS.md` §9
- **A11y:** form is keyboard-navigable end to end — NFR-3.4

### References
`SRS.md` FR-8.1–FR-8.4, NFR-4.1, NFR-4.2, §8 External Interfaces (Web3Forms/Formspree, Google Maps embed, wa.me), §9

---

## Issue: M4.3 — `feat/home-page`

**GitHub Milestone:** M4 · **Labels:** `type:feature` · **Parent:** M4
**Depends on:** M4.1 · **Blocks:** M4.11, M4.12, M4.13

### Context
Primary entry point for the site (`SRS.md` §2.3 — "prospective customer browsing" user class). Its category grid links to `/plants/[category]` routes that don't exist yet until M4.4 merges — expected and non-blocking, since these are plain `<Link>`s, not build-time dependencies; they simply 404 until that branch ships.

### Scope
**In scope:** hero, category grid, bestsellers carousel, offers strip, testimonials, gallery preview link.
**Out of scope:** the category/plant pages themselves (M4.4).

### Implementation Tasks
- [ ] Pull Home-page components from `docs/component-map.md`
- [ ] Write unit/component tests for Hero, CategoryGrid, Carousel, OffersStrip, Testimonials (red)
- [ ] Implement until unit tests pass (green)
- [ ] Write E2E scenario(s) for Home; append to `docs/testcases.md`
- [ ] Implement/fix until E2E scenarios pass; run the a11y scan
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] Hero banner/carousel features signature plants + shop name/tagline — FR-1.1
- [ ] "Shop by Category" grid links to each `/plants/[category]` route — FR-1.2
- [ ] Bestsellers/featured-plants carousel renders (via `embla-carousel-react` per `SRS.md` §7.2) — FR-1.3
- [ ] Seasonal offers/announcement strip renders — FR-1.4
- [ ] Static testimonials render — FR-1.5
- [ ] Photo strip/preview links to `/gallery` — FR-1.7
- [ ] Sitewide FABs (from M4.1) remain visible on Home — FR-1.6

### Test Requirements
- **Unit/component:** Hero, CategoryGrid, Carousel, OffersStrip, Testimonials
- **E2E:** Home renders all sections; category grid links resolve to correct hrefs; gallery preview link resolves to `/gallery`
- **A11y:** zero critical/serious violations

### References
`SRS.md` FR-1.1–FR-1.7, §2.2 (business goals), §7.2 (embla-carousel-react)

---

## Issue: M4.4 — `feat/plants-catalog`

**GitHub Milestone:** M4 · **Labels:** `type:feature` · **Parent:** M4
**Depends on:** M4.1 · **Blocks:** M4.11, M4.12, M4.13

### Context
Core content and primary SEO surface (`SRS.md` §2.2 business goal 1). Covers both the catalog hub and the dynamic category pages, statically generated from the typed data file defined in `SRS.md` §6.3.

### Scope
**In scope:** `/plants` hub, `/plants/[category]` dynamic pages, lightbox viewer, the 8 core categories from `SRS.md` §6.1.
**Out of scope:** pots/accessories (M4.7, separate route despite a similar display pattern).

### Implementation Tasks
- [ ] Pull catalog components from `docs/component-map.md`
- [ ] Write unit tests for category/plant data-lookup utilities and component tests for PlantCard/CategoryCard (red)
- [ ] Implement data file (`Plant`, `Category` per `SRS.md` §6.3) + `generateStaticParams` + pages (green)
- [ ] Write E2E scenario(s) — category navigation, lightbox open/close/next-prev; append to `docs/testcases.md`
- [ ] Implement/fix until E2E scenarios pass; run the a11y scan
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] `/plants` displays all 8 core categories (`SRS.md` §6.1) as a navigable grid — FR-3.1
- [ ] Each category page lists plants with photo, name, short description, light/water care icons, and indicative price range — FR-3.2
- [ ] Clicking a plant photo opens a lightbox (`yet-another-react-lightbox` per `SRS.md` §7.2) — FR-3.3
- [ ] No cart/checkout/payment UI anywhere on these pages; each listing has an inquire/contact CTA instead — FR-3.4
- [ ] Category pages are statically generated at build time via `generateStaticParams` from a structured data file — FR-3.5
- [ ] Content lives in a typed data file separate from presentational components — NFR-5.1
- [ ] New categories/plants can be added without new routing code — NFR-5.2

### Test Requirements
- **Unit:** category-filter/data-lookup utilities — explicitly required by `SRS.md` §9
- **Component:** PlantCard, CategoryCard
- **E2E:** category navigation across all 8 categories; lightbox open/close/next-prev
- **A11y:** zero critical/serious violations, including lightbox keyboard operability

### References
`SRS.md` FR-3.1–FR-3.5, §6.1 (category list), §6.3 (data model), NFR-5.1, NFR-5.2, §9

---

## Issue: M4.5 — `feat/services-page`

**GitHub Milestone:** M4 · **Labels:** `type:feature` · **Parent:** M4
**Depends on:** M4.1, M4.2 · **Blocks:** M4.11, M4.12, M4.13

### Context
Second revenue driver after plant sales (`SRS.md` §6.2). Depends on M4.2 because its "Get a Quote" CTA must pre-select a service on the already-built contact form.

### Scope
**In scope:** `/services` listing the 5 core services, quote CTA wired into `/contact`'s service dropdown.
**Out of scope:** the contact form itself (built in M4.2; this branch only supplies the pre-fill contract).

### Implementation Tasks
- [ ] Pull Services-page components from `docs/component-map.md`
- [ ] Write component test verifying the CTA passes the correct service identifier (query param or field) (red)
- [ ] Implement service list + CTA wiring against M4.2's contact form (green)
- [ ] Write E2E scenario — click "Get a Quote" on a service, confirm contact form pre-fills that service; append to `docs/testcases.md`
- [ ] Implement/fix until E2E scenario passes; run the a11y scan
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] All 5 core services (`SRS.md` §6.2) list with a description — FR-5.1
- [ ] Each service's "Get a Quote" CTA routes to `/contact` with the relevant service pre-selected (query param or pre-filled field) — FR-5.1

### Test Requirements
- **Component:** CTA constructs the correct link/query param per service
- **E2E:** end-to-end — click CTA on each service → land on `/contact` → correct service pre-selected in the dropdown
- **A11y:** zero critical/serious violations

### References
`SRS.md` FR-5.1, §6.2 (service list)

---

## Issue: M4.6 — `feat/about-page`

**GitHub Milestone:** M4 · **Labels:** `type:feature` · **Parent:** M4
**Depends on:** M4.1 · **Blocks:** M4.11, M4.12, M4.13

### Context
Trust-building, low-complexity page (`SRS.md` §2.3 — supports both browsing and ready-to-buy user classes by establishing credibility).

### Scope
**In scope:** `/about` — shop story, years in operation, sourcing/growing practices, optional founder/team photos.

### Implementation Tasks
- [ ] Pull About-page components from `docs/component-map.md`
- [ ] Write component/snapshot tests for the About content sections (red)
- [ ] Implement page, sourcing content from a data/content file (green)
- [ ] Write E2E smoke scenario; append to `docs/testcases.md`
- [ ] Implement/fix until it passes; run the a11y scan
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] Shop story, years in operation, and sourcing/growing practices present — FR-2.1
- [ ] Founder/team photos render where provided (optional per FR-2.2, must not break layout if absent)
- [ ] Content sourced from a data/content file, not hardcoded inline — NFR-5.1

### Test Requirements
- **Component:** About content sections render correctly with and without optional team photos
- **E2E:** smoke navigation to `/about`
- **A11y:** zero critical/serious violations

### References
`SRS.md` FR-2.1, FR-2.2

---

## Issue: M4.7 — `feat/pots-accessories`

**GitHub Milestone:** M4 · **Labels:** `type:feature` · **Parent:** M4
**Depends on:** M4.1 · **Blocks:** M4.11, M4.12, M4.13

### Context
Secondary catalog, deliberately reusing the plant-listing display pattern from M4.4 rather than inventing a new one.

### Scope
**In scope:** `/pots-accessories` — pots/planters, soil & fertilizers, gardening tools, decorative accessories.

### Implementation Tasks
- [ ] Pull component references from `docs/component-map.md`; confirm reuse of the Card pattern from M4.4/M4.1 rather than a new component
- [ ] Write component tests for the product-group listing (red)
- [ ] Implement page (green)
- [ ] Write E2E smoke scenario; append to `docs/testcases.md`
- [ ] Implement/fix until it passes; run the a11y scan
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] All 4 product groups list (pots/planters, soil & fertilizers, tools, decorative accessories) — FR-4.1
- [ ] Same display pattern as plant listings (photo, name, description, inquire CTA), implemented via the shared Card component rather than a bespoke one — FR-4.2

### Test Requirements
- **Component:** product-group listing reuses the shared Card/PlantCard-equivalent component
- **E2E:** smoke navigation to `/pots-accessories`
- **A11y:** zero critical/serious violations

### References
`SRS.md` FR-4.1, FR-4.2

---

## Issue: M4.8 — `feat/care-guide`

**GitHub Milestone:** M4 · **Labels:** `type:feature` · **Parent:** M4
**Depends on:** M4.1 · **Blocks:** M4.11, M4.12, M4.13

### Context
SEO content hub; can ship after the core catalog since it supports discovery rather than direct conversion. Covers both the article hub and individual statically-generated articles.

### Scope
**In scope:** `/care-guide` hub, `/care-guide/[slug]` article pages, per-article SEO metadata.

### Implementation Tasks
- [ ] Pull Care Guide components from `docs/component-map.md`
- [ ] Write unit test for slug-based article lookup; component tests for the article list (red)
- [ ] Implement data file + `generateStaticParams` + hub/article pages + per-article Metadata API usage (green)
- [ ] Write E2E scenario — hub → article navigation, verify per-article `<title>`/meta differ; append to `docs/testcases.md`
- [ ] Implement/fix until it passes; run the a11y scan
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] Hub lists articles with title, summary, thumbnail — FR-6.1
- [ ] Articles are statically generated (component or MDX-driven) via `generateStaticParams` — FR-6.2
- [ ] Each article defines unique SEO metadata (title, description) via the Next.js Metadata API — FR-6.3, FR-10.3

### Test Requirements
- **Unit:** slug-based data lookup
- **Component:** article list rendering
- **E2E:** hub → article navigation; assert `<title>`/meta description differ per article
- **A11y:** zero critical/serious violations

### References
`SRS.md` FR-6.1–FR-6.3, FR-10.3

---

## Issue: M4.9 — `feat/gallery`

**GitHub Milestone:** M4 · **Labels:** `type:feature` · **Parent:** M4
**Depends on:** M4.1 · **Blocks:** M4.11, M4.12, M4.13

### Context
Supporting content page, already linked from Home's preview strip (M4.3).

### Scope
**In scope:** `/gallery` — responsive photo grid with lightbox and next/previous navigation.

### Implementation Tasks
- [ ] Pull Gallery components from `docs/component-map.md`
- [ ] Write component test for the responsive grid (red)
- [ ] Implement page + lightbox (green)
- [ ] Write E2E scenario — lightbox open, next/previous, keyboard navigation; append to `docs/testcases.md`
- [ ] Implement/fix until it passes; run the a11y scan
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] Responsive photo grid renders (nursery, plant setups, customer installations) — FR-7.1
- [ ] Lightbox supports next/previous navigation — FR-7.2
- [ ] Grid is responsive from 360px to 1920px+ — NFR-6.1
- [ ] Lightbox is keyboard-navigable (arrow keys, escape) — NFR-3.4

### Test Requirements
- **Component:** grid rendering
- **E2E:** lightbox open/close, next/previous, keyboard navigation
- **A11y:** zero critical/serious violations

### References
`SRS.md` FR-7.1, FR-7.2, NFR-3.4, NFR-6.1

---

## Issue: M4.10 — `feat/faq`

**GitHub Milestone:** M4 · **Labels:** `type:feature` · **Parent:** M4
**Depends on:** M4.1 · **Blocks:** M4.11, M4.12, M4.13

### Context
Supporting content page — reduces pre-purchase/pre-inquiry friction by answering common questions before a visitor calls or messages.

### Scope
**In scope:** `/faq` — accordion covering care basics, delivery, service areas, return/replacement policy.

### Implementation Tasks
- [ ] Pull FAQ components from `docs/component-map.md`
- [ ] Write component test for accordion expand/collapse and keyboard interaction (red)
- [ ] Implement accordion + content (green)
- [ ] Write E2E smoke scenario; append to `docs/testcases.md`
- [ ] Implement/fix until it passes; run the a11y scan
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] Accordion covers care basics, delivery, service areas, and return/replacement policy for plants — FR-9.1
- [ ] Accordion is keyboard-navigable (expand/collapse via keyboard) — NFR-3.4

### Test Requirements
- **Component:** accordion expand/collapse, keyboard interaction
- **E2E:** smoke navigation to `/faq`
- **A11y:** zero critical/serious violations

### References
`SRS.md` FR-9.1, NFR-3.4

---

## Issue: M4.11 — `feat/seo-structured-data`

**GitHub Milestone:** M4 · **Labels:** `type:seo` · **Parent:** M4
**Depends on:** M4.2–M4.10 (all content pages must exist) · **Blocks:** M5

### Context
Cuts across every page, so it's done once all content pages exist rather than per-branch. Directly serves `SRS.md` §2.2 business goal 1 (local SEO presence).

### Scope
**In scope:** JSON-LD `GardenStore` structured data, `sitemap.xml`, `robots.txt`, Open Graph/Twitter Card metadata across all top-level routes.

### Implementation Tasks
- [ ] Write unit test verifying the generated JSON-LD object shape (red)
- [ ] Implement JSON-LD `GardenStore` on Home + Contact (green)
- [ ] Implement build-time `sitemap.xml` and `robots.txt`
- [ ] Implement OG/Twitter Card metadata for all top-level pages
- [ ] Write E2E/Lighthouse scenario asserting meta tags present per route and SEO score threshold; append to `docs/testcases.md`
- [ ] Implement/fix until scenarios pass
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] JSON-LD `GardenStore` (a `LocalBusiness` subtype) present on Home and Contact, including `name`, `address`, `geo`, `openingHours`, `telephone`, `image` — NFR-2.1
- [ ] `sitemap.xml` and `robots.txt` generated at build time, covering every route in `SRS.md` §3 — NFR-2.2
- [ ] Open Graph and Twitter Card metadata present on all top-level pages — NFR-2.3
- [ ] Lighthouse SEO score ≥ 95 — NFR-2.4
- [ ] JSON-LD validates with zero errors against a schema.org/structured-data validator

### Test Requirements
- **Unit:** JSON-LD object shape/field presence
- **E2E/Lighthouse:** meta tag presence per route; SEO score ≥ 95 enforced via the Lighthouse CI job from M2.8
- **Manual:** structured-data validator check on Home and Contact

### References
`SRS.md` NFR-2.1–NFR-2.4, §3 (site map)

---

## Issue: M4.12 — `feat/a11y-perf-audit`

**GitHub Milestone:** M4 · **Labels:** `type:a11y` · **Parent:** M4
**Depends on:** M4.2–M4.10 (all content pages must exist) · **Blocks:** M5

### Context
Final hardening pass. Per-page a11y scans already ran incrementally as part of each branch's DoD (`MILESTONES.md` §Milestone 4 per-branch workflow) — this issue is the full-site sweep plus performance budget enforcement that only makes sense once every page exists.

### Scope
**In scope:** full-site axe-core sweep, Lighthouse Performance pass, image lazy-loading/optimization audit, JS bundle audit.

### Implementation Tasks
- [ ] Run full-site axe-core sweep across every route in `SRS.md` §3 (red — expect findings)
- [ ] Fix findings until zero critical/serious violations sitewide (green)
- [ ] Audit and fix image lazy-loading/pre-optimization (WebP, responsive sizes) below the fold
- [ ] Audit JS bundle per route; remove/replace any dependency beyond `SRS.md` §7's supporting-library list
- [ ] Re-run Lighthouse CI (from M2.8) against every route; fix until thresholds hold
- [ ] Document findings/fixes in `docs/testcases.md`
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] `@axe-core/playwright` reports zero critical/serious violations on **every** route, not just the ones scanned incrementally per branch — NFR-3.3
- [ ] Lighthouse Performance ≥ 90 (mobile) on Home and a representative category page — NFR-1.1
- [ ] Images lazy-loaded below the fold and pre-optimized (WebP, responsive sizes) at build time — NFR-1.2
- [ ] No unnecessary heavy client library beyond what's specified in `SRS.md` §7 — NFR-1.3

### Test Requirements
- **A11y:** full-site axe-core sweep, all routes, zero critical/serious
- **Performance:** Lighthouse CI thresholds re-verified sitewide
- **Manual:** bundle-size review of `next build` output per route

### References
`SRS.md` NFR-1.1–NFR-1.3, NFR-3.3, §7 (approved dependency list)

---

## Issue: M4.13 — `feat/cross-browser-qa`

**GitHub Milestone:** M4 · **Labels:** `type:qa` · **Parent:** M4
**Depends on:** M4.2–M4.10 (all content pages must exist) · **Blocks:** M5

### Context
Pre-launch QA — manual and automated verification across the target browser/viewport matrix, closing out M4 before the site is considered feature-complete.

### Scope
**In scope:** automated multi-browser Playwright coverage, manual QA pass across target browsers/viewports.

### Implementation Tasks
- [ ] Configure Playwright projects for Chromium, WebKit, and Firefox in `e2e/`
- [ ] Run the full E2E suite (all scenarios accumulated in `docs/testcases.md` across M4.1–M4.12) against all three projects in CI
- [ ] Document and execute a manual QA checklist for the latest two major versions of Chrome/Safari/Edge/Firefox (Playwright's WebKit engine doesn't always catch real-Safari/iOS quirks)
- [ ] Fix any browser-specific findings
- [ ] Rebase → PR → CI green → merge

### Acceptance Criteria
- [ ] Site verified on the latest two major versions of Chrome, Safari, Edge, and Firefox — NFR-6.2
- [ ] Layout is fully responsive from 360px to 1920px+ with no breakage on any target browser — NFR-6.1
- [ ] Multi-browser Playwright run is part of CI, not a one-off manual step

### Test Requirements
- **E2E:** full suite run against Chromium, WebKit, and Firefox projects
- **Manual:** documented checklist covering real Safari/iOS and Edge, executed and signed off

### References
`SRS.md` NFR-6.1, NFR-6.2

---

## Issue: M5 — Launch Readiness

**GitHub Milestone:** M5 — Launch Readiness
**Labels:** `type:qa`, `type:docs`
**Depends on:** M4 (all sub-issues closed) · **Blocks:** none (final milestone)

### Context
Post-M4 launch pass: swap placeholder content for real shop data, re-verify performance under real (heavier) assets, submit to search engines, confirm analytics and domain/HTTPS, and close out the two documentation deliverables (user manual, monorepo docs) added in this milestone's rework.

### Scope
**In scope:** real-content pass, Lighthouse re-verification, Search Console/sitemap submission, analytics verification, domain/HTTPS confirmation, user manual, monorepo documentation.

### Implementation Tasks
- [ ] 5.1 Final content pass with real shop data (address, hours, phone, actual plant/service photography) replacing placeholders
- [ ] 5.2 Lighthouse CI thresholds re-verified on final content (real images are heavier than placeholders)
- [ ] 5.3 Google Search Console + sitemap submission
- [ ] 5.4 Analytics verified firing correctly in production
- [ ] 5.5 Domain + HTTPS confirmed on the deployment target
- [ ] 5.6 User manual (`docs/user-manual.md`): site navigation and content-update workflow (plants/services/pricing) for shop staff, written against the finished production site
- [ ] 5.7 Monorepo documentation pass: root `README.md` covers the `app`/`e2e`/`docker`/`docs` workspace layout, per-package scripts, and Node version requirement

### Acceptance Criteria
- [ ] No placeholder text/images remain anywhere on the production site (manual/grep sweep)
- [ ] Lighthouse thresholds (Perf ≥ 90, SEO ≥ 95, A11y ≥ 95) still hold against real-content build weight
- [ ] Sitemap submitted and accepted in Google Search Console
- [ ] Analytics events verified firing in production (network request check)
- [ ] Production domain resolves over valid HTTPS
- [ ] `docs/user-manual.md` exists and covers navigation + content-update workflow
- [ ] Root `README.md` documents the workspace layout, per-package scripts, and Node version requirement

### Test Requirements
- **Automated:** Lighthouse CI re-run against the production build (5.2)
- **Manual:** placeholder-content sweep, Search Console submission confirmation, analytics network-request check, HTTPS certificate check

### References
`MILESTONES.md` §Milestone 5, §0 Workspace layout

---
