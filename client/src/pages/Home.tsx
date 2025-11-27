import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO } from "@/const";
import SEO, { structuredDataTemplates } from "@/components/SEO";
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Star,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="الصفحة الرئيسية"
        description="منصة Fixate - أفضل خدمات صيانة الأجهزة الإلكترونية في السعودية. إصلاح الجوالات، اللابتوبات، الماك بوك والتابلت بأسعار تنافسية وضمان 6 أشهر. احجز الآن!"
        canonical="https://fixate.sa/"
        structuredData={structuredDataTemplates.organization}
      />
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={APP_LOGO} alt="Fixate" className="h-10 w-auto dark:brightness-200" />
              <span className="text-2xl font-semibold text-foreground">Fixate</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.services")}
              </a>
              <a href="#how-it-works" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.howItWorks")}
              </a>
              <a href="#pricing" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.pricing")}
              </a>
              <Link href="/about" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/faq" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.faq")}
              </Link>
              <Link href="/request">
                <Button>{t("nav.bookNow")}</Button>
              </Link>
              <LanguageThemeSwitcher />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Apple Style */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="container">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-semibold text-foreground mb-6 tracking-tight leading-[1.1]">
              {t("hero.title")}
              <br />
              <span className="text-foreground">{t("hero.subtitle")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              {t("hero.description1")}
              <br />
              {t("hero.description2")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/request">
                <Button size="lg" className="text-base px-8 h-12 rounded-full font-medium shadow-sm hover:shadow-md transition-all">
                  {t("hero.bookService")}
                </Button>
              </Link>
              <Link href="/calculator">
                <Button size="lg" variant="ghost" className="text-base px-8 h-12 rounded-full font-medium text-primary hover:bg-primary/5">
                  {t("hero.calculatePrice")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Apple Style */}
      <section className="py-20 md:py-28 bg-muted/20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{t("features.transparency")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("features.transparencyDesc1")}
                <br />
                {t("features.transparencyDesc2")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{t("features.fastService")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("features.fastServiceDesc1")}
                <br />
                {t("features.fastServiceDesc2")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{t("features.warranty")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("features.warrantyDesc1")}
                <br />
                {t("features.warrantyDesc2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Devices We Support - Modern Premium Style */}
      <section id="services" className="py-24 md:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative">
        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold text-foreground mb-6 tracking-tight">
              {t("devices.title")}
            </h2>
            <p className="text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
              {t("devices.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Phones */}
            <Card className="group relative overflow-hidden border-2 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
              <CardContent className="p-8 flex flex-col items-center text-center">
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                
                {/* Icon container with gradient */}
                <div className="relative mb-8 p-6 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Smartphone className="h-20 w-20 text-white" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-3xl font-bold mb-3 text-foreground bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t("devices.phones")}</h3>
                <p className="text-base text-muted-foreground mb-6 leading-relaxed font-medium">
                  iPhone, Samsung, Huawei
                  <br />
                  وجميع الأنواع الأخرى
                </p>
                
                {/* Services list with icons */}
                <div className="w-full space-y-3 relative z-10">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>{t("devices.screenReplacement")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>{t("devices.batteryReplacement")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>{t("devices.chargingPort")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>{t("devices.camera")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Laptops */}
            <Card className="group relative overflow-hidden border-2 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 bg-gradient-to-br from-emerald-50/50 via-background to-cyan-50/50 dark:from-emerald-950/20 dark:via-background dark:to-cyan-950/20">
              <CardContent className="p-8 flex flex-col items-center text-center">
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                
                {/* Icon container with gradient */}
                <div className="relative mb-8 p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg group-hover:shadow-2xl group-hover:shadow-emerald-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Laptop className="h-20 w-20 text-white" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-3xl font-bold mb-3 text-foreground bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">{t("devices.laptops")}</h3>
                <p className="text-base text-muted-foreground mb-6 leading-relaxed font-medium">
                  MacBook, Dell, HP, Lenovo
                  <br />
                  وجميع الأنواع
                </p>
                
                {/* Services list with icons */}
                <div className="w-full space-y-3 relative z-10">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>{t("devices.screenReplacement")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>{t("devices.batteryReplacement")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>{t("devices.software")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>{t("devices.cleaning")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tablets */}
            <Card className="group relative overflow-hidden border-2 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2 bg-gradient-to-br from-orange-50/50 via-background to-pink-50/50 dark:from-orange-950/20 dark:via-background dark:to-pink-950/20">
              <CardContent className="p-8 flex flex-col items-center text-center">
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-pink-500/0 group-hover:from-orange-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                
                {/* Icon container with gradient */}
                <div className="relative mb-8 p-6 rounded-3xl bg-gradient-to-br from-orange-500 to-pink-600 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Tablet className="h-20 w-20 text-white" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-3xl font-bold mb-3 text-foreground bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">{t("devices.tablets")}</h3>
                <p className="text-base text-muted-foreground mb-6 leading-relaxed font-medium">
                  iPad, Samsung Tab
                  <br />
                  وجميع الأنواع الأخرى
                </p>
                
                {/* Services list with icons */}
                <div className="w-full space-y-3 relative z-10">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    <span>{t("devices.screenReplacement")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    <span>{t("devices.batteryReplacement")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    <span>{t("devices.chargingPort")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    <span>{t("devices.software")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Apple Style */}
      <section id="how-it-works" className="py-20 md:py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              {t("howItWorks.title")}
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              {t("howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-semibold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{t("howItWorks.step1")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                استخدم حاسبة الأسعار
                <br />
                لمعرفة التكلفة فوراً
              </p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-semibold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{t("howItWorks.step2")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                اختر الوقت والمكان
                <br />
                المناسبين لك
              </p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-semibold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{t("howItWorks.step3")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                فني محترف يصلك
                <br />
                ويصلح جهازك أمامك
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Apple Style */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-semibold mb-6 text-primary-foreground tracking-tight">
              {t("cta.title")}
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-primary-foreground/90 font-light">
              احجز الآن واحصل على خصم 20%
              <br />
              على أول خدمة إصلاح
            </p>
            <Link href="/request">
              <Button size="lg" variant="secondary" className="text-base px-8 h-12 rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
                {t("cta.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Apple Style */}
      <footer className="py-16 bg-foreground text-background border-t border-border/10">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={APP_LOGO} alt="Fixate" className="h-8 w-auto" />
                <span className="text-xl font-semibold">Fixate</span>
              </div>
              <p className="text-background/60 text-sm leading-relaxed">
                {t("footer.description")}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-background">{t("footer.services")}</h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li>{t("footer.phoneRepair")}</li>
                <li>{t("footer.laptopRepair")}</li>
                <li>{t("footer.tabletRepair")}</li>
                <li>{t("footer.calculator")}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-background">{t("footer.company")}</h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li><Link href="/about" className="hover:text-background transition-colors">{t("footer.about")}</Link></li>
                <li><Link href="/faq" className="hover:text-background transition-colors">{t("footer.faq")}</Link></li>
                <li>{t("footer.technicians")}</li>
                <li>{t("footer.terms")}</li>
                <li>{t("footer.privacy")}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-background">{t("footer.contact")}</h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li>{t("footer.location")}</li>
                <li>support@fixate.sa</li>
                <li>+966 XX XXX XXXX</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/50">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
