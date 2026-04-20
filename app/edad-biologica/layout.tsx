import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de edad biológica",
  description:
    "Estima tu edad biológica real basada en tus hábitos de salud, sueño, ejercicio y alimentación. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
