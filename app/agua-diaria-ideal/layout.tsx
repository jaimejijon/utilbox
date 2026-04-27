import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de agua diaria ideal",
  description:
    "Calcula cuánta agua debes beber al día según tu peso, nivel de actividad física y clima. Hidratación personalizada para México, Colombia, Argentina, Chile y toda Latinoamérica. Gratis.",
  keywords: [
    "calculadora agua diaria", "cuánta agua tomar al día", "hidratación diaria",
    "agua por peso corporal", "ingesta agua recomendada", "calculadora hidratación",
    "litros de agua al día", "agua diaria México", "agua diaria Colombia",
    "agua diaria Argentina", "beber agua suficiente", "agua y actividad física",
  ],
  openGraph: {
    title: "Calculadora de agua diaria ideal | utilbox.lat",
    description:
      "Descubre cuántos litros de agua debes beber al día según tu peso y actividad. Gratis y sin registro.",
    url: "https://utilbox.lat/agua-diaria-ideal",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de agua diaria ideal | utilbox.lat",
    description:
      "Calcula cuánta agua necesitas al día según tu peso, actividad y clima. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/agua-diaria-ideal" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
