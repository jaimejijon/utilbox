import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de promedio ponderado",
  description:
    "Calcula tu promedio académico ponderado por créditos en escala 1-10, 1-20, GPA o porcentual. Para universidades de México, Colombia, Argentina, Chile, Perú y toda Latinoamérica.",
  keywords: [
    "calculadora promedio ponderado", "promedio ponderado créditos",
    "calcular promedio académico", "promedio universitario", "GPA latinoamérica",
    "promedio por créditos", "promedio semestral", "cálculo promedio materias",
    "promedio ponderado México", "promedio ponderado Colombia",
    "promedio acumulado universidad", "escala calificaciones promedio",
    "promediar notas por crédito",
  ],
  openGraph: {
    title: "Calculadora de promedio ponderado | utilbox.lat",
    description:
      "Calcula tu promedio académico ponderado por créditos en cualquier escala. Gratis.",
    url: "https://utilbox.lat/promedio-ponderado",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de promedio ponderado | utilbox.lat",
    description:
      "Calcula tu promedio universitario ponderado por créditos. Soporta escala 1-10, GPA y más.",
  },
  alternates: { canonical: "https://utilbox.lat/promedio-ponderado" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
