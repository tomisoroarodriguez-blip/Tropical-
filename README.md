# Martínez Seguros — sitio web

Next.js (App Router) + TypeScript + Tailwind CSS 4 + Lucide + Motion. Sin backend ni base de datos (v1).

## Ejecutar localmente
```bash
npm install
npm run dev          # http://localhost:3000
# Producción local:
npm run build && npm start
npm run lint && npm run typecheck
```
Requiere Node 20+. Copiá `.env.example` a `.env.local` si querés definir `NEXT_PUBLIC_SITE_URL` o `NEXT_PUBLIC_GA_ID`.

## Dónde se edita cada cosa
| Qué | Archivo |
|---|---|
| Teléfono, WhatsApp, correo, dirección, Instagram, horarios | `src/config/site.ts` |
| Tipos de seguro, textos, campos del formulario, mensajes de WhatsApp | `src/config/insurances.ts` |
| Preguntas frecuentes | `src/config/faqs.ts` |
| Colores de marca | `src/app/globals.css` (bloque `@theme`) |
| Logo (recreado a partir del Instagram; reemplazar por el archivo original) | `src/components/layout/Logo.tsx` |
| Aviso de privacidad (borrador) | `src/app/privacidad/page.tsx` |

Los contenidos están separados de los componentes a propósito: cuando se agregue un panel administrativo, esos archivos pasan a leerse de una base de datos sin tocar la UI.

## Analítica
No se carga nada por defecto. Con `NEXT_PUBLIC_GA_ID` definido, aparece un banner de consentimiento y Google Analytics solo se activa si la persona acepta. Los clics en WhatsApp (`whatsapp_click`) y envíos del formulario (`quote_submit`) se miden únicamente con consentimiento.

## Pendiente de confirmar con el cliente
Teléfono y correo (tomados del Instagram; la ficha comercial traía otros), dirección (ficha comercial), horarios, logo y colores reales, fotografías autorizadas, texto institucional, qué seguros ofrece realmente, y revisión legal del aviso de privacidad.
