import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 pb-24 pt-40 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-accent-600">Error 404</p>
      <h1 className="mt-3 text-4xl font-extrabold text-navy-900">No encontramos esa página</h1>
      <p className="mt-4 text-ink/75">Puede que el enlace haya cambiado. Volvé al inicio o escribinos y te ayudamos.</p>
      <ButtonLink href="/" className="mt-8">Volver al inicio</ButtonLink>
    </section>
  );
}
