"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4856A", light: "#E8A88E", bg: "#3D2218", tint: "#1C1210", border: "rgba(212,133,106,0.25)" };

function fmt2(n: number) { return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmt0(n: number) { return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };
function focusStyle(el: HTMLInputElement) { el.style.borderColor = NICHO.color; el.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }
function blurStyle(el: HTMLInputElement) { el.style.borderColor = "#1E2030"; el.style.boxShadow = "none"; }

export default function CalculadoraAzulejos() {
  const [largoArea, setLargoArea] = useState("4");
  const [anchoArea, setAnchoArea] = useState("3");
  const [largoAz, setLargoAz] = useState("60");
  const [anchoAz, setAnchoAz] = useState("30");
  const [piezasCaja, setPiezasCaja] = useState("6");
  const [desperdicio, setDesperdicio] = useState("10");
  const [precioCaja, setPrecioCaja] = useState("350");

  const [resultado, setResultado] = useState<{
    area: number;
    piezasBase: number;
    cajasBase: number;
    cajasDesperdicio: number;
    piezasConDesperdicio: number;
    piezasSobrantes: number;
    costoTotal: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const LA = parseFloat(largoArea) || 0;
    const WA = parseFloat(anchoArea) || 0;
    const LAz = parseFloat(largoAz) || 0;
    const WAz = parseFloat(anchoAz) || 0;
    const pc = parseInt(piezasCaja) || 6;
    const desp = parseFloat(desperdicio) || 10;
    const precio = parseFloat(precioCaja) || 0;

    if (LA <= 0 || WA <= 0 || LAz <= 0 || WAz <= 0) return;

    const area = LA * WA;
    const areaPieza = (LAz / 100) * (WAz / 100);
    const piezasBase = Math.ceil(area / areaPieza);
    const cajasBase = Math.ceil(piezasBase / pc);
    const piezasConDesperdicio = Math.ceil(piezasBase * (1 + desp / 100));
    const cajasDesperdicio = Math.ceil(piezasConDesperdicio / pc);
    const piezasSobrantes = cajasDesperdicio * pc - piezasConDesperdicio;
    const costoTotal = cajasDesperdicio * precio;

    setResultado({ area, piezasBase, cajasBase, cajasDesperdicio, piezasConDesperdicio, piezasSobrantes, costoTotal });
  }, [largoArea, anchoArea, largoAz, anchoAz, piezasCaja, desperdicio, precioCaja]);

  return (
    <>
      <ToolSchema
        name="Calculadora de azulejos, baldosas y pisos por m²"
        description="Calcula cuántas cajas de azulejos, baldosas, porcelanato o piso flotante necesitas para cubrir cualquier área. Incluye porcentaje de desperdicio. Gratis y sin registro."
        url="https://utilbox.lat/calculadora-azulejos"
        category="Hogar"
        faqItems={[
          { q: "¿Cuánto desperdicio debo calcular para instalación en diagonal?", a: "La instalación en diagonal (45°) genera mucho más desperdicio en los bordes. Calcula al menos un 15–20% extra. Para áreas pequeñas o con muchas esquinas y obstáculos, puede llegar al 25%." },
          { q: "¿Qué diferencia hay entre azulejo, porcelanato y cerámica?", a: "La cerámica es porosa y más económica, ideal para paredes o zonas de bajo tráfico. El porcelanato es más denso, resistente a manchas y al desgaste, recomendado para pisos de alto tráfico. El azulejo es generalmente cerámica vidriada para paredes." },
          { q: "¿Puedo instalar pisos sobre pisos existentes?", a: "Técnicamente sí, pero aumentas la altura del piso, lo que puede crear desniveles en puertas y transiciones entre cuartos. Es preferible retirar el piso anterior para asegurar una base plana y estable, especialmente con porcelanato pesado." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/hogar" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Hogar</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de azulejos y pisos</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Construcción</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de azulejos y pisos
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula cuántas cajas de azulejos o pisos necesitas para cubrir cualquier área con el desperdicio incluido.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Dimensiones del área</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Largo (m)</label>
                  <input type="number" min="0" step="0.1" value={largoArea} onChange={e => setLargoArea(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Ancho (m)</label>
                  <input type="number" min="0" step="0.1" value={anchoArea} onChange={e => setAnchoArea(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>
              </div>

              <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Dimensiones del azulejo/piso</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Largo (cm)</label>
                  <input type="number" min="1" step="1" value={largoAz} onChange={e => setLargoAz(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Ancho (cm)</label>
                  <input type="number" min="1" step="1" value={anchoAz} onChange={e => setAnchoAz(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Piezas por caja</label>
                  <input type="number" min="1" step="1" value={piezasCaja} onChange={e => setPiezasCaja(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Precio por caja ($)</label>
                  <input type="number" min="0" step="1" value={precioCaja} onChange={e => setPrecioCaja(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Desperdicio</label>
                  <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{desperdicio}%</span>
                </div>
                <input type="range" min="5" max="20" step="1" value={desperdicio} onChange={e => setDesperdicio(e.target.value)}
                  style={{ width: "100%", accentColor: NICHO.color }} />
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular cajas
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Cajas necesarias (con desperdicio)</p>
                  <p style={{ fontSize: "52px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    {resultado.cajasDesperdicio}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "4px" }}>
                    cajas ({resultado.piezasConDesperdicio} piezas)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Área total", value: `${fmt2(resultado.area)} m²`, color: NICHO.light },
                    { label: "Piezas base (sin desperdicio)", value: `${fmt0(resultado.piezasBase)} piezas`, color: NICHO.light },
                    { label: "Cajas sin desperdicio", value: `${resultado.cajasBase} cajas`, color: "#FFFFFF" },
                    { label: "Piezas sobrantes", value: `${resultado.piezasSobrantes} piezas`, color: "#D4B85A" },
                  ].map(item => (
                    <div key={item.label} className="rounded-[10px] p-4" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: item.color }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: `1px solid ${NICHO.color}40` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "4px" }}>Costo total estimado</p>
                  <p style={{ fontSize: "32px", fontWeight: 600, color: NICHO.color, lineHeight: 1 }}>${fmt2(resultado.costoTotal)}</p>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.6" }}>
                    💡 Las piezas sobrantes son útiles para reparaciones futuras. Guárdalas del mismo lote para garantizar color idéntico.
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>⬜</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa las medidas y presiona Calcular cajas</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Por qué incluir el porcentaje de desperdicio
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Al instalar azulejos o pisos, siempre habrá piezas que se deben cortar para ajustarse a esquinas, bordes y obstáculos como columnas o desagües. El desperdicio estándar para áreas rectangulares simples es del 10%. Para áreas con muchos cortes o instalación en diagonal, considera un 15–20%.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Siempre compra del mismo lote de fabricación. El tono puede variar entre lotes incluso con el mismo código de color. Guardar algunas cajas del mismo lote te permite hacer reparaciones perfectas años después.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Cuánto desperdicio debo calcular para instalación en diagonal?", a: "La instalación en diagonal (45°) genera mucho más desperdicio en los bordes. Calcula al menos un 15–20% extra. Para áreas pequeñas o con muchas esquinas y obstáculos, puede llegar al 25%." },
                { q: "¿Qué diferencia hay entre azulejo, porcelanato y cerámica?", a: "La cerámica es porosa y más económica, ideal para paredes o zonas de bajo tráfico. El porcelanato es más denso, resistente a manchas y al desgaste, recomendado para pisos de alto tráfico. El azulejo es generalmente cerámica vidriada para paredes." },
                { q: "¿Puedo instalar pisos sobre pisos existentes?", a: "Técnicamente sí, pero aumentas la altura del piso, lo que puede crear desniveles en puertas y transiciones entre cuartos. Es preferible retirar el piso anterior para asegurar una base plana y estable, especialmente con porcelanato pesado." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Planifica tu reforma con precisión.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-pintura", label: "Calculadora de pintura", desc: "Galones y costo para cada ambiente" },
                { href: "/presupuesto-remodelacion", label: "Presupuesto de remodelación", desc: "Costo total de tu reforma" },
                { href: "/consumo-electrico", label: "Consumo eléctrico", desc: "Cuánto gastas en electricidad" },
                { href: "/fondo-emergencia-hogar", label: "Fondo de emergencia", desc: "Reserva para imprevistos del hogar" },
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
