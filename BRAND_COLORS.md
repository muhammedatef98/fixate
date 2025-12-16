# Fixate - الهوية البصرية

## الألوان الأساسية

### Gradient الرئيسي
```css
background: linear-gradient(to right, #10b981, #6366f1, #ec4899);
/* من أخضر زمردي إلى بنفسجي إلى وردي */
```

### الألوان بالتفصيل
- **Emerald Green**: `#10b981` (RGB: 16, 185, 129)
- **Indigo/Purple**: `#6366f1` (RGB: 99, 102, 241)
- **Pink**: `#ec4899` (RGB: 236, 72, 153)

### تطبيقات الـ Gradient
1. **Hero Sections**: خلفية رئيسية للأقسام المهمة
2. **Call-to-Action Buttons**: أزرار الحث على اتخاذ إجراء
3. **Cards**: بطاقات مميزة
4. **Borders**: حدود العناصر المهمة

### الألوان الثانوية
- **Background**: خلفية داكنة أو فاتحة حسب الوضع
- **Text**: نصوص واضحة ومقروءة
- **Muted**: ألوان هادئة للعناصر الثانوية

## الاستخدام في TailwindCSS

```css
/* Gradient Classes */
.gradient-primary {
  background: linear-gradient(to right, #10b981, #6366f1, #ec4899);
}

.gradient-primary-hover {
  background: linear-gradient(to right, #059669, #4f46e5, #db2777);
}

/* Text Gradient */
.text-gradient {
  background: linear-gradient(to right, #10b981, #6366f1, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## الاستخدام في المكونات

### Hero Section
```tsx
<section className="bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500">
  {/* Content */}
</section>
```

### Button
```tsx
<button className="bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500 hover:from-emerald-600 hover:via-indigo-600 hover:to-pink-600">
  {/* Text */}
</button>
```

### Card
```tsx
<div className="border-2 border-transparent bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500 p-[2px] rounded-xl">
  <div className="bg-background rounded-xl p-6">
    {/* Content */}
  </div>
</div>
```

---

تم التحديث: 16 ديسمبر 2024
