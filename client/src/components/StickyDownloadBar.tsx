import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const APP_STORE_URL = (import.meta.env.VITE_APP_STORE_URL as string) || null;
const PLAY_STORE_URL = (import.meta.env.VITE_PLAY_STORE_URL as string) || null;

export default function StickyDownloadBar() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua)) setPlatform("ios");
    else if (/Android/.test(ua)) setPlatform("android");
    else setPlatform("desktop");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("stickyBarDismissed")) {
      setDismissed(true);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("stickyBarDismissed", "1");
    // Re-show after 30s
    setTimeout(() => {
      sessionStorage.removeItem("stickyBarDismissed");
      setDismissed(false);
    }, 30_000);
  };

  const getHref = () => {
    if (platform === "ios" && APP_STORE_URL) return APP_STORE_URL;
    if (platform === "android" && PLAY_STORE_URL) return PLAY_STORE_URL;
    return "#download";
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = getHref();
    if (href === "#download") {
      e.preventDefault();
      document.getElementById("download")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9998] bg-emerald-600 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container flex items-center justify-between gap-3 py-3 px-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0">📱</span>
          <p className="text-sm font-medium leading-tight truncate">
            {language === "ar"
              ? "حمل تطبيق Fixate — صيانة جوالك في بيتك خلال ساعة"
              : "Download Fixate — phone repair at home in one hour"}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={getHref()}
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 bg-white text-emerald-700 font-bold text-sm px-4 py-2 rounded-full hover:bg-emerald-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            {language === "ar" ? "حمل الآن" : "Download"}
          </a>
          <button
            onClick={dismiss}
            className="p-1.5 rounded-full hover:bg-emerald-700 transition-colors"
            aria-label={language === "ar" ? "إغلاق" : "Close"}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
