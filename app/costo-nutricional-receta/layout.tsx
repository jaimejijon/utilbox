import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de costo nutricional por receta",
  description:
    "Calcula el costo y los macronutrientes de cualquier receta por porción. Agrega ingredientes, ingresa el precio y obtén calorías, proteínas, carbos y grasas con su costo exacto por porción.",
  keywords: [
    "costo nutricional receta", "calculadora costo por porción", "precio macros receta",
    "calorías receta casera", "costo receta ingredientes", "macros por porción cocina",
    "calculadora recetas nutrición", "gasto comida casera", "costo alimentación saludable",
    "precio proteína carbohidratos receta", "calculadora meal prep",
    "cuánto cuesta comer saludable", "receta económica nutritiva",
  ],
  openGraph: {
    title: "Calculadora de costo nutricional por receta | utilbox.lat",
    description:
      "Calcula calorías, macros y costo por porción de tus recetas con ingredientes reales. Gratis.",
    url: "https://utilbox.lat/costo-nutricional-receta",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Costo nutricional por receta | utilbox.lat",
    description:
      "Agrega ingredientes, ingresa precios y obtén macros + costo exacto por porción. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/costo-nutricional-receta" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
