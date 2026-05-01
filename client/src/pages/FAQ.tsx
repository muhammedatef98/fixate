import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";
import Footer from "@/components/Footer";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqDataAr: FAQItem[] = [
  // التطبيق والحجز
  {
    category: "التطبيق والحجز",
    question: "كيف أحمل تطبيق Fixate؟",
    answer: "التطبيق متاح على App Store لأجهزة iPhone وiPad، وعلى Google Play لأجهزة Android. ابحث عن \"Fixate\" أو اضغط على زر التحميل في أي صفحة بالموقع. التطبيق مجاني تماماً."
  },
  {
    category: "التطبيق والحجز",
    question: "كيف أحجز خدمة من خلال التطبيق؟",
    answer: "بعد تحميل التطبيق: (1) أنشئ حساباً أو سجّل دخولك، (2) اختر نوع جهازك والمشكلة، (3) شاهد السعر الدقيق قبل التأكيد، (4) اختر الوقت والموقع المناسب، (5) الفني يصلك في الموعد المحدد."
  },
  {
    category: "التطبيق والحجز",
    question: "هل يمكنني إلغاء الحجز؟",
    answer: "نعم، يمكنك إلغاء الحجز مجاناً قبل 2 ساعة من الموعد المحدد. الإلغاء بعد ذلك قد يخضع لرسوم رمزية. يمكن الإلغاء من داخل التطبيق بسهولة."
  },
  {
    category: "التطبيق والحجز",
    question: "ما هي ساعات الخدمة؟",
    answer: "نعمل 7 أيام في الأسبوع من 8 صباحاً حتى 10 مساءً. في بعض المدن نوفر خدمة الطوارئ حتى منتصف الليل. يمكنك رؤية الأوقات المتاحة في منطقتك داخل التطبيق."
  },
  {
    category: "التطبيق والحجز",
    question: "كيف أتابع الفني أثناء توجهه إليّ؟",
    answer: "بعد تأكيد الحجز، يمكنك متابعة موقع الفني على الخريطة في الوقت الفعلي من خلال التطبيق، مثلاً طلبات أوبر. ستصلك إشعارات عند تحرك الفني وعند وصوله."
  },
  // الأسعار والدفع
  {
    category: "الأسعار والدفع",
    question: "كيف يتم تحديد أسعار الصيانة؟",
    answer: "الأسعار محددة مسبقاً بناءً على نوع الجهاز والخدمة المطلوبة. يمكنك استخدام حاسبة الأسعار في الموقع أو التطبيق للحصول على سعر دقيق قبل الحجز. السعر الذي تراه هو ما ستدفعه — بدون مفاجآت."
  },
  {
    category: "الأسعار والدفع",
    question: "هل توجد رسوم للزيارة بغض النظر عن الإصلاح؟",
    answer: "لا توجد رسوم زيارة إضافية. السعر الذي تراه يشمل التشخيص والإصلاح وقطع الغيار. في حال اكتشاف مشكلة إضافية غير متوقعة، سيُخبرك الفني ويأخذ موافقتك قبل أي عمل إضافي."
  },
  {
    category: "الأسعار والدفع",
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نقبل: مدى، فيزا، ماستركارد، Apple Pay، STC Pay، تابي (تقسيط)، تمارة (تقسيط)، والدفع نقداً عند إتمام الخدمة. جميع المدفوعات الإلكترونية مؤمّنة بالكامل."
  },
  {
    category: "الأسعار والدفع",
    question: "هل يمكنني رؤية السعر قبل تأكيد الحجز؟",
    answer: "نعم، بالكامل. سعر الخدمة يظهر بوضوح قبل أي خطوة. لن تُطلب منك بيانات الدفع حتى تكون راضياً تماماً عن السعر وتريد التأكيد."
  },
  {
    category: "الأسعار والدفع",
    question: "هل هناك عروض أو خصومات؟",
    answer: "نعم! عند حجز أول خدمة من التطبيق، احصل على خصم 20%. كما نوفر كودات خصم دورية يمكنك إدخالها عند الحجز. اشترك في نشرتنا البريدية لتصلك العروض أولاً."
  },
  // الخدمة والجودة
  {
    category: "الخدمة والجودة",
    question: "كم يستغرق الإصلاح؟",
    answer: "يعتمد على نوع الإصلاح: تغيير الشاشة 30-60 دقيقة، تغيير البطارية 20-40 دقيقة، إصلاح منفذ الشحن 30-45 دقيقة، إصلاح الكاميرا 30-60 دقيقة. الفني يعمل أمامك في منزلك أو مكتبك."
  },
  {
    category: "الخدمة والجودة",
    question: "هل قطع الغيار أصلية؟",
    answer: "نستخدم قطع غيار عالية الجودة — إما أصلية من المصنّع أو قطع مُعتمدة بجودة مكافئة للأصلية. نوع القطعة المستخدمة يُذكر في عرض السعر. في حال طلبك قطعاً أصلية فقط، يمكننا توفيرها مع اختلاف طفيف في السعر."
  },
  {
    category: "الخدمة والجودة",
    question: "هل بياناتي في أمان أثناء الإصلاح؟",
    answer: "نعم. جميع فنيينا يوقّعون على اتفاقيات سرية صارمة. الإصلاح يتم أمامك مباشرة، ولا يحتاج الفني عادةً للوصول إلى بياناتك. ننصح بعمل نسخة احتياطية قبل أي إصلاح كإجراء احترازي."
  },
  {
    category: "الخدمة والجودة",
    question: "ماذا لو لم تُحل المشكلة بعد الإصلاح؟",
    answer: "إذا عادت نفس المشكلة خلال فترة الضمان (6 أشهر)، نُصلحها مجاناً بدون أي نقاش. ثقتك في خدمتنا هي أهم شيء."
  },
  {
    category: "الخدمة والجودة",
    question: "هل يمكنني حضور عملية الإصلاح؟",
    answer: "بالتأكيد! هذا هو الفرق الأساسي لدينا — الفني يأتي إليك ويعمل أمامك. يمكنك متابعة كل خطوة، وطرح أي سؤال، والتأكد من جودة العمل قبل الدفع."
  },
  // الضمان
  {
    category: "الضمان",
    question: "ما هي مدة الضمان على الصيانة؟",
    answer: "نوفر ضمان يصل إلى 6 أشهر على جميع خدمات الصيانة. الضمان يشمل قطع الغيار وجودة الإصلاح."
  },
  {
    category: "الضمان",
    question: "ماذا يشمل الضمان تحديداً؟",
    answer: "الضمان يشمل: (1) نفس المشكلة التي أُصلحت إذا عادت، (2) عيوب في قطعة الغيار المُستبدلة، (3) أعطال ناتجة عن خطأ في التركيب. لا يشمل الضمان: الكسر الجديد، الأضرار المائية اللاحقة، أو مشاكل غير مرتبطة بالإصلاح الأصلي."
  },
  {
    category: "الضمان",
    question: "كيف أستفيد من الضمان؟",
    answer: "ببساطة، افتح التطبيق، اذهب إلى \"طلباتي\"، واختر الطلب القديم، واضغط \"المطالبة بالضمان\". سيتواصل معك فريقنا خلال ساعات لتحديد موعد الإصلاح المجاني."
  },
  // التغطية الجغرافية
  {
    category: "التغطية",
    question: "في أي مدن متوفرة الخدمة؟",
    answer: "نغطي حالياً: الرياض، جدة، الدمام، الخبر، الأحساء، مكة المكرمة، المدينة المنورة، الطائف، تبوك، أبها، خميس مشيط، جازان. نتوسع باستمرار — تحقق من التطبيق لرؤية التوفر في منطقتك."
  },
  {
    category: "التغطية",
    question: "هل تغطون المناطق البعيدة داخل المدن؟",
    answer: "في معظم المدن الكبرى نغطي جميع الأحياء. يمكنك إدخال عنوانك في التطبيق للتحقق من التوفر الفوري في منطقتك. إذا لم تكن منطقتك مغطاة بعد، يمكنك التسجيل لتُخطر عند التوسع."
  },
  {
    category: "التغطية",
    question: "هل يمكن الخدمة خارج المدن المدرجة؟",
    answer: "حالياً الخدمة متاحة في المدن المدرجة فقط. نعمل على التوسع لتغطية المزيد من المدن. للاستفسار عن منطقة محددة، تواصل معنا عبر WhatsApp أو من خلال نموذج الاتصال."
  },
  // الأجهزة المدعومة
  {
    category: "الأجهزة المدعومة",
    question: "هل تصلحون أجهزة Apple؟",
    answer: "نعم، نصلح جميع أجهزة Apple: iPhone (جميع الإصدارات)، iPad (جميع الموديلات)، MacBook (Air وPro)، iMac، Apple Watch، AirPods. جميع فنيينا مُدرَّبون على أجهزة Apple."
  },
  {
    category: "الأجهزة المدعومة",
    question: "ما هي ماركات الجوالات التي تدعمونها؟",
    answer: "ندعم جميع الماركات الرئيسية: Apple iPhone، Samsung Galaxy (جميع السلاسل)، Huawei، Xiaomi، OPPO، vivo، OnePlus، Google Pixel، Sony Xperia، وغيرها. في حال عدم وجود جهازك في التطبيق، تواصل معنا."
  },
  {
    category: "الأجهزة المدعومة",
    question: "هل تصلحون اللابتوبات والماك بوك؟",
    answer: "نعم! نصلح MacBook Air وPro، Dell، HP، Lenovo، ASUS، Acer، Microsoft Surface، وغيرها. الخدمات تشمل: استبدال البطارية، تغيير الشاشة، إصلاح لوحة المفاتيح، إصلاح منفذ الشحن، وحل مشاكل البرامج."
  },
  {
    category: "الأجهزة المدعومة",
    question: "هل هناك أجهزة لا تدعمونها؟",
    answer: "الأجهزة القديمة جداً (أكثر من 8 سنوات) قد لا تتوفر لها قطع غيار. اللوحات الأم التالفة بالكامل قد تكون مكلفة للإصلاح. أجهزة الألعاب المحمولة مثل Nintendo Switch متوفرة في بعض المدن فقط. في جميع الأحوال، سيُعلمك الفني قبل أي عمل."
  },
];

