import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl, isOAuthAvailable } from "@/const";
import { 
  Loader2, CheckCircle2, MapPin, Navigation, Smartphone, Laptop, Tablet, 
  ChevronLeft, ArrowLeft, Upload, X, Camera, Image as ImageIcon, Watch
} from "lucide-react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// Device Types
const DEVICE_TYPES = [
  { id: 'phone', nameAr: 'جوال', nameEn: 'Phone', icon: Smartphone },
  { id: 'tablet', nameAr: 'تابلت', nameEn: 'Tablet', icon: Tablet },
  { id: 'laptop', nameAr: 'لابتوب', nameEn: 'Laptop', icon: Laptop },
  { id: 'watch', nameAr: 'ساعة ذكية', nameEn: 'Smart Watch', icon: Watch },
];

// Service Types (Mobile/Pickup)
const SERVICE_TYPES = [
  { 
    id: 'mobile', 
    nameAr: 'فني متنقل', 
    nameEn: 'Mobile Technician',
    descriptionAr: 'يأتي الفني إلى موقعك ويصلح الجهاز في المكان',
    descriptionEn: 'Technician comes to your location and fixes on-site',
  },
  { 
    id: 'pickup', 
    nameAr: 'استلام وتوصيل', 
    nameEn: 'Pickup & Delivery',
    descriptionAr: 'نستلم جهازك ونوصله لمحل متعاقد ونرجعه بعد الإصلاح',
    descriptionEn: 'We pickup your device, deliver to partner shop, and return after repair',
  },
];

// Brand data with logos
const brands = [
  { id: 'apple', nameAr: 'آبل', nameEn: 'Apple', logo: '/brands/apple.png?v=2', deviceTypes: ['phone', 'tablet', 'laptop'] },
  { id: 'samsung', nameAr: 'سامسونج', nameEn: 'Samsung', logo: '/brands/samsung.png?v=2', deviceTypes: ['phone', 'tablet'] },
  { id: 'huawei', nameAr: 'هواوي', nameEn: 'Huawei', logo: '/brands/huawei.png?v=2', deviceTypes: ['phone', 'tablet'] },
  { id: 'dell', nameAr: 'ديل', nameEn: 'Dell', logo: '/brands/dell.png?v=2', deviceTypes: ['laptop'] },
  { id: 'hp', nameAr: 'إتش بي', nameEn: 'HP', logo: '/brands/hp.png?v=2', deviceTypes: ['laptop'] },
  { id: 'lenovo', nameAr: 'لينوفو', nameEn: 'Lenovo', logo: '/brands/lenovo.png?v=2', deviceTypes: ['laptop', 'tablet'] },
];

// Common issues with estimated prices
const ISSUES = [
  { id: 'screen_broken', nameAr: 'شاشة مكسورة', nameEn: 'Broken Screen', estimatedPrice: 300 },
  { id: 'battery_drain', nameAr: 'البطارية تنفذ بسرعة', nameEn: 'Battery Draining Fast', estimatedPrice: 200 },
  { id: 'charging_issue', nameAr: 'مشكلة في الشحن', nameEn: 'Charging Issue', estimatedPrice: 150 },
  { id: 'camera_issue', nameAr: 'مشكلة في الكاميرا', nameEn: 'Camera Issue', estimatedPrice: 250 },
  { id: 'speaker_issue', nameAr: 'مشكلة في السماعة', nameEn: 'Speaker Issue', estimatedPrice: 180 },
  { id: 'microphone_issue', nameAr: 'مشكلة في الميكروفون', nameEn: 'Microphone Issue', estimatedPrice: 180 },
  { id: 'button_issue', nameAr: 'مشكلة في الأزرار', nameEn: 'Button Issue', estimatedPrice: 120 },
  { id: 'water_damage', nameAr: 'تلف بسبب الماء', nameEn: 'Water Damage', estimatedPrice: 400 },
  { id: 'software_issue', nameAr: 'مشكلة في النظام', nameEn: 'Software Issue', estimatedPrice: 100 },
  { id: 'other', nameAr: 'مشكلة أخرى', nameEn: 'Other Issue', estimatedPrice: 0 },
];

