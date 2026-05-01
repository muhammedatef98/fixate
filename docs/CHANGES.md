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
