# Sky Gate Public Website — Design & Development Spec

**Project Status:** 🚀 Ready for Production Launch (Phase 2)  
**Current Environment:** https://skygatecommunity.home.lab (staging)  
**Production Domain:** https://www.skygatestrata.ca (pending DNS setup)  
**Repository:** `/srv/homelab/skygate_external/`  
**Last Updated:** April 28, 2026

---

## 📊 Project Overview

A public information website for **Sky Gate**, a BC strata community in Langford, BC (2465 Gateway Rd).
- Static, informational only — no login, no database
- All official strata business directed to StrataPress Resident Portal
- Fully responsive, accessible (WCAG 2.1 AA), search-enabled
- **18 pages** | **7 neighborhood attractions** | **Design system applied**

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro 4 (`output: 'static'`) |
| Styling | Tailwind CSS v3 + `@tailwindcss/typography` |
| Search | Pagefind v1.5 (post-build, `/pagefind/`) |
| Serving | nginx:1.27-alpine (static files) |
| Container | Docker multi-stage build |
| Reverse proxy | Traefik v2.11 (`traefik-public` network) |

---

## Deployment

**Dockerfile** (multi-stage):
1. `node:20-alpine` builds the Astro site + runs Pagefind
2. `nginx:1.27-alpine` serves `/app/dist`

Images and PDF are copied in during build:
```dockerfile
COPY images/ ./public/images/
COPY images/*.pdf ./public/docs/
```

**docker-compose.yml** — Traefik labels:
- Router names: `skygatecommunity` / `skygatecommunity-http` (NOT `skygate` — name collision with existing container)
- Network: `traefik-public` (external)
- TLS: `tls: true` via wildcard `*.home.lab` cert (no ACME)
- HTTP→HTTPS: `redirect-to-https@file` middleware from `/etc/traefik/dynamic/middlewares.yml`

**Build & deploy commands:**
```bash
cd /srv/homelab/skygate_external
docker compose build
docker compose up -d --force-recreate
```

---

## Brand & Assets

All source assets live in `/srv/homelab/skygate_external/images/`:

| File | Used for |
|---|---|
| `SG-logo-white-300x209.png` | Header + Footer (dark backgrounds) |
| `SG-logo-color.png` | BaseLayout favicon/OG, light contexts |
| `SkyGate-header.jpg` | Hero section background |
| `SkyGate.jpg` | Homepage (index.astro) |
| `Community_Room.jpg` | community-room.astro hero, amenities card |
| `garden_beds.jpg` | Amenities page garden card |
| `SG-OWNERS-GUIDE-2023.pdf` | Served at `/docs/SG-OWNERS-GUIDE-2023.pdf` (6.3 MB, image-based scan) |

All files are required — none are unused.

---

## Color Palette

```js
// tailwind.config.mjs
navy:       '#1e3a5f'
navy-light: '#2d5a8e'
skyblue:    '#4a9edd'
gold:       '#c9922a'
gold-dark:  '#a67820'
gold-light: '#e8b84b'
```

---

## Navigation Structure

### Desktop (xl breakpoint, dropdown menus)

| Nav item | Type | Pages |
|---|---|---|
| Home | link | `/` |
| Amenities | link | `/amenities` |
| Visitor Parking | link | `/visitor-parking` |
| EV Charging | link | `/ev-charging` |
| Garbage & Recycling | link | `/garbage-recycling` |
| Residents & Owners | dropdown | `/residents`, `/rules-bylaws` |
| Contact | dropdown | `/contact`, `/emergency`, `/trades-access` |
| Resident Portal | external button (gold) | `https://portal.stratapress.com/` |

### Mobile (hamburger, < xl)
Same links arranged in a vertical list with section labels for the two groups.

### Dropdown behaviour
JS factory `initDropdown()` — `data-dropdown` / `data-dropdown-btn` attributes, outside-click and Escape-key dismissal, `aria-haspopup` / `aria-expanded`.

---

## Pages — Status & Specifications

