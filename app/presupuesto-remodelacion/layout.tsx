import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de presupuesto de remodelación",
  description:
    "Estima el costo total de tu remodelación por tipo de trabajo: demolición, albañilería, eléctrico, plomería y acabados. Para México, Colombia, Argentina, Chile y Latinoamérica.",
  keywords: [
    "presupuesto remodelación", "costo remodelación", "cuánto cuesta remodelar",
    "remodelación casa precio", "presupuesto obra", "costos construcción",
    "remodelación baño cocina", "reforma hogar precio", "presupuesto albañilería",
    "costo remodelación México", "costo remodelación Colombia", "acabados construcción",
    "presupuesto eléctrico plomería", "estimado remodelación",
  ],
  openGraph: {
    title: "Calculadora de presupuesto de remodelación | utilbox.lat",
    description:
      "Estima el costo de tu remodelación por tipo de trabajo y área. Para toda Latinoamérica.",
    url: "https://utilbox.lat/presupuesto-remodelacion",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de remodelación | utilbox.lat",
    description:
      "Calcula el presupuesto de tu remodelación por tipo de trabajo y metros cuadrados. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/presupuesto-remodelacion" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
