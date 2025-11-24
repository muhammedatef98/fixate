import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapView } from "@/components/Map";
import { Loader2, MapPin, Clock, Navigation } from "lucide-react";
import { toast } from "sonner";

export default function TrackTechnician() {
  const [, setLocation] = useLocation();
  const [requestId, setRequestId] = useState<number | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [technicianMarker, setTechnicianMarker] = useState<google.maps.Marker | null>(null);
  const [customerMarker, setCustomerMarker] = useState<google.maps.Marker | null>(null);

  // Get request ID from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("requestId");
    if (id) {
      setRequestId(parseInt(id));
    }
  }, []);

  const { data: location, isLoading } = trpc.location.getForRequest.useQuery(
    { requestId: requestId! },
    {
      enabled: !!requestId,
      refetchInterval: 5000, // Refresh every 5 seconds
    }
  );

  const { data: request } = trpc.requests.getById.useQuery(
    { requestId: requestId! },
    { enabled: !!requestId }
  );

  useEffect(() => {
    if (!map || !location || !request) return;

    const techLat = parseFloat(location.latitude);
    const techLng = parseFloat(location.longitude);

    // Update or create technician marker
    if (technicianMarker) {
      technicianMarker.setPosition({ lat: techLat, lng: techLng });
    } else {
      const marker = new google.maps.Marker({
        position: { lat: techLat, lng: techLng },
        map,
        title: "موقع الفني",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#3b82f6",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });
      setTechnicianMarker(marker);
    }

    // Create customer marker if not exists
    if (!customerMarker && request.address) {
      try {
        // For now, we'll use a fixed location. In production, geocode the address
        const customerLoc = { lat: techLat + 0.01, lng: techLng + 0.01 };
        const marker = new google.maps.Marker({
          position: { lat: customerLoc.lat, lng: customerLoc.lng },
          map,
          title: "موقع العميل",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#10b981",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });
        setCustomerMarker(marker);

        // Fit bounds to show both markers
        const bounds = new google.maps.LatLngBounds();
        bounds.extend({ lat: techLat, lng: techLng });
        bounds.extend({ lat: customerLoc.lat, lng: customerLoc.lng });
        map.fitBounds(bounds);
      } catch (e) {
        console.error("Failed to parse location:", e);
      }
    }
  }, [map, location, request, technicianMarker, customerMarker]);

  if (!requestId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">رقم الطلب غير موجود</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">لم يتم تحديث موقع الفني بعد</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b p-4">
          <h1 className="text-2xl font-bold">تتبع الفني</h1>
          <p className="text-muted-foreground">طلب رقم #{requestId}</p>
        </div>

        {/* Info Cards */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="py-4 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">الموقع الحالي</p>
                <p className="font-medium">
                  {parseFloat(location.latitude).toFixed(4)}, {parseFloat(location.longitude).toFixed(4)}
                </p>
              </div>
            </CardContent>
          </Card>

          {location.estimatedArrival && (
            <Card>
              <CardContent className="py-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">الوقت المتوقع للوصول</p>
                  <p className="font-medium">
                    {new Date(location.estimatedArrival).toLocaleTimeString("ar-SA", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {location.speed && location.speed > 0 && (
            <Card>
              <CardContent className="py-4 flex items-center gap-3">
                <Navigation className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">السرعة</p>
                  <p className="font-medium">{(location.speed / 100).toFixed(1)} كم/س</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map */}
        <div className="flex-1 p-4">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <MapView
                onMapReady={(mapInstance) => {
                  setMap(mapInstance);
                  const lat = parseFloat(location.latitude);
                  const lng = parseFloat(location.longitude);
                  mapInstance.setCenter({ lat, lng });
                  mapInstance.setZoom(14);
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
