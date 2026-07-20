# Component Map

Page-by-page walk of every `mock-ui/*.html` prototype against `SRS.md` §4, recording every
shared and page-unique UI piece. This is the source of truth driving the `app/components/ui/`
vs `app/components/layout/` split (M1 task 1.6) and the component reuse expected throughout
Milestone 4.

Mock-ui has no templating — header, footer, and the floating action buttons are duplicated
byte-for-byte in every HTML file. Confirmed identical (only the active-nav-link position and
`<title>` differ) across all 12 pages.

## Shared sitewide chrome

| Component | Source markup | Notes |
|---|---|---|
| `Header` | `header.site-header` → `.header-inner` (logo / `nav.pill-nav` / cta+hamburger) | 8 nav links (Home, About, Plants, Pots & Accessories, Services, Care Guide, Gallery, FAQ) — Contact is reached via the header CTA button, not the nav list |
| `Footer` | `footer.site-footer` → `.footer-grid` (Brand+social / Explore links / Company links / Visit Us) + `.footer-bottom` | Identical on all 12 pages |
| `FloatingActions` | `.fab-group` → `.fab.fab-whatsapp` + `.fab.fab-call` | Real `wa.me`/`tel:` links on every page |
| `ReadingProgress` | `.reading-progress` (fixed, appears before `<header>`) | Only on `care-guide-article.html` — layout-adjacent but page-scoped to the article template |

## Pages

