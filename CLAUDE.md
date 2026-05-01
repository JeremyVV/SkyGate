# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Quick Start

**Repository location:** `/srv/homelab/skygate_external/`  
**Main app:** `sky-gate-site/` (Astro 4 static site)  
**Live URL:** `https://skygatecommunity.home.lab`

### Development Commands
```bash
cd sky-gate-site/
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Build static site + run Pagefind indexing
npm run preview    # Preview built site locally
npm run astro      # Raw Astro CLI access
```

**Testing in browser:** After `npm run dev`, open http://localhost:3000 and test all interactive features (dropdowns, print button, responsive nav, search). Always test mobile via DevTools at breakpoints (`lg:` = 1024px).

---

## Project Overview

**Sky Gate** is a static information website for a BC strata community. All business logic is on the StrataPress Resident Portal; this site is informational/navigational only with no database, login, or dynamic content.

### Architecture

#### Single-Page Structure
The site is one Astro app with:
- **18 pages** in `src/pages/` (routed by filename, e.g., `residents.astro` → `/residents`)
- **1 base layout** (`BaseLayout.astro`) providing HTML shell, head metadata, and page wrapper
- **Reusable components** in `src/components/` (Header, Footer, navigation, content blocks)
- **Static CSS** via Tailwind (no CSS-in-JS)
- **Client-side interactivity** limited to dropdowns and print functionality

#### Tech Stack
| Layer | Choice | Why |
|---|---|---|
| Framework | Astro 4 (`output: 'static'`) | Zero JS by default; only ships what's needed |
| Styling | Tailwind v3 + typography plugin | Utility-first for brand consistency |
| Search | Pagefind 1.5 (post-build) | Serverless indexing; UI at `/search` |
| Server | nginx 1.27-alpine | Lightweight static file server |
| Deploy | Docker multi-stage build | node:20 builds, nginx:1.27 serves `/dist` |
| Reverse proxy | Traefik v2.11 | Handles TLS (`*.home.lab` wildcard), routing |

#### Color System
All colors are defined in `tailwind.config.cjs` under `theme.extend.colors`:
```js
navy: '#1e3a5f' (primary dark background)
navy-light: '#264a78'
skyblue: '#4a9edd' (accent)
gold: '#c9922a' (CTAs, highlights)
```
Use these custom colors, not Tailwind defaults. Hero images should use navy + gold overlays to maintain brand.

---

## File Organization

### Pages (`src/pages/`)
Each `.astro` file becomes a route (e.g., `residents.astro` → `/residents`). Pages:
- Import and use `BaseLayout` for the HTML wrapper
- Import reusable components (Header, Footer, AlertBox, etc.)
- Use `<main data-pagefind-body>` so content is searchable
- Include `<header>` with PageHeader component for inner-page title + breadcrumb

### Components (`src/components/`)
Reusable Astro components used across pages:
- **BaseLayout.astro** — HTML5 doctype, head (favicon, OG meta, Pagefind CSS), page wrapper
- **Header.astro** — Sticky top nav with dropdowns (desktop) and hamburger menu (mobile)
- **Footer.astro** — 5-column grid (brand + portal links, site links, resident links, contact, disclaimer)
- **Hero.astro** — Full-width hero with background image (homepage only)
- **PageHeader.astro** — Inner page title + breadcrumb bar
- **AlertBox.astro** — Coloured info/warning/error callout (variants: info, warning, error/amber)
- **CTAButton.astro** — Styled `<a>` tag (variants: primary, secondary, outline; sizes: sm, md, lg)
- **AmenityCard.astro** — Tile for amenity (optional `href` adds "Full details →" link)
- **QuickActionGrid.astro** — 2x3 grid of quick-action cards (homepage)
- **ObfuscatedEmail.astro** — Client-side email renderer; prevents scraping (see Privacy)

### Styling (`src/styles/`)
Global CSS (Tailwind directives). Utilities are composed via Tailwind classes in templates, not separate CSS files.

### Public Assets
- Images: `/public/images/` (copied to `dist/images/` at build)
- Docs: `/public/docs/` (e.g., `SG-OWNERS-GUIDE-2023.pdf`, served at `/docs/`)
- Favicon, OG image: defined in `src/components/BaseLayout.astro`

---

## Key Implementation Details

### Navigation (Header.astro)
- **Desktop (≥1024px):** Dropdowns via `data-dropdown` / `data-dropdown-btn` attributes
  - Dismissal on outside-click or Escape key
  - Uses `aria-haspopup="true"`, `aria-expanded`, `aria-controls` for a11y
  - Active items have `aria-current="page"`
- **Mobile (<1024px):** Hamburger menu opens full-height overlay with vertical nav
- **Resident Portal button:** Gold, always visible, always external link

### Print Styles
The `/guest-welcome` page has a print button that triggers `window.print()`. Print styles:
- Hide elements with `no-print` class
- Preserve gold/navy colours on white background
- Use `@media print` in global CSS

### Email Obfuscation (ObfuscatedEmail.astro)
Council email (`council@skygatestrata.com`) is stored base64-encoded in JS, not in HTML. This prevents email scrapers from finding it in the DOM. Also includes a honeypot fake email (hidden, `aria-hidden="true"`).

