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

## Feature: Contact page (M4.2 — `feat/contact-page`, issue #6)

FR refs: FR-8.1–FR-8.4 · NFR refs: NFR-4.1, NFR-4.2

### Unit/component tests

| ID | Component | Description |
|----|-----------|-------------|
| U12 | `contactFormSchema` (zod) | Accepts a valid payload with empty optional email; accepts a valid email; rejects a malformed email; requires non-empty name; requires a plausible phone number; requires a ≥10-char message; allows `service` to be omitted |
| U13 | `SectionHead` | Renders eyebrow/heading/intro; renders as `h1` or `h2` on request; omits eyebrow/intro when not provided |
| U14 | `FormStatus` | Renders nothing when idle; renders submitting/success messages; renders an error message with `tel:`/`wa.me` fallback links |
| U15 | `InfoList` | Renders the store address, a `tel:` link, and a `wa.me` link with `target="_blank"`/`rel="noopener noreferrer"` |
| U16 | `HoursTable` | Renders every configured hours row |
| U17 | `ContactForm` | Renders all fields with "General Inquiry" selected by default; pre-selects the service named by a `?service=` query param; shows validation errors and never calls the form backend when required fields are missing; shows success state on a successful (mocked) submission; shows error state on a failed (mocked) submission |

### E2E scenarios (Given/When/Then)

**E7 — Contact page shows address, hours, and correctly targeted links**
- Given: `/contact` is built and served
- When: the page loads
- Then: the store address and hours are visible, the phone link targets `tel:+919876543210`, and the WhatsApp link targets `https://wa.me/919876543210...` with `target="_blank"` and `rel="noopener noreferrer"`

**E8 — `?service=` query param pre-fills the quote form's service dropdown**
- Given: `/contact?service=amc` is loaded
- When: the page loads
- Then: the "I'm interested in" dropdown is pre-set to "Plant Maintenance (AMC)" (the M4.5/#9 integration contract)

**E9 — Successful form submission shows a confirmation state**
- Given: the Web3Forms endpoint is mocked to return `{ success: true }`
- When: all required fields are filled in and the form is submitted
- Then: a success status message is shown

**E10 — Failed form submission shows an error state with fallback contact options**
- Given: the Web3Forms endpoint is mocked to return a failure response
- When: all required fields are filled in and the form is submitted
- Then: an error alert is shown with working `tel:`/`wa.me` fallback links

**E11 — Empty required fields block submission**
- Given: the form is untouched
- When: Send Message is clicked
- Then: a validation error is shown and the form backend is never called

### A11y scenarios

**A2 — Zero critical/serious axe-core violations on `/contact`**
- Given: `/contact` is built and served
- When: an axe-core scan runs against the page
- Then: no violation with impact `critical` or `serious` is reported
- Note: an earlier draft nested `dt`/`dd` inside a wrapping `<div>` under `<dl>` in `InfoList`, which axe correctly flagged (`dlitem`, serious) as not being a direct child of the list — fixed by switching to a plain `<ul>`/`<li>` structure instead of forcing definition-list semantics onto a layout that needed an icon column.

## Feature: Home page (M4.3 — `feat/home-page`, issue #7)

FR refs: FR-1.1–FR-1.5, FR-1.7 · NFR refs: NFR-3.1 (alt text)

### Unit/component tests

| ID | Component | Description |
|----|-----------|-------------|
| U18 | `PlaceholderImage` | Renders an image with the given alt text; applies a gold tint overlay when requested |
| U19 | `CategoryCard` | Links to `/plants/[category-slug]`; renders the category name and description |
| U20 | `OfferStrip` | Renders heading, body, and CTA link |
| U21 | `HeroFull` | Renders heading/lead/both CTAs; renders the three stat highlights |
| U22 | `BestsellerCard` | Renders plant name, care chips, price range; View links to the plant's category route |
| U23 | `BestsellersCarousel` | Renders a card for every plant passed in, plus Prev/Next controls |
| U24 | `ServicesTeaser` | Renders all three teaser cards, each linking to `/services` |
| U25 | `TestimonialCard` | Renders as a `<blockquote>` with quote, author name, and role |
| U26 | `GalleryPreviewStrip` | Renders an image for every photo passed in |
| U27 | `NotFound` (`app/not-found.tsx`) | Renders the wilted-away heading with links back to Home and Plants |

### E2E scenarios (Given/When/Then)

**E12 — Home renders all major sections**
- Given: `/` is built and served
- When: the page loads
- Then: hero, offer strip, category grid, bestsellers, services teaser, testimonials, gallery preview, and CTA band headings are all visible

**E13 — Category grid links resolve to real category routes**
- Given: `/` is built and served
- When: the page loads
- Then: each of the 4 featured category cards links to its real `/plants/[category]` route (may 404 until #8 ships — accepted per issue scope)

**E14 — Gallery preview strip links to `/gallery`**
- Given: `/` is built and served
- When: the page loads
- Then: "View Full Gallery" links to `/gallery`

**E15 — Bestsellers carousel Prev/Next controls are keyboard-operable**
- Given: a mobile viewport (390×844) where not all bestseller cards fit on screen
- When: the page loads
- Then: Prev starts disabled and Next enabled; focusing Next and pressing Enter scrolls the carousel, enabling Prev

**E16 — Custom 404 shows the wilted-away page**
- Given: an unmatched route is requested
- When: the page loads
- Then: "This Page Has Wilted Away" is shown with links back to Home and Plants (closes the FR-10.2 gap — no other M4 issue owned this)

### A11y scenarios

**A3 — Zero critical/serious axe-core violations on `/` (Home)**
- Given: `/` is built and served
- When: an axe-core scan runs against the page
- Then: no violation with impact `critical` or `serious` is reported
- Note: caught a real `color-contrast` violation (serious) on `Button`'s existing `accent` variant (`bg-amber-600` + white text = 3.19:1, needs 4.5:1) — first page to actually render that variant. Fixed at the source (`bg-amber-700`/`hover:bg-amber-800`) rather than avoiding the variant, since it's shared by any future page using `variant="accent"`.
