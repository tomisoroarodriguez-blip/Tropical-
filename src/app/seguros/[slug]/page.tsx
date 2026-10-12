import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getInsurance, insurances } from "@/config/insurances";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { jsonLdString } from "@/lib/jsonld";
import { site } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return insurances.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = getInsurance((await params).slug);
  if (!i) return {};
  return {
    title: i.seoTitle,
    description: i.seoDescription,
    alternates: { canonical: `/seguros/${i.slug}` },
    openGraph: { title: `${i.seoTitle} | Martínez Seguros`, description: i.seoDescription, url: `/seguros/${i.slug}` },
  };
}

export default async function InsurancePage({ params }: Props) {
  const i = getInsurance((await params).slug);
  if (!i) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: i.name,
    description: i.seoDescription,
    areaServed: "Uruguay",
    provider: { "@type": "InsuranceAgency", name: site.name, url: site.url },
  };
  return (
    <>
      <section className="bg-navy-900 pb-16 pt-32 text-white sm:pt-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent-500 text-navy-950"><i.icon className="h-8 w-8" aria-hidden="true" /></span>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{i.seoTitle}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{i.intro}</p>
          <div className="mt-8"><WhatsAppButton message={i.whatsappMessage} source={`seguro_${i.slug}`}>Consultar por WhatsApp</WhatsAppButton></div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-navy-900">En qué te asesoramos</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {i.covers.map((c) => (
              <li key={c} className="flex items-start gap-3 rounded-2xl bg-mist p-4 font-medium text-navy-900"><Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />{c}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink/60">Las coberturas disponibles, condiciones y exclusiones dependen de cada aseguradora y póliza.</p>
        </div>
      </section>
      <QuoteSection initialType={i.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }} />
    </>
  );
}
