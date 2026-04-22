import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Consumo Eléctrico",
  description: "Calcula cuánto consumen tus electrodomésticos y cuánto pagas al mes de electricidad. Gratis, sin registro, todo en tu navegador.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
