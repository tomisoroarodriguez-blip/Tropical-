import { faqs } from "@/config/faqs";
import { fullAddress, site } from "@/config/site";

/** Datos provisionales: se actualizan automáticamente desde src/config/site.ts */
export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: site.name,
  description: site.tagline,
  url: site.url,
  telephone: "+59899419210",
  email: site.contact.email,
  sameAs: [site.contact.instagramUrl],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    addressLocality: site.contact.address.city,
    addressCountry: site.contact.address.countryCode,
  },
  areaServed: { "@type": "Country", name: "Uruguay" },
  // fullAddress se mantiene disponible para mapas
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
};

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
