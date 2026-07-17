# Software Requirements Specification (SRS)
## Golden Aura — Ornamental Plants Shop Website

| | |
|---|---|
| **Document Version** | 1.0 |
| **Date** | 2026-07-17 |
| **Status** | Final (v1 scope) |
| **Project Type** | Static landing/catalog website (offline shop, no e-commerce transactions) |

---

## 1. Introduction

### 1.1 Purpose
This document specifies the functional and non-functional requirements for the **Golden Aura** website — a statically-generated, multi-page marketing and catalog website for an offline (brick-and-mortar) ornamental plants nursery. The site's purpose is discovery, local SEO, and lead generation (calls, WhatsApp inquiries, and quote requests) — not online transactions.

### 1.2 Scope
The website will present the shop's plant categories, services, and store information to prospective customers, and drive them to contact the shop via phone, WhatsApp, or a contact/quote form. The site is built with Next.js and exported as static HTML/CSS/JS, deployable to any static host.

**Out of scope for v1**: online cart/checkout, payment processing, user accounts, multi-language support, CMS-backed content editing.

### 1.3 Definitions & Acronyms
| Term | Meaning |
|---|---|
| SRS | Software Requirements Specification |
| SSG | Static Site Generation |
| SSR | Server-Side Rendering (not used in v1 — static export only) |
| AMC | Annual Maintenance Contract (plant care service) |
| CTA | Call to Action |
| JSON-LD | JSON for Linking Data (structured data format) |
| CWV | Core Web Vitals |

### 1.4 References
- Next.js Static Exports Guide — nextjs.org/docs/app/guides/static-exports
- Schema.org `GardenStore` type — schema.org/GardenStore
- Google Search Central — Local Business structured data guidelines

---

## 2. Overall Description

### 2.1 Product Perspective
A greenfield, standalone static website. No existing system is being replaced. The shop currently has no digital presence being formalized by this project.

### 2.2 Business Goals
1. Establish local SEO presence (Google Search + Maps) for "ornamental plants" / "nursery" searches in the shop's service area.
2. Showcase plant categories and services to build buyer intent before an in-store or WhatsApp inquiry.
3. Provide frictionless contact paths (click-to-call, WhatsApp, quote form) to convert visitors into leads.
4. Keep hosting/operating cost near-zero via static export (no backend server to run).

### 2.3 User Classes
| User Class | Description | Key Needs |
|---|---|---|
| Prospective customer (browsing) | Discovers shop via Google/social, browsing plant options | Fast load, clear categories, photos, care info |
| Prospective customer (ready to buy/inquire) | Knows what they want | Quick access to phone/WhatsApp/contact form, store hours & location |
| Service inquirer | Wants landscaping/AMC/event rental | Clear service descriptions, quote request path |
| Shop owner/staff | Maintains the site content | Simple content structure (component/data-file based, no CMS in v1) |

### 2.4 Operating Environment
- Client: modern desktop and mobile browsers (Chrome, Safari, Edge, Firefox — current and previous major version)
- Hosting: any static file host (e.g., Vercel static hosting, Netlify, Cloudflare Pages, or a shared/Nginx web server) — no Node.js server required at runtime
- Build environment: Node.js 20 LTS or later

### 2.5 Design & Implementation Constraints
- Next.js configured with `output: 'export'` → **no server, no middleware, no Server Actions, no API routes** at runtime. All dynamic behavior (forms) must call third-party endpoints from the client.
- Next.js built-in Image Optimization API is unavailable under static export; images must be pre-optimized at build time (`sharp`) or served `unoptimized`.
- Single language: English only (no i18n routing in v1).
- No shopping cart/checkout — this is a lead-generation/catalog site for an offline store.

---

## 3. Information Architecture (Site Map)

```
/                    Home
/about               About / Our Story
/plants              Plant catalog hub (category grid)
/plants/[category]   Category listing page
/pots-accessories    Pots, soil, fertilizers, tools
/services            Services hub
/care-guide          Plant care articles hub
/care-guide/[slug]   Individual care-guide article
/gallery             Photo gallery
/contact             Contact & quote request
/faq                 Frequently asked questions
/404                 Not found page
```

---

## 4. Functional Requirements

### 4.1 Home Page (`/`)
- FR-1.1: Display hero banner/carousel featuring signature plants and the shop name/tagline.
- FR-1.2: Display a "Shop by Category" grid linking to each `/plants/[category]` page.
- FR-1.3: Display a bestsellers/featured-plants carousel.
- FR-1.4: Display a seasonal offers/announcement strip (e.g., festive plant promotions).
- FR-1.5: Display customer testimonials (static content in v1).
- FR-1.6: Display a persistent floating WhatsApp button and click-to-call button, visible across all pages.
- FR-1.7: Link to `/gallery` via a photo strip/preview.

### 4.2 About Page (`/about`)
- FR-2.1: Present the shop's story, years in operation, and sourcing/growing practices.
- FR-2.2: Optionally display founder/team photos.

