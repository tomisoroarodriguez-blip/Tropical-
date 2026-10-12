import { Handshake, LifeBuoy, SearchCheck, Sliders, UserRoundCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  { icon: UserRoundCheck, title: "Asesoramiento personalizado", text: "Escuchamos tu situación antes de proponer. No hay dos personas ni dos empresas con las mismas necesidades." },
  { icon: SearchCheck, title: "Entender qué estás contratando", text: "Te explicamos coberturas, franquicias y exclusiones en un lenguaje claro, para que decidas con información." },
  { icon: Handshake, title: "Acompañamiento en la contratación", text: "Te guiamos en los pasos para contratar y resolvemos tus dudas en el camino." },
  { icon: LifeBuoy, title: "Orientación ante siniestros", text: "Si ocurre un imprevisto, podés consultarnos para saber cómo proceder con tu aseguradora." },
  { icon: Sliders, title: "Soluciones a medida", text: "Buscamos alternativas que se adapten a lo que necesitás proteger, no a la inversa." },
];

export function WhyUs() {
  return (
    <section id="por-que-elegirnos" className="bg-mist py-20 sm:py-24" aria-labelledby="why-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="why-title" eyebrow="Por qué elegirnos" title="Contratar con un asesor hace la diferencia" text="Un seguro es una promesa a futuro. Tener a alguien que te explique, te acompañe y te oriente cuando lo necesites es parte de esa tranquilidad." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.05} className={i === 0 ? "lg:row-span-1" : ""}>
              <div className="h-full rounded-3xl bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-500/15 text-accent-600"><it.icon className="h-6 w-6" aria-hidden="true" /></span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{it.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/75">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
