import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de fecha probable de parto",
  description:
    "Calcula tu fecha probable de parto a partir de la fecha de tu última menstruación o fecha de concepción. Incluye semanas de embarazo y trimestres. Gratis y sin registro.",
  keywords: [
    "calculadora fecha de parto", "fecha probable de parto", "semanas de embarazo",
    "FPP calculadora", "cuándo nace mi bebé", "cálculo embarazo",
    "fecha parto México Colombia", "semanas gestación", "trimestres embarazo",
    "fecha concepción parto", "FUR última menstruación", "embarazo semanas",
    "calculadora embarazo", "fecha probable nacimiento",
  ],
  openGraph: {
    title: "Calculadora de fecha probable de parto | utilbox.lat",
    description:
      "Calcula cuándo nacerá tu bebé a partir de tu última menstruación o fecha de concepción. Gratis.",
    url: "https://utilbox.lat/fecha-probable-parto",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de fecha de parto | utilbox.lat",
    description:
      "Descubre la fecha probable de parto y las semanas de embarazo. Gratis y sin registro.",
  },
  alternates: { canonical: "https://utilbox.lat/fecha-probable-parto" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