const faqDataEn: FAQItem[] = [
  {
    category: "App & Booking",
    question: "How do I download the Fixate app?",
    answer: "The app is available on the App Store for iPhone and iPad, and on Google Play for Android devices. Search for \"Fixate\" or tap the download button on any page of our website. The app is completely free."
  },
  {
    category: "App & Booking",
    question: "How do I book a service through the app?",
    answer: "After downloading the app: (1) Create an account or sign in, (2) Select your device type and issue, (3) View the exact price before confirming, (4) Choose a convenient time and location, (5) The technician arrives at the scheduled time."
  },
  {
    category: "App & Booking",
    question: "Can I cancel a booking?",
    answer: "Yes, you can cancel for free up to 2 hours before the scheduled appointment. Cancellations after that may incur a small fee. You can cancel easily from within the app."
  },
  {
    category: "App & Booking",
    question: "What are your service hours?",
    answer: "We operate 7 days a week from 8 AM to 10 PM. In some cities, we offer emergency service until midnight. You can see available times in your area within the app."
  },
  {
    category: "App & Booking",
    question: "How do I track the technician on the way?",
    answer: "After booking confirmation, you can track the technician's real-time location on the map within the app — similar to Uber. You'll receive push notifications when the technician departs and when they arrive."
  },
  {
    category: "Pricing & Payment",
    question: "How are repair prices determined?",
    answer: "Prices are set in advance based on device type and required service. Use our price calculator on the website or app to get an exact quote before booking. The price you see is what you pay — no surprises."
  },
  {
    category: "Pricing & Payment",
    question: "Is there a visit fee regardless of repair?",
    answer: "No visit fee is charged separately. The quoted price includes diagnostics, repair, and parts. If an unexpected additional issue is found, the technician will inform you and get your approval before any extra work."
  },
  {
    category: "Pricing & Payment",
    question: "What payment methods do you accept?",
    answer: "We accept: Mada, Visa, Mastercard, Apple Pay, STC Pay, Tabby (installments), Tamara (installments), and cash on completion. All digital payments are fully secured."
  },
  {
    category: "Pricing & Payment",
    question: "Can I see the price before confirming the booking?",
    answer: "Yes, completely. The service price is clearly displayed before any step. Payment details will not be requested until you are fully satisfied with the price and wish to confirm."
  },
  {
    category: "Pricing & Payment",
    question: "Are there any offers or discounts?",
    answer: "Yes! Get 20% off your first service when you book through the app. We also offer periodic discount codes that you can enter at checkout. Subscribe to our newsletter to receive offers first."
  },
  {
    category: "Service & Quality",
    question: "How long does the repair take?",
    answer: "It depends on the repair type: screen replacement 30-60 min, battery replacement 20-40 min, charging port repair 30-45 min, camera repair 30-60 min. The technician works in front of you at your home or office."
  },
  {
    category: "Service & Quality",
    question: "Are the replacement parts genuine?",
    answer: "We use high-quality parts — either OEM (from the manufacturer) or certified parts equivalent in quality to OEM. The type of part used is stated in the quote. If you require only genuine OEM parts, we can provide them with a slight price difference."
  },
  {
    category: "Service & Quality",
    question: "Is my data safe during repair?",
    answer: "Yes. All our technicians sign strict confidentiality agreements. Repairs are done directly in front of you, and the technician typically doesn't need access to your data. We recommend making a backup before any repair as a precaution."
  },
  {
    category: "Service & Quality",
    question: "What if the problem isn't resolved after repair?",
    answer: "If the same issue returns within the warranty period (6 months), we fix it for free — no questions asked. Your trust in our service is our top priority."
  },
  {
    category: "Service & Quality",
    question: "Can I watch the repair being done?",
    answer: "Absolutely! This is our core difference — the technician comes to you and works in front of you. You can follow every step, ask any question, and verify the quality of work before paying."
  },
  {
    category: "Warranty",
    question: "What is the warranty period?",
    answer: "We provide up to 6 months warranty on all repair services. The warranty covers both parts and workmanship."
  },
  {
    category: "Warranty",
    question: "What exactly does the warranty cover?",
    answer: "The warranty covers: (1) the same issue if it recurs, (2) defects in the replaced part, (3) problems resulting from installation errors. The warranty does NOT cover: new physical damage, subsequent water damage, or issues unrelated to the original repair."
  },
  {
    category: "Warranty",
    question: "How do I claim my warranty?",
    answer: "Simply open the app, go to \"My Requests\", select the previous order, and tap \"Claim Warranty\". Our team will contact you within a few hours to schedule a free repair."
  },
  {
    category: "Coverage",
    question: "Which cities do you service?",
    answer: "We currently cover: Riyadh, Jeddah, Dammam, Khobar, Al Ahsa, Mecca, Medina, Taif, Tabuk, Abha, Khamis Mushait, and Jazan. We are continuously expanding — check the app to see availability in your area."
  },
  {
    category: "Coverage",
    question: "Do you cover remote areas within cities?",
    answer: "In most major cities, we cover all neighborhoods. Enter your address in the app to instantly check availability in your area. If your area isn't covered yet, you can register to be notified when we expand."
  },
  {
    category: "Coverage",
    question: "Can you service areas outside listed cities?",
    answer: "Currently, service is only available in listed cities. We are working on expanding to cover more cities. To inquire about a specific area, contact us via WhatsApp or the contact form."
  },
  {
    category: "Supported Devices",
    question: "Do you repair Apple devices?",
    answer: "Yes, we repair all Apple devices: iPhone (all generations), iPad (all models), MacBook (Air and Pro), iMac, Apple Watch, and AirPods. All our technicians are trained on Apple devices."
  },
  {
    category: "Supported Devices",
    question: "Which phone brands do you support?",
    answer: "We support all major brands: Apple iPhone, Samsung Galaxy (all series), Huawei, Xiaomi, OPPO, vivo, OnePlus, Google Pixel, Sony Xperia, and more. If your device is not listed in the app, contact us."
  },
  {
    category: "Supported Devices",
    question: "Do you repair laptops and MacBooks?",
    answer: "Yes! We repair MacBook Air and Pro, Dell, HP, Lenovo, ASUS, Acer, Microsoft Surface, and others. Services include: battery replacement, screen replacement, keyboard repair, charging port repair, and software troubleshooting."
  },
  {
    category: "Supported Devices",
    question: "Are there devices you don't support?",
    answer: "Very old devices (over 8 years) may not have available parts. Completely failed motherboards may be expensive to repair. Handheld gaming devices like Nintendo Switch are only available in some cities. In all cases, the technician will inform you before any work."
  },
];

