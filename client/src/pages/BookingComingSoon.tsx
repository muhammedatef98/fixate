import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Clock, ArrowRight, ArrowLeft, Smartphone } from "lucide-react";

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
      appDescription: "يمكنك الآن استخدام تطبيق Fixatee للحجز الفوري",
      backHome: "العودة للرئيسية",
      contactUs: "تواصل معنا"
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
      appDescription: "You can now use Fixatee app for instant booking",
      backHome: "Back to Home",
      contactUs: "Contact Us"
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardContent className="p-8 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
              <div className="relative bg-primary/10 p-6 rounded-full">
                <Clock className="w-16 h-16 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t.title}
          </h1>
          
          <h2 className="text-xl md:text-2xl text-center text-muted-foreground mb-6">
            {t.subtitle}
          </h2>

          {/* Description */}
          <p className="text-center text-muted-foreground mb-8 leading-relaxed">
            {t.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10"
              >
                <div className="bg-primary/10 p-2 rounded-full">
                  <Smartphone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* App Download Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              {t.appDescription}
            </p>
            <Button 
              size="lg"
              className="gap-2"
              onClick={() => window.open('https://expo.dev', '_blank')}
            >
              <Smartphone className="w-5 h-5" />
              {t.downloadApp}
            </Button>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => setLocation('/')}
            >
              {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              {t.backHome}
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={() => setLocation('/contact')}
            >
              {t.contactUs}
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
