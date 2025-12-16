import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Smartphone, Laptop, Tablet, Watch, Truck, Wrench, Check } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import Logo from "@/components/Logo";

const SERVICE_TYPES = [
  {
    id: 'mobile',
    nameAr: 'فني متنقل',
    nameEn: 'Mobile Technician',
    descriptionAr: 'يأتي الفني إلى موقعك ويصلح الجهاز في المكان',
    descriptionEn: 'Technician comes to your location and fixes on-site',
    icon: Wrench
  },
  {
    id: 'pickup',
    nameAr: 'استلام وتوصيل',
    nameEn: 'Pickup & Delivery',
    descriptionAr: 'نستلم جهازك ونوصله لمحل متعاقد ونرجعه بعد الإصلاح',
    descriptionEn: 'We pickup your device, deliver to partner shop, and return after repair',
    icon: Truck
  },
];

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

const ISSUES = [
  { id: 'screen', nameAr: 'شاشة مكسورة', nameEn: 'Broken Screen', price: 300 },
  { id: 'battery', nameAr: 'بطارية ضعيفة', nameEn: 'Weak Battery', price: 200 },
  { id: 'charging', nameAr: 'مشكلة شحن', nameEn: 'Charging Issue', price: 150 },
  { id: 'camera', nameAr: 'كاميرا لا تعمل', nameEn: 'Camera Not Working', price: 250 },
  { id: 'audio', nameAr: 'مشكلة صوت', nameEn: 'Audio Issue', price: 180 },
  { id: 'software', nameAr: 'مشكلة برمجية', nameEn: 'Software Issue', price: 100 },
  { id: 'water', nameAr: 'تلف مياه', nameEn: 'Water Damage', price: 400 },
  { id: 'other', nameAr: 'أخرى', nameEn: 'Other', price: 0 },
];

