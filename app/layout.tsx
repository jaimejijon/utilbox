import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "utilbox.lat — Herramientas financieras gratuitas",
    template: "%s | utilbox.lat",
  },
  description:
    "Calculadoras y simuladores financieros gratuitos para Latinoamérica. Interés compuesto, préstamos, jubilación, ROI y más.",
  metadataBase: new URL("https://utilbox.lat"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
