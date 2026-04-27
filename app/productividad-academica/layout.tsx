import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de productividad académica",
  description:
    "Mide tu índice de productividad académica (0-100): eficiencia de horas, tareas completadas y avance en promedio. Obtén recomendaciones personalizadas para mejorar tu rendimiento.",
  keywords: [
    "productividad académica", "índice rendimiento académico", "eficiencia estudio",
    "tareas completadas universidad", "medir productividad estudiante",
    "cómo mejorar rendimiento académico", "productividad universitaria",
    "rendimiento estudiante", "eficiencia académica", "índice productividad",
    "métricas rendimiento universitario", "mejorar promedio universitario",
    "calculadora rendimiento académico",
  ],
  openGraph: {
    title: "Calculadora de productividad académica | utilbox.lat",
    description:
      "Mide tu productividad académica y recibe recomendaciones personalizadas para mejorar. Gratis.",
    url: "https://utilbox.lat/productividad-academica",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de productividad académica | utilbox.lat",
    description:
      "Calcula tu índice de productividad como estudiante y descubre cómo mejorar. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/productividad-academica" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
