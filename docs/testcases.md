# Test Scenarios

Built up incrementally, one Milestone 4 branch at a time (`docs/MILESTONES.md` §M4 per-branch
workflow, step 4). Each feature section lists the unit/component tests (Vitest + RTL) and the
E2E/a11y scenarios (Playwright + axe-core) added on that branch, in Given/When/Then form for the
latter two.

## Feature: Sitewide design-system chrome (M4.1 — `feat/design-system`, issue #5)

FR refs: FR-1.6, FR-10.1, FR-10.3 · NFR refs: NFR-3.2, NFR-3.4, NFR-6.1

### Unit/component tests

| ID | Component | Description |
|----|-----------|-------------|
| U1 | `Header` | Renders semantic `header`/`nav` landmarks with all 8 primary links + Contact CTA |
| U2 | `Header` | Hamburger toggle starts closed (`aria-expanded="false"`, nav `data-state="closed"`) |
| U3 | `Header` | Hamburger toggle opens the nav via keyboard activation (focus + Enter) |
| U4 | `Header` | Escape closes the open nav |
| U5 | `Header` | Activating a nav link closes the open nav |
| U6 | `Footer` | Renders a semantic `footer` landmark |
| U7 | `Footer` | Renders the Explore/Company link groups with correct hrefs |
| U8 | `Footer` | Renders a working `tel:` link for the visit-us phone number |
| U9 | `FabGroup` | WhatsApp FAB targets `https://wa.me/<number>` |
| U10 | `FabGroup` | Call FAB targets a `tel:` link |
| U11 | `Card` / `Container` / `Section` / `Chip` | Render children and merge custom `className` with base styles |

### E2E scenarios (Given/When/Then)

**E1 — Shared chrome renders on every route**
- Given: a placeholder route (`/` or `/about`) is built and served
- When: the page loads
- Then: the header (`banner`), main (`main`), and footer (`contentinfo`) landmarks are visible, and the WhatsApp/call FABs point at real `wa.me`/`tel:` targets

**E6 — Each route defines its own `<title>` via the Metadata API**
- Given: `/` and `/about` are built and served
- When: each page loads
- Then: each resolves the `<title>` set by its own route's `metadata` export, and the two titles differ from each other

**E2 — Mobile nav collapses to a hamburger below 1280px**
- Given: the viewport is mobile-sized (390×844)
- When: the page loads
- Then: the primary nav is closed (`data-state="closed"`) and its links are not visible until the hamburger is opened

**E3 — Hamburger opens and closes the mobile nav**
- Given: the viewport is mobile-sized and the nav is closed
- When: the hamburger button is clicked
- Then: the nav opens (`data-state="open"`, links become visible) and the same button (now labeled "Close menu") closes it again on a second click

**E4 — Escape closes the open mobile nav**
- Given: the viewport is mobile-sized and the hamburger has been opened
- When: Escape is pressed
- Then: the nav closes (`data-state="closed"`)

**E5 — Desktop viewport shows the nav without a hamburger**
- Given: the viewport is desktop-sized (1440×900, ≥1280px)
- When: the page loads
- Then: the primary nav links are visible and the hamburger toggle is not rendered/visible

### A11y scenarios

**A1 — Zero critical/serious axe-core violations on the shell**
- Given: `/` and `/about` are built and served
- When: an axe-core scan runs against each page
- Then: no violation with impact `critical` or `serious` is reported
