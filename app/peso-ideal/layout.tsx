import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de peso ideal",
  description:
    "Calcula tu peso ideal según tres fórmulas médicas reconocidas: Devine, Robinson y Miller. Descubre tu rango de peso saludable según tu altura y sexo. Gratis.",
  keywords: [
    "calculadora peso ideal", "cuál es mi peso ideal", "peso ideal por talla",
    "fórmula peso ideal", "Devine peso ideal", "Robinson peso ideal",
    "peso saludable hombre mujer", "IMC peso ideal", "peso ideal estatura",
    "peso ideal México Colombia", "cuánto debo pesar", "rango peso saludable",
    "peso normal por altura", "tabla peso ideal",
  ],
  openGraph: {
    title: "Calculadora de peso ideal | utilbox.lat",
    description:
      "Calcula tu peso ideal con tres fórmulas médicas según tu altura y sexo. Gratis.",
    url: "https://utilbox.lat/peso-ideal",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de peso ideal | utilbox.lat",
    description:
      "Descubre cuál debería ser tu peso ideal según tu estatura y sexo. Tres fórmulas médicas.",
  },
  alternates: { canonical: "https://utilbox.lat/peso-ideal" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
