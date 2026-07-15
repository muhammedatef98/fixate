import {
  BookOpen,
  Bookmark,
  UserCheck,
  Smartphone,
  Tag,
  CreditCard,
  XCircle,
  Wrench,
  User,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Copyright,
  RefreshCw,
  LogOut,
  Scale,
  Mail,
  ClipboardCheck,
} from "lucide-react";
import LegalDocument, { type LegalSection } from "@/components/LegalDocument";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Terms() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const sectionsAr: LegalSection[] = [
    {
      id: "intro",
      icon: BookOpen,
      title: "المقدمة",
      intro:
        'مرحباً بك في تطبيق Fixate ("التطبيق"). باستخدامك للتطبيق فإنك توافق على الالتزام بهذه الشروط والأحكام. يُرجى قراءتها بعناية قبل استخدام خدماتنا.',
    },
    {
      id: "definitions",
      icon: Bookmark,
      title: "التعريفات",
      bullets: [
        { label: "المستخدم", text: "أي شخص يستخدم التطبيق، سواء كان عميلاً أو فنياً" },
        { label: "العميل", text: "المستخدم الذي يطلب خدمات الإصلاح" },
        { label: "الفني", text: "مقدم الخدمة المسجَّل في التطبيق" },
        { label: "الخدمة", text: "خدمات إصلاح الأجهزة الإلكترونية المقدَّمة عبر التطبيق" },
        { label: "الطلب", text: "طلب الخدمة المقدَّم من العميل" },
      ],
    },
    {
      id: "eligibility",
      icon: UserCheck,
      title: "الأهلية",
      bullets: [
        "يجب أن يكون عمر المستخدم 18 عاماً على الأقل لاستخدام التطبيق",
        "يجب تقديم معلومات صحيحة ودقيقة عند التسجيل",
        "يحق لنا رفض أو إلغاء أي حساب في أي وقت",
      ],
    },
    {
      id: "use",
      icon: Smartphone,
      title: "استخدام التطبيق",
      bullets: [
        "يلتزم المستخدم باستخدام التطبيق للأغراض المشروعة فقط",
        "يُمنع استخدام التطبيق لأي نشاط غير قانوني أو احتيالي",
        "يُحظر نشر محتوى مسيء أو غير لائق",
        "يجب الحفاظ على سرية بيانات الحساب",
      ],
    },
    {
      id: "pricing",
      icon: Tag,
      title: "الخدمات والأسعار",
      bullets: [
        "الأسعار المعروضة تقديرية وقد تتغير بناءً على الفحص الفعلي",
        "يتم الاتفاق على السعر النهائي بين العميل والفني قبل بدء العمل",
        "جميع الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة",
      ],
    },
    {
      id: "payment",
      icon: CreditCard,
      title: "الدفع",
      bullets: [
        "يتم الدفع مباشرة للفني بعد إتمام الخدمة",
        "طرق الدفع المتاحة: نقداً أو بالبطاقة",
        "لا نتحمل مسؤولية النزاعات المالية بين العميل والفني",
      ],
    },
    {
      id: "cancellation",
      icon: XCircle,
      title: "الإلغاء والاسترجاع",
      bullets: [
        "يمكن إلغاء الطلب قبل قبول الفني له دون رسوم",
        "بعد قبول الطلب قد تُطبَّق رسوم إلغاء",
        "لا يمكن استرجاع المبالغ بعد إتمام الخدمة إلا في حالات خاصة",
      ],
    },
    {
      id: "technician-responsibilities",
      icon: Wrench,
      title: "مسؤوليات الفني",
      bullets: [
        "أن يكون الفني مؤهلاً ومعتمداً لتقديم الخدمات",
        "الالتزام بمعايير الجودة والاحترافية",
        "احترام خصوصية العميل وممتلكاته",
        "تقديم ضمان على الإصلاحات المنفَّذة",
      ],
    },
    {
      id: "customer-responsibilities",
      icon: User,
      title: "مسؤوليات العميل",
      bullets: [
        "تقديم معلومات دقيقة عن الجهاز والمشكلة",
        "التواجد في الموقع المحدد في الوقت المتفق عليه",
        "الدفع للفني بعد إتمام الخدمة",
        "عدم العبث بالجهاز قبل وصول الفني",
      ],
    },
    {
      id: "warranty",
      icon: ShieldCheck,
      title: "الضمان",
      bullets: [
        "كل إصلاح مكتمل يشمل ضماناً لمدة 12 شهراً على العمل والقطع المستبدلة",
        "يمكنك عرض شهادة الضمان الرقمية وتصديرها من داخل التطبيق",
        "الضمان لا يشمل الأضرار الناتجة عن سوء الاستخدام",
      ],
    },
    {
      id: "liability",
      icon: AlertTriangle,
      title: "المسؤولية",
      bullets: [
        "التطبيق منصة وساطة بين العملاء والفنيين",
        "نسعى لضمان جودة الخدمات عبر تقييم الفنيين والمراجعات",
        "لا نتحمل مسؤولية أي أضرار غير مباشرة ناتجة عن استخدام التطبيق",
      ],
    },
    {
      id: "privacy",
      icon: Lock,
      title: "الخصوصية",
      intro:
        "نحترم خصوصية المستخدمين ونحمي بياناتهم. يرجى مراجعة سياسة الخصوصية للمزيد من التفاصيل.",
    },
    {
      id: "ip",
      icon: Copyright,
      title: "الملكية الفكرية",
      bullets: [
        "جميع حقوق الملكية الفكرية للتطبيق محفوظة",
        "يُمنع نسخ أو تعديل أو توزيع محتوى التطبيق",
        "الشعارات والعلامات التجارية مملوكة لنا",
      ],
    },
    {
      id: "amendments",
      icon: RefreshCw,
      title: "التعديلات",
      intro:
        "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعار المستخدمين بأي تغييرات جوهرية، واستمرار استخدام التطبيق يعني الموافقة على التعديلات.",
    },
    {
      id: "termination",
      icon: LogOut,
      title: "إنهاء الحساب",
      bullets: [
        "يمكن للمستخدم إنهاء حسابه في أي وقت",
        "نحتفظ بالحق في تعليق أو إنهاء أي حساب يخالف الشروط",
        "عند إنهاء الحساب تُحذف البيانات الشخصية وفقاً لسياسة الخصوصية",
      ],
    },
    {
      id: "governing-law",
      icon: Scale,
      title: "القانون الساري",
      intro:
        "تخضع هذه الشروط لقوانين المملكة العربية السعودية. تُحلّ النزاعات ودياً أو عبر المحاكم السعودية. اللغة العربية هي اللغة المعتمدة لتفسير الشروط.",
    },
    {
      id: "device-handover",
      icon: ClipboardCheck,
      title: "شروط استلام وتسليم الأجهزة",
      intro: "تطبق الشروط التالية عند استلام الجهاز للإصلاح وتسليمه بعد الإصلاح:",
      bullets: [
        "استقبال الجهاز المراد تصليحه بدون اكسسواراته مثل (غلاف/جراب/كابل) أو شريحة الاتصال أو ذاكرة خارجية، وعليه فإن الورشة غير مسؤولة عن فقدان أي من هذه الاكسسوارات.",
        "عند تسليم العميل للجهاز المراد إصلاحه، يجب على العميل ذكر كافة الأعطال المراد إصلاحها، وفي حال لم يتم ذكر كافة الأعطال فإن الورشة غير مسؤولة عن أي عطل يتسبب في عطب الجهاز نهائيًا.",
        "عند البدء في عملية الإصلاح (كتبديل شاشة الجهاز مثلًا) وتم اكتشاف عطل آخر لم يذكره العميل، فإن الورشة غير مسؤولة عن هذا العطل ويتحمل العميل كلفة إصلاحه في حال أراد ذلك.",
        "في حالة تعرض الجهاز للسوائل، وتم إصلاحه من قبل الورشة وبعد استلام العميل له، فإن الورشة غير مسؤولة إذا ظهر عطل آخر في الجهاز لم يكن موجود عند تشغيل الجهاز عند استلامه.",
        "جميع الشاشات التي يتم استبدالها أو تركيبها لجهاز العميل لا يوجد ضمان عليها.",
        "لا يتم تسليم الجهاز للعميل إلا بفاتورة الاستلام.",
        "يجب على العميل فحص الجهاز قبل مغادرة الورشة عند استلامه، وإلا فإن الورشة غير مسؤولة عن أي عطل آخر يظهر في الجهاز بعد مغادرته للورشة.",
        "الورشة غير مسؤولة عن فقدان أو تلف الجهاز بعد مضي 3 أشهر من عدم استلامه.",
      ],
    },
    {
      id: "contact",
      icon: Mail,
      title: "الاتصال بنا",
      intro: "إذا كان لديك أي استفسار حول هذه الشروط، تواصل معنا عبر القنوات أدناه.",
    },
  ];

  const sectionsEn: LegalSection[] = [
    {
      id: "intro",
      icon: BookOpen,
      title: "Introduction",
      intro:
        'Welcome to the Fixate app ("the App"). By using the App, you agree to be bound by these Terms and Conditions. Please read them carefully before using our services.',
    },
    {
      id: "definitions",
      icon: Bookmark,
      title: "Definitions",
      bullets: [
        { label: "User", text: "Any person using the App, whether customer or technician" },
        { label: "Customer", text: "A user requesting repair services" },
        { label: "Technician", text: "A service provider registered in the App" },
        { label: "Service", text: "Electronic-device repair services provided through the App" },
        { label: "Order", text: "A service request placed by a customer" },
      ],
    },
    {
      id: "eligibility",
      icon: UserCheck,
      title: "Eligibility",
      bullets: [
        "Users must be at least 18 years old to use the App",
        "Accurate information must be provided during registration",
        "We reserve the right to refuse or cancel any account at any time",
      ],
    },
    {
      id: "use",
      icon: Smartphone,
      title: "Use of the App",
      bullets: [
        "Use the App for lawful purposes only",
        "Illegal or fraudulent use is prohibited",
        "Posting offensive or inappropriate content is forbidden",
        "Account credentials must be kept confidential",
      ],
    },
    {
      id: "pricing",
      icon: Tag,
      title: "Services & pricing",
      bullets: [
        "Displayed prices are estimates and may change based on actual inspection",
        "The final price is agreed between customer and technician before work begins",
        "All prices are in Saudi Riyals and include VAT",
      ],
    },
    {
      id: "payment",
      icon: CreditCard,
      title: "Payment",
      bullets: [
        "Payment is made directly to the technician after service completion",
        "Available methods: cash or card",
        "We are not responsible for financial disputes between customer and technician",
      ],
    },
    {
      id: "cancellation",
      icon: XCircle,
      title: "Cancellation & refunds",
      bullets: [
        "Orders may be cancelled before technician acceptance at no cost",
        "After acceptance, cancellation fees may apply",
        "Refunds after service completion are only available in special cases",
      ],
    },
    {
      id: "technician-responsibilities",
      icon: Wrench,
      title: "Technician responsibilities",
      bullets: [
        "Be qualified and certified to provide the services",
        "Adhere to quality and professional standards",
        "Respect customer privacy and property",
        "Provide warranty on completed repairs",
      ],
    },
    {
      id: "customer-responsibilities",
      icon: User,
      title: "Customer responsibilities",
      bullets: [
        "Provide accurate information about the device and issue",
        "Be available at the specified location at the agreed time",
        "Pay the technician after service completion",
        "Do not tamper with the device before the technician arrives",
      ],
    },
    {
      id: "warranty",
      icon: ShieldCheck,
      title: "Warranty",
      bullets: [
        "Every completed repair includes a 12-month warranty covering the work and replaced parts",
        "You can view and export your digital warranty certificate from within the app",
        "Warranty does not cover damage caused by misuse",
      ],
    },
    {
      id: "liability",
      icon: AlertTriangle,
      title: "Liability",
      bullets: [
        "The App is a platform connecting customers and technicians",
        "We work to ensure service quality through technician vetting and reviews",
        "We are not liable for indirect damages resulting from App use",
      ],
    },
    {
      id: "privacy",
      icon: Lock,
      title: "Privacy",
      intro:
        "We respect users' privacy and protect their data. Please review our Privacy Policy for full details.",
    },
    {
      id: "ip",
      icon: Copyright,
      title: "Intellectual property",
      bullets: [
        "All intellectual property rights in the App are reserved",
        "Copying, modifying, or distributing App content is prohibited",
        "Logos and trademarks are owned by us",
      ],
    },
    {
      id: "amendments",
      icon: RefreshCw,
      title: "Amendments",
      intro:
        "We reserve the right to modify these terms at any time. Users will be notified of material changes, and continued use of the App means acceptance of the amendments.",
    },
    {
      id: "termination",
      icon: LogOut,
      title: "Account termination",
      bullets: [
        "Users may terminate their account at any time",
        "We reserve the right to suspend or terminate any account that violates these terms",
        "On termination, personal data is deleted per the Privacy Policy",
      ],
    },
    {
      id: "governing-law",
      icon: Scale,
      title: "Governing law",
      intro:
        "These terms are governed by the laws of Saudi Arabia. Disputes are resolved amicably or through Saudi courts. Arabic is the authoritative language for interpreting these terms.",
    },
    {
      id: "device-handover",
      icon: ClipboardCheck,
      title: "Device drop-off & collection terms",
      intro:
        "The following terms apply when a device is received for repair and collected afterwards (the Arabic text is the authoritative version):",
      bullets: [
        "The device is received for repair without its accessories such as (case/cover/cable), SIM card, or external memory; accordingly, the workshop is not responsible for the loss of any of these accessories.",
        "When handing over the device for repair, the customer must mention all faults to be repaired. If not all faults are mentioned, the workshop is not responsible for any fault that causes permanent damage to the device.",
        "If, during the repair (e.g. replacing the device screen), another fault not mentioned by the customer is discovered, the workshop is not responsible for that fault, and the customer bears the cost of repairing it should they wish to.",
        "If the device was exposed to liquids and was repaired by the workshop, then after the customer collects it, the workshop is not responsible if another fault appears that was not present when the device was switched on at collection.",
        "All screens replaced or installed on the customer's device carry no warranty.",
        "The device is only handed over to the customer with the collection invoice.",
        "The customer must inspect the device before leaving the workshop upon collection; otherwise the workshop is not responsible for any other fault that appears in the device after they leave the workshop.",
        "The workshop is not responsible for loss of or damage to the device after 3 months from non-collection.",
      ],
    },
    {
      id: "contact",
      icon: Mail,
      title: "Contact us",
      intro: "If you have any questions about these terms, reach us via the channels below.",
    },
  ];

  return (
    <LegalDocument
      title={isArabic ? "الشروط والأحكام" : "Terms & Conditions"}
      subtitle={
        isArabic
          ? "القواعد التي تحكم استخدامك لتطبيق Fixate."
          : "The rules governing your use of the Fixate app."
      }
      lastUpdated={isArabic ? "ديسمبر 2025" : "December 2025"}
      seoDescription={
        isArabic
          ? "الشروط والأحكام لاستخدام تطبيق Fixate لصيانة الأجهزة الإلكترونية في المملكة العربية السعودية."
          : "Terms and conditions for using the Fixate app for electronic-device repair in Saudi Arabia."
      }
      canonical="https://fixate.site/terms"
      sections={isArabic ? sectionsAr : sectionsEn}
      acknowledgement={
        isArabic
          ? "بقبولك لهذه الشروط، فإنك تُقرّ بأنك قرأتها وفهمتها ووافقت عليها."
          : "By accepting these terms, you acknowledge that you have read, understood, and agreed to them."
      }
    />
  );
}
