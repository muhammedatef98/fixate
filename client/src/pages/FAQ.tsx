import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
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

// المصدر: نفس الأسئلة المعروضة داخل تطبيق Fixate (شاشة chatbot)
const faqDataAr: FAQItem[] = [
  {
    category: "الطلب والحجز",
    question: "كيف أطلب صيانة؟",
    answer: "من الصفحة الرئيسية اضغط «اطلب صيانة جديدة»، اختر جهازك ونوع العطل وطريقة الخدمة، ثم أكمل الطلب. سيصلك فني معتمد لفحص الجهاز."
  },
  {
    category: "الطلب والحجز",
    question: "كم يستغرق الإصلاح؟",
    answer: "يعتمد على نوع العطل، لكن معظم الإصلاحات تكتمل خلال ساعة إلى ٣ ساعات بعد موافقتك على عرض السعر."
  },
  {
    category: "الطلب والحجز",
    question: "هل يوجد استلام وتوصيل؟",
    answer: "نعم. يمكنك اختيار استلام وتوصيل الجهاز، أو زيارة فني متنقل، أو تسليم الجهاز بنفسك في مركز الخدمة."
  },
  {
    category: "الطلب والحجز",
    question: "كيف أتابع حالة طلبي؟",
    answer: "افتح «طلباتي» من الصفحة الرئيسية لرؤية حالة كل طلب وتفاصيله لحظة بلحظة."
  },
  {
    category: "الأسعار والدفع",
    question: "كيف يتم تحديد السعر؟",
    answer: "الفحص مجاني. بعد فحص الفني لجهازك يرسل لك عرض سعر دقيق، وأنت تقرر قبوله أو رفضه قبل بدء أي إصلاح."
  },
  {
    category: "الأسعار والدفع",
    question: "ما طرق الدفع المتاحة؟",
    answer: "يمكنك الدفع نقداً عند الإتمام أو بالبطاقة. يتم الدفع فقط بعد موافقتك على عرض السعر — لا تدفع شيئاً مقابل الفحص."
  },
  {
    category: "الضمان",
    question: "ما هو الضمان؟",
    answer: "كل إصلاح يشمل ضمان ٦ أشهر على العمل والقطع المستبدلة."
  },
  {
    category: "التغطية",
    question: "ما المناطق المغطاة؟",
    answer: "الخدمة متاحة حالياً في القطيف بالمنطقة الشرقية، ونعمل على توسيع التغطية قريباً."
  },
  {
    category: "متجر فيكست",
    question: "كيف أبيع جهازاً في السوق؟",
    answer: "افتح «السوق» ثم «إعلان جديد»، أضف الصور والتفاصيل والسعر. يظهر الإعلان بعد مراجعته من الفريق."
  },
  {
    category: "انضم كفني",
    question: "كيف أصبح فنياً معكم؟",
    answer: "سجّل كفني من شاشة اختيار الدور، أكمل بياناتك ووثائقك، وبعد اعتماد الفريق ستبدأ باستقبال الطلبات."
  },
];

// Source: the same FAQs shown inside the Fixate app (chatbot screen)
const faqDataEn: FAQItem[] = [
  {
    category: "Booking",
    question: "How do I request a repair?",
    answer: "On the home screen tap \"Request a New Repair\", choose your device, the issue and a service method, then submit. A verified technician will be assigned to inspect your device."
  },
  {
    category: "Booking",
    question: "How long does a repair take?",
    answer: "It depends on the issue, but most repairs are completed within 1 to 3 hours after you approve the quote."
  },
  {
    category: "Booking",
    question: "Do you offer pickup & delivery?",
    answer: "Yes. You can choose pickup & delivery, an on-site technician visit, or drop the device off yourself at our service center."
  },
  {
    category: "Booking",
    question: "How do I track my order?",
    answer: "Open \"My Requests\" from the home screen to see the live status and details of every order."
  },
  {
    category: "Pricing & Payment",
    question: "How is the price decided?",
    answer: "Inspection is free. After the technician inspects your device they send an accurate quote — you accept or reject it before any repair starts."
  },
  {
    category: "Pricing & Payment",
    question: "What payment methods are available?",
    answer: "You can pay cash on completion or by card. Payment happens only after you approve the quote — you pay nothing for the inspection."
  },
  {
    category: "Warranty",
    question: "What warranty do I get?",
    answer: "Every repair includes a 6-month warranty covering the work and any replaced parts."
  },
  {
    category: "Coverage",
    question: "Which areas do you cover?",
    answer: "Service is currently available in Al Qatif, Eastern Province. We are expanding coverage soon."
  },
  {
    category: "Fixate Market",
    question: "How do I sell a device in the marketplace?",
    answer: "Open \"Marketplace\", tap \"New listing\", add photos, details and a price. Your listing goes live after the team reviews it."
  },
  {
    category: "Join as Technician",
    question: "How do I become a technician?",
    answer: "Sign up as a technician from the role-selection screen, complete your details and documents, and once the team approves you, you can start receiving jobs."
  },
];

