import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interpretador de presión arterial",
  description:
    "Ingresa tu presión arterial y descubre si está en rango normal según las guías internacionales. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
