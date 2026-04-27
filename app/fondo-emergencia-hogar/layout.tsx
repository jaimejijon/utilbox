import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de fondo de emergencia del hogar",
  description:
    "Calcula cuánto dinero necesitas ahorrar como fondo de emergencia para cubrir reparaciones, accidentes y gastos imprevistos del hogar. Recomendaciones por tipo de vivienda.",
  keywords: [
    "fondo de emergencia hogar", "ahorro emergencias", "fondo emergencia cuánto ahorrar",
    "reserva económica hogar", "colchón financiero", "ahorro reparaciones",
    "emergencias domésticas", "fondo emergencia casa", "gastos imprevistos hogar",
    "cuánto ahorrar emergencias", "reserva mantenimiento hogar", "fondo contingencia",
  ],
  openGraph: {
    title: "Calculadora de fondo de emergencia del hogar | utilbox.lat",
    description:
      "Calcula cuánto necesitas ahorrar para cubrir emergencias y reparaciones del hogar. Gratis.",
    url: "https://utilbox.lat/fondo-emergencia-hogar",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fondo de emergencia del hogar | utilbox.lat",
    description:
      "Descubre cuánto deberías tener ahorrado para emergencias en tu hogar. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/fondo-emergencia-hogar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
