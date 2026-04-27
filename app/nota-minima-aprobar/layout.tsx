import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de nota mínima para aprobar",
  description:
    "Calcula qué nota necesitas en el examen final para aprobar la materia según tus parciales y porcentajes. Para universidades de México, Colombia, Ecuador, Chile, Perú y más.",
  keywords: [
    "nota mínima para aprobar", "nota que necesito en el final",
    "calcular nota final examen", "qué nota necesito para pasar",
    "nota examen final parciales", "calculadora notas universidad",
    "pasar materia nota necesaria", "nota para aprobar México Colombia",
    "cálculo nota aprobación", "porcentaje parciales nota final",
    "acumulado notas", "nota habilitación",
  ],
  openGraph: {
    title: "Calculadora de nota mínima para aprobar | utilbox.lat",
    description:
      "Calcula qué nota necesitas en el final para aprobar según tus parciales y porcentajes. Gratis.",
    url: "https://utilbox.lat/nota-minima-aprobar",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nota mínima para aprobar | utilbox.lat",
    description:
      "Descubre qué nota necesitas en el examen final para pasar la materia. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/nota-minima-aprobar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
