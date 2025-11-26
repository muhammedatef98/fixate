# دليل الاستضافة - Fixate

هذا الدليل يشرح خطوات استضافة مشروع Fixate على منصات مختلفة.

## 📋 المتطلبات الأساسية

قبل البدء، تأكد من توفر:

1. ✅ حساب GitHub
2. ✅ قاعدة بيانات MySQL/TiDB
3. ✅ Google Maps API Key
4. ✅ المتغيرات البيئية الأساسية

---

## 🚀 الاستضافة على Vercel (الأسهل - موصى به)

### الخطوات:

#### 1. إعداد قاعدة البيانات

**الخيار الأول: PlanetScale (مجاني)**

```bash
# سجل على https://planetscale.com
# أنشئ database جديد
# احصل على connection string
```

**الخيار الثاني: Vercel Postgres**

```bash
# من لوحة تحكم Vercel
# Storage → Create Database → Postgres
```

#### 2. رفع على Vercel

```bash
# تنصيب Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# رفع المشروع
cd fixate
vercel
```

#### 3. إضافة Environment Variables

في لوحة تحكم Vercel → Settings → Environment Variables:

```
DATABASE_URL=mysql://user:pass@host/db
JWT_SECRET=your-random-secret-key
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

**لتوليد JWT_SECRET:**
```bash
openssl rand -base64 32
```

#### 4. Deploy!

```bash
vercel --prod
```

✅ **تم!** موقعك الآن على: `https://your-project.vercel.app`

---

## 🚂 الاستضافة على Railway

### الخطوات:

#### 1. إنشاء حساب

