import { useEffect } from "react";
import { APP_TITLE } from "@/const";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: object;
}

export default function SEO({
  title,
  description = "منصة Fixate - أفضل خدمات صيانة الأجهزة الإلكترونية في السعودية. إصلاح الجوالات، اللابتوبات، الماك بوك والتابلت بأسعار تنافسية وضمان 6 أشهر.",
  keywords = "صيانة جوالات، إصلاح آيفون، صيانة سامسونج، إصلاح لابتوب، صيانة ماك بوك، صيانة تابلت، صيانة هواوي، خدمة صيانة منزلية، السعودية",
  ogImage = "https://fixate.sa/og-image.png",
  canonical,
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${APP_TITLE}` : APP_TITLE;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Update Open Graph tags
    updateMetaTag("og:title", fullTitle, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", ogImage, "property");

    // Update Twitter Card tags
    updateMetaTag("twitter:title", fullTitle, "name");
    updateMetaTag("twitter:description", description, "name");
    updateMetaTag("twitter:image", ogImage, "name");

    // Update canonical URL
    if (canonical) {
      updateCanonicalLink(canonical);
    }

    // Add structured data
    if (structuredData) {
      addStructuredData(structuredData);
    }
  }, [fullTitle, description, keywords, ogImage, canonical, structuredData]);

  return null;
}

function updateMetaTag(name: string, content: string, attribute: "name" | "property" = "name") {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute("content", content);
}

function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  
  link.href = url;
}

function addStructuredData(data: object) {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

// Predefined structured data templates
export const structuredDataTemplates = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fixate",
    "url": "https://fixate.sa",
    "logo": "https://fixate.sa/logo.png",
    "description": "منصة صيانة الأجهزة الإلكترونية في السعودية",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressLocality": "الرياض"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["ar", "en"]
    },
    "sameAs": [
      "https://twitter.com/fixate",
      "https://facebook.com/fixate"
    ]
  },

  service: {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Electronics Repair",
    "provider": {
      "@type": "Organization",
      "name": "Fixate"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Saudi Arabia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات الصيانة",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "إصلاح الهواتف الذكية"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "إصلاح اللابتوب"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "إصلاح الماك بوك"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "إصلاح التابلت"
          }
        }
      ]
    }
  },

  faq: (questions: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  }),

  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  })
};
