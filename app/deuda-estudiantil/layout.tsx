import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de deuda estudiantil",
  description:
    "Calcula la cuota mensual, total de intereses y tabla de amortización de tu préstamo estudiantil. Para ICETEX, crédito educativo en Colombia, México, Chile, Bolivia y más.",
  keywords: [
    "calculadora deuda estudiantil", "préstamo estudiantil", "ICETEX Colombia",
    "crédito educativo", "cuota préstamo estudiantil", "amortización préstamo educativo",
    "deuda universitaria", "préstamo educación superior", "crédito universitario",
    "período de gracia préstamo", "intereses crédito educativo",
    "deuda estudiantil México", "financiamiento educativo cuota",
  ],
  openGraph: {
    title: "Calculadora de deuda estudiantil | utilbox.lat",
    description:
      "Calcula la cuota mensual e intereses de tu préstamo estudiantil. Incluye tabla de amortización.",
    url: "https://utilbox.lat/deuda-estudiantil",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de deuda estudiantil | utilbox.lat",
    description:
      "Calcula cuánto pagarás de cuota mensual e intereses en tu préstamo educativo. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/deuda-estudiantil" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
