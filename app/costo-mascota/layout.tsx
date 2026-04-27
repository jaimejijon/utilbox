import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora del costo real de tener una mascota",
  description:
    "Calcula el gasto mensual y anual de tener un perro, gato u otra mascota según tamaño y tipo. Incluye veterinario, alimento, accesorios y más. Para México, Colombia, Argentina y más.",
  keywords: [
    "costo tener mascota", "gasto perro mensual", "cuánto cuesta tener un gato",
    "costo mascota mensual", "presupuesto mascota", "gastos perro Colombia México",
    "veterinario costo", "alimento mascotas", "gasto anual mascota",
    "presupuesto perro gato", "costo adoptar mascota", "mascotas gastos Argentina",
    "cuánto gasta un perro al mes",
  ],
  openGraph: {
    title: "Calculadora del costo de tener una mascota | utilbox.lat",
    description:
      "Calcula cuánto cuesta al mes tener un perro o gato: alimento, veterinario, accesorios y más.",
    url: "https://utilbox.lat/costo-mascota",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Costo de tener una mascota | utilbox.lat",
    description:
      "Descubre cuánto cuesta realmente tener un perro o gato al mes y al año. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/costo-mascota" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
