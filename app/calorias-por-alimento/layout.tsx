import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de calorías por alimento",
  description:
    "Consulta calorías, proteínas, carbohidratos, grasas y fibra de más de 80 alimentos comunes en Latinoamérica. Registra tu ingesta del día y ve el total nutricional al instante.",
  keywords: [
    "calculadora calorías alimento", "calorías por porción", "tabla nutricional alimentos",
    "macros por alimento", "calorías arroz frijoles pollo", "contador calorías diarias",
    "valor nutricional alimentos latinoamérica", "calorías comida mexicana colombiana",
    "macros proteínas carbohidratos grasas", "registro calorías diario",
    "alimentos y calorías por 100g", "tabla calorías frutas verduras",
    "cuántas calorías tiene", "nutrición alimentos básicos",
  ],
  openGraph: {
    title: "Calculadora de calorías por alimento | utilbox.lat",
    description:
      "Consulta calorías y macros de 80+ alimentos latinoamericanos y registra tu ingesta diaria. Gratis.",
    url: "https://utilbox.lat/calorias-por-alimento",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de calorías por alimento | utilbox.lat",
    description:
      "Calorías, proteínas, carbos y grasas de 80+ alimentos. Registra tu ingesta del día. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/calorias-por-alimento" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
