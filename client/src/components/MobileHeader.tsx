import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";
import PWAInstallButton from "@/components/PWAInstallButton";
import Logo from "@/components/Logo";

export default function MobileHeader() {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRTL = language === "ar";

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.services")}
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.howItWorks")}
              </a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.pricing")}
              </a>
              <Link href="/price-calculator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.calculator")}
              </Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.faq")}
              </Link>
              <Link href="/request">
                <Button size="sm" className="rounded-full">
                  {t("nav.bookNow")}
                </Button>
              </Link>
              <PWAInstallButton />
              <Link href="/login">
                <Button variant="outline" size="sm" className="rounded-full">
                  {t("nav.login")}
                </Button>
              </Link>
              <LanguageThemeSwitcher />
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -m-2 text-foreground hover:bg-muted rounded-lg transition-all active:scale-95"
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop with fade animation */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Sidebar with slide animation */}
          <div 
            className={`fixed top-0 bottom-0 w-[85vw] max-w-[320px] bg-background shadow-2xl z-[100] md:hidden overflow-y-auto
              ${isRTL ? 'right-0 animate-in slide-in-from-right duration-300' : 'left-0 animate-in slide-in-from-left duration-300'}
            `}
            style={{
              [isRTL ? 'right' : 'left']: 0
            }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-border z-10">
              <div className="flex items-center justify-between p-4">
                <Logo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -m-2 hover:bg-muted rounded-lg transition-colors active:scale-95"
                  aria-label="إغلاق القائمة"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex flex-col p-4 gap-1">
              <a 
                href="#services" 
                className="text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-all py-3 px-3 rounded-lg active:scale-98"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.services")}
              </a>
              <a 
                href="#how-it-works" 
                className="text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-all py-3 px-3 rounded-lg active:scale-98"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.howItWorks")}
              </a>
              <a 
                href="#pricing" 
                className="text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-all py-3 px-3 rounded-lg active:scale-98"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.pricing")}
              </a>
              <Link 
                href="/price-calculator" 
                className="text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-all py-3 px-3 rounded-lg active:scale-98"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.calculator")}
              </Link>
              <Link 
                href="/about" 
                className="text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-all py-3 px-3 rounded-lg active:scale-98"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <Link 
                href="/faq" 
                className="text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-all py-3 px-3 rounded-lg active:scale-98"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.faq")}
              </Link>
              
              <div className="border-t border-border my-4"></div>
              
              {/* Action Buttons */}
              <Link href="/request" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mb-3 rounded-full h-11 text-base font-medium shadow-sm active:scale-98">
                  {t("nav.bookNow")}
                </Button>
              </Link>
              
              <div className="mb-3">
                <PWAInstallButton />
              </div>
              
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full mb-4 rounded-full h-11 text-base font-medium active:scale-98">
                  {t("nav.login")}
                </Button>
              </Link>
              
              {/* Settings */}
              <div className="pt-2 border-t border-border">
                <LanguageThemeSwitcher />
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
