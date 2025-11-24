import { Building2, Target, Users, Award, Shield, Clock } from "lucide-react";
import { APP_TITLE } from "@/const";
import SEO from "@/components/SEO";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO
        title="من نحن"
        description="تعرف على Fixate - منصة رائدة في مجال صيانة الأجهزة الإلكترونية في السعودية. رؤيتنا، رسالتنا، وقيمنا في تقديم خدمات صيانة موثوقة واحترافية."
        canonical="https://fixate.sa/about"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">من نحن</h1>
            <p className="text-xl text-blue-100">
              نحن منصة رائدة في مجال صيانة الأجهزة الإلكترونية في السعودية والدول العربية
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">رؤيتنا</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                أن نكون المنصة الأولى والأكثر موثوقية في مجال صيانة الأجهزة الإلكترونية في الوطن العربي، 
                من خلال تقديم خدمات عالية الجودة وتجربة عملاء استثنائية.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">رسالتنا</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                نسعى لتوفير حلول صيانة سريعة وموثوقة لجميع أنواع الأجهزة الإلكترونية، 
                مع ضمان رضا العملاء من خلال فريق فنيين محترفين وأسعار تنافسية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">قيمنا</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نؤمن بمجموعة من القيم الأساسية التي توجه عملنا وتضمن تقديم أفضل الخدمات
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">الموثوقية</h3>
              <p className="text-gray-600">
                نضمن جودة الخدمة ونلتزم بمواعيدنا مع العملاء
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">الاحترافية</h3>
              <p className="text-gray-600">
                فريق من الفنيين المعتمدين والمدربين على أعلى مستوى
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="inline-flex p-4 bg-purple-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">السرعة</h3>
              <p className="text-gray-600">
                نوفر خدمة سريعة دون التأثير على جودة الإصلاح
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">لماذا تختار {APP_TITLE}؟</h2>
              <p className="text-gray-600">
                نقدم مجموعة من المزايا التي تجعلنا الخيار الأمثل لصيانة أجهزتك
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">ضمان على جميع الخدمات</h3>
                  <p className="text-gray-600 text-sm">
                    نوفر ضمان يصل إلى 6 أشهر على جميع خدمات الصيانة
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">أسعار تنافسية</h3>
                  <p className="text-gray-600 text-sm">
                    أفضل الأسعار في السوق مع الحفاظ على جودة الخدمة
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">خدمة منزلية</h3>
                  <p className="text-gray-600 text-sm">
                    نأتي إليك أينما كنت لتوفير الوقت والجهد
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">دعم فني 24/7</h3>
                  <p className="text-gray-600 text-sm">
                    فريق الدعم متاح على مدار الساعة للإجابة على استفساراتك
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">جاهز لإصلاح جهازك؟</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            احجز خدمة الصيانة الآن واحصل على خصم 20% على أول خدمة إصلاح
          </p>
          <a
            href="/service-request"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors"
          >
            احجز الآن ←
          </a>
        </div>
      </section>
    </div>
  );
}
