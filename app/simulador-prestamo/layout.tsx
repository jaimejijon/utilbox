import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de préstamo",
  description:
    "Calcula la cuota mensual de tu préstamo, el total de intereses y genera la tabla de amortización completa. Sistema francés de cuotas fijas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
