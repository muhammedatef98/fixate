import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  Home,
  List,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageThemeSwitcher } from "@/components/LanguageThemeSwitcher";

export interface LegalSection {
  id: string;
  title: string;
  icon: LucideIcon;
  /** Short lead paragraph rendered before bullets / subsections. */
  intro?: string;
  /** Flat list of bullet points (string or label/text pair for definition-style lists). */
  bullets?: Array<string | { label: string; text: string }>;
  /** Sub-grouped content: each subsection has its own heading + bullets/text. */
  subsections?: Array<{
    title: string;
    text?: string;
    bullets?: string[];
  }>;
  /** Free-form trailing paragraph (e.g. a callout note). */
  outro?: ReactNode;
}

interface LegalDocumentProps {
  /** SEO + visual title */
  title: string;
  /** Short one-line subtitle shown under the hero title */
  subtitle: string;
  /** Last-updated label, e.g. "December 2025" */
  lastUpdated: string;
  /** SEO description */
  seoDescription: string;
  /** Canonical URL */
  canonical: string;
  /** Sections in display order */
  sections: LegalSection[];
  /** Optional closing acknowledgement paragraph below the last section */
  acknowledgement?: string;
}

/**
 * Shared layout for legal documents (Privacy, Terms). Mirrors the
 * mobile app's PolicyDocument screen: a clean reading column with
 * numbered section cards, a sticky table of contents on desktop, and
 * a contact panel at the end. Built entirely from the Fixate design
 * system primitives (card-soft, primary-soft icon tiles, soft borders).
 */
