import { Link } from "wouter";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Mail, Phone, MapPin, Download } from "lucide-react";

const APP_STORE_URL = (import.meta.env.VITE_APP_STORE_URL as string) || null;
const PLAY_STORE_URL = (import.meta.env.VITE_PLAY_STORE_URL as string) || null;

// X (Twitter) icon — not in lucide-react yet
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const year = new Date().getFullYear();

  const content = {
    ar: {
      aboutText: "خدمة صيانة متنقلة للأجهزة الإلكترونية في السعودية. فنيون معتمدون يصلون إليك مع ضمان 6 أشهر.",
      quickLinks: "روابط سريعة",
      downloadApp: "حمل التطبيق",
      appStore: "App Store",
      googlePlay: "Google Play",
      comingSoon: "قريباً",
      links: [
        { label: "الرئيسية", href: "/" },
        { label: "احسب السعر", href: "/price-calculator" },
        { label: "الأسئلة الشائعة", href: "/faq" },
        { label: "من نحن", href: "/about" },
      ],
      contactInfo: "التواصل",
      email: "fixate01@gmail.com",
      phone: "+966 54 894 0042",
      address: "الرياض، المملكة العربية السعودية",
      followUs: "تابعنا",
      legal: "الشروط القانونية",
      rights: `© ${year} Fixate. جميع الحقوق محفوظة`,
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      whatsapp: "واتساب",
    },
    en: {
      aboutText: "Mobile device repair service in Saudi Arabia. Certified technicians come to you with a 6-month warranty.",
      quickLinks: "Quick Links",
      downloadApp: "Download App",
      appStore: "App Store",
      googlePlay: "Google Play",
      comingSoon: "Coming Soon",
      links: [
        { label: "Home", href: "/" },
        { label: "Price Calculator", href: "/price-calculator" },
        { label: "FAQ", href: "/faq" },
        { label: "About Us", href: "/about" },
      ],
      contactInfo: "Contact",
      email: "fixate01@gmail.com",
      phone: "+966 54 894 0042",
      address: "Riyadh, Saudi Arabia",
      followUs: "Follow Us",
      legal: "Legal",
      rights: `© ${year} Fixate. All rights reserved`,
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      whatsapp: "WhatsApp",
    },
  };

  const c = content[isArabic ? "ar" : "en"];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white" dir={isArabic ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-300 text-sm leading-relaxed">{c.aboutText}</p>

            {/* App Download Badges */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{c.downloadApp}</p>
              <div className="flex flex-col gap-2">
                {APP_STORE_URL ? (
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors w-fit"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    {c.appStore}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-gray-700/60 text-gray-400 text-xs px-4 py-2.5 rounded-lg w-fit cursor-default">
                    <Download className="w-4 h-4" />
                    {c.appStore} — {c.comingSoon}
                  </span>
                )}
                {PLAY_STORE_URL ? (
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors w-fit"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" fill="#4CAF50"/><path d="M3 20.5L13.73 12 3 3.5v17z" fill="#4CAF50"/></svg>
                    {c.googlePlay}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-gray-700/60 text-gray-400 text-xs px-4 py-2.5 rounded-lg w-fit cursor-default">
                    <Download className="w-4 h-4" />
                    {c.googlePlay} — {c.comingSoon}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">{c.quickLinks}</h3>
            <ul className="space-y-2">
              {c.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">{c.contactInfo}</h3>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${c.email}`} className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {c.email}
                </a>
              </li>
              <li>
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {c.phone}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/966548940042"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-400 flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {c.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                {c.address}
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">{c.followUs}</h3>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/fixate.sa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-emerald-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://x.com/fixate_sa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-emerald-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@fixate.sa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-emerald-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.17 8.17 0 004.78 1.52V7.13a4.85 4.85 0 01-1.01-.44z"/></svg>
              </a>
            </div>

            {/* Payment methods */}
            <div className="pt-2">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">
                {isArabic ? "وسائل الدفع" : "Payment Methods"}
              </p>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {["مدى", "Visa", "STC Pay", "Apple Pay", "تابي", "تمارة"].map((m) => (
                  <span key={m} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-sm">{c.rights}</p>
            <div className="flex gap-5">
              <Link href="/privacy">
                <span className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer text-sm">
                  {c.privacy}
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer text-sm">
                  {c.terms}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
