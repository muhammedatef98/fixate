# Changes Log

## 2026-05-01 — Phase 1.1: Fix Render Sleep Problem

### Added
- `GET /api/ping` endpoint — instant 200 response, no DB calls. Used by cron-job.org to keep Render free-tier server warm.
- `GET /api/health` endpoint — checks DB connectivity and returns latency in ms. Returns 503 if DB is down.
- `docs/AUDIT.md` — full codebase audit with current state, known issues, and what's already good.
- `docs/PROGRESS.md` — phase-by-phase implementation tracker.
- `docs/USER_ACTIONS_REQUIRED.md` — comprehensive list of everything needing owner action (App Store URLs, Sentry, analytics, legal review, etc.).
- `docs/CHANGES.md` — this file.

### Updated
- `docs/DEPLOYMENT.md` — added "Render Sleep Problem" section with cron-job.org setup instructions, Render paid plan guidance, and Vercel/Railway migration paths.

### Files Modified
- `server/_core/index.ts` — added `/api/ping` and `/api/health` before existing REST routes.

---

## 2026-05-01 — Phases 1.4 + 2 + 3 + 4.5

### Added
- `client/src/components/StickyDownloadBar.tsx` — scroll-triggered persistent download CTA, OS-aware, dismissible with 30s re-show.
- `helmet` (v8), `cors` (v2), `express-rate-limit` (v8) dependencies.
- `@types/cors` dev dependency.

### Changed — Server (`server/_core/index.ts`)
- Added Helmet.js with CSP tuned for Google Fonts and GA4.
- Added CORS with explicit `fixate.sa` / `fixate.site` origin allowlist; `localhost` added in dev mode.
- Added `authLimiter` (20 req/15 min) applied to `/api/auth/signup` and `/api/auth/login`.
- Fixed `/api/health` SQL: now uses drizzle `sql\`SELECT 1\`` tagged template (was passing raw string which would fail).

### Changed — Home page (`client/src/pages/Home.tsx`)
- **Hero**: New headline "صيانة جوالك في بيتك خلال ساعة", app-download CTAs with OS detection, trust indicators.
- **AppStoreBadge** inline component: real link when env vars set, graceful "coming soon" placeholder otherwise.
- **"How It Works"**: Updated to 4 steps, first step is "Download the App".
- **#download section**: Prominent green download section as primary conversion point.
- **Cities section**: New section listing all 12 covered Saudi cities.
- **FAQ teaser**: 3 inline questions with link to full FAQ page.
- **Final CTA**: Changed from "احجز الآن" → "حمل التطبيق" with app badges.
- All broken `/booking` CTAs removed; nav button now scrolls to `#download`.

### Changed — FAQ (`client/src/pages/FAQ.tsx`)
- Expanded from 4 to 25 questions across 6 categories.
- Added search input (filters questions in real time).
- Added category filter pills.
- Added FAQPage JSON-LD schema markup for Google rich results.
- CTA updated: WhatsApp link + "Download App" (not `/booking`).
- Nav button updated: "Download App" → `/#download`.

### Changed — Footer (`client/src/components/Footer.tsx`)
- Copyright year is now dynamic (`new Date().getFullYear()`).
- Social links: Instagram uses real `fixate.sa` URL; added X (Twitter) and TikTok.
- App Store + Google Play badges: real links if env vars set, "Coming Soon" otherwise.
- Added WhatsApp contact link.
- Payment method badges: Mada, Visa, STC Pay, Apple Pay, Tabby, Tamara.
- FAQ added to quick links.

### Changed — App.tsx
- Added `<StickyDownloadBar />` rendered globally (appears on all pages).

### Changed — SEO
- `client/public/sitemap.xml`: Added privacy, terms; updated all lastmod to 2026-05-01; added hreflang ar-SA/en; removed internal pages.
- `client/public/robots.txt`: Expanded Disallow list to include all internal routes and /api/; fixed Allow list.
