import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de jubilación y retiro",
  description:
    "Planifica tu jubilación: calcula cuánto ahorrar cada mes para alcanzar tu meta de retiro. Compatible con AFORE, AFP, fondos de pensión de México, Colombia, Chile, Perú y más.",
  keywords: [
    "calculadora jubilación", "calculadora retiro", "AFORE México", "AFP Colombia",
    "AFP Chile", "AFP Perú", "pensión retiro", "ahorro jubilación", "planificador retiro",
    "cuánto ahorrar para jubilarme", "fondo pensional Colombia", "retiro digno",
    "ahorro para el retiro", "pensión vejez", "SAR México",
  ],
  openGraph: {
    title: "Calculadora de jubilación y retiro | utilbox.lat",
    description:
      "Calcula cuánto necesitas ahorrar para jubilarte cómodo. Compatible con AFORE, AFP y más.",
    url: "https://utilbox.lat/calculadora-jubilacion",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de jubilación | utilbox.lat",
    description:
      "Planifica tu retiro: cuánto ahorrar cada mes para vivir tranquilo en tu jubilación.",
  },
  alternates: { canonical: "https://utilbox.lat/calculadora-jubilacion" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