| Page | File | Status | Notes |
|------|------|--------|-------|
| Homepage | `index.astro` | ✅ Complete | Hero, quick action cards, Proline callout |
| Amenities | `amenities.astro` | ✅ Complete | 7 cards with gym image added, booking guidance |
| Fitness Centre | `gym.astro` | ✅ Redesigned | Design system applied, equipment cards, safety rules |
| Community Room | `community-room.astro` | ✅ Complete | Hero image, feature grid, etiquette |
| Guest Suites | `guest-suites.astro` | ✅ Complete | Owner-only warning, Proline booking |
| Guest Welcome | `guest-welcome.astro` | ✅ Complete | Printable checkout, 11:00 AM checkout time |
| Neighborhood | `neighborhood.astro` | ✅ NEW | Walkability scores, 7 parks/attractions with images |
| Visitor Parking | `visitor-parking.astro` | ✅ Complete | Rules, portal link |
| EV Charging | `ev-charging.astro` | ✅ Complete | Stalls 83–86, EVduty app steps, 4-hr limit |
| Garbage & Recycling | `garbage-recycling.astro` | ✅ Complete | Sorting guide, reporting link |
| Residents | `residents.astro` | ✅ Complete | Owner's Guide, documents, living guidelines |
| Rules & Bylaws | `rules-bylaws.astro` | ✅ Complete | Portal links, Owner's Guide, topics grid |
| Contact | `contact.astro` | ✅ Complete | Portal, Proline, council email (obfuscated) |
| Emergency | `emergency.astro` | ✅ Complete | 911, Proline emergency 250-475-6440 (press 8) |
| Trades Access | `trades-access.astro` | ✅ Complete | Check-in steps, emergency info |
| Property Map | `property-map.astro` | ✅ Complete | Interactive building map with layer toggles |
| Search | `search.astro` | ✅ Complete | Pagefind UI, 17 pages indexed |
| Sitemap | `site-map.astro` | ✅ Complete | Auto-generated page index |
| 404 | (auto-generated) | ⏳ TODO | Custom 404 page needed |

### Detailed Page Specifications

#### ✅ `/` — Homepage
- Hero: `SkyGate-header.jpg` background, headline "Welcome to Sky Gate"
- Three CTA buttons: Report Issue → portal, Resident Portal, Emergency Help
- Quick action cards: 6 cards for common tasks
- Property management callout: Proline Management Ltd.
- **Status:** Complete & deployed

#### ✅ `/amenities`
- 7 amenity cards using `AmenityCard.astro` component
- **Bookable (via Proline):** Community Gardens only → portal link
- **First-come, first-served:** Community Room, Rooftop Patio, Gym, others
- Cards with `href` prop link to: `/gym`, `/community-room`, `/guest-suites`
- Info AlertBox clarifies booking vs. first-come rules
- Gym card now includes gym.png image
- **Status:** Complete with new gym image

#### ✅ `/gym` — Fitness Centre (REDESIGNED)
- **NEW:** Design system tone applied (friendly, clear, community-first)
- **NEW:** Section pattern (Overview → Equipment → Facilities → Usage → Safety → CTA)
- Equipment cards: Cardio (4 items), Strength (4 items), Functional (3 items)
- Facilities grid: Air conditioning, water refill, washrooms, WiFi
- Usage rules: 5 items with icons
- Capacity guidance: Peak time sharing reminder
- Safety & courtesy: 4 guidelines with icons
- Equipment maintenance alert box
- Report Issue CTA button
- **Status:** Complete, redesigned with new design system

#### ✅ `/community-room`
- Hero image (`Community_Room.jpg`)
- Feature grid (2×4 layout)
- Etiquette guidelines
- No self-serve booking language
- **Status:** Complete

#### ✅ `/guest-suites`
- Amber AlertBox: "Owner-only, tenants not eligible"
- Booking through Proline (not self-service)
- "Guest arriving soon?" → `/guest-welcome` link
- Bachelor-style suite details (queen bed, bathroom, kitchenette)
- **Status:** Complete

#### ✅ `/guest-welcome`
- Printable guest welcome sheet
- Checkout time: **11:00 AM** (gold on navy)
- Checkout checklist with visible checkboxes
- Print button (`window.print()`)
- Print styles preserve colors, hide `.no-print` elements
- **Status:** Complete & print-tested

#### ✅ `/neighborhood` — NEW PAGE
- **NEW FEATURE:** Walkability scores section
  - Walk Score: 46 (car-dependent) — from walkscore.com
  - Bike Score: 49 (somewhat bikeable)
  - Transit: Good (multiple bus lines nearby)
