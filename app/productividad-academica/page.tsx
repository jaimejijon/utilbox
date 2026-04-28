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
  return n.toLocaleString("es-MX", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export default function ProductividadAcademica() {
  const [horasEstudiadas, setHorasEstudiadas] = useState("18");
  const [horasPlanificadas, setHorasPlanificadas] = useState("25");
  const [tareasCompletadas, setTareasCompletadas] = useState("7");
  const [tareasAsignadas, setTareasAsignadas] = useState("10");
  const [promedioActual, setPromedioActual] = useState("7.8");
  const [promedioObjetivo, setPromedioObjetivo] = useState("8.5");
  const [resultado, setResultado] = useState<{
    indice: number;
    nivel: string;
    color: string;
    eficienciaHoras: number;
    eficienciaTareas: number;
    avancePromedio: number;
    fortalezas: string[];
    mejoras: string[];
    recomendaciones: string[];
  } | null>(null);

  const calcular = useCallback(() => {
    const hE = parseFloat(horasEstudiadas) || 0;
    const hP = parseFloat(horasPlanificadas) || 1;
    const tC = parseFloat(tareasCompletadas) || 0;
    const tA = parseFloat(tareasAsignadas) || 1;
    const pA = parseFloat(promedioActual) || 0;
    const pO = parseFloat(promedioObjetivo) || 1;

    const eficienciaHoras = Math.min((hE / hP) * 100, 100);
    const eficienciaTareas = Math.min((tC / tA) * 100, 100);
    const avancePromedio = Math.min((pA / pO) * 100, 100);

    const indice = Math.round(eficienciaHoras * 0.35 + eficienciaTareas * 0.35 + avancePromedio * 0.30);

    let nivel = "";
    let color = "";
    if (indice >= 85) { nivel = "Excelente"; color = "#6EC9A0"; }
    else if (indice >= 70) { nivel = "Bueno"; color = NICHO.color; }
    else if (indice >= 55) { nivel = "Regular"; color = "#D4B85A"; }
    else { nivel = "Necesita mejora"; color = "#E07070"; }

    const fortalezas: string[] = [];
    const mejoras: string[] = [];

    if (eficienciaHoras >= 80) fortalezas.push("Cumples bien tu plan de horas de estudio");
    else mejoras.push("Estás estudiando menos horas de las planificadas");

    if (eficienciaTareas >= 80) fortalezas.push("Completas la mayoría de las tareas asignadas");
    else mejoras.push("Tienes tareas pendientes sin completar");

    if (avancePromedio >= 90) fortalezas.push("Tu promedio está cerca del objetivo");
    else if (avancePromedio >= 70) fortalezas.push("Tu promedio avanza bien hacia el objetivo");
    else mejoras.push("Tu promedio aún está lejos del objetivo");

    const recomendaciones: string[] = [];
    if (hE < hP * 0.7) recomendaciones.push("Revisa por qué no cumples tus horas planificadas. ¿Hay distractores o compromisos que eliminar?");
    if (tC < tA * 0.7) recomendaciones.push("Prioriza las tareas más importantes al inicio de la semana cuando tienes más energía.");
    if (pA < pO * 0.8) recomendaciones.push("Considera solicitar tutoría o formar grupos de estudio para las materias de menor rendimiento.");
    if (recomendaciones.length === 0) recomendaciones.push("¡Vas muy bien! Mantén la consistencia y verás resultados al final del semestre.");

    setResultado({ indice, nivel, color, eficienciaHoras, eficienciaTareas, avancePromedio, fortalezas, mejoras, recomendaciones });
  }, [horasEstudiadas, horasPlanificadas, tareasCompletadas, tareasAsignadas, promedioActual, promedioObjetivo]);

  return (
    <>
      <ToolSchema
        name="Calculadora de productividad académica"
        description="Mide tu índice de productividad académica (0-100): eficiencia de horas, tareas completadas y avance en promedio. Obtén recomendaciones personalizadas para mejorar tu rendimiento."
        url="https://utilbox.lat/productividad-academica"
        category="Educación"
        faqItems={[
          { q: "¿Qué índice de productividad se considera bueno?", a: "Un índice de 70-84 es bueno y refleja un estudiante consistente con margen de mejora. 85 o más es excelente y generalmente corresponde a los mejores promedios del grupo. Por debajo de 55 es una señal de que algo en tu dinámica de estudio necesita ajuste: quizás planificas demasiado, te falta concentración, o tienes compromisos que afectan tu disponibilidad." },
          { q: "¿Con qué frecuencia debo medir mi productividad?", a: "Semanalmente es lo ideal. Al final de cada semana, registra tus horas reales, tareas completadas y promedio actualizado. Esto te da retroalimentación oportuna para ajustar la siguiente semana antes de que sea demasiado tarde en el semestre." },
          { q: "¿Qué hago si mi índice es bajo varias semanas seguidas?", a: "Primero identifica qué dimensión tiene el peor desempeño: ¿no cumples horas, no completas tareas, o tu promedio no mejora? Cada problema tiene soluciones distintas. Para horas: elimina distractores y usa bloques de tiempo protegidos. Para tareas: usa técnicas de priorización. Para promedio: busca tutoría o cambia tu método de estudio activo." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/educacion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Educación</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de productividad académica</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: inputs */}
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Productividad</span>
            </div>

            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de productividad académica
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Mide tu rendimiento semanal y obtén recomendaciones personalizadas para mejorar.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#EEEEEE", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: "12px" }}>Esta semana</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Horas estudiadas</label>
                    <input type="number" min="0" max="80" step="0.5" value={horasEstudiadas} onChange={(e) => setHorasEstudiadas(e.target.value)}
                      className={inputClass} style={{ ...inputStyle }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Horas planificadas</label>
                    <input type="number" min="1" max="80" step="0.5" value={horasPlanificadas} onChange={(e) => setHorasPlanificadas(e.target.value)}
                      className={inputClass} style={{ ...inputStyle }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tareas completadas</label>
                    <input type="number" min="0" max="100" step="1" value={tareasCompletadas} onChange={(e) => setTareasCompletadas(e.target.value)}
                      className={inputClass} style={{ ...inputStyle }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tareas asignadas</label>
                    <input type="number" min="1" max="100" step="1" value={tareasAsignadas} onChange={(e) => setTareasAsignadas(e.target.value)}
                      className={inputClass} style={{ ...inputStyle }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                </div>

                <div style={{ height: "0.5px", background: "#1E2030" }} />
                <p style={{ fontSize: "11px", fontWeight: 600, color: "#EEEEEE", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Rendimiento</p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Promedio actual</label>
                    <input type="number" min="0" max="10" step="0.1" value={promedioActual} onChange={(e) => setPromedioActual(e.target.value)}
                      className={inputClass} style={{ ...inputStyle }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Promedio objetivo</label>
                    <input type="number" min="0" max="10" step="0.1" value={promedioObjetivo} onChange={(e) => setPromedioObjetivo(e.target.value)}
                      className={inputClass} style={{ ...inputStyle }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                </div>
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular productividad
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Índice de productividad</p>
                  <p style={{ fontSize: "64px", fontWeight: 600, color: resultado.color, letterSpacing: "-3px", lineHeight: 1 }}>
                    {resultado.indice}
                  </p>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "2px" }}>de 100 puntos</p>
                  <span style={{ display: "inline-block", marginTop: "8px", background: resultado.color + "22", border: `0.5px solid ${resultado.color}44`, borderRadius: "999px", padding: "3px 12px", fontSize: "12px", fontWeight: 600, color: resultado.color }}>
                    {resultado.nivel}
                  </span>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "12px" }}>Desglose de métricas</p>
                  {[
                    { label: "Eficiencia de horas", valor: resultado.eficienciaHoras, peso: "35%" },
                    { label: "Eficiencia de tareas", valor: resultado.eficienciaTareas, peso: "35%" },
                    { label: "Avance en promedio", valor: resultado.avancePromedio, peso: "30%" },
                  ].map((m) => (
                    <div key={m.label} style={{ marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ fontSize: "12px", color: "#FFFFFF" }}>{m.label}</span>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <span style={{ fontSize: "10px", color: "#EEEEEE" }}>peso: {m.peso}</span>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: NICHO.light }}>{fmt(m.valor)}%</span>
                        </div>
                      </div>
                      <div style={{ height: "6px", background: "#0F1117", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${m.valor}%`, background: m.valor >= 80 ? "#6EC9A0" : m.valor >= 60 ? NICHO.color : "#D4B85A", borderRadius: "999px" }} />
                      </div>
                    </div>
                  ))}
                </div>

                {resultado.fortalezas.length > 0 && (
                  <div style={{ background: "#6EC9A015", border: "0.5px solid #6EC9A040", borderRadius: "10px", padding: "14px 16px" }}>
                    <p style={{ fontSize: "12px", color: "#6EC9A0", fontWeight: 600, marginBottom: "6px" }}>Fortalezas</p>
                    {resultado.fortalezas.map(f => (
                      <p key={f} style={{ fontSize: "12px", color: "#EEEEEE", lineHeight: "1.5", marginBottom: "2px" }}>✓ {f}</p>
                    ))}
                  </div>
                )}

                {resultado.mejoras.length > 0 && (
                  <div style={{ background: "#D4B85A15", border: "0.5px solid #D4B85A40", borderRadius: "10px", padding: "14px 16px" }}>
                    <p style={{ fontSize: "12px", color: "#D4B85A", fontWeight: 600, marginBottom: "6px" }}>Áreas de mejora</p>
                    {resultado.mejoras.map(m => (
                      <p key={m} style={{ fontSize: "12px", color: "#EEEEEE", lineHeight: "1.5", marginBottom: "2px" }}>→ {m}</p>
                    ))}
                  </div>
                )}

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: NICHO.light, marginBottom: "8px" }}>Recomendaciones</p>
                  {resultado.recomendaciones.map((r, i) => (
                    <p key={i} style={{ fontSize: "12px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "6px" }}>{i + 1}. {r}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus datos semanales y presiona Calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo medir y mejorar tu productividad como estudiante
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La productividad académica no se mide solo por las horas que pasas estudiando, sino por la relación entre lo que planificas, lo que ejecutas y los resultados que obtienes. Un estudiante que estudia 10 horas efectivas puede rendir más que uno que "pasa" 20 horas frente a los libros sin concentración real.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El índice de productividad académica de esta herramienta combina tres dimensiones: la eficiencia de horas (qué tanto cumples tu plan de horas), la eficiencia de tareas (qué porcentaje de tareas completas) y el avance en promedio (qué tan cerca estás de tu objetivo). Cada dimensión tiene un peso específico que refleja su importancia relativa.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Usar esta herramienta semanalmente te permite detectar tendencias: si tu índice baja de forma consistente, es una señal de alerta antes de que los resultados académicos se vean afectados. Si sube, es evidencia de que tus ajustes están funcionando.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Estudiante que estudió 18h de 25 planificadas, completó 7/10 tareas, promedio actual 7.8 vs objetivo 8.5:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Eficiencia horas", value: "72%", sub: "Necesita mejorar" },
                { label: "Eficiencia tareas", value: "70%", sub: "Aceptable" },
                { label: "Índice global", value: "68", sub: "Regular" },
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
                { q: "¿Qué índice de productividad se considera bueno?", a: "Un índice de 70-84 es bueno y refleja un estudiante consistente con margen de mejora. 85 o más es excelente y generalmente corresponde a los mejores promedios del grupo. Por debajo de 55 es una señal de que algo en tu dinámica de estudio necesita ajuste: quizás planificas demasiado, te falta concentración, o tienes compromisos que afectan tu disponibilidad." },
                { q: "¿Con qué frecuencia debo medir mi productividad?", a: "Semanalmente es lo ideal. Al final de cada semana, registra tus horas reales, tareas completadas y promedio actualizado. Esto te da retroalimentación oportuna para ajustar la siguiente semana antes de que sea demasiado tarde en el semestre." },
                { q: "¿Qué hago si mi índice es bajo varias semanas seguidas?", a: "Primero identifica qué dimensión tiene el peor desempeño: ¿no cumples horas, no completas tareas, o tu promedio no mejora? Cada problema tiene soluciones distintas. Para horas: elimina distractores y usa bloques de tiempo protegidos. Para tareas: usa técnicas de priorización. Para promedio: busca tutoría o cambia tu método de estudio activo." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Herramientas para maximizar tu rendimiento académico.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/planificador-estudio", label: "Planificador semanal", desc: "Distribuye tus horas disponibles" },
                { href: "/tiempo-estudio", label: "Tiempo de estudio por materia", desc: "Horas según dificultad" },
                { href: "/promedio-ponderado", label: "Promedio ponderado", desc: "Calcula tu promedio académico" },
                { href: "/nota-minima-aprobar", label: "Nota mínima para aprobar", desc: "Qué necesitas en el final" },
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
