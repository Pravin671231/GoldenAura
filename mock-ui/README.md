# Golden Aura — Mock UI

Static HTML/CSS prototype of every page in the site map defined in [docs/SRS.md](../docs/SRS.md) §3. Plain HTML/CSS, no build step, no framework — open any file directly in a browser to review layout, content structure, and IA before the real Next.js build begins.

**Not production code.** All photos are labeled placeholder blocks (real photography comes from the shop later), all pricing/content is illustrative, and the contact form doesn't actually submit — it displays both the success and error UI states inline for review.

## How to view
Open `index.html` directly in a browser, or serve the folder locally, e.g.:
```
npx serve mock-ui
```

## Pages → SRS mapping

| File | Route (future) | SRS section |
|---|---|---|
| `index.html` | `/` | §4.1 Home (FR-1.1–1.7) |
| `about.html` | `/about` | §4.2 About (FR-2.1–2.2) |
| `plants.html` | `/plants` | §4.3 Plant Catalog hub (FR-3.1) |
| `plants-category.html` | `/plants/[category]` | §4.3 Category page (FR-3.2–3.5) — example: Indoor & Foliage Plants |
| `pots-accessories.html` | `/pots-accessories` | §4.4 (FR-4.1–4.2) |
| `services.html` | `/services` | §4.5 (FR-5.1) |
| `care-guide.html` | `/care-guide` | §4.6 Care Guide hub (FR-6.1) |
| `care-guide-article.html` | `/care-guide/[slug]` | §4.6 Article page (FR-6.2–6.3) — example article |
| `gallery.html` | `/gallery` | §4.7 (FR-7.1–7.2) |
| `contact.html` | `/contact` | §4.8 (FR-8.1–8.4) |
| `faq.html` | `/faq` | §4.9 (FR-9.1) |
| `404.html` | `/404` | §4.10 Sitewide (FR-10.2) |

Header, footer, and floating WhatsApp/call buttons (FR-1.6, FR-10.1) are repeated on every page since this is a plain static mockup with no templating — in the real Next.js build these become a shared `layout.tsx`.

## Mobile header edge spacing (round 16, extended round 17)
The hamburger toggle sat 24px from the right edge — the same padding used everywhere else on the header/page for symmetry with the logo's left-side spacing, but once the Contact button disappears in collapsed-nav mode the toggle is the header's only right-side element, and 24px reads as too much dead space next to a single icon button. `.header-inner` now gets `padding-right: 16px` inside the existing `≤1280px` media query — left side (logo) is untouched.

Round 17: `.header-inner`'s `gap: 24px` (meant for the 3-column desktop grid: logo / pill-nav / CTA) was still active on mobile too — `display: none` on `.pill-nav` removes the element but not its grid *track*, so the 24px column gap either side of that now-empty middle track was adding further unwanted space beyond the padding fix above. Set explicitly: `gap: 24px` stays on desktop (unchanged, base rule), `gap: 0` inside the `≤1280px` media query for mobile/tablet.

## Bento gallery overflow fix (round 15)
The bento cells were overflowing horizontally at every breakpoint (desktop, tablet, and mobile) — visually clipped at the viewport edge (not scrollable) because `html, body { overflow-x: hidden }` hides the overflow rather than causing a scrollbar. Root cause: CSS Grid items default to `min-width: auto`, which pins each item's minimum width to its own content's min-content size (the placeholder label text, and/or the `aspect-ratio`-transferred size on the `span 2` hero/landscape cells) — so the `1fr` columns could never actually shrink to fit the container, no matter the column count. Fixed with `min-width: 0` on `.bento-gallery .placeholder-img`, the standard fix for this well-known grid/flex sizing gotcha.

## True aspect-ratio bento gallery (round 14 — supersedes round 13)
Rebuilt as a curated composition (10 photos, not a repeating pattern) with five explicit cell types — `.bento-hero` (16:9), `.bento-portrait` (3:4), `.bento-square` (1:1), `.bento-landscape` (4:3), `.bento-banner` (21:9, always full-width via `grid-column: 1/-1`) — each with a real CSS `aspect-ratio`, exact regardless of column width. The only thing that changes per breakpoint is `grid-template-columns` (4 → 3 → 2); `span 2` on hero/landscape naturally resolves to "full width" once the grid drops to 2 columns, so the same markup and same per-type spans serve all three breakpoints without overrides — which is also why the ratios stay identical everywhere, per "maintain the same... across all screen sizes." The photo count/order (2 portrait, 4 square, 2 landscape, 1 hero, 1 banner) was chosen so every row divides evenly at 4, 3, and 2 columns with zero gaps at any breakpoint, `grid-auto-flow: dense` is there mainly as a safety net. Desktop and tablet requests didn't mention the banner explicitly, but it's kept visible at every size (full-width strip) rather than removed on smaller screens — flag it if you want it desktop-only. **Mobile is now a true 2-column stacked grid, not horizontal scroll** — this supersedes round 13's mobile treatment per this request.

