"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { trackEvent } from "@/lib/analytics";
import { messageForPath, whatsappUrl } from "@/lib/whatsapp";

/** Botón flotante: el mensaje cambia según la página (auto, hogar, etc.). */
export function WhatsAppFloat() {
  const pathname = usePathname();
  return (
    <a
      href={whatsappUrl(messageForPath(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
      className="group fixed bottom-4 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-wa pl-4 pr-4 text-white shadow-xl shadow-black/25 transition hover:-translate-y-0.5 hover:bg-wa-dark active:scale-95 sm:bottom-6 sm:right-6 sm:pr-5"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden text-base font-bold sm:inline">Escribinos</span>
    </a>
  );
}
