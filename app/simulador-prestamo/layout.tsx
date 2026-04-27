import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de préstamo personal",
  description:
    "Calcula la cuota mensual, total de intereses y tabla de amortización de tu préstamo personal. Válido para bancos de México, Colombia, Argentina, Chile, Perú y toda Latinoamérica.",
  keywords: [
    "simulador préstamo", "calculadora préstamo", "cuota préstamo personal",
    "intereses préstamo", "tabla amortización", "crédito personal",
    "préstamo banco", "calculadora crédito", "préstamo personal México",
    "crédito personal Colombia", "préstamo personal Argentina",
    "cuota mensual préstamo", "amortización cuota fija", "simulador crédito",
  ],
  openGraph: {
    title: "Simulador de préstamo personal | utilbox.lat",
    description:
      "Calcula la cuota mensual, intereses y amortización de tu préstamo personal. Gratis.",
    url: "https://utilbox.lat/simulador-prestamo",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Simulador de préstamo personal | utilbox.lat",
    description:
      "Calcula cuánto pagarás de cuota mensual e intereses en tu préstamo personal. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/simulador-prestamo" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