## Bento gallery (round 13 — gallery.html)
Replaced the uniform photo grid with a bento/masonry layout (`.bento-gallery`) matching the reference: a repeating rhythm of one tall (row-span-2) and one wide (col-span-2) featured tile per 6 photos, via `grid-auto-flow: dense` + `:nth-child(6n+2)`/`:nth-child(6n)` — no per-photo markup changes needed, the pattern is purely CSS so it scales to any photo count. Desktop is 3 columns, `≤1024px` (tablet) drops to 2, and `≤768px` (mobile) switches to horizontal snap-scroll instead of a vertical stack — consistent with the card `.scroll-row` pattern already used elsewhere on the site, rather than the plain single-column stack the reference's own mobile mock showed. The home page's small 4-photo preview strip keeps the older simple `.gallery-grid` (unaffected).

## Article page redesign (round 12 — care-guide-article.html)
Went from a single flat text column to a proper article layout, reusing existing design-system components rather than inventing new visual language:
- **Reading progress bar** — thin fixed bar at the very top, fills with scroll (`.reading-progress`, driven by a small guarded block in `main.js` that only runs if the element exists, so it's a no-op on every other page).
- **Tag chips** above the title (`.chip-row`) and a **byline card** (avatar + name/role/date) replacing the old plain meta line.
- **"Quick answer" callout** — a glass box with a terracotta left border, right after the intro, giving skimmers the TL;DR before they commit to reading.
- **Two-column layout** (`.article-layout`): prose on the left, a sticky sidebar on the right with a **table of contents** (jump links to each `##`-equivalent section, `scroll-margin-top` added so they don't land under the floating header) and the "Book a Check" CTA — replaces the old bottom-of-page offer strip with something that stays useful while scrolling. Collapses to a single column under 900px.
- **Section icons** on each `<h2>` for scannability, a **share row** at the end of the prose, and a **"Related Care Guides"** card grid at the bottom (reuses the glass `.card` + `.scroll-row` components already used elsewhere) so the article doesn't dead-end.
- All new pieces (`.callout`, `.toc-card`, `.article-byline`, `.share-row`) are glass/token-based, so they inherit the aura background, dark palette, and Material shadows automatically rather than needing one-off styling.

## Targeted fixes (round 11)
- **About hero**: removed `data-parallax` from both the glow and the photo (`about.html`) — that hero is now static; the layered glow/image markup stays, it just no longer moves on scroll.
- **Plants page**: the "Not sure what suits your space?" WhatsApp strip near the bottom now has more breathing room before the footer (`.mb-64` utility added to `style.css`, applied to that section in `plants.html`).
- **Care-guide article** ("Home / Care Guide / Watering Succulents"): removed `data-parallax` from the cover photo — it's static now too. Home's own hero parallax (`0.35`) is untouched — only this article and About were asked to lose theirs.

## Temporary hero image for the parallax (round 10)
The full-bleed hero background was a flat tonal fill, which made the `0.35`-speed parallax hard to actually see — a solid color doesn't give your eye anything to track moving. Added `assets/img/hero-plants.svg`, a small hand-built, self-contained SVG illustration (layered leaf silhouettes, terracotta pots, soft glow blobs, in the site's own palette) as the hero's `background-image` — no external image host/CDN dependency, so it always loads offline. It's explicitly a placeholder (labeled as such via the on-page `.hero-bg-label` badge and the `aria-label`) — swap it for real nursery photography whenever that's available; nothing else about the `.hero-bg`/parallax mechanics needs to change when you do.

## FAB icon + shadow cleanup (round 9)
Swapped the emoji glyphs (💬 📞) for inline SVG icons (Lucide-style `message-circle`/`phone` paths, `stroke="currentColor"`) — emoji render with platform-specific coloring (the phone emoji was pink on this system, clashing with the glass tint), SVG guarantees a consistent white icon everywhere. Also removed `.fab-whatsapp`/`.fab-call`'s `box-shadow` entirely (the colored glow + inset highlight) for a flatter look — the frosted blur, border, and `::after` sheen still carry the glass read on their own.

## Premium glass FABs (round 8)
The WhatsApp/call floating buttons (`.fab`) moved from flat solid-color circles to tinted frosted glass: `backdrop-filter: blur(16px) saturate(180%)`, a brand-color wash at ~30% opacity instead of a solid fill, a soft glossy diagonal sheen (`::after`), an inset top highlight + bottom inner shadow for a curved-glass feel, and an outer glow shadow tinted to each button's brand color (WhatsApp green / terracotta) instead of the generic dark elevation shadow used elsewhere.

## Navbar fixes (round 7 — header width)
`.header-inner` now uses its own `--header-width: 1480px` cap instead of sharing `--container-width` (1200px) with the page body — the header/pill-nav can now span noticeably wider than the page content below it, rather than being boxed to the same reading-width container. `.pill-nav`'s own cap was raised `900px → 1180px` to match so it can actually use the extra room instead of the header track just having empty gap on either side of it.

## Navbar fixes (round 6)
- **Contact button removed on mobile/tablet**: `.header-cta a.btn` is hidden in collapsed-nav mode (was previously just losing its label text and lingering as an icon-only pill).
- **Animated hamburger → X**: `.nav-toggle` is now a real 3-bar icon (`.hamburger` + 3 `span`s); `assets/js/main.js` toggles an `is-open` class instead of swapping text content, and CSS transitions the bars (top/bottom rotate 45°/-45°, middle fades) into an X over `.28s`.
- **Wider desktop pill-nav**: per-link padding `11px 18px → 14px 24px`, pill padding `6px → 8px`, item gap `2px → 4px` — more breathing room, closer to the reference's proportions.
- **True centering + further widened**: `.header-inner` switched from `flex; justify-content:space-between` to CSS Grid (`auto 1fr auto`) — the old flex layout only ever centered the pill-nav by coincidence, since its position depended on the (different) widths of the logo and Contact button either side. Now the nav sits in its own grid track, always mathematically centered regardless of what's in the side columns. That track is also flexible (`1fr`), so `.pill-nav` grows to fill it (up to a `900px` cap) instead of staying pinned to its intrinsic content width — links spread out with `justify-content: space-evenly` to use the extra room.
- **Fixed the 1024–1280px squeeze**: 8 nav links + logo + Contact button never fit comfortably in that range, especially after widening the pill above. Rather than shrinking text to force a fit, the collapse-to-hamburger breakpoint moved from `900px` to `1280px` — that whole range now cleanly gets the mobile nav panel instead of a cramped/overflowing pill bar. (Note: `900px` still appears elsewhere in `style.css` for unrelated card-grid column counts — that one's untouched, it's a different concern.)

## Visual direction (round 5 — glassmorphism cards)
`.card` (all product/category/plant/pot cards), `.testimonial`, and `.accordion-item` (FAQ) are now frosted glass panels: `background: rgba(255,255,255,.05)` + `backdrop-filter: blur(18px) saturate(150%)` + a subtle light border and inset top-highlight, defined once as `--glass-bg`/`--glass-border`/`--glass-blur` in `style.css`. Sitting over the aura-glow background, they visibly pick up the terracotta/green/magenta tint blurred through them — the glow isn't just decorative anymore, it's what the glass refracts. Hover brightens the glass slightly (`--glass-bg-hover`); other chrome (nav dropdown, inputs, tables) intentionally stays solid so cards read as a distinct layer.

## Visual direction (round 4 — full-bleed hero + Material minimal)
- **Home hero is now full-bleed**: `.hero-full` is a 100vh section with the placeholder photo covering the entire width/height edge-to-edge (`.hero-bg`, oversized 180%/-40% offset so it never reveals gaps while parallaxing), a gradient `.hero-scrim` for text legibility that fades into the page's base color at the bottom, and the floating pill nav sits transparently on top (`margin-top:-96px` pulls the hero up under the header). Parallax speed bumped to `0.35` — the strongest on the site, deliberately — versus `0.1–0.16` elsewhere; the CSS oversize buffer (40%) is sized to stay ahead of that speed at any viewport height so it can't tear.
- **Minimal + Material pass**: placeholder tiles dropped the diagonal-stripe pattern for a flat tonal fill (`color-mix()` of the accent into the surface color — less busy, more minimal); shadows rebuilt as Material's real two-layer "key + ambient" recipe instead of a single soft blur; buttons and cards got a `:active` press-scale for tactile feedback (Material's signature interaction, done in a few lines of CSS rather than a JS ripple library); corner radius shifted to Material's shape scale (12px medium / 28px extra-large); the aura glow was dialed down ~30% in opacity since a minimal direction wants restraint over heavy decorative gradients.
- **Scope note**: this wasn't a full Material Design System port (no Material type scale, no ripple animation, no component library) — kept it to the parts that read as "minimal + Material" without adding weight to a plain HTML/CSS mockup. Say if you want it pushed further (e.g. an actual ripple effect).
- About's hero keeps the earlier split layout + layered glow-parallax from round 3 — only the *Home* hero was asked to go full-bleed. Say if you want About (or others) converted too.

