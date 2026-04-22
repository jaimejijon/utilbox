"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4856A", light: "#E8A88E", bg: "#3D2218", tint: "#1C1210", border: "rgba(212,133,106,0.25)" };

function fmtMXN(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

function focusStyle(el: HTMLInputElement | HTMLSelectElement) {
  el.style.borderColor = NICHO.color;
  el.style.boxShadow = `0 0 0 1px ${NICHO.color}`;
}
function blurStyle(el: HTMLInputElement | HTMLSelectElement) {
  el.style.borderColor = "#1E2030";
  el.style.boxShadow = "none";
}

export default function SimuladorHipoteca() {
  const [precio, setPrecio] = useState("2000000");
  const [enganchemodo, setEngancheModo] = useState<"pct" | "monto">("pct");
  const [enganche, setEnganche] = useState("20");
  const [plazo, setPlazo] = useState("20");
  const [tasa, setTasa] = useState("10");
  const [seguro, setSeguro] = useState("0");
  const [impuesto, setImpuesto] = useState("0");

  const [resultado, setResultado] = useState<{
    cuota: number;
    prestamo: number;
    totalIntereses: number;
    costoTotal: number;
    ingresoRecomendado: number;
    barras: { year: number; capital: number; intereses: number }[];
  } | null>(null);

  const calcular = useCallback(() => {
    const P_precio = parseFloat(precio) || 0;
    const P_enganche = parseFloat(enganche) || 0;
    const P_plazo = parseInt(plazo) || 20;
    const P_tasa = parseFloat(tasa) || 0;
    const P_seguro = parseFloat(seguro) || 0;
    const P_impuesto = parseFloat(impuesto) || 0;

    if (P_precio <= 0 || P_plazo <= 0 || P_tasa <= 0) return;

    const engancheMonto = enganchemodo === "pct" ? P_precio * (P_enganche / 100) : P_enganche;
    const prestamo = P_precio - engancheMonto;
    const r = P_tasa / 12 / 100;
    const n = P_plazo * 12;
    const cuotaBase = prestamo * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const cuota = cuotaBase + P_seguro + P_impuesto;
    const totalIntereses = (cuotaBase * n) - prestamo;
    const costoTotal = P_precio + totalIntereses + (P_seguro + P_impuesto) * n;
    const ingresoRecomendado = cuota / 0.30;

    // Annual breakdown
    const barras: { year: number; capital: number; intereses: number }[] = [];
    let saldo = prestamo;
    for (let y = 1; y <= P_plazo; y++) {
      let capYear = 0;
      let intYear = 0;
      for (let m = 0; m < 12; m++) {
        const intMes = saldo * r;
        const capMes = cuotaBase - intMes;
        intYear += intMes;
        capYear += capMes;
        saldo -= capMes;
        if (saldo < 0) saldo = 0;
      }
      barras.push({ year: y, capital: capYear, intereses: intYear });
    }

    setResultado({ cuota, prestamo, totalIntereses, costoTotal, ingresoRecomendado, barras });
  }, [precio, enganchemodo, enganche, plazo, tasa, seguro, impuesto]);

  const maxBar = resultado ? Math.max(...resultado.barras.map(b => b.capital + b.intereses)) : 1;

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/hogar" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Hogar</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Simulador de hipoteca</span>
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
              Simulador de hipoteca
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula tu cuota mensual, intereses totales y tabla de amortización completa para tu crédito hipotecario.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Precio de la vivienda ($)</label>
                  <input type="number" min="0" step="1000" value={precio} onChange={e => setPrecio(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Enganche / entrada</label>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {(["pct", "monto"] as const).map(m => (
                        <button key={m} onClick={() => setEngancheModo(m)}
                          style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px", border: "none", cursor: "pointer", background: enganchemodo === m ? NICHO.color : "#1E2030", color: enganchemodo === m ? "#fff" : "#EEEEEE" }}>
                          {m === "pct" ? "%" : "$"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input type="number" min="0" step={enganchemodo === "pct" ? "1" : "1000"} value={enganche} onChange={e => setEnganche(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Plazo</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{plazo} años</span>
                  </div>
                  <input type="range" min="5" max="30" step="1" value={plazo} onChange={e => setPlazo(e.target.value)}
                    style={{ width: "100%", accentColor: NICHO.color }} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Tasa de interés anual</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{tasa}%</span>
                  </div>
                  <input type="range" min="1" max="20" step="0.5" value={tasa} onChange={e => setTasa(e.target.value)}
                    style={{ width: "100%", accentColor: NICHO.color }} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Seguro mensual ($)</label>
                    <input type="number" min="0" value={seguro} onChange={e => setSeguro(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Predial mensual ($)</label>
                    <input type="number" min="0" value={impuesto} onChange={e => setImpuesto(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                  </div>
                </div>
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular hipoteca
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Cuota mensual total</p>
                  <p style={{ fontSize: "48px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    ${fmtMXN(resultado.cuota)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Monto del préstamo", value: `$${fmtMXN(resultado.prestamo)}`, color: NICHO.light },
                    { label: "Total intereses", value: `$${fmtMXN(resultado.totalIntereses)}`, color: "#E07070" },
                    { label: "Costo total vivienda", value: `$${fmtMXN(resultado.costoTotal)}`, color: "#FFFFFF" },
                    { label: "Ingreso recomendado", value: `$${fmtMXN(resultado.ingresoRecomendado)}/mes`, color: "#D4B85A" },
                  ].map(item => (
                    <div key={item.label} className="rounded-[10px] p-4" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: item.color }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Bar chart */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "12px" }}>Capital vs intereses por año</p>
                  <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "80px", overflowX: "auto" }}>
                    {resultado.barras.map(b => {
                      const total = b.capital + b.intereses;
                      const pctCap = (b.capital / total) * 100;
                      const pctInt = (b.intereses / total) * 100;
                      const barH = (total / maxBar) * 76;
                      return (
                        <div key={b.year} title={`Año ${b.year}: Capital $${fmtMXN(b.capital)}, Intereses $${fmtMXN(b.intereses)}`}
                          style={{ flex: "1 0 10px", height: `${barH}px`, display: "flex", flexDirection: "column", borderRadius: "3px", overflow: "hidden", minWidth: "8px" }}>
                          <div style={{ height: `${pctInt}%`, background: "#E07070" }} />
                          <div style={{ height: `${pctCap}%`, background: NICHO.color }} />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#EEEEEE" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: NICHO.color, display: "block" }} />Capital
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#EEEEEE" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#E07070", display: "block" }} />Intereses
                    </span>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.6" }}>
                    💡 <strong style={{ color: "#FFFFFF" }}>Regla del 30%:</strong> Tu cuota mensual no debería superar el 30% de tu ingreso. Con esta hipoteca necesitarías ganar al menos <strong style={{ color: NICHO.color }}>${fmtMXN(resultado.ingresoRecomendado)}/mes</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>🏠</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa los datos y presiona Calcular hipoteca</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo funciona la simulación de hipoteca
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El simulador calcula la cuota mensual usando la fórmula de amortización francesa, la más utilizada en créditos hipotecarios en Latinoamérica. La cuota se mantiene constante durante todo el plazo, aunque la proporción de capital e intereses cambia mes a mes.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Al inicio del préstamo pagas más intereses que capital. Conforme avanza el tiempo, esa proporción se invierte: cada cuota amortiza más capital y menos intereses. La gráfica de barras muestra esta evolución año por año.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Qué enganche mínimo necesito para una hipoteca?", a: "En la mayoría de los países de Latinoamérica el enganche mínimo es del 10% al 20% del valor de la vivienda. Un enganche mayor reduce el monto del préstamo, baja tu cuota mensual y puede darte acceso a mejores tasas de interés." },
                { q: "¿Qué significa la tasa de interés anual?", a: "Es el porcentaje que el banco te cobra por prestarte el dinero, expresado en términos anuales. En México las tasas hipotecarias suelen estar entre 9% y 12% anual. Compara siempre el CAT (Costo Anual Total) que incluye comisiones y seguros." },
                { q: "¿Conviene pagar más del mínimo mensual?", a: "Sí. Hacer pagos adelantados a capital reduce el saldo pendiente y, por tanto, los intereses futuros. Pagar el doble durante los primeros años puede reducir el plazo de tu hipoteca a la mitad y ahorrarte decenas de miles de pesos en intereses." },
              ].map(item => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Otras herramientas de hogar</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Planifica cada aspecto de tu vivienda.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/alquiler-vs-compra", label: "Alquiler vs Compra", desc: "¿Qué conviene más a largo plazo?" },
                { href: "/fondo-emergencia-hogar", label: "Fondo de emergencia", desc: "Cuánto ahorrar para imprevistos" },
                { href: "/presupuesto-remodelacion", label: "Presupuesto de remodelación", desc: "Estima el costo de tu reforma" },
                { href: "/consumo-electrico", label: "Consumo eléctrico", desc: "Cuánto gastas en electricidad" },
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
