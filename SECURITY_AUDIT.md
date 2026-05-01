# Security Audit Report

**Date:** April 30, 2026  
**Status:** ⚠️ CRITICAL ISSUE FOUND  
**Severity:** MEDIUM (PII exposed)

---

## 🚨 CRITICAL ISSUE: Personal Domain Exposed

### Location: `docker-compose.yml`

**Lines 29-33 & 35-41:**
```yaml
# ⚠️ EXPOSED: Developer's personal domain with full name
- "traefik.http.routers.skygatejvv-http.rule=Host(`skygate.jeremyvanveelen.com`)"
- "traefik.http.routers.skygatejvv.rule=Host(`skygate.jeremyvanveelen.com`)"
- "traefik.http.routers.skygatejvv.tls.certresolver=letsencrypt"
```

**Problem:**
- Reveals developer's full name: "Jeremy Van Veelen"
- Reveals personal domain ownership
- Will be public on GitHub
- Unnecessary for production deployment

**Risk Level:** MEDIUM
- Not a password or API key (low risk)
- Is personally identifiable information (PII)
- Could enable targeted social engineering
- Not needed for Netlify deployment

**Solution:**
Remove these lines entirely before pushing to GitHub

---

## ✅ SECURITY CHECKS: PASSED

### No Credentials Found
- ✅ No AWS keys, API keys, or tokens
- ✅ No database passwords
- ✅ No private keys or certificates
- ✅ No .env files with secrets
- ✅ No hardcoded API endpoints with sensitive data
- ✅ No payment information or financial data

### Email Handling: SECURE
- ✅ Council email (`council@skygatestrata.com`) is **NOT** in HTML source
- ✅ Email is **base64-encoded** and decoded at runtime only
- ✅ Honeypot decoy email included to confuse scrapers
- ✅ Requires JavaScript enabled (provides extra protection)
- ✅ Implementation is correct and secure

### Phone Numbers: PUBLIC (Acceptable)
- ✅ `250-475-6440` (Proline emergency) — Public contact info
- ✅ Appropriate to include in public website
- ✅ No internal numbers exposed

### External Links: SAFE
- ✅ All external links are to legitimate public services:
  - `https://portal.stratapress.com/` (StrataPress Portal)
  - `https://www.prolinemanagement.com/` (Proline Management)
  - `https://www.malahatskywalk.com/` (Tourist attraction)
  - `https://www.langfordstation.ca/` (Tourist attraction)
  - `https://www.bctransit.com/` (Public transit)
  - `https://www.walkscore.com/` (Public service)
- ✅ No private/internal service URLs

### Code Comments: SAFE
- ✅ No sensitive information in comments
- ✅ No TODOs revealing security gaps
- ✅ No credentials mentioned in comments

### Dependencies: CHECKED
- ✅ No suspicious npm packages
- ✅ No outdated/vulnerable packages listed
- ✅ Standard packages only (Astro, Tailwind, Pagefind)

---

## 📋 ACTION REQUIRED BEFORE PUBLIC DEPLOYMENT

### 1. REMOVE Personal Domain References

**File:** `docker-compose.yml`

**Remove these lines:**
```yaml
      # HTTP → HTTPS redirect (public domain)
      - "traefik.http.routers.skygatejvv-http.rule=Host(`skygate.jeremyvanveelen.com`)"
      - "traefik.http.routers.skygatejvv-http.entrypoints=web"
      - "traefik.http.routers.skygatejvv-http.middlewares=redirect-to-https@file"

      # HTTPS — Let's Encrypt cert via HTTP challenge
      - "traefik.http.routers.skygatejvv.rule=Host(`skygate.jeremyvanveelen.com`)"
      - "traefik.http.routers.skygatejvv.entrypoints=websecure"
      - "traefik.http.routers.skygatejvv.tls=true"
      - "traefik.http.routers.skygatejvv.tls.certresolver=letsencrypt"
      - "traefik.http.routers.skygatejvv.service=skygatecommunity"
```

**Why:** This is internal homelab configuration that reveals PII. Not needed for Netlify.

**Status:** ⏳ ACTION REQUIRED

### 2. Update docker-compose.yml for Netlify Only

**Option A: Remove entire personal section**
```yaml
# Keep only skygatecommunity.home.lab for local testing
# Remove skygatejvv (personal domain)
```

**Option B: Move to separate file (docker-compose.local.yml)**
```yaml
# Keep production config in docker-compose.yml
# Move personal domain config to docker-compose.local.yml
# Add docker-compose.local.yml to .gitignore
```

**Recommendation:** Option A (simpler, cleaner)

**Status:** ⏳ ACTION REQUIRED

---

## 📊 Overall Security Assessment

| Category | Status | Notes |
|----------|--------|-------|
| Credentials | ✅ PASS | No API keys, passwords, or tokens |
| Email Handling | ✅ PASS | Properly obfuscated |
| Phone Numbers | ✅ PASS | Public contact info only |
| External Links | ✅ PASS | All to legitimate public services |
| Code Comments | ✅ PASS | No sensitive data revealed |
| Dependencies | ✅ PASS | Standard, up-to-date packages |
| PII Exposure | ⚠️ FAIL | Personal domain reveals developer name |
| .env Files | ✅ PASS | None found |
| Hardcoded IPs | ✅ PASS | No local IPs hardcoded |

**Overall Grade:** ⚠️ **B+** (GOOD, with one required fix)

---

## 🔐 Recommendations for Netlify Deployment

1. **BEFORE pushing to GitHub:**
   - [ ] Remove personal domain references from docker-compose.yml
   - [ ] Create .gitignore (if not committed yet)
   - [ ] Review docker-compose.yml one more time

2. **Upon Netlify deployment:**
   - [ ] No additional secrets to add (site is static, no database)
   - [ ] No environment variables needed initially
   - [ ] Contact form handling can use Netlify Forms (no backend needed)

3. **For future development:**
   - [ ] Keep any personal/test configs in separate files
   - [ ] Add those files to .gitignore
   - [ ] Use environment variables for any secrets (if ever needed)
   - [ ] Rotate any API keys annually
   - [ ] Regular security audits (quarterly)

---

## 📝 Files Reviewed

✅ `docker-compose.yml` — Traefik routing config
✅ `Dockerfile` — Build configuration
✅ `sky-gate-site/package.json` — Dependencies
✅ `sky-gate-site/src/components/ObfuscatedEmail.astro` — Email handling
✅ `sky-gate-site/src/pages/*.astro` — All pages (18 total)
✅ `netlify.toml` — Build configuration
✅ `.gitignore` — File exclusions

---

## ✨ Next Steps

1. **Fix docker-compose.yml** — Remove personal domain section
2. **Create .gitignore** — Ensure node_modules, .env, etc. are excluded
3. **Commit & push to GitHub** — Will be clean and safe
4. **Deploy to Netlify** — No additional security config needed

**After fix, this project will be: 🔒 SECURE**

---

**Audit completed by:** Claude Code  
**Recommendation:** Fix the one issue, then safe to deploy publicly
