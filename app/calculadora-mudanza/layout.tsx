import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Mudanza",
  description: "Estima el costo total de tu mudanza según distancia, volumen de pertenencias y servicios adicionales. Calculadora gratuita de mudanza.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
