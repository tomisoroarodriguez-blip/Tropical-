"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getConsent, setConsent, type Consent } from "@/lib/analytics";
import { site } from "@/config/site";

/**
 * Banner de consentimiento + carga condicionada de Google Analytics.
 * Si no hay NEXT_PUBLIC_GA_ID no se muestra nada y no se carga ningún script.
 */
const subscribe = (cb: () => void) => {
  window.addEventListener("ms-consent", cb);
  return () => window.removeEventListener("ms-consent", cb);
};

export function Analytics() {
  // En el servidor devuelve "pending" para no renderizar el banner hasta hidratar.
  const consent = useSyncExternalStore<Consent | "pending">(subscribe, getConsent, () => "pending");
  const ready = consent !== "pending";

  if (!site.gaId || !ready) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${site.gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent === null && (
        <div role="dialog" aria-label="Preferencias de cookies" className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-xl rounded-2xl bg-navy-900 p-5 text-white shadow-lift sm:bottom-6 sm:left-6 sm:right-auto">
          <p className="text-sm leading-relaxed text-navy-100">
            Usamos cookies de medición para entender cómo se usa la web y mejorarla. Solo se activan si las aceptás.{" "}
            <Link href="/privacidad" className="font-semibold text-teal-300 underline underline-offset-2">Más información</Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => setConsent("granted")} className="min-h-11 flex-1 rounded-full bg-teal-500 px-4 font-semibold text-navy-950 hover:bg-teal-400">Aceptar</button>
            <button type="button" onClick={() => setConsent("denied")} className="min-h-11 flex-1 rounded-full border border-white/30 px-4 font-semibold hover:bg-white/10">Rechazar</button>
          </div>
        </div>
      )}
    </>
  );
}
