import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, CheckCircle2, Users, Award, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
  id: number;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  image: string;
  rating: number;
  textAr: string;
  textEn: string;
  deviceAr: string;
  deviceEn: string;
  serviceAr: string;
  serviceEn: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    nameAr: "أحمد محمد",
    nameEn: "Ahmed Mohammed",
    roleAr: "مهندس برمجيات",
    roleEn: "Software Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    rating: 5,
    textAr: "خدمة ممتازة! تم إصلاح شاشة iPhone الخاصة بي في أقل من ساعة. الفني كان محترف جداً والسعر كان معقول. أنصح بشدة!",
    textEn: "Excellent service! My iPhone screen was fixed in less than an hour. The technician was very professional and the price was reasonable. Highly recommend!",
    deviceAr: "iPhone 14 Pro",
    deviceEn: "iPhone 14 Pro",
    serviceAr: "تغيير الشاشة",
    serviceEn: "Screen Replacement"
  },
  {
    id: 2,
    nameAr: "سارة عبدالله",
    nameEn: "Sarah Abdullah",
    roleAr: "مديرة تسويق",
    roleEn: "Marketing Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
    textAr: "أفضل تجربة صيانة مررت بها! الفني وصل في الوقت المحدد، وأصلح اللابتوب أمامي، وشرح لي كل شيء. الضمان 6 أشهر رائع!",
    textEn: "Best repair experience I've had! The technician arrived on time, fixed the laptop in front of me, and explained everything. The 6-month warranty is amazing!",
    deviceAr: "MacBook Pro",
    deviceEn: "MacBook Pro",
    serviceAr: "إصلاح البطارية",
    serviceEn: "Battery Repair"
  },
  {
    id: 3,
    nameAr: "خالد العتيبي",
    nameEn: "Khaled Al-Otaibi",
    roleAr: "صاحب شركة",
    roleEn: "Business Owner",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
    rating: 5,
    textAr: "سرعة في الخدمة وشفافية في الأسعار. تم إصلاح جهاز Samsung الخاص بي بكفاءة عالية. سأستخدم الخدمة مرة أخرى بالتأكيد!",
    textEn: "Fast service and transparent pricing. My Samsung device was repaired with high efficiency. Will definitely use the service again!",
    deviceAr: "Samsung Galaxy S23",
    deviceEn: "Samsung Galaxy S23",
    serviceAr: "إصلاح منفذ الشحن",
    serviceEn: "Charging Port Repair"
  },
  {
    id: 4,
    nameAr: "نورة السالم",
    nameEn: "Noura Al-Salem",
    roleAr: "طالبة جامعية",
    roleEn: "University Student",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noura",
    rating: 5,
    textAr: "كنت خائفة من فقدان بياناتي، لكن الفني حافظ على كل شيء وأصلح الجهاز بسرعة. خدمة عملاء ممتازة والسعر مناسب جداً!",
    textEn: "I was worried about losing my data, but the technician preserved everything and fixed the device quickly. Excellent customer service and very reasonable price!",
    deviceAr: "iPad Air",
    deviceEn: "iPad Air",
    serviceAr: "حل مشاكل البرامج",
    serviceEn: "Software Issues"
  },
  {
    id: 5,
    nameAr: "فهد الدوسري",
    nameEn: "Fahad Al-Dosari",
    roleAr: "مصور فوتوغرافي",
    roleEn: "Photographer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fahad",
    rating: 5,
    textAr: "احترافية عالية! أصلحوا كاميرا هاتفي وأصبحت تعمل مثل الجديدة تماماً. الفني كان ودود وشرح لي المشكلة بالتفصيل.",
    textEn: "High professionalism! They fixed my phone camera and it works like new. The technician was friendly and explained the problem in detail.",
    deviceAr: "iPhone 15 Pro Max",
    deviceEn: "iPhone 15 Pro Max",
    serviceAr: "إصلاح الكاميرا",
    serviceEn: "Camera Repair"
  },
  {
    id: 6,
    nameAr: "ريم القحطاني",
    nameEn: "Reem Al-Qahtani",
    roleAr: "معلمة",
    roleEn: "Teacher",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reem",
    rating: 5,
    textAr: "تجربة رائعة من البداية للنهاية! الحجز كان سهل، والفني وصل في الوقت، والسعر كان واضح من البداية. شكراً Fixate!",
    textEn: "Amazing experience from start to finish! Booking was easy, technician arrived on time, and the price was clear from the beginning. Thank you Fixate!",
    deviceAr: "Huawei MatePad",
    deviceEn: "Huawei MatePad",
    serviceAr: "تغيير الشاشة",
    serviceEn: "Screen Replacement"
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { language } = useLanguage();

  const stats = [
    {
      icon: Users,
      number: "15,000+",
      labelAr: "عميل راضٍ",
      labelEn: "Happy Clients",
      color: "from-emerald-500 via-indigo-500 to-pink-500"
    },
    {
      icon: CheckCircle2,
      number: "20,000+",
      labelAr: "جهاز تم إصلاحه",
      labelEn: "Devices Repaired",
      color: "from-emerald-500 via-indigo-500 to-pink-500"
    },
    {
      icon: Award,
      number: "98%",
      labelAr: "نسبة الرضا",
      labelEn: "Satisfaction Rate",
      color: "from-emerald-500 via-indigo-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      number: "4.9/5",
      labelAr: "متوسط التقييم",
      labelEn: "Average Rating",
      color: "from-emerald-500 via-indigo-500 to-pink-500"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full space-y-12">
      {/* Stats Section */}
      <div className="bg-gradient-to-br from-background to-muted/30 rounded-3xl p-8 md:p-12 border border-border/50">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {language === 'ar' ? 'تقييمات عملائنا' : 'Customer Reviews'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'ماذا يقول عملاؤنا؟' : 'What our customers say?'}
          </p>
        </div>

        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          {language === 'ar' 
            ? 'آلاف العملاء السعداء يثقون في خدماتنا. اقرأ تجاربهم الحقيقية!'
            : 'Thousands of happy customers trust our services. Read their real experiences!'}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {language === 'ar' ? stat.labelAr : stat.labelEn}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${language === 'ar' ? currentIndex * 100 : -currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
              >
                <Card className="border-2 border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-background to-muted/20">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* Avatar and Info */}
                      <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500 p-1">
                            <img
                              src={testimonial.image}
                              alt={language === 'ar' ? testimonial.nameAr : testimonial.nameEn}
                              className="w-full h-full rounded-full object-cover bg-background"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500 rounded-full p-2">
                            <Quote className="h-4 w-4 text-white" />
                          </div>
                        </div>

                        <div className="text-center md:text-start">
                          <h4 className="text-xl font-bold text-foreground">
                            {language === 'ar' ? testimonial.nameAr : testimonial.nameEn}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {language === 'ar' ? testimonial.roleAr : testimonial.roleEn}
                          </p>
                        </div>

                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="flex-1 space-y-6">
                        <p className="text-lg text-foreground leading-relaxed">
                          "{language === 'ar' ? testimonial.textAr : testimonial.textEn}"
                        </p>

                        <div className="flex flex-wrap gap-3">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-pink-500/10 border border-primary/20">
                            <span className="text-2xl">📱</span>
                            <span className="text-sm font-medium text-foreground">
                              {language === 'ar' ? testimonial.deviceAr : testimonial.deviceEn}
                            </span>
                          </div>
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-pink-500/10 border border-primary/20">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm font-medium text-foreground">
                              {language === 'ar' ? testimonial.serviceAr : testimonial.serviceEn}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          className={`absolute top-1/2 -translate-y-1/2 ${language === 'ar' ? 'right-0 -mr-6' : 'left-0 -ml-6'} bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500 hover:from-emerald-600 hover:via-indigo-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10`}
          aria-label={language === 'ar' ? 'السابق' : 'Previous'}
        >
          {language === 'ar' ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
        </button>
        <button
          onClick={nextTestimonial}
          className={`absolute top-1/2 -translate-y-1/2 ${language === 'ar' ? 'left-0 -ml-6' : 'right-0 -mr-6'} bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500 hover:from-emerald-600 hover:via-indigo-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10`}
          aria-label={language === 'ar' ? 'التالي' : 'Next'}
        >
          {language === 'ar' ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`${language === 'ar' ? 'اذهب إلى التقييم' : 'Go to review'} ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center p-8 md:p-12 rounded-3xl bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {language === 'ar' ? 'انضم إلى آلاف العملاء السعداء!' : 'Join thousands of happy customers!'}
        </h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          {language === 'ar' 
            ? 'احجز الآن واحصل على خدمة صيانة احترافية مع ضمان ذهبي يصل إلى 6 أشهر'
            : 'Book now and get professional repair service with gold warranty up to 6 months'}
        </p>
        <a
          href="/booking"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          {language === 'ar' ? 'احجز خدمة الإصلاح الآن' : 'Book Repair Service Now'}
        </a>
      </div>
    </div>
  );
}
