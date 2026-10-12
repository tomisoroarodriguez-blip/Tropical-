"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/config/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="preguntas" className="bg-white py-20 sm:py-24" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading id="faq-title" eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`rounded-2xl border transition ${isOpen ? "border-teal-500/50 bg-mist shadow-card" : "border-navy-900/10 bg-white"}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-navy-900 sm:text-lg"
                  >
                    {f.q}
                    <ChevronDown className={`h-5 w-5 shrink-0 text-teal-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-relaxed text-ink/80">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-center text-sm text-ink/60">Las respuestas son orientativas; las condiciones concretas dependen de la aseguradora y de la póliza.</p>
      </div>
    </section>
  );
}
