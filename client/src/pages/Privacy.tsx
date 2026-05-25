import {
  BookOpen,
  Database,
  Settings2,
  Share2,
  Lock,
  UserCheck,
  Clock,
  Cookie,
  Baby,
  RefreshCw,
  Scale,
  Mail,
} from "lucide-react";
import LegalDocument, { type LegalSection } from "@/components/LegalDocument";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Privacy() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const sectionsAr: LegalSection[] = [
    {
      id: "intro",
      icon: BookOpen,
      title: "المقدمة",
      intro:
        "نحن في Fixate نلتزم بحماية خصوصيتك. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية.",
    },
    {
      id: "info-we-collect",
      icon: Database,
      title: "المعلومات التي نجمعها",
      subsections: [
        {
          title: "المعلومات الشخصية",
          bullets: ["الاسم الكامل", "رقم الهاتف", "البريد الإلكتروني", "الموقع الجغرافي", "صور الجهاز المراد إصلاحه"],
        },
        {
          title: "معلومات الاستخدام",
          bullets: ["سجل الطلبات", "تفضيلات التطبيق", "بيانات التفاعل مع التطبيق", "معلومات الجهاز (النوع، نظام التشغيل)"],
        },
        {
          title: "معلومات الموقع",
          bullets: [
            "نجمع موقعك الجغرافي لتوفير خدمات الفنيين المتنقلين",
            "يمكنك إيقاف مشاركة الموقع من إعدادات الجهاز في أي وقت",
          ],
        },
      ],
    },
    {
      id: "usage",
      icon: Settings2,
      title: "كيفية استخدام المعلومات",
      intro: "نستخدم معلوماتك للأغراض التالية:",
      bullets: [
        "تقديم وتحسين خدماتنا",
        "التواصل معك بخصوص طلباتك",
        "معالجة المدفوعات",
        "إرسال إشعارات مهمة",
        "تحسين تجربة المستخدم",
        "الامتثال للمتطلبات القانونية",
      ],
    },
    {
      id: "sharing",
      icon: Share2,
      title: "مشاركة المعلومات",
      subsections: [
        { title: "مع الفنيين", text: "نشارك معلومات الاتصال والموقع مع الفني المعيّن لطلبك فقط." },
        { title: "مع الجهات الحكومية", text: "قد نشارك المعلومات عند الطلب من الجهات الحكومية المختصة." },
        { title: "مع مقدمي الخدمات", text: "نستخدم خدمات طرف ثالث (مثل Supabase) لتخزين البيانات بشكل آمن." },
        { title: "عدم البيع", text: "لا نبيع أو نؤجر معلوماتك الشخصية لأي طرف ثالث — أبداً." },
      ],
    },
    {
      id: "protection",
      icon: Lock,
      title: "حماية المعلومات",
      bullets: [
        { label: "التشفير", text: "نستخدم تشفير SSL/TLS لحماية البيانات أثناء النقل." },
        { label: "التخزين الآمن", text: "تُخزَّن البيانات في خوادم آمنة مع ضوابط وصول صارمة." },
        { label: "المراجعة الأمنية", text: "نُجري مراجعات أمنية دورية لضمان حماية بياناتك." },
      ],
    },
    {
      id: "rights",
      icon: UserCheck,
      title: "حقوقك",
      intro: "لديك الحق الكامل في:",
      bullets: [
        "الوصول إلى معلوماتك الشخصية",
        "تصحيح المعلومات غير الدقيقة",
        "حذف حسابك ومعلوماتك",
        "الاعتراض على معالجة بياناتك",
        "طلب نسخة من بياناتك",
        "سحب الموافقة في أي وقت",
      ],
    },
    {
      id: "retention",
      icon: Clock,
      title: "الاحتفاظ بالبيانات",
      intro:
        "نحتفظ بمعلوماتك طالما كان حسابك نشطاً أو حسب الحاجة لتقديم الخدمات. عند حذف حسابك، نحذف معلوماتك الشخصية خلال 30 يوماً، باستثناء ما يلزمنا الاحتفاظ به للامتثال للمتطلبات القانونية.",
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "ملفات تعريف الارتباط (Cookies)",
      bullets: [
        "نستخدم ملفات تعريف الارتباط لتحسين تجربتك",
        "يمكنك تعطيلها من إعدادات المتصفح",
        "تعطيلها قد يؤثر على بعض الوظائف",
      ],
    },
    {
      id: "children",
      icon: Baby,
      title: "خصوصية الأطفال",
      intro:
        "التطبيق غير موجَّه للأطفال دون 18 عاماً. لا نجمع معلومات من الأطفال عن قصد، وإذا اكتشفنا ذلك سنحذفها فوراً.",
    },
    {
      id: "updates",
      icon: RefreshCw,
      title: "التعديلات على السياسة",
      intro:
        "قد نُحدِّث هذه السياسة من وقت لآخر. سنُخطرك بأي تغييرات جوهرية، واستمرارك في استخدام التطبيق يعني قبول التعديلات.",
    },
    {
      id: "compliance",
      icon: Scale,
      title: "الامتثال للأنظمة",
      intro: "نلتزم بـ:",
      bullets: [
        "نظام حماية البيانات الشخصية السعودي",
        "اللائحة التنفيذية لحماية البيانات",
        "معايير الأمن السيبراني الوطنية",
      ],
    },
    {
      id: "contact",
      icon: Mail,
      title: "الاتصال بنا",
      intro: "لأي استفسارات حول الخصوصية، تواصل معنا عبر الوسائل المذكورة أدناه.",
    },
  ];

  const sectionsEn: LegalSection[] = [
    {
      id: "intro",
      icon: BookOpen,
      title: "Introduction",
      intro:
        "At Fixate, we are committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information in accordance with Saudi Arabia's Personal Data Protection Law.",
    },
    {
      id: "info-we-collect",
      icon: Database,
      title: "Information we collect",
      subsections: [
        {
          title: "Personal information",
          bullets: ["Full name", "Phone number", "Email address", "Geographic location", "Photos of the device to repair"],
        },
        {
          title: "Usage information",
          bullets: ["Order history", "App preferences", "In-app interaction data", "Device info (type, operating system)"],
        },
        {
          title: "Location information",
          bullets: [
            "We collect your location to provide mobile technician services",
            "You can disable location sharing from your device settings anytime",
          ],
        },
      ],
    },
    {
      id: "usage",
      icon: Settings2,
      title: "How we use your information",
      intro: "We use your information for the following purposes:",
      bullets: [
        "Provide and improve our services",
        "Communicate with you about your orders",
        "Process payments",
        "Send important notifications",
        "Improve user experience",
        "Comply with legal requirements",
      ],
    },
    {
      id: "sharing",
      icon: Share2,
      title: "Sharing information",
      subsections: [
        { title: "With technicians", text: "We share contact and location information only with the technician assigned to your order." },
        { title: "With government authorities", text: "We may share information when requested by competent government authorities." },
        { title: "With service providers", text: "We use third-party services (such as Supabase) to securely store data." },
        { title: "No selling", text: "We do not sell or rent your personal information to any third party — ever." },
      ],
    },
    {
      id: "protection",
      icon: Lock,
      title: "How we protect your data",
      bullets: [
        { label: "Encryption", text: "We use SSL/TLS encryption to protect data in transit." },
        { label: "Secure storage", text: "Data is stored on secure servers with strict access controls." },
        { label: "Security reviews", text: "We run regular security reviews to keep your data safe." },
      ],
    },
    {
      id: "rights",
      icon: UserCheck,
      title: "Your rights",
      intro: "You have the right to:",
      bullets: [
        "Access your personal information",
        "Correct inaccurate information",
        "Delete your account and data",
        "Object to processing of your data",
        "Request a copy of your data",
        "Withdraw consent at any time",
      ],
    },
    {
      id: "retention",
      icon: Clock,
      title: "Data retention",
      intro:
        "We keep your information for as long as your account is active or as needed to provide the service. When you delete your account, we remove your personal information within 30 days, except where retention is required by law.",
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "Cookies",
      bullets: [
        "We use cookies to improve your experience",
        "You can disable cookies in your browser settings",
        "Disabling them may affect some features",
      ],
    },
    {
      id: "children",
      icon: Baby,
      title: "Children's privacy",
      intro:
        "The app is not directed at children under 18. We do not knowingly collect information from children, and if we discover that we have, we will delete it immediately.",
    },
    {
      id: "updates",
      icon: RefreshCw,
      title: "Policy updates",
      intro:
        "We may update this policy from time to time. We will notify you of any material changes, and continued use of the app means acceptance of the updates.",
    },
    {
      id: "compliance",
      icon: Scale,
      title: "Regulatory compliance",
      intro: "We comply with:",
      bullets: [
        "Saudi Personal Data Protection Law",
        "Its implementing data-protection regulations",
        "National cybersecurity standards",
      ],
    },
    {
      id: "contact",
      icon: Mail,
      title: "Contact us",
      intro: "For any privacy questions, reach us via the channels listed below.",
    },
  ];

  return (
    <LegalDocument
      title={isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
      subtitle={
        isArabic
          ? "كيف نجمع بياناتك ونحميها — بكل وضوح. خصوصيتك مسؤوليتنا."
          : "How we collect and protect your data — in plain language. Your privacy is our responsibility."
      }
      lastUpdated={isArabic ? "ديسمبر 2025" : "December 2025"}
      seoDescription={
        isArabic
          ? "سياسة خصوصية Fixate — كيف نجمع بياناتك ونستخدمها ونحميها وفقاً لنظام حماية البيانات السعودي."
          : "Fixate Privacy Policy — how we collect, use, and protect your data in line with Saudi data-protection law."
      }
      canonical="https://fixate.site/privacy"
      sections={isArabic ? sectionsAr : sectionsEn}
    />
  );
}
