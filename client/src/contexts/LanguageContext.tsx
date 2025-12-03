import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Header
    "nav.services": "الخدمات",
    "nav.howItWorks": "كيف يعمل",
    "nav.pricing": "الأسعار",
    "nav.about": "من نحن",
    "nav.faq": "الأسئلة الشائعة",
    "nav.bookNow": "احجز الآن",
    "nav.login": "تسجيل الدخول",
    
    // Hero
    "hero.title": "إصلاح أجهزتك",
    "hero.subtitle": "بسرعة واحترافية.",
    "hero.description1": "خدمة صيانة متكاملة لجميع أجهزتك الإلكترونية.",
    "hero.description2": "فنيون محترفون يصلون إليك أينما كنت.",
    "hero.bookService": "احجز خدمة الإصلاح",
    "hero.calculatePrice": "احسب السعر فوراً",
    
    // Features
    "features.transparency": "شفافية كاملة",
    "features.transparencyDesc1": "أسعار واضحة ومحددة مسبقاً.",
    "features.transparencyDesc2": "لا توجد تكاليف مخفية.",
    "features.fastService": "خدمة سريعة",
    "features.fastServiceDesc1": "معظم الإصلاحات تتم في نفس اليوم.",
    "features.fastServiceDesc2": "نصلك أينما كنت.",
    "features.warranty": "ضمان ذهبي",
    "features.warrantyDesc1": "ضمان يصل إلى 6 أشهر",
    "features.warrantyDesc2": "على جميع قطع الغيار والخدمات.",
    
    // Devices
    "devices.title": "الأجهزة التي نصلحها",
    "devices.subtitle": "نغطي جميع أنواع الأجهزة الإلكترونية",
    "devices.phones": "الجوالات",
    "devices.phonesDesc": "iPhone, Samsung, Huawei\nوجميع الأنواع الأخرى",
    "devices.laptops": "اللابتوبات",
    "devices.laptopsDesc": "MacBook, Dell, HP, Lenovo\nوجميع الأنواع",
    "devices.tablets": "التابلت",
    "devices.tabletsDesc": "iPad, Samsung Tab\nوجميع الأنواع الأخرى",
    "devices.screenReplacement": "• تغيير الشاشة",
    "devices.batteryReplacement": "• تغيير البطارية",
    "devices.chargingPort": "• إصلاح منفذ الشحن",
    "devices.camera": "• إصلاح الكاميرا",
    "devices.software": "• حل مشاكل البرامج",
    "devices.cleaning": "• تنظيف وصيانة",
    
    // How It Works
    "howItWorks.title": "كيف يعمل Fixate؟",
    "howItWorks.subtitle": "ثلاث خطوات بسيطة فقط",
    "howItWorks.step1": "اختر جهازك والمشكلة",
    "howItWorks.step1Desc": "استخدم حاسبة الأسعار\nلمعرفة التكلفة فوراً",
    "howItWorks.step2": "احجز موعداً",
    "howItWorks.step2Desc": "اختر الوقت والمكان\nالمناسبين لك",
    "howItWorks.step3": "نصلك ونصلح جهازك",
    "howItWorks.step3Desc": "فني محترف يصلك\nويصلح جهازك أمامك",
    
    // CTA
    "cta.title": "جهازك يحتاج إصلاح؟",
    "cta.subtitle1": "احجز الآن واحصل على خصم 20%",
    "cta.subtitle2": "على أول خدمة إصلاح",
    "cta.button": "احجز خدمة الإصلاح الآن",
    
    // Footer
    "footer.description": "منصة متكاملة لصيانة الأجهزة الإلكترونية",
    "footer.services": "الخدمات",
    "footer.phoneRepair": "صيانة الجوالات",
    "footer.laptopRepair": "صيانة اللابتوبات",
    "footer.tabletRepair": "صيانة التابلت",
    "footer.calculator": "حاسبة الأسعار",
    "footer.company": "الشركة",
    "footer.about": "من نحن",
    "footer.faq": "الأسئلة الشائعة",
    "footer.technicians": "الفنيون",
    "footer.terms": "الشروط والأحكام",
    "footer.privacy": "سياسة الخصوصية",
    "footer.contact": "تواصل معنا",
    "footer.location": "المملكة العربية السعودية",
    "footer.copyright": "© 2024 Fixate. جميع الحقوق محفوظة.",
  },
  en: {
    // Header
    "nav.services": "Services",
    "nav.howItWorks": "How It Works",
    "nav.pricing": "Pricing",
    "nav.about": "About Us",
    "nav.faq": "FAQ",
    "nav.bookNow": "Book Now",
    "nav.login": "Login",
    
    // Hero
    "hero.title": "Fix Your Devices",
    "hero.subtitle": "Fast and Professional.",
    "hero.description1": "Complete repair service for all your electronic devices.",
    "hero.description2": "Professional technicians come to you wherever you are.",
    "hero.bookService": "Book Repair Service",
    "hero.calculatePrice": "Calculate Price Now",
    
    // Features
    "features.transparency": "Full Transparency",
    "features.transparencyDesc1": "Clear and pre-determined prices.",
    "features.transparencyDesc2": "No hidden costs.",
    "features.fastService": "Fast Service",
    "features.fastServiceDesc1": "Most repairs done same day.",
    "features.fastServiceDesc2": "We come to you wherever you are.",
    "features.warranty": "Gold Warranty",
    "features.warrantyDesc1": "Up to 6 months warranty",
    "features.warrantyDesc2": "on all parts and services.",
    
    // Devices
    "devices.title": "Devices We Repair",
    "devices.subtitle": "We cover all types of electronic devices",
    "devices.phones": "Phones",
    "devices.phonesDesc": "iPhone, Samsung, Huawei\nand all other brands",
    "devices.laptops": "Laptops",
    "devices.laptopsDesc": "MacBook, Dell, HP, Lenovo\nand all brands",
    "devices.tablets": "Tablets",
    "devices.tabletsDesc": "iPad, Samsung Tab\nand all other brands",
    "devices.screenReplacement": "• Screen Replacement",
    "devices.batteryReplacement": "• Battery Replacement",
    "devices.chargingPort": "• Charging Port Repair",
    "devices.camera": "• Camera Repair",
    "devices.software": "• Software Issues",
    "devices.cleaning": "• Cleaning & Maintenance",
    
    // How It Works
    "howItWorks.title": "How Fixate Works?",
    "howItWorks.subtitle": "Just three simple steps",
    "howItWorks.step1": "Choose Your Device & Issue",
    "howItWorks.step1Desc": "Use our price calculator\nto know the cost instantly",
    "howItWorks.step2": "Book an Appointment",
    "howItWorks.step2Desc": "Choose the time and place\nthat suits you",
    "howItWorks.step3": "We Come & Fix Your Device",
    "howItWorks.step3Desc": "Professional technician comes\nand fixes your device in front of you",
    
    // CTA
    "cta.title": "Your Device Needs Repair?",
    "cta.subtitle1": "Book now and get 20% off",
    "cta.subtitle2": "on your first repair service",
    "cta.button": "Book Repair Service Now",
    
    // Footer
    "footer.description": "Complete platform for electronic device repair",
    "footer.services": "Services",
    "footer.phoneRepair": "Phone Repair",
    "footer.laptopRepair": "Laptop Repair",
    "footer.tabletRepair": "Tablet Repair",
    "footer.calculator": "Price Calculator",
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.faq": "FAQ",
    "footer.technicians": "Technicians",
    "footer.terms": "Terms & Conditions",
    "footer.privacy": "Privacy Policy",
    "footer.contact": "Contact Us",
    "footer.location": "Saudi Arabia",
    "footer.copyright": "© 2024 Fixate. All rights reserved.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ar";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
