import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { APP_TITLE } from "@/const";
import SEO, { structuredDataTemplates } from "@/components/SEO";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // أسئلة عن الأسعار
  {
    category: "الأسعار",
    question: "كيف يتم تحديد أسعار الصيانة؟",
    answer: "يتم تحديد الأسعار بناءً على نوع الجهاز والخدمة المطلوبة. يمكنك استخدام حاسبة الأسعار في الموقع للحصول على سعر فوري ودقيق قبل الحجز. جميع أسعارنا شفافة وتنافسية."
  },
  {
    category: "الأسعار",
    question: "هل توجد رسوم إضافية غير معلنة؟",
    answer: "لا، جميع الأسعار المعروضة في حاسبة الأسعار نهائية وشاملة. لا توجد أي رسوم خفية أو إضافية. السعر الذي تراه هو السعر الذي ستدفعه."
  },
  {
    category: "الأسعار",
    question: "هل يمكنني الحصول على خصم؟",
    answer: "نعم! نقدم خصومات متنوعة من خلال نظام نقاط الولاء والكوبونات الترويجية. كما نقدم خصم 20% على أول خدمة إصلاح للعملاء الجدد."
  },
  {
    category: "الأسعار",
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نوفر طرق دفع متعددة: الدفع عند الاستلام (كاش)، التحويل البنكي، والدفع الإلكتروني عبر بوابة Moyasar (بطاقات الائتمان والمحافظ الرقمية)."
  },

  // أسئلة عن الضمان
  {
    category: "الضمان",
    question: "ما هي مدة الضمان على الصيانة؟",
    answer: "نوفر ضمان يصل إلى 6 أشهر على جميع خدمات الصيانة. الضمان يشمل قطع الغيار والعمالة ويغطي أي مشاكل متعلقة بالإصلاح الذي تم."
  },
  {
    category: "الضمان",
    question: "ماذا يشمل الضمان؟",
    answer: "الضمان يشمل قطع الغيار المستبدلة والعمالة. في حال ظهور أي مشكلة متعلقة بالإصلاح خلال فترة الضمان، سنقوم بإصلاحها مجاناً."
  },
  {
    category: "الضمان",
    question: "هل الضمان يغطي الأضرار الجديدة؟",
    answer: "الضمان يغطي فقط المشاكل المتعلقة بالإصلاح الذي تم. الأضرار الجديدة الناتجة عن سوء الاستخدام أو الحوادث لا تغطيها فترة الضمان."
  },
  {
    category: "الضمان",
    question: "كيف أستفيد من الضمان؟",
    answer: "في حال ظهور أي مشكلة خلال فترة الضمان، تواصل معنا عبر الدردشة أو الهاتف وسنقوم بجدولة موعد لفحص الجهاز وإصلاحه مجاناً."
  },

  // أسئلة عن مدة الإصلاح
  {
    category: "مدة الإصلاح",
    question: "كم تستغرق عملية الإصلاح؟",
    answer: "المدة تعتمد على نوع الخدمة. خدمة Express تستغرق 1-2 ساعة، بينما خدمة Pickup تستغرق 1-3 أيام. سيتم إعلامك بالمدة المتوقعة عند الحجز."
  },
  {
    category: "مدة الإصلاح",
    question: "هل يمكن تسريع الإصلاح؟",
    answer: "نعم، يمكنك اختيار خدمة Express للحصول على إصلاح سريع خلال 1-2 ساعة. هذه الخدمة متاحة للإصلاحات البسيطة والمتوسطة."
  },
  {
    category: "مدة الإصلاح",
    question: "كيف أتتبع حالة الإصلاح؟",
    answer: "يمكنك تتبع حالة طلبك من خلال صفحة 'طلباتي' في الموقع. ستصلك إشعارات فورية عند كل تحديث لحالة الطلب."
  },

  // أسئلة عن الخدمة
  {
    category: "الخدمة",
    question: "ما هي أنواع الأجهزة التي تدعمونها؟",
    answer: "ندعم جميع أنواع الأجهزة الإلكترونية: الهواتف الذكية (iPhone, Samsung, Huawei, وغيرها)، التابلت، اللابتوب، وأجهزة MacBook."
  },
  {
    category: "الخدمة",
    question: "هل توفرون خدمة منزلية؟",
    answer: "نعم! نوفر خدمة Express حيث يأتي الفني إليك في موقعك لإصلاح الجهاز. كما نوفر خدمة Pickup حيث نستلم الجهاز منك ونعيده بعد الإصلاح."
  },
  {
    category: "الخدمة",
    question: "هل الفنيون معتمدون؟",
    answer: "نعم، جميع فنيينا معتمدون ومدربون على أعلى مستوى. نختار فقط الفنيين المحترفين ذوي الخبرة الطويلة في مجال الصيانة."
  },
  {
    category: "الخدمة",
    question: "كيف أحجز خدمة الصيانة؟",
    answer: "يمكنك الحجز بسهولة من خلال الموقع. اختر نوع الجهاز والخدمة المطلوبة، احصل على السعر الفوري، ثم أكمل الحجز. سيتم التواصل معك لتأكيد الموعد."
  },
  {
    category: "الخدمة",
    question: "هل يمكنني إلغاء الحجز؟",
    answer: "نعم، يمكنك إلغاء الحجز قبل بدء الفني بالعمل. تواصل معنا عبر الدردشة أو الهاتف لإلغاء الطلب."
  },
  {
    category: "الخدمة",
    question: "كيف أتواصل مع الفني؟",
    answer: "يمكنك التواصل مع الفني المعين لطلبك من خلال نظام الدردشة المباشرة في الموقع. كما يمكنك تتبع موقعه على الخريطة في الوقت الفعلي."
  },

  // أسئلة عن نقاط الولاء
  {
    category: "نقاط الولاء",
    question: "كيف أحصل على نقاط الولاء؟",
    answer: "تحصل على نقاط ولاء مع كل خدمة إصلاح تقوم بها. كل 10 ريال تنفقه يمنحك نقطة واحدة. كما تحصل على نقاط إضافية عند التقييم والمشاركة."
  },
  {
    category: "نقاط الولاء",
    question: "كيف أستخدم نقاط الولاء؟",
    answer: "يمكنك استبدال نقاط الولاء للحصول على خصومات على الخدمات القادمة. كل 100 نقطة تساوي 10 ريال خصم. يمكنك استبدال النقاط من صفحة نقاط الولاء."
  },
  {
    category: "نقاط الولاء",
    question: "ما هي مستويات العضوية؟",
    answer: "لدينا 4 مستويات: البرونزي (0-499 نقطة)، الفضي (500-999 نقطة)، الذهبي (1000-1999 نقطة)، والبلاتيني (2000+ نقطة). كل مستوى يمنحك مزايا إضافية."
  },
];

