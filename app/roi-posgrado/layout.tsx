import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de ROI de un posgrado o máster",
  description:
    "Calcula el retorno de inversión de hacer un máster, MBA o doctorado: ROI, tiempo de recuperación y ganancia acumulada a 5, 10 y 20 años. ¿Vale la pena económicamente?",
  keywords: [
    "ROI posgrado", "vale la pena hacer un máster", "retorno inversión MBA",
    "costo oportunidad posgrado", "maestría rentable", "doctorado ROI",
    "inversión educación superior", "máster MBA Colombia México Chile",
    "posgrado vale la pena", "calcular ROI maestría", "rentabilidad posgrado",
    "payback máster", "inversión posgrado salario",
  ],
  openGraph: {
    title: "Calculadora de ROI de un posgrado | utilbox.lat",
    description:
      "¿Vale la pena hacer un máster o doctorado? Calcula el ROI y tiempo de recuperación. Gratis.",
    url: "https://utilbox.lat/roi-posgrado",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ROI de un posgrado | utilbox.lat",
    description:
      "Calcula si vale la pena económicamente hacer un máster, MBA o doctorado. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/roi-posgrado" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
