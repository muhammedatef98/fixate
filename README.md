# Fixate | فيكسيت

<div align="center">

**منصة ذكية لصيانة الأجهزة الإلكترونية**

**Smart Platform for Electronic Device Maintenance**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://fixatee.onrender.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22-green)](https://nodejs.org/)

[العربية](#arabic) | [English](#english)

</div>

---

<a name="arabic"></a>

## 🇸🇦 النسخة العربية

### 📱 نظرة عامة

**Fixate** هي منصة إلكترونية متكاملة تربط بين أصحاب الأجهزة الإلكترونية ومراكز الصيانة المعتمدة. توفر المنصة تجربة سلسة لحجز خدمات الصيانة، تتبع الطلبات، والتواصل المباشر مع الفنيين.

### ✨ المميزات الرئيسية

**للعملاء:**
- حجز مواعيد الصيانة بسهولة وسرعة
- تتبع حالة الطلب في الوقت الفعلي
- نظام تقييم ومراجعات شفاف
- برنامج نقاط الولاء والمكافآت
- دردشة مباشرة مع مراكز الصيانة
- إشعارات فورية بتحديثات الطلب

**لمراكز الصيانة:**
- لوحة تحكم شاملة لإدارة الطلبات
- نظام جدولة ذكي للمواعيد
- إدارة الفنيين والمخزون
- تقارير وإحصائيات تفصيلية
- نظام دفع آمن ومتكامل

### 🛠️ التقنيات المستخدمة

**Frontend:**
- React 19 مع TypeScript
- Tailwind CSS 4 للتصميم
- tRPC للتواصل مع الخادم
- Wouter للتوجيه
- Shadcn/ui للمكونات

**Backend:**
- Node.js 22 مع Express
- PostgreSQL (Neon) للقاعدة
- Drizzle ORM
- JWT للمصادقة
- bcryptjs لتشفير كلمات المرور

**Infrastructure:**
- Render للاستضافة
- Neon لقاعدة البيانات
- GitHub للتحكم بالإصدارات

### 🚀 التثبيت والتشغيل

```bash
# استنساخ المشروع
git clone https://github.com/muhammedatef98/fixate.git
cd fixate

# تثبيت الحزم
pnpm install

# إعداد متغيرات البيئة
cp .env.example .env
# قم بتعديل .env وإضافة DATABASE_URL و JWT_SECRET

# إنشاء قاعدة البيانات
pnpm db:push

# تشغيل المشروع
pnpm dev
```

### 📊 هيكل المشروع

```
fixate/
├── client/               # تطبيق React
│   ├── src/
│   │   ├── pages/       # صفحات التطبيق
│   │   ├── components/  # المكونات القابلة لإعادة الاستخدام
│   │   └── lib/         # المكتبات والأدوات
├── server/              # خادم Express
│   ├── _core/          # الوظائف الأساسية
│   ├── db.ts           # عمليات قاعدة البيانات
│   └── routers.ts      # نقاط نهاية tRPC
├── drizzle/            # مخططات قاعدة البيانات
└── shared/             # الأنواع والثوابت المشتركة
```

### 💼 فرص الاستثمار

Fixate تمثل فرصة استثمارية واعدة في سوق صيانة الأجهزة الإلكترونية المتنامي. المنصة تستهدف:

- **السوق المحلي:** أكثر من 35 مليون مستخدم محتمل في السعودية
- **قطاع متنامي:** نمو سنوي متوقع بنسبة 15% في سوق الصيانة الإلكترونية
- **نموذج عمل مستدام:** عمولة على كل عملية + اشتراكات مراكز الصيانة

### 📞 التواصل

- **المطور:** محمد عاطف
- **البريد الإلكتروني:** muhammedatef98@gmail.com
- **GitHub:** [@muhammedatef98](https://github.com/muhammedatef98)

---

<a name="english"></a>

## 🇬🇧 English Version

### 📱 Overview

**Fixate** is an integrated electronic platform connecting device owners with certified maintenance centers. The platform provides a seamless experience for booking maintenance services, tracking orders, and direct communication with technicians.

### ✨ Key Features

**For Customers:**
- Easy and fast maintenance appointment booking
- Real-time order status tracking
- Transparent rating and review system
- Loyalty points and rewards program
- Direct chat with maintenance centers
- Instant order update notifications

**For Maintenance Centers:**
- Comprehensive dashboard for order management
- Smart scheduling system
- Technician and inventory management
- Detailed reports and statistics
- Secure integrated payment system

### 🛠️ Tech Stack

**Frontend:**
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- tRPC for server communication
- Wouter for routing
- Shadcn/ui for components

**Backend:**
- Node.js 22 with Express
- PostgreSQL (Neon) database
- Drizzle ORM
- JWT authentication
- bcryptjs for password hashing

**Infrastructure:**
- Render for hosting
- Neon for database
- GitHub for version control

### 🚀 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/muhammedatef98/fixate.git
cd fixate

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
# Edit .env and add DATABASE_URL and JWT_SECRET

# Create database
pnpm db:push

# Run the project
pnpm dev
```

### 📊 Project Structure

```
fixate/
├── client/               # React application
│   ├── src/
│   │   ├── pages/       # Application pages
│   │   ├── components/  # Reusable components
│   │   └── lib/         # Libraries and utilities
├── server/              # Express server
│   ├── _core/          # Core functionality
│   ├── db.ts           # Database operations
│   └── routers.ts      # tRPC endpoints
├── drizzle/            # Database schemas
└── shared/             # Shared types and constants
```

### 💼 Investment Opportunity

Fixate represents a promising investment opportunity in the growing electronic device maintenance market. The platform targets:

- **Local Market:** Over 35 million potential users in Saudi Arabia
- **Growing Sector:** Expected annual growth of 15% in electronic maintenance market
- **Sustainable Business Model:** Commission per transaction + maintenance center subscriptions

### 📞 Contact

- **Developer:** Mohammed Atef
- **Email:** muhammedatef98@gmail.com
- **GitHub:** [@muhammedatef98](https://github.com/muhammedatef98)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by Mohammed Atef**

[⬆ Back to top](#fixate--فيكسيت)

</div>
