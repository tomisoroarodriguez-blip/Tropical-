import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Analytics } from "@/components/layout/Analytics";
import { QuoteProvider } from "@/components/layout/QuoteContext";
import { organizationLd, jsonLdString } from "@/lib/jsonld";
import { site } from "@/config/site";

export const viewport: Viewport = { themeColor: "#0b1f3a", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Martínez Seguros | Asesoramiento de seguros en Montevideo, Uruguay", template: "%s | Martínez Seguros" },
  description: "Asesoramiento personalizado en seguros de auto, hogar, vida y empresas en Montevideo y todo Uruguay. Solicitá tu cotización y hablá con un asesor por WhatsApp.",
  keywords: ["seguros en Montevideo", "corredores de seguros Uruguay", "cotizar seguro de auto Uruguay", "seguro de hogar Montevideo", "asesoramiento de seguros Uruguay"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: site.locale, siteName: site.name, url: "/", title: "Martínez Seguros | Protegemos lo que más importa", description: "Encontrá la cobertura adecuada para vos, tu familia o tu empresa con asesoramiento personalizado." },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-UY">
      <body className="min-h-screen">
        <a href="#contenido" className="sr-only z-50 rounded-full bg-white px-5 py-3 font-bold text-navy-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Ir al contenido</a>
        <QuoteProvider>
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </QuoteProvider>
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(organizationLd) }} />
      </body>
    </html>
  );
}
