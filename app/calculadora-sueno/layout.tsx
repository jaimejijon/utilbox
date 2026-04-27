import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de sueño y ciclos de descanso",
  description:
    "Calcula a qué hora dormir o despertar para completar ciclos de sueño completos de 90 minutos y descansar mejor. Basada en fases de sueño REM. Gratis.",
  keywords: [
    "calculadora sueño", "ciclos de sueño", "cuántas horas dormir",
    "a qué hora despertar", "sueño REM", "ciclo sueño 90 minutos",
    "calidad del sueño", "hora para dormir", "descanso óptimo",
    "cuánto debo dormir", "fases del sueño", "insomnio horario",
    "mejor hora despertar", "calculadora descanso",
  ],
  openGraph: {
    title: "Calculadora de sueño y ciclos de descanso | utilbox.lat",
    description:
      "Descubre a qué hora dormir o despertar para completar ciclos de sueño completos. Gratis.",
    url: "https://utilbox.lat/calculadora-sueno",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de sueño | utilbox.lat",
    description:
      "Calcula tu hora ideal para dormir y despertar según ciclos de sueño de 90 minutos.",
  },
  alternates: { canonical: "https://utilbox.lat/calculadora-sueno" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
