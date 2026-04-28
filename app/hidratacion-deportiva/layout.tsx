import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de hidratación deportiva",
  description:
    "Calcula cuánta agua necesitas antes, durante y después del ejercicio según tu peso, intensidad, tipo de deporte y temperatura. Incluye recomendaciones de electrolitos para sesiones largas.",
  keywords: [
    "hidratación deportiva calculadora", "cuánta agua tomar ejercicio", "agua antes durante después deporte",
    "electrolitos sodio potasio deporte", "hidratación running ciclismo fútbol",
    "deshidratación deportiva síntomas", "agua por hora ejercicio",
    "hidratación atletas latinoamérica", "bebidas deportivas cuándo tomar",
    "consumo agua entrenamiento intensidad", "hidratación calor humedad",
  ],
  openGraph: {
    title: "Calculadora de hidratación deportiva | utilbox.lat",
    description:
      "Agua y electrolitos antes, durante y después del ejercicio según tu deporte e intensidad. Gratis.",
    url: "https://utilbox.lat/hidratacion-deportiva",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hidratación deportiva | utilbox.lat",
    description:
      "Calcula tu hidratación óptima por tipo de ejercicio, intensidad y temperatura. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/hidratacion-deportiva" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
