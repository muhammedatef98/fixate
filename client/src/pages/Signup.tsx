import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO } from "@/const";
import { Link, useLocation } from "wouter";
import { Loader2, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";


export default function Signup() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error(language === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error(language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      toast.success(language === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!');
      setLocation('/profile');
    } catch (error: any) {
      toast.error(error?.message || (language === 'ar' ? 'خطأ في إنشاء الحساب' : 'Signup failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const content = {
    ar: {
      title: 'إنشاء حساب جديد',
      subtitle: 'انضم إلى Fixate اليوم',
      name: 'الاسم الكامل',
      namePlaceholder: 'أحمد محمد',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'name@example.com',
      phone: 'رقم الجوال',
      phonePlaceholder: '+966501234567',
      password: 'كلمة المرور',
      passwordPlaceholder: '••••••••',
      confirmPassword: 'تأكيد كلمة المرور',
      confirmPasswordPlaceholder: '••••••••',
      signupButton: 'إنشاء حساب',
      haveAccount: 'لديك حساب بالفعل؟',
      login: 'تسجيل الدخول',
      backHome: 'العودة للرئيسية'
    },
    en: {
      title: 'Create Account',
      subtitle: 'Join Fixate today',
      name: 'Full Name',
      namePlaceholder: 'Ahmed Mohammed',
      email: 'Email',
      emailPlaceholder: 'name@example.com',
      phone: 'Phone Number',
      phonePlaceholder: '+966501234567',
      password: 'Password',
      passwordPlaceholder: '••••••••',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: '••••••••',
      signupButton: 'Create Account',
      haveAccount: 'Already have an account?',
      login: 'Login',
      backHome: 'Back to home'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-background to-teal-50 dark:from-emerald-950/20 dark:via-background dark:to-teal-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center justify-center gap-3 mb-8 cursor-pointer group">
            <img src={APP_LOGO} alt="Fixate" className="h-12 w-auto group-hover:scale-110 transition-transform" />
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Fixate
            </span>
          </div>
        </Link>

        {/* Signup Card */}
        <Card className="border-2 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">{t.title}</CardTitle>
            <CardDescription className="text-base">{t.subtitle}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  {t.name}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={t.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  {t.email}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">
                  {t.phone}
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  {t.password}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-base">
                  {t.confirmPassword}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder={t.confirmPasswordPlaceholder}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    {t.signupButton}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Login link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t.haveAccount}{' '}
                <Link href="/login">
                  <span className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold cursor-pointer">
                    {t.login}
                  </span>
                </Link>
              </p>
            </div>

            {/* Back to home */}
            <div className="mt-4 text-center">
              <Link href="/">
                <button className="text-sm text-muted-foreground hover:text-foreground">
                  ← {t.backHome}
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
