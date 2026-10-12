import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon } from "@/components/ui/Icons";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { defaultWhatsappMessage } from "@/lib/whatsapp";
import { fullAddress, mapsUrl, site } from "@/config/site";

export function Contact() {
  const c = site.contact;
  const rows = [
    { icon: Phone, label: "Teléfono", value: c.phoneDisplay, href: c.phoneHref },
    { icon: Mail, label: "Correo electrónico", value: c.email, href: `mailto:${c.email}` },
    { icon: InstagramIcon, label: "Instagram", value: `@${c.instagramUser}`, href: c.instagramUrl, external: true },
    { icon: MapPin, label: "Dirección", value: fullAddress, href: mapsUrl, external: true },
  ];
  return (
    <section id="contacto" className="bg-white py-20 sm:py-24" aria-labelledby="contact-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="contact-title" eyebrow="Contacto" title="Hablemos de lo que querés proteger" text="Escribinos por el medio que te resulte más cómodo." />
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {rows.map((r) => (
              <li key={r.label}>
                <a href={r.href} {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex h-full items-start gap-4 rounded-2xl border border-navy-900/10 p-5 transition hover:-translate-y-1 hover:border-accent-500/50 hover:shadow-lift">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-accent-300 transition group-hover:bg-accent-500 group-hover:text-navy-950"><r.icon className="h-6 w-6" aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink/60">{r.label}</span>
                    <span className="block break-words font-bold text-navy-900">{r.value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="sm:col-span-2">
              <div className="flex items-start gap-4 rounded-2xl border border-navy-900/10 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-accent-300"><Clock className="h-6 w-6" aria-hidden="true" /></span>
                <div>
                  <p className="text-sm font-semibold text-ink/60">Horarios de atención</p>
                  {site.hours.length ? (
                    site.hours.map((h) => <p key={h.days} className="font-bold text-navy-900">{h.days}: {h.time}</p>)
                  ) : (
                    <p className="font-bold text-navy-900">A confirmar. Escribinos por WhatsApp y te respondemos.</p>
                  )}
                </div>
              </div>
            </li>
          </ul>
          <div className="flex flex-col justify-between rounded-3xl bg-navy-900 p-8 text-white shadow-lift">
            <div>
              <h3 className="text-2xl font-extrabold">La forma más rápida de consultarnos</h3>
              <p className="mt-3 leading-relaxed text-navy-100">Escribinos por WhatsApp y contanos qué necesitás. Sin compromiso.</p>
            </div>
            <WhatsAppButton message={defaultWhatsappMessage} source="contacto" className="mt-8 text-lg">Escribir por WhatsApp</WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
