import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de pintura por m²",
  description:
    "Calcula cuántos litros o galones de pintura necesitas y cuánto costará pintar paredes, techos o fachadas. Incluye número de manos. Gratis y sin registro.",
  keywords: [
    "calculadora pintura", "cuánta pintura necesito", "litros de pintura por m2",
    "galones pintura", "pintura paredes", "metros cuadrados pintura",
    "presupuesto pintura", "pintar habitación cuánta pintura", "pintura fachada",
    "cuántas latas de pintura", "calculadora litros pintura", "pintar casa costo",
    "rendimiento pintura m2",
  ],
  openGraph: {
    title: "Calculadora de pintura por m² | utilbox.lat",
    description:
      "Calcula cuántos litros de pintura necesitas y cuánto costará pintar cualquier ambiente. Gratis.",
    url: "https://utilbox.lat/calculadora-pintura",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de pintura por m² | utilbox.lat",
    description:
      "Descubre cuánta pintura necesitas para pintar tu habitación, pared o fachada. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/calculadora-pintura" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
