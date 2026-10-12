import type { FieldDef } from "@/config/insurances";

export type Errors = Record<string, string>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validatePhone(value: string): string | null {
  if (!value.trim()) return "Ingresá un teléfono de contacto.";
  const digits = value.replace(/[\s().-]/g, "").replace(/^\+/, "");
  if (!/^\d+$/.test(digits)) return "Usá solo números, por ejemplo 099 123 456.";
  if (digits.length < 8 || digits.length > 12) return "Revisá el teléfono: parece incompleto.";
  return null;
}

export function validateField(field: FieldDef, value: string): string | null {
  const v = value.trim();
  if (!v) return field.required ? "Este dato es obligatorio." : null;
  if (field.type === "number") {
    const n = Number(v);
    if (!Number.isInteger(n)) return "Ingresá un número entero.";
    if (field.name === "anio") {
      const max = new Date().getFullYear() + 1;
      if (n < (field.min ?? 1950) || n > max) return `Ingresá un año entre ${field.min ?? 1950} y ${max}.`;
    } else if (field.min !== undefined && n < field.min) return `El mínimo es ${field.min}.`;
  }
  if (field.type === "text" && v.length > 80) return "Máximo 80 caracteres.";
  return null;
}

export function validateContact(values: { nombre: string; telefono: string; email: string }): Errors {
  const e: Errors = {};
  if (values.nombre.trim().length < 3) e.nombre = "Ingresá tu nombre completo.";
  const phoneErr = validatePhone(values.telefono);
  if (phoneErr) e.telefono = phoneErr;
  if (values.email.trim() && !emailRe.test(values.email.trim())) e.email = "Revisá el correo electrónico.";
  return e;
}
