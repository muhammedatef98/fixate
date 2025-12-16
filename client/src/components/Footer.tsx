import { Link } from "wouter";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const { language } = useLanguage();

  const content = {
    ar: {
      about: "عن Fixate",
      aboutText: "منصة رائدة في مجال خدمات إصلاح الأجهزة الإلكترونية في المملكة العربية السعودية",
      quickLinks: "روابط سريعة",
      home: "الرئيسية",
      services: "الخدمات",
      technicians: "الفنيون",
      about: "من نحن",
      contact: "اتصل بنا",
      contactInfo: "معلومات التواصل",
      email: "fixate01@gmail.com",
      phone: "+966 54 894 0042",
      address: "الرياض، المملكة العربية السعودية",
      followUs: "تابعنا",
      rights: "© 2024 Fixate. جميع الحقوق محفوظة",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
    },
    en: {
      about: "About Fixate",
      aboutText: "Leading platform for electronic device repair services in Saudi Arabia",
      quickLinks: "Quick Links",
      home: "Home",
      services: "Services",
      technicians: "Technicians",
      about: "About Us",
      contact: "Contact",
      contactInfo: "Contact Information",
      email: "fixate01@gmail.com",
      phone: "+966 54 894 0042",
      address: "Riyadh, Saudi Arabia",
      followUs: "Follow Us",
      rights: "© 2024 Fixate. All rights reserved",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.aboutText}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer text-sm">
                    {t.home}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/request">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer text-sm">
                    {t.services}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/technicians">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer text-sm">
                    {t.technicians}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer text-sm">
                    {t.about}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">{t.contactInfo}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`mailto:${t.email}`} className="hover:text-primary transition-colors">
                  {t.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`tel:${t.phone}`} className="hover:text-primary transition-colors">
                  {t.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{t.address}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">{t.followUs}</h3>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">{t.rights}</p>
            <div className="flex gap-6">
              <Link href="/privacy">
                <span className="text-gray-400 hover:text-primary transition-colors cursor-pointer text-sm">
                  {t.privacy}
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-gray-400 hover:text-primary transition-colors cursor-pointer text-sm">
                  {t.terms}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