## Visual direction (round 3 — dark theme reskin)
Restyled to follow a reference design: deep teal-green background, terracotta-orange accent, floating pill navbar with a tab-style active state, and a more pronounced layered parallax hero.
- **Palette**: background `#132420` (deep teal-green), surfaces `#1E3630`/`#24403A`, cream text `#F5F1E4`, muted sage body text `#A9BFB0`, terracotta accent `#CC8B52` used as the single brand accent (CTAs, active nav, eyebrows, offer banners) — replaces the old two-accent cream/gold system. A muted leaf-green (`#6FA57C`) survives only as a secondary tint on alternating placeholder tiles and plant-care chips. Terracotta (clay pots) + deep teal (foliage in low light) reads as a natural fit for a plant nursery, not just a borrowed travel-site palette.
- **Navbar**: `.pill-nav` — a floating, blurred glass pill containing the nav links; the current page renders as a solid terracotta rounded-tab that pops slightly above/below the pill (`.pill-nav a.active`), mirroring the reference's "HOME" tab treatment. Falls back to the existing dark mobile dropdown below 900px.
- **Parallax**: hero photos on Home/About now sit in a `.hero-media` wrapper with two independently-parallaxing layers — a soft blurred terracotta/leaf-green `.hero-glow` (drifts slowly) behind the photo (drifts faster) — approximating the reference's layered photo-collage depth without fabricating stock photography we don't have yet.
- **Not replicated 1:1**: the reference's specific photo collage (person + hat bridging two panels) and its decorative slide-pagination dots weren't recreated — those are content/carousel-specific to that reference and weren't part of what was asked (color pattern, navbar, parallax). Say if you want those too.

