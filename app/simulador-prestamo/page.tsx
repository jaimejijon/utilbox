"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#5C6BC0", light: "#9AAAF0", bg: "#1E1A3A", tint: "#13141F", border: "rgba(92,107,192,0.2)" };

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface AmoRow {
  mes: number;
  cuota: number;
  interes: number;
  capital: number;
  saldo: number;
}

const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";

export default function SimuladorPrestamo() {
  const [monto, setMonto] = useState("100000");
  const [tasa, setTasa] = useState("12");
  const [plazo, setPlazo] = useState("36");
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [resultado, setResultado] = useState<{
    cuota: number;
    totalPagado: number;
    totalIntereses: number;
    tabla: AmoRow[];
  } | null>(null);

  const calcular = useCallback(() => {
    const P = parseFloat(monto) || 0;
    const r = (parseFloat(tasa) || 0) / 100 / 12;
    const n = parseInt(plazo) || 0;
    if (P <= 0 || n <= 0) return;
    let cuota: number;
    if (r === 0) { cuota = P / n; } else {
      cuota = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const tabla: AmoRow[] = [];
    let saldo = P;
    for (let mes = 1; mes <= n; mes++) {
      const interes = saldo * r;
      const capitalMes = cuota - interes;
      saldo -= capitalMes;
      tabla.push({ mes, cuota, interes, capital: capitalMes, saldo: Math.max(0, saldo) });
    }
    setResultado({ cuota, totalPagado: cuota * n, totalIntereses: cuota * n - P, tabla });
    setMostrarTabla(false);
  }, [monto, tasa, plazo]);

  const pctInteres = resultado ? Math.round((resultado.totalIntereses / resultado.totalPagado) * 100) : 0;

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/finanzas" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Finanzas</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Simulador de préstamo</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left */}
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>
                Crédito
              </span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Simulador de préstamo
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula tu cuota mensual, costo total y tabla de amortización completa con sistema francés.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Monto del préstamo", suffix: "$", value: monto, set: setMonto, min: "0", step: "any" },
                  { label: "Tasa anual", suffix: "%", value: tasa, set: setTasa, min: "0", max: "200", step: "0.1" },
                  { label: "Plazo", suffix: "meses", value: plazo, set: setPlazo, min: "1", max: "360", step: "1" },
                ].map((f) => (
                  <div key={f.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>{f.label}</label>
                      <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{f.value} {f.suffix}</span>
                    </div>
                    <input
                      type="number" min={f.min} max={f.max} step={f.step}
                      value={f.value} onChange={(e) => f.set(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                ))}
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1 rounded-[10px] p-5 text-center"
                    style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Cuota mensual</p>
                    <p style={{ fontSize: "26px", fontWeight: 600, color: NICHO.light, letterSpacing: "-0.5px" }}>${fmt(resultado.cuota)}</p>
                  </div>
                  <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Total a pagar</p>
                    <p style={{ fontSize: "20px", fontWeight: 600, color: "#FFFFFF" }}>${fmt(resultado.totalPagado)}</p>
                  </div>
                  <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Total en intereses</p>
                    <p style={{ fontSize: "20px", fontWeight: 600, color: "#E07070" }}>${fmt(resultado.totalIntereses)}</p>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Composición del costo total</p>
                  <div style={{ width: "100%", height: "14px", borderRadius: "999px", overflow: "hidden", display: "flex", background: "#0F1117" }}>
                    <div style={{ width: `${100 - pctInteres}%`, background: NICHO.color, height: "100%", transition: "width 0.4s ease" }} />
                    <div style={{ flex: 1, background: "#E07070", height: "100%" }} />
                  </div>
                  <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                    {[
                      { color: NICHO.color, label: `Capital (${100 - pctInteres}%)` },
                      { color: "#E07070", label: `Intereses (${pctInteres}%)` },
                    ].map((item) => (
                      <span key={item.label} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#EEEEEE" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: item.color, display: "block" }} />
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", overflow: "hidden" }}>
                  <button onClick={() => setMostrarTabla((v) => !v)}
                    className="w-full flex items-center justify-between hover:bg-[#1A1A2E] transition-colors"
                    style={{ padding: "14px 16px", borderBottom: mostrarTabla ? "0.5px solid #1E2030" : "none", background: "transparent", cursor: "pointer", border: "none" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Tabla de amortización ({plazo} cuotas)</span>
                    <span style={{ fontSize: "11px", color: "#F5F5F5" }}>{mostrarTabla ? "▲" : "▼"}</span>
                  </button>
                  {mostrarTabla && (
                    <div style={{ overflowX: "auto", maxHeight: "260px", overflowY: "auto" }}>
                      <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ background: "#0A0B10", position: "sticky", top: 0 }}>
                            {["Mes", "Cuota", "Interés", "Capital", "Saldo"].map((h, i) => (
                              <th key={h} style={{ padding: "9px 12px", textAlign: i === 0 ? "left" : "right", fontWeight: 600, color: "#EEEEEE", borderBottom: "0.5px solid #1E2030" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {resultado.tabla.map((row) => (
                            <tr key={row.mes} style={{ borderBottom: "0.5px solid #1A1A2A" }}>
                              <td style={{ padding: "8px 12px", color: "#EEEEEE" }}>{row.mes}</td>
                              <td style={{ padding: "8px 12px", textAlign: "right", color: "#FFFFFF" }}>${fmt(row.cuota)}</td>
                              <td style={{ padding: "8px 12px", textAlign: "right", color: "#E07070" }}>${fmt(row.interes)}</td>
                              <td style={{ padding: "8px 12px", textAlign: "right", color: NICHO.light }}>${fmt(row.capital)}</td>
                              <td style={{ padding: "8px 12px", textAlign: "right", color: "#EEEEEE" }}>${fmt(row.saldo)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa los valores y presiona Calcular</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Qué es el simulador de préstamo y cómo usarlo
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El simulador de préstamo te permite calcular exactamente cuánto pagarás cada mes por un crédito y cuánto costará en total. Usa el sistema de amortización francés, el más extendido en bancos y financieras de toda Latinoamérica: una cuota mensual fija que incluye una parte de capital y una parte de intereses.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Con esta herramienta puedes comparar distintas ofertas de crédito antes de firmar cualquier contrato. Basta con cambiar la tasa o el plazo para ver al instante cómo cambia tu cuota mensual y el costo total del préstamo.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Es útil para préstamos personales, créditos de nómina, financiamiento de auto, hipotecas y cualquier tipo de crédito con cuota fija. La tabla de amortización completa te muestra mes a mes cómo se reduce tu deuda.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico: el costo de alargar el plazo</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Un préstamo de <strong style={{ color: "#FFFFFF" }}>$80,000 MXN</strong> al <strong style={{ color: "#FFFFFF" }}>18% anual</strong> cambia drásticamente según el plazo que elijas:
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0F1117" }}>
                    {["Plazo", "Cuota mensual", "Total pagado", "Total intereses"].map((h, i) => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: i === 0 ? "left" : "right", fontWeight: 600, color: i === 3 ? "#E07070" : "#EEEEEE", borderBottom: "0.5px solid #1E2030" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["12 meses", "$7,333", "$87,996", "$7,996"],
                    ["24 meses", "$3,999", "$95,976", "$15,976"],
                    ["48 meses", "$2,351", "$112,848", "$32,848"],
                  ].map(([plazo, cuota, total, intereses]) => (
                    <tr key={plazo} style={{ borderBottom: "0.5px solid #1A1A2A" }}>
                      <td style={{ padding: "9px 12px", color: "#EEEEEE" }}>{plazo}</td>
                      <td style={{ padding: "9px 12px", textAlign: "right", fontWeight: 600, color: "#FFFFFF" }}>{cuota}</td>
                      <td style={{ padding: "9px 12px", textAlign: "right", color: "#EEEEEE" }}>{total}</td>
                      <td style={{ padding: "9px 12px", textAlign: "right", color: "#E07070" }}>{intereses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "11px", color: "#F5F5F5", marginTop: "12px" }}>
              Extender el plazo de 12 a 48 meses reduce la cuota mensual a menos de la mitad, pero cuadruplica los intereses totales pagados.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Qué es el sistema francés de amortización?", a: "Es el sistema de cuota fija más usado en el mundo. Cada mes pagas la misma cantidad, pero la proporción cambia: al inicio pagas más intereses y menos capital; al final, casi todo es capital. Esto se debe a que los intereses se calculan sobre el saldo pendiente, que disminuye con cada pago. Si quieres adelantar pagos, hazlo al inicio del crédito cuando el impacto en los intereses es mayor." },
                { q: "¿Puedo usar esta calculadora para una hipoteca?", a: "Sí. Ingresa el monto del crédito hipotecario, la tasa anual que te ofrece el banco y el plazo en meses (por ejemplo, 240 meses para 20 años, o 360 meses para 30 años). Ten en cuenta que las hipotecas pueden tener costos adicionales como seguros, comisiones y gastos notariales que esta calculadora no incluye, pero te da una base sólida para comparar opciones." },
                { q: "¿Cómo afecta la tasa al costo total de mi préstamo?", a: "La tasa de interés tiene un impacto enorme, especialmente a plazos largos. En un préstamo de $100,000 a 36 meses, pasar del 12% al 18% anual aumenta los intereses totales en más de $9,000. Antes de aceptar un crédito, siempre pregunta la Tasa Anual Efectiva (TAE o CAT en México), que incluye comisiones y costos adicionales además de la tasa nominal." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#1A1A2E", border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Explora otras herramientas financieras</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Todo lo que necesitas para tomar mejores decisiones con tu dinero.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-interes-compuesto", label: "Interés compuesto", desc: "Proyecta el crecimiento de tus ahorros" },
                { href: "/convertidor-monedas", label: "Convertidor de monedas", desc: "20 monedas latinoamericanas y mundiales" },
                { href: "/calculadora-jubilacion", label: "Calculadora de jubilación", desc: "¿Cuánto necesitas para retirarte?" },
                { href: "/calculadora-roi", label: "Calculadora de ROI", desc: "Mide la rentabilidad de tu inversión" },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href}
                  className="hover:!bg-[#1E1A3A] transition-colors"
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
