import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import SEO, { structuredDataTemplates } from "@/components/SEO";
import {
  Smartphone,
  Laptop,
  Tablet,
  CheckCircle2,
  Clock,
  Shield,
  Star,
  Menu,
  X,
  ChevronDown,
  Download,
  MapPin,
  Search,
  Home as HomeIcon,
} from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";
import { MobileLanguageThemeSwitcher } from "@/components/MobileLanguageThemeSwitcher";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

const APP_STORE_URL = (import.meta.env.VITE_APP_STORE_URL as string) || null;
const PLAY_STORE_URL = (import.meta.env.VITE_PLAY_STORE_URL as string) || null;

function AppStoreBadge({ platform, language }: { platform: "ios" | "android"; language: string }) {
  const isArabic = language === "ar";
  const href = platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
  const label = platform === "ios"
    ? (isArabic ? "متاح على App Store" : "Download on App Store")
    : (isArabic ? "متاح على Google Play" : "Get it on Google Play");

  if (!href) {
    return (
      <div className="inline-flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl border border-white/20 opacity-60 cursor-default min-w-[170px]">
        <Download className="h-5 w-5 flex-shrink-0" />
        <div className="text-start">
          <p className="text-[10px] text-gray-400">{isArabic ? "قريباً" : "Coming Soon"}</p>
          <p className="text-sm font-semibold">{platform === "ios" ? "App Store" : "Google Play"}</p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors border border-white/10 hover:border-white/30 min-w-[170px] shadow-lg hover:shadow-xl"
    >
      {platform === "ios" ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 flex-shrink-0">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 flex-shrink-0">
          <path d="M3.18 23.76a2.5 2.5 0 01-.94-.64c-.5-.56-.74-1.32-.74-2.25V3.13c0-.93.24-1.69.74-2.25a2.5 2.5 0 01.94-.64L13.46 12l-10.28 11.76zm.88.52l12.42-7.17-2.73-3.12-9.69 10.29zm12.42-13.67L4.06.44l9.69 10.29 2.73-3.12zm1.64.95l2.77 1.6c.79.46.79 1.2 0 1.66l-2.77 1.6L15.39 12l2.73-2.44z" />
        </svg>
      )}
      <div className="text-start">
        <p className="text-[10px] text-gray-300">{isArabic ? (platform === "ios" ? "متاح على" : "احصل عليه من") : (platform === "ios" ? "Download on the" : "Get it on")}</p>
        <p className="text-sm font-bold leading-tight">{platform === "ios" ? "App Store" : "Google Play"}</p>
      </div>
    </a>
  );
}

