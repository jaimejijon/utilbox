import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de Hipoteca",
  description: "Calcula tu cuota mensual, intereses totales y tabla de amortización completa para tu crédito hipotecario. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
