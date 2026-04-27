import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de edad biológica",
  description:
    "Descubre cuántos años tiene realmente tu cuerpo según tus hábitos de salud, actividad física, dieta y descanso. Compara tu edad biológica con tu edad cronológica.",
  keywords: [
    "calculadora edad biológica", "edad real cuerpo", "edad biológica vs cronológica",
    "cuántos años tiene mi cuerpo", "envejecimiento celular", "test edad biológica",
    "salud longevidad", "edad fisiológica", "medir envejecimiento",
    "hábitos saludables edad", "longevidad México Colombia", "vida saludable",
  ],
  openGraph: {
    title: "Calculadora de edad biológica | utilbox.lat",
    description:
      "Descubre cuántos años tiene realmente tu cuerpo según tus hábitos de salud. Gratis.",
    url: "https://utilbox.lat/edad-biologica",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de edad biológica | utilbox.lat",
    description:
      "Compara tu edad biológica con tu edad real según tus hábitos de salud y estilo de vida.",
  },
  alternates: { canonical: "https://utilbox.lat/edad-biologica" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
