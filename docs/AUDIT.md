# Fixate Website Audit
*Generated: 2026-05-01*

## Current State

### Tech Stack
| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | React 19 + TypeScript + Vite | Good choice |
| Routing | Wouter | Lightweight, fine for marketing site |
| API | tRPC + Express REST | Overkill for a pure marketing site |
| Data fetching | React Query + tRPC | Fine |
| Database | PostgreSQL (Neon) + Drizzle ORM | Solid |
| Auth | Email/password + cookies | Basic — no JWT in REST endpoints |
| Payments | Moyasar | Saudi-native, correct choice |
| Storage | AWS S3 | Needed for images |
| AI | OpenAI API (chatbot) | Present on all pages |
| PWA | Service Worker + Push | Configured |
| Deployment | Render (free tier suspected) | Sleep problem |
| CI/CD | GitHub Actions (SSH deploy + FTP) | Two overlapping workflows |

### Pages (26 total)
| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Live | Home / Landing |
| `/calculator`, `/price-calculator` | ✅ Live | Duplicate pages |
| `/request`, `/booking`, `/booking-old` | ⚠️ Redirects to BookingComingSoon | Placeholder |
| `/my-requests` | ✅ Live | Authenticated feature |
| `/admin` | ✅ Live | Admin dashboard |
| `/technician`, `/technician-dashboard` | ✅ Live | Technician views |
| `/track`, `/track-order/:id` | ✅ Live | Order tracking |
| `/chat` | ✅ Live | Live chat |
| `/analytics` | ✅ Live | Analytics |
| `/loyalty` | ✅ Live | Loyalty points |
| `/payment` | ✅ Live | Payment flow |
| `/about` | ✅ Live | About page |
| `/faq` | ✅ Live | FAQ |
| `/privacy` | ✅ Live | Privacy policy |
| `/terms` | ✅ Live | Terms |
| `/login`, `/signup`, `/signup-new` | ⚠️ Redirects to BookingComingSoon | Auth disabled |
| `/technicians` | ✅ Live | Technician listing |
| `/profile` | ✅ Live | User profile |
| `/404` | ✅ Live | Not found |

### API Endpoints
- `GET /api/ping` — ✅ Added (Phase 1.1) — keep-alive, no DB
- `GET /api/health` — ✅ Added (Phase 1.1) — DB health check
- `GET /api/devices/types` — REST
- `GET /api/devices/models/:id` — REST
- `GET /api/services/types` — REST
- `GET /api/services/price` — REST
- `POST /api/auth/signup` — REST (⚠️ password stored in plaintext in login check)
- `POST /api/auth/login` — REST (⚠️ plaintext comparison)
- `POST /api/unified-requests/*` — REST
- `/api/trpc/*` — tRPC (all business logic)

### Known Issues Found During Audit

#### Critical
1. **Render sleep** — Free tier sleeps after 15 min inactivity → 30-60s cold start → kills conversions. Mitigation: `/api/ping` now added; cron-job.org setup is a user action.
2. **Plaintext password comparison** (`server/_core/index.ts:140`) — `user.password !== password` — no bcrypt comparison in REST login endpoint. The tRPC auth router likely uses bcrypt; the REST endpoint does not.
3. **No rate limiting** on auth endpoints — brute force risk.

#### High
4. **No CSP / security headers** — Missing Helmet.js.
5. **No CORS configuration** — Express is fully open.
6. **No robots.txt or sitemap.xml** — SEO is blind.
7. **No meta tags beyond basics** — Open Graph, structured data all missing.
8. **Large bundle likely** — OpenAI SDK on the frontend? Needs audit.

#### Medium
9. **Two overlapping CI/CD workflows** (`deploy.yml` + `ftp-deploy.yml`) — confusing.
10. **Duplicate calculator pages** (`/calculator` and `/price-calculator`).
11. **Booking disabled** — Core conversion flow is behind a "coming soon" wall.
12. **Missing `docs/CHANGES.md`** — No change tracking.
13. **Arabic fonts not subset** — Likely large font downloads.
14. **No image optimization** — Images in `docs/` are PNG, up to 1.4MB each.

#### Low
15. **PORT dynamic lookup** — Can cause issues in containerized environments.
16. **`seedDatabase` runs on every cold start** — Minor performance hit.

### What's Already Good
- Multi-language (AR/EN) support with RTL
- Dark mode
- PWA configured
- Framer Motion for animations
- Radix UI components (accessible by default)
- Drizzle ORM with typed schema
- Existing FAQ, Privacy, Terms pages

---

## Metrics to Establish (Baseline)
Run `lighthouse https://fixate.onrender.com` before any changes to document:
- Performance
- Accessibility
- Best Practices
- SEO

*TODO: Run Lighthouse audit once site is live and document in `docs/PERFORMANCE.md`.*