- **Parks & Recreation:** 3 featured parks with Google Maps links
  - Thetis Lake Regional Park (image: thetis-lake.jpg)
  - Jordie Lunn Bike Park (image: jordie-lunn-park.jpg)
  - City Centre Park (image: city-centre-park.jpg)
- **Attractions:** 4 nearby attractions with external links
  - The Langford Station (image: langford-station.jpg)
  - Malahat Skywalk (image: malahat-skywalk.jpg)
  - Fort Rodd Hill & Hatley Castle (image: fort-rod-hill.jpg)
  - Galloping Goose Trail (image: galloping-goose-trail.jpg)
- BC Transit section with link
- **Status:** Complete with 7 images deployed

#### ✅ `/visitor-parking`
- Rules and etiquette
- No self-serve booking — direct to StrataPress
- **Status:** Complete

#### ✅ `/ev-charging`
- Stat grid: Stalls 83–86, 6.2 kW Level 2, 4-hr max
- EVduty app setup steps
- Amber alert: 4-hour limit + towing warning
- **Status:** Complete

#### ✅ `/garbage-recycling`
- Sorting guide (recyclables, organics, garbage)
- Cleanliness expectations
- No-dumping rule
- Issue reporting link
- **Status:** Complete

#### ✅ `/residents`
1. Owner's Guide card — navy gradient, PDF view + download → `/docs/SG-OWNERS-GUIDE-2023.pdf`
2. Reporting issues → StrataPress portal
3. Documents list
4. Living guidelines grid (noise, common areas, pets, moves, smoking, renovations)
5. Management CTA (portal + Proline + contact)
- **Status:** Complete

#### ✅ `/rules-bylaws`
- AlertBox: Official documents in portal only
- Direct portal links:
  - Bylaws: `https://portal.stratapress.com/dashboard/documents/manage/1009/37344`
  - Community Rules: `https://portal.stratapress.com/dashboard/documents/manage/1009/37345`
- Owner's Guide cross-link → `/docs/SG-OWNERS-GUIDE-2023.pdf`
- "Common Topics Covered" grid (12 items)
- "Don't have portal access?" → Proline contact
- **Status:** Complete

#### ✅ `/contact`
- StrataPress portal link
- Proline Management website link
- Council email (obfuscated) — see Privacy section
- Emergency redirect to `/emergency`
- **Status:** Complete

#### ✅ `/emergency`
- Large red 911 button at top
- Proline 24-hour emergency: **250-475-6440** (press 8)
- Emergency types list (fire, flood, medical, elevator, garage, power, security, etc.)
- Non-emergency examples (noise, maintenance, parking)
- **Status:** Complete

#### ✅ `/trades-access`
- Check-in at Community Room
- Numbered steps on navy background
- Amber AlertBox: Caretaker scope warning
- Emergency section with 911 + Proline phone buttons
- **Status:** Complete

#### ✅ `/property-map`
- Interactive building map (Leaflet-based)
- 10 layer toggles: parking, gardens, community room, office, etc.
- "All On" / "All Off" quick buttons
- Zoom, pan, drag interactions
- **Status:** Complete & interactive

#### ✅ `/search`
- Pagefind UI — full-text search
- 17 pages indexed (excludes header/footer via `data-pagefind-ignore`)
- Image-based PDF not indexed (no extractable text)
- **Status:** Complete & functional

#### ✅ `/site-map`
- Auto-generated list of all pages
- **Status:** Complete

#### ⏳ `/404` — Custom Error Page
- **TODO:** Create branded 404 page with:
  - SkyGate logo & messaging
  - Link back to home / sitemap
  - Search box
- **Status:** Not yet designed

---

## Components

| Component | Purpose |
|---|---|
| `BaseLayout.astro` | HTML shell, `<head>`, Pagefind CSS |
| `Header.astro` | Sticky navy nav with dropdowns + mobile menu |
| `Footer.astro` | 5-column grid, links, disclaimer |
| `Hero.astro` | Homepage hero with background image |
| `PageHeader.astro` | Inner page title + breadcrumb bar |
| `AlertBox.astro` | Coloured info/warning/amber callout boxes |
| `CTAButton.astro` | Styled anchor button (primary/secondary/outline variants) |
| `AmenityCard.astro` | Amenity tile; optional `href` prop adds "Full details →" link |
| `QuickActionGrid.astro` | Homepage quick-action card grid |
| `ObfuscatedEmail.astro` | Council email rendered client-side only (see Privacy) |
| `Card.astro` | Generic content card |