### 4.3 Plant Catalog (`/plants`, `/plants/[category]`)
- FR-3.1: `/plants` displays all plant categories as a navigable grid (see §6.1 for category list).
- FR-3.2: Each category page lists plants with: photo, name, short description, light/water care icons, and indicative price range.
- FR-3.3: Clicking a plant photo opens a lightbox image viewer.
- FR-3.4: No cart, checkout, or online payment functionality — each listing includes an inquire/contact CTA instead.
- FR-3.5: Category pages must be statically generated at build time (`generateStaticParams`) from a structured content/data file.

### 4.4 Pots & Accessories (`/pots-accessories`)
- FR-4.1: List product groups: pots/planters, soil & fertilizers, gardening tools, decorative accessories.
- FR-4.2: Same display pattern as plant listings (photo, name, description, inquire CTA).

### 4.5 Services (`/services`)
- FR-5.1: List each service (see §6.2) with a description and a "Get a Quote" CTA that routes to the contact form, pre-selecting the relevant service (via query param or pre-filled field).

### 4.6 Care Guide (`/care-guide`, `/care-guide/[slug]`)
- FR-6.1: List care-guide articles (title, summary, thumbnail).
- FR-6.2: Each article is statically generated content (component or MDX-driven).
- FR-6.3: Articles must include SEO metadata (title, description) per page.

### 4.7 Gallery (`/gallery`)
- FR-7.1: Display a responsive photo grid (nursery, plant setups, customer installations).
- FR-7.2: Support lightbox viewing with next/previous navigation.

### 4.8 Contact (`/contact`)
- FR-8.1: Display store address, embedded Google Map, and operating hours.
- FR-8.2: Display click-to-call phone link and WhatsApp deep link (`wa.me`) with a pre-filled message.
- FR-8.3: Provide a contact/quote form (name, phone, email optional, message, optional service-type dropdown) with client-side validation.
- FR-8.4: Form submissions are sent to a third-party static-form backend (Web3Forms or Formspree) since no server is available; on success, show a confirmation state; on failure, show an error state and fallback contact options (phone/WhatsApp).

### 4.9 FAQ (`/faq`)
- FR-9.1: Display an accordion of frequently asked questions (care basics, delivery, service areas, return/replacement policy for plants).

### 4.10 Sitewide
- FR-10.1: Persistent header navigation across all top-level pages; persistent footer with social links, address summary, and business hours.
- FR-10.2: Custom 404 page with navigation back to Home/Plants.
- FR-10.3: All pages must define unique `<title>`/meta description via the Next.js Metadata API.

---

## 5. Non-Functional Requirements

