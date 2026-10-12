import { ShieldCheck } from "lucide-react";

/** Logotipo provisional hasta recibir el original de la marca. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-navy-950 shadow-md">
        <ShieldCheck className="h-6 w-6" strokeWidth={2.4} aria-hidden="true" />
      </span>
      <span className={`flex flex-col leading-none ${light ? "text-white" : "text-navy-900"}`}>
        <span className="text-lg font-extrabold tracking-tight">Martínez</span>
        <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.28em] ${light ? "text-teal-300" : "text-teal-600"}`}>Seguros</span>
      </span>
    </span>
  );
}