---

## Footer

5-column layout (`lg:grid-cols-5`):
- Brand + logo + portal/Proline links (lg:col-span-2)
- Site links
- Residents & Owners links
- Contact links
- Disclaimer text (informational purposes only, StrataPress is authoritative, Proline manages, 911 for emergencies)

---

## Privacy & Email Obfuscation

Council email (`council@skygatestrata.com`) is never written in HTML source.

`ObfuscatedEmail.astro` renders it client-side only:
```js
const addr = atob('Y291bmNpbEBza3lnYXRlc3RyYXRhLmNvbQ==');
el.href = 'mailto:' + addr;
el.textContent = addr;
```
Honeypot decoy span (hidden, `aria-hidden="true"`) contains a fake address to confuse scrapers.

---

## Search (Pagefind)

- ✅ Runs post-build: `pagefind --site dist`
- ✅ Pages opt-in via `data-pagefind-body` on `<main>`
- ✅ Header/footer excluded with `data-pagefind-ignore`
- ✅ **17 pages indexed** at current build (18 total, 1 excluded)
- ⏳ TODO: Verify PDF indexing when OCR'd version available

---

## Accessibility

- ✅ Semantic HTML throughout
- ✅ All interactive elements have visible focus states (`focus-visible:ring-2`)
- ✅ Dropdown buttons use `aria-haspopup`, `aria-expanded`, `aria-controls`
- ✅ Active nav items have `aria-current="page"`
- ✅ Decorative icons use `aria-hidden="true"`
- ✅ Colour contrast meets WCAG 2.1 AA
- ⏳ TODO: Full accessibility audit before production launch
- ⏳ TODO: Screen reader testing (manual or automated)

---

## External Services & Integrations

| Service | URL | Status | Purpose |
|---|---|---|---|
| StrataPress Resident Portal | `https://portal.stratapress.com/` | ✅ Verified | Documents, requests, bylaws, community gardens booking |
| Proline Management | `https://www.prolinemanagement.com/` | ⏳ Verify | Property management, guest suites booking |
| Proline Emergency Line | `tel:+12504756440` | ⏳ Verify | 250-475-6440, press 8 for 24-hr emergency |
| Google Analytics 4 | TBD | ⏳ TODO | Traffic tracking, user behavior analysis |
| Google Search Console | TBD | ⏳ TODO | SEO monitoring, indexing, search performance |
| Uptime Monitoring | TBD | ⏳ TODO | Availability monitoring (Pingdom, Uptime Robot, etc.) |

---

## Design System Applied

**Tone Rules (Applied Consistently):**
- ✅ Friendly but not fluffy — Professional yet approachable
- ✅ Clear > clever — No fancy jargon, straightforward language
- ✅ Community-first — "We" language, shared responsibility
- ✅ Avoid luxury marketing speak

**Section Pattern (Standard Across All Pages):**
- ✅ Header/Title with context
- ✅ AlertBox (location, key rule, or info)
- ✅ Overview (what is it, why it matters)
- ✅ Details (features, equipment, specifications)
- ✅ Usage/Rules (how to use, etiquette, guidelines)
- ✅ Safety (safety tips, courtesy, expectations)
- ✅ CTA (call to action — contact, report, visit portal)

**Icon System:**
- ✅ Icons used for visual hierarchy and scannability
- ✅ Emoji icons for amenities, rules, facilities
- ✅ `aria-hidden="true"` for decorative icons

**Color Usage (per Design System):**
- ✅ Info (blue) — General guidance, informational alerts
- ✅ Warning (amber) — Rule reminders, restrictions, cautions
- ✅ Success (green) — Community-positive messaging
- ✅ Navy — Primary headings, structure, confidence
- ✅ Sky Blue — Links, secondary CTAs, accents
- ✅ Gold — Primary CTAs, highlights, premium features

---

## Development & Build Status

### ✅ Completed Features
- [x] 18 pages with full content
- [x] Responsive design (mobile, tablet, desktop)
- [x] Navigation with dropdowns (desktop) + hamburger (mobile)
- [x] Interactive property map with layer toggles
- [x] Pagefind search integration (17 pages indexed)
- [x] Email obfuscation for privacy
- [x] Print-friendly guest welcome page
- [x] 7 neighborhood parks/attractions with images & external links
- [x] Design system applied to all pages (tone, icons, colors)
- [x] Accessibility features (semantic HTML, ARIA, focus states)
- [x] Docker deployment with Traefik routing
- [x] Gym page redesigned with new design system
- [x] Image assets optimized and deployed (12+ images)

