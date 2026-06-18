import { useState } from "react";
import { Link } from "wouter";
import { Mail, Phone, MapPin, Clock, MessageCircle, Menu, X, CheckCircle2, Send } from "lucide-react";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";

const CITIES_AR = ["الرياض", "جدة", "الدمام", "الخبر", "مكة المكرمة", "المدينة المنورة", "أخرى"];
const CITIES_EN = ["Riyadh", "Jeddah", "Dammam", "Al Khobar", "Mecca", "Medina", "Other"];

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Fixate — تواصل معنا",
  url: "https://fixate.site/contact",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "Fixate",
    telephone: "+966548940042",
    email: "support@fixate.site",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressLocality: "القطيف",
      addressRegion: "المنطقة الشرقية",
      streetAddress: "القطيف، المنطقة الشرقية، المملكة العربية السعودية",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "22:00",
      },
    ],
  },
};

export default function Contact() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setError(isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields");
      return;
    }
    setError("");
    setSubmitting(true);
    // Static build: no backend. Forward the message to WhatsApp instead of POST /api/contact.
    const text = isArabic
      ? `الاسم: ${form.name}%0Aالجوال: ${form.phone}%0Aالمدينة: ${form.city}%0Aالرسالة: ${form.message}`
      : `Name: ${form.name}%0APhone: ${form.phone}%0ACity: ${form.city}%0AMessage: ${form.message}`;
    try {
      window.open(`https://wa.me/966548940042?text=${text}`, "_blank", "noopener,noreferrer");
      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: <MessageCircle className="h-6 w-6 text-emerald-600" />,
      labelAr: "واتساب",
      labelEn: "WhatsApp",
      valueAr: "+966 54 894 0042",
      valueEn: "+966 54 894 0042",
      href: "https://wa.me/966548940042",
      primary: true,
    },
    {
      icon: <Phone className="h-6 w-6 text-emerald-600" />,
      labelAr: "الهاتف",
      labelEn: "Phone",
      valueAr: "+966 54 894 0042",
      valueEn: "+966 54 894 0042",
      href: "tel:+966548940042",
    },
    {
      icon: <Mail className="h-6 w-6 text-emerald-600" />,
      labelAr: "البريد الإلكتروني",
      labelEn: "Email",
      valueAr: "support@fixate.site",
      valueEn: "support@fixate.site",
      href: "mailto:support@fixate.site",
    },
    {
      icon: <MapPin className="h-6 w-6 text-emerald-600" />,
      labelAr: "العنوان",
      labelEn: "Location",
      valueAr: "القطيف، المنطقة الشرقية، المملكة العربية السعودية",
      valueEn: "Al-Qatif, Eastern Province, Saudi Arabia",
    },
    {
      icon: <Clock className="h-6 w-6 text-emerald-600" />,
      labelAr: "ساعات العمل",
      labelEn: "Working Hours",
      valueAr: "السبت – الخميس: 8 صباحاً – 10 مساءً",
      valueEn: "Sat – Thu: 8:00 AM – 10:00 PM",
    },
  ];

  const cities = isArabic ? CITIES_AR : CITIES_EN;

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? "rtl" : "ltr"}>
      <SEO
        title={isArabic ? "تواصل معنا" : "Contact Us"}
        description={
          isArabic
            ? "تواصل مع فريق Fixate لصيانة الأجهزة الإلكترونية في السعودية. واتساب، هاتف، أو نموذج تواصل — نرد خلال ساعة."
            : "Contact the Fixate team for electronics repair in Saudi Arabia. WhatsApp, phone, or contact form — we reply within one hour."
        }
        canonical="https://fixate.site/contact"
        structuredData={contactSchema}
      />

      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "الرئيسية" : "Home"}
              </Link>
              <Link href="/faq" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "الأسئلة الشائعة" : "FAQ"}
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-foreground">
                {isArabic ? "تواصل معنا" : "Contact"}
              </Link>
              <a href="/#download">
                <Button>{isArabic ? "حمل التطبيق" : "Download App"}</Button>
              </a>
              <LanguageThemeSwitcher />
            </nav>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={isArabic ? "القائمة" : "Menu"}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className={`absolute top-0 ${isArabic ? "left-0" : "right-0"} bottom-0 w-72 bg-background shadow-2xl p-6 flex flex-col gap-4`}>
            <button className="self-end p-2 rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </button>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium py-2">{isArabic ? "الرئيسية" : "Home"}</Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium py-2">{isArabic ? "الأسئلة الشائعة" : "FAQ"}</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium py-2">{isArabic ? "تواصل معنا" : "Contact"}</Link>
            <a href="/#download" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">{isArabic ? "حمل التطبيق" : "Download App"}</Button>
            </a>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-semibold text-foreground mb-5 tracking-tight">
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              {isArabic
                ? "فريقنا متاح على مدار الساعة طوال أيام الأسبوع — نرد خلال ساعة"
                : "Our team is available 24/7 — we reply within one hour"}
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp primary CTA */}
      <section className="pb-16">
        <div className="container">
          <div className="max-w-md mx-auto">
            <a
              href="https://wa.me/966548940042"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fb956] text-white font-bold text-lg px-8 py-5 rounded-2xl transition-colors shadow-xl hover:shadow-2xl w-full"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {isArabic ? "تواصل عبر واتساب الآن" : "Contact Us on WhatsApp Now"}
            </a>
            <p className="text-center text-sm text-muted-foreground mt-3">
              {isArabic ? "الأسرع والأسهل — رد فوري" : "Fastest & easiest — instant reply"}
            </p>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {contactCards.map((card, i) => {
              const label = isArabic ? card.labelAr : card.labelEn;
              const value = isArabic ? card.valueAr : card.valueEn;
              const inner = (
                <div className={`bg-card rounded-2xl p-6 flex items-start gap-4 border transition-all hover:shadow-lg ${card.primary ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20" : "border-border/50"}`}>
                  <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">{label}</p>
                    <p className={`font-semibold ${card.primary ? "text-emerald-700 dark:text-emerald-400" : "text-foreground"}`}>{value}</p>
                  </div>
                </div>
              );
              return card.href ? (
                <a key={i} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
                  {inner}
                </a>
              ) : (
                <div key={i}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3 tracking-tight text-center">
              {isArabic ? "أرسل لنا رسالة" : "Send Us a Message"}
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              {isArabic ? "سنرد عليك خلال ساعة في أوقات الدوام" : "We'll get back to you within an hour during working hours"}
            </p>

            {submitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {isArabic ? "تم إرسال رسالتك!" : "Message Sent!"}
                </h3>
                <p className="text-muted-foreground">
                  {isArabic ? "سنتواصل معك قريباً عبر الواتساب أو الهاتف" : "We'll reach out to you soon via WhatsApp or phone"}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-primary hover:underline"
                >
                  {isArabic ? "إرسال رسالة أخرى" : "Send another message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {isArabic ? "الاسم *" : "Name *"}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={isArabic ? "اسمك الكريم" : "Your full name"}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {isArabic ? "رقم الجوال (واتساب) *" : "Phone (WhatsApp) *"}
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={isArabic ? "05xxxxxxxx" : "05xxxxxxxx"}
                    dir="ltr"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {isArabic ? "المدينة" : "City"}
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  >
                    <option value="">{isArabic ? "اختر مدينتك" : "Select your city"}</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {isArabic ? "رسالتك *" : "Message *"}
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={isArabic ? "صِف عطل جهازك أو اسأل عن سعر..." : "Describe your device issue or ask about pricing..."}
                    rows={4}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}

                <Button type="submit" disabled={submitting} className="w-full h-12 text-base rounded-xl font-semibold">
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      {isArabic ? "جاري الإرسال..." : "Sending..."}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {isArabic ? "إرسال الرسالة" : "Send Message"}
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
