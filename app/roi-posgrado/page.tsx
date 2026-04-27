"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#74AEDD", light: "#9DC4E8", bg: "#152638", tint: "#0E1318", border: "rgba(116,174,221,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function RoiPosgrado() {
  const [salarioActual, setSalarioActual] = useState("2500");
  const [salarioEsperado, setSalarioEsperado] = useState("4000");
  const [costoPosgrado, setCostoPosgrado] = useState("20000");
  const [duracion, setDuracion] = useState("2");
  const [resultado, setResultado] = useState<{
    incrementoAnual: number;
    roiPct: number;
    payback: number;
    ganancia5: number;
    ganancia10: number;
    ganancia20: number;
    esRentable: boolean;
    salarioPerdido: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const sa = parseFloat(salarioActual) || 0;
    const se = parseFloat(salarioEsperado) || 0;
    const cp = parseFloat(costoPosgrado) || 0;
    const dur = parseFloat(duracion) || 1;
    if (sa <= 0 || se <= 0 || cp <= 0) return;

    const incrementoMensual = se - sa;
    const incrementoAnual = incrementoMensual * 12;
    const salarioPerdido = sa * 12 * dur;
    const inversionTotal = cp + salarioPerdido;
    const roiPct = inversionTotal > 0 ? (incrementoAnual / inversionTotal) * 100 : 0;
    const payback = incrementoAnual > 0 ? inversionTotal / incrementoAnual : Infinity;
    const ganancia5 = incrementoAnual * 5 - inversionTotal;
    const ganancia10 = incrementoAnual * 10 - inversionTotal;
    const ganancia20 = incrementoAnual * 20 - inversionTotal;

    setResultado({ incrementoAnual, roiPct, payback, ganancia5, ganancia10, ganancia20, esRentable: ganancia10 > 0, salarioPerdido });
  }, [salarioActual, salarioEsperado, costoPosgrado, duracion]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/educacion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Educación</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>ROI de un posgrado</span>
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
              ROI de un posgrado
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula si vale la pena económicamente invertir en un máster o doctorado según tu situación salarial.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="space-y-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Salario mensual actual</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>${fmt(parseFloat(salarioActual) || 0)}</span>
                  </div>
                  <input type="number" min="0" step="100" value={salarioActual} onChange={(e) => setSalarioActual(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Salario esperado con posgrado</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>${fmt(parseFloat(salarioEsperado) || 0)}</span>
                  </div>
                  <input type="number" min="0" step="100" value={salarioEsperado} onChange={(e) => setSalarioEsperado(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Costo total del posgrado</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>${fmt(parseFloat(costoPosgrado) || 0)}</span>
                  </div>
                  <input type="number" min="0" step="1000" value={costoPosgrado} onChange={(e) => setCostoPosgrado(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Duración del posgrado</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{duracion} años</span>
                  </div>
                  <input type="number" min="1" max="10" step="1" value={duracion} onChange={(e) => setDuracion(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular ROI
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>ROI del posgrado</p>
                  <p style={{ fontSize: "52px", fontWeight: 600, color: resultado.esRentable ? "#6EC9A0" : "#E07070", letterSpacing: "-2px", lineHeight: 1 }}>
                    {resultado.roiPct.toFixed(1)}%
                  </p>
                  <span style={{ display: "inline-block", marginTop: "8px", background: (resultado.esRentable ? "#6EC9A0" : "#E07070") + "22", border: `0.5px solid ${resultado.esRentable ? "#6EC9A0" : "#E07070"}44`, borderRadius: "999px", padding: "3px 12px", fontSize: "12px", fontWeight: 600, color: resultado.esRentable ? "#6EC9A0" : "#E07070" }}>
                    {resultado.esRentable ? "Financieramente rentable" : "Considera cuidadosamente"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Tiempo de recuperación</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: NICHO.light }}>{resultado.payback < 100 ? resultado.payback.toFixed(1) + " años" : "> 100 años"}</p>
                  </div>
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Incremento anual</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "#6EC9A0" }}>${fmt(resultado.incrementoAnual)}</p>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "12px" }}>Ganancia acumulada proyectada</p>
                  <div className="space-y-3">
                    {[
                      { label: "A 5 años", value: resultado.ganancia5 },
                      { label: "A 10 años", value: resultado.ganancia10 },
                      { label: "A 20 años", value: resultado.ganancia20 },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#0F1117", borderRadius: "8px" }}>
                        <span style={{ fontSize: "13px", color: "#FFFFFF" }}>{item.label}</span>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: item.value >= 0 ? "#6EC9A0" : "#E07070" }}>
                          {item.value >= 0 ? "+" : ""}${fmt(item.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "10px" }}>
                    Incluye salario no percibido durante el posgrado: ${fmt(resultado.salarioPerdido)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa los datos y presiona Calcular ROI</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo calcular si vale la pena económicamente hacer un posgrado
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El ROI (Retorno sobre la Inversión) de un posgrado mide cuánto ganas en términos económicos respecto a lo que inviertes. La inversión total incluye no solo el costo del programa, sino también el salario que dejas de percibir mientras estudias, conocido como costo de oportunidad.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La fórmula es: ROI = (Incremento salarial anual / Inversión total) × 100. Si tu posgrado cuesta $20,000, dejas de ganar $30,000 en 2 años de estudio, y tu salario sube $15,000 anuales, tu ROI es del 30% anual, lo que significa que recuperas la inversión en poco más de 3 años.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              No todo el valor de un posgrado es económico. El acceso a redes profesionales, cambio de industria, satisfacción personal o requisito para ejercer en ciertos países son factores que esta calculadora no cuantifica, pero que son igualmente válidos al tomar la decisión.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Ingeniero con salario $2,500/mes, máster de 2 años en $20,000, salario esperado $4,000/mes:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Inversión total", value: "$80,000", sub: "Costo + oportunidad" },
                { label: "ROI estimado", value: "27%/año", sub: "Sobre inversión total" },
                { label: "Recuperación", value: "3.7 años", sub: "Tras graduarse" },
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
                { q: "¿Qué nivel de ROI hace rentable un posgrado?", a: "Un ROI mayor al 20% anual sobre la inversión total se considera bueno para educación. Si puedes recuperar la inversión en menos de 5 años, el posgrado es financieramente sólido. ROIs menores (5–15%) no son malos si hay otros beneficios como cambio de industria, acceso a mercados internacionales, o cumplimiento de requisitos legales para ejercer." },
                { q: "¿Por qué se incluye el salario no ganado?", a: "El costo de oportunidad es real: mientras estudias a tiempo completo, dejas de ganar ese ingreso. Una persona que gana $2,500/mes y estudia un máster de 2 años pierde $60,000 en ingresos, lo cual forma parte de la inversión total. Ignorar este factor sobreestima el ROI significativamente." },
                { q: "¿Es diferente el ROI de un doctorado vs un máster?", a: "Generalmente sí. Los doctorados tienen un costo de oportunidad mucho mayor (3–7 años) y el incremento salarial en el mercado privado puede no justificar la inversión comparado con un máster de 1–2 años. Sin embargo, para posiciones académicas o de investigación, el doctorado es requisito indispensable, lo que cambia el análisis." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Más herramientas para planificar tu educación.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/costo-carrera", label: "Costo total de carrera", desc: "Desglose completo de gastos" },
                { href: "/simulador-beca", label: "Simulador de beca", desc: "Escenarios de financiamiento" },
                { href: "/deuda-estudiantil", label: "Calculadora de deuda", desc: "Tabla de amortización" },
                { href: "/promedio-ponderado", label: "Promedio ponderado", desc: "Calcula tu GPA actual" },
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
