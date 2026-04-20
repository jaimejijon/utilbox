import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de fecha probable de parto",
  description:
    "Calcula la fecha estimada de parto y el avance del embarazo a partir de tu última menstruación. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
