import { ClipboardList, MessageCircle, ShieldCheck } from "lucide-react";
import { QuoteForm } from "./QuoteForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  { icon: ClipboardList, text: "Completás unos pocos datos, sin papeleo." },
  { icon: MessageCircle, text: "Se abre WhatsApp con tu consulta ordenada." },
  { icon: ShieldCheck, text: "Un asesor revisa tu caso y te propone alternativas." },
];

export function QuoteSection({ initialType = "" }: { initialType?: string }) {
  return (
    <section id="cotizar" className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-24" aria-labelledby="cotizar-title">
      <div aria-hidden="true" className="absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading id="cotizar-title" align="left" dark eyebrow="Solicitá tu cotización" title="Contanos qué necesitás y te asesoramos" text="El formulario se adapta al seguro que elijas. No mostramos precios automáticos: cada propuesta se arma con información real de cobertura." />
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p.text} className="flex items-center gap-4 text-navy-100">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-accent-300"><p.icon className="h-5 w-5" aria-hidden="true" /></span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>
        <QuoteForm initialType={initialType} />
      </div>
    </section>
  );
}
