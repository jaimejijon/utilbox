"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NICHO = {
  color: "#5C6BC0",
  bg: "#1E1A3A",
  tint: "#13141F",
  border: "rgba(92,107,192,0.25)",
};

const tabs = ["Todas", "Inversión", "Crédito", "Divisas", "Retiro", "Negocios"];

const tools = [
  {
    href: "/calculadora-interes-compuesto",
    category: "Inversión",
    name: "Calculadora de interés compuesto",
    description: "Proyecta el crecimiento de tus ahorros o inversiones con capitalización mensual y aportaciones periódicas.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F8FE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    href: "/simulador-prestamo",
    category: "Crédito",
    name: "Simulador de préstamo",
    description: "Calcula la cuota mensual, el total de intereses y la tabla de amortización completa para cualquier crédito.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F8FE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    href: "/convertidor-monedas",
    category: "Divisas",
    name: "Convertidor de monedas",
    description: "Convierte entre más de 20 monedas latinoamericanas y mundiales al instante con tasas de referencia.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F8FE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    href: "/calculadora-jubilacion",
    category: "Retiro",
    name: "Calculadora de jubilación",
    description: "Descubre cuánto necesitas ahorrar hoy para retirarte con tranquilidad y qué tan lejos alcanzará tu fondo.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F8FE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    href: "/calculadora-roi",
    category: "Negocios",
    name: "Calculadora de ROI",
    description: "Mide el retorno sobre la inversión de cualquier proyecto, negocio o campaña con ROI anualizado.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F8FE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function FinanzasPage() {
  const [activeTab, setActiveTab] = useState("Todas");

  const filtered =
    activeTab === "Todas"
      ? tools
      : tools.filter((t) => t.category === activeTab);

  return (
    <>
      <Header />

      {/* Category hero */}
      <section
        style={{ borderBottom: "0.5px solid #1E2030" }}
        className="relative overflow-hidden"
      >
        {/* Ghost illustration */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.06,
            fontSize: "220px",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          $
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-5"
            style={{
              background: NICHO.bg,
              border: `0.5px solid ${NICHO.border}`,
              borderRadius: "999px",
              padding: "5px 12px 5px 8px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: NICHO.color,
                display: "block",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: NICHO.color,
              }}
            >
              Finanzas
            </span>
          </div>

          <h1
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#ECECEC",
              letterSpacing: "-0.4px",
              lineHeight: 1.2,
              marginBottom: "10px",
            }}
          >
            Herramientas para tus finanzas personales
          </h1>
          <p style={{ fontSize: "14px", color: "#888", lineHeight: "1.65", maxWidth: "520px", marginBottom: "24px" }}>
            Calculadoras y simuladores para invertir, gestionar deudas, planificar el retiro y evaluar negocios.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: "5", label: "herramientas" },
              { value: "100%", label: "privadas" },
              { value: "0", label: "datos guardados" },
            ].map((s) => (
              <div key={s.label}>
                <span
                  style={{ fontSize: "22px", fontWeight: 600, color: NICHO.color, display: "block", lineHeight: 1 }}
                >
                  {s.value}
                </span>
                <span style={{ fontSize: "12px", color: "#555" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-10" style={{ background: "#0F1117", borderBottom: "0.5px solid #1E2030" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: activeTab === tab ? NICHO.color : "#555",
                  padding: "14px 16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderBottom: activeTab === tab ? `2px solid ${NICHO.color}` : "2px solid transparent",
                  transition: "color 0.2s ease",
                  whiteSpace: "nowrap",
                  marginBottom: "-1px",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-8 w-full">
        <div className="flex gap-6">

          {/* Sidebar */}
          <aside className="hidden lg:block flex-shrink-0" style={{ width: "220px" }}>
            <div
              style={{
                background: "#141520",
                border: "0.5px solid #1E2030",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#444",
                  marginBottom: "12px",
                }}
              >
                Tipo de herramienta
              </p>
              {tabs.slice(1).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="w-full text-left transition-colors duration-200"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 8px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    color: activeTab === tab ? NICHO.color : "#666",
                    background: activeTab === tab ? NICHO.bg : "transparent",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "2px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: activeTab === tab ? NICHO.color : "#333",
                      flexShrink: 0,
                    }}
                  />
                  {tab}
                </button>
              ))}
            </div>

            <div
              style={{
                background: "#141520",
                border: "0.5px solid #1E2030",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#444",
                  marginBottom: "12px",
                }}
              >
                Otras categorías
              </p>
              {[
                { name: "Salud", color: "#6EC9A0", href: "#" },
                { name: "Hogar", color: "#D4856A", href: "#" },
                { name: "Educación", color: "#74AEDD", href: "#" },
                { name: "Nutrición", color: "#D4B85A", href: "#" },
              ].map((cat) => (
                <div
                  key={cat.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 8px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    color: "#555",
                    marginBottom: "2px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: cat.color,
                      flexShrink: 0,
                    }}
                  />
                  {cat.name}
                  <span style={{ fontSize: "10px", color: "#333", marginLeft: "auto" }}>próx.</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ fontSize: "13px", color: "#555" }}>
                  No hay herramientas en esta categoría aún.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop grid */}
                <div className="hidden sm:grid sm:grid-cols-2 gap-3 mb-8">
                  {filtered.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group relative overflow-hidden flex flex-col transition-all duration-[220ms]"
                      style={{
                        background: "#141520",
                        borderTop: "0.5px solid #1E2030",
                        borderRight: "0.5px solid #1E2030",
                        borderBottom: "0.5px solid #1E2030",
                        borderLeft: "2px solid transparent",
                        borderRadius: "10px",
                        padding: "16px",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderLeftColor = NICHO.color;
                        el.style.background = NICHO.tint;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderLeftColor = "transparent";
                        el.style.background = "#141520";
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "2.5px",
                          background: NICHO.color,
                        }}
                      />
                      <div className="flex items-center gap-2.5 mb-3 mt-1">
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "8px",
                            background: NICHO.bg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {tool.icon}
                        </div>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: NICHO.color,
                          }}
                        >
                          {tool.category}
                        </span>
                      </div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#D0D0D0", marginBottom: "6px", lineHeight: "1.35" }}>
                        {tool.name}
                      </p>
                      <p style={{ fontSize: "11px", color: "#4A4A5A", lineHeight: "1.55", flex: 1, paddingRight: "20px" }}>
                        {tool.description}
                      </p>
                      <span
                        className="group-hover:!text-[#5C6BC0] group-hover:translate-x-0.5"
                        style={{
                          position: "absolute",
                          bottom: "14px",
                          right: "14px",
                          fontSize: "13px",
                          color: "#333",
                          transition: "color 0.22s, transform 0.22s",
                        }}
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Mobile list */}
                <div className="flex sm:hidden flex-col gap-2 mb-8">
                  {filtered.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="flex items-center gap-3"
                      style={{
                        background: "#141520",
                        borderTop: "0.5px solid #1E2030",
                        borderRight: "0.5px solid #1E2030",
                        borderBottom: "0.5px solid #1E2030",
                        borderLeft: `2px solid ${NICHO.color}`,
                        borderRadius: "10px",
                        padding: "12px 14px",
                        textDecoration: "none",
                      }}
                    >
                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "8px",
                          background: NICHO.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: NICHO.color, display: "block", marginBottom: "2px" }}>
                          {tool.category}
                        </span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#D0D0D0", display: "block", marginBottom: "2px" }}>
                          {tool.name}
                        </span>
                        <span style={{ fontSize: "11px", color: "#4A4A5A", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {tool.description}
                        </span>
                      </div>
                      <span style={{ color: "#333", fontSize: "14px", flexShrink: 0 }}>→</span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Suggestion card */}
            <div
              style={{
                background: NICHO.bg,
                border: `0.5px solid ${NICHO.border}`,
                borderRadius: "10px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#ECECEC", marginBottom: "4px" }}>
                  ¿Falta alguna herramienta?
                </p>
                <p style={{ fontSize: "12px", color: "#666" }}>
                  Estamos agregando nuevas calculadoras constantemente.
                </p>
              </div>
              <Link
                href="/"
                style={{
                  background: NICHO.color,
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  flexShrink: 0,
                  transition: "opacity 0.2s ease",
                }}
                className="hover:opacity-90"
              >
                Ver todas las categorías →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