export default function ServiceRequestNew() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const [, setLocationNav] = useLocation();

  // Step management (7 steps to match mobile)
  const [currentStep, setCurrentStep] = useState(1);

  // Form data
  const [selectedServiceType, setSelectedServiceType] = useState<string>('mobile');
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>('phone');
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedIssue, setSelectedIssue] = useState<string>("");
  const [issueDescription, setIssueDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  
  // Location
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  
  // Search states
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const [issueSearch, setIssueSearch] = useState('');

  const STEPS = language === 'ar' 
    ? ['نوع الخدمة', 'نوع الجهاز', 'الماركة', 'الموديل', 'العطل', 'التفاصيل', 'الموقع']
    : ['Service Type', 'Device Type', 'Brand', 'Model', 'Issue', 'Details', 'Location'];

  // Filter brands by device type
  const filteredBrands = brands.filter(b => 
    b.deviceTypes.includes(selectedDeviceType) &&
    (brandSearch === '' || b.nameAr.includes(brandSearch) || b.nameEn.toLowerCase().includes(brandSearch.toLowerCase()))
  );

  // Mock models based on brand (in production, fetch from API)
  const getModelsForBrand = (brandId: string) => {
    const modelData: Record<string, string[]> = {
      'apple': ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13', 'MacBook Pro 16"', 'MacBook Air M2', 'iPad Pro 12.9"', 'iPad Air'],
      'samsung': ['Galaxy S24 Ultra', 'Galaxy S24', 'Galaxy S23', 'Galaxy Z Fold 5', 'Galaxy A54', 'Galaxy Tab S9'],
      'huawei': ['Mate 60 Pro', 'P60 Pro', 'Nova 12', 'MatePad Pro'],
      'dell': ['XPS 15', 'XPS 13', 'Inspiron 15', 'Latitude 7420'],
      'hp': ['Spectre x360', 'Pavilion 15', 'EliteBook 840', 'Envy'],
      'lenovo': ['ThinkPad X1 Carbon', 'IdeaPad 5', 'Yoga 9i', 'Tab P12 Pro'],
    };
    return modelData[brandId] || [];
  };

  const filteredModels = selectedBrand ? getModelsForBrand(selectedBrand).filter(m => 
    modelSearch === '' || m.toLowerCase().includes(modelSearch.toLowerCase())
  ) : [];

  const filteredIssues = ISSUES.filter(issue => 
    issueSearch === '' || 
    issue.nameAr.includes(issueSearch) || 
    issue.nameEn.toLowerCase().includes(issueSearch.toLowerCase())
  );

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setAddress(`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
          toast.success(language === 'ar' ? "تم تحديد موقعك الحالي" : "Current location detected");
        },
        (error) => {
          toast.error(language === 'ar' ? "فشل في الحصول على الموقع" : "Failed to get location");
        }
      );
    } else {
      toast.error(language === 'ar' ? "المتصفح لا يدعم خدمات الموقع" : "Browser doesn't support location services");
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setMediaFiles([...mediaFiles, ...files]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...mediaFiles];
    newFiles.splice(index, 1);
    setMediaFiles(newFiles);
  };

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 2 && !selectedDeviceType) {
      toast.error(language === 'ar' ? 'الرجاء اختيار نوع الجهاز' : 'Please select device type');
      return;
    }
    if (currentStep === 3 && !selectedBrand) {
      toast.error(language === 'ar' ? 'الرجاء اختيار الماركة' : 'Please select brand');
      return;
    }
    if (currentStep === 4 && !selectedModel) {
      toast.error(language === 'ar' ? 'الرجاء اختيار الموديل' : 'Please select model');
      return;
    }
    if (currentStep === 5 && !selectedIssue) {
      toast.error(language === 'ar' ? 'الرجاء اختيار العطل' : 'Please select issue');
      return;
    }
    if (currentStep === 7 && (!address || !city || !phoneNumber)) {
      toast.error(language === 'ar' ? 'الرجاء ملء جميع حقول الموقع' : 'Please fill all location fields');
      return;
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      if (isOAuthAvailable()) {
        window.location.href = getLoginUrl();
      } else {
        toast.error(language === 'ar' ? "يرجى تسجيل الدخول أولاً" : "Please login first");
      }
      return;
    }

    try {
      // Upload media files first (implement S3 upload)
      const mediaUrls: string[] = [];
      // TODO: Upload files to S3 and get URLs

      const selectedIssueData = ISSUES.find(i => i.id === selectedIssue);
      const selectedServiceTypeData = SERVICE_TYPES.find(s => s.id === selectedServiceType);

      // Create request with unified data structure
      const requestData = {
        // Web fields
        deviceModelId: 0, // Will be mapped from brand+model
        serviceTypeId: 0, // Will be mapped from issue
        serviceMode: selectedServiceType as 'express' | 'pickup',
        issueDescription: `[${selectedServiceTypeData?.[language === 'ar' ? 'nameAr' : 'nameEn']}] ${selectedIssueData?.[language === 'ar' ? 'nameAr' : 'nameEn']}: ${issueDescription}`,
        address,
        city,
        phoneNumber,
        paymentMethod: 'cash_on_delivery' as const,
        
        // Mobile fields (additional)
        device_type: selectedDeviceType,
        device_brand: selectedBrand,
        device_model: selectedModel,
        service_type: selectedServiceType,
        issue_id: selectedIssue,
        estimated_price: selectedIssueData?.estimatedPrice || 0,
        latitude: latitude || 0,
        longitude: longitude || 0,
        media_urls: mediaUrls,
      };

      // Send email notification
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd3ff12a4-e013-473f-8730-9d5760059a64',
          subject: `🔔 حجز جديد - Fixate`,
          from_name: 'Fixate Website',
          to: 'support@fixate.site',
          message: `
🆕 حجز جديد من الموقع!

👤 العميل: ${user?.name || user?.email}
📞 الجوال: ${phoneNumber}

🔧 نوع الخدمة: ${selectedServiceTypeData?.nameAr} (${selectedServiceTypeData?.nameEn})
📱 الجهاز: ${selectedBrand} ${selectedModel} (${selectedDeviceType})
⚠️ المشكلة: ${selectedIssueData?.nameAr}
📝 التفاصيل: ${issueDescription}

📍 الموقع: ${address}, ${city}
🗺️ الإحداثيات: ${latitude}, ${longitude}
💰 السعر التقديري: ${selectedIssueData?.estimatedPrice} ريال

⏰ التاريخ: ${new Date().toLocaleString('ar-SA')}
          `.trim(),
        }),
      });

      toast.success(language === 'ar' ? "تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً" : "Request sent successfully! We'll contact you soon");
      setLocationNav("/my-requests");
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error(language === 'ar' ? "حدث خطأ أثناء إرسال الطلب" : "Error sending request");
    }
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

          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                        currentStep > index + 1
                          ? 'bg-primary text-primary-foreground'
                          : currentStep === index + 1
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {currentStep > index + 1 ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                    </div>
                    <span className={`mt-2 text-xs font-medium text-center ${currentStep >= index + 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 rounded transition-all ${currentStep > index + 1 ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Step 1: Service Type */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <Label className="text-2xl font-semibold">
                    {language === 'ar' ? 'اختر نوع الخدمة *' : 'Select Service Type *'}
                  </Label>
                  <div className="grid md:grid-cols-2 gap-6">
                    {SERVICE_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedServiceType(type.id)}
                        className={`p-6 border-2 rounded-2xl transition-all hover:border-primary hover:shadow-lg ${
                          selectedServiceType === type.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-card'
                        }`}
                      >
                        <div className="text-center space-y-2">
                          <h3 className="text-xl font-semibold">
                            {language === 'ar' ? type.nameAr : type.nameEn}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'ar' ? type.descriptionAr : type.descriptionEn}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Device Type */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <Label className="text-2xl font-semibold">
                    {language === 'ar' ? 'اختر نوع الجهاز *' : 'Select Device Type *'}
                  </Label>
                  <div className="grid md:grid-cols-4 gap-4">
                    {DEVICE_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedDeviceType(type.id)}
                          className={`p-6 border-2 rounded-2xl transition-all hover:border-primary hover:shadow-lg ${
                            selectedDeviceType === type.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border bg-card'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-3">
                            <Icon className="h-8 w-8" />
                            <span className="text-sm font-semibold">
                              {language === 'ar' ? type.nameAr : type.nameEn}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Brand */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <Label className="text-2xl font-semibold">
                    {language === 'ar' ? 'اختر الماركة *' : 'Select Brand *'}
                  </Label>
                  <Input
                    placeholder={language === 'ar' ? 'ابحث عن الماركة...' : 'Search brand...'}
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="mb-4"
                  />
                  <div className="grid md:grid-cols-3 gap-6">
                    {filteredBrands.map((brand) => (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => setSelectedBrand(brand.id)}
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
              )}

              {/* Step 4: Model */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <Label className="text-2xl font-semibold">
                    {language === 'ar' ? 'اختر الموديل *' : 'Select Model *'}
                  </Label>
                  <Input
                    placeholder={language === 'ar' ? 'ابحث عن الموديل...' : 'Search model...'}
                    value={modelSearch}
                    onChange={(e) => setModelSearch(e.target.value)}
                    className="mb-4"
                  />
                  <RadioGroup value={selectedModel} onValueChange={setSelectedModel}>
                    <div className="grid md:grid-cols-2 gap-4">
                      {filteredModels.map((model) => (
                        <div
                          key={model}
                          className={`flex items-center space-x-2 space-x-reverse p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary ${
                            selectedModel === model ? 'border-primary bg-primary/5' : 'border-border'
                          }`}
                          onClick={() => setSelectedModel(model)}
                        >
                          <RadioGroupItem value={model} id={model} />
                          <Label htmlFor={model} className="cursor-pointer flex-1">
                            {model}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 5: Issue */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <Label className="text-2xl font-semibold">
                    {language === 'ar' ? 'اختر المشكلة *' : 'Select Issue *'}
                  </Label>
                  <Input
                    placeholder={language === 'ar' ? 'ابحث عن المشكلة...' : 'Search issue...'}
                    value={issueSearch}
                    onChange={(e) => setIssueSearch(e.target.value)}
                    className="mb-4"
                  />
                  <RadioGroup value={selectedIssue} onValueChange={setSelectedIssue}>
                    <div className="grid md:grid-cols-2 gap-4">
                      {filteredIssues.map((issue) => (
                        <div
                          key={issue.id}
                          className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary ${
                            selectedIssue === issue.id ? 'border-primary bg-primary/5' : 'border-border'
                          }`}
                          onClick={() => setSelectedIssue(issue.id)}
                        >
                          <div className="flex items-center space-x-2 space-x-reverse flex-1">
                            <RadioGroupItem value={issue.id} id={issue.id} />
                            <Label htmlFor={issue.id} className="cursor-pointer flex-1">
                              {language === 'ar' ? issue.nameAr : issue.nameEn}
                            </Label>
                          </div>
                          {issue.estimatedPrice > 0 && (
                            <span className="text-sm font-semibold text-primary">
                              {issue.estimatedPrice} {language === 'ar' ? 'ريال' : 'SAR'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 6: Details & Media */}
              {currentStep === 6 && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="space-y-4">
                    <Label className="text-2xl font-semibold">
                      {language === 'ar' ? 'تفاصيل المشكلة' : 'Issue Details'}
                    </Label>
                    <Textarea
                      placeholder={language === 'ar' ? 'اكتب تفاصيل المشكلة هنا...' : 'Describe the issue here...'}
                      value={issueDescription}
                      onChange={(e) => setIssueDescription(e.target.value)}
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xl font-semibold">
                      {language === 'ar' ? 'إضافة صور (اختياري)' : 'Add Images (Optional)'}
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <Upload className="h-10 w-10 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {language === 'ar' ? 'اضغط لرفع الصور أو الفيديو' : 'Click to upload images or video'}
                        </span>
                      </label>
                    </div>

                    {mediaFiles.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {mediaFiles.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 7: Location */}
              {currentStep === 7 && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <Label className="text-2xl font-semibold">
                    {language === 'ar' ? 'معلومات الموقع *' : 'Location Information *'}
                  </Label>

                  <div className="space-y-4">
                    <div>
                      <Label>{language === 'ar' ? 'العنوان' : 'Address'} *</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder={language === 'ar' ? 'أدخل العنوان' : 'Enter address'}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={getCurrentLocation}
                        >
                          <Navigation className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>{language === 'ar' ? 'المدينة' : 'City'} *</Label>
                      <Input
                        placeholder={language === 'ar' ? 'أدخل المدينة' : 'Enter city'}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>{language === 'ar' ? 'رقم الجوال' : 'Phone Number'} *</Label>
                      <Input
                        placeholder={language === 'ar' ? 'أدخل رقم الجوال' : 'Enter phone number'}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        dir="ltr"
                      />
                    </div>

                    {latitude && longitude && (
                      <div className="text-sm text-muted-foreground">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        {language === 'ar' ? 'الإحداثيات:' : 'Coordinates:'} {latitude.toFixed(6)}, {longitude.toFixed(6)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="h-4 w-4 ml-2" />
                    {language === 'ar' ? 'رجوع' : 'Back'}
                  </Button>
                )}
                
                {currentStep < STEPS.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto"
                  >
                    {language === 'ar' ? 'التالي' : 'Next'}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="ml-auto"
                  >
                    {language === 'ar' ? 'إرسال الطلب' : 'Submit Request'}
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
