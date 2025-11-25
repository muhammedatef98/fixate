import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Loader2, CheckCircle2, MapPin, Navigation, Map as MapIcon, Smartphone, Laptop, Tablet } from "lucide-react";
import { Link, useLocation } from "wouter";
import { APP_LOGO } from "@/const";
import { toast } from "sonner";
import { MapView } from "@/components/Map";

export default function ServiceRequest() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Step management
  const [currentStep, setCurrentStep] = useState(1);

  // Form data
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [serviceMode, setServiceMode] = useState<"express" | "pickup">("express");
  const [issueDescription, setIssueDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash_on_delivery" | "bank_transfer">("cash_on_delivery");
  
  // Location
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const { data: deviceTypes } = trpc.devices.getTypes.useQuery();
  const { data: deviceModels } = trpc.devices.getModels.useQuery(
    { deviceTypeId: parseInt(selectedDeviceType) },
    { enabled: !!selectedDeviceType }
  );
  const { data: serviceTypes } = trpc.services.getTypes.useQuery();
  const { data: pricing } = trpc.services.getPrice.useQuery(
    {
      deviceModelId: parseInt(selectedModel),
      serviceTypeId: parseInt(selectedService),
    },
    { enabled: !!selectedModel && !!selectedService }
  );

  const createRequest = trpc.requests.create.useMutation({
    onSuccess: () => {
      toast.success("تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً");
      setLocation("/my-requests");
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء إرسال الطلب: " + error.message);
    },
  });

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ lat: latitude, lng: longitude });
          // Reverse geocode to get address
          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`)
            .then(res => res.json())
            .then(data => {
              if (data.results[0]) {
                setAddress(data.results[0].formatted_address);
              }
              setLocationLoading(false);
              toast.success("تم تحديد موقعك الحالي");
            })
            .catch(() => {
              setLocationLoading(false);
              toast.error("فشل في الحصول على العنوان");
            });
        },
        (error) => {
          setLocationLoading(false);
          toast.error("فشل في الحصول على الموقع. الرجاء التأكد من تفعيل خدمات الموقع");
        }
      );
    } else {
      setLocationLoading(false);
      toast.error("المتصفح لا يدعم خدمات الموقع");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    if (!selectedModel || !selectedService || !address || !city || !phoneNumber) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
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

  const formatPrice = (priceInCents: number) => {
    return (priceInCents / 100).toFixed(2);
  };

  const canProceedToStep2 = selectedDeviceType && selectedModel && selectedService;
  const canProceedToStep3 = canProceedToStep2 && address && city && phoneNumber;

  const getBrandLogo = (modelName: string) => {
    const lowerModel = modelName.toLowerCase();
    if (lowerModel.includes('iphone') || lowerModel.includes('ipad') || lowerModel.includes('macbook')) {
      return '/brands/apple.png';
    } else if (lowerModel.includes('samsung') || lowerModel.includes('galaxy')) {
      return '/brands/samsung.png';
    } else if (lowerModel.includes('huawei')) {
      return '/brands/huawei.png';
    } else if (lowerModel.includes('dell')) {
      return '/brands/dell.png';
    } else if (lowerModel.includes('hp')) {
      return '/brands/hp.png';
    } else if (lowerModel.includes('lenovo')) {
      return '/brands/lenovo.png';
    } else if (lowerModel.includes('xiaomi') || lowerModel.includes('redmi')) {
      return '/brands/xiaomi.png';
    } else if (lowerModel.includes('oppo')) {
      return '/brands/oppo.png';
    } else if (lowerModel.includes('vivo')) {
      return '/brands/vivo.png';
    }
    return null;
  };

  const getDeviceIcon = (deviceTypeName: string) => {
    const lower = deviceTypeName.toLowerCase();
    if (lower.includes('phone') || lower.includes('هاتف')) {
      return <Smartphone className="h-6 w-6" />;
    } else if (lower.includes('laptop') || lower.includes('حاسوب')) {
      return <Laptop className="h-6 w-6" />;
    } else if (lower.includes('tablet') || lower.includes('لوحي')) {
      return <Tablet className="h-6 w-6" />;
    }
    return <Smartphone className="h-6 w-6" />;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={APP_LOGO} alt="Fixate" className="h-10 w-auto dark:brightness-200" />
                <span className="text-2xl font-bold text-foreground">Fixate</span>
              </div>
            </Link>
            {isAuthenticated && (
              <Link href="/my-requests">
                <Button variant="outline">طلباتي</Button>
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
              احجز خدمة الإصلاح
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              املأ النموذج وسنتواصل معك لتأكيد الموعد
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
                    <span className={`mt-2 text-sm font-medium ${currentStep >= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step === 1 && 'معلومات الجهاز'}
                      {step === 2 && 'الموقع والتواصل'}
                      {step === 3 && 'التأكيد'}
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
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold">نوع الجهاز *</Label>
                      <RadioGroup value={selectedDeviceType} onValueChange={setSelectedDeviceType}>
                        <div className="grid md:grid-cols-3 gap-4">
                          {deviceTypes?.map((device) => (
                            <div key={device.id}>
                              <RadioGroupItem value={device.id.toString()} id={`device-${device.id}`} className="peer sr-only" />
                              <Label
                                htmlFor={`device-${device.id}`}
                                className="flex flex-col items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                              >
                                <div className="text-primary mb-3">
                                  {getDeviceIcon(device.nameAr)}
                                </div>
                                <span className="font-semibold text-center">{device.nameAr}</span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {selectedDeviceType && deviceModels && deviceModels.length > 0 && (
                      <div className="space-y-3">
                        <Label className="text-lg font-semibold">موديل الجهاز *</Label>
                        <RadioGroup value={selectedModel} onValueChange={setSelectedModel}>
                          <div className="grid md:grid-cols-2 gap-3">
                            {deviceModels.map((model) => {
                              const brandLogo = getBrandLogo(model.modelNameAr);
                              return (
                                <div key={model.id}>
                                  <RadioGroupItem value={model.id.toString()} id={`model-${model.id}`} className="peer sr-only" />
                                  <Label
                                    htmlFor={`model-${model.id}`}
                                    className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                                  >
                                    {brandLogo && (
                                      <img src={brandLogo} alt="" className="h-10 w-10 object-contain" />
                                    )}
                                    <span className="font-medium">{model.modelNameAr}</span>
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {selectedModel && serviceTypes && serviceTypes.length > 0 && (
                      <div className="space-y-3">
                        <Label className="text-lg font-semibold">نوع الخدمة *</Label>
                        <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                          <div className="grid md:grid-cols-2 gap-3">
                            {serviceTypes.map((service) => (
                              <div key={service.id}>
                                <RadioGroupItem value={service.id.toString()} id={`service-${service.id}`} className="peer sr-only" />
                                <Label
                                  htmlFor={`service-${service.id}`}
                                  className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                                >
                                  <span className="font-medium">{service.nameAr}</span>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {pricing && (
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-foreground">السعر المتوقع:</span>
                          <span className="text-3xl font-bold text-primary">{formatPrice(pricing.priceInSAR * 100)} ريال</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="issue-description" className="text-base font-semibold">وصف المشكلة (اختياري)</Label>
                      <Textarea
                        id="issue-description"
                        placeholder="اشرح المشكلة بالتفصيل..."
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedToStep2}
                    className="px-8 rounded-full"
                  >
                    التالي
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Location & Contact */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold">نوع الخدمة *</Label>
                      <RadioGroup value={serviceMode} onValueChange={(v) => setServiceMode(v as "express" | "pickup")}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <RadioGroupItem value="express" id="express" className="peer sr-only" />
                            <Label
                              htmlFor="express"
                              className="flex flex-col p-6 border-2 rounded-2xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                            >
                              <span className="text-lg font-semibold mb-2">خدمة سريعة (Express)</span>
                              <span className="text-sm text-muted-foreground">فني يصلك في موقعك ويصلح الجهاز أمامك</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" />
                            <Label
                              htmlFor="pickup"
                              className="flex flex-col p-6 border-2 rounded-2xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                            >
                              <span className="text-lg font-semibold mb-2">استلام وتوصيل (Pickup)</span>
                              <span className="text-sm text-muted-foreground">نستلم جهازك ونعيده لك بعد الإصلاح</span>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-semibold">رقم الجوال *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="05XXXXXXXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="text-lg h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-base font-semibold">المدينة *</Label>
                      <RadioGroup value={city} onValueChange={setCity}>
                        <div className="grid md:grid-cols-3 gap-3">
                          {['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة', 'الخبر'].map((cityName) => (
                            <div key={cityName}>
                              <RadioGroupItem value={cityName} id={`city-${cityName}`} className="peer sr-only" />
                              <Label
                                htmlFor={`city-${cityName}`}
                                className="flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                              >
                                <span className="font-medium">{cityName}</span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="address" className="text-base font-semibold">العنوان *</Label>
                      
                      {/* Location Buttons */}
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={getCurrentLocation}
                          disabled={locationLoading}
                          className="flex-1 h-12"
                        >
                          {locationLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin ml-2" />
                          ) : (
                            <Navigation className="h-5 w-5 ml-2" />
                          )}
                          موقعي الحالي
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowMap(!showMap)}
                          className="flex-1 h-12"
                        >
                          <MapIcon className="h-5 w-5 ml-2" />
                          اختر من الخريطة
                        </Button>
                      </div>

                      <Input
                        id="address"
                        placeholder="الحي، الشارع، رقم المبنى..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="text-lg h-12"
                      />

                      {/* Map */}
                      {showMap && (
                        <div className="border rounded-xl overflow-hidden">
                          <div style={{ height: '400px' }}>
                            <MapView
                              onMapReady={(map: any) => {
                                // Map is ready, user can interact
                                map.addListener('click', (e: any) => {
                                  const lat = e.latLng.lat();
                                  const lng = e.latLng.lng();
                                  setSelectedLocation({ lat, lng });
                                  
                                  // Reverse geocode
                                  const geocoder = new google.maps.Geocoder();
                                  geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
                                    if (status === 'OK' && results[0]) {
                                      setAddress(results[0].formatted_address);
                                      toast.success("تم تحديد الموقع");
                                    }
                                  });
                                });

                                // Add marker if location is selected
                                if (selectedLocation) {
                                  new google.maps.marker.AdvancedMarkerElement({
                                    position: selectedLocation,
                                    map: map,
                                  });
                                }
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time-slot" className="text-base font-semibold">الوقت المفضل (اختياري)</Label>
                      <Input
                        id="time-slot"
                        type="text"
                        placeholder="مثال: صباحاً من 9 إلى 12"
                        value={preferredTimeSlot}
                        onChange={(e) => setPreferredTimeSlot(e.target.value)}
                        className="text-lg h-12"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep(1)}
                    className="px-8 rounded-full"
                  >
                    السابق
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => setCurrentStep(3)}
                    disabled={!canProceedToStep3}
                    className="px-8 rounded-full"
                  >
                    التالي
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold">طريقة الدفع *</Label>
                      <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "cash_on_delivery" | "bank_transfer")}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <RadioGroupItem value="cash_on_delivery" id="cash" className="peer sr-only" />
                            <Label
                              htmlFor="cash"
                              className="flex flex-col p-6 border-2 rounded-2xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                            >
                              <span className="text-lg font-semibold mb-2">الدفع عند الاستلام</span>
                              <span className="text-sm text-muted-foreground">ادفع نقداً عند إتمام الخدمة</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="bank_transfer" id="transfer" className="peer sr-only" />
                            <Label
                              htmlFor="transfer"
                              className="flex flex-col p-6 border-2 rounded-2xl cursor-pointer transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                            >
                              <span className="text-lg font-semibold mb-2">تحويل بنكي</span>
                              <span className="text-sm text-muted-foreground">سيتم إرسال تفاصيل التحويل بعد التأكيد</span>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Summary */}
                    <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                      <h3 className="text-xl font-semibold mb-4">ملخص الطلب</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">نوع الجهاز:</span>
                          <span className="font-medium">
                            {deviceTypes?.find(d => d.id.toString() === selectedDeviceType)?.nameAr}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">الموديل:</span>
                          <span className="font-medium">
                            {deviceModels?.find(m => m.id.toString() === selectedModel)?.modelNameAr}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">الخدمة:</span>
                          <span className="font-medium">
                            {serviceTypes?.find(s => s.id.toString() === selectedService)?.nameAr}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">نوع الخدمة:</span>
                          <span className="font-medium">{serviceMode === 'express' ? 'خدمة سريعة' : 'استلام وتوصيل'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">المدينة:</span>
                          <span className="font-medium">{city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">رقم الجوال:</span>
                          <span className="font-medium">{phoneNumber}</span>
                        </div>
                        {pricing && (
                          <>
                            <div className="border-t pt-3 mt-3"></div>
                            <div className="flex justify-between text-lg">
                              <span className="font-semibold">السعر المتوقع:</span>
                              <span className="font-bold text-primary text-2xl">{formatPrice(pricing.priceInSAR * 100)} ريال</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep(2)}
                    className="px-8 rounded-full"
                  >
                    السابق
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={createRequest.isPending}
                    className="px-8 rounded-full"
                  >
                    {createRequest.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin ml-2" />
                        جاري الإرسال...
                      </>
                    ) : (
                      'تأكيد الطلب'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
