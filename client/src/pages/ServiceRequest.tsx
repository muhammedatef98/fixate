import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl, isOAuthAvailable } from "@/const";
import { Loader2, CheckCircle2, MapPin, Navigation, Smartphone, Laptop, Tablet, ChevronLeft, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/Logo";
import { toast } from "sonner";

import { useLanguage } from "@/contexts/LanguageContext";

// Brand data with logos (cache busting to force reload)
const brands = [
  { id: 'apple', nameAr: 'آبل', nameEn: 'Apple', logo: '/brands/apple.png?v=2' },
  { id: 'samsung', nameAr: 'سامسونج', nameEn: 'Samsung', logo: '/brands/samsung.png?v=2' },
  { id: 'huawei', nameAr: 'هواوي', nameEn: 'Huawei', logo: '/brands/huawei.png?v=2' },
  { id: 'dell', nameAr: 'ديل', nameEn: 'Dell', logo: '/brands/dell.png?v=2' },
  { id: 'hp', nameAr: 'إتش بي', nameEn: 'HP', logo: '/brands/hp.png?v=2' },
  { id: 'lenovo', nameAr: 'لينوفو', nameEn: 'Lenovo', logo: '/brands/lenovo.png?v=2' },
];

export default function ServiceRequest() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const [, setLocationNav] = useLocation();

  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [deviceSelectionSubStep, setDeviceSelectionSubStep] = useState<'brand' | 'model' | 'service'>('brand');

  // Form data
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
  
  // Location


  // Fetch all device types and models
  const { data: deviceTypes } = trpc.devices.getTypes.useQuery();
  const { data: allModels } = trpc.devices.getModels.useQuery(
    { deviceTypeId: 1 }, // Dummy query to get all models
    { enabled: false } // We'll use a workaround
  );
  
  // Workaround: Get models for each device type and combine
  const [combinedModels, setCombinedModels] = useState<any[]>([]);
  
  useState(() => {
    // This is a simplified approach - in production, you'd fetch all models at once
    // For now, we'll use hardcoded models based on brands
    const mockModels = [
      // Apple
      { id: 1, modelName: 'iPhone 16 Pro Max', deviceTypeId: 1 },
      { id: 2, modelName: 'iPhone 16 Pro', deviceTypeId: 1 },
      { id: 3, modelName: 'iPhone 16', deviceTypeId: 1 },
      { id: 4, modelName: 'iPhone 15 Pro Max', deviceTypeId: 1 },
      { id: 5, modelName: 'iPhone 15', deviceTypeId: 1 },
      { id: 6, modelName: 'iPhone 14 Pro', deviceTypeId: 1 },
      { id: 7, modelName: 'MacBook Pro 16"', deviceTypeId: 2 },
      { id: 8, modelName: 'MacBook Air M2', deviceTypeId: 2 },
      { id: 9, modelName: 'iPad Pro 12.9"', deviceTypeId: 3 },
      { id: 10, modelName: 'iPad Air', deviceTypeId: 3 },
      // Samsung
      { id: 11, modelName: 'Samsung Galaxy S24 Ultra', deviceTypeId: 1 },
      { id: 12, modelName: 'Samsung Galaxy S24', deviceTypeId: 1 },
      { id: 13, modelName: 'Samsung Galaxy A54', deviceTypeId: 1 },
      { id: 14, modelName: 'Samsung Galaxy Z Fold 5', deviceTypeId: 1 },
      { id: 15, modelName: 'Samsung Galaxy Tab S9', deviceTypeId: 3 },
      // Huawei
      { id: 16, modelName: 'Huawei P60 Pro', deviceTypeId: 1 },
      { id: 17, modelName: 'Huawei Mate 60', deviceTypeId: 1 },
      { id: 18, modelName: 'Huawei MatePad Pro', deviceTypeId: 3 },
      // Dell
      { id: 19, modelName: 'Dell XPS 15', deviceTypeId: 2 },
      { id: 20, modelName: 'Dell Inspiron 14', deviceTypeId: 2 },
      { id: 21, modelName: 'Dell Latitude 7420', deviceTypeId: 2 },
      // HP
      { id: 22, modelName: 'HP Spectre x360', deviceTypeId: 2 },
      { id: 23, modelName: 'HP Pavilion 15', deviceTypeId: 2 },
      { id: 24, modelName: 'HP EliteBook 840', deviceTypeId: 2 },
      // Lenovo
      { id: 25, modelName: 'Lenovo ThinkPad X1 Carbon', deviceTypeId: 2 },
      { id: 26, modelName: 'Lenovo IdeaPad 5', deviceTypeId: 2 },
      { id: 27, modelName: 'Lenovo Yoga 9i', deviceTypeId: 2 },
    ];
    setCombinedModels(mockModels);
  });
  const { data: serviceTypes } = trpc.services.getTypes.useQuery();
  const { data: pricing } = trpc.services.getPrice.useQuery(
    {
      deviceModelId: parseInt(selectedModel),
      serviceTypeId: parseInt(selectedService),
    },
    { enabled: !!selectedModel && !!selectedService }
  );

  // Filter models by selected brand
  const filteredModels = combinedModels?.filter((model: any) => {
    const modelName = model.modelName.toLowerCase();
    if (selectedBrand === 'apple') {
      return modelName.includes('iphone') || modelName.includes('ipad') || modelName.includes('macbook');
    } else if (selectedBrand === 'samsung') {
      return modelName.includes('samsung') || modelName.includes('galaxy');
    } else if (selectedBrand === 'huawei') {
      return modelName.includes('huawei');
    } else if (selectedBrand === 'dell') {
      return modelName.includes('dell');
    } else if (selectedBrand === 'hp') {
      return modelName.includes('hp');
    } else if (selectedBrand === 'lenovo') {
      return modelName.includes('lenovo');
    }
    return false;
  });

  const createRequest = trpc.requests.create.useMutation({
    onSuccess: async (data) => {
      // Send email notification
      try {
        const selectedBrandData = brands.find(b => b.id === selectedBrand);
        const selectedModelData = models.find(m => m.id === selectedModel);
        const selectedServiceData = services.find(s => s.id === selectedService);
        
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: 'd3ff12a4-e013-473f-8730-9d5760059a64',
            subject: `🔔 حجز جديد - Fixatee`,
            from_name: 'Fixatee Website',
            to: 'support@fixate.site',
            message: `
🆕 حجز جديد من الموقع!

📞 الجوال: ${phoneNumber}

🔧 نوع الخدمة: ${serviceMode === 'mobile' ? 'فني متنقل (Mobile Technician)' : 'استلام وتوصيل (Pickup & Delivery)'}
📱 الجهاز: ${selectedBrandData?.name} - ${selectedModelData?.name}
⚠️ الخدمة: ${selectedServiceData?.name}
📝 التفاصيل: ${issueDescription || 'لا يوجد'}

🏠 العنوان: ${address}
🌆 المدينة: ${city}

⏰ الوقت المفضل: ${preferredTimeSlot || 'لا يوجد'}
💳 طريقة الدفع: ${paymentMethod === 'cash' ? 'نقدي (Cash)' : paymentMethod === 'card' ? 'بطاقة (Card)' : 'محفظة (Wallet)'}

⏰ التاريخ: ${new Date().toLocaleString('ar-SA')}
            `.trim(),
          }),
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't block the user if email fails
      }

      toast.success(language === 'ar' ? "تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً" : "Request sent successfully! We'll contact you soon");
      setLocationNav("/my-requests");
    },
    onError: (error) => {
      toast.error((language === 'ar' ? "حدث خطأ أثناء إرسال الطلب: " : "Error sending request: ") + error.message);
    },
  });

  const [locationLoading, setLocationLoading] = useState(false);

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setLocationLoading(false);
          toast.success(language === 'ar' ? "تم تحديد موقعك الحالي" : "Current location detected");
        },
        (error) => {
          setLocationLoading(false);
          toast.error(language === 'ar' ? "فشل في الحصول على الموقع" : "Failed to get location");
        }
      );
    } else {
      setLocationLoading(false);
      toast.error(language === 'ar' ? "المتصفح لا يدعم خدمات الموقع" : "Browser doesn't support location services");
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

  const formatPrice = (priceInSAR: number) => {
    return priceInSAR.toFixed(2);
  };

  const canProceedToStep2 = selectedBrand && selectedModel && selectedService;
  const canProceedToStep3 = canProceedToStep2 && address && city && phoneNumber;

  const getBrandLogo = (brandId: string) => {
    const brand = brands.find(b => b.id === brandId);
    return brand?.logo || null;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <Logo />
              </div>
            </Link>
            {isAuthenticated && (
              <Link href="/my-requests">
                <Button variant="outline">
                  {language === 'ar' ? 'طلباتي' : 'My Requests'}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              {language === 'ar' ? 'احجز خدمة الإصلاح' : 'Book Repair Service'}
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {language === 'ar' ? 'املأ النموذج وسنتواصل معك لتأكيد الموعد' : 'Fill the form and we\'ll contact you to confirm'}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all ${
                        currentStep >= step
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {currentStep > step ? <CheckCircle2 className="h-6 w-6" /> : step}
                    </div>
                    <span className={`mt-2 text-sm font-medium text-center ${currentStep >= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step === 1 && (language === 'ar' ? 'معلومات الجهاز' : 'Device Info')}
                      {step === 2 && (language === 'ar' ? 'الموقع والتواصل' : 'Location & Contact')}
                      {step === 3 && (language === 'ar' ? 'التأكيد' : 'Confirmation')}
                    </span>
                  </div>
                  {step < 3 && (
                    <div className={`h-1 flex-1 mx-4 rounded transition-all ${currentStep > step ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Device Information */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* Sub-step 1.1: Select Brand */}
                {deviceSelectionSubStep === 'brand' && (
                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      <div className="space-y-4">
                        <Label className="text-2xl font-semibold">
                          {language === 'ar' ? 'اختر الشركة المصنعة *' : 'Select Brand *'}
                        </Label>
                        <div className="grid md:grid-cols-3 gap-6">
                          {brands.map((brand) => (
                            <button
                              key={brand.id}
                              type="button"
                              onClick={() => {
                                setSelectedBrand(brand.id);
                                setDeviceSelectionSubStep('model');
                              }}
                              className={`p-8 border-2 rounded-2xl transition-all hover:border-primary hover:shadow-lg ${
                                selectedBrand === brand.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border bg-card'
                              }`}
                            >
                              <div className="flex flex-col items-center gap-4">
                                <img 
                                  src={brand.logo} 
                                  alt={language === 'ar' ? brand.nameAr : brand.nameEn}
                                  className="h-16 w-auto object-contain"
                                />
                                <span className="text-lg font-semibold">
                                  {language === 'ar' ? brand.nameAr : brand.nameEn}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Sub-step 1.2: Select Model */}
                {deviceSelectionSubStep === 'model' && (
                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeviceSelectionSubStep('brand');
                            setSelectedModel("");
                          }}
                        >
                          <ArrowLeft className="h-4 w-4 ml-2" />
                          {language === 'ar' ? 'رجوع' : 'Back'}
                        </Button>
                        <div className="flex items-center gap-3">
                          <img 
                            src={getBrandLogo(selectedBrand)!} 
                            alt={selectedBrand}
                            className="h-8 w-auto"
                          />
                          <span className="text-lg font-semibold text-muted-foreground">
                            {brands.find(b => b.id === selectedBrand)?.[language === 'ar' ? 'nameAr' : 'nameEn']}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-2xl font-semibold">
                          {language === 'ar' ? 'اختر الموديل *' : 'Select Model *'}
                        </Label>
                        <RadioGroup value={selectedModel} onValueChange={(value) => {
                          setSelectedModel(value);
                          setDeviceSelectionSubStep('service');
                        }}>
                          <div className="grid md:grid-cols-2 gap-4">
                            {filteredModels?.map((model: any) => (
                              <div key={model.id}>
                                <RadioGroupItem value={model.id.toString()} id={`model-${model.id}`} className="peer sr-only" />
                                <Label
                                  htmlFor={`model-${model.id}`}
                                  className="flex items-center gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                                >
                                  <Smartphone className="h-6 w-6 text-primary flex-shrink-0" />
                                  <span className="font-medium text-lg">{model.modelName}</span>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Sub-step 1.3: Select Service */}
                {deviceSelectionSubStep === 'service' && (
                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeviceSelectionSubStep('model');
                            setSelectedService("");
                          }}
                        >
                          <ArrowLeft className="h-4 w-4 ml-2" />
                          {language === 'ar' ? 'رجوع' : 'Back'}
                        </Button>
                        <span className="text-lg font-semibold text-muted-foreground">
                          {filteredModels?.find(m => m.id.toString() === selectedModel)?.modelName}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-2xl font-semibold">
                          {language === 'ar' ? 'اختر نوع الخدمة *' : 'Select Service Type *'}
                        </Label>
                        <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                          <div className="grid md:grid-cols-2 gap-4">
                            {serviceTypes?.map((service) => (
                              <div key={service.id}>
                                <RadioGroupItem value={service.id.toString()} id={`service-${service.id}`} className="peer sr-only" />
                                <Label
                                  htmlFor={`service-${service.id}`}
                                  className="flex items-center gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                                >
                                  <div className="flex-1">
                                    <div className="font-semibold text-lg mb-1">{language === 'ar' ? service.nameAr : service.nameEn}</div>
                                    {(language === 'ar' ? service.descriptionAr : service.descriptionEn) && (
                                      <div className="text-sm text-muted-foreground">{language === 'ar' ? service.descriptionAr : service.descriptionEn}</div>
                                    )}
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Service Mode */}
                      <div className="space-y-4 pt-6 border-t">
                        <Label className="text-lg font-semibold">
                          {language === 'ar' ? 'طريقة الخدمة *' : 'Service Mode *'}
                        </Label>
                        <RadioGroup value={serviceMode} onValueChange={(value: any) => setServiceMode(value)}>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <RadioGroupItem value="mobile" id="mobile" className="peer sr-only" />
                              <Label
                                htmlFor="mobile"
                                className="flex flex-col p-6 border-2 rounded-xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                              >
                                <span className="font-semibold text-lg mb-2">
                                  {language === 'ar' ? '🔧 فني متنقل' : '🔧 Mobile Technician'}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {language === 'ar' ? 'يأتي الفني إلى موقعك ويصلح الجهاز في المكان' : 'Technician comes to your location and repairs on-site'}
                                </span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" />
                              <Label
                                htmlFor="pickup"
                                className="flex flex-col p-6 border-2 rounded-xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                              >
                                <span className="font-semibold text-lg mb-2">
                                  {language === 'ar' ? '🚚 استلام وتوصيل' : '🚚 Pickup & Delivery'}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {language === 'ar' ? 'مندوب يستلم الجهاز ويوصله لمحل متعاقد ويرجعه بعد الإصلاح' : 'Courier picks up device, delivers to partner shop, and returns after repair'}
                                </span>
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Issue Description */}
                      <div className="space-y-3 pt-6 border-t">
                        <Label htmlFor="issue" className="text-lg font-semibold">
                          {language === 'ar' ? 'وصف المشكلة (اختياري)' : 'Issue Description (Optional)'}
                        </Label>
                        <Textarea
                          id="issue"
                          value={issueDescription}
                          onChange={(e) => setIssueDescription(e.target.value)}
                          placeholder={language === 'ar' ? "اشرح المشكلة بالتفصيل..." : "Describe the issue in detail..."}
                          rows={4}
                          className="resize-none"
                        />
                      </div>

                      {/* Pricing Preview */}
                      {pricing && (
                        <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">
                              {language === 'ar' ? 'السعر المتوقع:' : 'Estimated Price:'}
                            </span>
                            <span className="text-3xl font-bold text-primary">
                              {formatPrice(pricing.priceInSAR)} {language === 'ar' ? 'ريال' : 'SAR'}
                            </span>
                          </div>
                        </div>
                      )}

                      <Button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        disabled={!canProceedToStep2}
                        className="w-full"
                        size="lg"
                      >
                        {language === 'ar' ? 'التالي' : 'Next'}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 2: Location & Contact */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentStep(1)}
                      >
                        <ArrowLeft className="h-4 w-4 ml-2" />
                        {language === 'ar' ? 'رجوع' : 'Back'}
                      </Button>
                    </div>

                    {/* City */}
                    <div className="space-y-3">
                      <Label htmlFor="city" className="text-lg font-semibold">
                        {language === 'ar' ? 'المدينة *' : 'City *'}
                      </Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={language === 'ar' ? "الرياض، جدة، الدمام..." : "Riyadh, Jeddah, Dammam..."}
                        required
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-3">
                      <Label htmlFor="address" className="text-lg font-semibold">
                        {language === 'ar' ? 'العنوان *' : 'Address *'}
                      </Label>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={getCurrentLocation}
                            disabled={locationLoading}
                            className="flex-1"
                          >
                            {locationLoading ? (
                              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                            ) : (
                              <Navigation className="h-4 w-4 ml-2" />
                            )}
                            {language === 'ar' ? 'موقعي الحالي' : 'Current Location'}
                          </Button>

                        </div>
                        <Textarea
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder={language === 'ar' ? "الحي، الشارع، رقم المبنى..." : "District, Street, Building number..."}
                          rows={3}
                          required
                        />
                      </div>
                    </div>



                    {/* Phone */}
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-lg font-semibold">
                        {language === 'ar' ? 'رقم الجوال *' : 'Phone Number *'}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={language === 'ar' ? "05xxxxxxxx" : "05xxxxxxxx"}
                        required
                      />
                    </div>

                    {/* Preferred Time */}
                    <div className="space-y-3">
                      <Label htmlFor="time" className="text-lg font-semibold">
                        {language === 'ar' ? 'الوقت المفضل (اختياري)' : 'Preferred Time (Optional)'}
                      </Label>
                      <Input
                        id="time"
                        type="datetime-local"
                        value={preferredTimeSlot}
                        onChange={(e) => setPreferredTimeSlot(e.target.value)}
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      disabled={!canProceedToStep3}
                      className="w-full"
                      size="lg"
                    >
                      {language === 'ar' ? 'التالي' : 'Next'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentStep(2)}
                      >
                        <ArrowLeft className="h-4 w-4 ml-2" />
                        {language === 'ar' ? 'رجوع' : 'Back'}
                      </Button>
                    </div>

                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold">
                        {language === 'ar' ? 'مراجعة الطلب' : 'Review Order'}
                      </h2>

                      <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-muted-foreground">
                            {language === 'ar' ? 'الشركة:' : 'Brand:'}
                          </span>
                          <span className="font-medium">
                            {brands.find(b => b.id === selectedBrand)?.[language === 'ar' ? 'nameAr' : 'nameEn']}
                          </span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-muted-foreground">
                            {language === 'ar' ? 'الموديل:' : 'Model:'}
                          </span>
                          <span className="font-medium">
                            {filteredModels?.find((m: any) => m.id.toString() === selectedModel)?.modelName}
                          </span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-muted-foreground">
                            {language === 'ar' ? 'الخدمة:' : 'Service:'}
                          </span>
                          <span className="font-medium">
                            {serviceTypes?.find((s: any) => s.id.toString() === selectedService)?.[language === 'ar' ? 'nameAr' : 'nameEn']}
                          </span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-muted-foreground">
                            {language === 'ar' ? 'طريقة الخدمة:' : 'Service Mode:'}
                          </span>
                          <span className="font-medium">
                            {serviceMode === 'mobile' 
                              ? (language === 'ar' ? 'فني متنقل' : 'Mobile Technician')
                              : (language === 'ar' ? 'استلام وتوصيل' : 'Pickup & Delivery')}
                          </span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-muted-foreground">
                            {language === 'ar' ? 'المدينة:' : 'City:'}
                          </span>
                          <span className="font-medium">{city}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-muted-foreground">
                            {language === 'ar' ? 'العنوان:' : 'Address:'}
                          </span>
                          <span className="font-medium text-left">{address}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-muted-foreground">
                            {language === 'ar' ? 'رقم الجوال:' : 'Phone:'}
                          </span>
                          <span className="font-medium">{phoneNumber}</span>
                        </div>
                        {pricing && (
                          <div className="flex justify-between py-6 pt-8">
                            <span className="text-2xl font-semibold">
                              {language === 'ar' ? 'الإجمالي:' : 'Total:'}
                            </span>
                            <span className="text-3xl font-bold text-primary">
                              {formatPrice(pricing.priceInSAR)} {language === 'ar' ? 'ريال' : 'SAR'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Payment Method */}
                      <div className="space-y-4 pt-6 border-t">
                        <Label className="text-lg font-semibold">
                          {language === 'ar' ? 'طريقة الدفع *' : 'Payment Method *'}
                        </Label>
                        <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                          <div className="space-y-3">
                            <div>
                              <RadioGroupItem value="cash_on_delivery" id="cash" className="peer sr-only" />
                              <Label
                                htmlFor="cash"
                                className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                              >
                                <span className="font-medium">
                                  {language === 'ar' ? '💵 الدفع عند الاستلام' : '💵 Cash on Delivery'}
                                </span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="bank_transfer" id="transfer" className="peer sr-only" />
                              <Label
                                htmlFor="transfer"
                                className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                              >
                                <span className="font-medium">
                                  {language === 'ar' ? '🏦 تحويل بنكي' : '🏦 Bank Transfer'}
                                </span>
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button
                        type="submit"
                        disabled={createRequest.isPending}
                        className="w-full"
                        size="lg"
                      >
                        {createRequest.isPending ? (
                          <>
                            <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                            {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                          </>
                        ) : (
                          language === 'ar' ? 'تأكيد الطلب' : 'Confirm Order'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
