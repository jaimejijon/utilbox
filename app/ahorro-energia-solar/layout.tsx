import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de ahorro en energía solar",
  description:
    "Estima cuánto ahorrarías al instalar paneles solares según tu consumo eléctrico mensual. Calcula el retorno de inversión solar en México, Chile, Colombia, Perú y más.",
  keywords: [
    "ahorro energía solar", "paneles solares costo", "ROI paneles solares",
    "energía solar México", "energía solar Chile", "energía solar Colombia",
    "calculadora solar", "inversión paneles solares", "paneles fotovoltaicos precio",
    "energía solar Perú", "energía solar Argentina", "retorno inversión solar",
    "autoconsumo solar", "instalación paneles solares",
  ],
  openGraph: {
    title: "Calculadora de ahorro en energía solar | utilbox.lat",
    description:
      "Calcula cuánto ahorrarías instalando paneles solares y en cuánto tiempo recuperas la inversión.",
    url: "https://utilbox.lat/ahorro-energia-solar",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ahorro en energía solar | utilbox.lat",
    description:
      "Estima el ahorro y el ROI de instalar paneles solares en tu hogar. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/ahorro-energia-solar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
