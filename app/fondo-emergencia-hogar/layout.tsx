import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fondo de Emergencia del Hogar",
  description: "Calcula cuánto deberías tener ahorrado para cubrir emergencias del hogar según el valor de tu vivienda y tus gastos mensuales.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
