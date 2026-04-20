"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#5C6BC0", light: "#9AAAF0", bg: "#1E1A3A", tint: "#13141F", border: "rgba(92,107,192,0.2)" };

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#ECECEC" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";

export default function CalculadoraROI() {
  const [modo, setModo] = useState<"simple" | "detallado">("simple");
  const [inversion, setInversion] = useState("10000");
  const [ganancia, setGanancia] = useState("15000");
  const [ingresos, setIngresos] = useState("25000");
  const [costos, setCostos] = useState("10000");
  const [meses, setMeses] = useState("12");
  const [resultado, setResultado] = useState<{
    roi: number;
    gananciaNet: number;
    roiAnual: number | null;
    mesesRecuperacion: number | null;
  } | null>(null);

  const calcular = useCallback(() => {
    let costoInicial: number;
    let retorno: number;
    let duracionMeses: number | null = null;
    if (modo === "simple") {
      costoInicial = parseFloat(inversion) || 0;
      retorno = parseFloat(ganancia) || 0;
    } else {
      costoInicial = parseFloat(costos) || 0;
      retorno = parseFloat(ingresos) || 0;
      duracionMeses = parseInt(meses) || 12;
    }
    if (costoInicial <= 0) return;
    const gananciaNet = retorno - costoInicial;
    const roi = (gananciaNet / costoInicial) * 100;
    const roiAnual = duracionMeses ? (roi / duracionMeses) * 12 : null;
    const mesesRecuperacion = gananciaNet > 0 && duracionMeses ? (costoInicial / (gananciaNet / duracionMeses)) : null;
    setResultado({ roi, gananciaNet, roiAnual, mesesRecuperacion });
  }, [modo, inversion, ganancia, ingresos, costos, meses]);

  const getRoiColor = (roi: number) => roi > 50 ? "#6EC9A0" : roi > 10 ? NICHO.light : roi > 0 ? "#D4B85A" : "#E07070";
  const getRoiLabel = (roi: number) => roi > 100 ? "Excelente retorno" : roi > 50 ? "Muy buen retorno" : roi > 20 ? "Buen retorno" : roi > 0 ? "Retorno positivo" : roi === 0 ? "Punto de equilibrio" : "Pérdida neta";

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#888", textDecoration: "none" }} className="hover:!text-[#CCCCCC] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/finanzas" style={{ color: "#888", textDecoration: "none" }} className="hover:!text-[#CCCCCC] transition-colors">Finanzas</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#888" }}>Calculadora de ROI</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Negocios</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#ECECEC", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de ROI
            </h1>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65", marginBottom: "20px" }}>
              Calcula el retorno sobre la inversión de cualquier proyecto, negocio o campaña.
            </p>

            {/* Mode tabs */}
            <div className="flex gap-2 mb-5">
              {(["simple", "detallado"] as const).map((m) => (
                <button key={m} onClick={() => { setModo(m); setResultado(null); }}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                  style={{
                    background: modo === m ? NICHO.bg : "#141520",
                    color: modo === m ? NICHO.color : "#555",
                    border: `0.5px solid ${modo === m ? NICHO.border : "#1E2030"}`,
                  }}>
                  {m === "simple" ? "Cálculo simple" : "Con período de tiempo"}
                </button>
              ))}
            </div>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              {modo === "simple" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Inversión inicial", suffix: "$", value: inversion, set: setInversion },
                    { label: "Valor final / Retorno total", suffix: "$", value: ganancia, set: setGanancia },
                  ].map((f) => (
                    <div key={f.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#888" }}>{f.label}</label>
                        <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{f.suffix}{f.value}</span>
                      </div>
                      <input type="number" min="0" value={f.value} onChange={(e) => f.set(e.target.value)}
                        className={inputClass} style={{ ...inputStyle, outline: "none" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Ingresos / Retorno", suffix: "$", value: ingresos, set: setIngresos },
                    { label: "Costo / Inversión total", suffix: "$", value: costos, set: setCostos },
                    { label: "Duración", suffix: "meses", value: meses, set: setMeses, min: "1" },
                  ].map((f) => (
                    <div key={f.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "#888" }}>{f.label}</label>
                        <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{f.value} {f.suffix}</span>
                      </div>
                      <input type="number" min={f.min || "0"} value={f.value} onChange={(e) => f.set(e.target.value)}
                        className={inputClass} style={{ ...inputStyle, outline: "none" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                    </div>
                  ))}
                </div>
              )}
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular ROI
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                {/* Main ROI */}
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>{getRoiLabel(resultado.roi)}</p>
                  <p style={{ fontSize: "44px", fontWeight: 600, color: getRoiColor(resultado.roi), letterSpacing: "-1px", lineHeight: 1 }}>
                    {resultado.roi >= 0 ? "+" : ""}{fmt(resultado.roi)}%
                  </p>
                  <p style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>ROI total</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>Ganancia neta</p>
                    <p style={{ fontSize: "20px", fontWeight: 600, color: resultado.gananciaNet >= 0 ? "#6EC9A0" : "#E07070" }}>
                      {resultado.gananciaNet >= 0 ? "+" : ""}${fmt(resultado.gananciaNet)}
                    </p>
                  </div>
                  {resultado.roiAnual !== null && (
                    <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                      <p style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>ROI anualizado</p>
                      <p style={{ fontSize: "20px", fontWeight: 600, color: getRoiColor(resultado.roiAnual) }}>
                        {resultado.roiAnual >= 0 ? "+" : ""}{fmt(resultado.roiAnual)}%
                      </p>
                    </div>
                  )}
                  {resultado.mesesRecuperacion !== null && resultado.gananciaNet > 0 && (
                    <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                      <p style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>Período de recuperación</p>
                      <p style={{ fontSize: "20px", fontWeight: 600, color: "#D0D0D0" }}>
                        {resultado.mesesRecuperacion.toFixed(1)} meses
                      </p>
                    </div>
                  )}
                </div>

                {/* Gauge */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#888", marginBottom: "10px" }}>Indicador de rentabilidad</p>
                  <div style={{ height: "12px", background: "#0F1117", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${Math.min(Math.abs(resultado.roi), 200) / 2}%`,
                      background: resultado.roi >= 0 ? `linear-gradient(90deg, ${NICHO.color}, #6EC9A0)` : "#E07070",
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#888", marginTop: "6px" }}>
                    <span>0%</span><span>50%</span><span>100%+</span>
                  </div>
                  <p style={{ fontSize: "11px", color: "#888", marginTop: "8px" }}>
                    Un ROI del 10–15% anual se considera bueno en inversiones diversificadas.
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <p style={{ fontSize: "13px", color: "#888" }}>Ingresa los valores y presiona Calcular ROI</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#ECECEC", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Qué es el ROI y para qué sirve
            </h2>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65", marginBottom: "14px" }}>
              El ROI (Return on Investment, o Retorno sobre la Inversión) es una de las métricas financieras más utilizadas en el mundo de los negocios. Mide la eficiencia de una inversión expresando la ganancia neta como porcentaje del costo inicial. Un ROI positivo significa que ganaste más de lo que invertiste; uno negativo, que tuviste pérdidas.
            </p>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65", marginBottom: "14px" }}>
              La fórmula es sencilla: <strong style={{ color: "#D0D0D0" }}>ROI = (Ganancia neta / Costo de inversión) × 100</strong>. Lo que hace poderosa a esta métrica es su universalidad: puedes aplicarla a una campaña de publicidad digital, a la compra de una máquina para tu negocio, a un curso de capacitación, o a cualquier otra inversión donde puedas medir el retorno.
            </p>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65" }}>
              El modo detallado calcula además el ROI anualizado y el período de recuperación, para comparar inversiones de distinta duración en igualdad de condiciones.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#ECECEC", marginBottom: "12px" }}>Ejemplo práctico: evaluar una campaña de marketing</h3>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65", marginBottom: "14px" }}>
              Una tienda en línea invierte <strong style={{ color: "#D0D0D0" }}>$8,000 USD</strong> en publicidad en redes sociales durante <strong style={{ color: "#D0D0D0" }}>6 meses</strong> y genera ventas atribuibles de <strong style={{ color: "#D0D0D0" }}>$26,000 USD</strong>:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Ganancia neta", value: "+$18,000", color: "#6EC9A0" },
                { label: "ROI total", value: "+225%", color: NICHO.light },
                { label: "ROI anualizado", value: "+450%", color: "#D0D0D0" },
                { label: "Recuperación", value: "2.7 meses", color: "#D0D0D0" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px", textAlign: "center" }}>
                  <p style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: item.color }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#ECECEC", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Cuál es un ROI \"bueno\"?", a: "Depende completamente del contexto. En campañas de marketing digital, un ROI de 3:1 (es decir, 200%) es considerado un buen resultado. En inversiones financieras diversificadas como fondos indexados, un 10–15% anual es muy sólido. Para negocios físicos, un ROI de 25–50% anual puede ser excelente. Lo más importante es compararlo con el costo de oportunidad: ¿qué más podrías haber hecho con ese dinero?" },
                { q: "¿El ROI considera el factor tiempo?", a: "El ROI básico no considera el tiempo: un 100% de ROI en 1 mes es muy diferente a un 100% de ROI en 10 años. Por eso es importante usar el ROI anualizado cuando comparas inversiones de distinta duración. Esta calculadora lo calcula automáticamente en el modo \"Con período de tiempo\"." },
                { q: "¿Qué limitaciones tiene el ROI como métrica?", a: "El ROI es una métrica poderosa pero incompleta. No considera el riesgo asociado a la inversión, la liquidez (qué tan fácil es recuperar el dinero si lo necesitas), ni factores cualitativos como el impacto en la reputación de marca. Para decisiones financieras complejas, conviene complementarlo con otras métricas como el VPN (Valor Presente Neto) y la TIR (Tasa Interna de Retorno)." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#D0D0D0", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#1A1A2E", border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#ECECEC", marginBottom: "4px" }}>Explora otras herramientas financieras</h3>
            <p style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>Todo lo que necesitas para tomar mejores decisiones con tu dinero.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-interes-compuesto", label: "Interés compuesto", desc: "Proyecta el crecimiento de tus ahorros" },
                { href: "/simulador-prestamo", label: "Simulador de préstamo", desc: "Calcula tu cuota y tabla de amortización" },
                { href: "/convertidor-monedas", label: "Convertidor de monedas", desc: "20 monedas latinoamericanas y mundiales" },
                { href: "/calculadora-jubilacion", label: "Calculadora de jubilación", desc: "¿Cuánto necesitas para retirarte?" },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href}
                  className="hover:!bg-[#1E1A3A] transition-colors"
                  style={{ background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "10px 14px", textDecoration: "none", display: "block" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#D0D0D0", marginBottom: "2px" }}>{tool.label}</p>
                  <p style={{ fontSize: "11px", color: "#888" }}>{tool.desc}</p>
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
