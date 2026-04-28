import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de metabolismo de cafeína",
  description:
    "Calcula cómo tu cuerpo metaboliza la cafeína de café, té, energéticas y suplementos a lo largo del día. Basado en la vida media de 5 horas. Descubre cuándo es seguro dormir.",
  keywords: [
    "calculadora cafeína metabolismo", "vida media cafeína 5 horas", "cafeína café espresso",
    "cuánta cafeína Red Bull Monster", "cafeína y sueño cuándo dormir",
    "nivel cafeína sangre horas", "cafeína pre-entrenamiento", "metabolismo cafeína calculadora",
    "cafeína té verde matcha", "cafeína límite diario seguro",
    "cafeína y ansiedad insomnio", "cuándo tomar cafeína rendimiento",
  ],
  openGraph: {
    title: "Calculadora de metabolismo de cafeína | utilbox.lat",
    description:
      "Ve cómo baja la cafeína en tu cuerpo hora a hora. Café, energéticas y más. Con hora segura para dormir. Gratis.",
    url: "https://utilbox.lat/metabolismo-cafeina",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Metabolismo de cafeína | utilbox.lat",
    description:
      "Calcula cómo baja la cafeína hora a hora y cuándo es seguro dormir. Para café, té y energéticas. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/metabolismo-cafeina" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
