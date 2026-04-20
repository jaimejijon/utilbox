import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorías quemadas por ejercicio",
  description:
    "Calcula las calorías que quemas según el tipo de ejercicio, duración y tu peso corporal. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
