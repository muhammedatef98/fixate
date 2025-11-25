import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, Phone, MapPin, Clock, CheckCircle2, Package, Wrench, Star } from "lucide-react";
import { Link, useRoute } from "wouter";
import { APP_LOGO } from "@/const";
import { MapView } from "@/components/Map";
import { useLanguage } from "@/contexts/LanguageContext";

type RequestStatus = 'pending' | 'confirmed' | 'technician_assigned' | 'in_progress' | 'completed' | 'cancelled';

interface StatusStep {
  status: RequestStatus;
  labelAr: string;
  labelEn: string;
  icon: React.ReactNode;
  color: string;
}

const statusSteps: StatusStep[] = [
  {
    status: 'pending',
    labelAr: 'قيد المراجعة',
    labelEn: 'Under Review',
    icon: <Clock className="h-5 w-5" />,
    color: 'text-yellow-600',
  },
  {
    status: 'confirmed',
    labelAr: 'تم التأكيد',
    labelEn: 'Confirmed',
    icon: <CheckCircle2 className="h-5 w-5" />,
    color: 'text-blue-600',
  },
  {
    status: 'technician_assigned',
    labelAr: 'الفني في الطريق',
    labelEn: 'Technician On Way',
    icon: <MapPin className="h-5 w-5" />,
    color: 'text-purple-600',
  },
  {
    status: 'in_progress',
    labelAr: 'جاري الإصلاح',
    labelEn: 'In Progress',
    icon: <Wrench className="h-5 w-5" />,
    color: 'text-orange-600',
  },
  {
    status: 'completed',
    labelAr: 'تم الانتهاء',
    labelEn: 'Completed',
    icon: <Package className="h-5 w-5" />,
    color: 'text-green-600',
  },
];

