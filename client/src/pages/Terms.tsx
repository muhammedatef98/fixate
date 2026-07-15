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
  FileBadge,
  Database,
  Banknote,
  Star,
  Truck,
  ShieldAlert,
  Store,
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
        { label: "مندوب التوصيل", text: "الطرف المستقل المسجّل لاستلام الأجهزة وتوصيلها بين العميل والفني" },
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
        "طرق الدفع المتاحة: نقداً، بطاقة ائتمانية، تحويل بنكي",
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
        "التطبيق منصة وساطة فقط بين العملاء والفنيين",
        "لا نتحمل مسؤولية جودة الخدمات المقدمة",
        "لا نتحمل مسؤولية أي أضرار ناتجة عن استخدام التطبيق",
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
      id: "warranty-policy",
      icon: FileBadge,
      title: "سياسة الضمان",
      bullets: [
        "تقدّم Fixate ضماناً لمدة سنة كاملة (12 شهراً / 365 يوماً) على جميع الإصلاحات المنفذة عبر المنصة، ويشمل العمل والقطع المستبدلة.",
        "يبدأ سريان الضمان من تاريخ إتمام الإصلاح وتسليم الجهاز للعميل، ويظهر تاريخ انتهائه في تفاصيل الطلب.",
        "لا يشمل الضمان الأضرار الناتجة عن سوء الاستخدام أو السقوط أو السوائل أو العبث بالجهاز بعد الإصلاح أو الإصلاح لدى جهة أخرى.",
        "لتفعيل الضمان يحتفظ العميل بفاتورة الإصلاح ويتواصل مع الدعم لمراجعة الحالة، وتُعاد المعالجة أو الإصلاح دون رسوم في الحالات المشمولة.",
      ],
    },
    {
      id: "data-protection",
      icon: Database,
      title: "الخصوصية وحماية البيانات",
      bullets: [
        "نجمع فقط البيانات اللازمة لتقديم الخدمة: الاسم، رقم الجوال، البريد الإلكتروني، العنوان وموقع الخدمة، وتفاصيل الأجهزة والطلبات.",
        "تُخزَّن البيانات بشكل آمن على بنية سحابية مع ضوابط وصول وتشفير أثناء النقل.",
        "لا نبيع بياناتك الشخصية ولا نشاركها مع أطراف ثالثة إلا بالقدر اللازم لتنفيذ الخدمة أو حسبما يقتضيه النظام.",
        "يحق للمستخدم الاطلاع على بياناته أو تصحيحها أو حذف حسابه وبياناته نهائياً عبر خيار «حذف الحساب» داخل التطبيق أو بالتواصل مع support@fixate.site.",
        "نحتفظ بالسجلات اللازمة للفوترة والالتزامات النظامية للمدة التي يفرضها النظام فقط.",
      ],
    },
    {
      id: "payment-refunds",
      icon: Banknote,
      title: "الدفع والاسترداد",
      bullets: [
        "طرق الدفع المتاحة: نقداً عند الإتمام، أو بالبطاقة الائتمانية/مدى، أو وسائل الدفع الإلكترونية المتاحة داخل التطبيق.",
        "الفحص مجاني دائماً ولا تُفرض عليه أي رسوم.",
        "يحق للعميل طلب الاسترداد إذا دفع مقابل إصلاح لم يُنفَّذ، أو عند ظهور خلل مشمول بالضمان ولم تتم معالجته.",
        "تُقدَّم طلبات الاسترداد عبر فريق الدعم خلال 14 يوماً من تاريخ المعاملة، وتُراجَع كل حالة على حدة.",
        "عند نشوء أي نزاع، يتولى فريق Fixate الوساطة بين العميل والفني للوصول إلى حل عادل، وما لم يُحل ودياً يُحال وفق القانون الساري.",
      ],
    },
    {
      id: "technician-vetting",
      icon: Star,
      title: "اعتماد الفنيين وتقييمهم",
      bullets: [
        "يخضع كل فني لمراجعة واعتماد من إدارة Fixate قبل استقبال الطلبات، ويشمل ذلك التحقق من الهوية أو الإقامة والوثائق المطلوبة.",
        "يُقيّم العملاء الفنيين بعد كل طلب من 1 إلى 5 نجوم، ويظهر متوسط التقييم على ملف الفني ويؤثر على أولويته في استلام الطلبات.",
        "تُراقَب التقييمات المنخفضة المتكررة والبلاغات، وقد يؤدي ذلك إلى تعليق حساب الفني أو إنهائه.",
      ],
    },
    {
      id: "customer-obligations",
      icon: User,
      title: "التزامات ومسؤوليات العميل (مفصّلة)",
      bullets: [
        "يقرّ العميل بأن جميع البيانات المُدخلة (نوع الجهاز، العطل، العنوان، رقم الهاتف، الصور) صحيحة وكاملة، ويتحمّل وحده أي نتيجة تترتب على معلومات غير دقيقة أو مضلّلة أو ناقصة.",
        "يقرّ العميل بأنه المالك الشرعي للجهاز أو مفوّض بإصلاحه، ويتحمّل كامل المسؤولية القانونية إذا تبيّن خلاف ذلك، وتُخلى المنصّة والفني من أي مسؤولية عن أجهزة مسروقة أو محجوزة أو محل نزاع.",
        "يلتزم العميل بعمل نسخة احتياطية لبياناته قبل تسليم الجهاز. لا تتحمّل المنصّة ولا الفني أي مسؤولية عن فقدان البيانات أو الوسائط أو التطبيقات أو الإعدادات أثناء الفحص أو الإصلاح.",
        "يُقرّ العميل بأن حالة الجهاز الظاهرة (كسور سابقة، تلف بالماء، أعطال مخفية، عبث سابق بالإصلاح) قد تؤثر على النتيجة، وأن أي أضرار ناتجة عن عيوب سابقة أو هشاشة في المكوّنات لا تُعدّ مسؤولية الفني أو المنصّة.",
        "يلتزم العميل بالتواجد في الموعد المتفق عليه وبإتاحة الوصول للجهاز. التأخّر أو تعذّر التسليم/الاستلام لأسباب تخصّ العميل قد يترتب عليه رسوم أو إلغاء الطلب دون استرداد الرسوم غير القابلة للاسترداد.",
        "يلتزم العميل بسداد كامل المبلغ المتفق عليه فور إتمام الخدمة. يُعدّ الامتناع عن الدفع إخلالاً جوهرياً يخوّل المنصّة والفني اتخاذ الإجراءات النظامية، بما في ذلك حجز الجهاز إلى حين السداد وفق الأنظمة المعمول بها.",
        "أي إساءة استخدام للمنصّة (بلاغات كيدية، تقييمات غير صحيحة، محاولة تجاوز المنصّة للتعامل خارجها، انتحال الهوية) تخوّل المنصّة تعليق الحساب أو إنهاءه دون إشعار مسبق.",
      ],
    },
    {
      id: "technician-obligations",
      icon: Wrench,
      title: "التزامات ومسؤوليات الفني (مفصّلة)",
      bullets: [
        "الفني مقاول مستقل وليس موظفاً لدى المنصّة. تعمل المنصّة كوسيط تقني يربط الأطراف فقط، ولا تُعدّ طرفاً في عقد الإصلاح ولا ضامنة لجودته أو نتيجته.",
        "يتحمّل الفني وحده المسؤولية الكاملة والمباشرة عن جودة العمل، وسلامة الجهاز في عهدته، وأي ضرر أو فقدان أو سوء تشخيص أو استخدام قطع غير مطابقة، ويُعوّض العميل مباشرةً عند ثبوت تقصيره.",
        "يلتزم الفني بتقديم تقديرات وأسعار صادقة، وبعدم المبالغة في الأعطال أو التكاليف، وبالإفصاح عن أي أعطال إضافية قبل تنفيذها والحصول على موافقة العميل.",
        "يلتزم الفني بالمواعيد والمدد المتوقعة التي يعلنها، ويتحمّل مسؤولية أي أضرار تنشأ عن الإهمال أو التأخير غير المبرّر أو ترك الجهاز دون عناية.",
        "يُحظر على الفني التعامل مع العميل خارج المنصّة أو تحصيل مبالغ خارج الآلية المعتمدة؛ ومخالفة ذلك تخوّل المنصّة إنهاء الحساب وحجب المستحقات ومطالبة الفني بالعمولات المستحقة.",
        "يقرّ الفني بأنه يحمل كل التراخيص والتأمينات اللازمة لمزاولة النشاط، ويعوّض المنصّة عن أي مطالبات أو غرامات أو دعاوى تنشأ عن عمله أو تقصيره.",
      ],
    },
    {
      id: "courier-obligations",
      icon: Truck,
      title: "التزامات ومسؤوليات مندوب التوصيل (مفصّلة)",
      bullets: [
        "مندوب التوصيل مقاول مستقل مسؤول شخصياً عن استلام الجهاز وتسليمه بحالته المتفق عليها، وعن سلامته أثناء وجوده في عهدته من لحظة الاستلام حتى التسليم الموثّق.",
        "يتحمّل المندوب المسؤولية الكاملة عن أي فقدان أو سرقة أو تلف أو تأخير يقع أثناء النقل، ويُعوّض الطرف المتضرّر مباشرةً، وتُخلى المنصّة من أي مسؤولية عن هذه الأضرار.",
        "يلتزم المندوب بالتحقق من هوية الطرف المستلِم وتوثيق عملية التسليم (توقيع/صورة/تأكيد داخل التطبيق). أي تسليم لشخص خاطئ أو تسليم غير موثّق يقع على مسؤولية المندوب وحده.",
        "يقرّ المندوب بامتلاكه رخصة قيادة سارية وتأميناً ومركبة نظامية، وبأنه المسؤول الوحيد عن أي مخالفات مرورية أو حوادث أو أضرار للغير أثناء تأدية المهمة.",
        "يُحظر على المندوب فتح الجهاز أو تشغيله أو العبث بمحتوياته أو الاطلاع على بيانات العميل؛ ومخالفة ذلك تُعدّ خرقاً جسيماً يستوجب إنهاء الحساب والمساءلة النظامية.",
        "في حال تعذّر التسليم أو الاستلام (غياب الطرف الآخر، عنوان خاطئ، رفض الاستلام)، يلتزم المندوب باتباع إجراءات المنصّة وتوثيق الحالة، ولا تتحمّل المنصّة تبعات فشل التسليم العائد لأي من الأطراف.",
      ],
    },
    {
      id: "platform-release",
      icon: ShieldAlert,
      title: "حدود مسؤولية المنصّة وإخلاء الطرف",
      bullets: [
        "المنصّة وسيط تقني فقط لربط العملاء بالفنيين ومندوبي التوصيل، وليست طرفاً في أي عقد إصلاح أو نقل، ولا تقدّم خدمات الإصلاح أو التوصيل بنفسها.",
        "تُقدَّم المنصّة «كما هي» و«حسب توفّرها» دون أي ضمانات صريحة أو ضمنية. لا تضمن المنصّة نتيجة أي إصلاح أو دقة أي تقدير أو سلوك أي مستخدم.",
        "لا تتحمّل المنصّة بأي حال المسؤولية عن أضرار مباشرة أو غير مباشرة أو تبعية أو عرضية أو تحفيزية، بما في ذلك فقدان البيانات أو الأرباح أو الأجهزة، الناشئة عن استخدام الخدمة أو التعامل بين الأطراف.",
        "تنحصر المسؤولية القصوى للمنصّة — إن وُجدت وبعد إثباتها — في قيمة العمولة التي تقاضتها المنصّة عن الطلب محل النزاع فقط، ولا تتجاوزها بأي حال.",
        "تقع مسؤولية النزاعات المتعلقة بالتوقيت أو التسعير أو حالة الجهاز أو جودة الإصلاح أو التسليم بين الأطراف المعنيّة مباشرةً (العميل والفني والمندوب)، وتتدخّل المنصّة — إن تدخّلت — بصفة تيسيرية فقط ودون التزام أو ضمان.",
        "يوافق كل مستخدم على تعويض المنصّة والدفاع عنها وإبراء ذمّتها من أي مطالبات أو خسائر أو أضرار أو أتعاب محاماة تنشأ عن استخدامه للخدمة أو إخلاله بهذه الشروط أو مخالفته للأنظمة أو تعديه على حقوق الغير.",
        "تحتفظ المنصّة بحقها المطلق في تعليق أو إنهاء أي حساب، وحجب أي مستحقات مرتبطة بمخالفة أو احتيال، والإبلاغ عن أي نشاط غير مشروع للجهات المختصة، دون إشعار مسبق ودون أدنى مسؤولية.",
      ],
    },
    {
      id: "marketplace",
      icon: Store,
      title: "سوق الأجهزة المستعملة — إخلاء مسؤولية",
      bullets: [
        "قسم السوق داخل التطبيق هو منصّة عرض وربط بين بائعين ومشترين مستقلين فقط. المنصّة ليست بائعاً ولا مشترياً ولا وسيطاً في أي صفقة، ولا تمتلك أو تحوز أو تفحص أو تضمن أي منتج معروض.",
        "تقع المسؤولية الكاملة عن دقة وصف المنتج، وحالته، وأصالته، وملكيته، ومطابقته، وسلامته القانونية، على عاتق البائع وحده. ويتحمّل المشتري وحده مسؤولية معاينة المنتج والتحقق منه قبل الشراء (مبدأ «البضاعة المباعة كما هي»).",
        "لا تضمن المنصّة جودة أي منتج، أو صحّة أي إعلان، أو صدق أي طرف، أو إتمام أي صفقة، أو توفّر المنتج، أو أهليّة أي مستخدم للبيع أو الشراء.",
        "جميع المدفوعات والتسليمات في السوق تتم مباشرةً بين البائع والمشتري وعلى مسؤوليتهما وحدهما. لا تتدخّل المنصّة في تحصيل الأموال أو حجزها أو ردّها، ولا تتحمّل أي مسؤولية عن الاحتيال، أو عدم الدفع، أو الشيكات المرتجعة، أو المنتجات المزيّفة أو المسروقة أو غير المطابقة.",
        "جميع النزاعات المتعلقة بالسوق — بما في ذلك خلافات الجودة أو السعر أو الوصف أو التسليم أو حالة المنتج أو الاسترجاع أو ما بعد البيع — تُحلّ مباشرةً بين البائع والمشتري. تُخلى المنصّة تماماً من أي مسؤولية عنها، وأي تدخّل من فريق الدعم يكون بصفة تيسيرية فقط ودون التزام أو ضمان.",
        "يُمنع منعاً باتاً عرض أي منتجات مقلّدة أو مسروقة أو محظورة أو مخالفة للأنظمة، ويتحمّل المخالف كامل المسؤولية القانونية. وتحتفظ المنصّة بحقها في إزالة أي إعلان وتعليق أو إنهاء أي حساب والإبلاغ عن أي نشاط غير مشروع دون إشعار.",
        "ينصح بشدّة بإتمام المعاينة والتسليم في أماكن عامة وآمنة. المنصّة غير مسؤولة عن أي ضرر شخصي أو مادي أو خسارة تنشأ عن اللقاءات أو التعاملات بين مستخدمي السوق.",
        "يوافق كل مستخدم للسوق على إبراء ذمّة المنصّة وتعويضها عن أي مطالبات أو خسائر أو أضرار تنشأ عن تعاملاته في السوق أو إخلاله بهذه الشروط.",
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
        { label: "Delivery Representative (Courier)", text: "The independent party registered to collect and deliver devices between the customer and the technician" },
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
        "Available methods: cash, credit card, bank transfer",
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
        "The App is only an intermediary platform between customers and technicians",
        "We are not responsible for the quality of services provided",
        "We are not liable for any damages resulting from App use",
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
      id: "warranty-policy",
      icon: FileBadge,
      title: "Warranty policy",
      bullets: [
        "Fixate provides a full one-year (12-month / 365-day) warranty on all repairs performed through the platform, covering both the labor and any replaced parts.",
        "The warranty starts from the date the repair is completed and the device is handed back to the customer, and its expiry date is shown in the order details.",
        "The warranty does not cover damage caused by misuse, drops, liquids, tampering with the device after the repair, or repairs carried out by a third party.",
        "To claim the warranty, the customer keeps the repair invoice and contacts support to review the case; covered cases are re-repaired or resolved at no charge.",
      ],
    },
    {
      id: "data-protection",
      icon: Database,
      title: "Privacy & data protection",
      bullets: [
        "We collect only the data necessary to provide the service: name, mobile number, email, address and service location, and device and order details.",
        "Data is stored securely on cloud infrastructure with access controls and encryption in transit.",
        "We do not sell your personal data and do not share it with third parties except as necessary to deliver the service or as required by law.",
        "Users may access or correct their data, or permanently delete their account and data, via the \"Delete Account\" option in the app or by contacting support@fixate.site.",
        "We retain only the records required for billing and legal obligations, for the period required by law.",
      ],
    },
    {
      id: "payment-refunds",
      icon: Banknote,
      title: "Payment & refunds",
      bullets: [
        "Accepted payment methods: cash on completion, credit card / mada, or the electronic payment methods available in the app.",
        "Inspection is always free and is never charged for.",
        "Customers may request a refund if they paid for a repair that was not performed, or if a warranty-covered fault appeared and was not resolved.",
        "Refund requests are submitted through the support team within 14 days of the transaction date, and each case is reviewed individually.",
        "In the event of a dispute, the Fixate team mediates between the customer and the technician to reach a fair resolution; if not resolved amicably, it is escalated under the governing law.",
      ],
    },
    {
      id: "technician-vetting",
      icon: Star,
      title: "Technician vetting & ratings",
      bullets: [
        "Every technician is reviewed and approved by Fixate before receiving orders, including verification of national ID or Iqama and the required documents.",
        "Customers rate technicians from 1 to 5 stars after each order; the average rating is shown on the technician's profile and affects their priority for receiving orders.",
        "Repeated low ratings and reports are monitored and may lead to suspension or termination of the technician's account.",
      ],
    },
    {
      id: "customer-obligations",
      icon: User,
      title: "Customer obligations & liability (detailed)",
      bullets: [
        "The customer warrants that all information provided (device type, fault, address, phone, photos) is true, accurate and complete, and bears sole responsibility for any consequence of inaccurate, misleading or incomplete information.",
        "The customer warrants they are the lawful owner of the device or authorized to have it repaired, and assumes full legal liability if proven otherwise. The platform and technician are released from any liability for stolen, seized or disputed devices.",
        "The customer is solely responsible for backing up their data before handing over the device. Neither the platform nor the technician is liable for any loss of data, media, apps or settings during inspection or repair.",
        "The customer acknowledges that the device's condition (prior cracks, water damage, hidden faults, previous tampering) may affect the outcome, and that damage arising from pre-existing defects or fragile components is not the responsibility of the technician or the platform.",
        "The customer must be present at the agreed time and provide access to the device. Delays or failed hand-over/collection due to the customer may result in fees or cancellation without refund of non-refundable charges.",
        "The customer must pay the full agreed amount immediately upon completion of the service. Non-payment is a material breach entitling the platform and technician to pursue lawful remedies, including retaining the device until payment under applicable law.",
        "Any misuse of the platform (malicious reports, false ratings, attempts to bypass the platform to transact off-app, impersonation) entitles the platform to suspend or terminate the account without prior notice.",
      ],
    },
    {
      id: "technician-obligations",
      icon: Wrench,
      title: "Technician obligations & liability (detailed)",
      bullets: [
        "The technician is an independent contractor and not an employee of the platform. The platform acts solely as a technical intermediary connecting the parties, is not a party to the repair contract, and does not guarantee its quality or outcome.",
        "The technician bears sole, full and direct responsibility for the quality of work, the safety of the device in their custody, and any damage, loss, misdiagnosis or use of non-conforming parts, and shall compensate the customer directly where fault is established.",
        "The technician must provide honest estimates and pricing, must not exaggerate faults or costs, and must disclose any additional faults and obtain the customer's approval before performing extra work.",
        "The technician must honor the timeframes and estimated durations they publish, and is liable for any damage arising from negligence, unjustified delay, or leaving the device unattended.",
        "The technician may not deal with the customer off-platform or collect money outside the approved mechanism; breach entitles the platform to terminate the account, withhold dues, and claim any commissions owed.",
        "The technician warrants they hold all licenses and insurance required to operate, and shall indemnify the platform against any claims, fines or actions arising from their work or default.",
      ],
    },
    {
      id: "courier-obligations",
      icon: Truck,
      title: "Delivery representative (courier) obligations & liability (detailed)",
      bullets: [
        "The courier is an independent contractor personally responsible for collecting and delivering the device in its agreed condition, and for its safety while in their custody from the moment of pickup until documented delivery.",
        "The courier bears full responsibility for any loss, theft, damage or delay occurring during transport, shall compensate the affected party directly, and the platform is released from any liability for such damage.",
        "The courier must verify the identity of the receiving party and document the hand-over (signature/photo/in-app confirmation). Any delivery to the wrong person or undocumented delivery is the courier's sole responsibility.",
        "The courier warrants they hold a valid driving license, insurance and a lawful vehicle, and is solely responsible for any traffic violations, accidents or third-party damage while performing the task.",
        "The courier may not open, power on or tamper with the device or access the customer's data; breach is a gross violation warranting account termination and legal accountability.",
        "Where delivery or collection fails (the other party is absent, wrong address, refusal to receive), the courier must follow the platform's procedures and document the case. The platform bears no consequences of a failed hand-over attributable to any party.",
      ],
    },
    {
      id: "platform-release",
      icon: ShieldAlert,
      title: "Platform limitation of liability & release",
      bullets: [
        "The platform is a technical intermediary only, connecting customers with technicians and couriers. It is not a party to any repair or transport contract and does not itself provide repair or delivery services.",
        "The platform is provided \"as is\" and \"as available\" without warranties of any kind, express or implied. The platform does not guarantee the outcome of any repair, the accuracy of any estimate, or the conduct of any user.",
        "In no event shall the platform be liable for any direct, indirect, consequential, incidental or punitive damages — including loss of data, profits or devices — arising from use of the service or dealings between the parties.",
        "The platform's maximum liability, if any and once established, is limited to the commission the platform actually collected on the disputed order, and shall not exceed it under any circumstances.",
        "Disputes concerning timing, pricing, device condition, repair quality or delivery rest directly with the parties involved (customer, technician and courier). The platform may intervene, if at all, on a facilitative basis only, without obligation or guarantee.",
        "Each user agrees to indemnify, defend and hold the platform harmless from any claims, losses, damages or legal fees arising from their use of the service, their breach of these terms, their violation of law, or their infringement of the rights of others.",
        "The platform reserves the absolute right to suspend or terminate any account, withhold any dues connected to a violation or fraud, and report any unlawful activity to the competent authorities, without prior notice and without the slightest liability.",
      ],
    },
    {
      id: "marketplace",
      icon: Store,
      title: "Used-device marketplace — disclaimer",
      bullets: [
        "The in-app Marketplace is only a listing and connection platform between independent buyers and sellers. The platform is neither a buyer nor a seller nor a party to any transaction, and does not own, hold, inspect or guarantee any listed item.",
        "The seller alone is fully responsible for the accuracy of the item description, its condition, authenticity, ownership, conformity and legal status. The buyer alone is responsible for inspecting and verifying the item before purchase (\"sold as is\").",
        "The platform does not guarantee the quality of any item, the truthfulness of any listing or party, the completion of any transaction, item availability, or any user's eligibility to buy or sell.",
        "All Marketplace payments and hand-overs occur directly between buyer and seller and at their sole responsibility. The platform does not collect, hold or refund funds, and bears no liability for fraud, non-payment, bounced payments, or counterfeit, stolen or non-conforming items.",
        "All Marketplace disputes — including disagreements over quality, price, description, delivery, item condition, returns or after-sale matters — are resolved directly between buyer and seller. The platform is fully released from any liability for them, and any support intervention is facilitative only, without obligation or guarantee.",
        "Listing counterfeit, stolen, prohibited or unlawful items is strictly forbidden and is the violator's full legal responsibility. The platform reserves the right to remove any listing, suspend or terminate any account, and report unlawful activity without notice.",
        "Inspection and hand-over in safe, public places is strongly advised. The platform is not responsible for any personal injury, property damage or loss arising from meetings or dealings between Marketplace users.",
        "Every Marketplace user agrees to release and indemnify the platform against any claims, losses or damages arising from their Marketplace dealings or their breach of these terms.",
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
      lastUpdated={isArabic ? "يوليو 2026" : "July 2026"}
      seoDescription={
        isArabic
          ? "الشروط والأحكام لاستخدام تطبيق Fixate لصيانة الأجهزة الإلكترونية في المملكة العربية السعودية."
          : "Terms and conditions for using the Fixate app for electronic-device repair in Saudi Arabia."
      }
      canonical="https://fixate.site/terms"
      sections={isArabic ? sectionsAr : sectionsEn}
      acknowledgement={
        isArabic
          ? "بقبولك لهذه الشروط، فإنك تقر بأنك قرأتها وفهمتها ووافقت عليها، وتلتزم بجميع التزامات دورك (عميل / فني / مندوب توصيل / بائع أو مشترٍ في السوق) الواردة أعلاه."
          : "By accepting these terms, you acknowledge that you have read, understood and agreed to them, and that you accept all obligations of your role (customer / technician / courier / marketplace buyer or seller) set out above."
      }
    />
  );
}
