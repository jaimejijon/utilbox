import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Ahorro en Energía Solar",
  description: "Estima cuánto ahorrarías al instalar paneles solares y en cuánto tiempo recuperas la inversión. Calculadora gratuita de energía solar.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
