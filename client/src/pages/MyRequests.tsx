import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Logo from "@/components/Logo";
import { Loader2, Package, Clock, CheckCircle2, XCircle, User } from "lucide-react";
import { Link } from "wouter";

const statusConfig = {
  pending: { label: "قيد الانتظار", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "تم التأكيد", color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
  technician_assigned: { label: "تم تعيين فني", color: "bg-purple-100 text-purple-800", icon: User },
  in_progress: { label: "جاري العمل", color: "bg-orange-100 text-orange-800", icon: Package },
  completed: { label: "مكتمل", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-800", icon: XCircle },
};

export default function MyRequests() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { data: requests, isLoading } = trpc.requests.getUserRequests.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const formatPrice = (priceInCents: number | null) => {
    if (!priceInCents) return "---";
    return (priceInCents / 100).toFixed(2);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "---";
    return new Date(date).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">مرحباً، {user?.name}</span>
              <Link href="/request">
                <Button>طلب جديد</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              طلباتي
            </h1>
            <p className="text-lg text-gray-600">
              تتبع حالة طلبات الإصلاح الخاصة بك
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : requests && requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => {
                const status = statusConfig[request.status];
                const StatusIcon = status.icon;

                return (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            طلب رقم #{request.id}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge className={status.color}>
                              <StatusIcon className="h-3 w-3 ml-1" />
                              {status.label}
                            </Badge>
                            {request.serviceMode === "express" && (
                              <Badge variant="outline">خدمة سريعة</Badge>
                            )}
                            {request.serviceMode === "pickup" && (
                              <Badge variant="outline">استلام وتوصيل</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-primary">
                            {formatPrice(request.totalAmount)} ريال
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(request.createdAt)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">الموقع</p>
                          <p className="font-medium">{request.city}</p>
                          <p className="text-sm text-gray-600">{request.address}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">رقم التواصل</p>
                          <p className="font-medium">{request.phoneNumber}</p>
                        </div>
                        {request.preferredTimeSlot && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">الوقت المفضل</p>
                            <p className="font-medium">
                              {request.preferredTimeSlot === "morning" && "صباحاً (9 ص - 12 م)"}
                              {request.preferredTimeSlot === "afternoon" && "ظهراً (12 م - 5 م)"}
                              {request.preferredTimeSlot === "evening" && "مساءً (5 م - 9 م)"}
                            </p>
                          </div>
                        )}
                        {request.issueDescription && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-600 mb-1">وصف المشكلة</p>
                            <p className="text-sm">{request.issueDescription}</p>
                          </div>
                        )}
                      </div>

                      {request.status === "completed" && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm text-green-600 font-medium">
                            ✓ تم إكمال الإصلاح بنجاح
                          </p>
                          {request.completedAt && (
                            <p className="text-sm text-gray-600">
                              تاريخ الإكمال: {formatDate(request.completedAt)}
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  لا توجد طلبات بعد
                </h3>
                <p className="text-gray-600 mb-6">
                  ابدأ بإنشاء أول طلب إصلاح لجهازك
                </p>
                <Link href="/request">
                  <Button size="lg">طلب خدمة إصلاح</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
