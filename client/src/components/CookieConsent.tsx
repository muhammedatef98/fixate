import { useState, useEffect } from "react";
import { X, Cookie, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getStoredConsent, saveConsent, type ConsentPreferences } from "@/lib/analytics";

export default function CookieConsent() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const isArabic = language === "ar";

  useEffect(() => {
    // Show banner only if no stored consent
    if (!getStoredConsent()) {
      // Small delay so it doesn't fight with page load paint
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const acceptAll = () => {
    const full: ConsentPreferences = { necessary: true, analytics: true, marketing: true };
    saveConsent(full);
    setVisible(false);
  };

  const acceptNecessary = () => {
    const minimal: ConsentPreferences = { necessary: true, analytics: false, marketing: false };
    saveConsent(minimal);
    setVisible(false);
  };

  const saveCustom = () => {
    saveConsent(prefs);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[10000] pb-safe"
      dir={isArabic ? "rtl" : "ltr"}
      role="dialog"
      aria-label={isArabic ? "إشعار ملفات تعريف الارتباط" : "Cookie consent"}
      aria-modal="true"
    >
      {/* Backdrop blur gradient */}
      <div className="bg-background/95 backdrop-blur-sm border-t border-border shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
        <div className="container max-w-6xl mx-auto px-4 py-5">
          <div className="flex flex-col gap-4">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-9 w-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <Cookie className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground text-sm">
                    {isArabic ? "نستخدم ملفات تعريف الارتباط" : "We use cookies"}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                    {isArabic
                      ? "نستخدم ملفات تعريف ارتباط ضرورية لتشغيل الموقع، وملفات تحليلية اختيارية لفهم كيفية استخدامك له. يمكنك اختيار ما تقبله وفقاً لنظام حماية البيانات الشخصية السعودي (PDPL)."
                      : "We use necessary cookies to run the site and optional analytics cookies to understand how you use it. You may choose what to accept in compliance with Saudi Arabia's PDPL."}
                  </p>
                </div>
              </div>
              <button
                onClick={acceptNecessary}
                className="flex-shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                aria-label={isArabic ? "إغلاق (الضروري فقط)" : "Close (necessary only)"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Expandable details */}
            {showDetails && (
              <div className="bg-muted/50 rounded-xl p-4 space-y-3 text-sm">
                {/* Necessary */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      {isArabic ? "🔒 الضرورية" : "🔒 Necessary"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isArabic
                        ? "مطلوبة لعمل الموقع (جلسة المستخدم، اللغة، الوضع المظلم)"
                        : "Required for the site to function (session, language, dark mode)"}
                    </p>
                  </div>
                  <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full font-medium flex-shrink-0">
                    {isArabic ? "دائماً" : "Always on"}
                  </span>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      {isArabic ? "📊 التحليلية" : "📊 Analytics"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isArabic
                        ? "Google Analytics 4 + Microsoft Clarity — لفهم كيفية استخدام الموقع وتحسينه"
                        : "Google Analytics 4 + Microsoft Clarity — to understand usage and improve the site"}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={prefs.analytics}
                      onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-muted peer-checked:bg-emerald-500 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4" />
                  </label>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      {isArabic ? "🎯 التسويقية" : "🎯 Marketing"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isArabic
                        ? "Meta Pixel, TikTok Pixel, Snapchat Pixel — لعرض إعلانات مناسبة لك"
                        : "Meta Pixel, TikTok Pixel, Snapchat Pixel — to show relevant ads"}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={prefs.marketing}
                      onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-muted peer-checked:bg-emerald-500 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4" />
                  </label>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={acceptAll}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                {isArabic ? "قبول الكل" : "Accept All"}
              </button>
              <button
                onClick={acceptNecessary}
                className="bg-muted hover:bg-muted/80 text-foreground text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
              >
                {isArabic ? "الضروري فقط" : "Necessary Only"}
              </button>
              {showDetails && (
                <button
                  onClick={saveCustom}
                  className="bg-muted hover:bg-muted/80 text-foreground text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
                >
                  {isArabic ? "حفظ الإعدادات" : "Save Settings"}
                </button>
              )}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors ms-auto"
              >
                {isArabic ? "إعدادات تفصيلية" : "Detailed settings"}
                {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>

            {/* Legal link */}
            <p className="text-[11px] text-muted-foreground">
              {isArabic ? (
                <>
                  بالموافقة فأنت تقبل{" "}
                  <a href="/privacy" className="underline hover:text-foreground transition-colors">سياسة الخصوصية</a>
                  {" "}و{" "}
                  <a href="/terms" className="underline hover:text-foreground transition-colors">الشروط والأحكام</a>
                  {" "}وفقاً لنظام حماية البيانات الشخصية السعودي (PDPL).
                </>
              ) : (
                <>
                  By accepting you agree to our{" "}
                  <a href="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
                  {" "}and{" "}
                  <a href="/terms" className="underline hover:text-foreground transition-colors">Terms</a>
                  {" "}in compliance with Saudi PDPL.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
