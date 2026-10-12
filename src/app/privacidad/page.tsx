import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Aviso de privacidad", description: "Cómo usa Martínez Seguros los datos que enviás desde esta web.", alternates: { canonical: "/privacidad" } };

export default function Privacidad() {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
      <h1 className="text-4xl font-extrabold tracking-tight text-navy-900">Aviso de privacidad</h1>
      <p className="mt-2 text-sm text-ink/60">Borrador provisional: debe ser revisado y aprobado por Martínez Seguros (Ley N.º 18.331 de Protección de Datos Personales de Uruguay).</p>
      <div className="mt-8 space-y-6 leading-relaxed text-ink/85 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy-900">
        <section><h2>Qué datos recopilamos</h2><p>Solo los que ingresás en el formulario: nombre, teléfono, correo electrónico (opcional) y los datos del seguro que consultás. No solicitamos documentos de identidad, datos bancarios ni contraseñas.</p></section>
        <section><h2>Para qué los usamos</h2><p>Para contactarte y brindarte asesoramiento sobre seguros. En esta versión, el formulario no se guarda en ningún servidor: arma un mensaje de WhatsApp que vos decidís enviar.</p></section>
        <section><h2>Cookies de medición</h2><p>Si se configura Google Analytics, solo se activará después de que aceptes las cookies de medición. Podés rechazarlas y seguir usando la web normalmente.</p></section>
        <section><h2>Tus derechos</h2><p>Podés solicitar acceso, rectificación o eliminación de tus datos escribiendo a <a className="font-semibold text-teal-600 underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p></section>
      </div>
    </article>
  );
}
