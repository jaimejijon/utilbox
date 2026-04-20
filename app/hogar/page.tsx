"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NICHO = {
  color: "#D4856A",
  bg: "#3D2218",
  tint: "#1C1210",
  border: "rgba(212,133,106,0.25)",
};

const tabs = ["Todas", "Financiero", "Construcción", "Energía", "Mudanza"];

const tools = [
  {
    category: "Financiero",
    name: "Simulador de hipoteca",
    description: "Calcula tu cuota mensual, intereses totales y tabla de amortización para tu crédito hipotecario.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    category: "Financiero",
    name: "Calculadora alquiler vs compra",
    description: "Compara el costo real de alquilar versus comprar una vivienda a largo plazo.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    category: "Construcción",
    name: "Presupuesto de remodelación",
    description: "Estima el costo total de tu remodelación por tipo de trabajo y materiales.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    category: "Energía",
    name: "Calculadora de consumo eléctrico",
    description: "Calcula cuánto consumen tus electrodomésticos y cuánto pagas al mes por cada uno.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    category: "Construcción",
    name: "Costo de pintura por m²",
    description: "Calcula cuánta pintura necesitas y cuánto costará pintar cualquier ambiente.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" /><polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
      </svg>
    ),
  },
  {
    category: "Construcción",
    name: "Calculadora de azulejos y pisos",
    description: "Calcula cuántas cajas de azulejos o pisos necesitas según el área a cubrir.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    category: "Energía",
    name: "Ahorro en energía solar",
    description: "Estima cuánto ahorrarías al instalar paneles solares según tu consumo actual.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    category: "Financiero",
    name: "Fondo de emergencia del hogar",
    description: "Calcula cuánto deberías tener ahorrado para cubrir emergencias del hogar.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    category: "Financiero",
    name: "Costo real de tener una mascota",
    description: "Calcula el costo mensual y anual de tener una mascota según tipo y tamaño.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    category: "Mudanza",
    name: "Calculadora de mudanza",
    description: "Estima el costo total de tu mudanza según distancia, volumen y servicios adicionales.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

const ProximamenteBadge = () => (
  <span style={{
    background: "#1E2030",
    color: "#888",
    fontSize: "9px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    padding: "3px 8px",
    borderRadius: "999px",
  }}>
    Próximamente
  </span>
);

export default function HogarPage() {
  const [activeTab, setActiveTab] = useState("Todas");

  const filtered = activeTab === "Todas" ? tools : tools.filter((t) => t.category === activeTab);

  return (
    <>
      <Header />

      {/* Hero */}
      <section style={{ borderBottom: "0.5px solid #1E2030" }} className="relative overflow-hidden">
        <div aria-hidden="true" style={{ position: "absolute", right: "-60px", top: "50%", transform: "translateY(-50%)", opacity: 0.06, fontSize: "220px", userSelect: "none", pointerEvents: "none" }}>
          🏠
        </div>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="inline-flex items-center gap-2 mb-5" style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "5px 12px 5px 8px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: NICHO.color }}>Hogar</span>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "10px" }}>
            Herramientas para tu hogar
          </h1>
          <p style={{ fontSize: "14px", color: "#EEEEEE", lineHeight: "1.65", maxWidth: "520px", marginBottom: "24px" }}>
            Simuladores de hipoteca, consumo eléctrico, remodelaciones y más. Todo gratuito y sin registro.
          </p>
          <div className="flex flex-wrap gap-6">
            {[{ value: "10", label: "herramientas" }, { value: "100%", label: "privado" }, { value: "0", label: "datos guardados" }].map((s) => (
              <div key={s.label}>
                <span style={{ fontSize: "22px", fontWeight: 600, color: NICHO.color, display: "block", lineHeight: 1 }}>{s.value}</span>
                <span style={{ fontSize: "12px", color: "#EEEEEE" }}>{s.label}</span>
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
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ fontSize: "13px", fontWeight: 600, color: activeTab === tab ? NICHO.color : "#FFFFFF", padding: "14px 16px", background: "transparent", border: "none", cursor: "pointer", borderBottom: activeTab === tab ? `2px solid ${NICHO.color}` : "2px solid transparent", transition: "color 0.2s ease", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-8 w-full">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block flex-shrink-0" style={{ width: "220px" }}>
            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px", marginBottom: "12px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#EEEEEE", marginBottom: "12px" }}>Tipo de herramienta</p>
              {tabs.slice(1).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className="w-full text-left transition-colors duration-200" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 8px", borderRadius: "6px", fontSize: "13px", color: activeTab === tab ? NICHO.color : "#FFFFFF", background: activeTab === tab ? NICHO.bg : "transparent", border: "none", cursor: "pointer", marginBottom: "2px" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: activeTab === tab ? NICHO.color : "#666", flexShrink: 0 }} />
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#EEEEEE", marginBottom: "12px" }}>Otras categorías</p>
              {[{ name: "Finanzas", color: "#5C6BC0", href: "/finanzas" }, { name: "Salud", color: "#6EC9A0", href: "/salud" }, { name: "Educación", color: "#74AEDD", href: "/educacion" }, { name: "Nutrición", color: "#D4B85A", href: "/nutricion" }].map((cat) => (
                <Link key={cat.name} href={cat.href} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 8px", borderRadius: "6px", fontSize: "13px", color: "#FFFFFF", textDecoration: "none", marginBottom: "2px" }} className="hover:bg-[#1A1B2E] transition-colors">
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                  {cat.name}
                </Link>
              ))}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {/* Desktop grid */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-3 mb-8">
              {filtered.map((tool) => (
                <div key={tool.name} className="relative flex flex-col" style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2.5px", background: NICHO.color }} />
                  <div className="flex items-center justify-between mb-3 mt-1">
                    <div className="flex items-center gap-2.5">
                      <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: NICHO.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{tool.icon}</div>
                      <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: NICHO.color }}>{tool.category}</span>
                    </div>
                    <ProximamenteBadge />
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "6px", lineHeight: "1.35" }}>{tool.name}</p>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.55", flex: 1, marginBottom: "12px" }}>{tool.description}</p>
                  <button disabled style={{ background: NICHO.color, color: "#0F1117", border: "none", borderRadius: "7px", padding: "8px 14px", fontSize: "12px", fontWeight: 600, opacity: 0.45, cursor: "not-allowed", textAlign: "left" }}>
                    Próximamente
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile list */}
            <div className="flex sm:hidden flex-col gap-2 mb-8">
              {filtered.map((tool) => (
                <div key={tool.name} className="flex items-center gap-3" style={{ background: "#141520", borderTop: "0.5px solid #1E2030", borderRight: "0.5px solid #1E2030", borderBottom: "0.5px solid #1E2030", borderLeft: `2px solid ${NICHO.color}`, borderRadius: "10px", padding: "12px 14px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: NICHO.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{tool.icon}</div>
                  <div className="flex-1 min-w-0">
                    <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: NICHO.color, display: "block", marginBottom: "2px" }}>{tool.category}</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", display: "block", marginBottom: "2px" }}>{tool.name}</span>
                    <span style={{ fontSize: "11px", color: "#EEEEEE", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tool.description}</span>
                  </div>
                  <ProximamenteBadge />
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>¿Tienes una idea de herramienta?</p>
                <p style={{ fontSize: "12px", color: "#EEEEEE" }}>Estamos construyendo estas calculadoras. Vuelve pronto.</p>
              </div>
              <Link href="/" style={{ background: NICHO.color, color: "#0F1117", fontSize: "12px", fontWeight: 600, padding: "8px 16px", borderRadius: "8px", textDecoration: "none", flexShrink: 0 }} className="hover:opacity-90 transition-opacity">
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
