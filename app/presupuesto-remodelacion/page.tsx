"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4856A", light: "#E8A88E", bg: "#3D2218", tint: "#1C1210", border: "rgba(212,133,106,0.25)" };

function fmtMXN(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };
function focusStyle(el: HTMLInputElement | HTMLSelectElement) { el.style.borderColor = NICHO.color; el.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }
function blurStyle(el: HTMLInputElement | HTMLSelectElement) { el.style.borderColor = "#1E2030"; el.style.boxShadow = "none"; }

const TIPOS = [
  { key: "cocina", label: "Cocina", baseMin: 300, baseMax: 500 },
  { key: "bano", label: "Baño", baseMin: 400, baseMax: 600 },
  { key: "sala", label: "Sala-comedor", baseMin: 150, baseMax: 300 },
  { key: "dormitorio", label: "Dormitorio", baseMin: 100, baseMax: 250 },
  { key: "fachada", label: "Fachada", baseMin: 80, baseMax: 200 },
  { key: "jardin", label: "Jardín", baseMin: 50, baseMax: 150 },
  { key: "electrico", label: "Inst. eléctrica", baseMin: 30, baseMax: 60 },
  { key: "plomeria", label: "Plomería", baseMin: 40, baseMax: 80 },
];

const CALIDAD_MULT: Record<string, number> = { Económico: 0.6, Estándar: 1.0, Premium: 1.8 };

const PAISES: Record<string, number> = {
  "México": 1.0,
  "Colombia": 0.7,
  "Argentina": 0.6,
  "Chile": 1.1,
  "Perú": 0.65,
  "Ecuador": 0.75,
  "Otro": 0.9,
};

