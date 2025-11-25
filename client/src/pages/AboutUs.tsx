import { Target, Building2, Users, Award, Shield, Zap } from "lucide-react";
import { APP_LOGO } from "@/const";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";

export default function AboutUs() {
  const { t, language } = useLanguage();
  
  const isArabic = language === "ar";
  
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="من نحن"
        description="تعرف على Fixate - منصة رائدة في مجال صيانة الأجهزة الإلكترونية في السعودية. رؤيتنا، رسالتنا، وقيمنا في تقديم خدمات صيانة موثوقة واحترافية."
        canonical="https://fixate.sa/about"
      />
      
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={APP_LOGO} alt="Fixate" className="h-10 w-auto dark:brightness-200" />
                <span className="text-2xl font-semibold text-foreground">Fixate</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "الرئيسية" : "Home"}
              </Link>
              <Link href="/about" className="text-sm font-semibold text-foreground">
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
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-semibold text-foreground mb-6 tracking-tight">
              {isArabic ? "من نحن" : "About Us"}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              {isArabic 
                ? "نحن منصة رائدة في مجال صيانة الأجهزة الإلكترونية في السعودية والدول العربية"
                : "We are a leading platform for electronic device repair in Saudi Arabia and the Arab world"}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Apple Style */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-3xl p-10 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-10 w-10 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-semibold text-foreground mb-4">
                  {isArabic ? "رؤيتنا" : "Our Vision"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isArabic
                    ? "أن نكون المنصة الأولى والأكثر موثوقية في مجال صيانة الأجهزة الإلكترونية في الوطن العربي، من خلال تقديم خدمات عالية الجودة وتجربة عملاء استثنائية."
                    : "To be the first and most reliable platform for electronic device repair in the Arab world, by providing high-quality services and exceptional customer experience."}
                </p>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-10 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Building2 className="h-10 w-10 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-semibold text-foreground mb-4">
                  {isArabic ? "رسالتنا" : "Our Mission"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isArabic
                    ? "نسعى لتوفير حلول صيانة سريعة وموثوقة لجميع أنواع الأجهزة الإلكترونية، مع التركيز على رضا العملاء والشفافية في التعامل."
                    : "We strive to provide fast and reliable repair solutions for all types of electronic devices, focusing on customer satisfaction and transparency."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              {isArabic ? "قيمنا" : "Our Values"}
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              {isArabic ? "المبادئ التي نؤمن بها ونعمل وفقاً لها" : "The principles we believe in and work by"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">
                {isArabic ? "الموثوقية" : "Reliability"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {isArabic
                  ? "نضمن جودة الخدمة والشفافية في التعامل مع جميع العملاء"
                  : "We guarantee service quality and transparency in dealing with all customers"}
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">
                {isArabic ? "السرعة" : "Speed"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {isArabic
                  ? "نوفر خدمات سريعة دون التأثير على جودة الإصلاح"
                  : "We provide fast services without compromising repair quality"}
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">
                {isArabic ? "الاحترافية" : "Professionalism"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {isArabic
                  ? "فريق من الفنيين المحترفين والمدربين على أعلى مستوى"
                  : "A team of professional technicians trained to the highest standards"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-semibold mb-6 text-primary-foreground tracking-tight">
              {isArabic ? "جاهز للبدء؟" : "Ready to Start?"}
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-primary-foreground/90 font-light">
              {isArabic 
                ? "احجز خدمة الإصلاح الآن واحصل على خصم 20%"
                : "Book repair service now and get 20% off"}
            </p>
            <Link href="/request">
              <Button size="lg" variant="secondary" className="text-base px-8 h-12 rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
                {t("cta.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
