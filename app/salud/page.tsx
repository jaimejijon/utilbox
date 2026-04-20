"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NICHO = {
  color: "#6EC9A0",
  bg: "#1A3D2E",
  tint: "#101A14",
  border: "rgba(110,201,160,0.25)",
};

const tabs = ["Todas", "Peso y medidas", "Nutrición", "Actividad", "Sueño"];

const tools = [
  {
    href: "/calculadora-imc",
    category: "Peso y medidas",
    name: "Calculadora de IMC",
    description: "Calcula tu índice de masa corporal y rango de peso saludable según tu altura.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FD9B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="7" r="4" /><path d="M5.5 21a8.38 8.38 0 0 1 13 0" /><line x1="12" y1="11" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    href: "/gasto-calorico-diario",
    category: "Nutrición",
    name: "Gasto calórico diario",
    description: "Calcula tu tasa metabólica basal y gasto calórico total según tu nivel de actividad.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FD9B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
      </svg>
    ),
  },
  {
    href: "/agua-diaria-ideal",
    category: "Nutrición",
    name: "Agua diaria ideal",
    description: "Calcula cuánta agua debes beber al día según tu peso, actividad y clima.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FD9B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    href: "/calculadora-macronutrientes",
    category: "Nutrición",
    name: "Calculadora de macronutrientes",
    description: "Calcula tus proteínas, carbohidratos y grasas diarias según tu objetivo.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FD9B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },
  {
    href: "/calculadora-sueno",
    category: "Sueño",
    name: "Calculadora de sueño",
    description: "Descubre los mejores horarios para dormir y despertar según tus ciclos naturales.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FD9B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    href: "/calorias-ejercicio",
    category: "Actividad",
    name: "Calorías quemadas por ejercicio",
    description: "Calcula las calorías que quemas según el tipo de ejercicio, duración y peso.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FD9B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="5" r="2" /><path d="M10 22v-7.5L7 12l3-5h4l3 5-3 2.5V22" />
      </svg>
    ),
  },
  {
    href: "/fecha-probable-parto",
    category: "Peso y medidas",
    name: "Calculadora de fecha de parto",
    description: "Calcula la fecha estimada de parto y semanas de embarazo desde tu última menstruación.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FD9B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    href: "/edad-biologica",
    category: "Peso y medidas",
    name: "Calculadora de edad biológica",
    description: "Estima tu edad biológica real basada en tus hábitos de salud y estilo de vida.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FD9B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    href: "/interpretador-presion-arterial",
    category: "Peso y medidas",
    name: "Interpretador de presión arterial",
    description: "Interpreta tu presión arterial según las guías internacionales AHA 2017.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FD9B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    href: "/peso-ideal",
    category: "Peso y medidas",
    name: "Calculadora de peso ideal",
    description: "Descubre tu peso ideal según tu altura, sexo y complexión usando 3 fórmulas.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FD9B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="2" x2="12" y2="6" /><path d="M5 3l2 8H3l2-8z" /><path d="M17 3l2 8h-4l2-8z" /><line x1="3" y1="11" x2="21" y2="11" /><path d="M5 11v10" /><path d="M19 11v10" /><line x1="5" y1="16" x2="19" y2="16" />
      </svg>
    ),
  },
];

export default function SaludPage() {
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
          ♥
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
              Salud
            </span>
          </div>

          <h1
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.4px",
              lineHeight: 1.2,
              marginBottom: "10px",
            }}
          >
            Herramientas para tu bienestar
          </h1>
          <p style={{ fontSize: "14px", color: "#EEEEEE", lineHeight: "1.65", maxWidth: "520px", marginBottom: "24px" }}>
            Calculadoras de IMC, calorías, hidratación, sueño y más. Sin datos almacenados, todo en tu navegador.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: "10", label: "herramientas" },
              { value: "100%", label: "privado" },
              { value: "0", label: "datos guardados" },
            ].map((s) => (
              <div key={s.label}>
                <span
                  style={{ fontSize: "22px", fontWeight: 600, color: NICHO.color, display: "block", lineHeight: 1 }}
                >
                  {s.value}
                </span>
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
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: activeTab === tab ? NICHO.color : "#FFFFFF",
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
                  color: "#EEEEEE",
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
                    color: activeTab === tab ? NICHO.color : "#F5F5F5",
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
                      background: activeTab === tab ? NICHO.color : "#F5F5F5",
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
                  color: "#EEEEEE",
                  marginBottom: "12px",
                }}
              >
                Otras categorías
              </p>
              {[
                { name: "Finanzas", color: "#5C6BC0", href: "/finanzas" },
                { name: "Hogar", color: "#D4856A", href: "#" },
                { name: "Educación", color: "#74AEDD", href: "#" },
                { name: "Nutrición", color: "#D4B85A", href: "#" },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 8px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    color: "#EEEEEE",
                    marginBottom: "2px",
                    textDecoration: "none",
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
                  {cat.href === "#" && (
                    <span style={{ fontSize: "10px", color: "#F5F5F5", marginLeft: "auto" }}>próx.</span>
                  )}
                </Link>
              ))}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ fontSize: "13px", color: "#EEEEEE" }}>
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
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "6px", lineHeight: "1.35" }}>
                        {tool.name}
                      </p>
                      <p style={{ fontSize: "11px", color: "#F5F5F5", lineHeight: "1.55", flex: 1, paddingRight: "20px" }}>
                        {tool.description}
                      </p>
                      <span
                        style={{
                          position: "absolute",
                          bottom: "14px",
                          right: "14px",
                          fontSize: "13px",
                          color: "#FFFFFF",
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
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", display: "block", marginBottom: "2px" }}>
                          {tool.name}
                        </span>
                        <span style={{ fontSize: "11px", color: "#F5F5F5", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {tool.description}
                        </span>
                      </div>
                      <span style={{ color: "#FFFFFF", fontSize: "14px", flexShrink: 0 }}>→</span>
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
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>
                  ¿Falta alguna herramienta?
                </p>
                <p style={{ fontSize: "12px", color: "#EEEEEE" }}>
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
