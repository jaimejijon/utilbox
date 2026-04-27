import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de ROI — Retorno sobre la inversión",
  description:
    "Calcula el retorno sobre tu inversión (ROI) en porcentaje y tiempo de recuperación. Ideal para emprendedores y negocios en México, Colombia, Argentina, Chile y toda Latinoamérica.",
  keywords: [
    "calculadora ROI", "retorno sobre inversión", "calcular ROI", "rentabilidad inversión",
    "ROI negocio", "ROI emprendimiento", "retorno inversión porcentaje",
    "tiempo recuperación inversión", "ROI marketing", "ROI México Colombia Argentina",
    "inversión rentable", "payback inversión", "ganancia inversión",
  ],
  openGraph: {
    title: "Calculadora de ROI — Retorno sobre la inversión | utilbox.lat",
    description:
      "Calcula el ROI de cualquier inversión o negocio: porcentaje de retorno y tiempo de recuperación.",
    url: "https://utilbox.lat/calculadora-roi",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calculadora de ROI | utilbox.lat",
    description:
      "Calcula el retorno sobre la inversión (ROI) de cualquier proyecto o negocio. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/calculadora-roi" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
