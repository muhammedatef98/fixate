<div align="center">

# Fixate

**منصة صيانة الأجهزة الإلكترونية في المملكة العربية السعودية**
*Mobile device repair platform for Saudi Arabia*

[![Live](https://img.shields.io/badge/Live-fixatee.onrender.com-10b981?style=flat-square)](https://fixatee.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Node](https://img.shields.io/badge/Node-22-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)](https://neon.tech)

[العربية](#-نظرة-عامة) · [English](#-overview) · [Live Demo](https://fixatee.onrender.com)

</div>

---

## 📱 نظرة عامة

**Fixate** منصة ذكية لصيانة الجوالات واللابتوبات والتابلت في السعودية. الفني يصل إليك أينما كنت بعربة مجهزة بالكامل، أو نستلم جهازك ونوصله بعد الإصلاح. خدمة سريعة، شفافة، ومضمونة ٦ أشهر.

> هذا الـ repo هو **الموقع التسويقي + الـ backend API**. تطبيقات الـ iOS و Android لسه قيد النشر.

---

## ✨ المميزات | Features

| | الميزة | Feature |
|---|---|---|
| 🏠 | صيانة في موقعك | At-home repair service |
| ⚡ | حجز في دقائق | Booking in minutes |
| 📍 | تتبع الفني مباشرة | Live technician tracking |
| 🛡️ | ضمان ٦ شهور | 6-month warranty |
| 🎁 | برنامج ولاء بالنقاط | Points-based loyalty program |
| 💬 | شات بوت ذكي | AI-powered chatbot |
| 📲 | يعمل كتطبيق PWA | Installable PWA |
| 🌙 | وضع ليلي + RTL | Dark mode + RTL support |
| 🌐 | عربي / إنجليزي | Arabic / English |

---

## 🛠️ التقنيات | Tech Stack

**Frontend**
- React 19 · TypeScript · Vite 7
- TailwindCSS 4 · shadcn/ui · Framer Motion
- Wouter (routing) · TanStack Query

**Backend**
- Node.js 22 · Express 4
- tRPC 11 (type-safe API)
- PostgreSQL (Neon) · Drizzle ORM
- Helmet · express-rate-limit · CORS

**DevOps**
- Render (hosting) · GitHub Actions (CI)
- pnpm · esbuild

---

## 🚀 التشغيل المحلي | Running Locally

```bash
# 1. Clone & install
git clone https://github.com/muhammedatef98/fixate.git
cd fixate
pnpm install

# 2. Add .env at repo root
echo "DATABASE_URL=postgresql://..." > .env
echo "NODE_ENV=development" >> .env

# 3. Start dev server (Vite + Express on port 3000)
pnpm dev
```

| Script | Purpose |
|---|---|
| `pnpm dev` | Dev server with HMR |
| `pnpm build` | Production build → `dist/` |
| `pnpm start` | Run production build |
| `pnpm check` | TypeScript type check |
| `pnpm test` | Run Vitest tests |
| `pnpm db:push` | Generate & run DB migrations |

---

## 📂 هيكلة المشروع | Project Structure

```
fixate/
├── client/                  # React frontend
│   ├── src/
│   │   ├── pages/           # Route components (Home, FAQ, Services, ...)
│   │   ├── components/      # Shared UI (Header, Footer, SEO, ...)
│   │   ├── contexts/        # Language (AR/EN) & Theme providers
│   │   └── lib/             # tRPC client, analytics, utilities
│   └── public/              # Static assets, sitemap, sw.js, icons
├── server/
│   ├── _core/               # Express entry + Vite middleware
│   ├── db/                  # Drizzle schema & queries
│   ├── routers/             # tRPC routers
│   └── routes/              # REST endpoints
├── shared/                  # Types shared between client & server
├── render.yaml              # Render deployment config
└── vite.config.ts
```

---

## 📡 API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/ping` | Keep-alive (no DB) |
| `GET` | `/api/health` | DB connectivity check |
| `POST` | `/api/contact` | Contact form submission |
| `GET` | `/api/devices/types` | List device types |
| `GET` | `/api/devices/models/:id` | Models by device type |
| `GET` | `/api/services/types` | List service types |
| `GET` | `/api/services/price` | Price lookup |
| `POST` | `/api/auth/signup` | User signup *(rate-limited)* |
| `POST` | `/api/auth/login` | User login *(rate-limited)* |
| `*` | `/api/trpc/*` | Type-safe tRPC API |

---

## 🚢 النشر | Deployment

المشروع منشور على **Render** (free tier) من خلال [`render.yaml`](render.yaml):

```yaml
buildCommand: npm install -g pnpm@10 && pnpm install --frozen-lockfile && pnpm build
startCommand: node dist/index.js
```

> **Tip:** الـ free tier بيدخل sleep بعد ١٥ دقيقة. استخدم cron-job.org لـ ping على `/api/ping` كل ١٤ دقيقة عشان يفضل صاحي.

تفاصيل أكتر في [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md).

---

## 🔒 الأمان | Security

- **Helmet** — CSP, HSTS, X-Frame-Options, و security headers تانية
- **CORS** — مقصور على origins معتمدة (`/api/*` فقط)
- **Rate limiting** — ٢٠ request / ١٥ دقيقة على endpoints الـ auth
- **PDPL compliant** — cookie consent بثلاث مستويات (necessary / analytics / marketing)

---

## 🌍 SEO

- Static OG/Twitter metadata + dynamic JSON-LD (LocalBusiness, FAQPage, Service)
- Sitemap.xml + robots.txt
- صفحات SEO landing لـ ٦ مدن (الرياض، جدة، الدمام، الخبر، مكة، المدينة) و ٦ خدمات
- Lighthouse Performance >90 على mobile

---

## 🔧 متغيرات البيئة | Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection (Neon) |
| `NODE_ENV` | ✅ | `production` on Render |
| `VITE_APP_STORE_URL` | ⬜ | iOS App Store link |
| `VITE_PLAY_STORE_URL` | ⬜ | Google Play link |
| `VITE_GA4_MEASUREMENT_ID` | ⬜ | Google Analytics 4 |
| `VITE_CLARITY_PROJECT_ID` | ⬜ | Microsoft Clarity |
| `OPENAI_API_KEY` | ⬜ | AI chatbot |

---

## 🇬🇧 Overview

**Fixate** is a smart mobile device repair platform for Saudi Arabia. Our certified technicians come to your location with fully-equipped vans, or we collect & deliver for advanced repairs. Fast, transparent, and backed by a 6-month warranty.

> This repository hosts the **marketing website + backend API**. The native iOS / Android apps are not yet published.

**Service options:**
- 🔧 **Mobile Technician** — On-site repair for screens, batteries, charging ports, and audio.
- 🚚 **Pickup & Delivery** — For complex repairs (motherboard, processor, precision work) handled at our partner workshops.

**Service area:** Riyadh, Jeddah, Dammam, Khobar, Mecca, Medina — and expanding.

---

## 📬 التواصل | Contact

<div align="center">

[![Website](https://img.shields.io/badge/Website-fixatee.onrender.com-10b981?style=for-the-badge)](https://fixatee.onrender.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+966_54_894_0042-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/966548940042)
[![Instagram](https://img.shields.io/badge/Instagram-@fixate.sa-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/fixate.sa)
[![Email](https://img.shields.io/badge/Email-fixate01@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:fixate01@gmail.com)

</div>

---

## 📄 License

Released under the [MIT License](LICENSE).

<div align="center">

**Built with ❤️ by [Mohammed Atef](https://github.com/muhammedatef98)**

⭐ Star this repo if you found it useful!

</div>
