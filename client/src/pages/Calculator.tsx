import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Loader2, Calculator as CalculatorIcon, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Logo from "@/components/Logo";

export default function Calculator() {
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");

  const { data: deviceTypes, isLoading: loadingDevices } = trpc.devices.getTypes.useQuery();
  
  const { data: deviceModels, isLoading: loadingModels } = trpc.devices.getModels.useQuery(
    { deviceTypeId: parseInt(selectedDeviceType) },
    { enabled: !!selectedDeviceType }
  );

  const { data: serviceTypes, isLoading: loadingServices } = trpc.services.getTypes.useQuery();

  const { data: pricing, isLoading: loadingPrice } = trpc.services.getPrice.useQuery(
    {
      deviceModelId: parseInt(selectedModel),
      serviceTypeId: parseInt(selectedService),
    },
    { enabled: !!selectedModel && !!selectedService }
  );

  const formatPrice = (priceInCents: number) => {
    return (priceInCents / 100).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <Logo />
              </div>
            </Link>
            <Link href="/request">
              <Button>احجز الآن</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <CalculatorIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              حاسبة الأسعار
            </h1>
            <p className="text-lg text-gray-600">
              احصل على سعر دقيق لإصلاح جهازك في ثوانٍ
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>اختر جهازك والخدمة المطلوبة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Device Type */}
              <div className="space-y-2">
                <Label htmlFor="device-type">نوع الجهاز</Label>
                {loadingDevices ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
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
                )}
              </div>

              {/* Device Model */}
              {selectedDeviceType && (
                <div className="space-y-2">
                  <Label htmlFor="device-model">موديل الجهاز</Label>
                  {loadingModels ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
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
                  )}
                </div>
              )}

              {/* Service Type */}
              {selectedModel && (
                <div className="space-y-2">
                  <Label htmlFor="service-type">نوع الخدمة</Label>
                  {loadingServices ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
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
                  )}
                </div>
              )}

              {/* Price Display */}
              {selectedService && (
                <div className="mt-8 p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                  {loadingPrice ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : pricing ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">السعر الإجمالي</p>
                      <p className="text-4xl font-bold text-primary mb-2">
                        {formatPrice(pricing.priceInSAR)} ريال
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        يشمل قطع الغيار وأجرة الفني
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span>ضمان {pricing.warrantyDays} يوم</span>
                      </div>
                      <Link href="/request">
                        <Button className="mt-6 w-full" size="lg">
                          احجز الآن
                          <ArrowRight className="mr-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      <p>عذراً، هذه الخدمة غير متوفرة حالياً لهذا الموديل</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>الأسعار شاملة ضريبة القيمة المضافة</p>
            <p className="mt-2">جميع الإصلاحات تأتي مع ضمان على قطع الغيار والخدمة</p>
          </div>
        </div>
      </div>
    </div>
  );
}
