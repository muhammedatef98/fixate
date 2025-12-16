import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star, MapPin, Wrench, Search, Phone, MessageSquare, Calendar, CheckCircle2, ChevronLeft, Award, Clock } from "lucide-react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/Logo";
import { toast } from "sonner";

interface Technician {
  id: number;
  name: string;
  rating: number;
  completedJobs: number;
  specialization: string[];
  city: string;
  phone: string;
  yearsOfExperience: number;
  image?: string;
  isAvailable: boolean;
  hourlyRate?: number;
}

export default function TechniciansList() {
  const { language } = useLanguage();
  const [, setLocationNav] = useLocation();
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState<Technician[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [loading, setLoading] = useState(true);

  const content = {
    ar: {
      title: 'الفنيين المتخصصين',
      subtitle: 'اختر فنياً متخصصاً لإصلاح جهازك',
      search: 'ابحث عن فني...',
      filterCity: 'المدينة',
      allCities: 'جميع المدن',
      rating: 'التقييم',
      jobs: 'الطلبات المكتملة',
      experience: 'سنوات الخبرة',
      specialization: 'التخصص',
      available: 'متاح',
      unavailable: 'غير متاح',
      bookService: 'احجز الآن',
      contact: 'تواصل',
      details: 'التفاصيل',
      phone: 'الهاتف',
      city: 'المدينة',
      noTechnicians: 'لا توجد فنيين متطابقين',
      bookingSuccess: 'تم حجز الخدمة بنجاح!',
      contactSuccess: 'سيتم التواصل معك قريباً',
      hourlyRate: 'السعر بالساعة',
      back: 'رجوع',
      selectTechnician: 'اختر فني',
      confirmBooking: 'تأكيد الحجز',
      technicianDetails: 'تفاصيل الفني',
    },
    en: {
      title: 'Specialist Technicians',
      subtitle: 'Choose a specialist technician to repair your device',
      search: 'Search for a technician...',
      filterCity: 'City',
      allCities: 'All Cities',
      rating: 'Rating',
      jobs: 'Completed Jobs',
      experience: 'Years of Experience',
      specialization: 'Specialization',
      available: 'Available',
      unavailable: 'Unavailable',
      bookService: 'Book Now',
      contact: 'Contact',
      details: 'Details',
      phone: 'Phone',
      city: 'City',
      noTechnicians: 'No matching technicians found',
      bookingSuccess: 'Service booked successfully!',
      contactSuccess: 'We will contact you soon',
      hourlyRate: 'Hourly Rate',
      back: 'Back',
      selectTechnician: 'Select Technician',
      confirmBooking: 'Confirm Booking',
      technicianDetails: 'Technician Details',
    }
  };

  const t = content[language as keyof typeof content];

  useEffect(() => {
    const mockTechnicians: Technician[] = [
      {
        id: 1,
        name: 'كابتن خالد',
        rating: 4.9,
        completedJobs: 150,
        specialization: ['iPhone', 'Samsung', 'iPad'],
        city: 'الرياض',
        phone: '+966501234567',
        yearsOfExperience: 8,
        isAvailable: true,
        hourlyRate: 150,
      },
      {
        id: 2,
        name: 'محمد الأحمد',
        rating: 4.7,
        completedJobs: 98,
        specialization: ['MacBook', 'iMac', 'iPad Pro'],
        city: 'الرياض',
        phone: '+966502345678',
        yearsOfExperience: 6,
        isAvailable: true,
        hourlyRate: 180,
      },
      {
        id: 3,
        name: 'علي السعيد',
        rating: 4.8,
        completedJobs: 120,
        specialization: ['Samsung', 'Huawei', 'Xiaomi'],
        city: 'جدة',
        phone: '+966503456789',
        yearsOfExperience: 7,
        isAvailable: false,
        hourlyRate: 140,
      },
      {
        id: 4,
        name: 'فهد العتيبي',
        rating: 4.6,
        completedJobs: 85,
        specialization: ['iPhone', 'MacBook'],
        city: 'الدمام',
        phone: '+966504567890',
        yearsOfExperience: 5,
        isAvailable: true,
        hourlyRate: 130,
      },
      {
        id: 5,
        name: 'سارة الخالد',
        rating: 4.9,
        completedJobs: 110,
        specialization: ['iPhone', 'Samsung', 'Laptop'],
        city: 'الرياض',
        phone: '+966505678901',
        yearsOfExperience: 7,
        isAvailable: true,
        hourlyRate: 160,
      },
    ];

    setTechnicians(mockTechnicians);
    setFilteredTechnicians(mockTechnicians);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = technicians;

    if (searchTerm) {
      filtered = filtered.filter(tech =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.specialization.some(spec =>
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(tech => tech.city === selectedCity);
    }

    setFilteredTechnicians(filtered);
  }, [searchTerm, selectedCity, technicians]);

  const cities = [...new Set(technicians.map(t => t.city))];

  const TechnicianCard = ({ technician }: { technician: Technician }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
      <CardContent className="pt-6">
        {/* Header with availability */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground">{technician.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm">{technician.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">({technician.completedJobs} {t.jobs})</span>
            </div>
          </div>
          <Badge variant={technician.isAvailable ? 'default' : 'secondary'} className="ml-2">
            {technician.isAvailable ? (
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {t.available}
              </div>
            ) : (
              t.unavailable
            )}
          </Badge>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 py-4 border-y">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{t.experience}</p>
              <p className="font-semibold text-sm">{technician.yearsOfExperience} {language === 'ar' ? 'سنوات' : 'years'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{t.city}</p>
              <p className="font-semibold text-sm">{technician.city}</p>
            </div>
          </div>
        </div>

        {/* Specialization */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2 font-semibold">{t.specialization}</p>
          <div className="flex flex-wrap gap-2">
            {technician.specialization.map((spec, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hourly Rate */}
        {technician.hourlyRate && (
          <div className="mb-4 p-3 bg-primary/5 rounded-lg">
            <p className="text-xs text-muted-foreground">{t.hourlyRate}</p>
            <p className="font-bold text-primary">{technician.hourlyRate} ر.س</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => setSelectedTechnician(technician)}
                disabled={!technician.isAvailable}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {t.bookService}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t.selectTechnician}</DialogTitle>
                <DialogDescription>
                  {language === 'ar'
                    ? `احجز خدمة مع ${technician.name}`
                    : `Book a service with ${technician.name}`
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* Technician Info */}
                <Card className="border-0 bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t.phone}</span>
                        <span className="font-semibold">{technician.phone}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t.city}</span>
                        <span className="font-semibold">{technician.city}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t.experience}</span>
                        <span className="font-semibold">{technician.yearsOfExperience} {language === 'ar' ? 'سنوات' : 'years'}</span>
                      </div>
                      {technician.hourlyRate && (
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm text-muted-foreground">{t.hourlyRate}</span>
                          <span className="font-bold text-primary">{technician.hourlyRate} ر.س</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Specialization */}
                <div>
                  <p className="text-sm font-semibold mb-2">{t.specialization}</p>
                  <div className="flex flex-wrap gap-2">
                    {technician.specialization.map((spec, idx) => (
                      <Badge key={idx} variant="outline">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      window.location.href = `tel:${technician.phone}`;
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t.contact}
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => {
                      toast.success(t.bookingSuccess);
                      setLocationNav('/request');
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {t.confirmBooking}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              window.location.href = `tel:${technician.phone}`;
            }}
          >
            <Phone className="w-4 h-4 mr-2" />
            {t.contact}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo />
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
                {t.back}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t.title}</h1>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 border border-input rounded-lg bg-background h-12 font-medium"
            >
              <option value="">{t.allCities}</option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Technicians Grid */}
          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="animate-spin">
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </div>
          ) : filteredTechnicians.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTechnicians.map(technician => (
                <TechnicianCard key={technician.id} technician={technician} />
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-12 pb-12 text-center">
                <Wrench className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg text-muted-foreground">{t.noTechnicians}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
