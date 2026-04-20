import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de macronutrientes",
  description:
    "Calcula tus proteínas, carbohidratos y grasas diarias ideales según tu objetivo de peso. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
