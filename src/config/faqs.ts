export type Faq = { q: string; a: string };

/** Respuestas de carácter general: los detalles dependen de cada aseguradora y póliza. */
export const faqs: Faq[] = [
  {
    q: "¿Qué necesito para cotizar un seguro?",
    a: "Depende del seguro. Para un vehículo suelen pedirse marca, modelo, año y uso; para el hogar, la localidad, el tipo de propiedad y qué querés cubrir; para una empresa, el rubro y la actividad. Con el formulario de esta web alcanza para empezar: después un asesor te pedirá, si hace falta, algún dato adicional.",
  },
  {
    q: "¿Qué diferencia existe entre cobertura total y parcial?",
    a: "En general, una cobertura parcial protege frente a ciertos hechos (por ejemplo responsabilidad civil, robo o incendio), mientras que una cobertura total suma también daños propios, como los de un choque. Los nombres, alcances y exclusiones varían según la aseguradora y la póliza, por eso conviene revisarlos juntos antes de decidir.",
  },
  {
    q: "¿Qué es el seguro obligatorio SOA?",
    a: "El SOA (Seguro Obligatorio de Automotores) es un seguro exigido por la normativa uruguaya para los vehículos que circulan. Está orientado a cubrir daños personales (lesiones y fallecimiento) y no cubre los daños materiales del vehículo. Los alcances y montos vigentes los confirmamos con vos al momento de contratar.",
  },
  {
    q: "¿Cómo funciona una franquicia?",
    a: "La franquicia es la parte de un siniestro que queda a cargo de la persona asegurada; el resto lo cubre la aseguradora según la póliza. Puede expresarse como un monto o un porcentaje. Una franquicia más alta suele implicar una cuota menor y viceversa, pero cada caso se define en la póliza.",
  },
  {
    q: "¿Qué debo hacer si tengo un siniestro?",
    a: "Primero, tu seguridad y la de las personas involucradas. Luego, reunir los datos básicos del hecho, tener a mano tu póliza y comunicarte con la aseguradora dentro de los plazos que indique tu contrato. Si querés orientación, escribinos. Revisá la sección “Qué hacer en caso de siniestro” de esta web.",
  },
  {
    q: "¿Puedo solicitar asesoramiento por WhatsApp?",
    a: "Sí. Podés escribirnos desde el botón verde de la web o completar el formulario: se abrirá WhatsApp con un mensaje ordenado con tus datos para que nos lo envíes. Es una consulta sin compromiso.",
  },
];
