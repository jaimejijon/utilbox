import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Azulejos y Pisos",
  description: "Calcula cuántas cajas de azulejos o pisos necesitas para cubrir cualquier área, con desperdicio incluido. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
