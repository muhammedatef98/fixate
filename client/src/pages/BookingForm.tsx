import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Smartphone, Laptop, Tablet, Watch, Check, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import Logo from "@/components/Logo";

const DEVICE_TYPES = [
  { id: 'phone', nameAr: 'جوال', nameEn: 'Phone', icon: Smartphone },
  { id: 'tablet', nameAr: 'تابلت', nameEn: 'Tablet', icon: Tablet },
  { id: 'laptop', nameAr: 'لابتوب', nameEn: 'Laptop', icon: Laptop },
  { id: 'watch', nameAr: 'ساعة ذكية', nameEn: 'Smart Watch', icon: Watch },
];

const BRANDS = {
  phone: ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Oppo', 'Vivo', 'OnePlus', 'Google'],
  tablet: ['Apple iPad', 'Samsung Galaxy Tab', 'Huawei MatePad', 'Lenovo Tab'],
  laptop: ['Apple MacBook', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI'],
  watch: ['Apple Watch', 'Samsung Galaxy Watch', 'Huawei Watch', 'Amazfit']
};

const MODELS: Record<string, Record<string, string[]>> = {
  'Apple': {
    phone: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14', 'iPhone 13'],
    tablet: ['iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad Mini'],
    laptop: ['MacBook Pro 16"', 'MacBook Pro 14"', 'MacBook Air M2', 'MacBook Air M1'],
    watch: ['Apple Watch Ultra', 'Apple Watch Series 9', 'Apple Watch SE']
  },
  'Samsung': {
    phone: ['Galaxy S24 Ultra', 'Galaxy S23', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5'],
    tablet: ['Galaxy Tab S9', 'Galaxy Tab A8'],
    watch: ['Galaxy Watch 6']
  }
};

const ISSUES = [
  { id: 'screen', nameAr: 'كسر الشاشة', nameEn: 'Broken Screen', price: '350 ر.س' },
  { id: 'battery', nameAr: 'تغيير بطارية', nameEn: 'Battery Replacement', price: '150 ر.س' },
  { id: 'charging', nameAr: 'مشكلة شحن', nameEn: 'Charging Issue', price: '120 ر.س' },
  { id: 'camera', nameAr: 'الكاميرا', nameEn: 'Camera', price: '200 ر.س' },
  { id: 'water', nameAr: 'تلف مياه', nameEn: 'Water Damage', price: 'فحص' },
  { id: 'software', nameAr: 'سوفتوير', nameEn: 'Software', price: '100 ر.س' },
  { id: 'other', nameAr: 'أخرى', nameEn: 'Other', price: 'فحص' },
];

export default function BookingForm() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form State
  const [deviceType, setDeviceType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const content = {
    ar: {
      title: 'احجز خدمة الإصلاح',
      subtitle: 'خطوات بسيطة للحصول على خدمة احترافية',
      steps: ['نوع الجهاز', 'الماركة', 'الموديل', 'العطل', 'التفاصيل', 'معلومات التواصل'],
      deviceTypeTitle: 'اختر نوع الجهاز',
      brandTitle: 'اختر الماركة',
      modelTitle: 'اختر الموديل',
      issueTitle: 'نوع العطل',
      detailsTitle: 'وصف المشكلة',
      contactTitle: 'معلومات التواصل',
      descriptionPlaceholder: 'اشرح المشكلة بالتفصيل...',
      name: 'الاسم الكامل',
      namePlaceholder: 'أحمد محمد',
      phone: 'رقم الجوال',
      phonePlaceholder: '+966501234567',
      address: 'العنوان',
      addressPlaceholder: 'الشارع، الحي',
      city: 'المدينة',
      cityPlaceholder: 'الرياض',
      next: 'التالي',
      back: 'رجوع',
      submit: 'إرسال الطلب',
      success: 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً',
      error: 'حدث خطأ، الرجاء المحاولة مرة أخرى',
      fillAllFields: 'الرجاء ملء جميع الحقول'
    },
    en: {
      title: 'Book Repair Service',
      subtitle: 'Simple steps to get professional service',
      steps: ['Device Type', 'Brand', 'Model', 'Issue', 'Details', 'Contact Info'],
      deviceTypeTitle: 'Choose Device Type',
      brandTitle: 'Choose Brand',
      modelTitle: 'Choose Model',
      issueTitle: 'Issue Type',
      detailsTitle: 'Problem Description',
      contactTitle: 'Contact Information',
      descriptionPlaceholder: 'Describe the problem in detail...',
      name: 'Full Name',
      namePlaceholder: 'Ahmed Mohammed',
      phone: 'Phone Number',
      phonePlaceholder: '+966501234567',
      address: 'Address',
      addressPlaceholder: 'Street, District',
      city: 'City',
      cityPlaceholder: 'Riyadh',
      next: 'Next',
      back: 'Back',
      submit: 'Submit Request',
      success: 'Request submitted successfully! We will contact you soon',
      error: 'An error occurred, please try again',
      fillAllFields: 'Please fill all fields'
    }
  };

  const t = content[language as keyof typeof content];

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 0 && !deviceType) {
      toast.error(t.fillAllFields);
      return;
    }
    if (currentStep === 1 && !brand) {
      toast.error(t.fillAllFields);
      return;
    }
    if (currentStep === 2 && !model) {
      toast.error(t.fillAllFields);
      return;
    }
    if (currentStep === 3 && !issue) {
      toast.error(t.fillAllFields);
      return;
    }
    if (currentStep === 4 && !description) {
      toast.error(t.fillAllFields);
      return;
    }
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setLocation('/');
    }
  };

  const handleSubmit = async () => {
    if (!name || !phone || !address || !city) {
      toast.error(t.fillAllFields);
      return;
    }

    try {
      const selectedIssue = ISSUES.find(i => i.id === issue);
      
      // Send email notification
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd3ff12a4-e013-473f-8730-9d5760059a64',
          subject: `🔔 حجز جديد من الموقع - Fixate`,
          from_name: 'Fixate Website',
          to: 'fixate01@gmail.com',
          message: `
🆕 حجز جديد من الموقع!

👤 العميل: ${name}
📞 الجوال: ${phone}

📱 الجهاز: ${brand} ${model} (${deviceType})
⚠️ المشكلة: ${language === 'ar' ? selectedIssue?.nameAr : selectedIssue?.nameEn}
📝 التفاصيل: ${description}

📍 الموقع: ${address}, ${city}
💰 السعر التقديري: ${selectedIssue?.price}

⏰ التاريخ: ${new Date().toLocaleString('ar-SA')}
          `.trim(),
        }),
      });

      toast.success(t.success);
      setLocation('/technicians');
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error(t.error);
    }
  };

  const selectedIssueData = ISSUES.find(i => i.id === issue);
  const availableModels = brand && MODELS[brand] ? MODELS[brand][deviceType] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <Button variant="ghost" onClick={() => setLocation('/')}>
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
              {t.title}
            </h1>
            <p className="text-muted-foreground">
              {t.subtitle}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {t.steps.map((_, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                    index === currentStep
                      ? 'bg-emerald-600 text-white scale-110'
                      : index < currentStep
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < t.steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-1 transition-all ${
                      index < currentStep ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {t.steps.map((step, index) => (
                <div key={index} className="flex-1 text-center">
                  <p className={`text-xs font-medium ${
                    index <= currentStep ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800">
            <CardContent className="p-6 md:p-8">
              {/* Step 0: Device Type */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-emerald-600">{t.deviceTypeTitle}</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {DEVICE_TYPES.map((device) => {
                      const Icon = device.icon;
                      return (
                        <button
                          key={device.id}
                          onClick={() => setDeviceType(device.id)}
                          className={`p-6 border-2 rounded-xl transition-all hover:scale-105 ${
                            deviceType === device.id
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                          }`}
                        >
                          <Icon className={`w-12 h-12 mx-auto mb-3 ${
                            deviceType === device.id ? 'text-emerald-600' : 'text-gray-400'
                          }`} />
                          <p className="font-semibold text-center">
                            {language === 'ar' ? device.nameAr : device.nameEn}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 1: Brand */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-emerald-600">{t.brandTitle}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {BRANDS[deviceType as keyof typeof BRANDS]?.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBrand(b)}
                        className={`p-4 border-2 rounded-lg transition-all hover:scale-105 ${
                          brand === b
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'
                            : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                        }`}
                      >
                        <p className="font-semibold text-center">{b}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Model */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-emerald-600">{t.modelTitle}</Label>
                  {availableModels.length > 0 ? (
                    <div className="grid gap-3">
                      {availableModels.map((m) => (
                        <button
                          key={m}
                          onClick={() => setModel(m)}
                          className={`p-4 border-2 rounded-lg transition-all hover:scale-105 text-right ${
                            model === m
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'
                              : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                          }`}
                        >
                          <p className="font-semibold">{m}</p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <Input
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder={language === 'ar' ? 'أدخل الموديل' : 'Enter model'}
                      className="h-12"
                    />
                  )}
                </div>
              )}

              {/* Step 3: Issue */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-emerald-600">{t.issueTitle}</Label>
                  <div className="grid gap-3">
                    {ISSUES.map((iss) => (
                      <button
                        key={iss.id}
                        onClick={() => setIssue(iss.id)}
                        className={`p-4 border-2 rounded-lg transition-all hover:scale-105 ${
                          issue === iss.id
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className={`font-semibold ${issue === iss.id ? 'text-emerald-600' : ''}`}>
                            {language === 'ar' ? iss.nameAr : iss.nameEn}
                          </p>
                          <span className={`text-sm font-bold ${issue === iss.id ? 'text-emerald-600' : 'text-gray-500'}`}>
                            {iss.price}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Description */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-emerald-600">{t.detailsTitle}</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t.descriptionPlaceholder}
                    rows={6}
                    className="resize-none"
                  />
                  {selectedIssueData && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                      <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        {language === 'ar' ? 'السعر التقديري: ' : 'Estimated Price: '}
                        <span className="text-lg">{selectedIssueData.price}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Contact Info */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-emerald-600 mb-4 block">{t.contactTitle}</Label>
                  
                  <div className="space-y-2">
                    <Label>{t.name}</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.phone}</Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      type="tel"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.address}</Label>
                    <Input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t.addressPlaceholder}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.city}</Label>
                    <Input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t.cityPlaceholder}
                      className="h-12"
                    />
                  </div>

                  {/* Summary */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <h4 className="font-semibold mb-3 text-emerald-600">{language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">{language === 'ar' ? 'الجهاز:' : 'Device:'}</span> {brand} {model}</p>
                      <p><span className="font-medium">{language === 'ar' ? 'المشكلة:' : 'Issue:'}</span> {language === 'ar' ? selectedIssueData?.nameAr : selectedIssueData?.nameEn}</p>
                      <p><span className="font-medium">{language === 'ar' ? 'السعر:' : 'Price:'}</span> {selectedIssueData?.price}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12"
                >
                  {language === 'ar' ? <ChevronRight className="mr-2" /> : <ChevronLeft className="ml-2" />}
                  {t.back}
                </Button>
                {currentStep < 5 ? (
                  <Button
                    onClick={handleNext}
                    className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700"
                  >
                    {t.next}
                    {language === 'ar' ? <ChevronLeft className="ml-2" /> : <ChevronRight className="mr-2" />}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700"
                  >
                    {t.submit}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
