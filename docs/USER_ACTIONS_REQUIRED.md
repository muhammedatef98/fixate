# User Actions Required
*Things Claude cannot do — these need the site owner to act.*

---

## 🔴 Blocking (Do Before Launch)

### 1. App Store & Google Play URLs
The download buttons on the website need real URLs.
- **App Store URL:** `https://apps.apple.com/app/fixate/id[YOUR_APP_ID]`
- **Google Play URL:** `https://play.google.com/store/apps/details?id=[YOUR_PACKAGE_NAME]`
- **Where to update:** `client/src/pages/Home.tsx` — look for `TODO: APP_STORE_URL` and `TODO: PLAY_STORE_URL`

### 2. Saudi Business Credentials
Required on the About and Footer for legal compliance and trust:
- **Commercial Registration (CR) number** (رقم السجل التجاري)
- **VAT / Tax Registration number** (الرقم الضريبي / رقم تسجيل ضريبة القيمة المضافة)
- **Where to update:** `client/src/pages/AboutUs.tsx` and `client/src/components/Footer.tsx`

### 3. Legal Review
The Privacy Policy, Terms of Service, and Cookie Policy pages were generated following PDPL requirements but **must be reviewed by a Saudi-licensed lawyer** before publishing.
- Contact a lawyer familiar with نظام حماية البيانات الشخصية (PDPL)
- Pages to review: `/privacy`, `/terms`, `/cookies`

---

## 🟡 High Priority (Do Within First Month)

### 4. Cron-Job.org Keep-Alive (Render Free Tier)
Without this, the server sleeps after 15 minutes and users get 30-60s load times.
1. Go to https://cron-job.org and create a free account
2. Create a new cron job:
   - URL: `https://fixate.onrender.com/api/ping`
   - Schedule: Every 10 minutes (`*/10 * * * *`)
   - Method: GET
3. Enable the job

**Alternative:** Upgrade Render to the $7/month "Starter" plan to eliminate sleep entirely.

### 5. Real Testimonials & Customer Photos
Placeholder testimonials are clearly marked with `[PLACEHOLDER]`. Replace them with:
- Real customer names (with consent)
- Real ratings from your service history
- Real locations (city in Saudi Arabia)
- Optional: customer photos (with written consent)

### 6. Real Stats & Numbers
The homepage counters (number of customers, repairs, cities, rating) use placeholder values.
- Pull real numbers from your database (the admin dashboard has these)
- Update in `client/src/pages/Home.tsx`

### 7. Team Photos & Company Story
The About page has placeholder content:
- Real founder/team photos
- The actual story of how Fixate started
- Real office address for map embed

### 8. WhatsApp Business Setup
WhatsApp is the primary contact method in Saudi Arabia.
- Set up WhatsApp Business account
- Get verified business number
- Update the contact number in `client/src/pages/Contact.tsx`
- Consider WhatsApp Business API for automated responses

### 9. Real Contact Details
Update `client/src/pages/Contact.tsx` and the footer with:
- Business phone number (click-to-call)
- Business email
- Office address
- Business hours

---

## 🟢 Nice to Have (Do Within 3 Months)

### 10. Sentry Account (Error Monitoring)
1. Create account at https://sentry.io (free tier: 5K errors/month)
2. Create a new project → JavaScript (React)
3. Copy the DSN
4. Set environment variable: `VITE_SENTRY_DSN=your-dsn-here`
5. The integration code is already in place, just needs the DSN

### 11. Google Search Console
1. Go to https://search.google.com/search-console
2. Add property for your domain
3. Verify ownership (HTML tag method is easiest — add to `client/index.html`)
4. Submit the sitemap: `https://fixate.onrender.com/sitemap.xml`

### 12. Google Analytics 4
1. Create property at https://analytics.google.com
2. Get the Measurement ID (`G-XXXXXXXXXX`)
3. Set environment variable: `VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX`
4. Tracking code is ready — just needs the ID

### 13. Microsoft Clarity (Free Heatmaps)
1. Sign up at https://clarity.microsoft.com (free, no limits)
2. Create a new project
3. Copy the Project ID
4. Set environment variable: `VITE_CLARITY_PROJECT_ID=your-id`
5. Integration code is in place

### 14. Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add your site
3. Verify (easiest: import from Google Search Console)
4. Submit sitemap

### 15. Email Marketing Tool
Choose one for newsletter / notification campaigns:
- **Brevo** (recommended — free tier 300 emails/day, good Arabic support)
- **Mailchimp** (popular but free tier is limited)
- **Klaviyo** (better for e-commerce funnels)

Once chosen:
1. Create account and get API key
2. Set `EMAIL_MARKETING_API_KEY=your-key` in environment
3. Update `server/routes/newsletter.ts` with the provider's SDK

### 16. Marketing Pixels (When Running Ads)
Set these up only when you're ready to run paid advertising:
- **Meta (Facebook/Instagram) Pixel** → `VITE_META_PIXEL_ID`
- **TikTok Pixel** (very high Saudi usage) → `VITE_TIKTOK_PIXEL_ID`
- **Snapchat Pixel** (also high Saudi usage) → `VITE_SNAPCHAT_PIXEL_ID`
- **Google Ads Conversion Tag** → `VITE_GOOGLE_ADS_ID`

### 17. App Attribution (Branch.io or AppsFlyer)
For tracking which marketing channel drives app downloads:
- Set up deferred deep linking
- Pass through UTM parameters to the app stores
- Recommended: **AppsFlyer** (more common in MENA)

---

## 📝 Content That Needs Writing

These need a human to write in Arabic:

1. **Blog posts** (at least 5 to start SEO momentum):
   - كيف تطيل عمر بطارية الآيفون
   - علامات تدل على ضرورة تغيير شاشة جوالك
   - أفضل طرق حماية اللابتوب من الأعطال
   - ما الفرق بين الإصلاح المتنقل ومراكز الصيانة
   - كيف تحمي بياناتك قبل تسليم جوالك للصيانة

2. **City-specific content** for each landing page (minimum 400 words per city, unique):
   - الرياض، جدة، الدمام، الخبر، مكة، المدينة، والمدن الأخرى

3. **Service-specific content** (minimum 400 words per service, unique):
   - تصليح شاشة آيفون، تغيير بطارية سامسونج، صيانة ماك بوك، إلخ

---

*This file is auto-maintained. Mark items as ✅ Done when completed.*
