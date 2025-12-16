import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { Link, useLocation } from "wouter";
import { Loader2, Mail, Lock, User, Phone, ArrowRight, Wrench, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export default function SignupNew() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Step 1: Choose user type
  const [userType, setUserType] = useState<'client' | 'technician' | null>(null);
  
  // Common fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Technician specific fields
  const [specialization, setSpecialization] = useState("");
  const [city, setCity] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    ar: {
      title: 'إنشاء حساب جديد',
      subtitle: 'انضم إلى Fixate اليوم',
      chooseType: 'اختر نوع الحساب',
      client: 'عميل',
      clientDesc: 'أنا أبحث عن خدمات إصلاح',
      technician: 'فني',
      technicianDesc: 'أنا فني متخصص',
      name: 'الاسم الكامل',
      namePlaceholder: 'أحمد محمد',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'name@example.com',
      phone: 'رقم الجوال',
      phonePlaceholder: '+966501234567',
      password: 'كلمة المرور',
      passwordPlaceholder: '••••••••',
      confirmPassword: 'تأكيد كلمة المرور',
      specialization: 'التخصص',
      specializationPlaceholder: 'مثال: iPhone, Samsung, MacBook',
      city: 'المدينة',
      cityPlaceholder: 'الرياض',
      experience: 'سنوات الخبرة',
      experiencePlaceholder: '5',
      signup: 'إنشاء حساب',
      login: 'لديك حساب بالفعل؟ سجل دخول',
      back: 'رجوع',
      errorFields: 'الرجاء ملء جميع الحقول',
      errorPassword: 'كلمات المرور غير متطابقة',
      errorPasswordLength: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
      success: 'تم إنشاء الحساب بنجاح!',
      error: 'خطأ في إنشاء الحساب',
    },
    en: {
      title: 'Create New Account',
      subtitle: 'Join Fixate Today',
      chooseType: 'Choose Account Type',
      client: 'Client',
      clientDesc: 'I need repair services',
      technician: 'Technician',
      technicianDesc: 'I am a specialist technician',
      name: 'Full Name',
      namePlaceholder: 'Ahmed Mohammed',
      email: 'Email Address',
      emailPlaceholder: 'name@example.com',
      phone: 'Phone Number',
      phonePlaceholder: '+966501234567',
      password: 'Password',
      passwordPlaceholder: '••••••••',
      confirmPassword: 'Confirm Password',
      specialization: 'Specialization',
      specializationPlaceholder: 'e.g., iPhone, Samsung, MacBook',
      city: 'City',
      cityPlaceholder: 'Riyadh',
      experience: 'Years of Experience',
      experiencePlaceholder: '5',
      signup: 'Create Account',
      login: 'Already have an account? Sign in',
      back: 'Back',
      errorFields: 'Please fill all fields',
      errorPassword: 'Passwords do not match',
      errorPasswordLength: 'Password must be at least 6 characters',
      success: 'Account created successfully!',
      error: 'Signup failed',
    }
  };

  const t = content[language as keyof typeof content];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error(t.errorFields);
      return;
    }

    if (userType === 'technician' && (!specialization || !city || !yearsOfExperience)) {
      toast.error(t.errorFields);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t.errorPassword);
      return;
    }

    if (password.length < 6) {
      toast.error(t.errorPasswordLength);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name,
        email,
        phone,
        password,
        userType,
        ...(userType === 'technician' && {
          specialization,
          city,
          yearsOfExperience: parseInt(yearsOfExperience),
        })
      };

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.error);
      }

      toast.success(t.success);
      setLocation('/profile');
    } catch (error: any) {
      toast.error(error?.message || t.error);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Choose User Type
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl">{t.title}</CardTitle>
            <CardDescription>{t.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center font-semibold text-gray-700">{t.chooseType}</p>
              
              <button
                onClick={() => setUserType('client')}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div className="text-left">
                    <p className="font-semibold">{t.client}</p>
                    <p className="text-sm text-gray-600">{t.clientDesc}</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setUserType('technician')}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Wrench className="w-8 h-8 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold">{t.technician}</p>
                    <p className="text-sm text-gray-600">{t.technicianDesc}</p>
                  </div>
                </div>
              </button>

              <div className="text-center text-sm">
                <Link href="/login">
                  <a className="text-blue-600 hover:underline">{t.login}</a>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 2: Fill Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl">
            {userType === 'client' ? t.client : t.technician}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t.phone}</Label>
              <Input
                id="phone"
                placeholder={t.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Technician Specific Fields */}
            {userType === 'technician' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="specialization">{t.specialization}</Label>
                  <Input
                    id="specialization"
                    placeholder={t.specializationPlaceholder}
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">{t.city}</Label>
                  <Input
                    id="city"
                    placeholder={t.cityPlaceholder}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">{t.experience}</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder={t.experiencePlaceholder}
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </>
            )}

            {/* Password Fields */}
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.signup}
                  </>
                ) : (
                  <>
                    {t.signup}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setUserType(null)}
                disabled={isLoading}
              >
                {t.back}
              </Button>
            </div>

            <div className="text-center text-sm">
              <Link href="/login">
                <a className="text-blue-600 hover:underline">{t.login}</a>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
