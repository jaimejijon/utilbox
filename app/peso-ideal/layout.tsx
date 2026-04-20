import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de peso ideal",
  description:
    "Descubre tu peso ideal según tu altura, sexo y complexión corporal usando múltiples fórmulas. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
