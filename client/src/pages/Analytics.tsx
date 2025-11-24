import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowRight, TrendingUp, Users, Wrench, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function Analytics() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: totalRevenue } = trpc.analytics.getTotalRevenue.useQuery();
  const { data: requestsByStatus } = trpc.analytics.getRequestsByStatus.useQuery();
  const { data: topServices } = trpc.analytics.getTopServices.useQuery({ limit: 5 });
  const { data: technicianStats } = trpc.analytics.getTechnicianStats.useQuery();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">غير مصرح</h2>
          <p className="text-muted-foreground mb-6">
            هذه الصفحة متاحة فقط للمسؤولين
          </p>
          <Button onClick={() => setLocation("/")}>
            العودة للرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  const totalRequests = requestsByStatus?.reduce((sum: number, item: any) => sum + Number(item.count), 0) || 0;
  const completedRequests = requestsByStatus?.find((item: any) => item.status === "completed")?.count || 0;
  const completionRate = totalRequests > 0 ? ((completedRequests / totalRequests) * 100).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">لوحة التحليلات</h1>
            <Button variant="ghost" onClick={() => setLocation("/admin")}>
              <ArrowRight className="ml-2" />
              لوحة الإدارة
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">إجمالي الطلبات</h3>
            <p className="text-3xl font-bold mt-2">{totalRequests}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">الطلبات المكتملة</h3>
            <p className="text-3xl font-bold mt-2">{completedRequests}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">معدل الإتمام</h3>
            <p className="text-3xl font-bold mt-2">{completionRate}%</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Wrench className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">عدد الفنيين</h3>
            <p className="text-3xl font-bold mt-2">{technicianStats?.length || 0}</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Requests by Status */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">الطلبات حسب الحالة</h2>
            <div className="space-y-4">
              {requestsByStatus?.map((item: any) => {
                const percentage = totalRequests > 0 ? ((item.count / totalRequests) * 100).toFixed(1) : 0;
                const statusLabels: Record<string, string> = {
                  pending: "قيد الانتظار",
                  confirmed: "مؤكد",
                  technician_assigned: "تم تعيين فني",
                  in_progress: "قيد التنفيذ",
                  completed: "مكتمل",
                  cancelled: "ملغي",
                };
                
                return (
                  <div key={item.status}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{statusLabels[item.status] || item.status}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Top Services */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">أكثر الخدمات طلباً</h2>
            <div className="space-y-4">
              {topServices?.map((service: any, index: number) => (
                <div key={service.serviceTypeId} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">خدمة #{service.serviceTypeId}</span>
                      <span className="text-sm text-muted-foreground">{service.count} طلب</span>
                    </div>
                  </div>
                </div>
              ))}
              {(!topServices || topServices.length === 0) && (
                <p className="text-center text-muted-foreground py-8">
                  لا توجد بيانات متاحة
                </p>
              )}
            </div>
          </Card>

          {/* Technician Stats */}
          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-bold mb-6">إحصائيات الفنيين</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right py-3 px-4 font-semibold">الفني</th>
                    <th className="text-right py-3 px-4 font-semibold">الطلبات المكتملة</th>
                    <th className="text-right py-3 px-4 font-semibold">معدل الإنجاز</th>
                  </tr>
                </thead>
                <tbody>
                  {technicianStats?.map((tech: any) => (
                    <tr key={tech.technicianId} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">فني #{tech.technicianId}</td>
                      <td className="py-3 px-4">{tech.completedCount}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: "85%" }}
                            />
                          </div>
                          <span className="text-sm">85%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!technicianStats || technicianStats.length === 0) && (
                    <tr>
                      <td colSpan={3} className="text-center py-8 text-muted-foreground">
                        لا توجد بيانات متاحة
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
