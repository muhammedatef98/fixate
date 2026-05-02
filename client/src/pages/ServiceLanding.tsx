import { useParams, Link } from "wouter";
import { useState } from "react";
import { Shield, Clock, CheckCircle2, Download, Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";
import NotFound from "./NotFound";

const APP_STORE_URL = (import.meta.env.VITE_APP_STORE_URL as string) || null;
const PLAY_STORE_URL = (import.meta.env.VITE_PLAY_STORE_URL as string) || null;

interface ServiceData {
  slug: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  keywordsAr: string;
  keywordsEn: string;
  heroAr: string;
  heroEn: string;
  subheadAr: string;
  subheadEn: string;
  priceFromAr: string;
  priceFromEn: string;
  icon: string;
  faqAr: { q: string; a: string }[];
  faqEn: { q: string; a: string }[];
}

const SERVICES: Record<string, ServiceData> = {
  "iphone-screen-repair": {
    slug: "iphone-screen-repair",
    titleAr: "تصليح شاشة آيفون",
    titleEn: "iPhone Screen Repair",
    descAr: "تصليح شاشة آيفون في المنزل خلال ساعة واحدة بفنيين معتمدين وضمان 6 أشهر. أسعار تنافسية لجميع موديلات آيفون في السعودية.",
    descEn: "Fix your iPhone screen at home in one hour with certified technicians and a 6-month warranty. Competitive prices for all iPhone models in Saudi Arabia.",
    keywordsAr: "تصليح شاشة آيفون، تصليح شاشة ايفون الرياض، كسر شاشة آيفون، تغيير شاشة ايفون، صيانة ايفون السعودية",
    keywordsEn: "iphone screen repair saudi arabia, iphone screen fix riyadh, broken iphone screen",
    heroAr: "تصليح شاشة آيفون في بيتك",
    heroEn: "iPhone Screen Repair at Your Door",
    subheadAr: "فني معتمد يصلك خلال ساعة، ضمان 6 أشهر على كل إصلاح",
    subheadEn: "A certified technician reaches you within an hour, 6-month warranty on every repair",
    priceFromAr: "ابدأ من 150 ريال",
    priceFromEn: "Starting from 150 SAR",
    icon: "📱",
    faqAr: [
      { q: "كم يستغرق تصليح شاشة آيفون؟", a: "يستغرق تصليح الشاشة عادةً بين 30 و60 دقيقة حسب الموديل." },
      { q: "هل تستخدمون قطع أصلية؟", a: "نعم، نستخدم قطع أصلية أو قطع عالية الجودة مضمونة لمدة 6 أشهر." },
      { q: "ما هي موديلات آيفون التي تدعمونها؟", a: "ندعم جميع موديلات آيفون من iPhone 8 وحتى iPhone 16 Pro Max." },
      { q: "هل الخدمة متاحة في منزلي؟", a: "نعم، الفني يأتي إليك في منزلك أو مكان عملك خلال ساعة واحدة." },
    ],
    faqEn: [
      { q: "How long does iPhone screen repair take?", a: "Screen repair typically takes 30–60 minutes depending on the model." },
      { q: "Do you use original parts?", a: "Yes, we use original or high-quality parts with a 6-month warranty." },
      { q: "Which iPhone models do you support?", a: "We support all iPhone models from iPhone 8 through iPhone 16 Pro Max." },
      { q: "Is the service available at my home?", a: "Yes, a technician comes to your home or workplace within one hour." },
    ],
  },
  "iphone-battery": {
    slug: "iphone-battery",
    titleAr: "تبديل بطارية آيفون",
    titleEn: "iPhone Battery Replacement",
    descAr: "تبديل بطارية آيفون في المنزل خلال 30 دقيقة بضمان 6 أشهر. فنيون معتمدون يصلونك أينما كنت في السعودية.",
    descEn: "Replace your iPhone battery at home in 30 minutes with a 6-month warranty. Certified technicians reach you anywhere in Saudi Arabia.",
    keywordsAr: "تبديل بطارية آيفون، تغيير بطارية ايفون، بطارية آيفون السعودية، صيانة بطارية ايفون الرياض",
    keywordsEn: "iphone battery replacement saudi arabia, iphone battery change riyadh",
    heroAr: "تبديل بطارية آيفون في بيتك",
    heroEn: "iPhone Battery Replacement at Your Door",
    subheadAr: "بطارية أصلية وضمان 6 أشهر — الفني يصلك خلال ساعة",
    subheadEn: "Original battery with 6-month warranty — technician arrives within an hour",
    priceFromAr: "ابدأ من 120 ريال",
    priceFromEn: "Starting from 120 SAR",
    icon: "🔋",
    faqAr: [
      { q: "متى يجب تبديل بطارية آيفون؟", a: "إذا كانت صحة البطارية أقل من 80% أو إذا كان الجهاز يفقد الشحن بسرعة كبيرة." },
      { q: "كم يستغرق تبديل البطارية؟", a: "عادةً 20 إلى 30 دقيقة فقط." },
      { q: "هل ستُفقد بياناتي أثناء تبديل البطارية؟", a: "لا، تبديل البطارية لا يؤثر على بياناتك أو إعداداتك." },
      { q: "ما هي ضمانة البطارية الجديدة؟", a: "6 أشهر ضمان على البطارية والعمالة." },
    ],
    faqEn: [
      { q: "When should I replace my iPhone battery?", a: "When battery health drops below 80% or your phone drains unusually fast." },
      { q: "How long does the battery replacement take?", a: "Typically just 20–30 minutes." },
      { q: "Will I lose my data during battery replacement?", a: "No, replacing the battery does not affect your data or settings." },
      { q: "What is the warranty on the new battery?", a: "6-month warranty on both the battery and labor." },
    ],
  },
  "samsung-repair": {
    slug: "samsung-repair",
    titleAr: "تصليح سامسونج",
    titleEn: "Samsung Repair",
    descAr: "تصليح جوال سامسونج في المنزل بفنيين معتمدين. صيانة شاشة، بطارية، وكاميرا لجميع موديلات Galaxy بضمان 6 أشهر في السعودية.",
    descEn: "Samsung phone repair at home by certified technicians. Screen, battery, and camera repair for all Galaxy models with a 6-month warranty in Saudi Arabia.",
    keywordsAr: "تصليح سامسونج، صيانة سامسونج الرياض، تصليح شاشة سامسونج، تصليح Galaxy، صيانة جوال سامسونج السعودية",
    keywordsEn: "samsung repair saudi arabia, samsung galaxy fix riyadh, samsung screen repair",
    heroAr: "تصليح سامسونج في بيتك",
    heroEn: "Samsung Repair at Your Door",
    subheadAr: "فني متخصص في Galaxy يصلك خلال ساعة — ضمان 6 أشهر",
    subheadEn: "Galaxy specialist reaches you in one hour — 6-month warranty",
    priceFromAr: "ابدأ من 130 ريال",
    priceFromEn: "Starting from 130 SAR",
    icon: "📲",
    faqAr: [
      { q: "ما موديلات سامسونج التي تدعمونها؟", a: "ندعم جميع أجهزة Samsung Galaxy من S8 وحتى Galaxy S24 Ultra وفولد وفليب." },
      { q: "هل تصلحون شاشة سامسونج الأصلية AMOLED؟", a: "نعم، نستخدم شاشات AMOLED أصلية أو تعادلها بجودة OEM." },
      { q: "كم يستغرق الإصلاح؟", a: "بين 30 و90 دقيقة حسب نوع العطل." },
      { q: "هل الخدمة متاحة في جدة والدمام؟", a: "نعم، نغطي الرياض وجدة والدمام والخبر ومدن أخرى." },
    ],
    faqEn: [
      { q: "Which Samsung models do you support?", a: "We support all Samsung Galaxy devices from S8 through Galaxy S24 Ultra, Fold, and Flip series." },
      { q: "Do you repair Samsung original AMOLED screens?", a: "Yes, we use original AMOLED or OEM-equivalent screens." },
      { q: "How long does the repair take?", a: "Between 30 and 90 minutes depending on the issue." },
      { q: "Is the service available in Jeddah and Dammam?", a: "Yes, we cover Riyadh, Jeddah, Dammam, Khobar, and other cities." },
    ],
  },
  "laptop-repair": {
    slug: "laptop-repair",
    titleAr: "تصليح لابتوب",
    titleEn: "Laptop Repair",
    descAr: "تصليح لابتوب في المنزل بفنيين معتمدين. إصلاح شاشة، بطارية، لوحة مفاتيح، وأكثر لجميع أنواع اللابتوب بضمان 6 أشهر في السعودية.",
    descEn: "Laptop repair at home by certified technicians. Screen, battery, keyboard and more for all laptop brands with 6-month warranty in Saudi Arabia.",
    keywordsAr: "تصليح لابتوب، صيانة لابتوب الرياض، تصليح شاشة لابتوب، تصليح كمبيوتر محمول السعودية",
    keywordsEn: "laptop repair saudi arabia, laptop fix riyadh, laptop screen repair",
    heroAr: "تصليح لابتوبك في بيتك",
    heroEn: "Laptop Repair at Your Door",
    subheadAr: "فني متخصص يصلك خلال ساعة — HP، Dell، Lenovo، Asus وأكثر",
    subheadEn: "Specialist technician arrives in one hour — HP, Dell, Lenovo, Asus and more",
    priceFromAr: "ابدأ من 200 ريال",
    priceFromEn: "Starting from 200 SAR",
    icon: "💻",
    faqAr: [
      { q: "ما أنواع اللابتوب التي تدعمونها؟", a: "ندعم HP وDell وLenovo وAsus وAcer وMicrosoft Surface وغيرها." },
      { q: "هل تصلحون لوحة الأم للابتوب؟", a: "نعم، نصلح لوحات الأم والشاشات والبطاريات ومنافذ الشحن والمراوح." },
      { q: "كم يستغرق إصلاح اللابتوب؟", a: "تعتمد المدة على نوع العطل — بعض الإصلاحات تأخذ ساعة وبعضها يوم عمل." },
      { q: "هل يمكن استعادة البيانات إذا توقف اللابتوب؟", a: "نعم، نقدم خدمة استعادة البيانات من الأقراص الصلبة التالفة." },
    ],
    faqEn: [
      { q: "What laptop brands do you support?", a: "We support HP, Dell, Lenovo, Asus, Acer, Microsoft Surface and others." },
      { q: "Do you repair laptop motherboards?", a: "Yes, we repair motherboards, screens, batteries, charging ports, and cooling fans." },
      { q: "How long does laptop repair take?", a: "It depends on the issue — some repairs take an hour, others a full working day." },
      { q: "Can you recover data from a dead laptop?", a: "Yes, we offer data recovery services from damaged hard drives." },
    ],
  },
  "macbook-repair": {
    slug: "macbook-repair",
    titleAr: "تصليح ماك بوك",
    titleEn: "MacBook Repair",
    descAr: "تصليح ماك بوك في المنزل بفنيين معتمدين من Apple. إصلاح شاشة، بطارية، لوحة مفاتيح MacBook Air وMacBook Pro بضمان 6 أشهر في السعودية.",
    descEn: "MacBook repair at home by Apple-certified technicians. Screen, battery, keyboard repair for MacBook Air and MacBook Pro with 6-month warranty in Saudi Arabia.",
    keywordsAr: "تصليح ماك بوك، صيانة MacBook الرياض، تصليح شاشة ماك بوك، صيانة ماك بوك ابل السعودية",
    keywordsEn: "macbook repair saudi arabia, macbook fix riyadh, macbook screen repair, apple macbook service",
    heroAr: "تصليح ماك بوك في بيتك",
    heroEn: "MacBook Repair at Your Door",
    subheadAr: "فنيون معتمدون من Apple يصلونك خلال ساعة — ضمان 6 أشهر",
    subheadEn: "Apple-certified technicians reach you in one hour — 6-month warranty",
    priceFromAr: "ابدأ من 250 ريال",
    priceFromEn: "Starting from 250 SAR",
    icon: "🍎",
    faqAr: [
      { q: "هل تصلحون MacBook Air وMacBook Pro؟", a: "نعم، ندعم جميع موديلات MacBook Air وPro من 2015 حتى الأحدث بشريحة M3." },
      { q: "هل تستخدمون قطع غيار Apple أصلية؟", a: "نعم، نستخدم قطع أصلية Apple أو قطع معتمدة بجودة OEM." },
      { q: "كم يستغرق تصليح شاشة MacBook؟", a: "عادةً بين ساعة وساعتين حسب الموديل." },
      { q: "هل يمكن إصلاح ماك بوك انسكب عليه ماء؟", a: "نعم، نقدم خدمة إصلاح أضرار السوائل — يُنصح بإحضاره في أسرع وقت." },
    ],
    faqEn: [
      { q: "Do you repair MacBook Air and MacBook Pro?", a: "Yes, we support all MacBook Air and Pro models from 2015 to the latest M3 chip." },
      { q: "Do you use original Apple parts?", a: "Yes, we use original Apple parts or OEM-certified equivalents." },
      { q: "How long does MacBook screen repair take?", a: "Typically 1–2 hours depending on the model." },
      { q: "Can you fix a MacBook with liquid damage?", a: "Yes, we offer liquid damage repair — bring it in as soon as possible for best results." },
    ],
  },
  "ipad-repair": {
    slug: "ipad-repair",
    titleAr: "تصليح آيباد",
    titleEn: "iPad Repair",
    descAr: "تصليح آيباد في المنزل خلال ساعة. إصلاح شاشة، بطارية، وزجاج iPad Air وPad Pro وiPad Mini بضمان 6 أشهر في السعودية.",
    descEn: "iPad repair at home within one hour. Screen, battery, and glass repair for iPad Air, iPad Pro, and iPad Mini with a 6-month warranty in Saudi Arabia.",
    keywordsAr: "تصليح آيباد، تصليح شاشة ايباد، تصليح iPad الرياض، صيانة آيباد السعودية",
    keywordsEn: "ipad repair saudi arabia, ipad screen repair riyadh, ipad fix",
    heroAr: "تصليح آيباد في بيتك",
    heroEn: "iPad Repair at Your Door",
    subheadAr: "فني معتمد يصلك خلال ساعة — ضمان 6 أشهر على الشاشة والبطارية",
    subheadEn: "Certified technician reaches you within one hour — 6-month warranty on screen and battery",
    priceFromAr: "ابدأ من 180 ريال",
    priceFromEn: "Starting from 180 SAR",
    icon: "⬜",
    faqAr: [
      { q: "ما موديلات آيباد التي تدعمونها؟", a: "ندعم iPad Air وiPad Pro وiPad Mini وiPad (الجيل العاشر وأحدث)." },
      { q: "هل تصلحون الزجاج المكسور فقط دون الشاشة؟", a: "يعتمد ذلك على الموديل — في بعض الأحيان يجب استبدال الزجاج مع الشاشة معاً." },
      { q: "كم تكلفة تصليح شاشة آيباد؟", a: "تبدأ من 180 ريال وتختلف حسب الموديل ونوع الشاشة." },
      { q: "هل تصلحون كاميرا آيباد؟", a: "نعم، نصلح كاميرا آيباد الأمامية والخلفية." },
    ],
    faqEn: [
      { q: "Which iPad models do you support?", a: "We support iPad Air, iPad Pro, iPad Mini, and iPad (10th generation and newer)." },
      { q: "Can you fix just the glass without the screen?", a: "It depends on the model — sometimes the glass must be replaced together with the display." },
      { q: "How much does iPad screen repair cost?", a: "Starting from 180 SAR, depending on the model and screen type." },
      { q: "Do you repair iPad cameras?", a: "Yes, we repair both front and rear iPad cameras." },
    ],
  },
};

function buildServiceSchema(service: ServiceData, isArabic: boolean) {
  const faq = isArabic ? service.faqAr : service.faqEn;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isArabic ? "الرئيسية" : "Home", item: "https://fixate.sa/" },
        { "@type": "ListItem", position: 2, name: isArabic ? "الخدمات" : "Services", item: "https://fixate.sa/services" },
        { "@type": "ListItem", position: 3, name: isArabic ? service.titleAr : service.titleEn, item: `https://fixate.sa/services/${service.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: isArabic ? service.titleAr : service.titleEn,
      description: isArabic ? service.descAr : service.descEn,
      provider: {
        "@type": "LocalBusiness",
        name: "Fixate",
        url: "https://fixate.sa",
        telephone: "+966548940042",
        address: { "@type": "PostalAddress", addressCountry: "SA", addressLocality: "الرياض" },
      },
      areaServed: { "@type": "Country", name: "Saudi Arabia" },
      offers: { "@type": "Offer", priceCurrency: "SAR", availability: "https://schema.org/InStock" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
}

export default function ServiceLanding() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const service = SERVICES[slug ?? ""];
  if (!service) return <NotFound />;

  const isArabic = language === "ar";
  const title = isArabic ? service.titleAr : service.titleEn;
  const schema = buildServiceSchema(service, isArabic);

  const steps = isArabic
    ? [
        { emoji: "📲", label: "حمل التطبيق" },
        { emoji: "📝", label: "اختر الخدمة" },
        { emoji: "🏠", label: "حدد موقعك" },
        { emoji: "✅", label: "استقبل الفني" },
      ]
    : [
        { emoji: "📲", label: "Download App" },
        { emoji: "📝", label: "Choose Service" },
        { emoji: "🏠", label: "Set Location" },
        { emoji: "✅", label: "Welcome Technician" },
      ];

  const faq = isArabic ? service.faqAr : service.faqEn;

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? "rtl" : "ltr"}>
      <SEO
        title={title}
        description={isArabic ? service.descAr : service.descEn}
        keywords={isArabic ? service.keywordsAr : service.keywordsEn}
        canonical={`https://fixate.sa/services/${service.slug}`}
        structuredData={schema as object}
      />

      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "الرئيسية" : "Home"}
              </Link>
              <Link href="/faq" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "الأسئلة الشائعة" : "FAQ"}
              </Link>
              <Link href="/contact" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "تواصل معنا" : "Contact"}
              </Link>
              <a href="/#download">
                <Button>{isArabic ? "حمل التطبيق" : "Download App"}</Button>
              </a>
              <LanguageThemeSwitcher />
            </nav>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={isArabic ? "القائمة" : "Menu"}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className={`absolute top-0 ${isArabic ? "left-0" : "right-0"} bottom-0 w-72 bg-background shadow-2xl p-6 flex flex-col gap-4`}>
            <button className="self-end p-2 rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </button>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium py-2">{isArabic ? "الرئيسية" : "Home"}</Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium py-2">{isArabic ? "الأسئلة الشائعة" : "FAQ"}</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium py-2">{isArabic ? "تواصل معنا" : "Contact"}</Link>
            <a href="/#download" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">{isArabic ? "حمل التطبيق" : "Download App"}</Button>
            </a>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="container py-3" aria-label="breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <li><Link href="/" className="hover:text-foreground transition-colors">{isArabic ? "الرئيسية" : "Home"}</Link></li>
          <li>/</li>
          <li className="text-foreground font-medium">{title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-6xl mb-6 block">{service.icon}</span>
            <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-5 tracking-tight">
              {isArabic ? service.heroAr : service.heroEn}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {isArabic ? service.subheadAr : service.subheadEn}
            </p>

            {/* Price badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-5 py-2.5 rounded-full text-base font-semibold mb-8 border border-emerald-200 dark:border-emerald-800">
              {isArabic ? service.priceFromAr : service.priceFromEn}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/#download">
                <Button size="lg" className="h-12 px-8 text-base rounded-full font-semibold shadow-lg">
                  <Download className="h-4 w-4 me-2" />
                  {isArabic ? "احجز الآن" : "Book Now"}
                </Button>
              </a>
              <a
                href="https://wa.me/966548940042"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-8 bg-[#25D366] hover:bg-[#1fb956] text-white font-semibold text-base rounded-full transition-colors shadow-lg"
              >
                <MessageCircle className="h-4 w-4" />
                {isArabic ? "واتساب" : "WhatsApp"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-10 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
            <div className="flex flex-col items-center gap-2">
              <Shield className="h-8 w-8 text-emerald-600" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-foreground">{isArabic ? "ضمان 6 أشهر" : "6-Month Warranty"}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-foreground">{isArabic ? "فنيون معتمدون" : "Certified Techs"}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="h-8 w-8 text-emerald-600" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-foreground">{isArabic ? "خلال ساعة" : "Within 1 Hour"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-foreground mb-12 tracking-tight">
            {isArabic ? "كيف تعمل الخدمة؟" : "How It Works"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                  {step.emoji}
                </div>
                <p className="text-sm font-semibold text-foreground">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-foreground mb-10 tracking-tight">
            {isArabic ? "أسئلة شائعة" : "Frequently Asked Questions"}
          </h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border/50">
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-start font-semibold text-foreground hover:bg-muted/30 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed text-sm border-t border-border/30 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-muted-foreground">
            <Link href="/faq" className="text-primary hover:underline font-medium">
              {isArabic ? "عرض جميع الأسئلة الشائعة ←" : "View all FAQs →"}
            </Link>
          </p>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="py-24 md:py-32 bg-emerald-600">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-5 tracking-tight">
              {isArabic ? "احجز خدمتك الآن" : "Book Your Service Now"}
            </h2>
            <p className="text-lg text-white/90 mb-10">
              {isArabic ? "حمل التطبيق واحصل على خصم 20% على أول طلب" : "Download the app and get 20% off your first order"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {APP_STORE_URL ? (
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3.5 rounded-xl border border-white/20 hover:bg-gray-800 transition-colors min-w-[170px] shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div className="text-start"><p className="text-[10px] text-gray-300">{isArabic ? "متاح على" : "Download on the"}</p><p className="text-sm font-bold">App Store</p></div>
                </a>
              ) : (
                <span className="inline-flex items-center gap-3 bg-gray-900/60 text-white/60 px-6 py-3.5 rounded-xl min-w-[170px] cursor-default">
                  <Download className="h-5 w-5" /><div className="text-start"><p className="text-[10px]">{isArabic ? "قريباً" : "Coming Soon"}</p><p className="text-sm font-bold">App Store</p></div>
                </span>
              )}
              {PLAY_STORE_URL ? (
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3.5 rounded-xl border border-white/20 hover:bg-gray-800 transition-colors min-w-[170px] shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7"><path d="M3.18 23.76a2.5 2.5 0 01-.94-.64c-.5-.56-.74-1.32-.74-2.25V3.13c0-.93.24-1.69.74-2.25a2.5 2.5 0 01.94-.64L13.46 12l-10.28 11.76zm.88.52l12.42-7.17-2.73-3.12-9.69 10.29zm12.42-13.67L4.06.44l9.69 10.29 2.73-3.12zm1.64.95l2.77 1.6c.79.46.79 1.2 0 1.66l-2.77 1.6L15.39 12l2.73-2.44z"/></svg>
                  <div className="text-start"><p className="text-[10px] text-gray-300">{isArabic ? "احصل عليه من" : "Get it on"}</p><p className="text-sm font-bold">Google Play</p></div>
                </a>
              ) : (
                <span className="inline-flex items-center gap-3 bg-gray-900/60 text-white/60 px-6 py-3.5 rounded-xl min-w-[170px] cursor-default">
                  <Download className="h-5 w-5" /><div className="text-start"><p className="text-[10px]">{isArabic ? "قريباً" : "Coming Soon"}</p><p className="text-sm font-bold">Google Play</p></div>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
