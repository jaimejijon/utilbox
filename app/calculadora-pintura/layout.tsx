import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Pintura por m²",
  description: "Calcula cuánta pintura necesitas y cuánto costará pintar cualquier habitación o fachada. Incluye galones, litros y lista de materiales.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
