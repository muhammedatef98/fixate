import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";
import Footer from "@/components/Footer";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqDataAr: FAQItem[] = [
  {
    category: "الأسعار",
    question: "كيف يتم تحديد أسعار الصيانة؟",
    answer: "يتم تحديد الأسعار بناءً على نوع الجهاز والخدمة المطلوبة. يمكنك استخدام حاسبة الأسعار في الموقع للحصول على سعر فوري ودقيق قبل الحجز."
  },
  {
    category: "الأسعار",
    question: "هل توجد رسوم إضافية غير معلنة؟",
    answer: "لا، جميع الأسعار المعروضة نهائية وشاملة. لا توجد أي رسوم خفية أو إضافية."
  },
  {
    category: "الضمان",
    question: "ما هي مدة الضمان على الصيانة؟",
    answer: "نوفر ضمان يصل إلى 6 أشهر على جميع خدمات الصيانة. الضمان يشمل قطع الغيار والعمالة."
  },
  {
    category: "الخدمة",
    question: "كم تستغرق عملية الإصلاح؟",
    answer: "معظم الإصلاحات تتم في نفس اليوم. الإصلاحات البسيطة قد تستغرق ساعة واحدة فقط."
  },
];

const faqDataEn: FAQItem[] = [
  {
    category: "Pricing",
    question: "How are repair prices determined?",
    answer: "Prices are determined based on device type and required service. You can use our price calculator to get an instant accurate quote before booking."
  },
  {
    category: "Pricing",
    question: "Are there any hidden fees?",
    answer: "No, all displayed prices are final and inclusive. There are no hidden or additional fees."
  },
  {
    category: "Warranty",
    question: "What is the warranty period?",
    answer: "We provide up to 6 months warranty on all repair services. The warranty covers parts and labor."
  },
  {
    category: "Service",
    question: "How long does the repair take?",
    answer: "Most repairs are completed same day. Simple repairs may take only one hour."
  },
];

export default function FAQ() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const isArabic = language === "ar";
  const faqData = isArabic ? faqDataAr : faqDataEn;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isArabic ? "الأسئلة الشائعة" : "FAQ"}
        description={isArabic ? "إجابات على الأسئلة الشائعة حول خدمات صيانة الأجهزة الإلكترونية في Fixate" : "Answers to frequently asked questions about Fixate repair services"}
        canonical="https://fixate.sa/faq"
      />
      
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <Logo />
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "الرئيسية" : "Home"}
              </Link>
              <Link href="/about" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/faq" className="text-sm font-semibold text-foreground">
                {t("nav.faq")}
              </Link>
              <Link href="/booking">
                <Button>{t("nav.bookNow")}</Button>
              </Link>
              <LanguageThemeSwitcher />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-semibold text-foreground mb-6 tracking-tight">
              {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              {isArabic 
                ? "إجابات على جميع أسئلتك حول خدمات الصيانة"
                : "Answers to all your questions about our repair services"}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-secondary/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-foreground flex-1">
                    {item.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-semibold mb-6 text-primary-foreground tracking-tight">
              {isArabic ? "لم تجد إجابتك؟" : "Didn't Find Your Answer?"}
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-primary-foreground/90 font-light">
              {isArabic 
                ? "تواصل معنا وسنكون سعداء بمساعدتك"
                : "Contact us and we'll be happy to help"}
            </p>
            <Link href="/booking">
              <Button size="lg" variant="secondary" className="text-base px-8 h-12 rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
                {t("cta.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}