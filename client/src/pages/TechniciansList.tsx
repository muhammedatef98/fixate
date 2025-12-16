import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star, MapPin, Wrench, Search, Phone, MessageSquare, Calendar } from "lucide-react";
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
}

export default function TechniciansList() {
  const { language } = useLanguage();
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
    }
  };

  const t = content[language as keyof typeof content];

  useEffect(() => {
    // Mock data - في الواقع ستأتي من API
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
      },
    ];

    setTechnicians(mockTechnicians);
    setFilteredTechnicians(mockTechnicians);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = technicians;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tech =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.specialization.some(spec =>
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by city
    if (selectedCity) {
      filtered = filtered.filter(tech => tech.city === selectedCity);
    }

    setFilteredTechnicians(filtered);
  }, [searchTerm, selectedCity, technicians]);

  const cities = [...new Set(technicians.map(t => t.city))];

  const TechnicianCard = ({ technician }: { technician: Technician }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        {/* Header with availability */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{technician.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{technician.rating}</span>
              <span className="text-gray-600">({technician.completedJobs} {t.jobs})</span>
            </div>
          </div>
          <Badge variant={technician.isAvailable ? 'default' : 'secondary'}>
            {technician.isAvailable ? t.available : t.unavailable}
          </Badge>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y">
          <div>
            <p className="text-sm text-gray-600">{t.experience}</p>
            <p className="font-semibold">{technician.yearsOfExperience} سنوات</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {t.city}
            </div>
            <p className="font-semibold">{technician.city}</p>
          </div>
        </div>

        {/* Specialization */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">{t.specialization}</p>
          <div className="flex flex-wrap gap-2">
            {technician.specialization.map((spec, idx) => (
              <Badge key={idx} variant="outline">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => setSelectedTechnician(technician)}
                disabled={!technician.isAvailable}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {t.bookService}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.bookService}</DialogTitle>
                <DialogDescription>
                  {language === 'ar'
                    ? `احجز خدمة مع ${technician.name}`
                    : `Book a service with ${technician.name}`
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold mb-2">{t.details}</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>{t.phone}:</strong> {technician.phone}</p>
                    <p><strong>{t.city}:</strong> {technician.city}</p>
                    <p><strong>{t.specialization}:</strong> {technician.specialization.join(', ')}</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    toast.success(t.bookingSuccess);
                  }}
                >
                  {t.bookService}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              toast.success(t.contactSuccess);
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Input
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:col-span-2"
          />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
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
        {filteredTechnicians.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTechnicians.map(technician => (
              <TechnicianCard key={technician.id} technician={technician} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500 py-12">
              <Wrench className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t.noTechnicians}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
