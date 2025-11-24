import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { APP_LOGO } from "@/const";
import { toast } from "sonner";

export default function ServiceRequest() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={APP_LOGO} alt="Fixate" className="h-10 w-auto" />
                <span className="text-2xl font-bold text-primary">Fixate</span>
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              احجز خدمة الإصلاح
            </h1>
            <p className="text-lg text-gray-600">
              املأ النموذج وسنتواصل معك لتأكيد الموعد
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>معلومات الجهاز</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="device-type">نوع الجهاز *</Label>
                  <Select value={selectedDeviceType} onValueChange={setSelectedDeviceType}>
                    <SelectTrigger id="device-type">
                      <SelectValue placeholder="اختر نوع الجهاز" />
                    </SelectTrigger>
                    <SelectContent>
                      {deviceTypes?.map((device) => (
                        <SelectItem key={device.id} value={device.id.toString()}>
                          {device.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedDeviceType && (
                  <div className="space-y-2">
                    <Label htmlFor="device-model">موديل الجهاز *</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger id="device-model">
                        <SelectValue placeholder="اختر موديل الجهاز" />
                      </SelectTrigger>
                      <SelectContent>
                        {deviceModels?.map((model) => (
                          <SelectItem key={model.id} value={model.id.toString()}>
                            {model.modelNameAr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedModel && (
                  <div className="space-y-2">
                    <Label htmlFor="service-type">نوع الخدمة *</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger id="service-type">
                        <SelectValue placeholder="اختر نوع الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes?.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.nameAr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="issue-description">وصف المشكلة (اختياري)</Label>
                  <Textarea
                    id="issue-description"
                    placeholder="اشرح المشكلة بالتفصيل..."
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>نوع الخدمة</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={serviceMode} onValueChange={(v) => setServiceMode(v as "express" | "pickup")}>
                  <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg mb-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="font-semibold">خدمة سريعة (Express)</div>
                      <div className="text-sm text-gray-600">فني يصلك في موقعك ويصلح الجهاز أمامك</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="font-semibold">استلام وتوصيل (Pickup)</div>
                      <div className="text-sm text-gray-600">نستلم جهازك ونعيده لك بعد الإصلاح</div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>معلومات التواصل والموقع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الجوال *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="05XXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">المدينة *</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger id="city">
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الرياض">الرياض</SelectItem>
                      <SelectItem value="جدة">جدة</SelectItem>
                      <SelectItem value="الدمام">الدمام</SelectItem>
                      <SelectItem value="مكة">مكة المكرمة</SelectItem>
                      <SelectItem value="المدينة">المدينة المنورة</SelectItem>
                      <SelectItem value="الخبر">الخبر</SelectItem>
                      <SelectItem value="الطائف">الطائف</SelectItem>
                      <SelectItem value="تبوك">تبوك</SelectItem>
                      <SelectItem value="أبها">أبها</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">العنوان بالتفصيل *</Label>
                  <Textarea
                    id="address"
                    placeholder="الحي، الشارع، رقم المبنى..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-slot">الوقت المفضل</Label>
                  <Select value={preferredTimeSlot} onValueChange={setPreferredTimeSlot}>
                    <SelectTrigger id="time-slot">
                      <SelectValue placeholder="اختر الوقت المفضل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">صباحاً (9 ص - 12 م)</SelectItem>
                      <SelectItem value="afternoon">ظهراً (12 م - 5 م)</SelectItem>
                      <SelectItem value="evening">مساءً (5 م - 9 م)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {pricing && (
              <>
              <Card className="mb-6">
              <CardHeader>
                <CardTitle>طريقة الدفع</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "cash_on_delivery" | "bank_transfer")}>
                  <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg mb-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="cash_on_delivery" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="font-semibold">الدفع عند الاستلام</div>
                      <div className="text-sm text-gray-600">ادفع نقداً عند استلام جهازك</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="bank_transfer" id="transfer" />
                    <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                      <div className="font-semibold">تحويل بنكي</div>
                      <div className="text-sm text-gray-600">احجز الآن وحوّل لاحقاً (سنرسل لك تفاصيل الحساب)</div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="mb-6 border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">التكلفة الإجمالية</p>
                      <p className="text-3xl font-bold text-primary">
                        {formatPrice(pricing.priceInSAR)} ريال
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        شامل ضريبة القيمة المضافة • ضمان {pricing.warrantyDays} يوم
                      </p>
                    </div>
                    <CheckCircle2 className="h-12 w-12 text-primary" />
                  </div>
                </CardContent>
              </Card>
              </>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={createRequest.isPending || !pricing}
            >
              {createRequest.isPending ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  تأكيد الحجز
                  <ArrowRight className="mr-2 h-5 w-5" />
                </>
              )}
            </Button>

            {!isAuthenticated && (
              <p className="text-center text-sm text-gray-600 mt-4">
                سيتم توجيهك لتسجيل الدخول قبل إتمام الحجز
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
