import { Link } from "wouter";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";
import { Button } from "@/components/ui/button";

export default function Terms() {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isArabic ? "الشروط والأحكام" : "Terms and Conditions"}
        description={isArabic ? "الشروط والأحكام لاستخدام تطبيق Fixate" : "Terms and Conditions for using Fixate app"}
        canonical="https://fixate.site/terms"
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
              {isArabic ? "الشروط والأحكام" : "Terms and Conditions"}
            </h1>
            <p className="text-muted-foreground mb-8">
              {isArabic ? "آخر تحديث: ديسمبر 2024" : "Last Updated: December 2024"}
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none" dir={isArabic ? "rtl" : "ltr"}>
              {isArabic ? (
                <>
                  <h2>1. المقدمة</h2>
                  <p>مرحباً بك في تطبيق Fixate ("التطبيق"). باستخدامك لهذا التطبيق، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل استخدام خدماتنا.</p>

                  <h2>2. التعريفات</h2>
                  <ul>
                    <li><strong>المستخدم</strong>: أي شخص يستخدم التطبيق، سواء كان عميلاً أو فنياً</li>
                    <li><strong>العميل</strong>: المستخدم الذي يطلب خدمات الإصلاح</li>
                    <li><strong>الفني</strong>: مقدم الخدمة المسجل في التطبيق</li>
                    <li><strong>الخدمة</strong>: خدمات إصلاح الأجهزة الإلكترونية المقدمة من خلال التطبيق</li>
                    <li><strong>الطلب</strong>: طلب الخدمة المقدم من العميل</li>
                  </ul>

                  <h2>3. الأهلية</h2>
                  <ul>
                    <li>يجب أن يكون عمر المستخدم 18 عاماً على الأقل لاستخدام التطبيق</li>
                    <li>يجب تقديم معلومات صحيحة ودقيقة عند التسجيل</li>
                    <li>يحق لنا رفض أو إلغاء أي حساب في أي وقت</li>
                  </ul>

                  <h2>4. استخدام التطبيق</h2>
                  <ul>
                    <li>يلتزم المستخدم باستخدام التطبيق للأغراض المشروعة فقط</li>
                    <li>يُمنع استخدام التطبيق لأي نشاط غير قانوني أو احتيالي</li>
                    <li>يحظر نشر محتوى مسيء أو غير لائق</li>
                    <li>يجب الحفاظ على سرية بيانات الحساب</li>
                  </ul>

                  <h2>5. الخدمات والأسعار</h2>
                  <ul>
                    <li>الأسعار المعروضة هي أسعار تقديرية وقد تتغير بناءً على الفحص الفعلي</li>
                    <li>يتم الاتفاق على السعر النهائي بين العميل والفني قبل بدء العمل</li>
                    <li>جميع الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة</li>
                  </ul>

                  <h2>6. الدفع</h2>
                  <ul>
                    <li>يتم الدفع مباشرة للفني بعد إتمام الخدمة</li>
                    <li>طرق الدفع المتاحة: نقداً، بطاقة ائتمانية، تحويل بنكي</li>
                    <li>لا نتحمل مسؤولية النزاعات المالية بين العميل والفني</li>
                  </ul>

                  <h2>7. الإلغاء والاسترجاع</h2>
                  <ul>
                    <li>يمكن إلغاء الطلب قبل قبول الفني له دون رسوم</li>
                    <li>بعد قبول الطلب، قد تطبق رسوم إلغاء</li>
                    <li>لا يمكن استرجاع المبالغ بعد إتمام الخدمة إلا في حالات خاصة</li>
                  </ul>

                  <h2>8. مسؤوليات الفني</h2>
                  <ul>
                    <li>يجب أن يكون الفني مؤهلاً ومرخصاً لتقديم الخدمات</li>
                    <li>الالتزام بمعايير الجودة والاحترافية</li>
                    <li>احترام خصوصية العميل وممتلكاته</li>
                    <li>تقديم ضمان على الإصلاحات المنفذة</li>
                  </ul>

                  <h2>9. مسؤوليات العميل</h2>
                  <ul>
                    <li>تقديم معلومات دقيقة عن الجهاز والمشكلة</li>
                    <li>التواجد في الموقع المحدد في الوقت المتفق عليه</li>
                    <li>الدفع للفني بعد إتمام الخدمة</li>
                    <li>عدم التلاعب بالجهاز قبل وصول الفني</li>
                  </ul>

                  <h2>10. الضمان</h2>
                  <ul>
                    <li>يقدم الفني ضماناً على الإصلاحات حسب نوع الخدمة</li>
                    <li>مدة الضمان تتراوح من 7 إلى 90 يوماً</li>
                    <li>الضمان لا يشمل الأضرار الناتجة عن سوء الاستخدام</li>
                  </ul>

                  <h2>11. المسؤولية</h2>
                  <ul>
                    <li>التطبيق منصة وساطة فقط بين العملاء والفنيين</li>
                    <li>لا نتحمل مسؤولية جودة الخدمات المقدمة</li>
                    <li>لا نتحمل مسؤولية أي أضرار ناتجة عن استخدام التطبيق</li>
                  </ul>

                  <h2>12. الخصوصية</h2>
                  <p>نحترم خصوصية المستخدمين ونحمي بياناتهم. يرجى مراجعة <Link href="/privacy" className="text-primary hover:underline">سياسة الخصوصية</Link> للمزيد من التفاصيل.</p>

                  <h2>13. الملكية الفكرية</h2>
                  <ul>
                    <li>جميع حقوق الملكية الفكرية للتطبيق محفوظة</li>
                    <li>يُمنع نسخ أو تعديل أو توزيع محتوى التطبيق</li>
                    <li>الشعارات والعلامات التجارية مملوكة لنا</li>
                  </ul>

                  <h2>14. التعديلات</h2>
                  <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعار المستخدمين بأي تغييرات جوهرية. استمرار استخدام التطبيق يعني الموافقة على التعديلات.</p>

                  <h2>15. إنهاء الحساب</h2>
                  <ul>
                    <li>يمكن للمستخدم إنهاء حسابه في أي وقت</li>
                    <li>نحتفظ بالحق في تعليق أو إنهاء أي حساب يخالف الشروط</li>
                    <li>عند إنهاء الحساب، تُحذف البيانات الشخصية</li>
                  </ul>

                  <h2>16. القانون الساري</h2>
                  <p>تخضع هذه الشروط لقوانين المملكة العربية السعودية. تُحل النزاعات ودياً أو عبر المحاكم السعودية. اللغة العربية هي اللغة المعتمدة لتفسير الشروط.</p>

                  <h2>17. الاتصال بنا</h2>
                  <p>إذا كان لديك أي استفسارات حول هذه الشروط:</p>
                  <ul>
                    <li>البريد الإلكتروني: fixate01@gmail.com</li>
                    <li>الهاتف: +966 54 894 0042</li>
                    <li>العنوان: الرياض، المملكة العربية السعودية</li>
                  </ul>

                  <p className="font-bold mt-8">بقبولك لهذه الشروط، فإنك تقر بأنك قرأتها وفهمتها ووافقت عليها.</p>
                </>
              ) : (
                <>
                  <h2>1. Introduction</h2>
                  <p>Welcome to Fixate ("the App"). By using this App, you agree to comply with these Terms and Conditions. Please read them carefully before using our services.</p>

                  <h2>2. Definitions</h2>
                  <ul>
                    <li><strong>User</strong>: Any person using the App, whether customer or technician</li>
                    <li><strong>Customer</strong>: User requesting repair services</li>
                    <li><strong>Technician</strong>: Service provider registered in the App</li>
                    <li><strong>Service</strong>: Electronic device repair services provided through the App</li>
                    <li><strong>Order</strong>: Service request submitted by the customer</li>
                  </ul>

                  <h2>3. Eligibility</h2>
                  <ul>
                    <li>Users must be at least 18 years old to use the App</li>
                    <li>Accurate information must be provided during registration</li>
                    <li>We reserve the right to refuse or cancel any account at any time</li>
                  </ul>

                  <h2>4. Use of the App</h2>
                  <ul>
                    <li>Users must use the App for lawful purposes only</li>
                    <li>Using the App for illegal or fraudulent activities is prohibited</li>
                    <li>Posting offensive or inappropriate content is forbidden</li>
                    <li>Account credentials must be kept confidential</li>
                  </ul>

                  <h2>5. Services and Pricing</h2>
                  <ul>
                    <li>Displayed prices are estimates and may change based on actual inspection</li>
                    <li>Final price is agreed upon between customer and technician before work begins</li>
                    <li>All prices are in Saudi Riyals and include VAT</li>
                  </ul>

                  <h2>6. Payment</h2>
                  <ul>
                    <li>Payment is made directly to the technician after service completion</li>
                    <li>Available payment methods: cash, credit card, bank transfer</li>
                    <li>We are not responsible for financial disputes between customer and technician</li>
                  </ul>

                  <h2>7. Cancellation and Refunds</h2>
                  <ul>
                    <li>Orders can be cancelled before technician acceptance without fees</li>
                    <li>After order acceptance, cancellation fees may apply</li>
                    <li>Refunds after service completion are only available in special cases</li>
                  </ul>

                  <h2>8. Technician Responsibilities</h2>
                  <ul>
                    <li>Technicians must be qualified and licensed to provide services</li>
                    <li>Commitment to quality and professional standards</li>
                    <li>Respect customer privacy and property</li>
                    <li>Provide warranty on completed repairs</li>
                  </ul>

                  <h2>9. Customer Responsibilities</h2>
                  <ul>
                    <li>Provide accurate information about device and issue</li>
                    <li>Be present at specified location at agreed time</li>
                    <li>Pay technician after service completion</li>
                    <li>Do not tamper with device before technician arrival</li>
                  </ul>

                  <h2>10. Warranty</h2>
                  <ul>
                    <li>Technicians provide warranty on repairs based on service type</li>
                    <li>Warranty period ranges from 7 to 90 days</li>
                    <li>Warranty does not cover damage from misuse</li>
                  </ul>

                  <h2>11. Liability</h2>
                  <ul>
                    <li>The App is a platform connecting customers and technicians only</li>
                    <li>We are not responsible for quality of services provided</li>
                    <li>We are not liable for any damages resulting from App use</li>
                  </ul>

                  <h2>12. Privacy</h2>
                  <p>We respect user privacy and protect their data. Please review our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for more details.</p>

                  <h2>13. Intellectual Property</h2>
                  <ul>
                    <li>All intellectual property rights for the App are reserved</li>
                    <li>Copying, modifying, or distributing App content is prohibited</li>
                    <li>Logos and trademarks are our property</li>
                  </ul>

                  <h2>14. Amendments</h2>
                  <p>We reserve the right to modify these terms at any time. Users will be notified of any material changes. Continued use of the App means acceptance of the amendments.</p>

                  <h2>15. Account Termination</h2>
                  <ul>
                    <li>Users can terminate their account at any time</li>
                    <li>We reserve the right to suspend or terminate any account violating terms</li>
                    <li>Upon account termination, personal data is deleted</li>
                  </ul>

                  <h2>16. Governing Law</h2>
                  <p>These terms are governed by the laws of Saudi Arabia. Disputes are resolved amicably or through Saudi courts. Arabic is the authoritative language for interpreting these terms.</p>

                  <h2>17. Contact Us</h2>
                  <p>If you have any questions about these terms:</p>
                  <ul>
                    <li>Email: fixate01@gmail.com</li>
                    <li>Phone: +966 54 894 0042</li>
                    <li>Address: Riyadh, Saudi Arabia</li>
                  </ul>

                  <p className="font-bold mt-8">By accepting these terms, you acknowledge that you have read, understood, and agreed to them.</p>
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
