import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "whatsapp" | "ghost" | "light" | "outline";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition duration-200 active:scale-[0.98] focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-accent-500 text-navy-950 shadow-lg shadow-accent-500/25 hover:-translate-y-0.5 hover:bg-accent-400",
  whatsapp: "bg-wa text-white shadow-lg shadow-wa/25 hover:-translate-y-0.5 hover:bg-wa-dark",
  ghost: "border border-white/30 text-white hover:bg-white/10",
  light: "bg-white text-navy-900 shadow-card hover:-translate-y-0.5 hover:shadow-lift",
  outline: "border border-navy-900/15 text-navy-900 hover:border-accent-500 hover:text-accent-600",
};

type Props = { variant?: Variant; className?: string; children: ReactNode };

export function ButtonLink({ variant = "primary", className = "", children, ...rest }: Props & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function ExternalButton({ variant = "primary", className = "", children, ...rest }: Props & ComponentProps<"a">) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}

export function Button({ variant = "primary", className = "", children, ...rest }: Props & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} disabled:opacity-60 ${className}`} {...rest}>
      {children}
    </button>
  );
}
