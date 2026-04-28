import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de proteína diaria recomendada",
  description:
    "Calcula cuánta proteína necesitas al día según tu peso, actividad física y objetivo: ganar músculo, perder grasa o mejorar rendimiento deportivo. Incluye equivalencias en alimentos reales.",
  keywords: [
    "calculadora proteína diaria", "cuánta proteína necesito", "proteína por kilo de peso",
    "proteína ganar músculo", "proteína perder grasa", "requerimiento proteico diario",
    "gramos proteína al día", "proteína deportistas latinoamérica",
    "OMS proteína recomendada", "ISSN proteína muscular",
    "proteína pollo huevo atún frijoles", "ingesta proteica objetivo",
  ],
  openGraph: {
    title: "Calculadora de proteína diaria recomendada | utilbox.lat",
    description:
      "Descubre cuánta proteína necesitas según tu peso y objetivo. Con equivalencias en alimentos. Gratis.",
    url: "https://utilbox.lat/proteina-diaria",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Proteína diaria recomendada | utilbox.lat",
    description:
      "Calcula tu ingesta proteica óptima por peso, actividad y objetivo. Equivalencias en alimentos. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/proteina-diaria" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