const categories = ["الكل", ...Array.from(new Set(faqData.map(item => item.category)))];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Prepare structured data for FAQ
  const faqStructuredData = structuredDataTemplates.faq(
    faqData.map(item => ({ question: item.question, answer: item.answer }))
  );

  const filteredFAQs = activeCategory === "الكل" 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO
        title="الأسئلة الشائعة"
        description="إجابات على جميع أسئلتك حول خدمات Fixate. أسئلة عن الأسعار، الضمان، مدة الإصلاح، طرق الدفع، ونظام نقاط الولاء."
        canonical="https://fixate.sa/faq"
        structuredData={faqStructuredData}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex p-4 bg-white/10 rounded-full mb-6">
              <HelpCircle className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">الأسئلة الشائعة</h1>
            <p className="text-xl text-blue-100">
              إجابات على جميع أسئلتك حول خدمات {APP_TITLE}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold">؟</span>
                        </div>
                      </div>
                      <div className="flex-1 text-right">
                        <h3 className="text-lg font-bold text-gray-900">
                          {item.question}
                        </h3>
                        {openIndex !== index && (
                          <span className="text-sm text-blue-600 mt-1 inline-block">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 mr-4">
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 pb-5 pt-2">
                      <div className="pr-12 text-gray-700 leading-relaxed">
                        {item.answer}
                      </div>
                      <div className="mt-3 pr-12">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              لم تجد إجابة لسؤالك؟
            </h2>
            <p className="text-gray-600 mb-8">
              فريق الدعم الفني متاح على مدار الساعة للإجابة على جميع استفساراتك
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/chat"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                تواصل معنا عبر الدردشة
              </a>
              <a
                href="/booking"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                احجز خدمة الآن
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
