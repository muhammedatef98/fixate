import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";
import Footer from "@/components/Footer";

import { faqDataAr, faqDataEn, CATEGORIES_AR, CATEGORIES_EN, type FAQItem } from "./faqData";

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
        canonical="https://fixate.site/faq"
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
              <Link href="/contact" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "تواصل معنا" : "Contact Us"}
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
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
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
                  className="bg-card rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(15,23,32,0.04),0_4px_12px_-4px_rgba(15,23,32,0.06)] hover:shadow-[0_2px_4px_rgba(15,23,32,0.05),0_10px_24px_-8px_rgba(15,23,32,0.1)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_12px_-4px_rgba(0,0,0,0.4)] transition-shadow duration-200"
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
