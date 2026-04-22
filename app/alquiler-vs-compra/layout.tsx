import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora Alquiler vs Compra",
  description: "Compara el costo real de alquilar versus comprar una vivienda a largo plazo y descubre qué opción te conviene más.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