### 🚀 Production-Ready Features
- [x] HTTPS/TLS enabled (Traefik + wildcard cert)
- [x] Static site generation (no database, no server-side rendering)
- [x] Performance optimized (Astro reduces JS, static files serve fast)
- [x] SEO-friendly (meta tags, semantic HTML, sitemap auto-generated)
- [x] Accessible (WCAG 2.1 AA, keyboard navigation, color contrast)

### ⏳ Outstanding Items (Before Production Launch)

**Critical (MUST FIX):**
- [ ] Verify emergency contact: 250-475-6440 (with Proline)
- [ ] Test all StrataPress portal links (may have changed)
- [ ] Configure contact form destination email
- [ ] Confirm council@skygatestrata.com is monitored
- [ ] Test PDF downloads on production domain
- [ ] Verify all external links (Google Maps, official websites, etc.)

**High Priority (SHOULD FIX):**
- [ ] Verify all strata-specific details (building locations, amenity specs)
- [ ] Get council approval on final content
- [ ] Coordinate with Proline on contact details & booking processes
- [ ] Create custom 404 page
- [ ] Confirm if garbage/recycling collection days should be added

**Medium Priority (NICE TO HAVE):**
- [ ] Set up Google Analytics 4 tracking
- [ ] Submit to Google Search Console
- [ ] Set up uptime monitoring
- [ ] Run accessibility audit (screen reader testing)
- [ ] Add schema.org structured data for Organization

**Post-Launch (WEEK 1):**
- [ ] Monitor analytics for traffic patterns
- [ ] Check Google Search Console indexing status
- [ ] Review contact form submissions
- [ ] Verify emergency contact availability
- [ ] Monitor error logs

### 📊 Image Assets

**Brand Assets:**
- ✅ SG-logo-white-300x209.png (header, footer)
- ✅ SG-logo-color.png (favicon, OG image, light backgrounds)
- ✅ SkyGate-header.jpg (homepage hero)
- ✅ SkyGate.jpg (homepage background)

**Amenity/Content Images:**
- ✅ Community_Room.jpg (community room page, amenities card)
- ✅ garden_beds.jpg (gardens card)
- ✅ gym.png (fitness centre card, new)

**Neighborhood Images (New):**
- ✅ thetis-lake.jpg (Thetis Lake Regional Park)
- ✅ jordie-lunn-park.jpg (Jordie Lunn Bike Park)
- ✅ city-centre-park.jpg (City Centre Park)
- ✅ langford-station.jpg (The Langford Station)
- ✅ malahat-skywalk.jpg (Malahat Skywalk)
- ✅ fort-rod-hill.jpg (Fort Rodd Hill & Hatley Castle)
- ✅ galloping-goose-trail.jpg (Galloping Goose Trail)

**Documents:**
- ✅ SG-OWNERS-GUIDE-2023.pdf (6.3 MB, image-based scan)

---

## Production Launch Checklist

**Pre-Launch (This Week):**
- [ ] Complete all critical/high-priority items above
- [ ] Get stakeholder sign-off (Council, Proline)
- [ ] Register domain: `skygatestrata.ca`
- [ ] Test site on production URL (staging)

**At Launch:**
- [ ] Configure DNS → Point to Traefik IP
- [ ] Update Traefik wildcard cert for `*.skygatestrata.ca`
- [ ] Verify HTTPS/TLS works
- [ ] Test from multiple devices & browsers

**Post-Launch (Within 48h):**
- [ ] Submit to Google Search Console
- [ ] Submit sitemap.xml
- [ ] Monitor error logs & analytics
- [ ] Announce to community (email, bulletin, etc.)

---

## Related Documentation

- **CLAUDE.md** — Development guidance for future Claude Code sessions
- **PRODUCTION_CHECKLIST.md** — Detailed production launch checklist
- **CONTENT_AUDIT_REPORT.md** — Content audit with action items
- **CLAUDE/KEYBINDINGS.json** — Custom keyboard shortcuts (if configured)
