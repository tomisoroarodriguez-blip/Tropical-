import { ArrowRight, Car, House, ShieldCheck, Store, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { defaultWhatsappMessage } from "@/lib/whatsapp";

const chips = ["Cotización sin costo", "Asesoramiento personalizado", "Para personas y empresas"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pt-28 text-white sm:pt-32 lg:pt-36" aria-labelledby="hero-title">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_20%,rgb(247_190_104/0.28),transparent),radial-gradient(50%_50%_at_0%_100%,rgb(26_58_104/0.9),transparent)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_70%_at_50%_40%,black,transparent)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-accent-300">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Corredores de seguros en Montevideo y Uruguay
          </p>
          <h1 id="hero-title" className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Protegemos lo que <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">más importa.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl">
            Encontrá la cobertura adecuada para vos, tu familia o tu empresa con asesoramiento personalizado.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#cotizar" className="text-lg">
              Cotizar mi seguro <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </ButtonLink>
            <WhatsAppButton message={defaultWhatsappMessage} source="hero" className="text-lg">
              Hablar con un asesor
            </WhatsAppButton>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-navy-100">
            {chips.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden="true" /> {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Composición visual (reemplazable por fotografía profesional cuando esté disponible) */}
        <div aria-hidden="true" className="relative mx-auto hidden aspect-square w-full max-w-md sm:block lg:max-w-none">
          <div className="absolute inset-[8%] rounded-full border border-white/10" />
          <div className="absolute inset-[22%] rounded-full border border-accent-400/30" />
          <div className="absolute inset-[34%] grid place-items-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600 shadow-[0_0_80px_-10px_rgb(247_190_104/0.8)]">
            <ShieldCheck className="h-1/2 w-1/2 text-navy-950" strokeWidth={1.8} />
          </div>
          <Tile className="left-0 top-[14%] float-slow" icon={<Car className="h-6 w-6" />} label="Auto" />
          <Tile className="right-0 top-[26%] float-slower" icon={<House className="h-6 w-6" />} label="Hogar" />
          <Tile className="bottom-[14%] left-[8%] float-slower" icon={<Store className="h-6 w-6" />} label="Empresa" />
          <Tile className="bottom-[6%] right-[10%] float-slow" icon={<Users className="h-6 w-6" />} label="Familia" />
        </div>
      </div>
      <div aria-hidden="true" className="h-8 rounded-t-[2.5rem] bg-white" />
    </section>
  );
}

function Tile({ icon, label, className }: { icon: React.ReactNode; label: string; className: string }) {
  return (
    <div className={`absolute flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-lift backdrop-blur-md ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-navy-900">{icon}</span>
      <span className="pr-1 text-sm font-bold">{label}</span>
    </div>
  );
}
