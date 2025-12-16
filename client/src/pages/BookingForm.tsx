import { useState, useEffect } from "react";
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
import { trpc } from "@/lib/trpc";

export default function BookingForm() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form State
  const [deviceTypeId, setDeviceTypeId] = useState<number | null>(null);
  const [deviceModelId, setDeviceModelId] = useState<number | null>(null);
  const [serviceTypeId, setServiceTypeId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  // Fetch data from APIs
  const { data: deviceTypes = [], isLoading: loadingDeviceTypes } = trpc.devices.getTypes.useQuery();
  const { data: deviceModels = [], isLoading: loadingModels } = trpc.devices.getModels.useQuery(
    { deviceTypeId: deviceTypeId! },
    { enabled: !!deviceTypeId }
  );
  const { data: serviceTypes = [], isLoading: loadingServices } = trpc.services.getTypes.useQuery();

  const content = {
    ar: {
      title: 'احجز خدمة الإصلاح',
      subtitle: 'خطوات بسيطة للحصول على خدمة احترافية',
      steps: ['نوع الجهاز', 'الموديل', 'العطل', 'التفاصيل', 'معلومات التواصل'],
      deviceTypeTitle: 'اختر نوع الجهاز',
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
      summary: 'ملخص الطلب',
      device: 'الجهاز',
      service: 'الخدمة',
      location: 'الموقع',
      contact: 'التواصل',
      success: 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً',
      error: 'حدث خطأ، الرجاء المحاولة مرة أخرى',
      fillAllFields: 'الرجاء ملء جميع الحقول',
      loading: 'جاري التحميل...'
    },
    en: {
      title: 'Book Repair Service',
      subtitle: 'Simple steps to get professional service',
      steps: ['Device Type', 'Model', 'Issue', 'Details', 'Contact Info'],
      deviceTypeTitle: 'Choose Device Type',
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
      summary: 'Order Summary',
      device: 'Device',
      service: 'Service',
      location: 'Location',
      contact: 'Contact',
      success: 'Your request has been submitted successfully! We will contact you soon',
      error: 'An error occurred, please try again',
      fillAllFields: 'Please fill all fields',
      loading: 'Loading...'
    }
  };

  const t = content[language];

  const handleNext = () => {
    if (currentStep === 0 && !deviceTypeId) {
      toast.error(t.fillAllFields);
      return;
    }
    if (currentStep === 1 && !deviceModelId) {
      toast.error(t.fillAllFields);
      return;
    }
    if (currentStep === 2 && !serviceTypeId) {
      toast.error(t.fillAllFields);
      return;
    }
    if (currentStep === 3 && !description.trim()) {
      toast.error(t.fillAllFields);
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      toast.error(t.fillAllFields);
      return;
    }

    try {
      // Here you would call the API to submit the booking
      toast.success(t.success);
      setTimeout(() => setLocation('/'), 2000);
    } catch (error) {
      toast.error(t.error);
    }
  };

  const selectedDeviceType = deviceTypes.find(dt => dt.id === deviceTypeId);
  const selectedModel = deviceModels.find(dm => dm.id === deviceModelId);
  const selectedService = serviceTypes.find(st => st.id === serviceTypeId);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'phone': return Smartphone;
      case 'tablet': return Tablet;
      case 'laptop': return Laptop;
      default: return Watch;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {t.steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    index <= currentStep 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={`text-xs mt-2 text-center ${
                    index <= currentStep ? 'text-emerald-600 font-semibold' : 'text-gray-500'
                  }`}>
                    {step}
                  </span>
                </div>
                {index < t.steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 transition-all ${
                    index < currentStep ? 'bg-emerald-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-2xl border-0">
          <CardContent className="p-8">
            {/* Step 0: Device Type */}
            {currentStep === 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.deviceTypeTitle}</h2>
                {loadingDeviceTypes ? (
                  <div className="text-center py-8 text-gray-500">{t.loading}</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {deviceTypes.map((type) => {
                      const Icon = getCategoryIcon(type.category);
                      return (
                        <button
                          key={type.id}
                          onClick={() => {
                            setDeviceTypeId(type.id);
                            setDeviceModelId(null);
                          }}
                          className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                            deviceTypeId === type.id
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <Icon className={`w-12 h-12 mx-auto mb-3 ${
                            deviceTypeId === type.id ? 'text-emerald-600' : 'text-gray-600'
                          }`} />
                          <p className="font-semibold text-gray-900">
                            {language === 'ar' ? type.nameAr : type.nameEn}
                          </p>
                          <p className="text-sm text-gray-500">{type.brand}</p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Model */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.modelTitle}</h2>
                {loadingModels ? (
                  <div className="text-center py-8 text-gray-500">{t.loading}</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {deviceModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setDeviceModelId(model.id)}
                        className={`p-4 rounded-xl border-2 text-right transition-all hover:scale-105 ${
                          deviceModelId === model.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <p className="font-semibold text-gray-900">
                          {language === 'ar' ? model.modelNameAr : model.modelNameEn}
                        </p>
                        {model.releaseYear && (
                          <p className="text-sm text-gray-500">{model.releaseYear}</p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Issue */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.issueTitle}</h2>
                {loadingServices ? (
                  <div className="text-center py-8 text-gray-500">{t.loading}</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceTypes.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setServiceTypeId(service.id)}
                        className={`p-4 rounded-xl border-2 text-right transition-all hover:scale-105 ${
                          serviceTypeId === service.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <p className="font-semibold text-gray-900">
                          {language === 'ar' ? service.nameAr : service.nameEn}
                        </p>
                        {service.descriptionAr && (
                          <p className="text-sm text-gray-500 mt-1">
                            {language === 'ar' ? service.descriptionAr : service.descriptionEn}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Details */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.detailsTitle}</h2>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t.descriptionPlaceholder}
                  className="min-h-[200px] text-lg"
                />
              </div>
            )}

            {/* Step 4: Contact Info & Summary */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.contactTitle}</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">{t.name}</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t.phone}</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">{t.address}</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder={t.addressPlaceholder}
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">{t.city}</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={t.cityPlaceholder}
                        className="text-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-emerald-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.summary}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.device}:</span>
                      <span className="font-semibold">
                        {selectedDeviceType && (language === 'ar' ? selectedDeviceType.nameAr : selectedDeviceType.nameEn)}
                        {' - '}
                        {selectedModel && (language === 'ar' ? selectedModel.modelNameAr : selectedModel.modelNameEn)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.service}:</span>
                      <span className="font-semibold">
                        {selectedService && (language === 'ar' ? selectedService.nameAr : selectedService.nameEn)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.location}:</span>
                      <span className="font-semibold">{city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.contact}:</span>
                      <span className="font-semibold">{phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  {language === 'ar' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                  {t.back}
                </Button>
              )}
              
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 mr-auto flex items-center gap-2"
                >
                  {t.next}
                  {language === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 mr-auto"
                >
                  {t.submit}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
