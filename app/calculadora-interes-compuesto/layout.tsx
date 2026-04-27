import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de interés compuesto",
  description:
    "Simula el crecimiento de tu inversión con interés compuesto y aportaciones periódicas. Ideal para CETES, CDT, plazo fijo, fondos de inversión y más en Latinoamérica.",
  keywords: [
    "calculadora interés compuesto", "simulador inversión", "crecimiento inversión",
    "CETES México", "CDT Colombia", "plazo fijo Argentina", "fondo inversión",
    "rendimiento interés compuesto", "aportaciones periódicas", "inversión largo plazo",
    "interés compuesto vs simple", "calculadora ahorro", "depósito a plazo Chile",
    "fondo mutuo", "simulador ahorro",
  ],
  openGraph: {
    title: "Calculadora de interés compuesto | utilbox.lat",
    description:
      "Simula el crecimiento de tu inversión con interés compuesto y aportes mensuales. Gratis.",
    url: "https://utilbox.lat/calculadora-interes-compuesto",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de interés compuesto | utilbox.lat",
    description:
      "Calcula cuánto crecerá tu dinero con interés compuesto y aportaciones mensuales.",
  },
  alternates: { canonical: "https://utilbox.lat/calculadora-interes-compuesto" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
