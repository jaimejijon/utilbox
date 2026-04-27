import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de IMC — Índice de Masa Corporal",
  description:
    "Calcula tu IMC gratis: ingresa tu peso y altura para conocer tu clasificación (bajo peso, normal, sobrepeso u obesidad) y tu rango de peso saludable. Sin registro.",
  keywords: [
    "calculadora IMC", "índice de masa corporal", "calcular IMC", "IMC normal",
    "IMC adultos", "clasificación IMC", "sobrepeso IMC", "IMC México", "IMC Colombia",
    "IMC Argentina", "IMC Chile", "peso saludable", "IMC online", "calcular peso ideal",
  ],
  openGraph: {
    title: "Calculadora de IMC — Índice de Masa Corporal | utilbox.lat",
    description:
      "Calcula tu IMC gratis: peso, altura y edad para conocer tu clasificación y rango de peso saludable. Sin registro.",
    url: "https://utilbox.lat/calculadora-imc",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de IMC | utilbox.lat",
    description:
      "Calcula tu índice de masa corporal gratis. Clasificación y rango saludable según tu peso y altura.",
  },
  alternates: { canonical: "https://utilbox.lat/calculadora-imc" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
