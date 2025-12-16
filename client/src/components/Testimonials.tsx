import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, CheckCircle2, Users, Award, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  device: string;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "أحمد محمد",
    role: "مهندس برمجيات",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    rating: 5,
    text: "خدمة ممتازة! تم إصلاح شاشة iPhone الخاصة بي في أقل من ساعة. الفني كان محترف جداً والسعر كان معقول. أنصح بشدة!",
    device: "iPhone 14 Pro",
    service: "تغيير الشاشة"
  },
  {
    id: 2,
    name: "سارة عبدالله",
    role: "مديرة تسويق",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
    text: "أفضل تجربة صيانة مررت بها! الفني وصل في الوقت المحدد، وأصلح اللابتوب أمامي، وشرح لي كل شيء. الضمان 6 أشهر رائع!",
    device: "MacBook Pro",
    service: "إصلاح البطارية"
  },
  {
    id: 3,
    name: "خالد العتيبي",
    role: "صاحب شركة",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
    rating: 5,
    text: "سرعة في الخدمة وشفافية في الأسعار. تم إصلاح جهاز Samsung الخاص بي بكفاءة عالية. سأستخدم الخدمة مرة أخرى بالتأكيد!",
    device: "Samsung Galaxy S23",
    service: "إصلاح منفذ الشحن"
  },
  {
    id: 4,
    name: "نورة السالم",
    role: "طالبة جامعية",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noura",
    rating: 5,
    text: "كنت خائفة من فقدان بياناتي، لكن الفني حافظ على كل شيء وأصلح الجهاز بسرعة. خدمة عملاء ممتازة والسعر مناسب جداً!",
    device: "iPad Air",
    service: "حل مشاكل البرامج"
  },
  {
    id: 5,
    name: "فهد الدوسري",
    role: "مصور فوتوغرافي",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fahad",
    rating: 5,
    text: "احترافية عالية! أصلحوا كاميرا هاتفي وأصبحت تعمل مثل الجديدة تماماً. الفني كان ودود وشرح لي المشكلة بالتفصيل.",
    device: "iPhone 15 Pro Max",
    service: "إصلاح الكاميرا"
  },
  {
    id: 6,
    name: "ريم القحطاني",
    role: "معلمة",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reem",
    rating: 5,
    text: "تجربة رائعة من البداية للنهاية! الحجز كان سهل، والفني وصل في الوقت، والسعر كان واضح من البداية. شكراً Fixate!",
    device: "Huawei MatePad",
    service: "تغيير الشاشة"
  }
];

const stats = [
  {
    icon: Users,
    number: "15,000+",
    label: "عميل راضٍ",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: CheckCircle2,
    number: "20,000+",
    label: "جهاز تم إصلاحه",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Award,
    number: "98%",
    label: "نسبة الرضا",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: TrendingUp,
    number: "4.9/5",
    label: "متوسط التقييم",
    color: "from-purple-500 to-pink-500"
  }
];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 fill-current" />
            <span>تقييمات عملائنا</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            ماذا يقول عملاؤنا؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            آلاف العملاء السعداء يثقون في خدماتنا. اقرأ تجاربهم الحقيقية!
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </CardContent>
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Quote Icon Background */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="h-20 w-20 text-primary" />
              </div>

              <CardContent className="p-6 relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                  "{testimonial.text}"
                </p>

                {/* Device & Service Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    📱 {testimonial.device}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
                    ✓ {testimonial.service}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 border-0 overflow-hidden">
            <CardContent className="p-8 md:p-12 relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  انضم إلى آلاف العملاء السعداء!
                </h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  احجز الآن واحصل على خدمة صيانة احترافية مع ضمان ذهبي يصل إلى 6 أشهر
                </p>
                <a
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  احجز خدمة الإصلاح الآن
                  <CheckCircle2 className="h-5 w-5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
