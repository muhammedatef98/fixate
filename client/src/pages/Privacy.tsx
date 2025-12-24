import { Link } from "wouter";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";
import { Button } from "@/components/ui/button";

export default function Privacy() {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
        description={isArabic ? "سياسة الخصوصية لتطبيق Fixate - كيف نحمي بياناتك الشخصية" : "Fixate Privacy Policy - How we protect your personal data"}
        canonical="https://fixate.site/privacy"
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
              <Link href="/about" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/faq" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.faq")}
              </Link>
              <Link href="/booking">
                <Button>{t("nav.bookNow")}</Button>
              </Link>
              <LanguageThemeSwitcher />
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
            </h1>
            <p className="text-muted-foreground mb-8">
              {isArabic ? "آخر تحديث: ديسمبر 2024" : "Last Updated: December 2024"}
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none" dir={isArabic ? "rtl" : "ltr"}>
              {isArabic ? (
                <>
                  <h2>1. المقدمة</h2>
                  <p>نحن في Fixate نلتزم بحماية خصوصيتك. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية.</p>

                  <h2>2. المعلومات التي نجمعها</h2>
                  <h3>2.1 المعلومات الشخصية</h3>
                  <ul>
                    <li>الاسم الكامل</li>
                    <li>رقم الهاتف</li>
                    <li>عنوان البريد الإلكتروني</li>
                    <li>الموقع الجغرافي</li>
                    <li>صور الجهاز المراد إصلاحه</li>
                  </ul>

                  <h3>2.2 معلومات الاستخدام</h3>
                  <ul>
                    <li>سجل الطلبات</li>
                    <li>تفضيلات التطبيق</li>
                    <li>بيانات التفاعل مع التطبيق</li>
                    <li>معلومات الجهاز (نوع الجهاز، نظام التشغيل)</li>
                  </ul>

                  <h3>2.3 معلومات الموقع</h3>
                  <ul>
                    <li>نجمع موقعك الجغرافي لتوفير خدمات الفنيين المتنقلين</li>
                    <li>يمكنك إيقاف مشاركة الموقع من إعدادات الجهاز</li>
                  </ul>

                  <h2>3. كيفية استخدام المعلومات</h2>
                  <p>نستخدم معلوماتك للأغراض التالية:</p>
                  <ul>
                    <li>تقديم وتحسين خدماتنا</li>
                    <li>التواصل معك بخصوص طلباتك</li>
                    <li>معالجة المدفوعات</li>
                    <li>إرسال إشعارات مهمة</li>
                    <li>تحسين تجربة المستخدم</li>
                    <li>الامتثال للمتطلبات القانونية</li>
                  </ul>

                  <h2>4. مشاركة المعلومات</h2>
                  <h3>4.1 مع الفنيين</h3>
                  <p>نشارك معلومات الاتصال والموقع مع الفني المعين لطلبك فقط.</p>

                  <h3>4.2 مع الجهات الحكومية</h3>
                  <p>قد نشارك المعلومات عند الطلب من الجهات الحكومية المختصة.</p>

                  <h3>4.3 مع مقدمي الخدمات</h3>
                  <p>نستخدم خدمات طرف ثالث (مثل Supabase) لتخزين البيانات بشكل آمن.</p>

                  <h3>4.4 عدم البيع</h3>
                  <p>لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة.</p>

                  <h2>5. حماية المعلومات</h2>
                  <h3>5.1 التشفير</h3>
                  <p>نستخدم تشفير SSL/TLS لحماية البيانات أثناء النقل.</p>

                  <h3>5.2 التخزين الآمن</h3>
                  <p>تُخزن البيانات في خوادم آمنة مع ضوابط وصول صارمة.</p>

                  <h3>5.3 المراجعة الأمنية</h3>
                  <p>نجري مراجعات أمنية دورية لحماية البيانات.</p>

                  <h2>6. حقوقك</h2>
                  <p>لديك الحق في:</p>
                  <ul>
                    <li>الوصول إلى معلوماتك الشخصية</li>
                    <li>تصحيح المعلومات غير الدقيقة</li>
                    <li>حذف حسابك ومعلوماتك</li>
                    <li>الاعتراض على معالجة بياناتك</li>
                    <li>طلب نسخة من بياناتك</li>
                    <li>سحب الموافقة في أي وقت</li>
                  </ul>

                  <h2>7. الاحتفاظ بالبيانات</h2>
                  <p>نحتفظ بمعلوماتك طالما كان حسابك نشطاً أو حسب الحاجة لتقديم الخدمات. عند حذف حسابك، نحذف معلوماتك الشخصية خلال 30 يوماً.</p>

                  <h2>8. خصوصية الأطفال</h2>
                  <p>التطبيق غير موجه للأطفال دون 18 عاماً. لا نجمع معلومات من الأطفال عن قصد.</p>

                  <h2>9. التعديلات على السياسة</h2>
                  <p>قد نحدث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات جوهرية. استمرار استخدام التطبيق يعني قبول التعديلات.</p>

                  <h2>10. الامتثال للأنظمة</h2>
                  <p>نلتزم بنظام حماية البيانات الشخصية السعودي واللائحة التنفيذية لحماية البيانات ومعايير الأمن السيبراني الوطنية.</p>

                  <h2>11. الاتصال بنا</h2>
                  <p>لأي استفسارات حول الخصوصية:</p>
                  <ul>
                    <li>البريد الإلكتروني: fixate01@gmail.com</li>
                    <li>الهاتف: +966 54 894 0042</li>
                    <li>العنوان: الرياض، المملكة العربية السعودية</li>
                  </ul>
                </>
              ) : (
                <>
                  <h2>1. Introduction</h2>
                  <p>At Fixate, we are committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information in accordance with Saudi Arabia's Personal Data Protection Law.</p>

                  <h2>2. Information We Collect</h2>
                  <h3>2.1 Personal Information</h3>
                  <ul>
                    <li>Full name</li>
                    <li>Phone number</li>
                    <li>Email address</li>
                    <li>Geographic location</li>
                    <li>Device photos for repair</li>
                  </ul>

                  <h3>2.2 Usage Information</h3>
                  <ul>
                    <li>Order history</li>
                    <li>App preferences</li>
                    <li>App interaction data</li>
                    <li>Device information (device type, operating system)</li>
                  </ul>

                  <h3>2.3 Location Information</h3>
                  <ul>
                    <li>We collect your geographic location to provide mobile technician services</li>
                    <li>You can disable location sharing from device settings</li>
                  </ul>

                  <h2>3. How We Use Information</h2>
                  <p>We use your information for the following purposes:</p>
                  <ul>
                    <li>Providing and improving our services</li>
                    <li>Communicating with you about your orders</li>
                    <li>Processing payments</li>
                    <li>Sending important notifications</li>
                    <li>Improving user experience</li>
                    <li>Complying with legal requirements</li>
                  </ul>

                  <h2>4. Information Sharing</h2>
                  <h3>4.1 With Technicians</h3>
                  <p>We share contact and location information only with the technician assigned to your order.</p>

                  <h3>4.2 With Government Authorities</h3>
                  <p>We may share information when requested by competent government authorities.</p>

                  <h3>4.3 With Service Providers</h3>
                  <p>We use third-party services (such as Supabase) to securely store data.</p>

                  <h3>4.4 No Selling</h3>
                  <p>We do not sell or rent your personal information to third parties.</p>

                  <h2>5. Information Protection</h2>
                  <h3>5.1 Encryption</h3>
                  <p>We use SSL/TLS encryption to protect data during transmission.</p>

                  <h3>5.2 Secure Storage</h3>
                  <p>Data is stored on secure servers with strict access controls.</p>

                  <h3>5.3 Security Reviews</h3>
                  <p>We conduct regular security reviews to protect data.</p>

                  <h2>6. Your Rights</h2>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and information</li>
                    <li>Object to data processing</li>
                    <li>Request a copy of your data</li>
                    <li>Withdraw consent at any time</li>
                  </ul>

                  <h2>7. Data Retention</h2>
                  <p>We retain your information as long as your account is active or as needed to provide services. Upon account deletion, we delete your personal information within 30 days.</p>

                  <h2>8. Children's Privacy</h2>
                  <p>The app is not directed to children under 18. We do not knowingly collect information from children.</p>

                  <h2>9. Policy Changes</h2>
                  <p>We may update this policy from time to time. We will notify you of any material changes. Continued use of the app means acceptance of the changes.</p>

                  <h2>10. Regulatory Compliance</h2>
                  <p>We comply with Saudi Arabia's Personal Data Protection Law, its implementing regulations, and national cybersecurity standards.</p>

                  <h2>11. Contact Us</h2>
                  <p>For any privacy inquiries:</p>
                  <ul>
                    <li>Email: fixate01@gmail.com</li>
                    <li>Phone: +966 54 894 0042</li>
                    <li>Address: Riyadh, Saudi Arabia</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