اذهب إلى [railway.app](https://railway.app) وسجل بـ GitHub

#### 2. إنشاء مشروع جديد

```
1. New Project
2. Deploy from GitHub repo
3. اختر repository: fixate
```

#### 3. إضافة MySQL

```
1. في المشروع → New → Database → MySQL
2. انتظر حتى يتم الإنشاء
3. سيتم إضافة DATABASE_URL تلقائياً
```

#### 4. إضافة Environment Variables

```
JWT_SECRET=your-secret-key
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

#### 5. Deploy

Railway سيقوم بالـ deploy تلقائياً عند كل push!

✅ **تم!** موقعك الآن على: `https://your-project.up.railway.app`

---

## 🎨 الاستضافة على Render

### الخطوات:

#### 1. إنشاء حساب

اذهب إلى [render.com](https://render.com) وسجل بـ GitHub

#### 2. إنشاء Web Service

```
1. New → Web Service
2. Connect GitHub repository: fixate
3. Name: fixate
4. Build Command: pnpm install && pnpm build
5. Start Command: pnpm start
```

#### 3. إضافة MySQL

```
1. New → PostgreSQL (أو استخدم PlanetScale MySQL)
2. احصل على connection string
```

#### 4. إضافة Environment Variables

```
DATABASE_URL=your-database-url
JWT_SECRET=your-secret-key
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
NODE_VERSION=22
```

#### 5. Deploy

اضغط "Create Web Service"

✅ **تم!** موقعك الآن على: `https://fixate.onrender.com`

---

## 🐳 الاستضافة باستخدام Docker

### 1. إنشاء Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 3000

# Start
CMD ["pnpm", "start"]
```

### 2. إنشاء docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://root:password@db:3306/fixate
      - JWT_SECRET=your-secret-key
      - VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=fixate
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### 3. تشغيل

```bash
docker-compose up -d
```

✅ **تم!** موقعك الآن على: `http://localhost:3000`

---

## 🔐 الحصول على Google Maps API Key

### الخطوات:

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ مشروع جديد أو اختر مشروع موجود
3. من القائمة → APIs & Services → Library
4. ابحث عن "Maps JavaScript API" وفعّله
5. اذهب إلى Credentials → Create Credentials → API Key
6. انسخ الـ API Key
7. (اختياري) قيّد الـ API Key بالدومين الخاص بك

**التكلفة:** مجاني حتى 28,000 طلب شهرياً

---

## 📊 إعداد قاعدة البيانات

### PlanetScale (موصى به - مجاني)

```bash
# 1. سجل على https://planetscale.com
# 2. أنشئ database جديد
# 3. احصل على connection string
# 4. أضفه في Environment Variables:

DATABASE_URL=mysql://user:pass@aws.connect.psdb.cloud/fixate?sslaccept=strict
```

### Supabase (بديل مجاني)

```bash
# 1. سجل على https://supabase.com
# 2. أنشئ project جديد
# 3. احصل على PostgreSQL connection string
# 4. عدّل Drizzle config لاستخدام PostgreSQL
```

### MySQL محلي (للتطوير)

```bash
# تشغيل MySQL
mysql -u root -p

# إنشاء قاعدة البيانات
CREATE DATABASE fixate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Connection string
DATABASE_URL=mysql://root:password@localhost:3306/fixate
```

---

## 🔧 إعدادات إضافية

### تفعيل HTTPS

معظم المنصات (Vercel, Railway, Render) توفر HTTPS تلقائياً.

### ربط Domain مخصص

#### Vercel:
```
Settings → Domains → Add Domain
```

#### Railway:
```
Settings → Networking → Custom Domain
```

#### Render:
```
Settings → Custom Domain
```

### تحسين الأداء

1. **تفعيل Caching:**
   ```
   # في vercel.json
   {
     "headers": [
       {
         "source": "/assets/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=31536000, immutable"
           }
         ]
       }
     ]
   }
   ```

2. **تفعيل Compression:**
   معظم المنصات تفعلها تلقائياً

3. **استخدام CDN:**
   Vercel و Cloudflare يوفرون CDN تلقائياً

---

## 🐛 حل المشاكل الشائعة

### المشكلة: Database connection failed

**الحل:**
```bash
# تأكد من صحة DATABASE_URL
# تأكد من السماح بالاتصالات من IP الخاص بالسيرفر
# في PlanetScale: Settings → Security → Add IP
```

### المشكلة: Build failed

**الحل:**
```bash
# تأكد من Node.js version 22+
# تأكد من تنصيب pnpm
# امسح node_modules وأعد التنصيب:
rm -rf node_modules
pnpm install
```

### المشكلة: Google Maps لا يعمل

**الحل:**
```bash
# تأكد من إضافة VITE_GOOGLE_MAPS_API_KEY
# تأكد من تفعيل Maps JavaScript API
# تأكد من عدم تقييد الـ API Key بشكل خاطئ
```

---

## 📈 المراقبة والتحليلات

### Vercel Analytics

```bash
# مدمج تلقائياً في Vercel
# اذهب إلى Analytics tab
```

### Google Analytics

```bash
# أضف في client/index.html:
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

## 🔄 التحديثات التلقائية

### GitHub Actions (CI/CD)

أنشئ `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
      - run: npm i -g pnpm
      - run: pnpm install
      - run: pnpm test
      - run: pnpm build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## ✅ Checklist قبل الإطلاق

- [ ] قاعدة البيانات جاهزة ومتصلة
- [ ] جميع Environment Variables مضافة
- [ ] Google Maps API Key يعمل
- [ ] الموقع يعمل على HTTPS
- [ ] تم اختبار جميع الصفحات
- [ ] تم اختبار الحجز وتتبع الطلبات
- [ ] تم اختبار Dark Mode واللغات
- [ ] تم ربط Domain مخصص (اختياري)
- [ ] تم إعداد Google Analytics (اختياري)

---

## 📞 الدعم

إذا واجهت أي مشكلة:

1. راجع [README.md](./README.md)
2. افتح Issue على GitHub
3. تواصل مع الدعم الفني

---

**نصيحة:** ابدأ بـ Vercel + PlanetScale للبداية السريعة، ثم انتقل لحلول أخرى حسب الحاجة.

✨ **حظاً موفقاً!**
