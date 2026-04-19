import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de jubilación",
  description:
    "Proyecta tu fondo de retiro y calcula cuánto necesitas ahorrar para jubilarte con tranquilidad financiera. Considera inflación y rendimientos.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
