import { useParams, Link } from "wouter";
import { useState } from "react";
import { Shield, Clock, CheckCircle2, Download, Menu, X, MessageCircle, Smartphone, Laptop, Tablet, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";
import NotFound from "./NotFound";

const APP_STORE_URL = (import.meta.env.VITE_APP_STORE_URL as string) || null;
const PLAY_STORE_URL = (import.meta.env.VITE_PLAY_STORE_URL as string) || null;

interface CityData {
  slug: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  heroAr: string;
  heroEn: string;
  subheadAr: string;
  subheadEn: string;
  keywordsAr: string;
  keywordsEn: string;
  regionAr: string;
  regionEn: string;
}

const CITIES: Record<string, CityData> = {
  riyadh: {
    slug: "riyadh",
    nameAr: "الرياض",
    nameEn: "Riyadh",
    regionAr: "منطقة الرياض",
    regionEn: "Riyadh Region",
    descAr: "تصليح جوالات ولابتوبات في الرياض في المنزل خلال ساعة. فنيون معتمدون يغطون جميع أحياء الرياض بضمان 6 أشهر.",
    descEn: "Phone and laptop repair in Riyadh at your home in one hour. Certified technicians covering all Riyadh neighborhoods with a 6-month warranty.",
    heroAr: "تصليح جوالك في الرياض",
    heroEn: "Device Repair in Riyadh",
    subheadAr: "فني معتمد يصلك في أي حي بالرياض خلال ساعة واحدة",
    subheadEn: "A certified technician reaches any Riyadh neighborhood within one hour",
    keywordsAr: "تصليح جوالات الرياض، صيانة جوال الرياض، تصليح ايفون الرياض، صيانة سامسونج الرياض، تصليح لابتوب الرياض",
    keywordsEn: "phone repair riyadh, mobile repair riyadh, iphone fix riyadh, samsung repair riyadh",
  },
  jeddah: {
    slug: "jeddah",
    nameAr: "جدة",
    nameEn: "Jeddah",
    regionAr: "منطقة مكة المكرمة",
    regionEn: "Makkah Region",
    descAr: "تصليح جوالات ولابتوبات في جدة في المنزل خلال ساعة. فنيون معتمدون يغطون جميع أحياء جدة بضمان 6 أشهر.",
    descEn: "Phone and laptop repair in Jeddah at your home in one hour. Certified technicians covering all Jeddah neighborhoods with a 6-month warranty.",
    heroAr: "تصليح جوالك في جدة",
    heroEn: "Device Repair in Jeddah",
    subheadAr: "فني معتمد يصلك في أي حي بجدة خلال ساعة واحدة",
    subheadEn: "A certified technician reaches any Jeddah neighborhood within one hour",
    keywordsAr: "تصليح جوالات جدة، صيانة جوال جدة، تصليح ايفون جدة، صيانة سامسونج جدة، تصليح لابتوب جدة",
    keywordsEn: "phone repair jeddah, mobile repair jeddah, iphone fix jeddah, samsung repair jeddah",
  },
  dammam: {
    slug: "dammam",
    nameAr: "الدمام",
    nameEn: "Dammam",
    regionAr: "المنطقة الشرقية",
    regionEn: "Eastern Province",
    descAr: "تصليح جوالات ولابتوبات في الدمام في المنزل خلال ساعة. فنيون معتمدون يغطون أحياء الدمام والمنطقة الشرقية بضمان 6 أشهر.",
    descEn: "Phone and laptop repair in Dammam at your home in one hour. Certified technicians covering Dammam and the Eastern Province with a 6-month warranty.",
    heroAr: "تصليح جوالك في الدمام",
    heroEn: "Device Repair in Dammam",
    subheadAr: "فني معتمد يصلك في الدمام والمنطقة الشرقية خلال ساعة",
    subheadEn: "A certified technician reaches Dammam and Eastern Province within one hour",
    keywordsAr: "تصليح جوالات الدمام، صيانة جوال الدمام، تصليح ايفون الدمام، صيانة جوال المنطقة الشرقية",
    keywordsEn: "phone repair dammam, mobile repair dammam, iphone fix dammam, eastern province phone repair",
  },
  khobar: {
    slug: "khobar",
    nameAr: "الخبر",
    nameEn: "Al Khobar",
    regionAr: "المنطقة الشرقية",
    regionEn: "Eastern Province",
    descAr: "تصليح جوالات ولابتوبات في الخبر في المنزل خلال ساعة. فنيون معتمدون يغطون أحياء الخبر والمنطقة الشرقية بضمان 6 أشهر.",
    descEn: "Phone and laptop repair in Al Khobar at your home in one hour. Certified technicians covering Khobar and the Eastern Province with a 6-month warranty.",
    heroAr: "تصليح جوالك في الخبر",
    heroEn: "Device Repair in Al Khobar",
    subheadAr: "فني معتمد يصلك في الخبر والمنطقة الشرقية خلال ساعة",
    subheadEn: "A certified technician reaches Khobar and Eastern Province within one hour",
    keywordsAr: "تصليح جوالات الخبر، صيانة جوال الخبر، تصليح ايفون الخبر، صيانة جوال الخبر السعودية",
    keywordsEn: "phone repair khobar, mobile repair al khobar, iphone fix khobar",
  },
  mecca: {
    slug: "mecca",
    nameAr: "مكة المكرمة",
    nameEn: "Mecca",
    regionAr: "منطقة مكة المكرمة",
    regionEn: "Makkah Region",
    descAr: "تصليح جوالات ولابتوبات في مكة المكرمة في المنزل خلال ساعة. فنيون معتمدون يغطون أحياء مكة بضمان 6 أشهر.",
    descEn: "Phone and laptop repair in Mecca at your home in one hour. Certified technicians covering Mecca neighborhoods with a 6-month warranty.",
    heroAr: "تصليح جوالك في مكة",
    heroEn: "Device Repair in Mecca",
    subheadAr: "فني معتمد يصلك في مكة المكرمة خلال ساعة واحدة",
    subheadEn: "A certified technician reaches you in Mecca within one hour",
    keywordsAr: "تصليح جوالات مكة، صيانة جوال مكة المكرمة، تصليح ايفون مكة، صيانة سامسونج مكة",
    keywordsEn: "phone repair mecca, mobile repair makkah, iphone fix mecca",
  },
  medina: {
    slug: "medina",
    nameAr: "المدينة المنورة",
    nameEn: "Medina",
    regionAr: "منطقة المدينة المنورة",
    regionEn: "Madinah Region",
    descAr: "تصليح جوالات ولابتوبات في المدينة المنورة في المنزل خلال ساعة. فنيون معتمدون يغطون أحياء المدينة بضمان 6 أشهر.",
    descEn: "Phone and laptop repair in Medina at your home in one hour. Certified technicians covering Medina neighborhoods with a 6-month warranty.",
    heroAr: "تصليح جوالك في المدينة المنورة",
    heroEn: "Device Repair in Medina",
    subheadAr: "فني معتمد يصلك في المدينة المنورة خلال ساعة واحدة",
    subheadEn: "A certified technician reaches you in Medina within one hour",
    keywordsAr: "تصليح جوالات المدينة المنورة، صيانة جوال المدينة، تصليح ايفون المدينة",
    keywordsEn: "phone repair medina, mobile repair madinah, iphone fix medina",
  },
};

const RELATED_SERVICES = [
  { slug: "iphone-screen-repair", labelAr: "تصليح شاشة آيفون", labelEn: "iPhone Screen Repair" },
  { slug: "iphone-battery", labelAr: "تبديل بطارية آيفون", labelEn: "iPhone Battery" },
  { slug: "samsung-repair", labelAr: "تصليح سامسونج", labelEn: "Samsung Repair" },
  { slug: "laptop-repair", labelAr: "تصليح لابتوب", labelEn: "Laptop Repair" },
  { slug: "macbook-repair", labelAr: "تصليح ماك بوك", labelEn: "MacBook Repair" },
  { slug: "ipad-repair", labelAr: "تصليح آيباد", labelEn: "iPad Repair" },
];

function buildCitySchema(city: CityData, isArabic: boolean) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isArabic ? "الرئيسية" : "Home", item: "https://fixate.sa/" },
        { "@type": "ListItem", position: 2, name: isArabic ? "المناطق" : "Areas", item: "https://fixate.sa/cities" },
        { "@type": "ListItem", position: 3, name: isArabic ? city.nameAr : city.nameEn, item: `https://fixate.sa/cities/${city.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Fixate",
      description: isArabic ? city.descAr : city.descEn,
      url: `https://fixate.sa/cities/${city.slug}`,
      telephone: "+966548940042",
      address: {
        "@type": "PostalAddress",
        addressCountry: "SA",
        addressLocality: isArabic ? city.nameAr : city.nameEn,
        addressRegion: isArabic ? city.regionAr : city.regionEn,
      },
      geo: { "@type": "GeoCoordinates" },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "08:00",
          closes: "22:00",
        },
      ],
      priceRange: "150-500 SAR",
      currenciesAccepted: "SAR",
      paymentAccepted: "Cash, Credit Card, Mada",
    },
  ];
}