export default function Home() {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isArabic = language === "ar";

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const scrollToDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("download")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? "rtl" : "ltr"}>
      <SEO
        title="الصفحة الرئيسية"
        description="منصة Fixate — صيانة جوالك في بيتك خلال ساعة. فنيون معتمدون يصلون إليك في الرياض وجدة والدمام وجميع مدن السعودية. ضمان 6 أشهر. احمل التطبيق الآن!"
        canonical="https://fixate.sa/"
        structuredData={structuredDataTemplates.organization}
      />

      {/* ─── Header ──────────────────────────────────────────── */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/"><Logo /></Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 text-foreground hover:bg-muted rounded-lg transition-colors"
              style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
              aria-label="القائمة"
              type="button"
            >
              <Menu className="h-7 w-7" />
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-4">
              <a href="#download" onClick={scrollToDownload}>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  {isArabic ? "حمل التطبيق" : "Download App"}
                </Button>
              </a>
              <Link href="/market" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "متجر فيكست" : "Fixate Market"}
              </Link>
              <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.faq")}
              </Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.about")}
              </Link>
              <LanguageThemeSwitcher />
            </nav>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu ─────────────────────────────────────── */}
      <div
        className="md:hidden fixed inset-0"
        style={{ zIndex: 99999, pointerEvents: mobileMenuOpen ? "auto" : "none", visibility: mobileMenuOpen ? "visible" : "hidden" }}
      >
        <div
          className="absolute inset-0 bg-black/70 transition-opacity duration-300"
          style={{ opacity: mobileMenuOpen ? 1 : 0 }}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className="absolute top-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto transition-transform duration-300"
          style={{ right: 0, transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)", WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-emerald-600 sticky top-0">
            <span className="text-sm font-bold text-white">القائمة</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-3 text-white hover:bg-emerald-700 rounded-lg transition-colors" type="button">
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="flex flex-col p-5 gap-4">
            <a href="#download" onClick={(e) => { setMobileMenuOpen(false); scrollToDownload(e); }}>
              <Button className="w-full h-11 font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 rounded-lg">
                {isArabic ? "📱 حمل التطبيق" : "📱 Download App"}
              </Button>
            </a>
            <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
            {[
              { href: "/market", emoji: "🛍️", label: isArabic ? "متجر فيكست" : "Fixate Market" },
              { href: "/faq", emoji: "❓", label: isArabic ? "الأسئلة الشائعة" : "FAQ" },
              { href: "/about", emoji: "ℹ️", label: isArabic ? "من نحن" : "About Us" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-100 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors py-3 px-3 rounded-lg"
              >
                <span className="text-xl">{item.emoji}</span>
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <MobileLanguageThemeSwitcher />
            </div>
          </nav>
        </div>
      </div>

      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
              <MapPin className="h-3.5 w-3.5" />
              {isArabic ? "خدمة متنقلة في جميع مدن المملكة" : "Mobile service across Saudi Arabia"}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 tracking-tight leading-tight">
              {isArabic ? "صيانة جوالك" : "Fix Your Device"}
              <br />
              <span className="text-primary">{isArabic ? "في بيتك خلال ساعة" : "At Home in One Hour"}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {isArabic
                ? "فنيون معتمدون يصلون إليك، يصلحون جهازك أمامك، مع ضمان 6 أشهر على جميع قطع الغيار."
                : "Certified technicians come to you, fix your device in front of you, with a 6-month warranty on all parts."}
            </p>

            {/* App download CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <AppStoreBadge platform="ios" language={language} />
              <AppStoreBadge platform="android" language={language} />
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-5 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="text-yellow-400">⭐</span>
                <span>4.9/5 {isArabic ? "تقييم" : "rating"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>👥</span>
                <span>+15,000 {isArabic ? "عميل" : "customers"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span>{isArabic ? "ضمان 6 أشهر" : "6-month warranty"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>{isArabic ? "بدون رسوم خفية" : "No hidden fees"}</span>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="mt-10 flex justify-center">
              <a
                href="#how-it-works"
                onClick={(e) => { e.preventDefault(); document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }); }}
                className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isArabic ? "كيف يعمل؟" : "How it works?"}
              >
                <span>{isArabic ? "كيف يعمل؟" : "How it works?"}</span>
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-muted/30 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {[
              { icon: CheckCircle2, title: t("features.transparency"), desc: `${t("features.transparencyDesc1")} ${t("features.transparencyDesc2")}` },
              { icon: Clock, title: t("features.fastService"), desc: `${t("features.fastServiceDesc1")} ${t("features.fastServiceDesc2")}` },
              { icon: Shield, title: t("features.warranty"), desc: `${t("features.warrantyDesc1")} ${t("features.warrantyDesc2")}` },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {isArabic ? "كيف يعمل Fixate؟" : "How Fixate Works"}
            </h2>
            <p className="text-muted-foreground">{isArabic ? "أربع خطوات بسيطة" : "Four simple steps"}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: 1,
                Icon: Download,
                title: isArabic ? "حمل التطبيق" : "Download the App",
                desc: isArabic ? "مجاني على iOS و Android" : "Free on iOS and Android",
              },
              {
                step: 2,
                Icon: Search,
                title: isArabic ? "اختر جهازك والمشكلة" : "Choose Device & Issue",
                desc: isArabic ? "شاهد السعر الدقيق فوراً" : "See the exact price instantly",
              },
              {
                step: 3,
                Icon: HomeIcon,
                title: isArabic ? "الفني يجي لك" : "Technician Comes to You",
                desc: isArabic ? "في بيتك أو مكتبك أو أي مكان" : "Home, office, or anywhere",
              },
              {
                step: 4,
                Icon: CheckCircle2,
                title: isArabic ? "ادفع وقيّم" : "Pay & Rate",
                desc: isArabic ? "ادفع بعد الانتهاء، ثم قيّم الخدمة" : "Pay on completion, then rate",
              },
            ].map((item, idx, arr) => (
              <div key={item.step} className="flex flex-col items-center text-center relative">
                {/* Connector line (desktop only, not on last) */}
                {idx < arr.length - 1 && (
                  <div className="hidden md:block absolute top-7 w-full h-px bg-gradient-to-r from-primary/30 to-primary/10 start-1/2" />
                )}
                <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 z-10 shadow-md">
                  <item.Icon className="h-6 w-6" />
                </div>
                <div className="text-xs font-bold text-primary mb-1">{isArabic ? `الخطوة ${item.step}` : `Step ${item.step}`}</div>
                <h3 className="text-base font-semibold mb-1 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── App Download Section ────────────────────────────── */}
      <section id="download" className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Smartphone className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {isArabic ? "احمل التطبيق الآن" : "Download the App Now"}
            </h2>
            <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto">
              {isArabic
                ? "احجز صيانة جهازك في 60 ثانية. الفني يصلك في الوقت الذي تختاره."
                : "Book a repair in 60 seconds. The technician arrives at your chosen time."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <AppStoreBadge platform="ios" language={language} />
              <AppStoreBadge platform="android" language={language} />
            </div>

            {!APP_STORE_URL && !PLAY_STORE_URL && (
              <p className="text-white/70 text-sm">
                {isArabic
                  ? "سيتوفر التطبيق قريباً — اتركنا بريدك الإلكتروني لنُخبرك عند الإطلاق"
                  : "App coming soon — leave your email to be notified at launch"}
              </p>
            )}

            {/* Trust */}
            <div className="flex flex-wrap gap-6 justify-center mt-8 text-white/80 text-sm">
              <span>⭐ 4.9/5</span>
              <span>👥 +15,000 {isArabic ? "عميل" : "customers"}</span>
              <span>🛡️ {isArabic ? "ضمان 6 أشهر" : "6-month warranty"}</span>
              <span>🚀 {isArabic ? "خدمة فورية" : "Same-day service"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Devices Section ─────────────────────────────────── */}
      <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-3">
              {t("devices.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t("devices.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
            {[
              { Icon: Smartphone, title: t("devices.phones"), desc: t("devices.phonesDesc") },
              { Icon: Laptop, title: t("devices.laptops"), desc: t("devices.laptopsDesc") },
              { Icon: Tablet, title: t("devices.tablets"), desc: t("devices.tabletsDesc") },
            ].map(({ Icon, title, desc }) => (
              <Card key={title} className="group border-2 border-border/50 hover:border-emerald-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20">
                <CardContent className="pt-10 pb-8 min-h-[240px] flex flex-col">
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg mb-5">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-3 text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-center leading-relaxed flex-1 whitespace-pre-line text-sm">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Services Grid */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-8">
              {isArabic ? "خدماتنا" : "Our Services"}
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                t("devices.screenReplacement"),
                t("devices.batteryReplacement"),
                t("devices.chargingPort"),
                t("devices.camera"),
                t("devices.software"),
                t("devices.cleaning"),
              ].map((svc) => (
                <div key={svc} className="flex items-center gap-3 bg-card border border-border/50 hover:border-emerald-500/30 rounded-xl px-4 py-3 transition-colors group">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{svc.replace("• ", "")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Cities Section ──────────────────────────────────── */}
      <section className="py-12 bg-muted/20">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {isArabic ? "نغطي جميع مدن المملكة" : "We Cover All Saudi Cities"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isArabic ? "خدمة متاحة في أكثر من 12 مدينة" : "Service available in 12+ cities"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {(isArabic
              ? ["الرياض", "جدة", "الدمام", "الخبر", "مكة المكرمة", "المدينة المنورة", "الطائف", "تبوك", "أبها", "خميس مشيط", "الأحساء", "جازان"]
              : ["Riyadh", "Jeddah", "Dammam", "Khobar", "Mecca", "Medina", "Taif", "Tabuk", "Abha", "Khamis Mushait", "Al Ahsa", "Jazan"]
            ).map((city) => (
              <span key={city} className="inline-flex items-center gap-1.5 bg-background border border-border rounded-full px-4 py-2 text-sm text-foreground hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors cursor-default">
                <MapPin className="h-3 w-3 text-emerald-500" />
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {isArabic ? "آراء عملائنا" : "Customer Reviews"}
            </h2>
            <p className="text-muted-foreground">
              {isArabic ? "ماذا يقول عملاؤنا عنا" : "What our customers say about us"}
            </p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ─── FAQ Teaser ──────────────────────────────────────── */}
      <section className="py-14 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {isArabic ? "أسئلة شائعة" : "Common Questions"}
              </h2>
            </div>
            <div className="space-y-3">
              {(isArabic ? [
                { q: "كم تكلفة تغيير شاشة آيفون؟", a: "الأسعار تبدأ من 150 ريال وتختلف حسب الموديل. استخدم حاسبة الأسعار للحصول على سعر دقيق لجهازك." },
                { q: "كم يستغرق الإصلاح؟", a: "معظم الإصلاحات تتم في 30-60 دقيقة. الفني يعمل أمامك مباشرة." },
                { q: "هل يوجد ضمان على الإصلاح؟", a: "نعم، ضمان 6 أشهر على جميع قطع الغيار والخدمات." },
              ] : [
                { q: "How much does iPhone screen repair cost?", a: "Prices start from 150 SAR and vary by model. Use the price calculator for an exact quote." },
                { q: "How long does the repair take?", a: "Most repairs take 30-60 minutes. The technician works in front of you." },
                { q: "Is there a warranty on repairs?", a: "Yes, 6-month warranty on all parts and services." },
              ]).map((item, i) => (
                <details key={i} className="bg-card border border-border rounded-xl group">
                  <summary className="px-5 py-4 font-medium text-foreground cursor-pointer list-none flex items-center justify-between hover:bg-muted/50 rounded-xl transition-colors">
                    <span>{item.q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-4 text-sm text-muted-foreground">{item.a}</div>
                </details>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/faq">
                <Button variant="outline" className="rounded-full">
                  {isArabic ? "جميع الأسئلة الشائعة" : "View All FAQ"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ───────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-14 text-center border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isArabic ? "جهازك يحتاج إصلاح؟" : "Need a Device Repair?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {isArabic
                ? "احمل التطبيق الآن واحجز خدمتك في أقل من دقيقة. الفني يصلك في الوقت الذي يناسبك."
                : "Download the app now and book your service in under a minute. The technician arrives at your preferred time."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <AppStoreBadge platform="ios" language={language} />
              <AppStoreBadge platform="android" language={language} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
