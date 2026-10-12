import { Eye, HeartHandshake, MessagesSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  { icon: HeartHandshake, title: "Cercanía", text: "Trato directo y personal con cada cliente." },
  { icon: Eye, title: "Transparencia", text: "Información clara sobre qué cubre cada opción." },
  { icon: MessagesSquare, title: "Comunicación simple", text: "Sin tecnicismos innecesarios." },
];

export function About() {
  return (
    <section id="nosotros" className="bg-mist py-20 sm:py-24" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading id="about-title" align="left" eyebrow="Nosotros" title="Martínez Seguros" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/80">
            <p>Somos una empresa dedicada al asesoramiento y la comercialización de seguros en Uruguay.</p>
            <p>Creemos que un seguro se elige mejor cuando alguien te explica las opciones con claridad y te acompaña antes, durante y después de contratarlo.</p>
          </div>
          {/* TODO(cliente): completar con historia, equipo y fotografías reales y autorizadas. */}
        </div>
        <ul className="grid gap-4">
          {values.map((v) => (
            <li key={v.title} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-accent-300"><v.icon className="h-6 w-6" aria-hidden="true" /></span>
              <div>
                <h3 className="font-bold text-navy-900">{v.title}</h3>
                <p className="text-ink/75">{v.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
