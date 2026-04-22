import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Costo Real de Tener una Mascota",
  description: "Calcula el costo mensual y anual de tener una mascota según el tipo, tamaño y tus hábitos de cuidado. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
