"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { insurances } from "@/config/insurances";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useQuote } from "@/components/layout/QuoteContext";

export function Insurances() {
  const { choose } = useQuote();
  return (
    <section id="seguros" className="bg-white py-20 sm:py-24" aria-labelledby="seguros-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="seguros-title"
          eyebrow="Nuestros seguros"
          title="Una cobertura para cada necesidad"
          text="Elegí la categoría que te interesa y completamos el pedido juntos. Cada caso se analiza de forma personalizada."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {insurances.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={(i % 4) * 0.06} className="h-full">
                <article className="group flex h-full flex-col rounded-3xl border border-navy-900/8 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent-400/50 hover:shadow-lift">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-accent-300 transition group-hover:bg-accent-500 group-hover:text-navy-950">
                    <s.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold leading-snug text-navy-900">
                    <Link href={`/seguros/${s.slug}`} className="hover:text-accent-600">{s.name}</Link>
                  </h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink/75">{s.short}</p>
                  <button
                    type="button"
                    onClick={() => choose(s.slug)}
                    className="mt-6 inline-flex min-h-12 items-center justify-between gap-2 rounded-full bg-mist px-5 text-[0.95rem] font-bold text-navy-900 transition hover:bg-accent-500 hover:text-navy-950"
                  >
                    <span>Solicitar cotización<span className="sr-only"> de {s.name}</span></span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-ink/60">Las categorías disponibles están sujetas a confirmación con el asesor.</p>
      </div>
    </section>
  );
}