export default function BookingForm() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form State
  const [serviceType, setServiceType] = useState('mobile');
  const [deviceType, setDeviceType] = useState('phone');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const content = {
    ar: {
      title: 'احجز خدمة إصلاح',
      subtitle: 'املأ النموذج وسنتواصل معك قريباً',
      steps: ['نوع الخدمة', 'نوع الجهاز', 'التفاصيل', 'المعلومات'],
      serviceTypeTitle: 'اختر نوع الخدمة',
      deviceTypeTitle: 'اختر نوع الجهاز',
      detailsTitle: 'تفاصيل الجهاز والعطل',
      infoTitle: 'معلومات التواصل',
      brand: 'الماركة',
      brandPlaceholder: 'مثال: Apple',
      model: 'الموديل',
      modelPlaceholder: 'مثال: iPhone 15 Pro',
      issue: 'نوع العطل',
      issuePlaceholder: 'اختر نوع العطل',
      description: 'وصف المشكلة',
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
      estimatedPrice: 'السعر التقديري',
      sar: 'ريال',
      success: 'تم إرسال طلبك بنجاح!',
      error: 'حدث خطأ، الرجاء المحاولة مرة أخرى',
    },
    en: {
      title: 'Book Repair Service',
      subtitle: 'Fill the form and we will contact you soon',
      steps: ['Service Type', 'Device Type', 'Details', 'Information'],
      serviceTypeTitle: 'Choose Service Type',
      deviceTypeTitle: 'Choose Device Type',
      detailsTitle: 'Device and Issue Details',
      infoTitle: 'Contact Information',
      brand: 'Brand',
      brandPlaceholder: 'e.g., Apple',
      model: 'Model',
      modelPlaceholder: 'e.g., iPhone 15 Pro',
      issue: 'Issue Type',
      issuePlaceholder: 'Select issue type',
      description: 'Problem Description',
      descriptionPlaceholder: 'Explain the problem in detail...',
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
      estimatedPrice: 'Estimated Price',
      sar: 'SAR',
      success: 'Your request has been submitted successfully!',
      error: 'An error occurred, please try again',
    }
  };

  const t = content[language as keyof typeof content];

  const handleNext = () => {
    if (currentStep === 2 && (!brand || !model || !issue)) {
      toast.error(language === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields');
      return;
    }
    if (currentStep < 3) {
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
      toast.error(language === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    try {
      const selectedIssue = ISSUES.find(i => i.id === issue);
      const serviceTypeLabel = SERVICE_TYPES.find(s => s.id === serviceType);
      
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

🔧 نوع الخدمة: ${language === 'ar' ? serviceTypeLabel?.nameAr : serviceTypeLabel?.nameEn}
📱 الجهاز: ${brand} ${model}
⚠️ المشكلة: ${language === 'ar' ? selectedIssue?.nameAr : selectedIssue?.nameEn}
📝 التفاصيل: ${description}

📍 الموقع: ${address}, ${city}
💰 السعر التقديري: ${selectedIssue?.price} ريال

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

  const selectedIssue = ISSUES.find(i => i.id === issue);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
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
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {t.steps.map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    index <= currentStep
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground/30 text-muted-foreground'
                  }`}>
                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < t.steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-all ${
                      index < currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {t.steps.map((step, index) => (
                <div key={index} className="flex-1 text-center">
                  <p className={`text-xs md:text-sm font-medium ${
                    index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">{t.title}</CardTitle>
              <CardDescription>{t.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 0: Service Type */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t.serviceTypeTitle}</h3>
                  <div className="grid gap-4">
                    {SERVICE_TYPES.map((service) => {
                      const Icon = service.icon;
                      return (
                        <button
                          key={service.id}
                          onClick={() => setServiceType(service.id)}
                          className={`p-6 border-2 rounded-xl text-left transition-all ${
                            serviceType === service.id
                              ? 'border-primary bg-primary/5'
                              : 'border-muted hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${
                              serviceType === service.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-1">
                                {language === 'ar' ? service.nameAr : service.nameEn}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {language === 'ar' ? service.descriptionAr : service.descriptionEn}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 1: Device Type */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t.deviceTypeTitle}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {DEVICE_TYPES.map((device) => {
                      const Icon = device.icon;
                      return (
                        <button
                          key={device.id}
                          onClick={() => setDeviceType(device.id)}
                          className={`p-6 border-2 rounded-xl transition-all ${
                            deviceType === device.id
                              ? 'border-primary bg-primary/5'
                              : 'border-muted hover:border-primary/50'
                          }`}
                        >
                          <Icon className={`w-12 h-12 mx-auto mb-3 ${
                            deviceType === device.id ? 'text-primary' : 'text-muted-foreground'
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

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">{t.detailsTitle}</h3>
                  
                  <div className="space-y-2">
                    <Label>{t.brand}</Label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full h-11 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="">{t.brandPlaceholder}</option>
                      {BRANDS[deviceType as keyof typeof BRANDS].map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t.model}</Label>
                    <Input
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder={t.modelPlaceholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.issue}</Label>
                    <select
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      className="w-full h-11 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="">{t.issuePlaceholder}</option>
                      {ISSUES.map((iss) => (
                        <option key={iss.id} value={iss.id}>
                          {language === 'ar' ? iss.nameAr : iss.nameEn} - {iss.price} {t.sar}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedIssue && (
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm font-semibold">
                        {t.estimatedPrice}: <span className="text-primary text-lg">{selectedIssue.price} {t.sar}</span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>{t.description}</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t.descriptionPlaceholder}
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">{t.infoTitle}</h3>
                  
                  <div className="space-y-2">
                    <Label>{t.name}</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.phone}</Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      type="tel"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.city}</Label>
                    <Input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t.cityPlaceholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.address}</Label>
                    <Textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t.addressPlaceholder}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  {language === 'ar' ? <ChevronRight className="w-4 h-4 mr-2" /> : <ChevronLeft className="w-4 h-4 mr-2" />}
                  {t.back}
                </Button>
                {currentStep < 3 ? (
                  <Button onClick={handleNext} className="flex-1">
                    {t.next}
                    {language === 'ar' ? <ChevronLeft className="w-4 h-4 ml-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="flex-1">
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
