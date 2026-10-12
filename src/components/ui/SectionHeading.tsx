export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  dark = false,
  id,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  dark?: boolean;
  id?: string;
}) {
  return (
    <div className={`mx-auto max-w-2xl ${align === "center" ? "text-center" : "text-left mx-0"}`}>
      <p className={`mb-3 text-sm font-bold uppercase tracking-[0.16em] ${dark ? "text-teal-300" : "text-teal-600"}`}>{eyebrow}</p>
      <h2 id={id} className={`text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${dark ? "text-white" : "text-navy-900"}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-navy-100" : "text-ink/75"}`}>{text}</p>}
    </div>
  );
}
