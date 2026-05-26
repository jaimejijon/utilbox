"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";

const tools = [
  { href: "/calculadora-interes-compuesto", label: "Interés compuesto" },
  { href: "/simulador-prestamo", label: "Simulador de préstamo" },
  { href: "/convertidor-monedas", label: "Convertidor de monedas" },
  { href: "/calculadora-jubilacion", label: "Calculadora de jubilación" },
  { href: "/calculadora-roi", label: "Calculadora de ROI" },
];

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer
      style={{ background: "#0F1117", borderTop: "0.5px solid #1E2030" }}
      className="mt-auto"
    >
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span style={{ fontWeight: 600, color: "#FFFFFF", fontSize: "15px", letterSpacing: "-0.3px" }}>
                utilbox
              </span>
              <span style={{ fontWeight: 600, color: "#5C6BC0", fontSize: "15px", letterSpacing: "-0.3px" }}>
                .lat
              </span>
            </div>
            <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#EEEEEE" }}>
              {t.desc}
            </p>
          </div>

          {/* Tools */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#EEEEEE",
                marginBottom: "12px",
              }}
            >
              {t.financeSection}
            </p>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    style={{ fontSize: "13px", color: "#EEEEEE" }}
                    className="hover:!text-[#FFFFFF] transition-colors duration-200"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#EEEEEE",
                marginBottom: "12px",
              }}
            >
              {t.platformSection}
            </p>
            <ul className="space-y-2">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/acerca", label: t.about },
                { href: "/privacidad", label: t.privacy },
                { href: "/terminos", label: t.terms },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: "13px", color: "#EEEEEE" }}
                    className="hover:!text-[#FFFFFF] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "20px", textAlign: "center" }}>
          <span style={{ fontSize: "11px", color: "#F5F5F5" }}>
            {t.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
