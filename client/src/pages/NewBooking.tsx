import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Monitor,
  MapPin, 
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Phone,
  User,
  Navigation
} from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface BookingData {
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  issue: string;
  serviceType: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  date: string;
  time: string;
  latitude?: number;
  longitude?: number;
}

export default function NewBooking() {
  const { language } = useLanguage();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    deviceType: "",
    deviceBrand: "",
    deviceModel: "",
    issue: "",
    serviceType: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    date: "",
    time: ""
  });

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast({
        title: language === 'ar' ? "يجب تسجيل الدخول" : "Login Required",
        description: language === 'ar' ? "يجب تسجيل الدخول أولاً للحجز" : "You must login first to book a service",
        variant: "destructive"
      });
      setTimeout(() => {
        setLocation("/login");
      }, 2000);
    }
  }, []);

  const content = {
    ar: {
      title: "احجز خدمة الإصلاح",
      subtitle: "خطوات بسيطة للحصول على خدمة احترافية",
      step1: "نوع الجهاز",
      step2: "نوع الخدمة والمشكلة",
      step3: "معلومات التواصل",
      step4: "الموعد والموقع",
      selectDevice: "اختر نوع الجهاز",
      phone: "هاتف",
      laptop: "لابتوب",
      tablet: "تابلت",
      other: "أخرى",
      selectBrand: "اختر الماركة",
      selectModel: "اختر الموديل",
      selectIssue: "ما هي المشكلة؟",
      screenIssue: "مشكلة في الشاشة",
      batteryIssue: "مشكلة في البطارية",
      chargingIssue: "مشكلة في الشحن",
      cameraIssue: "مشكلة في الكاميرا",
      softwareIssue: "مشكلة في البرامج",
      otherIssue: "مشكلة أخرى",
      serviceType: "نوع الخدمة",
      homeService: "فني متنقل (يأتي إليك)",
      pickupService: "استلام وتوصيل",
      yourName: "الاسم الكامل",
      yourPhone: "رقم الجوال",
      yourAddress: "العنوان",
      getCurrentLocation: "استخدام موقعي الحالي",
      selectCity: "اختر المدينة",
      riyadh: "الرياض",
      jeddah: "جدة",
      dammam: "الدمام",
      selectDate: "اختر التاريخ",
      selectTime: "اختر الوقت",
      morning: "صباحاً (9 ص - 12 م)",
      afternoon: "ظهراً (12 م - 3 م)",
      evening: "مساءً (3 م - 6 م)",
      next: "التالي",
      previous: "السابق",
      submit: "إرسال الطلب",
      submitting: "جاري الإرسال...",
      success: "تم إرسال طلبك بنجاح!",
      successDesc: "سيتم التواصل معك قريباً من قبل أحد الفنيين",
      backHome: "العودة للرئيسية",
      locationError: "تعذر الحصول على الموقع",
      locationSuccess: "تم الحصول على موقعك"
    },
    en: {
      title: "Book Repair Service",
      subtitle: "Simple steps to get professional service",
      step1: "Device Type",
      step2: "Service Type & Issue",
      step3: "Contact Information",
      step4: "Appointment & Location",
      selectDevice: "Select Device Type",
      phone: "Phone",
      laptop: "Laptop",
      tablet: "Tablet",
      other: "Other",
      selectBrand: "Select Brand",
      selectModel: "Select Model",
      selectIssue: "What's the issue?",
      screenIssue: "Screen Issue",
      batteryIssue: "Battery Issue",
      chargingIssue: "Charging Issue",
      cameraIssue: "Camera Issue",
      softwareIssue: "Software Issue",
      otherIssue: "Other Issue",
      serviceType: "Service Type",
      homeService: "Mobile Technician (Comes to you)",
      pickupService: "Pickup & Delivery",
      yourName: "Full Name",
      yourPhone: "Phone Number",
      yourAddress: "Address",
      getCurrentLocation: "Use My Current Location",
      selectCity: "Select City",
      riyadh: "Riyadh",
      jeddah: "Jeddah",
      dammam: "Dammam",
      selectDate: "Select Date",
      selectTime: "Select Time",
      morning: "Morning (9 AM - 12 PM)",
      afternoon: "Afternoon (12 PM - 3 PM)",
      evening: "Evening (3 PM - 6 PM)",
      next: "Next",
      previous: "Previous",
      submit: "Submit Request",
      submitting: "Submitting...",
      success: "Your request has been submitted successfully!",
      successDesc: "You will be contacted soon by one of our technicians",
      backHome: "Back to Home",
      locationError: "Could not get location",
      locationSuccess: "Location obtained"
    }
  };

  const t = content[language as keyof typeof content];

  const devices = [
    { icon: Smartphone, label: t.phone, value: "phone" },
    { icon: Laptop, label: t.laptop, value: "laptop" },
    { icon: Tablet, label: t.tablet, value: "tablet" },
    { icon: Monitor, label: t.other, value: "other" }
  ];

  const brands = {
    phone: ["Apple", "Samsung", "Huawei", "Xiaomi", "Oppo", "Vivo"],
    laptop: ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer"],
    tablet: ["Apple", "Samsung", "Huawei", "Lenovo"],
    other: [language === 'ar' ? "أخرى" : "Other"]
  };

  const issues = [
    { label: t.screenIssue, value: "screen" },
    { label: t.batteryIssue, value: "battery" },
    { label: t.chargingIssue, value: "charging" },
    { label: t.cameraIssue, value: "camera" },
    { label: t.softwareIssue, value: "software" },
    { label: t.otherIssue, value: "other" }
  ];

  const cities = [
    { label: t.riyadh, value: "riyadh" },
    { label: t.jeddah, value: "jeddah" },
    { label: t.dammam, value: "dammam" }
  ];

  const times = [
    { label: t.morning, value: "morning" },
    { label: t.afternoon, value: "afternoon" },
    { label: t.evening, value: "evening" }
  ];

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Use reverse geocoding to get address
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${language}`
            );
            const data = await response.json();
            
            setBookingData({
              ...bookingData,
              address: data.display_name || `${latitude}, ${longitude}`,
              latitude,
              longitude
            });
            
            toast({
              title: t.locationSuccess,
              description: data.display_name || `${latitude}, ${longitude}`
            });
          } catch (error) {
            setBookingData({
              ...bookingData,
              address: `${latitude}, ${longitude}`,
              latitude,
              longitude
            });
          }
          
          setIsLoadingLocation(false);
        },
        (error) => {
          toast({
            title: t.locationError,
            description: error.message,
            variant: "destructive"
          });
          setIsLoadingLocation(false);
        }
      );
    } else {
      toast({
        title: t.locationError,
        description: "Geolocation is not supported",
        variant: "destructive"
      });
      setIsLoadingLocation(false);
    }
  };

  const handleSubmit = async () => {
    // Here you would send the data to your backend
    console.log("Booking data:", bookingData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success and redirect
    setStep(5);
    setTimeout(() => {
      setLocation("/");
    }, 3000);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return bookingData.deviceType && bookingData.deviceBrand;
      case 2:
        return bookingData.issue && bookingData.serviceType;
      case 3:
        return bookingData.name && bookingData.phone;
      case 4:
        return bookingData.city && bookingData.date && bookingData.time && bookingData.address;
      default:
        return false;
    }
  };

  if (step === 5) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
        <Card className="max-w-md w-full text-center border-2 border-emerald-200">
          <CardContent className="pt-12 pb-8">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">{t.success}</h2>
            <p className="text-muted-foreground mb-8">{t.successDesc}</p>
            <Button 
              onClick={() => setLocation("/")}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg"
            >
              {t.backHome}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-emerald-50/30 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-600 mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-all ${
                s <= step 
                  ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white scale-110 shadow-lg" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {s}
              </div>
              {s < 4 && (
                <div className={`h-1 flex-1 mx-2 rounded ${
                  s < step ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="border-2 border-emerald-100 shadow-xl">
          <CardContent className="p-8 md:p-12">
            {/* Step 1: Device Type */}
            {step === 1 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-emerald-600">{t.step1}</h2>
                
                <div>
                  <Label className="text-lg mb-4 block">{t.selectDevice}</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {devices.map((device) => {
                      const Icon = device.icon;
                      return (
                        <button
                          key={device.value}
                          onClick={() => setBookingData({ ...bookingData, deviceType: device.value, deviceBrand: "", deviceModel: "" })}
                          className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                            bookingData.deviceType === device.value
                              ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg"
                              : "border-border hover:border-emerald-300"
                          }`}
                        >
                          <Icon className={`h-12 w-12 mx-auto mb-3 ${
                            bookingData.deviceType === device.value ? "text-emerald-600" : "text-muted-foreground"
                          }`} />
                          <p className="font-semibold text-center">{device.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {bookingData.deviceType && (
                  <div>
                    <Label className="text-lg mb-4 block">{t.selectBrand}</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {brands[bookingData.deviceType as keyof typeof brands].map((brand) => (
                        <button
                          key={brand}
                          onClick={() => setBookingData({ ...bookingData, deviceBrand: brand })}
                          className={`p-4 rounded-xl border-2 transition-all hover:scale-105 font-semibold ${
                            bookingData.deviceBrand === brand
                              ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 shadow-md"
                              : "border-border hover:border-emerald-300"
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Service Type & Issue */}
            {step === 2 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-emerald-600">{t.step2}</h2>
                
                <div>
                  <Label className="text-lg mb-4 block">{t.serviceType}</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setBookingData({ ...bookingData, serviceType: "home" })}
                      className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 text-start ${
                        bookingData.serviceType === "home"
                          ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg"
                          : "border-border hover:border-emerald-300"
                      }`}
                    >
                      <MapPin className={`h-8 w-8 mb-3 ${
                        bookingData.serviceType === "home" ? "text-emerald-600" : "text-muted-foreground"
                      }`} />
                      <p className="font-bold text-lg mb-1">{t.homeService}</p>
                    </button>
                    <button
                      onClick={() => setBookingData({ ...bookingData, serviceType: "pickup" })}
                      className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 text-start ${
                        bookingData.serviceType === "pickup"
                          ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg"
                          : "border-border hover:border-emerald-300"
                      }`}
                    >
                      <MapPin className={`h-8 w-8 mb-3 ${
                        bookingData.serviceType === "pickup" ? "text-emerald-600" : "text-muted-foreground"
                      }`} />
                      <p className="font-bold text-lg mb-1">{t.pickupService}</p>
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="text-lg mb-4 block">{t.selectIssue}</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {issues.map((issue) => (
                      <button
                        key={issue.value}
                        onClick={() => setBookingData({ ...bookingData, issue: issue.value })}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 font-semibold text-start ${
                          bookingData.issue === issue.value
                            ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 shadow-md"
                            : "border-border hover:border-emerald-300"
                        }`}
                      >
                        {issue.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-emerald-600">{t.step3}</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-lg mb-3 block">{t.yourName}</Label>
                    <div className="relative">
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600" />
                      <Input
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        className="h-14 text-lg pr-12 border-2 border-emerald-200 focus:border-emerald-500"
                        placeholder={language === 'ar' ? "أحمد محمد" : "Ahmed Mohammed"}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg mb-3 block">{t.yourPhone}</Label>
                    <div className="relative">
                      <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600" />
                      <Input
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        className="h-14 text-lg pr-12 border-2 border-emerald-200 focus:border-emerald-500"
                        placeholder="+966 50 123 4567"
                        type="tel"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Appointment & Location */}
            {step === 4 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-emerald-600">{t.step4}</h2>
                
                <div>
                  <Label className="text-lg mb-4 block">{t.selectCity}</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {cities.map((city) => (
                      <button
                        key={city.value}
                        onClick={() => setBookingData({ ...bookingData, city: city.value })}
                        className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 font-bold text-lg ${
                          bookingData.city === city.value
                            ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 shadow-lg"
                            : "border-border hover:border-emerald-300"
                        }`}
                      >
                        {city.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-lg">{t.yourAddress}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={getCurrentLocation}
                      disabled={isLoadingLocation}
                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Navigation className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                      {isLoadingLocation ? "..." : t.getCurrentLocation}
                    </Button>
                  </div>
                  <Textarea
                    value={bookingData.address}
                    onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                    className="min-h-[100px] text-lg border-2 border-emerald-200 focus:border-emerald-500"
                    placeholder={language === 'ar' ? "الحي، الشارع، رقم المبنى..." : "District, Street, Building number..."}
                  />
                </div>

                <div>
                  <Label className="text-lg mb-3 block">{t.selectDate}</Label>
                  <div className="relative">
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600" />
                    <Input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      className="h-14 text-lg pr-12 border-2 border-emerald-200 focus:border-emerald-500"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-lg mb-4 block">{t.selectTime}</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {times.map((time) => (
                      <button
                        key={time.value}
                        onClick={() => setBookingData({ ...bookingData, time: time.value })}
                        className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                          bookingData.time === time.value
                            ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg"
                            : "border-border hover:border-emerald-300"
                        }`}
                      >
                        <Clock className={`h-6 w-6 mx-auto mb-2 ${
                          bookingData.time === time.value ? "text-emerald-600" : "text-muted-foreground"
                        }`} />
                        <p className="font-semibold text-center text-sm">{time.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-12">
              {step > 1 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  variant="outline"
                  className="flex-1 h-14 text-lg border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                >
                  {language === 'ar' ? <ArrowRight className="ml-2 h-5 w-5" /> : <ArrowLeft className="mr-2 h-5 w-5" />}
                  {t.previous}
                </Button>
              )}
              
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="flex-1 h-14 text-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg"
                >
                  {t.next}
                  {language === 'ar' ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="flex-1 h-14 text-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg"
                >
                  <CheckCircle2 className={language === 'ar' ? "mr-2 h-5 w-5" : "ml-2 h-5 w-5"} />
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
