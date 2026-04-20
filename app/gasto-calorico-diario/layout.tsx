import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gasto calórico diario",
  description:
    "Calcula tu tasa metabólica basal y gasto calórico total según tu nivel de actividad física. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
