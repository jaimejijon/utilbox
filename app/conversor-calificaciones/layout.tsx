import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conversor de sistemas de calificación",
  description:
    "Convierte tu nota entre escala 1-10, 1-20, GPA (0-4) y porcentual (0-100%). Equivalencias académicas para México, Colombia, Perú, Venezuela, Argentina, Uruguay y más.",
  keywords: [
    "conversor calificaciones", "convertir nota escala", "GPA a escala 1-10",
    "equivalencia calificaciones", "nota GPA", "convertir promedio",
    "escala 1-20 a GPA", "equivalencia notas latinoamérica",
    "sistema calificación universidad", "convertir nota México Colombia",
    "nota equivalente GPA", "calificación escala 1-10 1-20",
    "tabla equivalencias notas", "convertir promedio universitario",
  ],
  openGraph: {
    title: "Conversor de sistemas de calificación | utilbox.lat",
    description:
      "Convierte tu nota entre escala 1-10, 1-20, GPA y porcentual al instante. Gratis.",
    url: "https://utilbox.lat/conversor-calificaciones",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Conversor de calificaciones | utilbox.lat",
    description:
      "Convierte tu nota entre escala 1-10, GPA, 1-20 y porcentual al instante. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/conversor-calificaciones" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
