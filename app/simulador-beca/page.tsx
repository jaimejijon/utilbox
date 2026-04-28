"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#74AEDD", light: "#9DC4E8", bg: "#152638", tint: "#0E1318", border: "rgba(116,174,221,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtDec(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function SimuladorBeca() {
  const [costoTotal, setCostoTotal] = useState("40000");
  const [duracion, setDuracion] = useState("4");
  const [ingresos, setIngresos] = useState("2500");
  const [promedio, setPromedio] = useState("8.5");
  const [resultado, setResultado] = useState<{
    escenarios: { porcentaje: number; monto: number; financiar: number; cuota5: number; cuota10: number }[];
    costoAnual: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const total = parseFloat(costoTotal) || 0;
    const dur = parseFloat(duracion) || 1;
    if (total <= 0 || dur <= 0) return;

    const costoAnual = total / dur;
    const tasaAnual = 0.08;
    const escenarios = [25, 50, 75, 100].map((pct) => {
      const monto = total * (pct / 100);
      const financiar = total - monto;
      const cuotaCalc = (plazo: number) => {
        if (financiar <= 0) return 0;
        const n = plazo * 12;
        const r = tasaAnual / 12;
        return financiar * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      };
      return { porcentaje: pct, monto, financiar, cuota5: cuotaCalc(5), cuota10: cuotaCalc(10) };
    });

    setResultado({ escenarios, costoAnual });
  }, [costoTotal, duracion, ingresos, promedio]);

  return (
    <>
      <ToolSchema
        name="Simulador de beca y financiamiento educativo"
        description="Simula diferentes porcentajes de beca (25%, 50%, 75%, 100%) y calcula la cuota mensual del crédito educativo restante. Para becas universitarias en México, Colombia, Chile y más."
        url="https://utilbox.lat/simulador-beca"
        category="Educación"
        faqItems={[
          { q: "¿Cuánto promedio se necesita para una beca por mérito?", a: "Varía por institución. En general, becas parciales (25–50%) se obtienen con promedios de 8.0+, mientras que becas completas suelen exigir 9.0 o más y demostrar necesidad económica simultáneamente. Los fondos gubernamentales pueden tener criterios distintos." },
          { q: "¿Es mejor pagar la carrera en 5 o en 10 años?", a: "En 5 años pagas menos interés total pero la cuota mensual es mayor. En 10 años la cuota es más baja pero el interés acumulado puede ser el doble. Lo ideal es elegir el plazo más corto que tu ingreso mensual te permita pagar cómodamente, sin que supere el 25-30% de tu salario." },
          { q: "¿Puedo combinar beca y crédito educativo?", a: "Sí, y es la estrategia más común. Muchas instituciones ofrecen paquetes de ayuda financiera que combinan beca (no reembolsable) con préstamo subsidiado (baja tasa). Solicita primero la beca máxima disponible y usa el crédito solo para el monto restante." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/educacion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Educación</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Simulador de beca y financiamiento</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: inputs */}
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Financiero</span>
            </div>

            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Simulador de beca y financiamiento
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Simula diferentes escenarios de beca y calcula cuánto necesitarías financiar con crédito educativo.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="space-y-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Costo total de la carrera</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>${fmt(parseFloat(costoTotal) || 0)}</span>
                  </div>
                  <input type="number" min="0" step="1000" value={costoTotal} onChange={(e) => setCostoTotal(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Duración de la carrera</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{duracion} años</span>
                  </div>
                  <input type="number" min="1" max="10" step="1" value={duracion} onChange={(e) => setDuracion(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Ingresos familiares mensuales</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>${fmt(parseFloat(ingresos) || 0)}</span>
                  </div>
                  <input type="number" min="0" step="100" value={ingresos} onChange={(e) => setIngresos(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Promedio académico actual</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{promedio} / 10</span>
                  </div>
                  <input type="number" min="0" max="10" step="0.1" value={promedio} onChange={(e) => setPromedio(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Simular escenarios
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "4px" }}>Costo anual estimado</p>
                  <p style={{ fontSize: "28px", fontWeight: 600, color: NICHO.color }}>${fmt(resultado.costoAnual)}</p>
                </div>

                <div className="space-y-3">
                  {resultado.escenarios.map((e) => (
                    <div key={e.porcentaje} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <div>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>Beca del {e.porcentaje}%</span>
                          <span style={{ marginLeft: "8px", fontSize: "12px", color: "#6EC9A0", fontWeight: 600 }}>−${fmt(e.monto)}</span>
                        </div>
                        <span style={{ fontSize: "11px", color: "#EEEEEE" }}>Financiar: ${fmt(e.financiar)}</span>
                      </div>
                      {e.financiar > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          <div style={{ background: "#0F1117", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                            <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "3px" }}>Cuota a 5 años</p>
                            <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.light }}>${fmtDec(e.cuota5)}/mes</p>
                          </div>
                          <div style={{ background: "#0F1117", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                            <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "3px" }}>Cuota a 10 años</p>
                            <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.light }}>${fmtDec(e.cuota10)}/mes</p>
                          </div>
                        </div>
                      ) : (
                        <p style={{ fontSize: "13px", color: "#6EC9A0", textAlign: "center" }}>¡Beca completa! Sin financiamiento adicional</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa los datos y presiona Simular escenarios</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo funciona el financiamiento educativo y las becas
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Las becas educativas son fondos no reembolsables que cubren parte o la totalidad del costo de una carrera universitaria. Se otorgan por mérito académico, situación socioeconómica, o una combinación de ambos. Una beca del 50% significa que solo debes financiar la mitad del costo total, reduciendo significativamente tu deuda educativa.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El crédito educativo es el complemento habitual cuando la beca no cubre el total. Las tasas de interés para préstamos estudiantiles suelen ser más bajas que los créditos de consumo (entre 6% y 12% anual dependiendo del país e institución). El plazo de pago más común oscila entre 5 y 15 años tras graduarse.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Este simulador usa una tasa de referencia del 8% anual para calcular las cuotas estimadas. Consulta las condiciones específicas de tu banco o institución de crédito para obtener cifras exactas.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Carrera de $40,000 en 4 años, beca del 50% ($20,000 cubiertos):
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "A financiar", value: "$20,000", sub: "Tras beca 50%" },
                { label: "Cuota a 5 años", value: "$405/mes", sub: "Tasa 8% anual" },
                { label: "Cuota a 10 años", value: "$243/mes", sub: "Tasa 8% anual" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.light, marginBottom: "2px" }}>{item.value}</p>
                  <p style={{ fontSize: "10px", color: "#F5F5F5" }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Cuánto promedio se necesita para una beca por mérito?", a: "Varía por institución. En general, becas parciales (25–50%) se obtienen con promedios de 8.0+, mientras que becas completas suelen exigir 9.0 o más y demostrar necesidad económica simultáneamente. Los fondos gubernamentales pueden tener criterios distintos." },
                { q: "¿Es mejor pagar la carrera en 5 o en 10 años?", a: "En 5 años pagas menos interés total pero la cuota mensual es mayor. En 10 años la cuota es más baja pero el interés acumulado puede ser el doble. Lo ideal es elegir el plazo más corto que tu ingreso mensual te permita pagar cómodamente, sin que supere el 25-30% de tu salario." },
                { q: "¿Puedo combinar beca y crédito educativo?", a: "Sí, y es la estrategia más común. Muchas instituciones ofrecen paquetes de ayuda financiera que combinan beca (no reembolsable) con préstamo subsidiado (baja tasa). Solicita primero la beca máxima disponible y usa el crédito solo para el monto restante." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Explora otras herramientas de educación</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Planifica tu inversión en educación.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/costo-carrera", label: "Costo total de carrera", desc: "Desglose completo de gastos" },
                { href: "/deuda-estudiantil", label: "Calculadora de deuda", desc: "Tabla de amortización detallada" },
                { href: "/roi-posgrado", label: "ROI de un posgrado", desc: "¿Vale la pena económicamente?" },
                { href: "/promedio-ponderado", label: "Promedio ponderado", desc: "Calcula tu promedio académico" },
              ].map((tool) => (
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
