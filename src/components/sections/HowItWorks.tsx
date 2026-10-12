import { ClipboardList, Headset, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { icon: ClipboardList, title: "Contanos qué necesitás", text: "Completá el formulario o escribinos por WhatsApp con los datos básicos de lo que querés proteger." },
  { icon: Headset, title: "Recibí asesoramiento y alternativas", text: "Analizamos tu caso y te presentamos opciones de cobertura, explicadas con claridad." },
  { icon: ShieldCheck, title: "Elegí la opción que mejor se adapte", text: "Decidís vos, sin presiones. Te acompañamos en la contratación." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white py-20 sm:py-24" aria-labelledby="how-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="how-title" eyebrow="Cómo funciona" title="Tres pasos, sin complicaciones" />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-teal-500/40 md:block" />
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.12} className="relative text-center">
                <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-navy-900 text-teal-300 shadow-lift ring-8 ring-white">
                  <s.icon className="h-7 w-7" aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-teal-500 text-sm font-extrabold text-navy-950">{i + 1}</span>
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy-900"><span className="sr-only">Paso {i + 1}: </span>{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs leading-relaxed text-ink/75">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
