import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de calorías quemadas por ejercicio",
  description:
    "Calcula cuántas calorías quemas haciendo ejercicio según tu peso, tipo de actividad y duración. Corrida, natación, ciclismo, pesas y más de 20 actividades físicas.",
  keywords: [
    "calculadora calorías ejercicio", "calorías quemadas correr", "calorías bicicleta",
    "calorías natación", "calorías gimnasio", "cuántas calorías quemo",
    "ejercicio calorías", "gasto calórico ejercicio", "calorías caminata",
    "calorías fútbol", "calorías quemadas por actividad", "ejercicio perder peso",
    "calorías yoga pilates",
  ],
  openGraph: {
    title: "Calculadora de calorías quemadas por ejercicio | utilbox.lat",
    description:
      "Calcula cuántas calorías quemas según el tipo de actividad física, tu peso y duración. Gratis.",
    url: "https://utilbox.lat/calorias-ejercicio",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calorías quemadas por ejercicio | utilbox.lat",
    description:
      "Descubre cuántas calorías quemas corriendo, nadando, en bici o en el gimnasio. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/calorias-ejercicio" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