// Build FAQPage JSON-LD structured data
function buildFaqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };
}

const CATEGORIES_AR = ["التطبيق والحجز", "الأسعار والدفع", "الخدمة والجودة", "الضمان", "التغطية", "الأجهزة المدعومة"] as const;
const CATEGORIES_EN = ["App & Booking", "Pricing & Payment", "Service & Quality", "Warranty", "Coverage", "Supported Devices"] as const;

export default function FAQ() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const isArabic = language === "ar";
  const faqData = isArabic ? faqDataAr : faqDataEn;
  const categories = isArabic ? CATEGORIES_AR : CATEGORIES_EN;

  const filtered = faqData.filter((item) => {
    const matchesSearch =
      !search ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isArabic ? "الأسئلة الشائعة" : "FAQ"}
        description={
          isArabic
            ? "إجابات شاملة على جميع أسئلتك حول خدمات صيانة الأجهزة الإلكترونية في Fixate — الأسعار، الضمان، التغطية، وكيفية الحجز"
            : "Comprehensive answers to all your questions about Fixate device repair — pricing, warranty, coverage, and how to book"
        }
        canonical="https://fixate.sa/faq"
        structuredData={buildFaqSchema(isArabic ? faqDataAr : faqDataEn)}
      />

      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <Logo />
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "الرئيسية" : "Home"}
              </Link>
              <Link href="/about" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/faq" className="text-sm font-semibold text-foreground">
                {t("nav.faq")}
              </Link>
              <a href="/#download">
                <Button>{isArabic ? "حمل التطبيق" : "Download App"}</Button>
              </a>
              <LanguageThemeSwitcher />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-4 tracking-tight">
              {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {isArabic
                ? "كل ما تحتاج معرفته عن خدمات Fixate"
                : "Everything you need to know about Fixate"}
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isArabic ? "right-4" : "left-4"}`} />
              <input
                type="search"
                placeholder={isArabic ? "ابحث في الأسئلة..." : "Search questions..."}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpenIndex(null);
                }}
                className={`w-full h-12 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${isArabic ? "pr-12 pl-4" : "pl-12 pr-4"}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-6">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => { setActiveCategory(null); setOpenIndex(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!activeCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {isArabic ? "الكل" : "All"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-6 pb-24">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-3">
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                {isArabic ? "لا توجد نتائج. جرّب بحثاً مختلفاً." : "No results. Try a different search."}
              </p>
            )}
            {filtered.map((item, index) => {
              // find original index for stable open state
              const origIndex = faqData.indexOf(item);
              return (
                <div
                  key={origIndex}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === origIndex ? null : origIndex)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                    dir={isArabic ? "rtl" : "ltr"}
                    aria-expanded={openIndex === origIndex}
                  >
                    <span className="text-base font-semibold text-foreground flex-1 text-start">
                      {item.question}
                    </span>
                    {openIndex === origIndex ? (
                      <ChevronUp className="h-5 w-5 text-primary flex-shrink-0 ms-3" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 ms-3" />
                    )}
                  </button>
                  {openIndex === origIndex && (
                    <div className="px-6 pb-5" dir={isArabic ? "rtl" : "ltr"}>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-primary-foreground tracking-tight">
              {isArabic ? "لم تجد إجابتك؟" : "Didn't Find Your Answer?"}
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              {isArabic
                ? "تواصل معنا عبر واتساب ونرد خلال ساعة"
                : "Contact us on WhatsApp — we reply within an hour"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/966548940042"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-emerald-700 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                <span>💬</span>
                {isArabic ? "واتساب" : "WhatsApp"}
              </a>
              <a
                href="/#download"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-emerald-700 text-white font-bold rounded-full hover:bg-emerald-800 transition-colors"
              >
                {isArabic ? "حمل التطبيق" : "Download App"}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
