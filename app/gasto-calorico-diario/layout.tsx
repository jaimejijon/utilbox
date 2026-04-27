import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de gasto calórico diario (TDEE y TMB)",
  description:
    "Calcula tu tasa metabólica basal (TMB) y gasto energético total diario (TDEE) según tu nivel de actividad. Ideal para perder peso, ganar músculo o mantenerte.",
  keywords: [
    "calculadora TDEE", "tasa metabólica basal", "TMB calculadora",
    "gasto calórico diario", "calorías diarias necesarias", "metabolismo basal",
    "calorías para perder peso", "calorías para ganar músculo",
    "gasto energético total", "calculadora calorías diarias",
    "cuántas calorías necesito", "déficit calórico", "superávit calórico",
    "fórmula Harris Benedict",
  ],
  openGraph: {
    title: "Calculadora de gasto calórico diario (TDEE) | utilbox.lat",
    description:
      "Calcula cuántas calorías necesitas al día según tu actividad y objetivo. TMB y TDEE gratis.",
    url: "https://utilbox.lat/gasto-calorico-diario",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora TDEE y TMB | utilbox.lat",
    description:
      "Calcula tu metabolismo basal y cuántas calorías necesitas al día según tu actividad.",
  },
  alternates: { canonical: "https://utilbox.lat/gasto-calorico-diario" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
