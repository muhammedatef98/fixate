import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Clock, ArrowRight, ArrowLeft, Smartphone, Home, Mail, Phone, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";

export default function BookingComingSoon() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  const content = {
    ar: {
      title: "قريباً",
      subtitle: "نظام الحجز الإلكتروني",
      description: "نعمل حالياً على تطوير نظام حجز متقدم لتوفير أفضل تجربة لك. سيكون متاحاً قريباً!",
      features: [
        "حجز فوري عبر الموقع",
        "تتبع حالة الطلب",
        "دفع إلكتروني آمن",
        "إشعارات فورية"
      ],
      downloadApp: "حمّل التطبيق الآن",
      appDescription: "يمكنك الآن استخدام تطبيق Fixate للحجز الفوري",
      backHome: "العودة للرئيسية",
      contactUs: "تواصل معنا",
      contactTitle: "تواصل معنا الآن",
      contactDescription: "نحن هنا لمساعدتك! تواصل معنا عبر أي من الوسائل التالية:",
      email: "البريد الإلكتروني",
      phoneNumber: "رقم الهاتف",
      whatsapp: "واتساب"
    },
    en: {
      title: "Coming Soon",
      subtitle: "Online Booking System",
      description: "We're currently developing an advanced booking system to provide you with the best experience. It will be available soon!",
      features: [
        "Instant online booking",
        "Order tracking",
        "Secure online payment",
        "Real-time notifications"
      ],
      downloadApp: "Download App Now",
      appDescription: "You can now use Fixate app for instant booking",
      backHome: "Back to Home",
      contactUs: "Contact Us",
      contactTitle: "Contact Us Now",
      contactDescription: "We're here to help! Reach us through any of the following:",
      email: "Email",
      phoneNumber: "Phone Number",
      whatsapp: "WhatsApp"
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SEO
        title={t.title}
        description={t.description}
        canonical="https://fixate.site/booking"
      />
      
      {/* Header */}
      <header className="border-b border-border/40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/')}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              {t.backHome}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-emerald-100 dark:bg-emerald-900/30 p-8 rounded-full">
                <Clock className="w-20 h-20 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            {t.title}
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-center text-gray-600 dark:text-gray-300 mb-6 font-semibold">
            {t.subtitle}
          </h2>

          {/* Description */}
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg leading-relaxed max-w-2xl mx-auto">
            {t.description}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {t.features.map((feature, index) => (
              <Card 
                key={index}
                className="border-2 border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl">
                    <Smartphone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{feature}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* App Download Section */}
          <Card className="bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 mb-8">
            <CardContent className="p-8 text-center text-white">
              <Smartphone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">{t.downloadApp}</h3>
              <p className="mb-6 text-emerald-50">
                {t.appDescription}
              </p>
              <Button 
                size="lg"
                variant="secondary"
                className="gap-2 bg-white text-emerald-600 hover:bg-emerald-50 font-bold"
                onClick={() => window.open('https://expo.dev', '_blank')}
              >
                <Smartphone className="w-5 h-5" />
                {t.downloadApp}
              </Button>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mb-8 border-2">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-3 text-gray-800 dark:text-gray-100">
                {t.contactTitle}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                {t.contactDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Email */}
                <a
                  href="mailto:fixate01@gmail.com"
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="bg-emerald-600 p-4 rounded-full group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{t.email}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">fixate01@gmail.com</span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+966548940042"
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="bg-blue-600 p-4 rounded-full group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{t.phoneNumber}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 text-center" dir="ltr">+966 54 894 0042</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/966548940042"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="bg-green-600 p-4 rounded-full group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{t.whatsapp}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 text-center" dir="ltr">+966 54 894 0042</span>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Back Home Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 min-w-[200px]"
              onClick={() => setLocation('/')}
            >
              {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              {t.backHome}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