### 5.1 Performance
- NFR-1.1: Static export must achieve a Lighthouse Performance score ≥ 90 on mobile for the Home and a representative category page.
- NFR-1.2: Images must be lazy-loaded below the fold and pre-optimized (WebP, responsive sizes) at build time.
- NFR-1.3: Total JS bundle for a single route should stay lean — avoid unnecessary heavy client libraries (no animation/UI-kit dependencies beyond what's specified in §7).

### 5.2 SEO & Structured Data
- NFR-2.1: Implement JSON-LD structured data using schema.org type `GardenStore` (a `LocalBusiness` subtype) on the Home/Contact pages, including `name`, `address`, `geo`, `openingHours`, `telephone`, and `image`.
- NFR-2.2: Provide `sitemap.xml` and `robots.txt` generated at build time.
- NFR-2.3: Provide Open Graph and Twitter Card metadata for all top-level pages.
- NFR-2.4: Lighthouse SEO score ≥ 95.

### 5.3 Accessibility
- NFR-3.1: All images require descriptive `alt` text.
- NFR-3.2: Semantic HTML landmarks (`header`, `nav`, `main`, `footer`) and heading hierarchy.
- NFR-3.3: Automated accessibility scans (axe-core) must report zero critical/serious violations on all pages.
- NFR-3.4: Interactive elements (forms, accordions, carousels) must be keyboard-navigable.

### 5.4 Security
- NFR-4.1: No secrets/API keys committed to the repository; form backend keys managed via environment variables at build time where applicable (public form endpoints only, per Web3Forms/Formspree design).
- NFR-4.2: All external links (Maps, social) use `rel="noopener noreferrer"` where `target="_blank"` is used.

### 5.5 Maintainability & Scalability
- NFR-5.1: Plant/category/service/care-guide content stored in structured, typed data files (e.g., TypeScript objects or JSON) separate from presentational components, so content can be extended without touching layout code.
- NFR-5.2: Component structure must allow adding new plant categories or care-guide articles without new routing code (dynamic segments via `generateStaticParams`).
- NFR-5.3: Codebase must pass ESLint and TypeScript strict checks in CI before deployment.

### 5.6 Browser/Device Support
- NFR-6.1: Fully responsive from 360px (mobile) to 1920px+ (desktop) viewports.
- NFR-6.2: Support latest two major versions of Chrome, Safari, Edge, Firefox.

---

## 6. Content Requirements

### 6.1 Plant Categories (v1 — core set)
Indoor/Foliage Plants, Air-Purifying Plants, Succulents & Cacti, Flowering Plants, Outdoor/Garden Plants, Bonsai, Palms & Tropical Plants, Climbers & Creepers.

*Add-on categories (planned for later phase, architecture must accommodate without rework)*: Seasonal/Festive Plants, Terrarium & Mini Plants, Rare/Exotic Plants, Herbs, Aquatic Plants, Artificial/Faux Plants.

### 6.2 Services (v1 — core set)
Landscaping & Garden Design, Plant Maintenance (AMC), Plant Doctor/Consultation, Repotting & Potting Service, Delivery & Installation.

*Add-on services (later phase)*: Corporate Plant Gifting & Office Rental, Event/Wedding Plant Decor Rental, Terrarium & Vertical Garden Workshops, Balcony/Terrace Garden Makeovers, Custom/Bespoke Planters, Seasonal Plant Subscription.

### 6.3 Data Model (indicative)
```
Plant: { id, name, slug, category, description, careLight, careWater, priceRange, images[] }
Category: { id, name, slug, description, coverImage }
Service: { id, name, slug, description, icon }
CareGuideArticle: { id, title, slug, summary, body, coverImage, publishedDate }
```

---

## 7. Technology Stack

### 7.1 Core
| Layer | Choice | Version (as of 2026-07) |
|---|---|---|
| Framework | Next.js (App Router, `output: 'export'`) | 16.2.10 LTS |
| UI library | React / React DOM | 19.2.7 |
| Language | TypeScript | latest stable |
| Styling | Tailwind CSS | 4.3.2 |

### 7.2 Supporting Libraries
| Purpose | Package |
|---|---|
| Form state & validation | `react-hook-form` + `zod` |
| Form submission backend | Web3Forms or Formspree (client-side POST, no server route) |
| Image gallery/lightbox | `yet-another-react-lightbox` |
| Carousel | `embla-carousel-react` |
| Conditional class names | `clsx` |
| Build-time image processing | `sharp` |
| Linting/formatting | `eslint`, `prettier` |

### 7.3 Testing
| Layer | Tool | Version (as of 2026-07) |
|---|---|---|
| Unit / logic | Vitest | 4.1.10 |
| Component rendering | React Testing Library | latest (React 19-compatible) |
| E2E / smoke | Playwright | 1.60.0 |
| Accessibility | `@axe-core/playwright` | latest |
| Performance/SEO regression | Lighthouse CI (`@lhci/cli`) | latest |

### 7.4 Explicitly excluded (v1)
Shopping cart/payments, CMS integration, multi-language (i18n), Server Actions/API routes, shadcn/ui, Framer Motion (Tailwind's built-in transition/animation utilities are sufficient for v1 needs).

---

## 8. External Interfaces

| Interface | Purpose | Notes |
|---|---|---|
| Web3Forms / Formspree | Contact/quote form submission | Static export has no backend — form posts client-side to this third-party endpoint |
| Google Maps (embed) | Store location on `/contact` | Simple `iframe` embed, no API key/interactive SDK required |
| WhatsApp (`wa.me` link) | Direct inquiry channel | Plain deep link, no SDK |
| Analytics (GA4 or privacy-friendly alternative, e.g. Plausible/Umami) | Traffic insight | Loaded via `next/script`, deferred |

---

## 9. Testing Requirements Summary
- Unit tests for: form validation schemas, category-filter/data-lookup utilities.
- Component tests for: plant/category cards, contact form, FAQ accordion, navigation.
- E2E smoke tests (Playwright) covering: navigation across every top-level route, contact form submission success/error states, WhatsApp/tel link presence and correctness, mobile viewport rendering.
- Accessibility scan (axe-core) on every route with zero critical/serious violations.
- Lighthouse CI thresholds enforced in CI: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95 (mobile).
- E2E tests run against the built static output (served via a static file server), not `next dev`, since `output: 'export'` is the production target.

---

## 10. Deployment
- Build command: `next build` (with `output: 'export'` in `next.config`) producing a static `out/` directory.
- Deployable to any static host (Vercel, Netlify, Cloudflare Pages, or traditional Nginx/Apache hosting).
- No runtime Node.js server required in production.

---

## 11. Assumptions & Dependencies
- Shop provides: business address, hours, phone/WhatsApp number, initial plant/service photography and copy.
- Third-party form backend (Web3Forms/Formspree) free tier is sufficient for expected inquiry volume at launch.
- No online payment or delivery-tracking system required in v1.

## 12. Future Enhancements (explicitly out of v1 scope)
- Add-on plant categories and services listed in §6.1/§6.2.
- CMS-backed content editing for non-technical staff.
- Multi-language support.
- Blog/CMS expansion of the care-guide section.
- Online plant reservation (non-payment "reserve for pickup" form).
