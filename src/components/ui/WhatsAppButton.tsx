"use client";

import { WhatsAppIcon } from "@/components/ui/Icons";
import { ExternalButton } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import type { ReactNode } from "react";

/** Botón a WhatsApp con mensaje predefinido y medición de clics (solo con consentimiento). */
export function WhatsAppButton({
  message,
  source,
  children,
  variant = "whatsapp",
  className,
}: {
  message: string;
  source: string;
  children: ReactNode;
  variant?: "whatsapp" | "ghost" | "light" | "outline";
  className?: string;
}) {
  return (
    <ExternalButton
      variant={variant}
      className={className}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source })}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {children}
    </ExternalButton>
  );
}
