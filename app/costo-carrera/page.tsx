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

export default function CostoCarrera() {
  const [matricula, setMatricula] = useState("3000");
  const [semestres, setSemestres] = useState("8");
  const [materiales, setMateriales] = useState("200");
  const [transporte, setTransporte] = useState("150");
  const [alimentacion, setAlimentacion] = useState("300");
  const [arriendo, setArriendo] = useState("0");
  const [resultado, setResultado] = useState<{
    totalMatricula: number;
    totalMateriales: number;
    totalTransporte: number;
    totalAlimentacion: number;
    totalArriendo: number;
    costoTotal: number;
    costoMensual: number;
    mesesDuracion: number;
    conFinanciamiento: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const m = parseFloat(matricula) || 0;
    const sem = parseFloat(semestres) || 1;
    const mat = parseFloat(materiales) || 0;
    const trans = parseFloat(transporte) || 0;
    const alim = parseFloat(alimentacion) || 0;
    const arr = parseFloat(arriendo) || 0;

    const mesesDuracion = sem * 5;
    const totalMatricula = m * sem;
    const totalMateriales = mat * mesesDuracion;
    const totalTransporte = trans * mesesDuracion;
    const totalAlimentacion = alim * mesesDuracion;
    const totalArriendo = arr * mesesDuracion;
    const costoTotal = totalMatricula + totalMateriales + totalTransporte + totalAlimentacion + totalArriendo;
    const costoMensual = mesesDuracion > 0 ? costoTotal / mesesDuracion : 0;

    const tasaAnual = 0.08;
    const tasaMensual = tasaAnual / 12;
    const plazoMeses = 60;
    const conFinanciamiento = costoTotal * tasaMensual * Math.pow(1 + tasaMensual, plazoMeses) / (Math.pow(1 + tasaMensual, plazoMeses) - 1) * plazoMeses;

    setResultado({ totalMatricula, totalMateriales, totalTransporte, totalAlimentacion, totalArriendo, costoTotal, costoMensual, mesesDuracion, conFinanciamiento });
  }, [matricula, semestres, materiales, transporte, alimentacion, arriendo]);

  const categorias = resultado ? [
    { label: "Matrícula total", value: resultado.totalMatricula, color: NICHO.color },
    { label: "Materiales", value: resultado.totalMateriales, color: "#9DC4E8" },
    { label: "Transporte", value: resultado.totalTransporte, color: "#D4B85A" },
    { label: "Alimentación", value: resultado.totalAlimentacion, color: "#6EC9A0" },
    ...(resultado.totalArriendo > 0 ? [{ label: "Arriendo", value: resultado.totalArriendo, color: "#E07070" }] : []),
  ] : [];

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/educacion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Educación</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Costo total de carrera universitaria</span>
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
              Costo total de carrera universitaria
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula el costo real de tu carrera incluyendo matrícula, materiales y gastos de vida.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Matrícula por semestre</label>
                  </div>
                  <input type="number" min="0" step="100" value={matricula} onChange={(e) => setMatricula(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Número de semestres</label>
                  <input type="number" min="1" max="20" step="1" value={semestres} onChange={(e) => setSemestres(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>

              <div style={{ height: "0.5px", background: "#1E2030", margin: "16px 0" }} />
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#EEEEEE", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: "12px" }}>Gastos mensuales</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Materiales", value: materiales, setter: setMateriales },
                  { label: "Transporte", value: transporte, setter: setTransporte },
                  { label: "Alimentación", value: alimentacion, setter: setAlimentacion },
                  { label: "Arriendo (0 si vives en casa)", value: arriendo, setter: setArriendo },
                ].map((campo) => (
                  <div key={campo.label}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>{campo.label}</label>
                    <input type="number" min="0" step="10" value={campo.value} onChange={(e) => campo.setter(e.target.value)}
                      className={inputClass} style={{ ...inputStyle }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                ))}
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular costo total
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Costo total de la carrera</p>
                  <p style={{ fontSize: "40px", fontWeight: 600, color: NICHO.color, letterSpacing: "-1px", lineHeight: 1 }}>
                    ${fmt(resultado.costoTotal)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "6px" }}>{resultado.mesesDuracion} meses · ${fmt(resultado.costoMensual)}/mes promedio</p>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "12px" }}>Desglose por categoría</p>
                  <div className="space-y-3">
                    {categorias.map((cat) => (
                      <div key={cat.label}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontSize: "12px", color: "#FFFFFF" }}>{cat.label}</span>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: cat.color }}>${fmt(cat.value)}</span>
                        </div>
                        <div style={{ height: "5px", background: "#0F1117", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${resultado.costoTotal > 0 ? (cat.value / resultado.costoTotal * 100) : 0}%`, background: cat.color, borderRadius: "999px" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "12px" }}>Comparativa de financiamiento</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div style={{ background: "#0F1117", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                      <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Sin financiamiento</p>
                      <p style={{ fontSize: "16px", fontWeight: 600, color: "#6EC9A0" }}>${fmt(resultado.costoTotal)}</p>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginTop: "2px" }}>Costo real</p>
                    </div>
                    <div style={{ background: "#0F1117", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                      <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Con crédito (8%, 5 años)</p>
                      <p style={{ fontSize: "16px", fontWeight: 600, color: "#E07070" }}>${fmt(resultado.conFinanciamiento)}</p>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginTop: "2px" }}>+${fmt(resultado.conFinanciamiento - resultado.costoTotal)} de intereses</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa los datos y presiona Calcular costo total</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cuánto cuesta realmente una carrera universitaria
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El costo de una carrera universitaria va mucho más allá de la matrícula. Los gastos en materiales, transporte, alimentación y, en muchos casos, arriendo, pueden representar entre el 60% y el 80% del costo total. Ignorar estos rubros lleva a una planificación financiera deficiente y a sorpresas desagradables durante la carrera.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              En América Latina, el costo promedio de una carrera en universidad pública oscila entre $5,000 y $20,000 en total, mientras que en universidades privadas puede llegar a $50,000–$120,000 o más, dependiendo del país y la carrera. Las carreras de ingeniería, medicina y derecho tienden a ser las más costosas por su duración y equipamiento.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Esta herramienta calcula el costo real asumiendo 5 meses de actividad por semestre. Si tu institución tiene calendarios diferentes, ajusta el número de semestres o los gastos mensuales según tu situación.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Ingeniería, 8 semestres, matrícula $3,000/sem, materiales $200/mes, transporte $150/mes, alimentación $300/mes:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Solo matrícula", value: "$24,000", sub: "8 semestres" },
                { label: "Gastos de vida", value: "$26,000", sub: "40 meses" },
                { label: "Costo total", value: "$50,000", sub: "Real estimado" },
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
                { q: "¿Incluye el costo de libros y materiales digitales?", a: "Sí, el campo de 'materiales' incluye libros, impresiones, licencias de software y cualquier material de estudio. En carreras técnicas o de salud este rubro puede ser significativo (USD 100–500 por semestre dependiendo de la carrera y país)." },
                { q: "¿Por qué el costo con financiamiento es mayor?", a: "Cuando pides un crédito educativo pagas intereses sobre el capital prestado. A una tasa del 8% anual y plazo de 5 años, los intereses pueden sumar entre el 20% y 30% del capital original. Por eso siempre es mejor ahorrar o conseguir beca primero, y usar el crédito solo para el monto imprescindible." },
                { q: "¿Cómo puedo reducir el costo de mi carrera?", a: "Las principales estrategias son: aplicar a becas desde el primer semestre, vivir con familia en lugar de arrendar, comprar materiales de segunda mano, usar bibliotecas universitarias, y tomar la carrera en universidad pública si la calidad es similar. También puedes trabajar part-time durante la carrera, aunque esto puede afectar tu rendimiento académico." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Planifica tu inversión educativa inteligentemente.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/simulador-beca", label: "Simulador de beca", desc: "Escenarios con 25–100% de beca" },
                { href: "/deuda-estudiantil", label: "Calculadora de deuda", desc: "Amortización de crédito educativo" },
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
