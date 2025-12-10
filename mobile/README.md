# Fixatee Mobile App 📱

تطبيق Fixatee للهواتف الذكية - منصة صيانة الأجهزة الإلكترونية في السعودية

## 🚀 المميزات

- ✅ واجهة مستخدم عربية احترافية
- ✅ طلب خدمات الصيانة
- ✅ حاسبة الأسعار
- ✅ تتبع الطلبات
- ✅ إدارة الحساب الشخصي
- ✅ دعم Android و iOS
- ✅ تصميم responsive

## 📋 المتطلبات

- Node.js 18+
- pnpm
- Expo CLI
- حساب Expo (للـ build)

## 🛠️ التثبيت والتشغيل

### 1. تثبيت المكتبات

```bash
cd mobile
pnpm install
```

### 2. تشغيل التطبيق في وضع التطوير

```bash
# تشغيل على Android
pnpm android

# تشغيل على iOS (Mac only)
pnpm ios

# تشغيل على الويب
pnpm web

# تشغيل Expo Dev Server
pnpm start
```

## 📦 البناء للإنتاج

### بناء APK للأندرويد

```bash
# تسجيل الدخول إلى Expo
npx eas login

# إنشاء Build Profile
npx eas build:configure

# بناء APK
npx eas build --platform android --profile production
```

### بناء IPA للـ iOS

```bash
# بناء iOS (يتطلب Apple Developer Account)
npx eas build --platform ios --profile production
```

## 🏪 النشر على المتاجر

### Google Play Store

1. **إنشاء حساب Google Play Developer**
   - اذهب إلى [Google Play Console](https://play.google.com/console)
   - ادفع رسوم التسجيل ($25 مرة واحدة)

2. **إنشاء تطبيق جديد**
   - اضغط "Create app"
   - املأ البيانات المطلوبة

3. **رفع APK**
   - اذهب إلى "Production" → "Create new release"
   - ارفع الـ APK المُنشأ من EAS Build
   - املأ Release notes

4. **إكمال Store Listing**
   - أضف الوصف والصور
   - أضف Screenshots (يجب 2 على الأقل)
   - أضف أيقونة التطبيق (512x512)

5. **Content Rating**
   - أكمل الاستبيان للحصول على التصنيف

6. **Pricing & Distribution**
   - اختر الدول (السعودية)
   - حدد مجاني أو مدفوع

7. **إرسال للمراجعة**
   - اضغط "Send for review"
   - المراجعة تستغرق 1-3 أيام

### Apple App Store

1. **Apple Developer Account**
   - سجل في [Apple Developer Program](https://developer.apple.com)
   - الرسوم: $99/سنة

2. **App Store Connect**
   - اذهب إلى [App Store Connect](https://appstoreconnect.apple.com)
   - اضغط "My Apps" → "+"

3. **إنشاء App ID**
   - Bundle ID: `com.fixatee.app`
   - App Name: Fixatee

4. **رفع Build**
   ```bash
   npx eas build --platform ios --profile production
   npx eas submit --platform ios
   ```

5. **إكمال App Information**
   - أضف الوصف والصور
   - أضف Screenshots (مطلوب لكل حجم شاشة)
   - أضف أيقونة التطبيق (1024x1024)

6. **Pricing & Availability**
   - اختر الدول والسعر

7. **إرسال للمراجعة**
   - المراجعة تستغرق 1-5 أيام

## 📸 متطلبات الصور

### Google Play
- **App Icon**: 512x512 PNG
- **Feature Graphic**: 1024x500 PNG
- **Screenshots**: 
  - Phone: 320-3840 pixels (min 2)
  - Tablet: 1200-7680 pixels (optional)

### App Store
- **App Icon**: 1024x1024 PNG
- **Screenshots**:
  - iPhone 6.7": 1290x2796 (min 1)
  - iPhone 6.5": 1242x2688 (min 1)
  - iPhone 5.5": 1242x2208 (optional)
  - iPad Pro 12.9": 2048x2732 (min 1)

## 🔧 التخصيص

### تغيير الألوان
عدّل الملف `app.json`:
```json
{
  "expo": {
    "primaryColor": "#10b981"
  }
}
```

### تغيير الأيقونة
استبدل الملفات في `assets/`:
- `icon.png`
- `splash.png`
- `adaptive-icon.png`

### تغيير Package Name
عدّل في `app.json`:
```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.fixatee"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.fixatee"
    }
  }
}
```

## 📱 اختبار التطبيق

### على جهازك الحقيقي

1. **تثبيت Expo Go**
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)

2. **تشغيل التطبيق**
   ```bash
   pnpm start
   ```

3. **مسح QR Code**
   - افتح Expo Go
   - امسح الـ QR Code

## 🐛 حل المشاكل

### مشكلة في الـ Build
```bash
# امسح الـ cache
npx expo start -c

# أعد تثبيت المكتبات
rm -rf node_modules
pnpm install
```

### مشكلة في الأيقونات
```bash
# تأكد من وجود جميع الأيقونات
ls -la assets/
```

## 📞 الدعم

للمساعدة والدعم:
- Email: support@fixatee.sa
- Website: https://fixatee.onrender.com

## 📄 الترخيص

© 2024 Fixatee. جميع الحقوق محفوظة.
