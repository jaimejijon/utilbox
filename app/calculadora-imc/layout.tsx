import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de IMC",
  description:
    "Calcula tu índice de masa corporal y descubre tu rango de peso saludable según edad y sexo. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
