import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { ShoppingBag, ArrowRight, ArrowLeft, Smartphone, Home, Sparkles, Tag, ShieldCheck, Truck } from "lucide-react";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";

export default function FixateMarket() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const isArabic = language === "ar";

  const content = {
    ar: {
      badge: "متاح حالياً على التطبيق فقط",
      title: "Fixate Market",
      subtitle: "متجر فيكست",
      tagline: "قريباً على الموقع",
      description:
        "متجر فيكست هو منصة إعلانات للأجهزة الإلكترونية المستعملة والجديدة. تصفّح الإعلانات، شوف التفاصيل والصور، وتواصل مباشرة مع البائع لشراء الجهاز اللي يناسبك — متاح الآن داخل تطبيق فيكست، وقريباً على الموقع.",
      features: [
        { icon: Smartphone, label: "أجهزة مستعملة وجديدة من بائعين موثوقين" },
        { icon: Tag, label: "انشر إعلانك لبيع جهازك بسهولة" },
        { icon: ShieldCheck, label: "تواصل مباشر مع البائع قبل الشراء" },
        { icon: Truck, label: "تصفّح وفلترة حسب النوع والمدينة والسعر" },
      ],
      downloadApp: "حمّل التطبيق وتصفّح الإعلانات",
      appDescription: "متجر فيكست متاح حصرياً عبر تطبيق Fixate على iOS و Android.",
      backHome: "العودة للرئيسية",
      websiteSoon: "النسخة الإلكترونية من المتجر قيد التطوير — ترقّبوا الإطلاق قريباً!",
    },
    en: {
      badge: "Currently available on the app only",
      title: "Fixate Market",
      subtitle: "The Fixate marketplace",
      tagline: "Coming soon to the website",
      description:
        "Fixate Market is a classifieds platform for used and new electronic devices. Browse listings, view details and photos, and contact sellers directly to buy the device you want — available now inside the Fixate app, and coming soon to the website.",
      features: [
        { icon: Smartphone, label: "Used and new devices from trusted sellers" },
        { icon: Tag, label: "Post your own ad to sell your device" },
        { icon: ShieldCheck, label: "Contact sellers directly before buying" },
        { icon: Truck, label: "Browse and filter by type, city, and price" },
      ],
      downloadApp: "Download the app to browse listings",
      appDescription: "Fixate Market is exclusively available through the Fixate app on iOS and Android.",
      backHome: "Back to Home",
      websiteSoon: "The web version of the marketplace is under development — stay tuned for launch!",
    },
  };

  const t = content[isArabic ? "ar" : "en"];

  const scrollToDownload = () => {
    setLocation("/");
    setTimeout(() => {
      const el = document.getElementById("download");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <SEO
        title={isArabic ? "متجر فيكست — قريباً" : "Fixate Market — Coming Soon"}
        description={t.description}
        canonical="https://fixate.site/market"
      />

      {/* Header */}
      <header className="border-b border-border/40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <Button variant="ghost" size="sm" onClick={() => setLocation("/")} className="gap-2">
              <Home className="w-4 h-4" />
              {t.backHome}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
              <div className="relative bg-emerald-100 dark:bg-emerald-900/30 p-8 rounded-full">
                <ShoppingBag className="w-20 h-20 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {t.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-3 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            {t.title}
          </h1>

          <h2 className="text-xl md:text-2xl text-center text-gray-600 dark:text-gray-300 mb-2 font-semibold">
            {t.subtitle}
          </h2>

          <p className="text-center text-emerald-600 dark:text-emerald-400 font-semibold mb-8">{t.tagline}</p>

          {/* Description */}
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg leading-relaxed max-w-2xl mx-auto">
            {t.description}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {t.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl">
                      <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{feature.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* App Download Section */}
          <Card className="bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 mb-8">
            <CardContent className="p-8 text-center text-white">
              <Smartphone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">{t.downloadApp}</h3>
              <p className="mb-6 text-emerald-50">{t.appDescription}</p>
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-white text-emerald-600 hover:bg-emerald-50 font-bold"
                onClick={scrollToDownload}
              >
                <Smartphone className="w-5 h-5" />
                {t.downloadApp}
              </Button>
            </CardContent>
          </Card>

          {/* Coming Soon Note */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8 italic">{t.websiteSoon}</p>

          {/* Back Home Button */}
          <div className="flex justify-center">
            <Button size="lg" variant="outline" className="gap-2 min-w-[200px]" onClick={() => setLocation("/")}>
              {isArabic ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              {t.backHome}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
