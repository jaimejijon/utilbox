import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de tiempo de estudio por materia",
  description:
    "Calcula cuántas horas de estudio autónomo necesitas por materia según su dificultad y créditos. Detecta sobrecarga académica y planifica tu semana universitaria.",
  keywords: [
    "horas de estudio por materia", "tiempo de estudio universidad",
    "cuánto estudiar por materia", "planificación académica",
    "horas estudio autónomo", "carga académica", "organizar tiempo estudio",
    "estudio efectivo universidad", "horas estudio recomendadas",
    "dificultad materias tiempo", "sobrecarga académica", "estudio por créditos",
    "planificar semana estudiante",
  ],
  openGraph: {
    title: "Calculadora de tiempo de estudio por materia | utilbox.lat",
    description:
      "Calcula cuántas horas estudiar por materia según su dificultad y créditos. Gratis.",
    url: "https://utilbox.lat/tiempo-estudio",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tiempo de estudio por materia | utilbox.lat",
    description:
      "Calcula las horas de estudio recomendadas por materia según dificultad y créditos.",
  },
  alternates: { canonical: "https://utilbox.lat/tiempo-estudio" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
