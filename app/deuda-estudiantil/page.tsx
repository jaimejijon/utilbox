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
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmt0(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

interface FilaAmortizacion {
  mes: number;
  cuota: number;
  interes: number;
  capital: number;
  saldo: number;
}

export default function DeudaEstudiantil() {
  const [monto, setMonto] = useState("20000");
  const [tasa, setTasa] = useState("8");
  const [plazo, setPlazo] = useState("10");
  const [gracia, setGracia] = useState("6");
  const [resultado, setResultado] = useState<{
    cuotaMensual: number;
    totalPagado: number;
    totalIntereses: number;
    tabla: FilaAmortizacion[];
    montoDespuesGracia: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const p = parseFloat(monto) || 0;
    const tasaAnual = (parseFloat(tasa) || 0) / 100;
    const anos = parseFloat(plazo) || 1;
    const mesesGracia = parseFloat(gracia) || 0;
    if (p <= 0 || tasaAnual < 0 || anos <= 0) return;

    const tasaMensual = tasaAnual / 12;
    const montoDespuesGracia = mesesGracia > 0 ? p * Math.pow(1 + tasaMensual, mesesGracia) : p;
    const n = anos * 12;
    const cuotaMensual = tasaMensual > 0
      ? montoDespuesGracia * tasaMensual * Math.pow(1 + tasaMensual, n) / (Math.pow(1 + tasaMensual, n) - 1)
      : montoDespuesGracia / n;

    const totalPagado = cuotaMensual * n;
    const totalIntereses = totalPagado - montoDespuesGracia;

    const tabla: FilaAmortizacion[] = [];
    let saldo = montoDespuesGracia;
    for (let mes = 1; mes <= Math.min(12, n); mes++) {
      const interes = saldo * tasaMensual;
      const capital = cuotaMensual - interes;
      saldo -= capital;
      tabla.push({ mes, cuota: cuotaMensual, interes, capital, saldo: Math.max(0, saldo) });
    }

    setResultado({ cuotaMensual, totalPagado, totalIntereses, tabla, montoDespuesGracia });
  }, [monto, tasa, plazo, gracia]);

  return (
    <>
      <ToolSchema
        name="Calculadora de deuda estudiantil"
        description="Calcula la cuota mensual, total de intereses y tabla de amortización de tu préstamo estudiantil. Para ICETEX, crédito educativo en Colombia, México, Chile, Bolivia y más."
        url="https://utilbox.lat/deuda-estudiantil"
        category="Educación"
        faqItems={[
          { q: "¿Conviene pagar más de la cuota mensual?", a: "Sí, realizar abonos extraordinarios al capital reduce el saldo pendiente y, por ende, los intereses futuros. Un pago extra anual equivalente a una cuota mensual puede reducir el plazo en 1-2 años y ahorrarte miles en intereses. Verifica que tu contrato no tenga penalidad por pago anticipado." },
          { q: "¿Qué pasa si no pago durante el período de gracia?", a: "Durante la gracia no pagas cuotas, pero el interés sigue corriendo y se suma al capital (capitalización). Si tienes 6 meses de gracia al 8% anual, tu deuda de $20,000 crece a aproximadamente $20,808. Eso significa que pagarás más intereses durante la vida del préstamo." },
          { q: "¿Cuál es una tasa de interés razonable para un crédito educativo?", a: "En América Latina, tasas entre 5% y 12% anual son comunes para crédito educativo formal. Tasas por encima del 15% son altas y deberías explorar otras fuentes. En EE.UU. los préstamos federales estudiantiles tienen tasas entre 5% y 8% aproximadamente. Siempre compara varias instituciones antes de comprometerte." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/educacion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Educación</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de deuda estudiantil</span>
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
              Calculadora de deuda estudiantil
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula tu cuota mensual, total de intereses y tabla de amortización de tu préstamo educativo.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="space-y-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Monto del préstamo</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>${fmt0(parseFloat(monto) || 0)}</span>
                  </div>
                  <input type="number" min="0" step="1000" value={monto} onChange={(e) => setMonto(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Tasa de interés anual</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{tasa}%</span>
                  </div>
                  <input type="number" min="0" max="50" step="0.5" value={tasa} onChange={(e) => setTasa(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Plazo de pago</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{plazo} años</span>
                  </div>
                  <input type="number" min="1" max="30" step="1" value={plazo} onChange={(e) => setPlazo(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Período de gracia (meses)</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{gracia} meses</span>
                  </div>
                  <input type="number" min="0" max="60" step="1" value={gracia} onChange={(e) => setGracia(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  <p style={{ fontSize: "10px", color: "#EEEEEE", marginTop: "4px" }}>Meses sin pagar (interés se capitaliza)</p>
                </div>
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular amortización
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Cuota mensual</p>
                  <p style={{ fontSize: "48px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    ${fmt(resultado.cuotaMensual)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Total pagado</p>
                    <p style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF" }}>${fmt0(resultado.totalPagado)}</p>
                  </div>
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Total intereses</p>
                    <p style={{ fontSize: "16px", fontWeight: 600, color: "#E07070" }}>${fmt0(resultado.totalIntereses)}</p>
                  </div>
                </div>

                {parseFloat(gracia) > 0 && (
                  <div style={{ background: "#D4B85A15", border: "0.5px solid #D4B85A40", borderRadius: "10px", padding: "12px 14px" }}>
                    <p style={{ fontSize: "12px", color: "#D4B85A", fontWeight: 600 }}>
                      Saldo tras período de gracia: ${fmt0(resultado.montoDespuesGracia)}
                    </p>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "2px" }}>El interés durante la gracia se capitaliza al capital.</p>
                  </div>
                )}

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px", overflowX: "auto" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Tabla de amortización (primeros 12 meses)</p>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
                    <thead>
                      <tr>
                        {["Mes", "Cuota", "Interés", "Capital", "Saldo"].map((h) => (
                          <th key={h} style={{ textAlign: "right", color: NICHO.color, fontWeight: 600, padding: "4px 8px", borderBottom: "0.5px solid #1E2030" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.tabla.map((fila) => (
                        <tr key={fila.mes} style={{ borderBottom: "0.5px solid #1E2030" }}>
                          <td style={{ textAlign: "right", color: "#EEEEEE", padding: "6px 8px" }}>{fila.mes}</td>
                          <td style={{ textAlign: "right", color: "#FFFFFF", padding: "6px 8px" }}>${fmt(fila.cuota)}</td>
                          <td style={{ textAlign: "right", color: "#E07070", padding: "6px 8px" }}>${fmt(fila.interes)}</td>
                          <td style={{ textAlign: "right", color: "#6EC9A0", padding: "6px 8px" }}>${fmt(fila.capital)}</td>
                          <td style={{ textAlign: "right", color: "#EEEEEE", padding: "6px 8px" }}>${fmt0(fila.saldo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa los datos y presiona Calcular amortización</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo funciona la amortización de un préstamo estudiantil
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Un préstamo estudiantil se paga mediante cuotas mensuales fijas que incluyen dos componentes: el pago de intereses sobre el saldo pendiente y la amortización del capital. Al inicio del préstamo, la mayor parte de la cuota se destina a intereses; conforme avanza el tiempo, una mayor proporción va al capital.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El período de gracia es un tiempo otorgado por algunas instituciones durante el cual no debes hacer pagos (generalmente mientras estudias o justo después de graduarte). Sin embargo, durante este período el interés sigue acumulándose y se capitaliza, lo que aumenta el saldo sobre el que calcularás las cuotas posteriores.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              La fórmula de cuota fija (sistema francés) garantiza que siempre pagas el mismo monto mensual. El total de intereses pagados depende de la tasa y el plazo: a mayor plazo, mayor interés total aunque menor cuota mensual.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Préstamo de $20,000 al 8% anual, plazo 10 años, 6 meses de gracia:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Cuota mensual", value: "$254/mes", sub: "Sistema francés" },
                { label: "Total pagado", value: "$30,480", sub: "En 10 años" },
                { label: "Total intereses", value: "$10,480+", sub: "Costo del crédito" },
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
                { q: "¿Conviene pagar más de la cuota mensual?", a: "Sí, realizar abonos extraordinarios al capital reduce el saldo pendiente y, por ende, los intereses futuros. Un pago extra anual equivalente a una cuota mensual puede reducir el plazo en 1-2 años y ahorrarte miles en intereses. Verifica que tu contrato no tenga penalidad por pago anticipado." },
                { q: "¿Qué pasa si no pago durante el período de gracia?", a: "Durante la gracia no pagas cuotas, pero el interés sigue corriendo y se suma al capital (capitalización). Si tienes 6 meses de gracia al 8% anual, tu deuda de $20,000 crece a aproximadamente $20,808. Eso significa que pagarás más intereses durante la vida del préstamo." },
                { q: "¿Cuál es una tasa de interés razonable para un crédito educativo?", a: "En América Latina, tasas entre 5% y 12% anual son comunes para crédito educativo formal. Tasas por encima del 15% son altas y deberías explorar otras fuentes. En EE.UU. los préstamos federales estudiantiles tienen tasas entre 5% y 8% aproximadamente. Siempre compara varias instituciones antes de comprometerte." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Planifica tu financiamiento educativo.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/simulador-beca", label: "Simulador de beca", desc: "Reduce tu deuda con becas" },
                { href: "/costo-carrera", label: "Costo total de carrera", desc: "Calcula cuánto necesitas" },
                { href: "/roi-posgrado", label: "ROI de un posgrado", desc: "¿Vale la pena el crédito?" },
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
