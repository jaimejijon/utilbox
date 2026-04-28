import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de porciones alimenticias diarias",
  description:
    "Calcula cuántas porciones de cereales, frutas, verduras, proteínas, lácteos y grasas saludables necesitas cada día según tu peso, estatura, actividad y objetivo nutricional.",
  keywords: [
    "calculadora porciones alimenticias", "cuántas porciones comer al día", "porciones por grupo alimenticio",
    "plato saludable porciones", "guía alimentaria porciones", "raciones diarias recomendadas",
    "porciones cereales frutas verduras", "grupos alimenticios latinoamérica",
    "dieta equilibrada porciones", "nutrición balanceada diaria",
    "porciones proteína lácteos grasas", "alimentación saludable calculadora",
  ],
  openGraph: {
    title: "Calculadora de porciones alimenticias diarias | utilbox.lat",
    description:
      "Porciones recomendadas por grupo alimenticio según tu TDEE y objetivo. Con equivalencias prácticas. Gratis.",
    url: "https://utilbox.lat/porciones-alimenticias",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Porciones alimenticias diarias | utilbox.lat",
    description:
      "Calcula tus raciones de cereales, frutas, verduras, proteínas y más según tu objetivo. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/porciones-alimenticias" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