export default function LegalDocument({
  title,
  subtitle,
  lastUpdated,
  seoDescription,
  canonical,
  sections,
  acknowledgement,
}: LegalDocumentProps) {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  // Scroll-spy: highlight TOC item matching the section in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div key={language} className="min-h-screen bg-background" dir={isArabic ? "rtl" : "ltr"}>
      <SEO title={title} description={seoDescription} canonical={canonical} />

      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "الرئيسية" : "Home"}
              </Link>
              <Link href="/about" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/faq" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.faq")}
              </Link>
              <Link href="/contact" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors">
                {isArabic ? "تواصل معنا" : "Contact Us"}
              </Link>
              <a href="/#download">
                <Button>{isArabic ? "حمل التطبيق" : "Download App"}</Button>
              </a>
              <LanguageThemeSwitcher />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-10 md:pt-20 md:pb-14 bg-card border-b border-border/60">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-primary-soft mb-6 mx-auto">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">{title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">{subtitle}</p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card-alt text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {isArabic ? "آخر تحديث: " : "Last updated: "}
                <span className="font-medium text-foreground">{lastUpdated}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <main className="py-12 md:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-[260px_1fr] gap-10 max-w-6xl mx-auto">
            {/* ─── Table of Contents ─────────────────────────── */}
            {/* Mobile: collapsible details element */}
            <details className="lg:hidden bg-card rounded-2xl shadow-[0_1px_2px_rgba(15,23,32,0.04),0_4px_12px_-4px_rgba(15,23,32,0.06)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_12px_-4px_rgba(0,0,0,0.4)] group">
              <summary className="px-5 py-4 flex items-center justify-between cursor-pointer list-none">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <List className="h-4 w-4 text-primary" />
                  {isArabic ? "محتويات الوثيقة" : "Table of contents"}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
              </summary>
              <ol className="px-5 pb-5 pt-1 space-y-1 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-card-alt text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-card-alt text-xs font-semibold text-foreground/80">
                        {i + 1}
                      </span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            {/* Desktop: sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-4 px-3">
                  <List className="h-3.5 w-3.5 text-primary" />
                  {isArabic ? "المحتويات" : "Contents"}
                </div>
                <nav>
                  <ol className="space-y-0.5 text-sm">
                    {sections.map((s, i) => {
                      const active = activeId === s.id;
                      return (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className={`flex items-start gap-3 py-2 px-3 rounded-lg transition-colors ${
                              active
                                ? "bg-primary-soft text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-card-alt"
                            }`}
                          >
                            <span
                              className={`inline-flex items-center justify-center h-6 w-6 shrink-0 rounded-full text-xs font-semibold transition-colors ${
                                active ? "bg-primary text-primary-foreground" : "bg-card-alt text-foreground/80"
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className="leading-snug pt-0.5">{s.title}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              </div>
            </aside>

            {/* ─── Sections ──────────────────────────────────── */}
            <div className="space-y-6">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <article
                    key={section.id}
                    id={section.id}
                    className="bg-card rounded-2xl p-6 md:p-8 shadow-[0_1px_2px_rgba(15,23,32,0.04),0_8px_24px_-8px_rgba(15,23,32,0.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_24px_-8px_rgba(0,0,0,0.5)] scroll-mt-24"
                  >
                    <header className="flex items-start gap-4 mb-5">
                      <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-primary-soft flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-primary mb-1">
                          {isArabic ? `القسم ${index + 1}` : `Section ${index + 1}`}
                        </div>
                        <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                          {section.title}
                        </h2>
                      </div>
                    </header>

                    {section.intro && (
                      <p className="text-muted-foreground leading-relaxed mb-4">{section.intro}</p>
                    )}

                    {section.bullets && (
                      <ul className="space-y-2.5 mb-4">
                        {section.bullets.map((b, i) => {
                          if (typeof b === "string") {
                            return (
                              <li key={i} className="flex items-start gap-3 text-foreground/85">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span className="leading-relaxed">{b}</span>
                              </li>
                            );
                          }
                          return (
                            <li key={i} className="flex items-start gap-3 text-foreground/85">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                              <span className="leading-relaxed">
                                <span className="font-semibold text-foreground">{b.label}: </span>
                                {b.text}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {section.subsections && (
                      <div className="space-y-5 mt-2">
                        {section.subsections.map((sub, i) => (
                          <div key={i} className="bg-card-alt rounded-xl p-4 md:p-5">
                            <h3 className="text-base font-semibold text-foreground mb-2">{sub.title}</h3>
                            {sub.text && (
                              <p className="text-sm text-muted-foreground leading-relaxed">{sub.text}</p>
                            )}
                            {sub.bullets && (
                              <ul className="space-y-2 mt-2">
                                {sub.bullets.map((b, j) => (
                                  <li key={j} className="flex items-start gap-3 text-sm text-foreground/85">
                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                                    <span className="leading-relaxed">{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.outro && (
                      <div className="mt-4 text-muted-foreground leading-relaxed">{section.outro}</div>
                    )}
                  </article>
                );
              })}

              {acknowledgement && (
                <div className="bg-primary-soft rounded-2xl p-6 text-center">
                  <p className="text-foreground font-medium leading-relaxed">{acknowledgement}</p>
                </div>
              )}

              {/* Contact panel */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-[0_1px_2px_rgba(15,23,32,0.04),0_8px_24px_-8px_rgba(15,23,32,0.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_24px_-8px_rgba(0,0,0,0.5)]">
                <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
                  {isArabic ? "أسئلة أو ملاحظات؟" : "Questions or feedback?"}
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  {isArabic
                    ? "تواصل معنا في أي وقت — فريقنا متاح على مدار الساعة."
                    : "Reach out anytime — our team is here 24/7."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href="mailto:support@fixate.site"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card-alt hover:bg-primary-soft transition-colors"
                  >
                    <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{isArabic ? "البريد" : "Email"}</span>
                    <span className="text-sm font-medium text-foreground text-center">support@fixate.site</span>
                  </a>
                  <a
                    href="tel:+966548940042"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card-alt hover:bg-primary-soft transition-colors"
                  >
                    <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{isArabic ? "الهاتف" : "Phone"}</span>
                    <span className="text-sm font-medium text-foreground" dir="ltr">+966 54 894 0042</span>
                  </a>
                  <a
                    href="https://wa.me/966548940042"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card-alt hover:bg-primary-soft transition-colors"
                  >
                    <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{isArabic ? "واتساب" : "WhatsApp"}</span>
                    <span className="text-sm font-medium text-foreground" dir="ltr">+966 54 894 0042</span>
                  </a>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Link href="/">
                  <Button variant="outline" size="lg" className="gap-2">
                    {isArabic ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                    <Home className="h-4 w-4" />
                    {isArabic ? "العودة للرئيسية" : "Back to home"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
