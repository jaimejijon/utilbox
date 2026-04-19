import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convertidor de monedas",
  description:
    "Convierte entre más de 20 monedas latinoamericanas y mundiales: USD, MXN, BRL, ARS, CLP, COP, PEN y más. Tasas de referencia actualizadas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
