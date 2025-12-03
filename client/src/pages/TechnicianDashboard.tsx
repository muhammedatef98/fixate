import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Logo from "@/components/Logo";
import { Loader2, Package, CheckCircle2, Clock, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

const statusConfig = {
  pending: { label: "قيد الانتظار", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "تم التأكيد", color: "bg-blue-100 text-blue-800" },
  technician_assigned: { label: "معين لي", color: "bg-purple-100 text-purple-800" },
  in_progress: { label: "جاري العمل", color: "bg-orange-100 text-orange-800" },
  completed: { label: "مكتمل", color: "bg-green-100 text-green-800" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-800" },
};

export default function TechnicianDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const { data: profile } = trpc.technician.getProfile.useQuery(undefined, {
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: requests, isLoading: requestsLoading, refetch } = trpc.technician.getMyRequests.useQuery(undefined, {
    enabled: isAuthenticated && !!profile,
  });

  const startWork = trpc.technician.updateRequestStatus.useMutation({
    onSuccess: () => {
      toast.success("تم بدء العمل");
      refetch();
    },
    onError: (error) => {
      toast.error("حدث خطأ: " + error.message);
    },
  });

  const completeWork = trpc.technician.updateRequestStatus.useMutation({
    onSuccess: () => {
      toast.success("تم إكمال العمل بنجاح!");
      refetch();
    },
    onError: (error) => {
      toast.error("حدث خطأ: " + error.message);
    },
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

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-red-600">لم يتم العثور على ملف فني لحسابك</p>
            <p className="text-center text-sm text-gray-600 mt-2">
              يرجى التواصل مع الإدارة
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatPrice = (priceInCents: number | null) => {
    if (!priceInCents) return "---";
    return (priceInCents / 100).toFixed(2);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "---";
    return new Date(date).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const assignedRequests = requests?.filter(r => r.status === 'technician_assigned') || [];
  const inProgressRequests = requests?.filter(r => r.status === 'in_progress') || [];
  const completedRequests = requests?.filter(r => r.status === 'completed') || [];

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
              <Badge variant="outline">فني</Badge>
              <span className="text-sm text-gray-600">{profile.nameAr}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            لوحة تحكم الفني
          </h1>
          <p className="text-gray-600">إدارة طلبات الصيانة المعينة لك</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">طلبات جديدة</p>
                  <p className="text-2xl font-bold text-purple-600">{assignedRequests.length}</p>
                </div>
                <Clock className="h-10 w-10 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">قيد العمل</p>
                  <p className="text-2xl font-bold text-orange-600">{inProgressRequests.length}</p>
                </div>
                <Package className="h-10 w-10 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">مكتملة</p>
                  <p className="text-2xl font-bold text-green-600">{profile.completedJobs}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">التقييم</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {profile.rating ? (profile.rating / 100).toFixed(1) : '---'} ⭐
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests */}
        <Card>
          <CardHeader>
            <CardTitle>طلبات الصيانة</CardTitle>
          </CardHeader>
          <CardContent>
            {requestsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : requests && requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((request) => {
                  const status = statusConfig[request.status];

                  return (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold">طلب #{request.id}</span>
                            <Badge className={status.color}>{status.label}</Badge>
                            {request.serviceMode === 'express' && (
                              <Badge variant="outline">سريع</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {formatDate(request.createdAt)}
                          </p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-primary">
                            {formatPrice(request.totalAmount)} ريال
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-gray-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">{request.city}</p>
                            <p className="text-sm text-gray-600">{request.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-600" />
                          <p className="text-sm">{request.phoneNumber}</p>
                        </div>
                        {request.preferredTimeSlot && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-600" />
                            <p className="text-sm">
                              {request.preferredTimeSlot === 'morning' && 'صباحاً (9 ص - 12 م)'}
                              {request.preferredTimeSlot === 'afternoon' && 'ظهراً (12 م - 5 م)'}
                              {request.preferredTimeSlot === 'evening' && 'مساءً (5 م - 9 م)'}
                            </p>
                          </div>
                        )}
                        {request.issueDescription && (
                          <div className="pt-2 border-t">
                            <p className="text-xs text-gray-600">وصف المشكلة:</p>
                            <p className="text-sm">{request.issueDescription}</p>
                          </div>
                        )}
                      </div>

                      {request.status === 'technician_assigned' && (
                        <div className="pt-3 border-t">
                          <Button
                            size="sm"
                            onClick={() => {
                              startWork.mutate({
                                requestId: request.id,
                                status: 'in_progress',
                              });
                            }}
                            disabled={startWork.isPending}
                          >
                            {startWork.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin ml-2" />
                            ) : null}
                            بدء العمل
                          </Button>
                        </div>
                      )}

                      {request.status === 'in_progress' && (
                        <div className="pt-3 border-t">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => {
                              completeWork.mutate({
                                requestId: request.id,
                                status: 'completed',
                              });
                            }}
                            disabled={completeWork.isPending}
                          >
                            {completeWork.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin ml-2" />
                            ) : null}
                            إكمال العمل
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">لا توجد طلبات معينة لك حالياً</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
