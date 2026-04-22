import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presupuesto de Remodelación",
  description: "Estima el costo total de tu remodelación por tipo de trabajo, área y materiales. Calculadora gratuita para México, Colombia, Argentina y más.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
