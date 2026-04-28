import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de ayuno intermitente — horarios 16:8, 18:6, OMAD",
  description:
    "Planifica tu ventana de alimentación con los protocolos de ayuno intermitente más populares: 16:8, 18:6, 20:4, OMAD y 5:2. Visualiza tu ciclo diario y obtén consejos para cada protocolo.",
  keywords: [
    "ayuno intermitente calculadora", "horario ayuno 16:8", "ventana alimentación ayuno",
    "protocolo OMAD 23:1", "ayuno 18:6 horarios", "ayuno 5:2 días semana",
    "ayuno intermitente beneficios", "cuándo comer ayuno intermitente",
    "ayuno para perder peso", "intermittent fasting latinoamérica",
    "ventana de ayuno 20:4", "hora romper ayuno",
  ],
  openGraph: {
    title: "Calculadora de ayuno intermitente | utilbox.lat",
    description:
      "Planifica tu ventana de alimentación con 16:8, 18:6, OMAD y más. Visualización diaria incluida. Gratis.",
    url: "https://utilbox.lat/ayuno-intermitente",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ayuno intermitente — horarios y protocolos | utilbox.lat",
    description:
      "Calcula tu ventana de ayuno con 16:8, 18:6, 20:4, OMAD o 5:2. Con visualización de ciclo. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/ayuno-intermitente" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