### Search (Pagefind)
- **Index**: All pages with `<main data-pagefind-body>` are indexed at build time
- **Exclusion**: Header/footer use `data-pagefind-ignore` to avoid duplicate link indexing
- **UI**: `/search` page loads Pagefind UI via CDN (handles search box + results)
- **PDF**: Image-based PDF (`SG-OWNERS-GUIDE-2023.pdf`) is not text-searchable

### Accessibility
- Semantic HTML throughout (nav, main, footer, article, section)
- All buttons/links have visible focus states (`focus-visible:ring-2 ring-skyblue`)
- Colour contrast meets WCAG AA
- Alt text on all images
- Dropdowns use ARIA attributes (aria-haspopup, aria-expanded, aria-controls)

---

## Deployment

### Build & Deploy Cycle
```bash
cd /srv/homelab/skygate_external
docker compose build   # Runs Dockerfile: node:20 builds, nginx serves
docker compose up -d --force-recreate
```

### Docker Multi-Stage Build (Dockerfile)
1. **Stage 1 (node:20-alpine):** Installs deps, runs `npm run build` (builds Astro + runs Pagefind)
2. **Stage 2 (nginx:1.27-alpine):** Copies `dist/` and serves via nginx

### Traefik Routing (docker-compose.yml)
- **Labels:**
  - Router names: `skygatecommunity` (HTTPS), `skygatecommunity-http` (HTTP)
  - Network: `traefik-public` (external, shared)
  - TLS: `tls: true` via wildcard `*.home.lab` cert (no ACME)
  - HTTP→HTTPS: Redirects via `redirect-to-https@file` middleware
- **Important:** Router names must NOT be `skygate` (collision with existing container)

### Assets
During Docker build:
- `COPY images/ ./public/images/` — Brand assets (logos, photos)
- `COPY images/*.pdf ./public/docs/` — PDF docs

All files in `images/` are required; none are unused.

---

## Brand & External Services

### Brand Colors (Tailwind)
```
navy:      #1e3a5f (main background)
skyblue:   #4a9edd (accents, links)
gold:      #c9922a (CTAs, highlights, danger)
```

### Key External Links
- **StrataPress Portal:** `https://portal.stratapress.com/` (documents, requests, bylaws)
- **Proline Management:** `https://www.prolinemanagement.com/`
- **Proline Emergency Line:** `tel:+12504756440` (press 8)

### Assets Required
| File | Used for | Size |
|---|---|---|
| `SG-logo-white-300x209.png` | Header/footer (dark bg) | |
| `SG-logo-color.png` | OG image, light contexts, favicon | |
| `SkyGate-header.jpg` | Hero section bg | |
| `SkyGate.jpg` | Homepage hero | |
| `Community_Room.jpg` | Community room page hero | |
| `garden_beds.jpg` | Amenities page garden card | |
| `SG-OWNERS-GUIDE-2023.pdf` | Served at `/docs/SG-OWNERS-GUIDE-2023.pdf` | 6.3 MB (scanned, not OCR'd) |

---

## Common Tasks

### Adding a New Page
1. Create `src/pages/new-page.astro`
2. Import `BaseLayout` and reusable components
3. Use `<main data-pagefind-body>` for searchable content
4. Include `<PageHeader>` for title + breadcrumb
5. Test in dev, responsive breakpoints (`lg:`)
6. Run `npm run build` to regenerate Pagefind index
7. Check `/search` to verify page is indexed

### Editing Navigation
Header.astro defines nav items. Desktop dropdowns use `data-dropdown` attributes. Mobile nav is generated from the same list. Update text/links in Header.astro only.

### Changing Colors
Update `tailwind.config.cjs` under `theme.extend.colors`. Rebuild with `npm run build`. All color references in templates use Tailwind classes, not hardcoded hex.

### Updating Assets
1. Add new file to `/images/`
2. Reference in page (e.g., `src="/images/new.jpg"`)
3. If PDF, copy to both `/images/` and ensure Dockerfile copies to `/public/docs/`
4. Rebuild Docker image

### Testing Locally
```bash
npm run dev
# Open http://localhost:3000
# Test: responsive nav (resize to <1024px), dropdowns (click + escape), print (guest-welcome)
npm run build  # Build + Pagefind index
npm run preview  # Serve built site locally
```

---

## Gotchas & Constraints

- **Static-only:** No API routes, no server-side logic. All links must be external (StrataPress, Proline) or internal pages.
- **Pagefind limits:** Image-based PDFs are not text-indexed. Only text content is searchable.
- **Router naming:** Traefik router names cannot be `skygate` (existing container collision).
- **Dropdown JS:** Menu items use `data-dropdown` attributes. Changes to HTML structure must preserve these attributes.
- **Email privacy:** Council email must never appear in HTML source. Use `<ObfuscatedEmail />` component.
- **Asset coupling:** All brand images in `/images/` are in use. Do not delete.
- **Print styles:** `/guest-welcome` has inline print styles. Test with actual `window.print()` before deploy.
- **Favicon/OG:** Set in `BaseLayout.astro`, not in individual pages.

---

## Files to Know

| File | Purpose |
|---|---|
| `astro.config.mjs` | Astro config (site URL, integrations, static output mode) |
| `tailwind.config.cjs` | Tailwind theme (colors, fonts, plugins) |
| `Dockerfile` | Multi-stage build (node build → nginx serve) |
| `docker-compose.yml` | Container config + Traefik labels |
| `nginx.conf` | nginx static file serving (gzip, caching headers) |
| `design/SkyGate.design.md` | Authoritative reference document (this reference is comprehensive) |

