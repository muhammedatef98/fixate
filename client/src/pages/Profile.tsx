import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/components/Logo";
import { Link, useLocation } from "wouter";
import { 
  Loader2, Package, Clock, CheckCircle2, XCircle, User, 
  Mail, Phone, MapPin, Settings, LogOut, ArrowRight, Calendar
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const statusConfig = {
  pending: { 
    label: { ar: "قيد الانتظار", en: "Pending" }, 
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", 
    icon: Clock 
  },
  confirmed: { 
    label: { ar: "تم التأكيد", en: "Confirmed" }, 
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", 
    icon: CheckCircle2 
  },
  technician_assigned: { 
    label: { ar: "تم تعيين فني", en: "Technician Assigned" }, 
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400", 
    icon: User 
  },
  in_progress: { 
    label: { ar: "جاري العمل", en: "In Progress" }, 
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400", 
    icon: Package 
  },
  completed: { 
    label: { ar: "مكتمل", en: "Completed" }, 
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", 
    icon: CheckCircle2 
  },
  cancelled: { 
    label: { ar: "ملغي", en: "Cancelled" }, 
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", 
    icon: XCircle 
  },
};

export default function Profile() {
  const { language } = useLanguage();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'orders' | 'info'>('orders');

  const { data: requests, isLoading: requestsLoading } = trpc.requests.getUserRequests.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully');
      setLocation('/');
    } catch (error) {
      toast.error(language === 'ar' ? 'خطأ في تسجيل الخروج' : 'Logout failed');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation('/login');
    return null;
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "---";
    return new Date(date).toLocaleDateString(language === 'ar' ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const content = {
    ar: {
      profile: 'الملف الشخصي',
      myOrders: 'طلباتي',
      personalInfo: 'المعلومات الشخصية',
      newRequest: 'طلب جديد',
      logout: 'تسجيل الخروج',
      noOrders: 'لا توجد طلبات',
      noOrdersDesc: 'لم تقم بأي طلبات بعد. ابدأ بطلب خدمة إصلاح الآن!',
      startNow: 'ابدأ الآن',
      orderNumber: 'طلب رقم',
      status: 'الحالة',
      date: 'التاريخ',
      viewDetails: 'عرض التفاصيل',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'رقم الجوال',
      totalOrders: 'إجمالي الطلبات',
      completedOrders: 'الطلبات المكتملة',
      pendingOrders: 'الطلبات قيد الانتظار'
    },
    en: {
      profile: 'Profile',
      myOrders: 'My Orders',
      personalInfo: 'Personal Information',
      newRequest: 'New Request',
      logout: 'Logout',
      noOrders: 'No Orders',
      noOrdersDesc: 'You haven\'t made any requests yet. Start by requesting a repair service now!',
      startNow: 'Start Now',
      orderNumber: 'Order #',
      status: 'Status',
      date: 'Date',
      viewDetails: 'View Details',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      totalOrders: 'Total Orders',
      completedOrders: 'Completed Orders',
      pendingOrders: 'Pending Orders'
    }
  };

  const t = content[language];

  const stats = {
    total: requests?.length || 0,
    completed: requests?.filter(r => r.status === 'completed').length || 0,
    pending: requests?.filter(r => r.status === 'pending' || r.status === 'in_progress').length || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-background to-teal-50 dark:from-emerald-950/10 dark:via-background dark:to-teal-950/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group">
                <Logo />
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Fixate
                </span>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              <Link href="/request">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  {t.newRequest}
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                {t.logout}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8 border-2 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <Avatar className="h-24 w-24 border-4 border-emerald-100 dark:border-emerald-900">
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 text-center md:text-right">
                  <h1 className="text-3xl font-bold mb-2">{user?.name || 'مستخدم'}</h1>
                  <div className="flex flex-col md:flex-row gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Mail className="h-4 w-4" />
                      <span>{user?.email}</span>
                    </div>
                    {user?.phone && (
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <Phone className="h-4 w-4" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 justify-center md:justify-start">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{stats.total}</div>
                      <div className="text-xs text-muted-foreground">{t.totalOrders}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                      <div className="text-xs text-muted-foreground">{t.completedOrders}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                      <div className="text-xs text-muted-foreground">{t.pendingOrders}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === 'orders' ? 'default' : 'outline'}
              onClick={() => setActiveTab('orders')}
              className={activeTab === 'orders' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : ''}
            >
              <Package className="h-4 w-4 mr-2" />
              {t.myOrders}
            </Button>
            <Button
              variant={activeTab === 'info' ? 'default' : 'outline'}
              onClick={() => setActiveTab('info')}
              className={activeTab === 'info' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : ''}
            >
              <User className="h-4 w-4 mr-2" />
              {t.personalInfo}
            </Button>
          </div>

          {/* Content */}
          {activeTab === 'orders' ? (
            <div>
              {requestsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                </div>
              ) : requests && requests.length > 0 ? (
                <div className="grid gap-4">
                  {requests.map((request) => {
                    const status = statusConfig[request.status];
                    const StatusIcon = status.icon;

                    return (
                      <Card key={request.id} className="hover:shadow-lg transition-all border-2 hover:border-emerald-200 dark:hover:border-emerald-800">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                  <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-lg">
                                    {t.orderNumber}{request.id}
                                  </h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(request.createdAt)}
                                  </div>
                                </div>
                              </div>

                              {request.address && (
                                <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  <span>{request.address}, {request.city}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col items-end gap-3">
                              <Badge className={`${status.color} gap-1`}>
                                <StatusIcon className="h-3 w-3" />
                                {status.label[language]}
                              </Badge>

                              <Link href={`/track-order/${request.id}`}>
                                <Button variant="outline" size="sm" className="gap-2">
                                  {t.viewDetails}
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="border-2 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Package className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold mb-2">{t.noOrders}</h3>
                    <p className="text-muted-foreground mb-6 text-center max-w-md">
                      {t.noOrdersDesc}
                    </p>
                    <Link href="/request">
                      <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                        {t.startNow}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="border-2">
              <CardHeader>
                <CardTitle>{t.personalInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <User className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t.name}</div>
                    <div className="font-semibold">{user?.name || '---'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Mail className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t.email}</div>
                    <div className="font-semibold">{user?.email || '---'}</div>
                  </div>
                </div>

                {user?.phone && (
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Phone className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="text-sm text-muted-foreground">{t.phone}</div>
                      <div className="font-semibold">{user.phone}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
