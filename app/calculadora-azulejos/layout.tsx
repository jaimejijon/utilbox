import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de azulejos, baldosas y pisos por m²",
  description:
    "Calcula cuántas cajas de azulejos, baldosas, porcelanato o piso flotante necesitas para cubrir cualquier área. Incluye porcentaje de desperdicio. Gratis y sin registro.",
  keywords: [
    "calculadora azulejos", "cuántos azulejos necesito", "calculadora baldosas",
    "pisos por metro cuadrado", "calculadora cerámica", "azulejos m2",
    "calculadora porcelanato", "cajas de azulejos", "piso flotante cuánto necesito",
    "calculadora revestimiento", "azulejos baño cocina", "baldosas cuántas cajas",
    "calculadora obra construcción",
  ],
  openGraph: {
    title: "Calculadora de azulejos y pisos por m² | utilbox.lat",
    description:
      "Calcula cuántas cajas de azulejos o pisos necesitas según el área a cubrir. Incluye desperdicio. Gratis.",
    url: "https://utilbox.lat/calculadora-azulejos",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de azulejos y pisos | utilbox.lat",
    description:
      "Calcula cuántas cajas de azulejos o piso necesitas para tu obra. Incluye margen de desperdicio.",
  },
  alternates: { canonical: "https://utilbox.lat/calculadora-azulejos" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
