/**
 * Medición opt-in. Nada se carga ni se envía hasta que la persona acepta las cookies de
 * medición Y existe NEXT_PUBLIC_GA_ID. Sin consentimiento, trackEvent no hace nada.
 */
export const CONSENT_KEY = "ms-consent-v1";
export type Consent = "granted" | "denied" | null;

export function getConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* almacenamiento no disponible */
  }
  window.dispatchEvent(new CustomEvent("ms-consent", { detail: value }));
}

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || getConsent() !== "granted") return;
  (window as GtagWindow).gtag?.("event", name, params);
}
