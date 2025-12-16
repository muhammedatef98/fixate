import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Logo from "@/components/Logo";
import { Loader2, Package, Clock, CheckCircle2, XCircle, User, MapPin, Phone, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const statusConfig = {
  pending: { labelAr: "قيد الانتظار", labelEn: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { labelAr: "تم التأكيد", labelEn: "Confirmed", color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
  technician_assigned: { labelAr: "تم تعيين فني", labelEn: "Technician Assigned", color: "bg-purple-100 text-purple-800", icon: User },
  in_progress: { labelAr: "جاري العمل", labelEn: "In Progress", color: "bg-orange-100 text-orange-800", icon: Package },
  completed: { labelAr: "مكتمل", labelEn: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  cancelled: { labelAr: "ملغي", labelEn: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
};

export default function MyRequests() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const { data: requests, isLoading } = trpc.requests.getUserRequests.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
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
    return new Date(date).toLocaleDateString(language === 'ar' ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusLabel = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    return language === 'ar' ? config.labelAr : config.labelEn;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo />
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {language === 'ar' ? `مرحباً، ${user?.name}` : `Hello, ${user?.name}`}
              </span>
              <Link href="/request">
                <Button className="font-semibold">
                  {language === 'ar' ? 'طلب جديد' : 'New Request'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {language === 'ar' ? 'طلباتي' : 'My Requests'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === 'ar' ? 'تتبع حالة طلبات الإصلاح الخاصة بك' : 'Track your repair requests'}
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : requests && requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => {
                const status = statusConfig[request.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;

                return (
                  <Card key={request.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl mb-3">
                            {language === 'ar' ? `طلب رقم #${request.id}` : `Request #${request.id}`}
                          </CardTitle>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={`${status.color} font-semibold`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {getStatusLabel(request.status)}
                            </Badge>
                            {request.serviceMode === "mobile" && (
                              <Badge variant="outline" className="font-semibold">
                                {language === 'ar' ? 'فني متنقل' : 'Mobile Technician'}
                              </Badge>
                            )}
                            {request.serviceMode === "pickup" && (
                              <Badge variant="outline" className="font-semibold">
                                {language === 'ar' ? 'استلام وتوصيل' : 'Pickup & Delivery'}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {formatPrice(request.totalAmount)} ر.س
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(request.createdAt)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Location */}
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground font-semibold">
                              {language === 'ar' ? 'الموقع' : 'Location'}
                            </p>
                            <p className="font-semibold text-foreground">{request.city}</p>
                            <p className="text-sm text-muted-foreground">{request.address}</p>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground font-semibold">
                              {language === 'ar' ? 'رقم التواصل' : 'Contact'}
                            </p>
                            <p className="font-semibold text-foreground">{request.phoneNumber}</p>
                          </div>
                        </div>

                        {/* Preferred Time */}
                        {request.preferredTimeSlot && (
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground font-semibold">
                                {language === 'ar' ? 'الوقت المفضل' : 'Preferred Time'}
                              </p>
                              <p className="font-semibold text-foreground">
                                {request.preferredTimeSlot}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Issue Description */}
                        {request.issueDescription && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-muted-foreground font-semibold mb-1">
                              {language === 'ar' ? 'وصف المشكلة' : 'Issue Description'}
                            </p>
                            <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                              {request.issueDescription}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Completion Info */}
                      {request.status === "completed" && (
                        <div className="mt-4 pt-4 border-t border-border bg-green-50/50 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="text-sm text-green-700 font-semibold">
                                {language === 'ar' ? '✓ تم إكمال الإصلاح بنجاح' : '✓ Repair completed successfully'}
                              </p>
                              {request.completedAt && (
                                <p className="text-sm text-muted-foreground">
                                  {language === 'ar' ? 'تاريخ الإكمال: ' : 'Completed on: '}{formatDate(request.completedAt)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-16 text-center">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {language === 'ar' ? 'لا توجد طلبات بعد' : 'No requests yet'}
                </h3>
                <p className="text-muted-foreground mb-8">
                  {language === 'ar' ? 'ابدأ بإنشاء أول طلب إصلاح لجهازك' : 'Create your first repair request'}
                </p>
                <Link href="/request">
                  <Button size="lg" className="font-semibold">
                    {language === 'ar' ? 'طلب خدمة إصلاح' : 'Request Repair Service'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
