import type { Metadata } from "next";
import HomeContent from "./components/HomeContent";

export const metadata: Metadata = {
  title: "utilbox.lat — Herramientas gratuitas para Latinoamérica",
  description:
    "Calculadoras, simuladores y utilidades gratuitas para finanzas, salud, hogar y más. Sin registro, sin costos, todo en tu navegador.",
};

export default function Home() {
  return <HomeContent />;
}
