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
  Watch,
  Gamepad2,
  HandCoins,
  MessageCircle,
  Wallet,
  Gift,
  TicketPercent,
  FileBadge,
  Store,
  Truck,
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
        description="منصة Fixate — صيانة جوالك في بيتك خلال ساعة. فنيون معتمدون يصلون إليك في الرياض وجدة والدمام وجميع مدن السعودية. ضمان 12 شهراً. احمل التطبيق الآن!"
        canonical="https://fixate.site/"
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
              <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "تواصل معنا" : "Contact Us"}
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
              { href: "/contact", emoji: "✉️", label: isArabic ? "تواصل معنا" : "Contact Us" },
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
            <div className="pill-primary inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <MapPin className="h-3.5 w-3.5" />
              {isArabic ? "نصل إليك في مدن المملكة — انطلاقاً من القطيف" : "Serving cities across Saudi Arabia — based in Al Qatif"}
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-5 tracking-tight leading-[1.1]">
              {isArabic ? "صيانة جوالك" : "Fix Your Device"}
              <br />
              <span className="text-primary">{isArabic ? "في بيتك خلال ساعات" : "At Home in Hours"}</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {isArabic
                ? "فنيون معتمدون يصلون إليك، يصلحون جهازك أمامك، مع ضمان 12 شهراً على جميع قطع الغيار."
                : "Certified technicians come to you, fix your device in front of you, with a 12-month warranty on all parts."}
            </p>

            {/* App download CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <AppStoreBadge platform="ios" language={language} />
              <AppStoreBadge platform="android" language={language} />
            </div>

            {/* Trust indicators — unified Lucide iconography, muted tone */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary fill-primary/30" />
                <span>{isArabic ? "تقييم 4.9/5" : "4.9/5 rating"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>{isArabic ? "ضمان 12 شهراً" : "12-month warranty"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{isArabic ? "الفحص مجاني" : "Free inspection"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{isArabic ? "خلال ساعة إلى 3 ساعات" : "Done in 1–3 hours"}</span>
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
      <section className="py-16 md:py-24 bg-card border-y border-border/60">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-10 md:gap-12 max-w-5xl mx-auto">
            {[
              { icon: CheckCircle2, title: t("features.transparency"), desc: `${t("features.transparencyDesc1")} ${t("features.transparencyDesc2")}` },
              { icon: Clock, title: t("features.fastService"), desc: `${t("features.fastServiceDesc1")} ${t("features.fastServiceDesc2")}` },
              { icon: Shield, title: t("features.warranty"), desc: `${t("features.warrantyDesc1")} ${t("features.warrantyDesc2")}` },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-2xl bg-primary-soft flex items-center justify-center mb-5">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3 tracking-tight">
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
                desc: isArabic ? "استلم عروض أسعار من فنيين معتمدين واختر الأنسب" : "Get offers from certified technicians and pick the best",
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

      {/* ─── In-App Features ─────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-card border-y border-border/60">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3 tracking-tight">
              {isArabic ? "كل شيء داخل التطبيق" : "Everything in One App"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {isArabic
                ? "أكثر من مجرد صيانة — منصة متكاملة لجهازك"
                : "More than repairs — a complete platform for your device"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { Icon: HandCoins, title: isArabic ? "عروض تنافسية" : "Competitive Offers", desc: isArabic ? "استقبل عروض أسعار من عدة فنيين واختر الأفضل لك" : "Receive offers from multiple technicians and pick the best" },
              { Icon: MessageCircle, title: isArabic ? "شات مباشر" : "Live Chat", desc: isArabic ? "تواصل مع الفني أو المندوب داخل التطبيق لحظة بلحظة" : "Chat with your technician or courier in real time" },
              { Icon: Truck, title: isArabic ? "استلام وتوصيل" : "Pickup & Delivery", desc: isArabic ? "مندوب يستلم جهازك ويعيده إلى بابك بعد الإصلاح" : "A courier picks up your device and returns it to your door" },
              { Icon: FileBadge, title: isArabic ? "شهادة ضمان رقمية" : "Digital Warranty Certificate", desc: isArabic ? "ضمان 12 شهراً بشهادة رسمية تعرضها وتصدّرها من التطبيق" : "12-month warranty with a certificate you can view and export" },
              { Icon: Wallet, title: isArabic ? "محفظة رقمية" : "Digital Wallet", desc: isArabic ? "رصيدك ومبالغك المستردة في مكان واحد" : "Your balance and refunds in one place" },
              { Icon: Gift, title: isArabic ? "نقاط ولاء" : "Loyalty Points", desc: isArabic ? "اجمع نقاطاً مع كل طلب وحوّلها إلى خصومات" : "Earn points with every order and turn them into discounts" },
              { Icon: TicketPercent, title: isArabic ? "عروض وأكواد خصم" : "Offers & Promo Codes", desc: isArabic ? "خصومات موسمية وأكواد حصرية داخل التطبيق" : "Seasonal deals and exclusive promo codes in the app" },
              { Icon: Store, title: isArabic ? "سوق فيكست" : "Fixate Market", desc: isArabic ? "بِع واشترِ الأجهزة المستعملة بأمان مع مراجعة الفريق لكل إعلان" : "Buy and sell used devices safely — every listing is reviewed" },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-background rounded-2xl p-6 border border-border/60 shadow-[0_1px_2px_rgba(15,23,32,0.04)] hover:border-primary/40 hover:shadow-[0_4px_8px_rgba(15,23,32,0.06),0_18px_40px_-12px_rgba(16,185,129,0.2)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-11 w-11 rounded-xl bg-primary-soft flex items-center justify-center mb-4 transition-colors group-hover:bg-primary">
                  <Icon className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-semibold mb-1.5 text-foreground">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
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
            <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center mt-8 text-white/85 text-sm">
              <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 fill-white/40" />4.9/5</span>
              <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4" />{isArabic ? "ضمان 12 شهراً" : "12-month warranty"}</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />{isArabic ? "الفحص مجاني" : "Free inspection"}</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{isArabic ? "خلال ساعة إلى 3 ساعات" : "Done in 1–3 hours"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Devices Section ─────────────────────────────────── */}
      <section id="services" className="py-16 md:py-24 bg-card-alt border-y border-border/60">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3 tracking-tight">
              {t("devices.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t("devices.subtitle")}</p>
          </div>

          {/* Symmetric, centered device cards — balanced on both edges so the
              layout reads identically in LTR and RTL. */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            {[
              { Icon: Smartphone, title: t("devices.phones"), desc: t("devices.phonesDesc") },
              { Icon: Laptop, title: t("devices.laptops"), desc: t("devices.laptopsDesc") },
              { Icon: Tablet, title: t("devices.tablets"), desc: t("devices.tabletsDesc") },
              { Icon: Watch, title: isArabic ? "الساعات الذكية" : "Smartwatches", desc: isArabic ? "آبل واتش، سامسونج،\nوجميع الأنواع الأخرى" : "Apple Watch, Samsung,\nand all other brands" },
              { Icon: Gamepad2, title: isArabic ? "أجهزة الألعاب" : "Gaming Devices", desc: isArabic ? "بلايستيشن، إكس بوكس،\nنينتندو وغيرها" : "PlayStation, Xbox,\nNintendo and more" },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group relative bg-card rounded-2xl p-8 text-center flex flex-col items-center border border-border/60 shadow-[0_1px_2px_rgba(15,23,32,0.04),0_8px_24px_-8px_rgba(15,23,32,0.08)] hover:shadow-[0_4px_8px_rgba(15,23,32,0.06),0_18px_40px_-12px_rgba(15,23,32,0.18)] hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
              >
                <div className="h-20 w-20 rounded-3xl bg-primary-soft flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">{desc}</p>
              </div>
            ))}
          </div>

          {/* Services Grid */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-center text-foreground mb-8 tracking-tight">
              {isArabic ? "خدماتنا" : "Our Services"}
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                t("devices.screenReplacement"),
                t("devices.batteryReplacement"),
                t("devices.chargingPort"),
                t("devices.camera"),
                t("devices.software"),
                t("devices.cleaning"),
                isArabic ? "إصلاح السماعات والصوت" : "Speaker & Audio Repair",
                isArabic ? "إصلاح الأضرار المادية" : "Physical Damage Repair",
                isArabic ? "استلام وتوصيل عبر مندوب" : "Courier Pickup & Delivery",
              ].map((svc) => (
                <div
                  key={svc}
                  className="group flex items-center gap-3 bg-card rounded-xl px-4 py-3.5 border border-border/60 shadow-[0_1px_2px_rgba(15,23,32,0.04)] hover:border-primary/40 hover:shadow-[0_2px_4px_rgba(15,23,32,0.05),0_10px_24px_-10px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary-soft flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                    <CheckCircle2 className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{svc.replace("• ", "")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Coverage Section ────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary-soft mb-5">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 tracking-tight">
              {isArabic ? "نغطي مدناً في جميع مناطق المملكة" : "Covering cities across all of Saudi Arabia"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isArabic
                ? "انطلاقاً من القطيف بالمنطقة الشرقية، نخدم مدناً في جميع مناطق المملكة الـ13. عند إنشاء الطلب تختار منطقتك ومدينتك وحيّك، والتغطية تتوسّع باستمرار."
                : "Based in Al Qatif, Eastern Province, we serve cities across all 13 regions of Saudi Arabia. When creating a request you pick your region, city and neighborhood — and coverage keeps expanding."}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-card border-y border-border/60">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
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
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                {isArabic ? "أسئلة شائعة" : "Common Questions"}
              </h2>
            </div>
            <div className="space-y-3">
              {(isArabic ? [
                { q: "كيف يتم تحديد السعر؟", a: "يظهر لك سعر تقديري فوري عند إنشاء الطلب، ثم تصلك عروض أسعار من فنيين معتمدين — أنت من يختار العرض ويقبله قبل بدء أي إصلاح." },
                { q: "كم يستغرق الإصلاح؟", a: "يعتمد على نوع العطل، لكن معظم الإصلاحات تكتمل خلال ساعة إلى ٣ ساعات بعد قبولك لعرض الفني." },
                { q: "ما هو الضمان؟", a: "كل إصلاح يشمل ضمان ١٢ شهراً على العمل والقطع المستبدلة، مع شهادة ضمان رقمية داخل التطبيق." },
              ] : [
                { q: "How is the price decided?", a: "You see an instant estimated price when creating the request, then certified technicians send you real offers — you choose and accept one before any repair starts." },
                { q: "How long does a repair take?", a: "It depends on the issue, but most repairs are completed within 1 to 3 hours after you accept an offer." },
                { q: "What warranty do I get?", a: "Every repair includes a 12-month warranty covering the work and any replaced parts, with a digital warranty certificate in the app." },
              ]).map((item, i) => (
                <details key={i} className="bg-card rounded-2xl shadow-[0_1px_2px_rgba(15,23,32,0.04),0_4px_12px_-4px_rgba(15,23,32,0.06)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_12px_-4px_rgba(0,0,0,0.4)] group">
                  <summary className="px-5 py-4 font-medium text-foreground cursor-pointer list-none flex items-center justify-between hover:bg-muted/50 rounded-2xl transition-colors">
                    <span>{item.q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</div>
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
      <section className="py-16 md:py-24 bg-card-alt border-t border-border/60">
        <div className="container">
          <div className="max-w-3xl mx-auto card-soft p-8 md:p-14 text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary-soft mb-5 mx-auto">
              <Smartphone className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              {isArabic ? "جهازك يحتاج إصلاح؟" : "Need a Device Repair?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
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
