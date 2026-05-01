# Sky Gate Strata Website — Production Launch Checklist

**Domain:** https://www.skygatestrata.ca  
**Launch Date:** [TBD]  
**Status:** Ready for review

---

## 📝 CONTENT AUDIT & UPDATES

### Page-by-Page Content Review

#### ✅ Homepage (`/`)
- [x] Title: "Welcome to Sky Gate"
- [x] Three CTA buttons present (Report Issue, Resident Portal, Emergency Help)
- [x] Quick action cards grid
- [x] Property management callout (Proline)
- [ ] **TODO:** Verify Proline contact details are current
- [ ] **TODO:** Update if any hero image needs refreshing

#### ✅ Amenities (`/amenities`)
- [x] 7 amenity cards with descriptions
- [x] Links to detail pages (/gym, /community-room, /guest-suites)
- [x] Images for Community Room, Gardens
- [x] Gym image added
- [x] AlertBox explaining booking requirements
- [ ] **TODO:** Review amenity descriptions for accuracy

#### ✅ Fitness Centre (`/gym`)
- [x] New design system applied
- [x] Equipment list complete
- [x] Facilities noted
- [x] Usage rules clear
- [x] Safety guidelines present
- [x] Equipment maintenance alert
- [x] Gym image displaying
- [ ] **TODO:** Verify all equipment matches actual facility

#### ✅ Community Room (`/community-room`)
- [x] Feature grid
- [x] Etiquette guidelines
- [x] Hero image present
- [ ] **TODO:** Confirm booking restrictions are accurate

#### ✅ Guest Suites (`/guest-suites`)
- [x] Owner-only disclaimer (Amber alert)
- [x] Booking through Proline info
- [x] Guest welcome link
- [ ] **TODO:** Verify pricing/availability info with Proline

#### ✅ Guest Welcome (`/guest-welcome`)
- [x] Printable checkout sheet
- [x] Checkout time: 11:00 AM (gold on navy)
- [x] Checkbox squares
- [x] Print button working
- [ ] **TODO:** Test print functionality

#### ✅ Neighborhood (`/neighborhood`)
- [x] Walk/Bike/Transit scores
- [x] Address: 2465 Gateway Rd, Langford
- [x] 7 parks/attractions with images & links
- [x] Links to Google Maps and official sites
- [ ] **TODO:** Verify all attraction links are current

#### ✅ Visitor Parking (`/visitor-parking`)
- [x] Rules present
- [x] Link to StrataPress for requests
- [ ] **TODO:** Confirm parking availability details

#### ✅ EV Charging (`/ev-charging`)
- [x] Stall numbers: 83–86
- [x] 6.2 kW Level 2 specification
- [x] 4-hour max rule
- [x] EVduty app steps
- [x] Towing warning
- [ ] **TODO:** Verify stall numbers and wattage are current

#### ✅ Garbage & Recycling (`/garbage-recycling`)
- [x] Sorting guide
- [x] Cleanliness expectations
- [x] No-dumping rule
- [x] Issue reporting link
- [ ] **TODO:** Check if collection days/times need adding

#### ✅ Residents (`/residents`)
- [x] Owner's Guide card with PDF download link
- [x] Reporting issues section
- [x] Documents list
- [x] Living guidelines grid
- [x] Management CTA
- [ ] **TODO:** Verify PDF download works
- [ ] **TODO:** Check all portal links are current

#### ✅ Rules & Bylaws (`/rules-bylaws`)
- [x] AlertBox re: official documents in portal
- [x] Direct portal links (Bylaws, Community Rules)
- [x] Owner's Guide cross-link
- [x] "Don't have portal access?" section
- [ ] **TODO:** Verify portal document URLs are current

#### ✅ Contact (`/contact`)
- [x] Portal link
- [x] Proline website link
- [x] Council email (obfuscated)
- [x] Emergency redirect
- [ ] **TODO:** Test email obfuscation works

#### ✅ Emergency (`/emergency`)
- [x] 911 button (red, large)
- [x] Proline 24-hr emergency: 250-475-6440 (press 8)
- [x] Emergency types list
- [x] Non-emergency examples
- [ ] **TODO:** Confirm emergency number is still 250-475-6440

#### ✅ Trades Access (`/trades-access`)
- [x] Check-in at Community Room
- [x] Numbered steps on navy
- [x] Caretaker scope warning
- [x] Emergency section with 911 & Proline tel
- [ ] **TODO:** Verify Community Room is check-in location

#### ✅ Property Map (`/property-map`)
- [x] Interactive building map
- [x] Layer toggles (parking, gardens, etc.)
- [ ] **TODO:** Confirm map accuracy

#### ✅ Search (`/search`)
- [x] Pagefind UI loads
- [ ] **TODO:** Test search functionality

#### ✅ Sitemap & 404
- [x] Sitemap auto-generated
- [ ] **TODO:** Verify 404 page is branded

---

## 🔍 METADATA & SEO

