import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de consumo eléctrico del hogar",
  description:
    "Calcula cuánto consume cada electrodoméstico y cuánto pagas al mes en tu recibo de luz. Para tarifas de CFE, EPM, Enel y distribuidoras de toda Latinoamérica.",
  keywords: [
    "calculadora consumo eléctrico", "consumo electrodomésticos", "kilowatt hora",
    "factura luz", "CFE México", "tarifa eléctrica", "consumo energía hogar",
    "cuánto gasta el aire acondicionado", "recibo luz", "EPM Colombia",
    "consumo eléctrico mensual", "ahorro energía hogar", "kWh precio",
    "calculadora electricidad", "gasto eléctrico",
  ],
  openGraph: {
    title: "Calculadora de consumo eléctrico del hogar | utilbox.lat",
    description:
      "Calcula cuánto consumen tus electrodomésticos y cuánto pagas al mes de electricidad. Gratis.",
    url: "https://utilbox.lat/consumo-electrico",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de consumo eléctrico | utilbox.lat",
    description:
      "Descubre cuánto consume cada electrodoméstico y cómo reducir tu factura de luz.",
  },
  alternates: { canonical: "https://utilbox.lat/consumo-electrico" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
