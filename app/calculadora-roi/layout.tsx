import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de ROI",
  description:
    "Calcula el retorno sobre la inversión (ROI) de cualquier proyecto, negocio o campaña de marketing. Incluye ROI anualizado y período de recuperación.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
