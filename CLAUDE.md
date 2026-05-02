# Fixate — Claude Project Context

## What is this?
Fixate is a **mobile device repair app** for Saudi Arabia. This repo is the **marketing website + backend API**. The site's only job is to drive app downloads, build trust, and rank on Google for Saudi repair-related searches.

**The app is not yet published on App Store / Play Store.** All download CTAs show a "Coming Soon" placeholder until `VITE_APP_STORE_URL` and `VITE_PLAY_STORE_URL` env vars are set.

---

## Tech Stack
- **Frontend:** React 19 + TypeScript + Vite 7 + TailwindCSS 4
- **Routing:** Wouter (lightweight, not React Router)
- **API:** tRPC + React Query (type-safe, no REST boilerplate)
- **Backend:** Express 4 + Node 22
- **Database:** PostgreSQL via Drizzle ORM + postgres-js adapter (Neon)
- **Styling:** TailwindCSS 4 + shadcn/ui components
- **Deployment:** Render free tier (render.yaml in repo root)

---

## Running Locally
```bash
pnpm install
pnpm dev        # starts both Vite dev server + Express on port 3000
pnpm build      # production build → dist/public (frontend) + dist/index.js (server)
pnpm start      # runs production build
```

Requires `.env` file at repo root with:
```
DATABASE_URL=postgresql://...
NODE_ENV=development
```

---

## Project Structure
```
fixate/
├── client/src/
│   ├── pages/          # all page components
│   ├── components/     # shared UI components
│   ├── contexts/       # LanguageContext (AR/EN), ThemeContext
│   └── lib/            # analytics.ts (GA4 + Clarity, consent-gated)
├── server/
│   ├── _core/
│   │   ├── index.ts    # main Express server (entry point)
│   │   └── vite.ts     # static serving + Vite dev middleware
│   ├── db/             # Drizzle ORM queries
│   └── routers/        # tRPC routers
├── shared/             # types shared between client and server
├── vite.config.ts      # Vite config (NO Manus plugins — removed)
├── render.yaml         # Render deployment config
└── .github/workflows/  # CI: build + bundle size report on PRs
```

---

## Pages (Marketing — Eagerly Loaded)
| Route | File | Purpose |
|-------|------|---------|
| `/` | `Home.tsx` | Main landing page — hero, how it works, download CTA |
| `/faq` | `FAQ.tsx` | 25 questions, live search, FAQPage JSON-LD |
| `/about` | `AboutUs.tsx` | Company vision, mission, values |
| `/contact` | `Contact.tsx` | WhatsApp CTA + contact form → POST /api/contact |
| `/price-calculator` | `PriceCalculator.tsx` | Price estimator tool |
| `/privacy` | `Privacy.tsx` | PDPL-compliant privacy policy |
| `/terms` | `Terms.tsx` | Terms and conditions |

## Pages (SEO Content — Lazy Loaded)
| Route | File | Purpose |
|-------|------|---------|
| `/services/:slug` | `ServiceLanding.tsx` | 6 service pages (iphone-screen-repair, iphone-battery, samsung-repair, laptop-repair, macbook-repair, ipad-repair) |
| `/cities/:slug` | `CityLanding.tsx` | 6 city pages (riyadh, jeddah, dammam, khobar, mecca, medina) |

Unknown slugs → NotFound automatically.

---

## Key Components
- **`StickyDownloadBar`** — scroll-triggered (400px), OS detection, dismissible via sessionStorage, re-shows after 30s
- **`CookieConsent`** — PDPL-compliant, 3-level consent (necessary/analytics/marketing), stored in localStorage
- **`SEO`** — updates meta tags, OG, canonical, JSON-LD structured data
- **`Footer`** — social links (Instagram, X, TikTok), payment chips (Mada, Visa, STC Pay, Apple Pay, Tabby, Tamara), app store badges
- **`AIChatbot`** — AI-powered chat widget (OpenAI)
- **`LanguageThemeSwitcher`** — AR/EN toggle + light/dark mode

---

## Language & RTL
- Default language: **Arabic (ar)**
- All pages support Arabic + English via `useLanguage()` hook
- `dir={isArabic ? "rtl" : "ltr"}` applied to page root div
- Mix of `t("key")` translation function and inline bilingual strings — both patterns are used

---

## Analytics (Consent-Gated)
- **GA4:** set `VITE_GA4_MEASUREMENT_ID` env var
- **Microsoft Clarity:** set `VITE_CLARITY_PROJECT_ID` env var
- Scripts only injected after user accepts analytics in cookie banner
- `trackEvent()` from `client/src/lib/analytics.ts`

---

## API Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/ping` | Keep-alive for cron-job.org (no DB) |
| GET | `/api/health` | DB connectivity check |
| POST | `/api/contact` | Contact form submission (logs to console) |
| GET | `/api/devices/types` | Device types from DB |
| GET | `/api/devices/models/:id` | Device models by type |
| GET | `/api/services/types` | Service types from DB |
| GET | `/api/services/price` | Price lookup |
| POST | `/api/auth/signup` | Rate-limited (20/15min) |
| POST | `/api/auth/login` | Rate-limited (20/15min) |
| `/api/trpc/*` | tRPC | All other app API calls |

---

## Security
- **Helmet** CSP: allows self, Google Fonts, GTM
- **CORS** allowlist: fixate.sa, fixate.site, localhost in dev
- **Rate limiting** on auth endpoints: 20 req / 15 min per IP

---

## Deployment (Render)
- Config in `render.yaml`
- Build: `npm install -g pnpm@10 && pnpm install --frozen-lockfile && pnpm build`
- Start: `node dist/index.js`
- **DO NOT add Manus-specific packages** (`vite-plugin-manus-runtime`, `@builder.io/vite-plugin-jsx-loc`) — these were removed because they break the Render build
- Free tier sleeps after 15 min idle → cron-job.org pings `/api/ping` every 14 min to keep awake

---

## Environment Variables
| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string (Neon) |
| `NODE_ENV` | Yes | `production` on Render |
| `VITE_APP_STORE_URL` | No | App Store link (shows "Coming Soon" if not set) |
| `VITE_PLAY_STORE_URL` | No | Play Store link (shows "Coming Soon" if not set) |
| `VITE_GA4_MEASUREMENT_ID` | No | Google Analytics 4 |
| `VITE_CLARITY_PROJECT_ID` | No | Microsoft Clarity |
| `OPENAI_API_KEY` | No | AI Chatbot |

---

## Conventions
- **No booking links** on marketing pages — all CTAs point to `/#download` or WhatsApp
- **AppStoreBadge component** in `Home.tsx` handles coming-soon state automatically
- **All internal/admin pages are lazy-loaded** — only marketing pages are eagerly loaded
- **Sitemap** at `client/public/sitemap.xml` — update `lastmod` when adding pages
- **Contact:** WhatsApp `https://wa.me/966548940042`, email `fixate01@gmail.com`
- **Phone:** +966 54 894 0042
- **Instagram:** `https://www.instagram.com/fixate.sa`

---

## What's Pending (User Actions Required)
See `docs/USER_ACTIONS_REQUIRED.md` for the full list. Key items:
- App Store URL + Play Store URL (once app is published)
- Real business credentials for structured data
- Sentry DSN for error monitoring
- Google Search Console verification
- cron-job.org setup to ping `/api/ping` every 14 min
- DATABASE_URL on Render
