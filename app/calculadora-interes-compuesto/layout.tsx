import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de interés compuesto",
  description:
    "Simula el crecimiento de tu inversión con interés compuesto, aportaciones mensuales y capitalización mensual. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
