import Link from "next/link";
import { Logo } from "./Logo";
import { InstagramIcon } from "@/components/ui/Icons";
import { insurances } from "@/config/insurances";
import { fullAddress, navLinks, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-navy-950 pb-24 pt-14 text-navy-100 sm:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{site.tagline}. Te acompañamos a elegir la cobertura que mejor se adapte a tu necesidad.</p>
          <a href={site.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold text-white hover:bg-white/10">
            <InstagramIcon className="h-5 w-5" /> @{site.contact.instagramUser}
          </a>
        </div>
        <nav aria-label="Seguros">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Seguros</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {insurances.map((i) => (
              <li key={i.slug}><Link href={`/seguros/${i.slug}`} className="hover:text-accent-300">{i.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Secciones">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">La web</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-accent-300">{l.label}</Link></li>
            ))}
            <li><Link href="/privacidad" className="hover:text-accent-300">Privacidad</Link></li>
          </ul>
          <p className="mt-5 text-sm">{fullAddress}</p>
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 text-xs leading-relaxed text-navy-100/70 sm:px-6">
        <p>© {new Date().getFullYear()} {site.name}. Las coberturas, condiciones y exclusiones dependen de cada aseguradora y de la póliza contratada. La información de esta web es orientativa y no constituye una oferta ni una cotización definitiva.</p>
      </div>
    </footer>
  );
}