export default function PresupuestoRemodelacion() {
  const [seleccionados, setSeleccionados] = useState<Record<string, boolean>>({ cocina: true });
  const [areas, setAreas] = useState<Record<string, string>>({ cocina: "10" });
  const [calidad, setCalidad] = useState("Estándar");
  const [pais, setPais] = useState("México");

  const [resultado, setResultado] = useState<{
    items: { label: string; costo: number }[];
    subtotalMat: number;
    subtotalMO: number;
    total: number;
    minimo: number;
    maximo: number;
    contingencia: number;
  } | null>(null);

  const toggleTipo = (key: string) => {
    setSeleccionados(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calcular = useCallback(() => {
    const mult = CALIDAD_MULT[calidad] ?? 1;
    const paisMult = PAISES[pais] ?? 1;
    const items: { label: string; costo: number }[] = [];

    for (const tipo of TIPOS) {
      if (!seleccionados[tipo.key]) continue;
      const areaStr = areas[tipo.key] || "0";
      const area = parseFloat(areaStr) || 0;
      if (area <= 0) continue;
      const costoMid = ((tipo.baseMin + tipo.baseMax) / 2) * mult * paisMult * area;
      items.push({ label: tipo.label, costo: costoMid });
    }

    if (items.length === 0) return;

    const subtotalBase = items.reduce((s, i) => s + i.costo, 0);
    const subtotalMat = subtotalBase * 0.4;
    const subtotalMO = subtotalBase * 0.6;
    const total = subtotalBase;
    const minimo = total * 0.8;
    const maximo = total * 1.2;
    const contingencia = total * 0.15;

    setResultado({ items, subtotalMat, subtotalMO, total, minimo, maximo, contingencia });
  }, [seleccionados, areas, calidad, pais]);

  return (
    <>
      <ToolSchema
        name="Calculadora de presupuesto de remodelación"
        description="Estima el costo total de tu remodelación por tipo de trabajo: demolición, albañilería, eléctrico, plomería y acabados. Para México, Colombia, Argentina, Chile y Latinoamérica."
        url="https://utilbox.lat/presupuesto-remodelacion"
        category="Hogar"
        faqItems={[
          { q: "¿Por qué hay tanta diferencia entre el mínimo y el máximo?", a: "Las obras de construcción son impredecibles. Pueden aparecer problemas ocultos (tuberías en mal estado, estructuras dañadas), los precios de materiales fluctúan, y el alcance de la obra puede cambiar. Siempre presupuesta el peor escenario y guarda un fondo de contingencia del 15–20%." },
          { q: "¿Conviene hacer todo de una vez o por etapas?", a: "Hacerlo todo de una vez ahorra en mano de obra y reduce interrupciones. Sin embargo, si el presupuesto es limitado, priorizar por urgencia (instalaciones eléctricas y plomería primero, luego acabados) es más sensato que endeudarse." },
          { q: "¿Cómo encontrar buenos contratistas?", a: "Pide mínimo tres cotizaciones por escrito. Verifica referencias en proyectos similares. Desconfía de precios muy por debajo del mercado. Establece hitos de pago atados al avance real de la obra, nunca pagues todo por adelantado." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/hogar" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Hogar</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Presupuesto de remodelación</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Construcción</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Presupuesto de remodelación
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Estima el costo total de tu remodelación por tipo de trabajo, área y materiales.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Tipo de remodelación</p>
              <div className="space-y-2 mb-4">
                {TIPOS.map(tipo => (
                  <div key={tipo.key}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input type="checkbox" checked={!!seleccionados[tipo.key]} onChange={() => toggleTipo(tipo.key)}
                        style={{ accentColor: NICHO.color, width: "14px", height: "14px" }} />
                      <span style={{ fontSize: "13px", color: "#FFFFFF" }}>{tipo.label}</span>
                    </label>
                    {seleccionados[tipo.key] && (
                      <div style={{ marginTop: "6px", paddingLeft: "22px" }}>
                        <input type="number" min="0" step="1" placeholder="Área (m²)"
                          value={areas[tipo.key] || ""} onChange={e => setAreas(prev => ({ ...prev, [tipo.key]: e.target.value }))}
                          className={inputClass} style={{ ...inputStyle, outline: "none" }}
                          onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Calidad</label>
                  <select value={calidad} onChange={e => setCalidad(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)}>
                    <option>Económico</option>
                    <option>Estándar</option>
                    <option>Premium</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>País</label>
                  <select value={pais} onChange={e => setPais(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)}>
                    {Object.keys(PAISES).map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <button onClick={calcular} className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular presupuesto
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Presupuesto total estimado</p>
                  <p style={{ fontSize: "44px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    ${fmtMXN(resultado.total)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "6px" }}>
                    Rango: ${fmtMXN(resultado.minimo)} – ${fmtMXN(resultado.maximo)}
                  </p>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Desglose por trabajo</p>
                  <div className="space-y-2">
                    {resultado.items.map(item => (
                      <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "0.5px solid #1E2030" }}>
                        <span style={{ fontSize: "13px", color: "#FFFFFF" }}>{item.label}</span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: NICHO.light }}>${fmtMXN(item.costo)}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #1E2030" }}>
                      <span style={{ fontSize: "12px", color: "#EEEEEE" }}>Materiales (40%)</span>
                      <span style={{ fontSize: "12px", color: "#EEEEEE" }}>${fmtMXN(resultado.subtotalMat)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                      <span style={{ fontSize: "12px", color: "#EEEEEE" }}>Mano de obra (60%)</span>
                      <span style={{ fontSize: "12px", color: "#EEEEEE" }}>${fmtMXN(resultado.subtotalMO)}</span>
                    </div>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.6" }}>
                    💡 <strong style={{ color: "#FFFFFF" }}>Fondo de contingencia recomendado (15%):</strong>{" "}
                    <strong style={{ color: NICHO.color }}>${fmtMXN(resultado.contingencia)}</strong>. Siempre reserve este margen para imprevistos.
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>🔨</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Selecciona los trabajos y presiona Calcular presupuesto</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo estimar el presupuesto de tu remodelación
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Los costos de remodelación varían según el país, la ciudad, la calidad de los materiales y la complejidad de la obra. Esta calculadora usa rangos de precios por metro cuadrado basados en promedios del mercado latinoamericano, ajustados por país y nivel de calidad.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              La mano de obra representa típicamente el 50–70% del costo total en reformas de interior. Los acabados premium pueden multiplicar el costo hasta 3 veces respecto a opciones económicas.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Por qué hay tanta diferencia entre el mínimo y el máximo?", a: "Las obras de construcción son impredecibles. Pueden aparecer problemas ocultos (tuberías en mal estado, estructuras dañadas), los precios de materiales fluctúan, y el alcance de la obra puede cambiar. Siempre presupuesta el peor escenario y guarda un fondo de contingencia del 15–20%." },
                { q: "¿Conviene hacer todo de una vez o por etapas?", a: "Hacerlo todo de una vez ahorra en mano de obra y reduce interrupciones. Sin embargo, si el presupuesto es limitado, priorizar por urgencia (instalaciones eléctricas y plomería primero, luego acabados) es más sensato que endeudarse." },
                { q: "¿Cómo encontrar buenos contratistas?", a: "Pide mínimo tres cotizaciones por escrito. Verifica referencias en proyectos similares. Desconfía de precios muy por debajo del mercado. Establece hitos de pago atados al avance real de la obra, nunca pagues todo por adelantado." },
              ].map(item => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Otras herramientas de construcción</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Calcula materiales y costos con precisión.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-pintura", label: "Calculadora de pintura", desc: "Galones y costo para cada ambiente" },
                { href: "/calculadora-azulejos", label: "Calculadora de azulejos", desc: "Cajas necesarias con desperdicio incluido" },
                { href: "/fondo-emergencia-hogar", label: "Fondo de emergencia", desc: "Reserva para imprevistos del hogar" },
                { href: "/simulador-hipoteca", label: "Simulador de hipoteca", desc: "Financia tu remodelación con crédito" },
              ].map(tool => (
                <Link key={tool.href} href={tool.href}
                  style={{ background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "10px 14px", textDecoration: "none", display: "block" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "2px" }}>{tool.label}</p>
                  <p style={{ fontSize: "11px", color: "#EEEEEE" }}>{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
