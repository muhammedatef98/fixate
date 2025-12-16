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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Navigation */}
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
              <Link href="/price-calculator" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {language === 'ar' ? 'احسب السعر' : 'Calculate Price'}
              </Link>
              <Link href="/about" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/faq" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.faq")}
              </Link>
                <Link href="/booking">
                <Button>{t("nav.bookNow")}</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline">
                  {t("nav.login")}
                </Button>
              </Link>
              <LanguageThemeSwitcher />
            </nav>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            
            {/* Sidebar */}
            <div className="md:hidden fixed top-16 right-0 bottom-0 w-full max-w-xs bg-background shadow-2xl z-50 overflow-y-auto">
              {/* Navigation Links */}
              <nav className="flex flex-col p-4 gap-2">
                <a 
                  href="#services" 
                  className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors py-3 px-4 rounded-lg"
                  onClick={closeMobileMenu}
                >
                  {t("nav.services")}
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors py-3 px-4 rounded-lg"
                  onClick={closeMobileMenu}
                >
                  {t("nav.howItWorks")}
                </a>
                <a 
                  href="#pricing" 
                  className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors py-3 px-4 rounded-lg"
                  onClick={closeMobileMenu}
                >
                  {t("nav.pricing")}
                </a>
                <Link 
                  href="/price-calculator" 
                  className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors py-3 px-4 rounded-lg block"
                  onClick={closeMobileMenu}
                >
                  {language === 'ar' ? 'احسب السعر' : 'Calculate Price'}
                </Link>
                <Link 
                  href="/about" 
                  className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors py-3 px-4 rounded-lg block"
                  onClick={closeMobileMenu}
                >
                  {t("nav.about")}
                </Link>
                <Link 
                  href="/faq" 
                  className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors py-3 px-4 rounded-lg block"
                  onClick={closeMobileMenu}
                >
                  {t("nav.faq")}
                </Link>
                
                <div className="border-t border-border my-4"></div>
                
                <Link href="/request" onClick={closeMobileMenu} className="block">
                  <Button className="w-full h-11 font-semibold">{t("nav.bookNow")}</Button>
                </Link>
                
                <Link href="/login" onClick={closeMobileMenu} className="block">
                  <Button variant="outline" className="w-full h-11 font-semibold">
                    {t("nav.login")}
                  </Button>
                </Link>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <LanguageThemeSwitcher />
                </div>
              </nav>
            </div>
          </>
        )}
      </header>

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
              <Link href="/request">
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
      <section id="services" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("devices.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("devices.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-8">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">{t("devices.phones")}</h3>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">{t("devices.phonesDesc")}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-8">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Laptop className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">{t("devices.laptops")}</h3>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">{t("devices.laptopsDesc")}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-8">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Tablet className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">{t("devices.tablets")}</h3>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">{t("devices.tabletsDesc")}</p>
              </CardContent>
            </Card>
          </div>

          {/* Services List */}
          <div className="max-w-2xl mx-auto bg-muted/30 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-center mb-8">{language === 'ar' ? 'خدماتنا' : 'Our Services'}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{t("devices.screenReplacement")}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{t("devices.batteryReplacement")}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{t("devices.chargingPort")}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{t("devices.camera")}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{t("devices.software")}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{t("devices.cleaning")}</span>
              </div>
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
            <Link href="/request">
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
