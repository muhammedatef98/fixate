# Fixate — Restoring the Web-App Version

This document explains how to revert the static-site changes and bring the Express + tRPC + Postgres backend back online.

## Nothing was deleted

All backend code is still in the repo:

- `server/` — Express entry point, tRPC routers, DB queries
- `shared/` — types shared between client and server
- `drizzle/`, `drizzle.config.ts`, `database/` — schema and migrations
- `Dockerfile`, `docker-compose.yml` — full container setup
- `render.web.yaml.bak` — the original Node web-service `render.yaml`

The web-app `pnpm build` script is **still present** in `package.json` and still works. Only `pnpm build:static` was added alongside it.

## Files that were modified for the static build

| File | Change | How to restore |
|---|---|---|
| `client/index.html` | Removed `<link rel="manifest">`; SW registration replaced with an unregister script. | Re-add `<link rel="manifest" href="/manifest.json" />` and restore the original `navigator.serviceWorker.register('/sw.js')` block. |
| `client/public/sw.js` | Deleted. | Recover from git history: `git show HEAD:client/public/sw.js > client/public/sw.js` (use the commit before the static conversion). |
| `client/public/_redirects` | Added for Render SPA fallback. | Optional — harmless if kept; delete if you prefer. |
| `client/src/pages/Contact.tsx` | Form submit now opens WhatsApp instead of POSTing to `/api/contact`. | Restore the original `fetch("/api/contact", ...)` block in `handleSubmit`. |
| `package.json` | Added `build:static` script. | Remove the script, or keep it — it doesn't affect the web-app build. |
| `render.yaml` | Switched from `runtime: node` web service to `runtime: static`. | `cp render.web.yaml.bak render.yaml`. |

No imports were removed. `@trpc/*`, `drizzle-orm`, `express`, `postgres`, `bcryptjs`, etc. are all still in `package.json` and `node_modules`.

## Steps to restore the web app

```bash
# 1. Restore render.yaml
cp render.web.yaml.bak render.yaml

# 2. Restore the Contact form's API call
#    Edit client/src/pages/Contact.tsx — see git history for the original handleSubmit body.
git log -p -- client/src/pages/Contact.tsx   # find the pre-static commit

# 3. (Optional) Restore PWA
#    Edit client/index.html — add back <link rel="manifest" href="/manifest.json" />
#    and the original SW registration block.
#    Restore client/public/sw.js from git history.

# 4. Build & run as before
pnpm install
pnpm build          # full build: vite + esbuild for server
pnpm start          # Node server on port 3000
```

## On Render

Replace the Static Site service with a Web Service:

| Field | Value |
|---|---|
| Service Type | Web Service |
| Build Command | `npm install -g pnpm@10 && pnpm install --frozen-lockfile && pnpm build` |
| Start Command | `node dist/index.js` |
| Env vars | `NODE_ENV=production`, `NODE_VERSION=22`, `DATABASE_URL=postgresql://...`, optionally `OPENAI_API_KEY` |

`render.web.yaml.bak` already contains these settings — copying it to `render.yaml` and re-syncing the Blueprint is the fastest path.

## Reverting via git

The cleanest option is to revert the static-conversion commit:

```bash
git log --oneline                       # find the static-conversion commit
git revert <commit-sha>                 # creates a revert commit
# or for a hard reset (destructive):
# git reset --hard <previous-commit>
```

Branching strategy used for this conversion: the static work lives on `claude/hardcore-diffie-6c4a89`. The previous `main` branch is untouched and remains the canonical web-app version.
