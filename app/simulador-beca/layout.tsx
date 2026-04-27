import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de beca y financiamiento educativo",
  description:
    "Simula diferentes porcentajes de beca (25%, 50%, 75%, 100%) y calcula la cuota mensual del crédito educativo restante. Para becas universitarias en México, Colombia, Chile y más.",
  keywords: [
    "simulador beca universitaria", "beca educativa", "financiamiento educativo",
    "crédito educativo", "beca 50% universidad", "costo carrera con beca",
    "préstamo educativo", "beca Colombia México Argentina", "financiamiento universidad",
    "beca parcial total", "cuota crédito educativo", "beca mérito socioeconómica",
    "calculadora beca educación",
  ],
  openGraph: {
    title: "Simulador de beca y financiamiento educativo | utilbox.lat",
    description:
      "Simula escenarios de beca del 25% al 100% y calcula cuánto necesitas financiar. Gratis.",
    url: "https://utilbox.lat/simulador-beca",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Simulador de beca universitaria | utilbox.lat",
    description:
      "Calcula cuánto cubrirá tu beca y cuánto necesitarás financiar con crédito educativo.",
  },
  alternates: { canonical: "https://utilbox.lat/simulador-beca" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
