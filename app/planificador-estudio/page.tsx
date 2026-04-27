"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#74AEDD", light: "#9DC4E8", bg: "#152638", tint: "#0E1318", border: "rgba(116,174,221,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const DIAS_FULL = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

interface Materia {
  id: number;
  nombre: string;
  prioridad: "alta" | "media" | "baja";
  horasMin: string;
}

type HorasDia = { [key: string]: string };

const prioridadPeso = { alta: 3, media: 2, baja: 1 };
const prioridadColor = { alta: "#E07070", media: "#D4B85A", baja: "#6EC9A0" };

export default function PlanificadorEstudio() {
  const [materias, setMaterias] = useState<Materia[]>([
    { id: 1, nombre: "Cálculo", prioridad: "alta", horasMin: "8" },
    { id: 2, nombre: "Inglés", prioridad: "baja", horasMin: "3" },
    { id: 3, nombre: "Historia", prioridad: "media", horasMin: "5" },
  ]);
  const [horasDia, setHorasDia] = useState<HorasDia>({
    Lun: "3", Mar: "3", Mié: "2", Jue: "3", Vie: "2", Sáb: "4", Dom: "2",
  });
  const [resultado, setResultado] = useState<{
    plan: { dia: string; asignaciones: { nombre: string; horas: number; prioridad: string }[] }[];
    totalDisponible: number;
    totalNecesario: number;
    suficiente: boolean;
  } | null>(null);

  const agregar = () => {
    setMaterias(prev => [...prev, { id: Date.now(), nombre: "", prioridad: "media", horasMin: "" }]);
  };

  const eliminar = (id: number) => {
    setMaterias(prev => prev.filter(m => m.id !== id));
  };

  const actualizar = (id: number, campo: keyof Materia, valor: string) => {
    setMaterias(prev => prev.map(m => m.id === id ? { ...m, [campo]: valor } : m));
  };

  const calcular = useCallback(() => {
    const validas = materias.filter(m => m.nombre.trim() && m.horasMin);
    if (validas.length === 0) return;

    const totalDisponible = DIAS.reduce((s, d) => s + (parseFloat(horasDia[d]) || 0), 0);
    const totalNecesario = validas.reduce((s, m) => s + (parseFloat(m.horasMin) || 0), 0);

    const totalPeso = validas.reduce((s, m) => s + prioridadPeso[m.prioridad], 0);
    const asignaciones = validas.map(m => ({
      nombre: m.nombre,
      prioridad: m.prioridad,
      horasAsignadas: Math.min(parseFloat(m.horasMin) || 0, totalDisponible * prioridadPeso[m.prioridad] / totalPeso),
    }));

    const plan = DIAS.map((dia, i) => {
      const horasDiaNum = parseFloat(horasDia[dia]) || 0;
      const pct = horasDiaNum / totalDisponible;
      const asig = asignaciones.map(a => ({
        nombre: a.nombre,
        horas: Math.round(a.horasAsignadas * pct * 10) / 10,
        prioridad: a.prioridad,
      })).filter(a => a.horas > 0);
      return { dia: DIAS_FULL[i], asignaciones: asig };
    });

    setResultado({ plan, totalDisponible, totalNecesario, suficiente: totalDisponible >= totalNecesario });
  }, [materias, horasDia]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/educacion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Educación</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Planificador de horas de estudio</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: inputs */}
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Planificación</span>
            </div>

            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Planificador de horas de estudio
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Distribuye tus horas disponibles entre tus materias según su prioridad y genera un plan semanal.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#EEEEEE", marginBottom: "10px" }}>Horas disponibles por día</p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {DIAS.map(dia => (
                  <div key={dia}>
                    <label style={{ fontSize: "10px", color: "#EEEEEE", display: "block", marginBottom: "4px", textAlign: "center" }}>{dia}</label>
                    <input type="number" min="0" max="16" step="0.5" value={horasDia[dia]} onChange={(e) => setHorasDia(prev => ({ ...prev, [dia]: e.target.value }))}
                      className={inputClass} style={{ ...inputStyle, textAlign: "center", padding: "8px 4px" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                ))}
              </div>

              <div style={{ height: "0.5px", background: "#1E2030", margin: "16px 0" }} />
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#EEEEEE", marginBottom: "10px" }}>Materias y prioridad</p>

              <div className="space-y-3">
                {materias.map((m, i) => (
                  <div key={m.id} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px" }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontSize: "11px", color: NICHO.light, fontWeight: 600 }}>Materia {i + 1}</span>
                      {materias.length > 1 && (
                        <button onClick={() => eliminar(m.id)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "14px" }}>×</button>
                      )}
                    </div>
                    <input placeholder="Nombre de la materia" value={m.nombre} onChange={(e) => actualizar(m.id, "nombre", e.target.value)}
                      className={inputClass} style={{ ...inputStyle, marginBottom: "8px" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label style={{ fontSize: "10px", color: "#EEEEEE", display: "block", marginBottom: "4px" }}>Prioridad</label>
                        <select value={m.prioridad} onChange={(e) => actualizar(m.id, "prioridad", e.target.value as "alta" | "media" | "baja")}
                          style={{ background: "#141520", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "6px", padding: "8px", width: "100%", fontSize: "12px", cursor: "pointer", outline: "none" }}>
                          <option value="alta">Alta</option>
                          <option value="media">Media</option>
                          <option value="baja">Baja</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: "10px", color: "#EEEEEE", display: "block", marginBottom: "4px" }}>Horas mín/sem</label>
                        <input type="number" min="0" max="40" step="0.5" placeholder="5" value={m.horasMin} onChange={(e) => actualizar(m.id, "horasMin", e.target.value)}
                          className={inputClass} style={{ ...inputStyle, padding: "8px 10px" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={agregar} className="w-full mt-3 rounded-lg py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: "transparent", color: NICHO.color, border: `0.5px solid ${NICHO.color}`, cursor: "pointer" }}>
                + Agregar materia
              </button>

              <button onClick={calcular} className="w-full mt-3 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Generar plan semanal
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-4 text-center" style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Horas disponibles</p>
                    <p style={{ fontSize: "28px", fontWeight: 600, color: NICHO.color }}>{resultado.totalDisponible}h</p>
                  </div>
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Horas necesarias</p>
                    <p style={{ fontSize: "28px", fontWeight: 600, color: resultado.suficiente ? "#6EC9A0" : "#E07070" }}>{resultado.totalNecesario}h</p>
                  </div>
                </div>

                {!resultado.suficiente && (
                  <div style={{ background: "#E0707015", border: "0.5px solid #E0707040", borderRadius: "10px", padding: "12px 14px" }}>
                    <p style={{ fontSize: "12px", color: "#E07070", fontWeight: 600 }}>
                      Faltan {resultado.totalNecesario - resultado.totalDisponible}h. El plan ajusta la distribución proporcionalmente.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  {resultado.plan.filter(d => d.asignaciones.length > 0).map((dia) => (
                    <div key={dia.dia} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: NICHO.light, marginBottom: "8px" }}>{dia.dia}</p>
                      <div className="space-y-2">
                        {dia.asignaciones.map((a) => (
                          <div key={a.nombre} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: prioridadColor[a.prioridad as keyof typeof prioridadColor], flexShrink: 0 }} />
                              <span style={{ fontSize: "12px", color: "#FFFFFF" }}>{a.nombre}</span>
                            </div>
                            <span style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>{a.horas}h</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {(["alta", "media", "baja"] as const).map((p) => (
                    <span key={p} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#EEEEEE" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: prioridadColor[p] }} />
                      Prioridad {p}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Configura tus horas y materias, luego presiona Generar plan</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo distribuir tus horas de estudio durante la semana
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Planificar el tiempo de estudio de forma estructurada es uno de los hábitos más diferenciadores entre estudiantes exitosos y quienes improvisan. Un buen plan semanal asigna más tiempo a las materias más difíciles o de mayor peso, distribuye el estudio de manera consistente en lugar de concentrarlo justo antes de exámenes, y respeta los días de menor disponibilidad.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Esta herramienta usa prioridades (alta, media, baja) para distribuir el tiempo disponible de forma proporcional. La prioridad alta recibe 3 veces más tiempo que la baja, y la media el doble que la baja. Dentro de cada día, la distribución es proporcional a las horas disponibles en ese día específico.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Recuerda que planificar es el primer paso, pero ejecutar el plan con consistencia es lo que produce resultados. Revisa y ajusta tu plan cada semana según los avances reales en cada materia.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Estudiante con 19h/sem disponibles, 3 materias: Cálculo (alta, 8h mín), Inglés (baja, 3h), Historia (media, 5h):
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Cálculo (alta)", value: "8.6h/sem", sub: "~1.2h por día de clase" },
                { label: "Historia (media)", value: "5.7h/sem", sub: "~0.8h por día de clase" },
                { label: "Inglés (baja)", value: "2.9h/sem", sub: "~0.4h por día de clase" },
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
                { q: "¿Cuántas horas de estudio al día son recomendables?", a: "Para estudiantes universitarios a tiempo completo, entre 2 y 5 horas de estudio autónomo diarias es un rango saludable. Más de 6 horas continuas de estudio produce rendimientos decrecientes por fatiga cognitiva. Lo más efectivo es estudiar en bloques de 45-90 minutos con descansos de 10-15 minutos entre ellos (técnica Pomodoro)." },
                { q: "¿Debería estudiar los fines de semana?", a: "Sí, los fines de semana son ideales para sesiones de estudio más largas y profundas (revisión de temas complejos, práctica de problemas). Sin embargo, también son importantes para recuperar energía. Lo óptimo es dedicar 2-4 horas cada día del fin de semana en lugar de estudiar todo un día y descansar el otro." },
                { q: "¿Cómo ajusto el plan en semana de exámenes?", a: "Durante semana de exámenes, la prioridad cambia: asigna el 70-80% del tiempo a las materias con examen más cercano, reduce al mínimo las demás. Actualiza la herramienta con nuevas prioridades para generar un plan de emergencia. En esas semanas también es válido reducir horas de sueño temporalmente, aunque no a menos de 6 horas." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Optimiza tu tiempo y rendimiento académico.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/tiempo-estudio", label: "Tiempo de estudio por materia", desc: "Horas recomendadas según dificultad" },
                { href: "/productividad-academica", label: "Productividad académica", desc: "Mide tu índice de rendimiento" },
                { href: "/promedio-ponderado", label: "Promedio ponderado", desc: "Calcula tu promedio académico" },
                { href: "/nota-minima-aprobar", label: "Nota mínima para aprobar", desc: "Qué necesitas en el examen final" },
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
