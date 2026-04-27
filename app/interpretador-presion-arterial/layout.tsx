import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interpretador de presión arterial",
  description:
    "Interpreta tu lectura de presión arterial: sistólica y diastólica. Descubre si es normal, alta o baja y qué significa para tu salud cardiovascular. Gratis y sin registro.",
  keywords: [
    "presión arterial normal", "interpretar presión arterial", "tensión arterial alta",
    "hipertensión", "hipotensión", "presión sistólica diastólica",
    "calculadora tensión arterial", "presión arterial niveles",
    "presión arterial clasificación", "presión arterial OMS",
    "tensión alta baja media", "rango presión arterial adultos",
    "presión arterial Colombia México", "hipertensión arterial",
  ],
  openGraph: {
    title: "Interpretador de presión arterial | utilbox.lat",
    description:
      "Ingresa tu presión arterial y descubre si está en rango normal o hay riesgo cardiovascular.",
    url: "https://utilbox.lat/interpretador-presion-arterial",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Interpretador de presión arterial | utilbox.lat",
    description:
      "Interpreta tu presión arterial sistólica y diastólica. Conoce si es normal, alta o baja.",
  },
  alternates: { canonical: "https://utilbox.lat/interpretador-presion-arterial" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
