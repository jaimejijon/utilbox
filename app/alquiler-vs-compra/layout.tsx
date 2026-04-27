import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora alquiler vs compra de vivienda",
  description:
    "Compara el costo real de alquilar versus comprar casa o departamento a largo plazo. Análisis financiero para México, Colombia, Argentina, Chile, Perú y toda Latinoamérica.",
  keywords: [
    "alquiler vs compra", "rentar vs comprar casa", "conviene comprar o alquilar",
    "calculadora vivienda", "costo alquiler vs hipoteca", "arrendar vs comprar",
    "comparar renta vs compra", "alquiler vs compra México", "alquiler vs compra Colombia",
    "alquiler vs compra Argentina", "alquiler vs compra Chile", "inversión vivienda",
    "comprar o arrendar departamento",
  ],
  openGraph: {
    title: "Calculadora alquiler vs compra de vivienda | utilbox.lat",
    description:
      "¿Conviene más alquilar o comprar? Compara costos a largo plazo con esta calculadora gratuita.",
    url: "https://utilbox.lat/alquiler-vs-compra",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alquiler vs compra de vivienda | utilbox.lat",
    description:
      "Compara el costo real de alquilar versus comprar vivienda a largo plazo. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/alquiler-vs-compra" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
