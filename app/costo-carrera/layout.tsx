import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de costo total de carrera universitaria",
  description:
    "Calcula el costo real de tu carrera universitaria: matrícula, materiales, transporte, alimentación y arriendo. Para universidades de México, Colombia, Argentina, Chile y más.",
  keywords: [
    "costo carrera universitaria", "cuánto cuesta la universidad",
    "gasto universitario total", "matrícula universidad", "costo estudiar",
    "presupuesto universitario", "gastos estudiante universitario",
    "costo carrera México", "costo carrera Colombia", "costo carrera Argentina",
    "cuánto cuesta estudiar", "gastos vida universitaria", "financiar carrera",
  ],
  openGraph: {
    title: "Calculadora de costo total de carrera universitaria | utilbox.lat",
    description:
      "Calcula el costo real de tu carrera incluyendo matrícula, vida y transporte. Gratis.",
    url: "https://utilbox.lat/costo-carrera",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Costo total de carrera universitaria | utilbox.lat",
    description:
      "Descubre cuánto costará realmente tu carrera universitaria incluyendo todos los gastos.",
  },
  alternates: { canonical: "https://utilbox.lat/costo-carrera" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
