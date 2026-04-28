import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Índice glucémico y carga glucémica por alimento",
  description:
    "Consulta el índice glucémico y la carga glucémica de 60+ alimentos. Ajusta la porción y descubre el impacto real en tu glucosa según tu objetivo: diabetes, perder peso o rendimiento deportivo.",
  keywords: [
    "índice glucémico alimentos", "carga glucémica por porción", "tabla IG alimentos",
    "alimentos bajo índice glucémico", "glucemia diabetes dieta", "IG arroz pan papa",
    "dieta bajo índice glucémico", "control azúcar sangre alimentación",
    "carbohidratos índice glucémico", "alimentos diabéticos latinoamérica",
    "carga glucémica calculadora", "IG frutas verduras cereales",
  ],
  openGraph: {
    title: "Índice glucémico y carga glucémica por alimento | utilbox.lat",
    description:
      "Consulta el IG y CG de 60+ alimentos. Ajusta la porción y controla tu glucosa. Gratis.",
    url: "https://utilbox.lat/indice-glucemico",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Índice glucémico y carga glucémica | utilbox.lat",
    description:
      "IG y CG de 60+ alimentos con ajuste de porción. Para diabetes, peso o deporte. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/indice-glucemico" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
