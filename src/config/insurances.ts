import type { LucideIcon } from "lucide-react";
import { Bike, Car, HeartPulse, House, KeyRound, Plane, ShieldPlus, Store } from "lucide-react";

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "number" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
};

export type InsuranceType = {
  slug: string;
  name: string;
  short: string;
  /** Texto de página de detalle (SEO). */
  intro: string;
  covers: string[];
  icon: LucideIcon;
  /** Mensaje de WhatsApp cuando la consulta nace desde esta categoría. */
  whatsappMessage: string;
  seoTitle: string;
  seoDescription: string;
  fields: FieldDef[];
};

const coverageAuto = ["Responsabilidad civil", "Cobertura parcial", "Cobertura total", "No lo sé, necesito orientación"];
const localidad: FieldDef = { name: "localidad", label: "Localidad", type: "text", required: true, placeholder: "Ej. Montevideo, Pocitos" };

/**
 * Categorías sujetas a confirmación de que Martínez Seguros efectivamente las ofrece.
 * Para ocultar una, comentarla o agregar `enabled: false` cuando exista el panel.
 */
export const insurances: InsuranceType[] = [
  {
    slug: "auto",
    name: "Seguro de automóviles",
    short: "Protección para tu vehículo y para terceros, con la cobertura que mejor se ajuste a tu uso.",
    intro: "Elegir un seguro de auto no es solo comparar precios: importa qué cubre, qué franquicia aplica y cómo se actúa ante un siniestro. Te ayudamos a entender las alternativas disponibles.",
    covers: ["Responsabilidad civil frente a terceros", "Opciones de cobertura parcial o total", "Orientación sobre franquicias y exclusiones", "Seguro Obligatorio de Automotores (SOA)"],
    icon: Car,
    whatsappMessage: "Hola, quiero consultar por un seguro para mi vehículo.",
    seoTitle: "Cotizar seguro de auto en Uruguay",
    seoDescription: "Solicitá asesoramiento para cotizar tu seguro de auto en Uruguay. Te ayudamos a comparar coberturas, entender la franquicia y elegir con tranquilidad.",
    fields: [
      { name: "marca", label: "Marca", type: "text", required: true, placeholder: "Ej. Volkswagen" },
      { name: "modelo", label: "Modelo", type: "text", required: true, placeholder: "Ej. Gol" },
      { name: "anio", label: "Año", type: "number", required: true, min: 1950, placeholder: "Ej. 2018" },
      { name: "uso", label: "Uso del vehículo", type: "select", required: true, options: ["Particular", "Trabajo / comercial", "Aplicaciones de transporte", "Otro"] },
      { name: "cobertura", label: "Cobertura solicitada", type: "select", required: true, options: coverageAuto },
    ],
  },
  {
    slug: "moto",
    name: "Seguro de motos",
    short: "Cobertura para tu moto, pensada para el uso diario o recreativo.",
    intro: "Las motos tienen riesgos y necesidades propias. Revisamos con vos el uso, la cobertura y las condiciones para que sepas qué estás contratando.",
    covers: ["Responsabilidad civil frente a terceros", "Alternativas de cobertura parcial o total", "Orientación ante robo o accidente"],
    icon: Bike,
    whatsappMessage: "Hola, quiero consultar por un seguro para mi moto.",
    seoTitle: "Seguro de motos en Uruguay",
    seoDescription: "Asesoramiento para contratar el seguro de tu moto en Uruguay. Conocé las alternativas de cobertura y solicitá orientación personalizada.",
    fields: [
      { name: "marca", label: "Marca", type: "text", required: true, placeholder: "Ej. Yamaha" },
      { name: "modelo", label: "Modelo", type: "text", required: true },
      { name: "anio", label: "Año", type: "number", required: true, min: 1950, placeholder: "Ej. 2020" },
      { name: "uso", label: "Uso", type: "select", required: true, options: ["Particular", "Trabajo / reparto", "Recreativo", "Otro"] },
      { name: "cobertura", label: "Cobertura solicitada", type: "select", required: true, options: coverageAuto },
    ],
  },
  {
    slug: "hogar",
    name: "Seguro de hogar",
    short: "Cuidá tu casa o apartamento y lo que hay adentro frente a imprevistos.",
    intro: "Tu hogar es tu mayor patrimonio. Te orientamos para que la cobertura contemple lo que realmente querés proteger: la estructura, el contenido y la responsabilidad civil.",
    covers: ["Protección del inmueble", "Cobertura del contenido", "Responsabilidad civil del hogar", "Orientación ante daños o robo"],
    icon: House,
    whatsappMessage: "Hola, quiero recibir asesoramiento sobre seguros de hogar.",
    seoTitle: "Seguro de hogar en Montevideo",
    seoDescription: "Asesoramiento para contratar seguro de hogar en Montevideo y Uruguay. Protegé tu casa o apartamento con la cobertura adecuada.",
    fields: [
      localidad,
      { name: "propiedad", label: "Tipo de propiedad", type: "select", required: true, options: ["Casa", "Apartamento", "Local con vivienda", "Otro"] },
      { name: "cobertura", label: "Cobertura requerida", type: "select", required: true, options: ["Incendio", "Robo / hurto", "Daños por agua", "Responsabilidad civil", "Cobertura integral", "No lo sé, necesito orientación"] },
    ],
  },
  {
    slug: "vida",
    name: "Seguro de vida",
    short: "Respaldo económico para las personas que más te importan.",
    intro: "Un seguro de vida es una decisión personal. Te explicamos cómo funcionan las alternativas para que elijas con información clara y sin presiones.",
    covers: ["Protección para tu familia", "Alternativas según tu situación", "Explicación clara de condiciones"],
    icon: HeartPulse,
    whatsappMessage: "Hola, quiero recibir asesoramiento sobre seguros de vida.",
    seoTitle: "Seguro de vida en Uruguay",
    seoDescription: "Asesoramiento sobre seguros de vida en Uruguay. Conocé las alternativas para proteger a tu familia con orientación personalizada.",
    fields: [
      { name: "interes", label: "¿Qué te gustaría proteger?", type: "select", required: true, options: ["A mi familia", "Un préstamo o compromiso", "Mi actividad profesional", "Todavía no lo sé"] },
    ],
  },
  {
    slug: "comercio",
    name: "Seguro de comercio y empresas",
    short: "Soluciones para proteger tu negocio, tu equipo y tu actividad.",
    intro: "Cada empresa tiene riesgos distintos. Analizamos tu actividad para sugerir una protección acorde: local, mercadería, equipos y responsabilidad civil.",
    covers: ["Local y mercadería", "Equipos y maquinaria", "Responsabilidad civil", "Coberturas según el rubro"],
    icon: Store,
    whatsappMessage: "Hola, quiero recibir asesoramiento sobre seguros para mi comercio o empresa.",
    seoTitle: "Seguros para comercios y empresas en Uruguay",
    seoDescription: "Asesoramiento en seguros para comercios y empresas en Montevideo y Uruguay. Soluciones adaptadas a tu rubro.",
    fields: [
      { name: "rubro", label: "Rubro", type: "text", required: true, placeholder: "Ej. Gastronomía, comercio minorista" },
      localidad,
      { name: "proteccion", label: "Protección requerida", type: "select", required: true, options: ["Local / edificio", "Mercadería", "Equipos y maquinaria", "Responsabilidad civil", "Flota de vehículos", "Cobertura integral", "No lo sé, necesito orientación"] },
    ],
  },
  {
    slug: "viaje",
    name: "Seguro de viaje",
    short: "Viajá con respaldo ante imprevistos médicos y de equipaje.",
    intro: "Antes de viajar conviene saber qué cubre tu seguro y qué exigen los destinos. Te orientamos según tu itinerario.",
    covers: ["Asistencia médica en el exterior", "Equipaje", "Alternativas según destino y duración"],
    icon: Plane,
    whatsappMessage: "Hola, quiero consultar por un seguro de viaje.",
    seoTitle: "Seguro de viaje en Uruguay",
    seoDescription: "Consultá por seguros de viaje en Uruguay. Te asesoramos según tu destino y la duración de tu viaje.",
    fields: [
      { name: "destino", label: "Destino", type: "text", required: true, placeholder: "Ej. Europa, Brasil" },
      { name: "fechas", label: "Fechas aproximadas", type: "text", placeholder: "Ej. marzo, 15 días" },
      { name: "viajeros", label: "Cantidad de viajeros", type: "number", required: true, min: 1, placeholder: "Ej. 2" },
    ],
  },
  {
    slug: "alquiler",
    name: "Seguro de alquiler",
    short: "Alternativas para inquilinos y propietarios que buscan mayor respaldo.",
    intro: "Te contamos qué alternativas existen para alquilar o dar en alquiler con mayor tranquilidad, y qué condiciones suelen pedirse.",
    covers: ["Opciones para inquilinos", "Opciones para propietarios", "Orientación sobre requisitos"],
    icon: KeyRound,
    whatsappMessage: "Hola, quiero consultar por un seguro de alquiler.",
    seoTitle: "Seguro de alquiler en Uruguay",
    seoDescription: "Asesoramiento sobre seguros de alquiler en Uruguay para inquilinos y propietarios.",
    fields: [
      { name: "rol", label: "Soy", type: "select", required: true, options: ["Inquilino/a", "Propietario/a", "Inmobiliaria"] },
      localidad,
    ],
  },
  {
    slug: "otros",
    name: "Otros seguros",
    short: "¿Necesitás otra cobertura? Contanos y buscamos la alternativa.",
    intro: "Si lo que buscás no está en la lista, consultanos. Evaluamos tu caso y te indicamos qué alternativas hay disponibles.",
    covers: ["Consultas específicas", "Asesoramiento caso por caso"],
    icon: ShieldPlus,
    whatsappMessage: "Hola, quiero hacer una consulta sobre seguros.",
    seoTitle: "Asesoramiento de seguros en Uruguay",
    seoDescription: "Consultá por cualquier tipo de seguro. Asesoramiento personalizado de Martínez Seguros en Uruguay.",
    fields: [{ name: "consulta", label: "¿Qué querés asegurar?", type: "text", required: true, placeholder: "Ej. Embarcación, equipos, mascota" }],
  },
];

export const getInsurance = (slug: string) => insurances.find((i) => i.slug === slug);
