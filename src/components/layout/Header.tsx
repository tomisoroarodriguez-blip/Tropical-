"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navLinks } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled || open ? "bg-white/95 shadow-card backdrop-blur" : "bg-white"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-20">
        <Link href="/" aria-label="Martínez Seguros, ir al inicio" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-4 py-2 text-[0.95rem] font-semibold text-navy-900/80 transition hover:bg-mist hover:text-navy-900">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/#cotizar" className="!min-h-11 !px-5 !py-2 text-[0.95rem]">
            Cotizar
          </ButtonLink>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-navy-900 hover:bg-mist lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <nav id="menu-movil" aria-label="Menú móvil" hidden={!open} className="border-t border-navy-900/10 bg-white lg:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-xl px-3 text-lg font-semibold text-navy-900 hover:bg-mist">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
