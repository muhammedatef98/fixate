import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl, isOAuthAvailable } from "@/const";
import { Loader2, CheckCircle2, MapPin, Smartphone, Laptop, Tablet, ChevronLeft, ArrowRight, Clock, DollarSign } from "lucide-react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const brands = [
  { id: 'apple', nameAr: 'آبل', nameEn: 'Apple', logo: '/brands/apple.png?v=2' },
  { id: 'samsung', nameAr: 'سامسونج', nameEn: 'Samsung', logo: '/brands/samsung.png?v=2' },
  { id: 'huawei', nameAr: 'هواوي', nameEn: 'Huawei', logo: '/brands/huawei.png?v=2' },
  { id: 'dell', nameAr: 'ديل', nameEn: 'Dell', logo: '/brands/dell.png?v=2' },
  { id: 'hp', nameAr: 'إتش بي', nameEn: 'HP', logo: '/brands/hp.png?v=2' },
  { id: 'lenovo', nameAr: 'لينوفو', nameEn: 'Lenovo', logo: '/brands/lenovo.png?v=2' },
];

const mockModels = [
  { id: 1, modelName: 'iPhone 16 Pro Max', deviceTypeId: 1, brandId: 'apple' },
  { id: 2, modelName: 'iPhone 16 Pro', deviceTypeId: 1, brandId: 'apple' },
  { id: 3, modelName: 'iPhone 16', deviceTypeId: 1, brandId: 'apple' },
  { id: 4, modelName: 'iPhone 15 Pro Max', deviceTypeId: 1, brandId: 'apple' },
  { id: 5, modelName: 'iPhone 15', deviceTypeId: 1, brandId: 'apple' },
  { id: 6, modelName: 'MacBook Pro 16"', deviceTypeId: 2, brandId: 'apple' },
  { id: 7, modelName: 'MacBook Air M2', deviceTypeId: 2, brandId: 'apple' },
  { id: 8, modelName: 'iPad Pro 12.9"', deviceTypeId: 3, brandId: 'apple' },
  { id: 11, modelName: 'Samsung Galaxy S24 Ultra', deviceTypeId: 1, brandId: 'samsung' },
  { id: 12, modelName: 'Samsung Galaxy S24', deviceTypeId: 1, brandId: 'samsung' },
  { id: 13, modelName: 'Samsung Galaxy A54', deviceTypeId: 1, brandId: 'samsung' },
  { id: 15, modelName: 'Samsung Galaxy Tab S9', deviceTypeId: 3, brandId: 'samsung' },
  { id: 16, modelName: 'Huawei P60 Pro', deviceTypeId: 1, brandId: 'huawei' },
  { id: 17, modelName: 'Huawei Mate 60', deviceTypeId: 1, brandId: 'huawei' },
  { id: 19, modelName: 'Dell XPS 15', deviceTypeId: 2, brandId: 'dell' },
  { id: 20, modelName: 'Dell Inspiron 14', deviceTypeId: 2, brandId: 'dell' },
  { id: 22, modelName: 'HP Spectre x360', deviceTypeId: 2, brandId: 'hp' },
  { id: 23, modelName: 'HP Pavilion 15', deviceTypeId: 2, brandId: 'hp' },
  { id: 25, modelName: 'Lenovo ThinkPad X1 Carbon', deviceTypeId: 2, brandId: 'lenovo' },
  { id: 26, modelName: 'Lenovo IdeaPad 5', deviceTypeId: 2, brandId: 'lenovo' },
];