export default function CityLanding() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const city = CITIES[slug ?? ""];
  if (!city) return <NotFound />;

  const isArabic = language === "ar";
  const cityName = isArabic ? city.nameAr : city.nameEn;
  const schema = buildCitySchema(city, isArabic);

  const devices = [
    { icon: <Smartphone className="h-6 w-6" />, labelAr: "جوالات", labelEn: "Phones" },
    { icon: <Laptop className="h-6 w-6" />, labelAr: "لابتوب", labelEn: "Laptops" },
    { icon: <Tablet className="h-6 w-6" />, labelAr: "آيباد وتابلت", labelEn: "iPad & Tablets" },
    { icon: <Laptop className="h-6 w-6" />, labelAr: "ماك بوك", labelEn: "MacBook" },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? "rtl" : "ltr"}>
      <SEO
        title={isArabic ? city.heroAr : city.heroEn}
        description={isArabic ? city.descAr : city.descEn}
        keywords={isArabic ? city.keywordsAr : city.keywordsEn}
        canonical={`https://fixate.sa/cities/${city.slug}`}
        structuredData={schema as object}
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
              <Link href="/contact" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
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

      {/* Breadcrumb */}
      <nav className="container py-3" aria-label="breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <li><Link href="/" className="hover:text-foreground transition-colors">{isArabic ? "الرئيسية" : "Home"}</Link></li>
          <li>/</li>
          <li className="text-foreground font-medium">{cityName}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="flex justify-center mb-6"><MapPin className="h-14 w-14 text-primary" /></span>
            <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-5 tracking-tight">
              {isArabic ? city.heroAr : city.heroEn}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              {isArabic ? city.subheadAr : city.subheadEn}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/#download">
                <Button size="lg" className="h-12 px-8 text-base rounded-full font-semibold shadow-lg">
                  <Download className="h-4 w-4 me-2" />
                  {isArabic ? "احجز الآن" : "Book Now"}
                </Button>
              </a>
              <a
                href="https://wa.me/966548940042"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-8 bg-[#25D366] hover:bg-[#1fb956] text-white font-semibold text-base rounded-full transition-colors shadow-lg"
              >
                <MessageCircle className="h-4 w-4" />
                {isArabic ? "واتساب" : "WhatsApp"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-10 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
            <div className="flex flex-col items-center gap-2">
              <Shield className="h-8 w-8 text-emerald-600" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-foreground">{isArabic ? "ضمان 6 أشهر" : "6-Month Warranty"}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-foreground">{isArabic ? "فنيون معتمدون" : "Certified Techs"}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="h-8 w-8 text-emerald-600" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-foreground">{isArabic ? "خلال ساعة" : "Within 1 Hour"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported devices */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-foreground mb-4 tracking-tight">
            {isArabic ? `الأجهزة التي نصلحها في ${city.nameAr}` : `Devices We Repair in ${city.nameEn}`}
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            {isArabic ? "نغطي جميع الأجهزة الإلكترونية الشائعة" : "We cover all popular electronic devices"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {devices.map((d, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-lg transition-all border border-border/50">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  {d.icon}
                </div>
                <p className="font-semibold text-foreground text-sm">{isArabic ? d.labelAr : d.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-foreground mb-4 tracking-tight">
            {isArabic ? `خدماتنا في ${city.nameAr}` : `Our Services in ${city.nameEn}`}
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            {isArabic ? "اختر نوع الإصلاح الذي تحتاجه" : "Choose the repair type you need"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {RELATED_SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>
                <div className="bg-card rounded-2xl p-5 text-center hover:shadow-lg hover:border-primary/30 transition-all border border-border/50 cursor-pointer group">
                  <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                    {isArabic ? s.labelAr : s.labelEn}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="py-24 md:py-32 bg-emerald-600">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-5 tracking-tight">
              {isArabic ? `احجز في ${city.nameAr} الآن` : `Book in ${city.nameEn} Now`}
            </h2>
            <p className="text-lg text-white/90 mb-10">
              {isArabic ? "حمل التطبيق واحصل على خصم 20% على أول طلب" : "Download the app and get 20% off your first order"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {APP_STORE_URL ? (
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3.5 rounded-xl border border-white/20 hover:bg-gray-800 transition-colors min-w-[170px] shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div className="text-start"><p className="text-[10px] text-gray-300">{isArabic ? "متاح على" : "Download on the"}</p><p className="text-sm font-bold">App Store</p></div>
                </a>
              ) : (
                <span className="inline-flex items-center gap-3 bg-gray-900/60 text-white/60 px-6 py-3.5 rounded-xl min-w-[170px] cursor-default">
                  <Download className="h-5 w-5" /><div className="text-start"><p className="text-[10px]">{isArabic ? "قريباً" : "Coming Soon"}</p><p className="text-sm font-bold">App Store</p></div>
                </span>
              )}
              {PLAY_STORE_URL ? (
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3.5 rounded-xl border border-white/20 hover:bg-gray-800 transition-colors min-w-[170px] shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7"><path d="M3.18 23.76a2.5 2.5 0 01-.94-.64c-.5-.56-.74-1.32-.74-2.25V3.13c0-.93.24-1.69.74-2.25a2.5 2.5 0 01.94-.64L13.46 12l-10.28 11.76zm.88.52l12.42-7.17-2.73-3.12-9.69 10.29zm12.42-13.67L4.06.44l9.69 10.29 2.73-3.12zm1.64.95l2.77 1.6c.79.46.79 1.2 0 1.66l-2.77 1.6L15.39 12l2.73-2.44z"/></svg>
                  <div className="text-start"><p className="text-[10px] text-gray-300">{isArabic ? "احصل عليه من" : "Get it on"}</p><p className="text-sm font-bold">Google Play</p></div>
                </a>
              ) : (
                <span className="inline-flex items-center gap-3 bg-gray-900/60 text-white/60 px-6 py-3.5 rounded-xl min-w-[170px] cursor-default">
                  <Download className="h-5 w-5" /><div className="text-start"><p className="text-[10px]">{isArabic ? "قريباً" : "Coming Soon"}</p><p className="text-sm font-bold">Google Play</p></div>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