## Interactive/visual features (round 2)
- **Working mobile menu**: `.nav-toggle` now toggles `.main-nav` open/closed via `assets/js/main.js` (fixed dropdown panel, closes on link tap, Escape key, or resize back to desktop).
- **Horizontal-scrolling cards on phone**: category tiles, plant/pot/soil/tool cards, testimonials, and care-guide article cards use the `.scroll-row` utility — snap-scroll flex row below 768px, normal CSS grid above it. No JS involved.
- **Fixed mobile x-axis padding bug**: `.hero` was combining with `.container` on the same element in `index.html`, and its `padding: 64px 0` shorthand was zeroing out `.container`'s horizontal padding. Split into `padding-top`/`padding-bottom` in `style.css` so it can never collide with a sibling class's horizontal padding again. Also added `overflow-x: hidden` on `html, body` as a safety net.
- **Parallax**: hero photos (`index.html`, `about.html`) and the care-guide article cover image move at a fraction of scroll speed via `[data-parallax]` + `assets/js/main.js`.
- **Scroll-reveal animation**: elements with `.reveal` fade/slide in via `IntersectionObserver` as they enter the viewport; `.reveal-delay-1/2/3` stagger siblings. Respects `prefers-reduced-motion`.
- **"Magnific" aura background**: a fixed, blurred jewel-tone radial-gradient wash (gold + green + magenta) behind all content, defined on `body::before` in `style.css` — this was our interpretation of the request; swap the `--aura-*` custom properties if a different treatment was meant.

## Design tokens
Defined as CSS custom properties in `assets/css/style.css`:
- **Primary (leaf green)** `#3C6B37` — brand/CTA color
- **Accent (gold)** `#C08A1E` — "Golden Aura" accent, offers, highlights
- **Background (cream)** `#FBF8F1`
- **Headings**: Playfair Display · **Body**: Inter

These tokens are a starting proposal — swap freely before the real Tailwind CSS 4 theme is finalized in the Next.js build (Milestone 4 design-system branch, per `docs/MILESTONES.md`).

## What this isn't
No React/Next.js, no component reuse (each page is a standalone file), no real image assets, no working form submission, no accessibility/performance tuning beyond basic semantic HTML. All of that is scoped into the actual build in `docs/MILESTONES.md`.