export default function ServiceRequestNew() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { language, t } = useLanguage();
  const [, setLocationNav] = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [serviceMode, setServiceMode] = useState<"mobile" | "pickup">("mobile");
  const [issueDescription, setIssueDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash_on_delivery" | "bank_transfer">("cash_on_delivery");
  const [locationLoading, setLocationLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: serviceTypes } = trpc.services.getTypes.useQuery();
  const { data: pricing } = trpc.services.getPrice.useQuery(
    {
      deviceModelId: parseInt(selectedModel),
      serviceTypeId: parseInt(selectedService),
    },
    { enabled: !!selectedModel && !!selectedService }
  );

  const createRequest = trpc.requests.create.useMutation({
    onSuccess: async (data) => {
      try {
        const selectedBrandData = brands.find(b => b.id === selectedBrand);
        const selectedModelData = mockModels.find(m => m.id.toString() === selectedModel);
        const selectedServiceData = serviceTypes?.find(s => s.id.toString() === selectedService);
        
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: 'd3ff12a4-e013-473f-8730-9d5760059a64',
            subject: `🔔 حجز جديد - Fixate`,
            from_name: 'Fixate Website',
            to: 'fixate01@gmail.com',
            message: `
🆕 حجز جديد من الموقع!

📞 الجوال: ${phoneNumber}
🔧 نوع الخدمة: ${serviceMode === 'mobile' ? 'فني متنقل' : 'استلام وتوصيل'}
📱 الجهاز: ${selectedBrandData?.nameAr} - ${selectedModelData?.modelName}
⚠️ الخدمة: ${selectedServiceData?.name}
📝 التفاصيل: ${issueDescription || 'لا يوجد'}
🏠 العنوان: ${address}
🌆 المدينة: ${city}
⏰ الوقت المفضل: ${preferredTimeSlot || 'لا يوجد'}
💳 طريقة الدفع: ${paymentMethod === 'cash_on_delivery' ? 'نقدي' : 'تحويل بنكي'}
⏰ التاريخ: ${new Date().toLocaleString('ar-SA')}
            `.trim(),
          }),
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }

      toast.success(language === 'ar' ? "تم إرسال طلبك بنجاح!" : "Request sent successfully!");
      
      // Redirect to technician details page
      setTimeout(() => {
        setLocationNav(`/technicians?booking=${data.id}`);
      }, 1500);
    },
    onError: (error) => {
      toast.error((language === 'ar' ? "خطأ: " : "Error: ") + error.message);
      setIsSubmitting(false);
    },
  });

  const filteredModels = mockModels.filter(m => m.brandId === selectedBrand);

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setLocationLoading(false);
          toast.success(language === 'ar' ? "تم تحديد موقعك" : "Location detected");
        },
        () => {
          setLocationLoading(false);
          toast.error(language === 'ar' ? "فشل تحديد الموقع" : "Failed to get location");
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      if (isOAuthAvailable()) {
        window.location.href = getLoginUrl();
      } else {
        toast.error(language === 'ar' ? "يرجى تسجيل الدخول أولاً" : "Please login first");
      }
      return;
    }

    if (!selectedModel || !selectedService || !address || !city || !phoneNumber) {
      toast.error(language === 'ar' ? "الرجاء ملء جميع الحقول المطلوبة" : "Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    createRequest.mutate({
      deviceModelId: parseInt(selectedModel),
      serviceTypeId: parseInt(selectedService),
      serviceMode,
      issueDescription,
      address,
      city,
      phoneNumber,
      preferredTimeSlot,
      paymentMethod,
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo />
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
                {language === 'ar' ? 'رجوع' : 'Back'}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {language === 'ar' ? 'احجز خدمة الإصلاح' : 'Book Repair Service'}
            </h1>
            <p className="text-muted-foreground text-lg">
              {language === 'ar' ? 'اختر جهازك والخدمة المطلوبة' : 'Select your device and service'}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep >= step
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {currentStep > step ? <CheckCircle2 className="h-5 w-5" /> : step}
                    </div>
                    <span className="text-xs md:text-sm mt-2 text-muted-foreground text-center">
                      {step === 1 ? (language === 'ar' ? 'الجهاز' : 'Device') : step === 2 ? (language === 'ar' ? 'التفاصيل' : 'Details') : (language === 'ar' ? 'الموقع' : 'Location')}
                    </span>
                  </div>
                  {step < 3 && <div className={`h-1 flex-1 mx-2 ${currentStep > step ? 'bg-primary' : 'bg-muted'}`}></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Device Selection */}
          {currentStep === 1 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl">{language === 'ar' ? 'اختر جهازك' : 'Select Your Device'}</CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                {/* Brand Selection */}
                <div className="mb-8">
                  <Label className="text-base font-semibold mb-4 block">{language === 'ar' ? 'الماركة' : 'Brand'}</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {brands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => {
                          setSelectedBrand(brand.id);
                          setSelectedModel("");
                        }}
                        className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                          selectedBrand === brand.id
                            ? 'border-primary bg-primary/5'
                            : 'border-muted hover:border-primary/50'
                        }`}
                      >
                        <img src={brand.logo} alt={brand.nameAr} className="h-8 w-8 object-contain" />
                        <span className="text-sm font-medium">{language === 'ar' ? brand.nameAr : brand.nameEn}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Selection */}
                {selectedBrand && (
                  <div className="mb-8">
                    <Label className="text-base font-semibold mb-4 block">{language === 'ar' ? 'الموديل' : 'Model'}</Label>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredModels.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => setSelectedModel(model.id.toString())}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                            selectedModel === model.id.toString()
                              ? 'border-primary bg-primary/5'
                              : 'border-muted hover:border-primary/50'
                          }`}
                        >
                          {model.modelName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Selection */}
                {selectedModel && (
                  <div className="mb-8">
                    <Label className="text-base font-semibold mb-4 block">{language === 'ar' ? 'نوع الخدمة' : 'Service Type'}</Label>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {serviceTypes?.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id.toString())}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-all flex justify-between items-center ${
                            selectedService === service.id.toString()
                              ? 'border-primary bg-primary/5'
                              : 'border-muted hover:border-primary/50'
                          }`}
                        >
                          <span>{service.name}</span>
                          {pricing && <span className="text-primary font-semibold">{pricing.price} ر.س</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Button */}
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedBrand || !selectedModel || !selectedService}
                  className="w-full h-12 text-base font-semibold"
                >
                  {language === 'ar' ? 'التالي' : 'Next'} <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Service Details */}
          {currentStep === 2 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl">{language === 'ar' ? 'تفاصيل الخدمة' : 'Service Details'}</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                {/* Service Mode */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">{language === 'ar' ? 'نوع الخدمة' : 'Service Mode'}</Label>
                  <RadioGroup value={serviceMode} onValueChange={(value: any) => setServiceMode(value)}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-muted hover:border-primary/50 cursor-pointer">
                      <RadioGroupItem value="mobile" id="mobile" />
                      <Label htmlFor="mobile" className="cursor-pointer flex-1">
                        <div className="font-semibold">{language === 'ar' ? 'فني متنقل' : 'Mobile Technician'}</div>
                        <div className="text-sm text-muted-foreground">{language === 'ar' ? 'الفني يأتي إليك' : 'Technician comes to you'}</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-muted hover:border-primary/50 cursor-pointer">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="cursor-pointer flex-1">
                        <div className="font-semibold">{language === 'ar' ? 'استلام وتوصيل' : 'Pickup & Delivery'}</div>
                        <div className="text-sm text-muted-foreground">{language === 'ar' ? 'نستلم الجهاز ونوصله' : 'We pick up and deliver'}</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Issue Description */}
                <div>
                  <Label className="text-base font-semibold mb-2 block">{language === 'ar' ? 'وصف المشكلة' : 'Issue Description'}</Label>
                  <Textarea
                    placeholder={language === 'ar' ? 'اشرح المشكلة بالتفصيل...' : 'Describe the issue...'}
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    className="min-h-24 resize-none"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">{language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</Label>
                  <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-muted hover:border-primary/50 cursor-pointer">
                      <RadioGroupItem value="cash_on_delivery" id="cash" />
                      <Label htmlFor="cash" className="cursor-pointer flex-1">
                        {language === 'ar' ? 'نقدي عند الاستلام' : 'Cash on Delivery'}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-muted hover:border-primary/50 cursor-pointer">
                      <RadioGroupItem value="bank_transfer" id="bank" />
                      <Label htmlFor="bank" className="cursor-pointer flex-1">
                        {language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    className="flex-1 h-12"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'السابق' : 'Back'}
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 h-12 font-semibold"
                  >
                    {language === 'ar' ? 'التالي' : 'Next'} <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Location & Confirmation */}
          {currentStep === 3 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl">{language === 'ar' ? 'الموقع والتأكيد' : 'Location & Confirmation'}</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                {/* Phone Number */}
                <div>
                  <Label className="text-base font-semibold mb-2 block">{language === 'ar' ? 'رقم الجوال' : 'Phone Number'}</Label>
                  <Input
                    type="tel"
                    placeholder={language === 'ar' ? '05xxxxxxxxx' : '+966...'}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12"
                  />
                </div>

                {/* City */}
                <div>
                  <Label className="text-base font-semibold mb-2 block">{language === 'ar' ? 'المدينة' : 'City'}</Label>
                  <Input
                    placeholder={language === 'ar' ? 'الرياض' : 'Riyadh'}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="h-12"
                  />
                </div>

                {/* Address */}
                <div>
                  <Label className="text-base font-semibold mb-2 block">{language === 'ar' ? 'العنوان' : 'Address'}</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder={language === 'ar' ? 'أدخل العنوان...' : 'Enter address...'}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-12 flex-1"
                    />
                    <Button
                      onClick={getCurrentLocation}
                      disabled={locationLoading}
                      variant="outline"
                      className="h-12 px-4"
                    >
                      {locationLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Preferred Time */}
                <div>
                  <Label className="text-base font-semibold mb-2 block">{language === 'ar' ? 'الوقت المفضل' : 'Preferred Time'}</Label>
                  <Input
                    type="time"
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="h-12"
                  />
                </div>

                {/* Summary */}
                <Card className="bg-muted/50 border-0">
                  <CardContent className="pt-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{language === 'ar' ? 'الجهاز' : 'Device'}</span>
                        <span className="font-semibold">{mockModels.find(m => m.id.toString() === selectedModel)?.modelName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{language === 'ar' ? 'الخدمة' : 'Service'}</span>
                        <span className="font-semibold">{serviceTypes?.find(s => s.id.toString() === selectedService)?.name}</span>
                      </div>
                      {pricing && (
                        <div className="flex justify-between pt-3 border-t">
                          <span className="text-muted-foreground font-semibold">{language === 'ar' ? 'السعر' : 'Price'}</span>
                          <span className="font-bold text-lg text-primary">{pricing.price} ر.س</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    className="flex-1 h-12"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'السابق' : 'Back'}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !phoneNumber || !city || !address}
                    className="flex-1 h-12 font-semibold"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                    {language === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
