"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#74AEDD", light: "#9DC4E8", bg: "#152638", tint: "#0E1318", border: "rgba(116,174,221,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

interface NotaParcial {
  id: number;
  nombre: string;
  nota: string;
  porcentaje: string;
}

export default function NotaMinimaAprobar() {
  const [parciales, setParciales] = useState<NotaParcial[]>([
    { id: 1, nombre: "Primer parcial", nota: "7.5", porcentaje: "30" },
    { id: 2, nombre: "Segundo parcial", nota: "6.0", porcentaje: "30" },
  ]);
  const [porcentajeFinal, setPorcentajeFinal] = useState("40");
  const [notaMinima, setNotaMinima] = useState("6");
  const [escalaMax, setEscalaMax] = useState("10");
  const [resultado, setResultado] = useState<{
    notaNecesaria: number;
    acumulado: number;
    posible: boolean;
    yaAprobado: boolean;
    estado: string;
    color: string;
  } | null>(null);

  const agregar = () => {
    setParciales(prev => [...prev, { id: Date.now(), nombre: `Parcial ${prev.length + 1}`, nota: "", porcentaje: "" }]);
  };

  const eliminar = (id: number) => {
    setParciales(prev => prev.filter(p => p.id !== id));
  };

  const actualizar = (id: number, campo: keyof NotaParcial, valor: string) => {
    setParciales(prev => prev.map(p => p.id === id ? { ...p, [campo]: valor } : p));
  };

  const calcular = useCallback(() => {
    const min = parseFloat(notaMinima) || 6;
    const maxEsc = parseFloat(escalaMax) || 10;
    const pFinal = parseFloat(porcentajeFinal) || 0;
    const validos = parciales.filter(p => p.nota && p.porcentaje);
    const totalParciales = validos.reduce((s, p) => s + parseFloat(p.porcentaje), 0);
    const acumulado = validos.reduce((s, p) => s + parseFloat(p.nota) * (parseFloat(p.porcentaje) / 100), 0);
    const totalPorcentaje = totalParciales + pFinal;

    if (pFinal <= 0 || totalPorcentaje > 100.5) return;

    const notaNecesaria = (min - acumulado) / (pFinal / 100);
    const posible = notaNecesaria <= maxEsc;
    const yaAprobado = acumulado >= min && pFinal === 0;
    const yaAprobadoSinFinal = acumulado + maxEsc * (pFinal / 100) >= min && notaNecesaria <= 0;

    let estado = "";
    let color = "";
    if (yaAprobadoSinFinal && notaNecesaria <= 0) {
      estado = "Ya aprobaste sin el final";
      color = "#6EC9A0";
    } else if (!posible) {
      estado = "Imposible aprobar";
      color = "#E07070";
    } else if (notaNecesaria > maxEsc * 0.9) {
      estado = "Muy difícil, pero posible";
      color = "#D4B85A";
    } else {
      estado = "Alcanzable";
      color = NICHO.color;
    }

    setResultado({ notaNecesaria, acumulado, posible: posible || notaNecesaria <= 0, yaAprobado: notaNecesaria <= 0, estado, color });
  }, [parciales, porcentajeFinal, notaMinima, escalaMax]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/educacion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Educación</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Nota mínima para aprobar</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: inputs */}
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Notas</span>
            </div>

            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Nota mínima para aprobar
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Ingresa tus calificaciones parciales y su peso porcentual para saber qué nota necesitas en el examen final.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Nota mínima</label>
                  <input type="number" value={notaMinima} onChange={(e) => setNotaMinima(e.target.value)}
                    className={inputClass} style={{ ...inputStyle }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Nota máxima</label>
                  <select value={escalaMax} onChange={(e) => setEscalaMax(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="4">4 (GPA)</option>
                    <option value="100">100%</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>% que vale el examen final</label>
                <input type="number" min="0" max="100" placeholder="40" value={porcentajeFinal} onChange={(e) => setPorcentajeFinal(e.target.value)}
                  className={inputClass} style={{ ...inputStyle }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>

              <div style={{ height: "0.5px", background: "#1E2030", margin: "16px 0" }} />
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#EEEEEE", marginBottom: "10px" }}>Notas parciales</p>

              <div className="space-y-3">
                {parciales.map((p) => (
                  <div key={p.id} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px" }}>
                    <div className="flex items-center justify-between mb-2">
                      <input placeholder="Nombre" value={p.nombre} onChange={(e) => actualizar(p.id, "nombre", e.target.value)}
                        style={{ background: "transparent", border: "none", color: NICHO.light, fontSize: "11px", fontWeight: 600, outline: "none", width: "100%" }} />
                      {parciales.length > 1 && (
                        <button onClick={() => eliminar(p.id)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "14px", flexShrink: 0 }}>×</button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="number" placeholder="Nota" value={p.nota} onChange={(e) => actualizar(p.id, "nota", e.target.value)}
                        className={inputClass} style={{ ...inputStyle }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                      <div style={{ position: "relative" }}>
                        <input type="number" placeholder="%" value={p.porcentaje} onChange={(e) => actualizar(p.id, "porcentaje", e.target.value)}
                          className={inputClass} style={{ ...inputStyle }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={agregar} className="w-full mt-3 rounded-lg py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: "transparent", color: NICHO.color, border: `0.5px solid ${NICHO.color}`, cursor: "pointer" }}>
                + Agregar parcial
              </button>

              <button onClick={calcular} className="w-full mt-3 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular nota necesaria
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Nota necesaria en el final</p>
                  <p style={{ fontSize: "52px", fontWeight: 600, color: resultado.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    {resultado.yaAprobado ? "✓" : resultado.posible ? resultado.notaNecesaria.toFixed(2) : "✗"}
                  </p>
                  <span style={{ display: "inline-block", marginTop: "8px", background: resultado.color + "22", border: `0.5px solid ${resultado.color}44`, borderRadius: "999px", padding: "3px 12px", fontSize: "12px", fontWeight: 600, color: resultado.color }}>
                    {resultado.estado}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Acumulado actual</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: NICHO.light }}>{resultado.acumulado.toFixed(2)}</p>
                  </div>
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Para aprobar necesitas</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: resultado.color }}>{resultado.posible ? `≥ ${resultado.notaNecesaria.toFixed(2)}` : "Imposible"}</p>
                  </div>
                </div>

                {!resultado.posible && (
                  <div style={{ background: "#E0707015", border: "0.5px solid #E0707040", borderRadius: "10px", padding: "16px" }}>
                    <p style={{ fontSize: "13px", color: "#E07070", fontWeight: 600, marginBottom: "4px" }}>No es posible aprobar</p>
                    <p style={{ fontSize: "12px", color: "#EEEEEE", lineHeight: "1.65" }}>
                      Incluso con la nota máxima en el examen final, no alcanzarás la nota mínima de aprobación. Considera hablar con tu profesor sobre opciones de recuperación.
                    </p>
                  </div>
                )}

                {resultado.yaAprobado && (
                  <div style={{ background: "#6EC9A015", border: "0.5px solid #6EC9A040", borderRadius: "10px", padding: "16px" }}>
                    <p style={{ fontSize: "13px", color: "#6EC9A0", fontWeight: 600, marginBottom: "4px" }}>¡Ya aprobaste!</p>
                    <p style={{ fontSize: "12px", color: "#EEEEEE", lineHeight: "1.65" }}>
                      Tu acumulado ya supera la nota mínima. Cualquier nota en el examen final te dejará aprobado. ¡Sigue así!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus notas parciales y presiona Calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo calcular la nota mínima para pasar un examen final
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La fórmula para calcular la nota mínima en el examen final es sencilla: (Nota mínima de aprobación − Suma ponderada de parciales) ÷ (Porcentaje del final / 100). Esta ecuación te dice exactamente qué puntuación necesitas para alcanzar la nota de corte establecida por tu institución.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Hay dos casos especiales importantes. Si el resultado es negativo o cero, significa que ya aprobaste independientemente del final. Si el resultado supera la nota máxima de la escala, es matemáticamente imposible aprobar con el final, y deberías explorar alternativas como exámenes de recuperación o habilitaciones.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Esta herramienta funciona para cualquier distribución porcentual de notas, siempre que la suma de todos los porcentajes sea 100%. También permite agregar múltiples parciales, trabajos o evaluaciones con diferentes pesos.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Estudiante con Parcial 1: 6.5 (30%), Parcial 2: 7.0 (30%), Final vale 40%, nota mínima: 6.0:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Acumulado actual", value: "4.05 pts", sub: "Del 60% cursado" },
                { label: "Nota necesaria", value: "4.88", sub: "En el examen final" },
                { label: "Estado", value: "Alcanzable", sub: "¡Puedes lograrlo!" },
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
                { q: "¿Qué pasa si mis porcentajes no suman 100%?", a: "La calculadora necesita que el total de porcentajes sume exactamente 100% para dar un resultado preciso. Si tienes trabajos, quices u otras evaluaciones, inclúyelos también con su porcentaje correspondiente antes de calcular." },
                { q: "¿Puedo usarla si mi nota mínima es diferente a 6?", a: "Sí, puedes ingresar cualquier nota mínima de aprobación. Algunas universidades exigen 5.5, 7 o incluso 70% según la escala. La herramienta se adapta a cualquier nota de corte que ingreses." },
                { q: "¿Qué es una nota de habilitación?", a: "En algunos sistemas educativos, cuando el acumulado está cerca del límite pero no llega a aprobar, se puede obtener el derecho a un examen de habilitación o recuperación. Este examen reemplaza parcialmente el puntaje para darte una segunda oportunidad de aprobar." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Más herramientas para tu éxito académico.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/promedio-ponderado", label: "Promedio ponderado", desc: "Calcula tu promedio por créditos" },
                { href: "/conversor-calificaciones", label: "Conversor de calificaciones", desc: "Convierte entre escalas" },
                { href: "/tiempo-estudio", label: "Tiempo de estudio", desc: "Organiza tus horas de estudio" },
                { href: "/productividad-academica", label: "Productividad académica", desc: "Mide tu rendimiento" },
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
