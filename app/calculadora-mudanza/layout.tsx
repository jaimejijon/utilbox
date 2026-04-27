import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de costo de mudanza",
  description:
    "Estima el costo total de tu mudanza según distancia, volumen de muebles y servicios adicionales. Compara precios de mudanza en México, Colombia, Argentina y toda Latinoamérica.",
  keywords: [
    "calculadora mudanza", "costo mudanza", "precio mudanza", "flete mudanza",
    "empresa mudanza", "mudanza económica", "cuánto cuesta una mudanza",
    "presupuesto mudanza México", "mudanza Colombia", "mudanza Argentina",
    "mudanza Chile", "servicio de mudanza", "costo fletes",
  ],
  openGraph: {
    title: "Calculadora de costo de mudanza | utilbox.lat",
    description:
      "Estima cuánto costará tu mudanza según distancia, volumen y servicios. Gratis.",
    url: "https://utilbox.lat/calculadora-mudanza",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de mudanza | utilbox.lat",
    description:
      "Calcula el costo de tu mudanza según distancia, volumen y servicios adicionales.",
  },
  alternates: { canonical: "https://utilbox.lat/calculadora-mudanza" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
