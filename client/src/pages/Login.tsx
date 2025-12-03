import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { Link, useLocation } from "wouter";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export default function Login() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error(language === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Important for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      toast.success(language === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!');
      setLocation('/profile');
    } catch (error: any) {
      toast.error(error?.message || (language === 'ar' ? 'خطأ في تسجيل الدخول' : 'Login failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const content = {
    ar: {
      title: 'تسجيل الدخول',
      subtitle: 'مرحباً بعودتك إلى Fixate',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'name@example.com',
      password: 'كلمة المرور',
      passwordPlaceholder: '••••••••',
      loginButton: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟',
      signup: 'إنشاء حساب',
    },
    en: {
      title: 'Login',
      subtitle: 'Welcome back to Fixate',
      email: 'Email',
      emailPlaceholder: 'name@example.com',
      password: 'Password',
      passwordPlaceholder: '••••••••',
      loginButton: 'Login',
      noAccount: "Don't have an account?",
      signup: 'Sign up',
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Logo */}
      <Link href="/" className="absolute top-8 left-8">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
      </Link>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {t.title}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {t.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                {t.email}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                {t.password}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {language === 'ar' ? 'جاري تسجيل الدخول...' : 'Logging in...'}
                </>
              ) : (
                <>
                  {t.loginButton}
                  <ArrowRight className={`${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} h-5 w-5`} />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t.noAccount}{' '}
              <Link href="/signup">
                <a className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                  {t.signup}
                </a>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
