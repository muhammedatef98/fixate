import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { Link, useLocation } from "wouter";
import { Loader2, Mail, Lock, User, Phone, ArrowRight, Wrench, Users, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export default function SignupNew() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  
  const [userType, setUserType] = useState<'client' | 'technician' | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <CardTitle className="text-3xl font-bold">{t.title}</CardTitle>
            <CardDescription className="text-base mt-2">{t.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center font-semibold text-foreground text-lg mb-6">{t.chooseType}</p>
              
              <button
                onClick={() => setUserType('client')}
                className="w-full p-6 border-2 border-muted rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">{t.client}</p>
                    <p className="text-sm text-muted-foreground">{t.clientDesc}</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setUserType('technician')}
                className="w-full p-6 border-2 border-muted rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <Wrench className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">{t.technician}</p>
                    <p className="text-sm text-muted-foreground">{t.technicianDesc}</p>
                  </div>
                </div>
              </button>

              <div className="text-center text-sm pt-4">
                <Link href="/login">
                  <span className="text-primary hover:underline cursor-pointer font-medium">{t.login}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-3xl font-bold">
            {userType === 'client' ? t.client : t.technician}
          </CardTitle>
          <CardDescription className="text-base mt-2">{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold">{t.name}</Label>
              <Input
                id="name"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-semibold">{t.phone}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold">{t.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-semibold">{t.confirmPassword}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            {/* Technician Specific Fields */}
            {userType === 'technician' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="specialization" className="font-semibold">{t.specialization}</Label>
                  <Input
                    id="specialization"
                    placeholder={t.specializationPlaceholder}
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="font-semibold">{t.city}</Label>
                  <Input
                    id="city"
                    placeholder={t.cityPlaceholder}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="font-semibold">{t.experience}</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder={t.experiencePlaceholder}
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 font-semibold text-base mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === 'ar' ? 'جاري الإنشاء...' : 'Creating...'}
                </>
              ) : (
                <>
                  {t.signup}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {/* Back Button */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setUserType(null)}
              disabled={isLoading}
              className="w-full h-11 font-semibold"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t.back}
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm pt-2">
              <Link href="/login">
                <span className="text-primary hover:underline cursor-pointer font-medium">{t.login}</span>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
