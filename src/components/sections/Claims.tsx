import { CarFront, House, PhoneCall, ShieldAlert, Info } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const cases = [
  { icon: CarFront, title: "Accidente de tránsito", steps: ["Priorizá la seguridad de las personas y pedí asistencia médica si hace falta.", "Intercambiá datos con las otras partes y, si es posible, registrá fotos de la escena.", "Tené a mano tu póliza y avisá a la aseguradora en el plazo que indique tu contrato."] },
  { icon: House, title: "Daños en el hogar", steps: ["Evitá riesgos: cortá la luz, el agua o el gas si corresponde.", "Documentá los daños con fotos y videos antes de reparar.", "Conservá facturas y comunicate con tu aseguradora para saber cómo continuar."] },
  { icon: ShieldAlert, title: "Robo o hurto", steps: ["Si hay peligro, ponete a salvo primero.", "Realizá la denuncia policial correspondiente.", "Reuní la documentación del bien y avisá a la aseguradora cuanto antes."] },
];

export function Claims() {
  return (
    <section id="siniestros" className="bg-mist py-20 sm:py-24" aria-labelledby="claims-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="claims-title" eyebrow="Para clientes" title="Qué hacer en caso de siniestro" text="Una guía general para mantener la calma y actuar con orden. Si tenés dudas, escribinos y te orientamos." />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <article className="h-full rounded-3xl bg-white p-7 shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-teal-300"><c.icon className="h-6 w-6" aria-hidden="true" /></span>
                <h3 className="mt-5 text-xl font-bold text-navy-900">{c.title}</h3>
                <ol className="mt-4 space-y-3">
                  {c.steps.map((s, n) => (
                    <li key={s} className="flex gap-3 leading-relaxed text-ink/80">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-500/15 text-xs font-extrabold text-teal-600">{n + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl bg-white p-7 shadow-card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-teal-300"><PhoneCall className="h-6 w-6" aria-hidden="true" /></span>
            <h3 className="mt-5 text-xl font-bold text-navy-900">Cómo contactar a la aseguradora</h3>
            <p className="mt-3 leading-relaxed text-ink/80">
              Los canales de denuncia de siniestros (teléfono, aplicación o sitio web) figuran en tu póliza y en la documentación que te entregó la aseguradora. Buscalos ahí: son los oficiales para tu cobertura. Si no los encontrás, pedinos ayuda.
            </p>
          </div>
          <div className="flex flex-col justify-between rounded-3xl bg-navy-900 p-7 text-white shadow-lift">
            <div>
              <h3 className="text-xl font-bold">¿Necesitás orientación?</h3>
              <p className="mt-2 leading-relaxed text-navy-100">Te ayudamos a entender los pasos a seguir con tu aseguradora.</p>
            </div>
            <WhatsAppButton className="mt-6" source="siniestros" message="Hola, tuve un siniestro y necesito asesoramiento.">Necesito asesoramiento</WhatsAppButton>
          </div>
        </div>

        <p className="mt-6 flex items-start gap-3 rounded-2xl border border-teal-500/30 bg-teal-500/10 p-4 text-sm leading-relaxed text-navy-900">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
          <span>Esta información es general. Los procedimientos, plazos y documentación específicos dependen de la compañía aseguradora y de la póliza contratada. Ante una emergencia, comunicate con los servicios de emergencia locales.</span>
        </p>
      </div>
    </section>
  );
}
