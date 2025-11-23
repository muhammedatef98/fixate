import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO } from "@/const";
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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={APP_LOGO} alt="Fixate" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-primary">Fixate</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
                الخدمات
              </a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                كيف يعمل
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                الأسعار
              </a>
              <Link href="/request">
                <Button>احجز الآن</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              إصلاح أجهزتك الإلكترونية
              <br />
              <span className="text-primary">بسرعة واحترافية</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              خدمة صيانة متكاملة للجوالات، اللابتوبات، والتابلت. 
              فنيون محترفون يصلون إليك أينما كنت مع ضمان على الخدمة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request">
                <Button size="lg" className="text-lg px-8">
                  احجز خدمة الإصلاح
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/calculator">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  احسب السعر فوراً
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">شفافية كاملة</h3>
                  <p className="text-gray-600">
                    أسعار واضحة ومحددة مسبقاً. لا توجد تكاليف مخفية.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">خدمة سريعة</h3>
                  <p className="text-gray-600">
                    معظم الإصلاحات تتم في نفس اليوم. نصلك أينما كنت.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">ضمان ذهبي</h3>
                  <p className="text-gray-600">
                    ضمان يصل إلى 6 أشهر على جميع قطع الغيار والخدمات.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Devices We Support */}
      <section id="services" className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              الأجهزة التي نصلحها
            </h2>
            <p className="text-xl text-gray-600">
              نغطي جميع أنواع الأجهزة الإلكترونية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Smartphone className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">الجوالات</h3>
                  <p className="text-gray-600 mb-4">
                    iPhone, Samsung, Huawei وجميع الأنواع الأخرى
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• تغيير الشاشة</li>
                    <li>• تغيير البطارية</li>
                    <li>• إصلاح منفذ الشحن</li>
                    <li>• إصلاح الكاميرا</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Laptop className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">اللابتوبات</h3>
                  <p className="text-gray-600 mb-4">
                    MacBook, Dell, HP, Lenovo وجميع الأنواع
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• تغيير الشاشة</li>
                    <li>• تغيير البطارية</li>
                    <li>• حل مشاكل البرامج</li>
                    <li>• تنظيف وصيانة</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Tablet className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">التابلت</h3>
                  <p className="text-gray-600 mb-4">
                    iPad, Samsung Tab وجميع الأنواع الأخرى
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• تغيير الشاشة</li>
                    <li>• تغيير البطارية</li>
                    <li>• إصلاح منفذ الشحن</li>
                    <li>• حل مشاكل البرامج</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              كيف يعمل Fixate؟
            </h2>
            <p className="text-xl text-gray-600">
              ثلاث خطوات بسيطة فقط
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">اختر جهازك والمشكلة</h3>
              <p className="text-gray-600">
                استخدم حاسبة الأسعار لمعرفة التكلفة فوراً
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">احجز موعداً</h3>
              <p className="text-gray-600">
                اختر الوقت والمكان المناسبين لك
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">نصلك ونصلح جهازك</h3>
              <p className="text-gray-600">
                فني محترف يصلك ويصلح جهازك أمامك
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              جهازك يحتاج إصلاح؟
            </h2>
            <p className="text-xl mb-8 opacity-90">
              احجز الآن واحصل على خصم 20% على أول خدمة إصلاح
            </p>
            <Link href="/request">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                احجز خدمة الإصلاح الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={APP_LOGO} alt="Fixate" className="h-8 w-auto brightness-0 invert" />
                <span className="text-xl font-bold">Fixate</span>
              </div>
              <p className="text-gray-400 text-sm">
                منصة متكاملة لصيانة الأجهزة الإلكترونية في الدول العربية
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">الخدمات</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>صيانة الجوالات</li>
                <li>صيانة اللابتوبات</li>
                <li>صيانة التابلت</li>
                <li>حاسبة الأسعار</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">الشركة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>من نحن</li>
                <li>الفنيون</li>
                <li>الشروط والأحكام</li>
                <li>سياسة الخصوصية</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>المملكة العربية السعودية</li>
                <li>support@fixate.sa</li>
                <li>+966 XX XXX XXXX</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Fixate. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
