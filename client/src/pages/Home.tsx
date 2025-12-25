import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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
  ArrowLeft,
  Menu,
  X
} from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";
import { MobileLanguageThemeSwitcher } from "@/components/MobileLanguageThemeSwitcher";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function Home() {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const toggleMenu = () => {
    console.log('Toggle menu clicked, current state:', mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
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
            <Link href="/">
              <Logo />
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-3 text-foreground hover:bg-muted rounded-lg transition-colors"
              style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
              aria-label="القائمة"
              type="button"
            >
              <Menu className="h-7 w-7" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/booking">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  {t("nav.bookNow")}
                </Button>
              </Link>
              <Link href="/price-calculator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {language === 'ar' ? 'احسب السعر' : 'Calculate Price'}
              </Link>
              <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.faq")}
              </Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t("nav.login")}
                </Button>
              </Link>
              <LanguageThemeSwitcher />
            </nav>
          </div>
        </div>

      </header>

      {/* Mobile Menu Overlay - Outside header for proper z-index */}
      <div 
        className="md:hidden fixed inset-0"
        style={{ 
          zIndex: 99999,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          visibility: mobileMenuOpen ? 'visible' : 'hidden'
        }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/70 transition-opacity duration-300"
          style={{ opacity: mobileMenuOpen ? 1 : 0 }}
          onClick={closeMobileMenu}
        />
        
        {/* Sidebar - slides from right */}
        <div 
          className="absolute top-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto transition-transform duration-300"
          style={{ 
            right: 0,
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-emerald-600 sticky top-0">
            <span className="text-sm font-bold text-white">القائمة</span>
            <button 
              onClick={closeMobileMenu}
              className="p-3 text-white hover:bg-emerald-700 rounded-lg transition-colors active:bg-emerald-800"
              type="button"
            >
              <X className="h-7 w-7" />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-col p-5 gap-4">
            {/* Primary Actions */}
            <Link href="/booking" onClick={closeMobileMenu}>
              <Button className="w-full h-11 font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 rounded-lg active:bg-emerald-800">
                {t("nav.bookNow")}
              </Button>
            </Link>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
            
            {/* Secondary Links */}
            <Link 
              href="/price-calculator" 
              className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-100 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors py-3 px-3 rounded-lg active:bg-gray-100 dark:active:bg-gray-800"
              onClick={closeMobileMenu}
            >
              <span className="text-xl">💰</span>
              {language === 'ar' ? 'احسب السعر' : 'Calculate Price'}
            </Link>
            <Link 
              href="/faq" 
              className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-100 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors py-3 px-3 rounded-lg active:bg-gray-100 dark:active:bg-gray-800"
              onClick={closeMobileMenu}
            >
              <span className="text-xl">❓</span>
              {t("nav.faq")}
            </Link>
            <Link 
              href="/about" 
              className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-100 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors py-3 px-3 rounded-lg active:bg-gray-100 dark:active:bg-gray-800"
              onClick={closeMobileMenu}
            >
              <span className="text-xl">ℹ️</span>
              {t("nav.about")}
            </Link>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
            
            <Link href="/login" onClick={closeMobileMenu}>
              <Button variant="outline" className="w-full h-10 font-medium text-sm rounded-lg border">
                {t("nav.login")}
              </Button>
            </Link>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <MobileLanguageThemeSwitcher />
            </div>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="container">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              {t("hero.title")}
              <br />
              <span className="text-primary">{t("hero.subtitle")}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t("hero.description1")}
              <br />
              {t("hero.description2")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/booking">
                <Button size="lg" className="text-base px-8 h-12 rounded-full font-semibold shadow-md hover:shadow-lg transition-all">
                  {t("hero.bookService")}
                </Button>
              </Link>
              <Link href="/price-calculator">
                <Button size="lg" variant="outline" className="text-base px-8 h-12 rounded-full font-semibold">
                  {t("hero.calculatePrice")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">{t("features.transparency")}</h3>
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
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">{t("features.fastService")}</h3>
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
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">{t("features.warranty")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("features.warrantyDesc1")}
                <br />
                {t("features.warrantyDesc2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Devices Section */}
      <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-4">
              {t("devices.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t("devices.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-16">
            <Card className="group border-2 border-border/50 hover:border-emerald-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/20">
              <CardContent className="pt-10 pb-8 min-h-[280px] flex flex-col">
                <div className="relative mb-6">
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Smartphone className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-foreground">{t("devices.phones")}</h3>
                <p className="text-muted-foreground text-center leading-relaxed flex-1">{t("devices.phonesDesc")}</p>
              </CardContent>
            </Card>

            <Card className="group border-2 border-border/50 hover:border-emerald-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/20">
              <CardContent className="pt-10 pb-8 min-h-[280px] flex flex-col">
                <div className="relative mb-6">
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Laptop className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-foreground">{t("devices.laptops")}</h3>
                <p className="text-muted-foreground text-center leading-relaxed flex-1">{t("devices.laptopsDesc")}</p>
              </CardContent>
            </Card>

            <Card className="group border-2 border-border/50 hover:border-emerald-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/20">
              <CardContent className="pt-10 pb-8 min-h-[280px] flex flex-col">
                <div className="relative mb-6">
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Tablet className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-foreground">{t("devices.tablets")}</h3>
                <p className="text-muted-foreground text-center leading-relaxed flex-1">{t("devices.tabletsDesc")}</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Grid */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-3">
                {language === 'ar' ? 'خدماتنا المتكاملة' : 'Our Complete Services'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'نقدم جميع خدمات الصيانة والإصلاح' : 'We provide all repair and maintenance services'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="group border-2 border-border/50 hover:border-emerald-500/50 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-emerald-600/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">{t("devices.screenReplacement")}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="group border-2 border-border/50 hover:border-emerald-500/50 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-emerald-600/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">{t("devices.batteryReplacement")}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="group border-2 border-border/50 hover:border-emerald-500/50 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-emerald-600/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">{t("devices.chargingPort")}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="group border-2 border-border/50 hover:border-emerald-500/50 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-emerald-600/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">{t("devices.camera")}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="group border-2 border-border/50 hover:border-emerald-500/50 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-emerald-600/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">{t("devices.software")}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="group border-2 border-border/50 hover:border-emerald-500/50 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-emerald-600/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">{t("devices.cleaning")}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("howItWorks.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("howItWorks.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: 1, title: t("howItWorks.step1"), desc: t("howItWorks.step1Desc") },
              { step: 2, title: t("howItWorks.step2"), desc: t("howItWorks.step2Desc") },
              { step: 3, title: t("howItWorks.step3"), desc: t("howItWorks.step3Desc") },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-16 text-center border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("cta.title")}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("cta.subtitle1")}
              <br />
              {t("cta.subtitle2")}
            </p>
            <Link href="/booking">
              <Button size="lg" className="text-base px-8 h-12 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                {t("cta.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{language === 'ar' ? 'آراء عملائنا' : 'Customer Reviews'}</h2>
            <p className="text-lg text-muted-foreground">{language === 'ar' ? 'ماذا يقول عملاؤنا عنا' : 'What our customers say about us'}</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
