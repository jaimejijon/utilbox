import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de hipoteca y crédito hipotecario",
  description:
    "Calcula tu cuota mensual, total de intereses y tabla de amortización para cualquier crédito hipotecario. Compatible con INFONAVIT, FOVISSSTE, Bancolombia, BancoEstado y más.",
  keywords: [
    "simulador hipoteca", "calculadora hipoteca", "cuota hipotecaria",
    "crédito hipotecario", "INFONAVIT México", "FOVISSSTE", "tabla amortización hipoteca",
    "intereses hipoteca", "préstamo hipotecario México", "hipoteca Colombia",
    "hipoteca Chile", "hipoteca Argentina", "crédito vivienda",
    "cuota mensual hipoteca", "simulador crédito hipotecario",
  ],
  openGraph: {
    title: "Simulador de hipoteca y crédito hipotecario | utilbox.lat",
    description:
      "Calcula la cuota mensual, intereses y amortización de tu hipoteca. Gratis y sin registro.",
    url: "https://utilbox.lat/simulador-hipoteca",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Simulador de hipoteca | utilbox.lat",
    description:
      "Calcula cuánto pagarás de hipoteca al mes y el total de intereses durante el crédito.",
  },
  alternates: { canonical: "https://utilbox.lat/simulador-hipoteca" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
