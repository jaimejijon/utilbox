import type { Metadata } from "next";
import { Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "utilbox.lat — Herramientas gratuitas para Latinoamérica",
    template: "%s | utilbox.lat",
  },
  description:
    "Plataforma de herramientas gratuitas para Latinoamérica: calculadoras financieras, simuladores y utilidades para finanzas, salud, hogar y más. Sin registro, sin costos.",
  metadataBase: new URL("https://utilbox.lat"),
  verification: {
    google: "U0fFEbAjrPlRY1ADfeHZS-lEv5D859GfmZjDbVwiUNo",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  other: {
    "google-adsense-account": "ca-pub-7414774371732537",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "#0F1117", color: "#FFFFFF" }}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-120NH053PK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-120NH053PK');
          `}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7414774371732537"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {children}
      </body>
    </html>
  );
}
