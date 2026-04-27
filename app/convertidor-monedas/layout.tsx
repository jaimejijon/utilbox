import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convertidor de monedas latinoamericanas",
  description:
    "Convierte entre MXN, COP, ARS, CLP, PEN, UYU, BOB, PYG, VES, USD, EUR y más de 20 monedas. Tasas de referencia para México, Colombia, Argentina, Chile, Perú y toda Latinoamérica.",
  keywords: [
    "convertidor monedas", "tipo de cambio", "convertir pesos a dólares",
    "MXN a USD", "COP a USD", "ARS a USD", "CLP a USD", "PEN a USD",
    "cambio de moneda", "conversor divisas", "peso mexicano colombiano",
    "tipo de cambio Latinoamérica", "BOB boliviano", "UYU peso uruguayo",
    "convertir divisas online",
  ],
  openGraph: {
    title: "Convertidor de monedas latinoamericanas | utilbox.lat",
    description:
      "Convierte entre más de 20 monedas de Latinoamérica y el mundo. MXN, COP, ARS, CLP, PEN y más.",
    url: "https://utilbox.lat/convertidor-monedas",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Convertidor de monedas | utilbox.lat",
    description:
      "Convierte entre pesos, dólares, euros y más de 20 monedas latinoamericanas. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/convertidor-monedas" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
