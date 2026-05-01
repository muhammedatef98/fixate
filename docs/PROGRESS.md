# Implementation Progress
*Last updated: 2026-05-01*

## Phase 1: Performance & Stability

### 1.1 Fix the Render Sleep Problem ✅
- Added `GET /api/ping` — instant 200, no DB, used by cron-job.org to keep server warm
- Added `GET /api/health` — DB connectivity check with latency reporting
- Created `docs/DEPLOYMENT.md` (updated with keep-alive section)
- `[USER ACTION REQUIRED]` Set up cron-job.org to hit `/api/ping` every 10 minutes

### 1.2 Performance Optimization ⏳ Not started (code splitting, font subsetting, image WebP)
### 1.3 Error Monitoring ⏳ Not started (`[REQUIRES USER ACTION]` Sentry DSN)
### 1.4 Security Basics ✅
- Helmet.js with CSP (tuned for Google Fonts + GA4)
- CORS with explicit origin allowlist
- express-rate-limit on auth endpoints (20 req/15 min)
- Health check SQL fixed (drizzle sql`` template)

## Phase 2: Conversion Optimization ✅ (core complete)
- Hero redesign: app-download-first with OS detection
- AppStoreBadge component with coming-soon fallback
- `#download` section as primary conversion point
- Cities coverage section (12 cities)
- "How It Works" → 4 steps, starts with "Download the App"
- All broken `/booking` CTAs fixed
- StickyDownloadBar (scroll-triggered, dismissible, 30s re-show)
- FAQ teaser on home page
- FAQ expanded from 4 → 25 questions, 6 categories, with search + filter
- FAQPage JSON-LD schema on /faq

## Phase 3: SEO & Discoverability ✅ (quick wins done)
- sitemap.xml updated with all public pages + hreflang
- robots.txt updated with full allow/disallow lists

## Phase 4: Trust & Legal
- 4.5 Footer ✅ — dynamic year, real social links, app badges, payment logos, WhatsApp
- 4.1-4.4 ⏳ Not started (cookie banner, contact page, About improvements)

## Phase 5: Analytics & Tracking ⏳ Not started
## Phase 6: Polish & Accessibility ⏳ Not started
## Phase 7: Developer Experience & Docs ⏳ Not started

---

## Commit Log
| Date | Phase | Commit | Description |
|------|-------|--------|-------------|
| 2026-05-01 | 1.1 | a643133 | /api/ping, /api/health, docs skeleton |
| 2026-05-01 | 1.4+2+3 | 1d19a17 | Security, conversion optimisation, SEO |
