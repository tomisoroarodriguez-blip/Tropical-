/**
 * Configuración central de Martínez Seguros.
 * TODOS los datos de contacto y comerciales se editan acá.
 * Los campos marcados `pending: true` son provisionales y deben confirmarse con el cliente.
 */
export const site = {
  name: "Martínez Seguros",
  tagline: "Corredores de seguros: asesoramiento y comercialización en Uruguay",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_UY",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",

  contact: {
    /** Tomados del Instagram oficial (bio y publicaciones). Confirmar con el cliente. */
    pending: true,
    phoneDisplay: "099 419 210",
    /** Formato internacional sin "+" ni espacios (Uruguay = 598, sin el 0 inicial). */
    whatsappNumber: "59899419210",
    phoneHref: "tel:+59899419210",
    email: "shmartinez66@hotmail.com",
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
