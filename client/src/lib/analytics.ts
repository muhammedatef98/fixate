/**
 * Analytics module — consent-gated.
 * Nothing loads until the user explicitly accepts analytics cookies.
 *
 * To activate:
 *   GA4:     set VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX in your .env
 *   Clarity: set VITE_CLARITY_PROJECT_ID=xxxxxxxxxx   in your .env
 */

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;

// Augment window for analytics globals
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (cmd: string, ...args: unknown[]) => void;
  }
}

export type ConsentPreferences = {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "fixate_cookie_consent_v1";

// ── Persistence ───────────────────────────────────────────────────────────────

export function getStoredConsent(): ConsentPreferences | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPreferences;
  } catch {
    return null;
  }
}

export function saveConsent(prefs: ConsentPreferences): void {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
  if (prefs.analytics) initAnalytics();
}

// ── Initialisation ────────────────────────────────────────────────────────────

let analyticsInitialised = false;

export function initAnalytics(): void {
  if (analyticsInitialised) return;
  analyticsInitialised = true;

  initGA4();
  initClarity();
}

function initGA4(): void {
  if (!GA4_ID) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID, { anonymize_ip: true });
}

function initClarity(): void {
  if (!CLARITY_ID) return;
  // Microsoft Clarity inline init snippet
  (function (c, l, a, r, i, t, y) {
    (c as Record<string, unknown>)[a] =
      (c as Record<string, unknown>)[a] ||
      function (...args: unknown[]) {
        ((c as Record<string, unknown>)[a] as { q: unknown[] }).q.push(args);
      };
    ((c as Record<string, unknown>)[a] as { q: unknown[] }).q =
      ((c as Record<string, unknown>)[a] as { q?: unknown[] }).q || [];
    const script = l.createElement(r) as HTMLScriptElement;
    script.async = true;
    script.src = "https://www.clarity.ms/tag/" + i;
    const s = l.getElementsByTagName(r)[0];
    s.parentNode?.insertBefore(script, s);
  })(window, document, "clarity", "script", CLARITY_ID);
}

// ── Event tracking ────────────────────────────────────────────────────────────

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
): void {
  const consent = getStoredConsent();
  if (!consent?.analytics) return;

  window.gtag?.("event", name, params);
  window.clarity?.("event", name);
}

// Predefined conversion events
export const events = {
  appStoreClick: (platform: "ios" | "android") =>
    trackEvent("app_store_click", { platform }),
  downloadSectionView: () =>
    trackEvent("download_section_view"),
  faqSearch: (query: string) =>
    trackEvent("faq_search", { query }),
  whatsappClick: () =>
    trackEvent("whatsapp_click"),
  newsletterSignup: () =>
    trackEvent("newsletter_signup"),
};

// ── Bootstrap on load ─────────────────────────────────────────────────────────
// If the user already consented in a previous session, initialise immediately.
const stored = getStoredConsent();
if (stored?.analytics) initAnalytics();
