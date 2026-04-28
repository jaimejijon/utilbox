import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de alcohol en sangre (BAC)",
  description:
    "Estima tu nivel de alcohol en sangre según las bebidas consumidas, tu peso, sexo y tiempo transcurrido. Incluye límites legales de México, Colombia, Chile, Argentina y Perú. Solo informativo.",
  keywords: [
    "calculadora alcohol en sangre", "nivel BAC estimado", "alcoholemia calculadora",
    "límite alcohol conducir latinoamérica", "cuánto alcohol puedo tomar",
    "gramos alcohol bebida", "tiempo eliminar alcohol cuerpo",
    "cerveza vino tequila alcohol sangre", "drunk calculator español",
    "límite legal alcohol México Colombia", "BAC estimado por peso",
    "alcohol cero tolerancia conducir",
  ],
  openGraph: {
    title: "Calculadora de alcohol en sangre (BAC) | utilbox.lat",
    description:
      "Estima tu BAC por bebidas, peso y tiempo. Límites legales de 5 países latinoamericanos. Gratis.",
    url: "https://utilbox.lat/alcohol-en-sangre",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alcohol en sangre (BAC) | utilbox.lat",
    description:
      "Calcula tu nivel de alcohol en sangre con límites legales LATAM. Solo informativo. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/alcohol-en-sangre" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
