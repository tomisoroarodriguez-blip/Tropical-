/** Logotipo: tres puntos (coral, gris, ámbar) + wordmark, según el logo de Instagram. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex flex-col items-start leading-none">
      <span className="mb-1 flex gap-1" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-coral" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#8e8e8e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-400" />
      </span>
      <span className={`text-[1.2rem] font-medium tracking-tight ${light ? "text-white" : "text-navy-900"}`}>Martinez</span>
      <span className={`-mt-0.5 text-[1.2rem] font-bold tracking-tight ${light ? "text-white" : "text-navy-900"}`}>Seguros</span>
    </span>
  );
}
