import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de macronutrientes — Proteínas, carbos y grasas",
  description:
    "Calcula tus macros ideales de proteína, carbohidratos y grasas según tu objetivo: pérdida de peso, ganancia muscular o mantenimiento. Gratis y sin registro.",
  keywords: [
    "calculadora macronutrientes", "calcular macros", "proteínas carbohidratos grasas",
    "dieta macros", "macros para perder peso", "macros para ganar músculo",
    "calculadora proteínas", "plan nutricional", "macros diarios", "contar macros",
    "distribución macronutrientes", "macros cetogénica", "macros volumen definición",
    "calculadora dieta",
  ],
  openGraph: {
    title: "Calculadora de macronutrientes | utilbox.lat",
    description:
      "Descubre cuánta proteína, carbohidratos y grasa necesitas según tu objetivo. Gratis.",
    url: "https://utilbox.lat/calculadora-macronutrientes",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de macronutrientes | utilbox.lat",
    description:
      "Calcula tus macros ideales según tu objetivo de pérdida de peso o ganancia muscular.",
  },
  alternates: { canonical: "https://utilbox.lat/calculadora-macronutrientes" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
