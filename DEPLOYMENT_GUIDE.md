# دليل النشر على Render - Fixate

## التغييرات المطبقة

تم تحويل المشروع بالكامل من **MySQL** إلى **PostgreSQL** لحل مشاكل الاتصال بقاعدة البيانات على Render.

### الملفات المعدلة

1. **drizzle.config.ts**
   - تم تغيير `dialect` من `"mysql"` إلى `"postgresql"`

2. **server/db.ts**
   - تم تغيير `drizzle-orm/mysql2` إلى `drizzle-orm/postgres-js`
   - تم إضافة `import postgres from "postgres"`
   - تم تحديث دالة `getDb()` لاستخدام `postgres` client
   - تم تغيير `onDuplicateKeyUpdate` إلى `onConflictDoUpdate`
   - تم تغيير جميع مقارنات `isActive` من `1` إلى `true`

3. **drizzle/migrations**
   - تم حذف جميع migrations القديمة الخاصة بـ MySQL

## خطوات النشر على Render

### 1. التأكد من رفع التغييرات

تم رفع جميع التغييرات إلى GitHub بنجاح ✅

### 2. إعداد قاعدة البيانات على Neon

قاعدة البيانات موجودة بالفعل على Neon:
```
postgresql://neondb_owner:npg_7UoXpe3wOlzL@ep-bitter-firefly-ag76zy1j-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### 3. تحديث متغيرات البيئة على Render

في Render Dashboard:
1. افتح مشروع **fixatee**
2. اذهب إلى **Environment**
3. تأكد من وجود `DATABASE_URL` بالقيمة الصحيحة (موجودة بالفعل ✅)

### 4. إعادة نشر المشروع

في Render Dashboard:
1. اذهب إلى صفحة المشروع الرئيسية
2. اضغط على **"Manual Deploy"** في الأعلى
3. اختر **"Deploy latest commit"**
4. انتظر حتى ينتهي النشر (2-5 دقائق)

### 5. إنشاء الجداول في قاعدة البيانات

بعد نشر المشروع، يجب إنشاء الجداول في قاعدة البيانات. هناك طريقتان:

#### الطريقة الأولى: استخدام Drizzle Kit (موصى بها)

```bash
# في Render Shell أو محلياً
export DATABASE_URL="postgresql://neondb_owner:npg_7UoXpe3wOlzL@ep-bitter-firefly-ag76zy1j-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

#### الطريقة الثانية: SQL مباشر

افتح Neon SQL Editor وقم بتشغيل الأوامر من ملف `drizzle/schema.ts`.

## التحقق من النجاح

بعد إعادة النشر، افتح:
- **الصفحة الرئيسية**: https://fixatee.onrender.com/
- **صفحة الطلبات**: https://fixatee.onrender.com/request

يجب أن يعمل الموقع بدون أخطاء ✅

## استكشاف الأخطاء

### المشكلة: لا تزال الأخطاء موجودة

**الحل:**
1. تحقق من Logs في Render
2. تأكد من أن `DATABASE_URL` صحيحة
3. تأكد من إنشاء الجداول في قاعدة البيانات

### المشكلة: خطأ "Failed to seed database"

**الحل:**
هذا الخطأ طبيعي في أول تشغيل. المشروع يحاول إضافة بيانات أولية. إذا فشل، يمكن تجاهله لأن التطبيق سيعمل بدون البيانات الأولية.

### المشكلة: خطأ "ETIMEDOUT"

**الحل:**
1. تأكد من أن قاعدة البيانات على Neon نشطة
2. تحقق من صحة connection string
3. حاول إعادة نشر المشروع

## الملاحظات المهمة

1. **PostgreSQL vs MySQL**: المشروع الآن يستخدم PostgreSQL بالكامل
2. **Neon Database**: قاعدة البيانات المجانية على Neon تعمل بشكل ممتاز
3. **Migrations**: تم حذف migrations القديمة، يجب إنشاء جداول جديدة
4. **Boolean Values**: PostgreSQL يستخدم `true/false` بدلاً من `1/0`

## الدعم

إذا واجهت أي مشاكل:
1. تحقق من Logs في Render
2. تحقق من Neon Dashboard للتأكد من نشاط قاعدة البيانات
3. تأكد من صحة جميع متغيرات البيئة

---

**تم إنشاء هذا الدليل بواسطة Manus AI**
**التاريخ**: 27 نوفمبر 2024