export default function TrackOrder() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const [, params] = useRoute("/track-order/:id");
  const requestId = params?.id ? parseInt(params.id) : null;
  
  const mapRef = useRef<google.maps.Map | null>(null);
  const technicianMarkerRef = useRef<any>(null);
  const customerMarkerRef = useRef<any>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  // Fetch request details
  const { data: request, isLoading } = trpc.requests.getById.useQuery(
    { requestId: requestId! },
    { enabled: !!requestId, refetchInterval: 30000 } // Refetch every 30 seconds
  );

  // Mock technician location (in real app, this would come from backend)
  const [technicianLocation, setTechnicianLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Simulate technician location updates
    if (request && request.status === 'technician_assigned') {
      // Mock location near customer (in real app, this comes from technician's GPS)
      const mockLat = 24.7136 + (Math.random() - 0.5) * 0.05;
      const mockLng = 46.6753 + (Math.random() - 0.5) * 0.05;
      setTechnicianLocation({ lat: mockLat, lng: mockLng });
    }
  }, [request]);

  const getStatusIndex = (status: RequestStatus) => {
    return statusSteps.findIndex(step => step.status === status);
  };

  const currentStatusIndex = request ? getStatusIndex(request.status as RequestStatus) : -1;

  const formatPrice = (priceInSAR: number) => {
    return priceInSAR.toFixed(2);
  };

  const getEstimatedTime = () => {
    // Mock calculation (in real app, use Google Distance Matrix API)
    if (request?.status === 'technician_assigned') {
      return language === 'ar' ? '15-20 دقيقة' : '15-20 minutes';
    }
    return null;
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'ar' ? 'الطلب غير موجود' : 'Order Not Found'}
          </h2>
          <Link href="/my-requests">
            <Button>{language === 'ar' ? 'العودة لطلباتي' : 'Back to My Requests'}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={APP_LOGO} alt="Fixate" className="h-10 w-auto dark:brightness-200" />
                <span className="text-2xl font-bold text-foreground">Fixate</span>
              </div>
            </Link>
            <Link href="/my-requests">
              <Button variant="outline">
                {language === 'ar' ? 'طلباتي' : 'My Requests'}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
              {language === 'ar' ? 'تتبع طلبك' : 'Track Your Order'}
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {language === 'ar' ? `رقم الطلب: #${request.id}` : `Order #${request.id}`}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column: Status & Details */}
            <div className="space-y-6">
              {/* Status Timeline */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-6">
                    {language === 'ar' ? 'حالة الطلب' : 'Order Status'}
                  </h2>
                  <div className="space-y-6">
                    {statusSteps.map((step, index) => {
                      const isCompleted = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;
                      
                      return (
                        <div key={step.status} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${
                                isCompleted
                                  ? 'bg-primary text-primary-foreground shadow-lg'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              {step.icon}
                            </div>
                            {index < statusSteps.length - 1 && (
                              <div
                                className={`w-0.5 h-12 mt-2 transition-all ${
                                  isCompleted ? 'bg-primary' : 'bg-muted'
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 pt-2">
                            <h3
                              className={`text-lg font-semibold ${
                                isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                              }`}
                            >
                              {language === 'ar' ? step.labelAr : step.labelEn}
                            </h3>
                            {isCurrent && request.updatedAt && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {new Date(request.updatedAt).toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Order Details */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-6">
                    {language === 'ar' ? 'تفاصيل الطلب' : 'Order Details'}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">
                        {language === 'ar' ? 'نوع الخدمة:' : 'Service Type:'}
                      </span>
                      <span className="font-medium">
                        {request.serviceMode === 'express' 
                          ? (language === 'ar' ? 'خدمة سريعة' : 'Express Service')
                          : (language === 'ar' ? 'استلام وتوصيل' : 'Pickup & Delivery')}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">
                        {language === 'ar' ? 'المدينة:' : 'City:'}
                      </span>
                      <span className="font-medium">{request.city}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">
                        {language === 'ar' ? 'العنوان:' : 'Address:'}
                      </span>
                      <span className="font-medium text-left">{request.address}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">
                        {language === 'ar' ? 'رقم الجوال:' : 'Phone:'}
                      </span>
                      <span className="font-medium">{request.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between py-3 pt-6">
                      <span className="text-lg font-semibold">
                        {language === 'ar' ? 'السعر المتوقع:' : 'Estimated Price:'}
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(150)} {language === 'ar' ? 'ريال' : 'SAR'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technician Info (when on the way) */}
              {request.status === 'technician_assigned' && request.technicianId && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6">
                      {language === 'ar' ? 'معلومات الفني' : 'Technician Info'}
                    </h2>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-3xl font-bold text-primary">
                        T
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{language === 'ar' ? 'فني الصيانة' : 'Technician'}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">4.8</span>
                          <span className="text-muted-foreground text-sm">(120 {language === 'ar' ? 'تقييم' : 'reviews'})</span>
                        </div>
                      </div>
                    </div>
                    
                    {getEstimatedTime() && (
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-2 text-primary">
                          <Clock className="h-5 w-5" />
                          <span className="font-semibold">
                            {language === 'ar' ? 'الوقت المتوقع للوصول:' : 'Estimated Arrival:'}
                          </span>
                          <span className="font-bold">{getEstimatedTime()}</span>
                        </div>
                      </div>
                    )}

                    <a href="tel:+966500000000">
                      <Button className="w-full" size="lg">
                        <Phone className="h-5 w-5 ml-2" />
                        {language === 'ar' ? 'اتصال بالفني' : 'Call Technician'}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column: Map */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card>
                <CardContent className="p-0">
                  <div className="h-[600px] rounded-lg overflow-hidden">
                    {request.status === 'technician_assigned' && technicianLocation ? (
                      <MapView
                        initialCenter={technicianLocation}
                        initialZoom={13}
                        onMapReady={(map: any) => {
                          mapRef.current = map;

                          // Customer marker
                          const customerPos = { lat: 24.7136, lng: 46.6753 }; // Mock customer location
                          customerMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
                            map,
                            position: customerPos,
                            title: language === 'ar' ? 'موقعك' : 'Your Location',
                          });

                          // Technician marker
                          technicianMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
                            map,
                            position: technicianLocation,
                            title: language === 'ar' ? 'الفني' : 'Technician',
                          });

                          // Draw route
                          const directionsService = new google.maps.DirectionsService();
                          directionsRendererRef.current = new google.maps.DirectionsRenderer({
                            map,
                            suppressMarkers: true,
                            polylineOptions: {
                              strokeColor: '#10b981',
                              strokeWeight: 4,
                            },
                          });

                          directionsService.route(
                            {
                              origin: technicianLocation,
                              destination: customerPos,
                              travelMode: google.maps.TravelMode.DRIVING,
                            },
                            (result: any, status: any) => {
                              if (status === 'OK') {
                                directionsRendererRef.current?.setDirections(result);
                              }
                            }
                          );
                        }}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-muted">
                        <div className="text-center">
                          <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-lg text-muted-foreground">
                            {language === 'ar' 
                              ? 'الخريطة ستظهر عندما يكون الفني في الطريق' 
                              : 'Map will appear when technician is on the way'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
