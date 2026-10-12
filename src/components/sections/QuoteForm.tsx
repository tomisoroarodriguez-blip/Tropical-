"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Lock, Send } from "lucide-react";
import { getInsurance, insurances, type FieldDef } from "@/config/insurances";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { useQuote } from "@/components/layout/QuoteContext";
import { trackEvent } from "@/lib/analytics";
import { validateContact, validateField, type Errors } from "@/lib/validation";
import { buildQuoteMessage, whatsappUrl } from "@/lib/whatsapp";

const inputCls =
  "mt-1.5 block scroll-mt-28 min-h-12 w-full rounded-xl border bg-white px-4 text-base text-ink placeholder:text-ink/40 transition focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-500/20 aria-[invalid=true]:border-red-600";

export function QuoteForm({ initialType = "" }: { initialType?: string }) {
  const { selected } = useQuote();
  const [type, setType] = useState(initialType);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [privacy, setPrivacy] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Precarga desde las tarjetas de seguros (se ajusta durante el render, sin efectos).
  const [prevSelected, setPrevSelected] = useState(selected);
  if (selected !== prevSelected) {
    setPrevSelected(selected);
    if (selected) setType(selected);
  }

  const insurance = getInsurance(type);
  const set = (name: string, v: string) => {
    setValues((s) => ({ ...s, [name]: v }));
    setErrors((e) => (e[name] ? { ...e, [name]: "" } : e));
  };

  function onTypeChange(slug: string) {
    setType(slug);
    setErrors({});
    setSentUrl(null);
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e: Errors = validateContact({ nombre: values.nombre ?? "", telefono: values.telefono ?? "", email: values.email ?? "" });
    if (!insurance) e.tipo = "Elegí el tipo de seguro.";
    insurance?.fields.forEach((f) => {
      const err = validateField(f, values[f.name] ?? "");
      if (err) e[f.name] = err;
    });
    if (!privacy) e.privacy = "Necesitamos tu conformidad para poder contactarte.";
    setErrors(e);

    const firstBad = Object.keys(e).find((k) => e[k]);
    if (firstBad || !insurance) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad === "tipo" ? "tipo" : firstBad}"]`)?.focus();
      return;
    }

    const url = whatsappUrl(
      buildQuoteMessage({ insurance, nombre: values.nombre.trim(), telefono: values.telefono.trim(), email: values.email?.trim(), extra: values, info: values.info }),
    );
    trackEvent("quote_submit", { insurance: insurance.slug });
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (sentUrl) {
    return (
      <div role="status" className="rounded-3xl bg-white p-8 text-center shadow-lift sm:p-10">
        <CheckCircle2 className="mx-auto h-14 w-14 text-wa" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-extrabold text-navy-900">¡Listo! Solo falta enviar el mensaje</h3>
        <p className="mx-auto mt-3 max-w-md text-ink/75">
          Abrimos WhatsApp con tus datos ordenados. Presioná “Enviar” allí para que un asesor reciba tu consulta. Si no se abrió, usá el botón.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-wa px-6 font-semibold text-white hover:bg-wa-dark">
            <WhatsAppIcon className="h-5 w-5" /> Abrir WhatsApp
          </a>
          <Button variant="outline" onClick={() => setSentUrl(null)}>Editar mis datos</Button>
        </div>
        <p className="mt-5 text-xs text-ink/60">Es una solicitud de asesoramiento: no representa una cotización definitiva ni la contratación de un seguro.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-3xl bg-white p-6 shadow-lift sm:p-9" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Tipo de seguro" error={errors.tipo} required className="sm:col-span-2">
          {(p) => (
            <select {...p} name="tipo" value={type} onChange={(e) => onTypeChange(e.target.value)} className={inputCls}>
              <option value="">Elegí una opción…</option>
              {insurances.map((i) => (
                <option key={i.slug} value={i.slug}>{i.name}</option>
              ))}
            </select>
          )}
        </Field>

        <Field label="Nombre completo" error={errors.nombre} required>
          {(p) => <input {...p} name="nombre" autoComplete="name" value={values.nombre ?? ""} onChange={(e) => set("nombre", e.target.value)} className={inputCls} />}
        </Field>
        <Field label="Teléfono" error={errors.telefono} required>
          {(p) => <input {...p} name="telefono" type="tel" inputMode="tel" autoComplete="tel" placeholder="099 123 456" value={values.telefono ?? ""} onChange={(e) => set("telefono", e.target.value)} className={inputCls} />}
        </Field>
        <Field label="Correo electrónico (opcional)" error={errors.email} className="sm:col-span-2">
          {(p) => <input {...p} name="email" type="email" inputMode="email" autoComplete="email" value={values.email ?? ""} onChange={(e) => set("email", e.target.value)} className={inputCls} />}
        </Field>

        {insurance && (
          <fieldset className="contents">
            <legend className="sr-only">Datos de {insurance.name}</legend>
            {insurance.fields.map((f) => (
              <DynamicField key={`${insurance.slug}-${f.name}`} field={f} value={values[f.name] ?? ""} error={errors[f.name]} onChange={(v) => set(f.name, v)} />
            ))}
          </fieldset>
        )}

        <Field label="Información adicional (opcional)" className="sm:col-span-2">
          {(p) => <textarea {...p} name="info" rows={3} maxLength={400} value={values.info ?? ""} onChange={(e) => set("info", e.target.value)} placeholder="Contanos cualquier detalle que nos ayude a asesorarte" className={`${inputCls} py-3`} />}
        </Field>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink/80">
          <input
            type="checkbox"
            name="privacy"
            checked={privacy}
            onChange={(e) => { setPrivacy(e.target.checked); setErrors((x) => ({ ...x, privacy: "" })); }}
            aria-invalid={!!errors.privacy}
            aria-describedby={errors.privacy ? "err-privacy" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-accent-600"
          />
          <span>
            Acepto que Martínez Seguros use estos datos para contactarme y asesorarme, según el{" "}
            <Link href="/privacidad" className="font-semibold text-accent-600 underline underline-offset-2">aviso de privacidad</Link>.
          </span>
        </label>
        {errors.privacy && <p id="err-privacy" className="mt-2 text-sm font-medium text-red-700">{errors.privacy}</p>}
      </div>

      <Button type="submit" variant="whatsapp" className="mt-7 w-full text-lg">
        <Send className="h-5 w-5" aria-hidden="true" /> Enviar por WhatsApp
      </Button>
      <p id="form-note" className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink/60">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        No pedimos datos sensibles (documentos, tarjetas ni contraseñas). Esta solicitud no es una cotización definitiva: un asesor te contactará con alternativas.
      </p>
      {Object.values(errors).some(Boolean) && (
        <p role="alert" className="sr-only">Hay datos por corregir en el formulario.</p>
      )}
    </form>
  );
}

type FieldProps = { id: string; "aria-invalid": boolean; "aria-describedby"?: string; "aria-required"?: boolean };

function Field({ label, error, required, className = "", children }: { label: string; error?: string; required?: boolean; className?: string; children: (p: FieldProps) => React.ReactNode }) {
  const id = `f-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-bold text-navy-900">
        {label}{required && <span className="text-red-700" aria-hidden="true"> *</span>}
      </label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": error ? `${id}-err` : undefined, "aria-required": required })}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}

function DynamicField({ field, value, error, onChange }: { field: FieldDef; value: string; error?: string; onChange: (v: string) => void }) {
  return (
    <Field label={field.label} error={error} required={field.required}>
      {(p) =>
        field.type === "select" ? (
          <select {...p} name={field.name} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
            <option value="">Elegí una opción…</option>
            {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input {...p} name={field.name} type="text" inputMode={field.type === "number" ? "numeric" : undefined} placeholder={field.placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
        )
      }
    </Field>
  );
}