- [ ] **Page Titles** — All pages have descriptive titles (check in BaseLayout)
- [ ] **Meta Descriptions** — All pages have descriptions under 160 chars
- [ ] **Robots.txt** — Allow public indexing (verify at `/robots.txt`)
- [ ] **Sitemap.xml** — Auto-generated (verify at `/sitemap.xml`)
- [ ] **Favicon** — SkyGate logo visible in browser tab
- [ ] **Open Graph (OG) Tags** — Social sharing preview (check BaseLayout)
- [ ] **Structured Data** — Schema.org for organization (if needed)

---

## 📧 CONTACT & COMMUNICATION

### Contact Form
- [ ] Form destination email configured
- [ ] **Recipient:** [Who receives contact submissions?]
- [ ] Auto-reply email set up?
- [ ] Spam filtering configured?

### Email Addresses in Use
- [x] `council@skygatestrata.com` — Obfuscated, renders at runtime
- [ ] **TODO:** Confirm this email address is monitored

### External Contacts
- [ ] **Proline Management** — https://www.prolinemanagement.com/
  - Emergency: 250-475-6440 (press 8)
  - Website verified current? ___
- [ ] **StrataPress Portal** — https://portal.stratapress.com/
  - Portal links verified? ___
  - Document URLs still valid? ___

---

## 🔐 SECURITY & COMPLIANCE

- [ ] **HTTPS Enforced** — All traffic → HTTPS
- [ ] **SSL Certificate** — Traefik wildcard for `*.skygatestrata.ca`
- [ ] **Privacy Policy** — Link in footer (if required by law)
- [ ] **Accessibility (WCAG 2.1 AA)** — Colors, contrast, navigation tested
- [ ] **No Sensitive Data** — No API keys, passwords, or tokens in code
- [ ] **Contact Form Protection** — Rate limiting / CAPTCHA (if needed)

---

## 📊 ANALYTICS & MONITORING

- [ ] **Google Analytics 4** — Tag added to all pages
- [ ] **Google Search Console** — Domain verified, sitemap submitted
- [ ] **Uptime Monitoring** — Service configured (Pingdom, Uptime Robot, etc.)
- [ ] **Error Tracking** — Sentry or similar configured?
- [ ] **Form Submissions** — How are they logged/monitored?

---

## 🎨 BRANDING & CONSISTENCY

- [ ] **Logo Usage** — White logo in header, color in footer
- [ ] **Color Palette** — Navy, Sky Blue, Gold used consistently
- [ ] **Typography** — Inter font loads properly
- [ ] **Images** — All alt text present for accessibility
- [ ] **Tone of Voice** — Friendly, clear, community-first (consistent across pages)
- [ ] **Footer** — 5-column layout, disclaimer, copyright year updated

---

## 🚀 LAUNCH CHECKLIST

### Before DNS Switch
- [ ] All pages tested on https://www.skygatestrata.ca (staging/preview)
- [ ] Images load correctly
- [ ] Links work (internal + external)
- [ ] Forms submit properly
- [ ] Mobile responsiveness verified
- [ ] Print styles work (/guest-welcome)
- [ ] Search (Pagefind) works

### DNS & Domain Setup
- [ ] Domain registered (`skygatestrata.ca`)
- [ ] DNS records configured (A/CNAME to Traefik IP)
- [ ] SSL certificate provisioned
- [ ] www.skygatestrata.ca redirects correctly
- [ ] Healthchecks pass

### Post-Launch (Within 24h)
- [ ] Google Search Console: Claim & verify domain
- [ ] Google Search Console: Submit sitemap
- [ ] Google Search Console: Test URL inspection
- [ ] Monitor 404 errors
- [ ] Monitor contact form submissions
- [ ] Check for SSL warnings/errors
- [ ] Verify mobile appearance on real devices

### First Week
- [ ] Monitor analytics for traffic patterns
- [ ] Check search console for indexing status
- [ ] Review any error logs
- [ ] Test contact form delivery
- [ ] Share with community (email, bulletin, etc.)

---

## 📋 STAKEHOLDER COMMUNICATIONS

- [ ] **Strata Council** — Approved final content? ___
- [ ] **Proline Management** — Contact details confirmed? ___
- [ ] **Residents** — Announcement planned for launch?
- [ ] **Email Distribution** — List ready to notify community?

---

## 🔧 HANDOFF DOCUMENTATION

- [ ] **Runbook** — How to restart/troubleshoot site
- [ ] **Contact List** — Who to reach for support
- [ ] **Backup Schedule** — Verified and documented
- [ ] **Update Process** — How to add/edit content going forward
- [ ] **Password Management** — Access credentials secure

---

## ✨ OPTIONAL ENHANCEMENTS (Post-Launch)

- [ ] Newsletter signup form
- [ ] Event calendar for community events
- [ ] Photo gallery of common areas
- [ ] Resident testimonials/community stories
- [ ] Mobile app (iOS/Android)
- [ ] Integration with Proline portal (SSO?)

---

**Prepared by:** [Name]  
**Date:** [Date]  
**Next Review:** [After 1 month of launch]
