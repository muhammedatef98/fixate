import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl, APP_LOGO } from "@/const";
import { Loader2, Users, Package, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

const statusConfig = {
  pending: { label: "قيد الانتظار", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "تم التأكيد", color: "bg-blue-100 text-blue-800" },
  technician_assigned: { label: "تم تعيين فني", color: "bg-purple-100 text-purple-800" },
  in_progress: { label: "جاري العمل", color: "bg-orange-100 text-orange-800" },
  completed: { label: "مكتمل", color: "bg-green-100 text-green-800" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-800" },
};

export default function AdminDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [selectedTechnicianId, setSelectedTechnicianId] = useState<string>("");

  const { data: requests, isLoading: requestsLoading, refetch: refetchRequests } = trpc.admin.getAllRequests.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: technicians } = trpc.admin.getAllTechnicians.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const assignTechnician = trpc.admin.assignTechnician.useMutation({
    onSuccess: () => {
      toast.success("تم تعيين الفني بنجاح");
      refetchRequests();
      setSelectedRequestId(null);
      setSelectedTechnicianId("");
    },
    onError: (error) => {
      toast.error("حدث خطأ: " + error.message);
    },
  });

  const updateStatus = trpc.admin.updateRequestStatus.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الحالة بنجاح");
      refetchRequests();
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

  if (!isAuthenticated || user?.role !== 'admin') {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-red-600">غير مصرح لك بالوصول إلى هذه الصفحة</p>
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

  const pendingRequests = requests?.filter(r => r.status === 'pending') || [];
  const activeRequests = requests?.filter(r => ['confirmed', 'technician_assigned', 'in_progress'].includes(r.status)) || [];
  const completedRequests = requests?.filter(r => r.status === 'completed') || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={APP_LOGO} alt="Fixate" className="h-10 w-auto" />
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="outline">مدير النظام</Badge>
              <span className="text-sm text-gray-600">{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            لوحة تحكم الإدارة
          </h1>
          <p className="text-gray-600">إدارة جميع الطلبات والفنيين</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">طلبات جديدة</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</p>
                </div>
                <Clock className="h-10 w-10 text-yellow-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">قيد التنفيذ</p>
                  <p className="text-2xl font-bold text-blue-600">{activeRequests.length}</p>
                </div>
                <Package className="h-10 w-10 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">مكتملة</p>
                  <p className="text-2xl font-bold text-green-600">{completedRequests.length}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">الفنيين</p>
                  <p className="text-2xl font-bold text-purple-600">{technicians?.length || 0}</p>
                </div>
                <Users className="h-10 w-10 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>جميع الطلبات</CardTitle>
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
                  const assignedTech = technicians?.find(t => t.id === request.technicianId);

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
                            {request.city} • {formatDate(request.createdAt)}
                          </p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-primary">
                            {formatPrice(request.totalAmount)} ريال
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-600">العنوان</p>
                          <p className="text-sm">{request.address}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">رقم التواصل</p>
                          <p className="text-sm">{request.phoneNumber}</p>
                        </div>
                        {assignedTech && (
                          <div>
                            <p className="text-xs text-gray-600">الفني المعين</p>
                            <p className="text-sm font-medium">{assignedTech.nameAr}</p>
                          </div>
                        )}
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex items-center gap-2 pt-3 border-t">
                          <Select
                            value={selectedRequestId === request.id ? selectedTechnicianId : ""}
                            onValueChange={(value) => {
                              setSelectedRequestId(request.id);
                              setSelectedTechnicianId(value);
                            }}
                          >
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="اختر فني" />
                            </SelectTrigger>
                            <SelectContent>
                              {technicians?.map((tech) => (
                                <SelectItem key={tech.id} value={tech.id.toString()}>
                                  {tech.nameAr} - {tech.city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            disabled={selectedRequestId !== request.id || !selectedTechnicianId || assignTechnician.isPending}
                            onClick={() => {
                              if (selectedTechnicianId) {
                                assignTechnician.mutate({
                                  requestId: request.id,
                                  technicianId: parseInt(selectedTechnicianId),
                                });
                              }
                            }}
                          >
                            {assignTechnician.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "تعيين"
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              updateStatus.mutate({
                                requestId: request.id,
                                status: 'confirmed',
                              });
                            }}
                          >
                            تأكيد
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">لا توجد طلبات</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
