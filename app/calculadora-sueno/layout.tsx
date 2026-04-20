import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de sueño",
  description:
    "Descubre los mejores horarios para dormir y despertar según tus ciclos de sueño naturales. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
