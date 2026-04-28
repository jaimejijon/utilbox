import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de déficit o superávit calórico",
  description:
    "Calcula el déficit o superávit calórico diario necesario para alcanzar tu peso ideal. Basado en tu TDEE real, meta en semanas y tasa de cambio semanal. Incluye alertas de seguridad nutricional.",
  keywords: [
    "déficit calórico calculadora", "superávit calórico masa muscular", "calorías para perder peso",
    "TDEE calculadora", "cuántas calorías comer para adelgazar", "calorías para ganar músculo",
    "tasa metabólica basal Mifflin", "calorías diarias según objetivo",
    "perder grasa sin perder músculo", "bulk cut calorías",
    "calculadora adelgazar semanas", "ritmo pérdida peso saludable",
  ],
  openGraph: {
    title: "Calculadora de déficit o superávit calórico | utilbox.lat",
    description:
      "Calcula las calorías exactas para tu objetivo de peso con proyección semanal. Basado en TDEE. Gratis.",
    url: "https://utilbox.lat/deficit-superavit",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Déficit o superávit calórico | utilbox.lat",
    description:
      "Calorías para perder grasa o ganar músculo con proyección semanal y alertas de seguridad. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/deficit-superavit" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
