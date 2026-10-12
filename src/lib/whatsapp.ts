import { site } from "@/config/site";
import { getInsurance, type InsuranceType } from "@/config/insurances";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage = "Hola, quiero recibir asesoramiento sobre seguros.";

/** Mensaje contextual según la ruta desde la que se escribe. */
export function messageForPath(pathname: string): string {
  const match = pathname.match(/^\/seguros\/([^/]+)/);
  const insurance = match ? getInsurance(match[1]) : undefined;
  return insurance?.whatsappMessage ?? defaultWhatsappMessage;
}

export type QuoteData = {
  insurance: InsuranceType;
  nombre: string;
  telefono: string;
  email?: string;
  extra: Record<string, string>;
  info?: string;
};

export function buildQuoteMessage({ insurance, nombre, telefono, email, extra, info }: QuoteData): string {
  const lines = [
    "Hola, quiero solicitar asesoramiento para cotizar un seguro.",
    "",
    `*Seguro:* ${insurance.name}`,
    `*Nombre:* ${nombre}`,
    `*Teléfono:* ${telefono}`,
  ];
  if (email) lines.push(`*Correo:* ${email}`);
  const details = insurance.fields
    .filter((f) => extra[f.name]?.trim())
    .map((f) => `• ${f.label}: ${extra[f.name].trim()}`);
  if (details.length) lines.push("", "*Detalles:*", ...details);
  if (info?.trim()) lines.push("", `*Información adicional:* ${info.trim()}`);
  lines.push("", "Enviado desde la web de Martínez Seguros.");
  return lines.join("\n");
}
