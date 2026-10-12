/**
 * Configuración central de Martínez Seguros.
 * TODOS los datos de contacto y comerciales se editan acá.
 * Los campos marcados `pending: true` son provisionales y deben confirmarse con el cliente.
 */
export const site = {
  name: "Martínez Seguros",
  tagline: "Asesoramiento y comercialización de seguros en Uruguay",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_UY",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",

  contact: {
    /** Datos tomados de una ficha comercial: pendientes de validación. */
    pending: true,
    phoneDisplay: "098 808 293",
    /** Formato internacional sin "+" ni espacios (Uruguay = 598, sin el 0 inicial). */
    whatsappNumber: "59898808293",
    phoneHref: "tel:+59898808293",
    email: "info.martinezseguros@gmail.com",
    instagramUser: "martinezseguros",
    instagramUrl: "https://instagram.com/martinezseguros",
    address: {
      street: "Juan Paullier 1117",
      city: "Montevideo",
      country: "Uruguay",
      countryCode: "UY",
    },
  },

  /** Horarios sin confirmar: dejar vacío para mostrar "A confirmar". */
  hours: [] as { days: string; time: string }[],
  hoursPending: true,
} as const;

export const fullAddress = `${site.contact.address.street}, ${site.contact.address.city}, ${site.contact.address.country}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

export const navLinks = [
  { href: "/#seguros", label: "Seguros" },
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#siniestros", label: "Siniestros" },
  { href: "/#preguntas", label: "Preguntas" },
  { href: "/#contacto", label: "Contacto" },
] as const;
