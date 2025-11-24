import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { ArrowRight, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLocation, useSearch } from "wouter";

export default function Payment() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const requestId = params.get("requestId");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  const { data: request, isLoading: requestLoading } = trpc.requests.getById.useQuery(
    { requestId: Number(requestId) },
    { enabled: !!requestId }
  );

  if (authLoading || requestLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">تسجيل الدخول مطلوب</h2>
          <p className="text-muted-foreground mb-6">
            يجب تسجيل الدخول لإتمام عملية الدفع
          </p>
          <Button onClick={() => setLocation("/")}>
            العودة للرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  if (!requestId || !request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">طلب غير موجود</h2>
          <p className="text-muted-foreground mb-6">
            لم يتم العثور على الطلب المطلوب
          </p>
          <Button onClick={() => setLocation("/my-requests")}>
            طلباتي
          </Button>
        </Card>
      </div>
    );
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      alert("يرجى إدخال جميع البيانات");
      return;
    }

    setProcessing(true);

    try {
      // In production, integrate with Moyasar API
      // For now, simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful payment
      console.log("[Payment] Processing payment for request:", requestId);
      console.log("[Payment] Amount:", request.totalAmount, "SAR");
      console.log("[Payment] Card:", cardNumber.slice(-4));

      // TODO: Call actual Moyasar API
      // const response = await fetch('https://api.moyasar.com/v1/payments', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Basic ${btoa(MOYASAR_API_KEY + ':')}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     amount: request.totalAmount * 100, // Amount in halalas
      //     currency: 'SAR',
      //     description: `Payment for request #${requestId}`,
      //     source: {
      //       type: 'creditcard',
      //       name: cardName,
      //       number: cardNumber,
      //       cvc: cvv,
      //       month: expiryDate.split('/')[0],
      //       year: '20' + expiryDate.split('/')[1],
      //     },
      //     callback_url: `${window.location.origin}/payment-callback`,
      //   }),
      // });

      alert("تم الدفع بنجاح!");
      setLocation(`/my-requests`);
    } catch (error) {
      console.error("[Payment] Error:", error);
      alert("حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">الدفع الإلكتروني</h1>
            <Button variant="ghost" onClick={() => setLocation("/my-requests")}>
              <ArrowRight className="ml-2" />
              طلباتي
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Form */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">بيانات البطاقة</h2>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <Label htmlFor="cardName">اسم حامل البطاقة</Label>
                <Input
                  id="cardName"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="الاسم كما هو مكتوب على البطاقة"
                  required
                  disabled={processing}
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">رقم البطاقة</Label>
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 16) {
                      setCardNumber(value.replace(/(\d{4})/g, "$1 ").trim());
                    }
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                  disabled={processing}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                  <Input
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 4) {
                        const formatted = value.length >= 2 
                          ? `${value.slice(0, 2)}/${value.slice(2)}`
                          : value;
                        setExpiryDate(formatted);
                      }
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                    disabled={processing}
                  />
                </div>

                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="password"
                    value={cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 3) {
                        setCvv(value);
                      }
                    }}
                    placeholder="123"
                    maxLength={3}
                    required
                    disabled={processing}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="ml-2 animate-spin" />
                    جاري المعالجة...
                  </>
                ) : (
                  <>
                    <CreditCard className="ml-2" />
                    ادفع {request.totalAmount} ريال
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              جميع المعاملات آمنة ومشفرة
            </p>
          </Card>

          {/* Order Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">ملخص الطلب</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم الطلب</span>
                <span className="font-medium">#{request.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">الحالة</span>
                <span className="font-medium">{request.status}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">طريقة الدفع</span>
                <span className="font-medium">بطاقة ائتمانية</span>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع</span>
                  <span className="text-primary">{request.totalAmount} ريال</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">معلومات مهمة</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• سيتم تأكيد الدفع فوراً</li>
                <li>• سيتم إرسال إشعار بالتأكيد</li>
                <li>• يمكنك متابعة حالة الطلب من صفحة طلباتي</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