// Build FAQPage JSON-LD structured data
function buildFaqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };
}

const CATEGORIES_AR = ["الطلب والحجز", "الأسعار والدفع", "الضمان", "التغطية", "متجر فيكست", "انضم كفني"] as const;
const CATEGORIES_EN = ["Booking", "Pricing & Payment", "Warranty", "Coverage", "Fixate Market", "Join as Technician"] as const;

export default function FAQ() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const isArabic = language === "ar";
  const faqData = isArabic ? faqDataAr : faqDataEn;
  const categories = isArabic ? CATEGORIES_AR : CATEGORIES_EN;

  const filtered = faqData.filter((item) => {
    const matchesSearch =
      !search ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isArabic ? "الأسئلة الشائعة" : "FAQ"}
        description={
          isArabic
            ? "إجابات شاملة على جميع أسئلتك حول خدمات صيانة الأجهزة الإلكترونية في Fixate — الأسعار، الضمان، التغطية، وكيفية الحجز"
            : "Comprehensive answers to all your questions about Fixate device repair — pricing, warranty, coverage, and how to book"
        }
        canonical="https://fixate.sa/faq"
        structuredData={buildFaqSchema(isArabic ? faqDataAr : faqDataEn)}
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
              <a href="/#download">
                <Button>{isArabic ? "حمل التطبيق" : "Download App"}</Button>
              </a>
              <LanguageThemeSwitcher />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-4 tracking-tight">
              {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {isArabic
                ? "كل ما تحتاج معرفته عن خدمات Fixate"
                : "Everything you need to know about Fixate"}
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isArabic ? "right-4" : "left-4"}`} />
              <input
                type="search"
                placeholder={isArabic ? "ابحث في الأسئلة..." : "Search questions..."}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpenIndex(null);
                }}
                className={`w-full h-12 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${isArabic ? "pr-12 pl-4" : "pl-12 pr-4"}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-6">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => { setActiveCategory(null); setOpenIndex(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!activeCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {isArabic ? "الكل" : "All"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-6 pb-24">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-3">
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                {isArabic ? "لا توجد نتائج. جرّب بحثاً مختلفاً." : "No results. Try a different search."}
              </p>
            )}
            {filtered.map((item, index) => {
              // find original index for stable open state
              const origIndex = faqData.indexOf(item);
              return (
                <div
                  key={origIndex}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === origIndex ? null : origIndex)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                    dir={isArabic ? "rtl" : "ltr"}
                    aria-expanded={openIndex === origIndex}
                  >
                    <span className="text-base font-semibold text-foreground flex-1 text-start">
                      {item.question}
                    </span>
                    {openIndex === origIndex ? (
                      <ChevronUp className="h-5 w-5 text-primary flex-shrink-0 ms-3" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 ms-3" />
                    )}
                  </button>
                  {openIndex === origIndex && (
                    <div className="px-6 pb-5" dir={isArabic ? "rtl" : "ltr"}>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-primary-foreground tracking-tight">
              {isArabic ? "لم تجد إجابتك؟" : "Didn't Find Your Answer?"}
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              {isArabic
                ? "تواصل معنا عبر واتساب ونرد خلال ساعة"
                : "Contact us on WhatsApp — we reply within an hour"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/966548940042"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-emerald-700 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                <span>💬</span>
                {isArabic ? "واتساب" : "WhatsApp"}
              </a>
              <a
                href="/#download"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-emerald-700 text-white font-bold rounded-full hover:bg-emerald-800 transition-colors"
              >
                {isArabic ? "حمل التطبيق" : "Download App"}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
