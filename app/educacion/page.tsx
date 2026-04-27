"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NICHO = {
  color: "#74AEDD",
  bg: "#152638",
  tint: "#0E1318",
  border: "rgba(116,174,221,0.25)",
};

const tabs = ["Todas", "Notas", "Financiero", "Planificación", "Productividad"];

const tools = [
  {
    href: "/promedio-ponderado",
    category: "Notas",
    name: "Calculadora de promedio ponderado",
    description: "Calcula tu promedio académico considerando el peso o créditos de cada materia.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#74AEDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    href: "/nota-minima-aprobar",
    category: "Notas",
    name: "Nota mínima para aprobar",
    description: "Descubre qué nota necesitas en tu examen final para aprobar la materia.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#74AEDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    href: "/simulador-beca",
    category: "Financiero",
    name: "Simulador de beca y financiamiento",
    description: "Estima cuánto financiamiento necesitas y qué becas podrían cubrir tu carrera.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#74AEDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    href: "/tiempo-estudio",
    category: "Planificación",
    name: "Tiempo de estudio por materia",
    description: "Planifica cuántas horas dedicar a cada materia según dificultad y créditos.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#74AEDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    href: "/costo-carrera",
    category: "Financiero",
    name: "Costo total de carrera universitaria",
    description: "Calcula el costo real de tu carrera incluyendo matrícula, materiales y vida.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#74AEDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    href: "/roi-posgrado",
    category: "Financiero",
    name: "ROI de un posgrado",
    description: "Calcula si vale la pena económicamente hacer un máster o doctorado.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#74AEDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    href: "/conversor-calificaciones",
    category: "Notas",
    name: "Conversor de sistemas de calificación",
    description: "Convierte tu nota entre diferentes escalas: GPA, escala 1-10, 1-20, porcentual.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#74AEDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    href: "/deuda-estudiantil",
    category: "Financiero",
    name: "Calculadora de deuda estudiantil",
    description: "Simula cuánto pagarás y en cuánto tiempo liquidarás tu préstamo estudiantil.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#74AEDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    href: "/planificador-estudio",
    category: "Planificación",
    name: "Planificador de horas de estudio",
    description: "Organiza tu semana de estudio distribuyendo el tiempo según tus materias y metas.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#74AEDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    href: "/productividad-academica",
    category: "Productividad",
    name: "Calculadora de productividad académica",
    description: "Mide tu eficiencia de estudio y encuentra el horario óptimo para rendir más.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#74AEDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function EducacionPage() {
  const [activeTab, setActiveTab] = useState("Todas");
  const filtered = activeTab === "Todas" ? tools : tools.filter((t) => t.category === activeTab);

  return (
    <>
      <Header />

      {/* Hero */}
      <section style={{ borderBottom: "0.5px solid #1E2030" }} className="relative overflow-hidden">
        <div aria-hidden="true" style={{ position: "absolute", right: "-60px", top: "50%", transform: "translateY(-50%)", opacity: 0.06, fontSize: "220px", userSelect: "none", pointerEvents: "none" }}>
          📚
        </div>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="inline-flex items-center gap-2 mb-5" style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "5px 12px 5px 8px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: NICHO.color }}>Educación</span>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: "10px" }}>
            Herramientas para tu educación
          </h1>
          <p style={{ fontSize: "14px", color: "#EEEEEE", lineHeight: "1.65", maxWidth: "520px", marginBottom: "24px" }}>
            Calculadoras de notas, costos universitarios, deuda estudiantil y más. Gratis y sin registro.
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
              {[{ name: "Finanzas", color: "#5C6BC0", href: "/finanzas" }, { name: "Salud", color: "#6EC9A0", href: "/salud" }, { name: "Hogar", color: "#D4856A", href: "/hogar" }, { name: "Nutrición", color: "#D4B85A", href: "/nutricion" }].map((cat) => (
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
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative overflow-hidden flex flex-col transition-all duration-[220ms]"
                  style={{ background: "#141520", borderTop: "0.5px solid #1E2030", borderRight: "0.5px solid #1E2030", borderBottom: "0.5px solid #1E2030", borderLeft: "2px solid transparent", borderRadius: "10px", padding: "16px", textDecoration: "none" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderLeftColor = NICHO.color; el.style.background = NICHO.tint; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderLeftColor = "transparent"; el.style.background = "#141520"; }}
                >
                  <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2.5px", background: NICHO.color }} />
                  <div className="flex items-center gap-2.5 mb-3 mt-1">
                    <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: NICHO.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {tool.icon}
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: NICHO.color }}>
                      {tool.category}
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "6px", lineHeight: "1.35" }}>{tool.name}</p>
                  <p style={{ fontSize: "11px", color: "#F5F5F5", lineHeight: "1.55", flex: 1, paddingRight: "20px" }}>{tool.description}</p>
                  <span style={{ position: "absolute", bottom: "14px", right: "14px", fontSize: "13px", color: "#FFFFFF", transition: "color 0.22s, transform 0.22s" }}>→</span>
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
                  style={{ background: "#141520", borderTop: "0.5px solid #1E2030", borderRight: "0.5px solid #1E2030", borderBottom: "0.5px solid #1E2030", borderLeft: `2px solid ${NICHO.color}`, borderRadius: "10px", padding: "12px 14px", textDecoration: "none" }}
                >
                  <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: NICHO.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {tool.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: NICHO.color, display: "block", marginBottom: "2px" }}>{tool.category}</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", display: "block", marginBottom: "2px" }}>{tool.name}</span>
                    <span style={{ fontSize: "11px", color: "#F5F5F5", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tool.description}</span>
                  </div>
                  <span style={{ color: "#FFFFFF", fontSize: "14px", flexShrink: 0 }}>→</span>
                </Link>
              ))}
            </div>

            <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>¿Tienes una idea de herramienta?</p>
                <p style={{ fontSize: "12px", color: "#EEEEEE" }}>Todas las herramientas están disponibles. ¡Explóralas!</p>
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
