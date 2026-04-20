import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agua diaria ideal",
  description:
    "Calcula cuánta agua debes beber al día según tu peso, nivel de actividad y clima. Gratis y sin registro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
