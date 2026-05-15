# Fixate — Static Site Deployment (Render)

The marketing site is now a **fully static React SPA**. No Node server, no DB, no edge functions are required at runtime.

## Render Settings (Static Site)

| Field | Value |
|---|---|
| Service Type | **Static Site** (NOT Web Service) |
| Repository | this repo |
| Branch | `main` (or the branch you are deploying) |
| Build Command | `npm install -g pnpm@10 && pnpm install --frozen-lockfile && pnpm build:static` |
| Publish Directory | `dist/public` |
| Node Version | `22` (env var `NODE_VERSION=22`) |
| Start Command | _none — Static Sites have no runtime process_ |
| Rewrite rule | `/* → /index.html` (status 200) — already declared in `render.yaml` and in `client/public/_redirects` |

The repo's `render.yaml` is already configured for the Static Site service, so if you use **Blueprint** deployment Render will pick up everything automatically.

## What was removed / disabled (vs. the web-app version)

- **Express server, tRPC routers, Drizzle / Neon DB** — not compiled into the static build. `server/`, `shared/`, `drizzle/` files are still in the repo but no longer executed (see `README_RESTORE.md` to bring them back).
- **`/api/contact`** runtime endpoint — the Contact form no longer POSTs to the backend. It now opens **WhatsApp** with the message prefilled.
- **Auth / login / signup** — already routed to the `BookingComingSoon` placeholder in `client/src/App.tsx`.
- **AI Chatbot OpenAI calls** — the chatbot UI is intact but does not call any backend (no `fetch`/`trpc` calls remain in `AIChatbot.tsx`).
- **PWA / Service Worker** — `<link rel="manifest">` removed from `client/index.html`; `client/public/sw.js` deleted. The remaining inline script now **unregisters** any service worker users picked up from the previous deploy (so they don't keep serving stale content).
- **Rate-limit / Helmet / CORS middleware** — only existed in `server/` and is no longer in the request path.
- **Runtime env vars** (`DATABASE_URL`, `OPENAI_API_KEY`) — not used by the static build. `VITE_*` build-time vars (GA4, Clarity, App/Play Store URLs) are still respected if set at build time.

## What was converted to static

- **Contact form** → WhatsApp deep-link handoff (`https://wa.me/966548940042?text=…`).
- **All marketing pages** (`/`, `/faq`, `/about`, `/contact`, `/privacy`, `/terms`, `/price-calculator`, `/services/:slug`, `/cities/:slug`) build to static JS/HTML and are served directly from `dist/public`.
- **Lazy feature pages** (login/signup/booking/dashboards) still ship as code-split chunks but contain no live data — they render as UI shells. Most route entries already point at `BookingComingSoon`.

## Deployment steps

1. Push to the deployment branch.
2. In Render dashboard → **New + → Static Site** (or run a Blueprint sync — `render.yaml` is set up).
3. Confirm settings:
   - **Build Command**: `npm install -g pnpm@10 && pnpm install --frozen-lockfile && pnpm build:static`
   - **Publish Directory**: `dist/public`
4. Deploy. First build takes ~1–2 min.
5. Open the Render URL. You should see the Arabic landing page. Test:
   - Navigate to `/faq`, `/about`, `/contact`, `/services/iphone-screen-repair`, `/cities/riyadh` — all should render (SPA rewrite is active).
   - Contact form → submit → WhatsApp opens with prefilled message.

## Verification (already performed locally)

- `pnpm build:static` completes successfully → output in `dist/public/`.
- `dist/public/index.html` + hashed asset bundles + `_redirects` file present.
- No runtime Node process required to serve the site.
- SPA fallback configured in **two places** (`render.yaml` rewrite rule + `_redirects`) so deep-link refreshes work on Render.
- Long-term cache headers set on `/assets/*`.

## Common Render pitfalls — checked

| Risk | Status |
|---|---|
| Wrong Publish Directory | `dist/public` matches Vite's `build.outDir` |
| Wrong Build Command | Uses `build:static` which skips esbuild server bundling |
| Server-runtime dependency | None — no `start` command needed |
| Routes returning 404 on refresh | Fixed via `_redirects` and `render.yaml` rewrite |
| Blank page from JS runtime error | Marketing entry has no DB/API calls; verified `dist/public/index.html` is well-formed |
| Service Worker serving stale shell | Old SW is auto-unregistered on first visit |

## Remaining limitations

- **Contact form** does not store submissions anywhere — it only opens WhatsApp.
- **AI Chatbot, login, signup, booking, dashboards** are UI-only / placeholder. Restoring them requires bringing back the server (see `README_RESTORE.md`).
- **Microsoft Clarity / GA4** still work, but only if you set their `VITE_*` env vars **at build time** (Render Static Site → Environment).