| Mock-ui page | Route | SRS ref | Shared chrome | Page-specific components | Notes |
|---|---|---|---|---|---|
| `index.html` | `/` | §4.1 Home (FR-1.1–1.7) | Header, Footer, FloatingActions | HeroFull (parallax bg, scrim, stats), OfferStrip, CategoryGrid (category cards), CardGrid of bestseller cards, CardGrid of text-only service teaser cards, TestimonialGrid, GalleryPreviewStrip, CTA band | Richest page for hero/teaser variants |
| `about.html` | `/about` | §4.2 About (FR-2.1–2.2) | Header, Footer, FloatingActions, Breadcrumb | HeroSplit (glow+photo), StoryGrid (image+text), CardGrid of text-only practice cards, StatGrid, TeamCardGrid | Distinct hero from Home (split, not full-bleed); distinct StatGrid from Home's `.hero-stats` |
| `plants.html` | `/plants` | §4.3 Plant Catalog hub (FR-3.1) | Header, Footer, FloatingActions, Breadcrumb, SectionHead | CategoryGrid (8 categories, reuses Home's category card) | OfferStrip reused (WhatsApp variant) |
| `plants-category.html` | `/plants/[category]` | §4.3 Category page (FR-3.2–3.5) | Header, Footer, FloatingActions, Breadcrumb, SectionHead, TagNote | CardGrid of canonical ProductCard (photo, desc, ChipRow, price, "Inquire" CTA) | OfferStrip reused (call variant); `TagNote` is a mock-only dev callout, drop in real build |
| `pots-accessories.html` | `/pots-accessories` | §4.4 (FR-4.1–4.2) | Header, Footer, FloatingActions, Breadcrumb, SectionHead | 3× CardGrid of ProductCard (no-chip variant) across Pots/Soil/Tools sections | Same ProductCard as plants-category, minus ChipRow |
| `services.html` | `/services` | §4.5 (FR-5.1) | Header, Footer, FloatingActions, Breadcrumb, SectionHead | CardGrid of ServiceCard (icon, desc, price chip, "Get a Quote" CTA), text-only "Coming Soon" teaser | |
| `care-guide.html` | `/care-guide` | §4.6 Care Guide hub (FR-6.1) | Header, Footer, FloatingActions, Breadcrumb, SectionHead | CardGrid of ArticleCard (thumbnail, title, excerpt) | |
| `care-guide-article.html` | `/care-guide/[slug]` | §4.6 Article page (FR-6.2–6.3) | Header, Footer, FloatingActions, ReadingProgress, Breadcrumb, TagNote | ChipRow (tags), ArticleByline, Callout, ArticleLayout (Prose + sticky ArticleSidebar with TocCard×2), ShareRow, RelatedArticles (ArticleCard, no excerpt) | Most component-dense page; reuses ArticleCard from care-guide.html |
| `gallery.html` | `/gallery` | §4.7 (FR-7.1–7.2) | Header, Footer, FloatingActions, Breadcrumb, SectionHead | BentoGallery (5 aspect-ratio cell types: hero/portrait/square/landscape/banner) | Page-unique showcase grid |
| `contact.html` | `/contact` | §4.8 (FR-8.1–8.4) | Header, Footer, FloatingActions, Breadcrumb, SectionHead | InfoList (address/phone/WhatsApp), HoursTable, ContactForm (labeled fields, success/error `FormStatus` states) | Header CTA shows `.active` here instead of a nav link |
| `faq.html` | `/faq` | §4.9 (FR-9.1) | Header, Footer, FloatingActions, Breadcrumb, SectionHead | Accordion (native `details`/`summary`, 6 items) | |
| `404.html` | `/404` | §4.10 Sitewide (FR-10.2) | Header, Footer, FloatingActions | Simple centered eyebrow/heading/actions block | Simplest page — no breadcrumb, no SectionHead |

## Cross-page reusable components

| Component | Appears on | Notes |
|---|---|---|
| `Header` / `PillNav` / `HeaderCta` | all 12 | `components/layout/` |
| `Footer` | all 12 | `components/layout/` |
| `FloatingActions` | all 12 | `components/layout/` |
| `Breadcrumb` | all except Home, 404 | `components/ui/` |
| `SectionHead` (eyebrow + heading + intro) | Home, About, Plants, PlantsCategory, PotsAccessories, Services, CareGuide, CareGuideArticle, Gallery, Contact, FAQ | `components/ui/` |
| `Card` (base glass panel) | every card variant below composes this | `components/ui/`, flexible primitive |
| — CategoryCard | Home (4×), Plants (8×) | round icon tile + title + blurb |
| — ProductCard (with chips, "Inquire" CTA) | plants-category.html | canonical product card |
| — ProductCard (no-chip variant) | pots-accessories.html (×3) | |
| — Bestseller card (chips + outline CTA) | Home | |
| — Text-only card (emoji heading, no image/CTA) | Home (services teaser), About (practices) | |
| — TeamCard | About | photo + name + role |
| — ServiceCard | Services | icon + desc + price chip + accent CTA |
| — ArticleCard | care-guide.html, related-articles on care-guide-article.html | thumbnail + title (+ excerpt on hub only) |
| `Testimonial` | Home only | same glass-panel family as `Card` |
| `OfferStrip` | Home, Plants, PlantsCategory | 3 content variants |
| `Chip` / `ChipRow` | Home (bestsellers), PlantsCategory (product chips), Services (price chip), CareGuideArticle (tags) | `components/ui/` |
| `PlaceholderImage` (+ `gold`/`tall`/`square` modifiers) | every page | becomes real `next/image` later |
| `Button` (primary/accent/outline/outline-light, sm/block sizes) | every page | `components/ui/` |
| `Accordion` / `AccordionItem` | FAQ (6×) | generic enough to reuse elsewhere later |
| `CardGrid` (grid + horizontal-scroll-on-mobile wrapper) | nearly every listing section | layout utility wrapping `Card` collections |
| `HeroFull` | Home only | full-bleed parallax hero |
| `HeroSplit` | About only | split layout hero |
| `HeroStats` | Home only | distinct from About's `StatGrid` |
| `StatGrid` | About only | |
| `GalleryPreviewStrip` | Home only | distinct from Gallery's `BentoGallery` |
| `BentoGallery` | Gallery only | 5 aspect-ratio cell types |
| `InfoList` / `HoursTable` / `ContactForm` / `FormStatus` | Contact only | |
| `ArticleByline` / `Callout` / `ArticleLayout` / `ArticleSidebar` / `TocCard` / `ShareRow` | CareGuideArticle only | |
| `TagNote` | PlantsCategory, CareGuideArticle | mock-only dynamic-route callout, not ported to the real build |

A shared visual family worth a common base in `components/ui/` (`GlassPanel`): `Card`, `Testimonial`,
`AccordionItem`, `Callout`, and `TocCard` all use identical glass background/border/blur/shadow tokens
in `mock-ui/assets/css/style.css`.

## `app/components/ui/` vs `app/components/layout/` (M1 scaffold scope)

M1 only scaffolds the directory structure and a minimal set of atoms/organisms needed for the
placeholder layout shell (task 1.11) and the sample unit test (task 1.8). The full inventory
above is the reference Milestone 4 branches pull from as each page is built — most of these
components are **not** created in M1.

**`components/ui/` (M1 scaffold):** `Button`, `Card`, `Container`, `Section`, `Chip`, `Breadcrumb`,
`ScrollRow`, `Accordion`.

**`components/layout/` (M1 scaffold):** `Header`, `Footer`, `FabGroup` (+ `WhatsAppFab`, `CallFab`),
`PageShell`.

Everything else in the tables above (`HeroFull`, `ProductCard`, `BentoGallery`, `ContactForm`,
article-layout pieces, etc.) is built incrementally starting with `feat/design-system` (M4.1) and
each subsequent per-page M4 branch, per the per-branch workflow in `docs/MILESTONES.md`.

## Update (M4.2 — `feat/contact-page`)

- `SectionHead` (eyebrow + heading + intro) added to `components/ui/` — not part of the M1 scaffold
  list above, but needed starting with this branch and reused by every page listed in the
  "Cross-page reusable components" table.
- Page-specific, non-reusable components now live under `components/page/<route>/` (e.g.
  `components/page/contact/{ContactForm,FormStatus,InfoList,HoursTable}.tsx`), distinct from the
  cross-page `components/ui/`/`components/layout/` split — keeps single-page components out of the
  shared atom directories.
- `lib/site-config.ts` is the single NAP (name/address/phone/hours/WhatsApp/maps-embed) source of
  truth; `Header`/`Footer`/`FabGroup` and all page-level contact info now read from it instead of
  hardcoding values (this also fixed a pre-existing address drift between `Footer.tsx` and
  `mock-ui/contact.html`).

## Update (M4.3 — `feat/home-page`)

- `PlaceholderImage` (wraps `next/image` around a local placeholder SVG, `gold` variant), `CategoryCard`,
  and `OfferStrip` added to `components/ui/` — cross-page atoms reused by Plants/Pots &
  Accessories/Services once those branches ship.
- Home-page-only composition lives in `components/page/home/` (`HeroFull`, `BestsellerCard`,
  `BestsellersCarousel`, `ServicesTeaser`, `TestimonialCard`, `GalleryPreviewStrip`), matching the
  `components/page/<route>/` convention started in M4.2.
- `app/not-found.tsx` added (FR-10.2 custom 404) — bundled into this branch since no M4 issue
  explicitly owned it and Home's category grid already needed 404-tolerant linking.
- `data/{categories,plants,testimonials,gallery}.ts` authored in full (all 8 categories, though only
  4 plants seeded so far — the rest arrive in M4.4/`feat/plants-catalog`).

## Update (M4.4 — `feat/plants-catalog`)

- `ChipRow`, `ProductCard`, and `PhotoLightbox` (wraps `yet-another-react-lightbox`) added to
  `components/ui/` — the canonical product-listing card, reused by Home's `BestsellerCard`
  (retrofitted onto it, per M4.1's plan) and by Pots & Accessories (M4.7, chips omitted — the
  "no-chip variant" already anticipated in this doc).
- `data/plants.ts` extended to all 8 categories (`getPlantsByCategory`, `getBestsellers`); every
  category has at least one plant, unit-tested directly (SRS §9's "data-lookup utilities").
- `components/page/plants/CategoryProductGrid.tsx` — the client-side wrapper tying `ProductCard`
  grid + `PhotoLightbox` state together for `/plants/[category]`.
- `app/plants/[category]/page.tsx` establishes the project's dynamic-route pattern
  (`generateStaticParams` + `export const dynamicParams = false` + `generateMetadata` awaiting a
  `Promise<params>`) — reused as-is by `/care-guide/[slug]` (M4.8).

## Update (M4.7 — `feat/pots-accessories`)

- `/pots-accessories` reuses `ProductCard` with `chips` omitted (the no-chip variant already
  anticipated in M4.4's plan) via a small `components/page/pots-accessories/ProductGroupSection.tsx`
  wrapper — no new card component, per FR-4.2's explicit requirement.
- FR-4.1's 4 groups vs. the mock's merged "Gardening Tools & Decor" section: split into "Gardening
  Tools" and "Decorative Accessories" to match the literal 4-group acceptance criterion (see
  `docs/testcases.md`'s content note on this branch).
