import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Wrench, DollarSign, CheckCircle, Star, MapPin, Phone, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Request {
  id: number;
  customerName: string;
  device: string;
  issue: string;
  location: string;
  price: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed';
  createdAt: string;
  preferredDate: string;
}

export default function TechnicianDashboardWeb() {
  const { language } = useLanguage();
  const [isOnline, setIsOnline] = useState(true);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [technicianName] = useState('كابتن خالد');
  const [stats, setStats] = useState({
    todayEarnings: 1350,
    completedJobs: 12,
    rating: 4.9,
    totalRequests: 8,
  });

  const content = {
    ar: {
      welcome: 'أهلاً وسهلاً',
      online: 'متاح لاستقبال الطلبات',
      offline: 'غير متاح حالياً',
      todayEarnings: 'أرباح اليوم',
      completedJobs: 'الطلبات المكتملة',
      rating: 'التقييم',
      newRequests: 'الطلبات الجديدة',
      acceptedRequests: 'الطلبات المقبولة',
      completedRequests: 'الطلبات المكتملة',
      accept: 'قبول الطلب',
      reject: 'رفض',
      startWork: 'بدء العمل',
      markComplete: 'إنهاء الطلب',
      noRequests: 'لا توجد طلبات',
      device: 'الجهاز',
      issue: 'المشكلة',
      location: 'الموقع',
      price: 'السعر',
      customer: 'العميل',
      date: 'التاريخ المفضل',
      time: 'الوقت',
      sar: 'ر.س',
    },
    en: {
      welcome: 'Welcome',
      online: 'Available for requests',
      offline: 'Currently unavailable',
      todayEarnings: "Today's Earnings",
      completedJobs: 'Completed Jobs',
      rating: 'Rating',
      newRequests: 'New Requests',
      acceptedRequests: 'Accepted Requests',
      completedRequests: 'Completed Requests',
      accept: 'Accept Request',
      reject: 'Reject',
      startWork: 'Start Work',
      markComplete: 'Mark Complete',
      noRequests: 'No requests',
      device: 'Device',
      issue: 'Issue',
      location: 'Location',
      price: 'Price',
      customer: 'Customer',
      date: 'Preferred Date',
      time: 'Time',
      sar: 'SAR',
    }
  };

  const t = content[language as keyof typeof content];

  useEffect(() => {
    // Mock data - في الواقع ستأتي من API
    const mockRequests: Request[] = [
      {
        id: 1,
        customerName: 'أحمد محمد',
        device: 'iPhone 15 Pro',
        issue: 'شاشة مكسورة',
        location: 'الرياض - حي الملز',
        price: 450,
        status: 'pending',
        createdAt: new Date().toISOString(),
        preferredDate: new Date().toISOString(),
      },
      {
        id: 2,
        customerName: 'فاطمة علي',
        device: 'Samsung S24',
        issue: 'البطارية لا تشحن',
        location: 'الرياض - حي العليا',
        price: 350,
        status: 'pending',
        createdAt: new Date().toISOString(),
        preferredDate: new Date().toISOString(),
      },
      {
        id: 3,
        customerName: 'محمد سالم',
        device: 'MacBook Pro',
        issue: 'لوحة المفاتيح معطلة',
        location: 'الرياض - حي الصفا',
        price: 650,
        status: 'accepted',
        createdAt: new Date().toISOString(),
        preferredDate: new Date().toISOString(),
      },
    ];
    setRequests(mockRequests);
    setLoading(false);
  }, []);

  const handleAccept = (id: number) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'accepted' } : req
    ));
    toast.success(language === 'ar' ? 'تم قبول الطلب' : 'Request accepted');
  };

  const handleReject = (id: number) => {
    setRequests(requests.filter(req => req.id !== id));
    toast.success(language === 'ar' ? 'تم رفض الطلب' : 'Request rejected');
  };

  const handleStartWork = (id: number) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'in_progress' } : req
    ));
    toast.success(language === 'ar' ? 'تم بدء العمل' : 'Work started');
  };

  const handleComplete = (id: number) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'completed' } : req
    ));
    toast.success(language === 'ar' ? 'تم إنهاء الطلب' : 'Request completed');
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const acceptedRequests = requests.filter(r => r.status === 'accepted' || r.status === 'in_progress');
  const completedRequests = requests.filter(r => r.status === 'completed');

  const RequestCard = ({ request, showActions }: { request: Request; showActions: boolean }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Customer Info */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">{t.customer}</p>
            <p className="font-semibold text-lg">{request.customerName}</p>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">{t.price}</p>
            <p className="font-semibold text-lg text-green-600">
              {request.price} {t.sar}
            </p>
          </div>

          {/* Device */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Wrench className="w-4 h-4" />
              {t.device}
            </div>
            <p className="font-semibold">{request.device}</p>
          </div>

          {/* Issue */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4" />
              {t.issue}
            </div>
            <p className="font-semibold">{request.issue}</p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {t.location}
            </div>
            <p className="font-semibold">{request.location}</p>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              {t.date}
            </div>
            <p className="font-semibold">
              {new Date(request.preferredDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-4">
          <Badge variant={
            request.status === 'pending' ? 'default' :
            request.status === 'accepted' ? 'secondary' :
            request.status === 'in_progress' ? 'outline' :
            'default'
          }>
            {request.status}
          </Badge>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 flex-wrap">
            {request.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleAccept(request.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {t.accept}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleReject(request.id)}
                >
                  {t.reject}
                </Button>
              </>
            )}
            {request.status === 'accepted' && (
              <Button
                size="sm"
                onClick={() => handleStartWork(request.id)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {t.startWork}
              </Button>
            )}
            {request.status === 'in_progress' && (
              <Button
                size="sm"
                onClick={() => handleComplete(request.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                {t.markComplete}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {t.welcome}, {technicianName} 🔧
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
              <p className="text-gray-600">
                {isOnline ? t.online : t.offline}
              </p>
            </div>
          </div>
          <Button
            variant={isOnline ? 'default' : 'outline'}
            onClick={() => setIsOnline(!isOnline)}
          >
            {isOnline ? 'متصل' : 'غير متصل'}
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.todayEarnings}</p>
                  <p className="text-2xl font-bold text-green-600">{stats.todayEarnings} {t.sar}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.completedJobs}</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.completedJobs}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.rating}</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.rating} ⭐</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalRequests}</p>
                </div>
                <Wrench className="w-8 h-8 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">
              {t.newRequests} ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="accepted">
              {t.acceptedRequests} ({acceptedRequests.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              {t.completedRequests} ({completedRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            {pendingRequests.length > 0 ? (
              pendingRequests.map(req => (
                <RequestCard key={req.id} request={req} showActions={true} />
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-gray-500">
                  {t.noRequests}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="accepted" className="mt-6">
            {acceptedRequests.length > 0 ? (
              acceptedRequests.map(req => (
                <RequestCard key={req.id} request={req} showActions={true} />
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-gray-500">
                  {t.noRequests}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {completedRequests.length > 0 ? (
              completedRequests.map(req => (
                <RequestCard key={req.id} request={req} showActions={false} />
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-gray-500">
                  {t.noRequests}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
