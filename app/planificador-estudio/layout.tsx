import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planificador de horas de estudio semanal",
  description:
    "Distribuye tus horas disponibles entre tus materias según prioridad y genera un plan de estudio semanal personalizado. Para estudiantes universitarios en Latinoamérica.",
  keywords: [
    "planificador de estudio", "plan de estudio semanal", "organizar horas estudio",
    "horario de estudio", "distribución horas materia", "agenda estudio universitario",
    "plan académico semanal", "cómo organizar el estudio", "planificar semana estudio",
    "horario materias universidad", "estudio por prioridad", "tiempo estudio semanal",
    "planificador académico",
  ],
  openGraph: {
    title: "Planificador de horas de estudio semanal | utilbox.lat",
    description:
      "Genera un plan semanal de estudio personalizado según tus horas disponibles y prioridades. Gratis.",
    url: "https://utilbox.lat/planificador-estudio",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Planificador de estudio semanal | utilbox.lat",
    description:
      "Organiza tu semana de estudio distribuyendo horas por materia y prioridad. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/planificador-estudio" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
