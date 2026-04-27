"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#74AEDD", light: "#9DC4E8", bg: "#152638", tint: "#0E1318", border: "rgba(116,174,221,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

interface Materia {
  id: number;
  nombre: string;
  dificultad: string;
  creditos: string;
  horasClase: string;
}

export default function TiempoEstudio() {
  const [materias, setMaterias] = useState<Materia[]>([
    { id: 1, nombre: "Cálculo", dificultad: "5", creditos: "4", horasClase: "4" },
    { id: 2, nombre: "Inglés", dificultad: "2", creditos: "2", horasClase: "2" },
    { id: 3, nombre: "Programación", dificultad: "4", creditos: "4", horasClase: "3" },
  ]);
  const [horasDisponibles, setHorasDisponibles] = useState("20");
  const [resultado, setResultado] = useState<{
    detalles: { nombre: string; horasAutonomas: number; porcentaje: number; dificultad: number }[];
    totalHoras: number;
    disponibles: number;
    alerta: boolean;
  } | null>(null);

  const agregar = () => {
    setMaterias(prev => [...prev, { id: Date.now(), nombre: "", dificultad: "3", creditos: "", horasClase: "" }]);
  };

  const eliminar = (id: number) => {
    setMaterias(prev => prev.filter(m => m.id !== id));
  };

  const actualizar = (id: number, campo: keyof Materia, valor: string) => {
    setMaterias(prev => prev.map(m => m.id === id ? { ...m, [campo]: valor } : m));
  };

  const calcular = useCallback(() => {
    const disponibles = parseFloat(horasDisponibles) || 0;
    const validas = materias.filter(m => m.nombre.trim() && m.dificultad && m.creditos && m.horasClase);
    if (validas.length === 0) return;

    const detallesRaw = validas.map(m => {
      const dif = parseFloat(m.dificultad) || 1;
      const cr = parseFloat(m.creditos) || 1;
      const hc = parseFloat(m.horasClase) || 0;
      const multiplicador = 1 + (dif - 1) * 0.4;
      const horasAutonomas = Math.round(cr * multiplicador * 1.5);
      return { nombre: m.nombre, horasAutonomas, dificultad: dif };
    });

    const totalHoras = detallesRaw.reduce((s, m) => s + m.horasAutonomas, 0);
    const detalles = detallesRaw.map(m => ({
      ...m,
      porcentaje: totalHoras > 0 ? Math.round((m.horasAutonomas / totalHoras) * 100) : 0,
    }));

    setResultado({ detalles, totalHoras, disponibles, alerta: totalHoras > disponibles });
  }, [materias, horasDisponibles]);

  const dificultadLabel = (d: number) => ["", "Muy fácil", "Fácil", "Moderada", "Difícil", "Muy difícil"][d] || "";
  const dificultadColor = (d: number) => ["", "#6EC9A0", "#9DC4E8", "#D4B85A", "#E07070", "#E07070"][d] || NICHO.color;

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/educacion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Educación</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Tiempo de estudio por materia</span>
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
              Tiempo de estudio por materia
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula cuántas horas de estudio autónomo necesitas por materia según su dificultad y créditos.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Horas disponibles por semana</label>
                  <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{horasDisponibles} h</span>
                </div>
                <input type="number" min="1" max="80" step="1" value={horasDisponibles} onChange={(e) => setHorasDisponibles(e.target.value)}
                  className={inputClass} style={{ ...inputStyle }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>

              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#EEEEEE", marginBottom: "10px" }}>Materias</p>

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
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label style={{ fontSize: "10px", color: "#EEEEEE", display: "block", marginBottom: "4px" }}>Dificultad 1-5</label>
                        <select value={m.dificultad} onChange={(e) => actualizar(m.id, "dificultad", e.target.value)}
                          style={{ background: "#141520", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "6px", padding: "8px", width: "100%", fontSize: "12px", cursor: "pointer", outline: "none" }}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: "10px", color: "#EEEEEE", display: "block", marginBottom: "4px" }}>Créditos</label>
                        <input type="number" min="1" max="10" placeholder="4" value={m.creditos} onChange={(e) => actualizar(m.id, "creditos", e.target.value)}
                          className={inputClass} style={{ ...inputStyle, padding: "8px 10px" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "10px", color: "#EEEEEE", display: "block", marginBottom: "4px" }}>H. clase/sem</label>
                        <input type="number" min="0" max="20" placeholder="3" value={m.horasClase} onChange={(e) => actualizar(m.id, "horasClase", e.target.value)}
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
                Calcular tiempo de estudio
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-5 text-center" style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                    <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Horas totales/semana</p>
                    <p style={{ fontSize: "40px", fontWeight: 600, color: resultado.alerta ? "#E07070" : NICHO.color, letterSpacing: "-1px", lineHeight: 1 }}>
                      {resultado.totalHoras}
                    </p>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "4px" }}>horas recomendadas</p>
                  </div>
                  <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Horas disponibles</p>
                    <p style={{ fontSize: "40px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-1px", lineHeight: 1 }}>
                      {resultado.disponibles}
                    </p>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "4px" }}>por semana</p>
                  </div>
                </div>

                {resultado.alerta && (
                  <div style={{ background: "#E0707015", border: "0.5px solid #E0707040", borderRadius: "10px", padding: "14px 16px" }}>
                    <p style={{ fontSize: "12px", color: "#E07070", fontWeight: 600 }}>
                      Sobrecarga: {resultado.totalHoras - resultado.disponibles}h más de las disponibles. Considera reducir carga académica.
                    </p>
                  </div>
                )}

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "12px" }}>Distribución por materia</p>
                  <div className="space-y-3">
                    {resultado.detalles.map((m) => (
                      <div key={m.nombre}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <div>
                            <span style={{ fontSize: "12px", color: "#FFFFFF", fontWeight: 600 }}>{m.nombre}</span>
                            <span style={{ marginLeft: "8px", fontSize: "10px", color: dificultadColor(m.dificultad) }}>{dificultadLabel(m.dificultad)}</span>
                          </div>
                          <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{m.horasAutonomas}h/sem</span>
                        </div>
                        <div style={{ height: "6px", background: "#0F1117", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${m.porcentaje}%`, background: NICHO.color, borderRadius: "999px" }} />
                        </div>
                        <span style={{ fontSize: "10px", color: "#EEEEEE" }}>{m.porcentaje}% del tiempo total</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Agrega tus materias y presiona Calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cuántas horas estudiar por materia según su dificultad
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La regla general universitaria establece que por cada hora de clase deberías dedicar entre 2 y 3 horas de estudio autónomo. Pero esta proporción varía según la dificultad de la materia. Una asignatura de matemáticas avanzadas o ciencias de la salud puede requerir hasta 4 horas de estudio por hora de clase, mientras que materias más descriptivas pueden bastar con 1.5 horas.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Esta calculadora usa un modelo basado en créditos y dificultad: a mayor número de créditos y dificultad declarada, más horas de estudio autónomo se recomiendan. El resultado te ayuda a distribuir realísticamente tu tiempo disponible y detectar si estás tomando más materias de las que puedes manejar con calidad.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Si el total de horas recomendadas supera tus horas disponibles semanales, considera reducir la carga académica, pedir tutoría en las materias más difíciles, o reorganizar tus actividades extracurriculares.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Estudiante con 3 materias: Cálculo (dif. 5, 4 cr.), Inglés (dif. 2, 2 cr.), Programación (dif. 4, 4 cr.):
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Cálculo", value: "10h/sem", sub: "Dificultad muy alta" },
                { label: "Inglés", value: "4h/sem", sub: "Dificultad fácil" },
                { label: "Programación", value: "8h/sem", sub: "Dificultad alta" },
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
                { q: "¿Cómo sé qué nivel de dificultad asignar a cada materia?", a: "Usa tu experiencia previa o la opinión de compañeros que ya tomaron la materia. Una guía general: dificultad 1-2 para materias descriptivas o introductórias; 3 para materias intermedias con algo de cálculo o análisis; 4-5 para ciencias exactas, programación avanzada, materias con alta tasa de reprobación." },
                { q: "¿Cuántas horas semanales debería tener disponibles para estudiar?", a: "Un estudiante de tiempo completo debería tener entre 15 y 30 horas semanales de estudio autónomo, dependiendo de su carga académica. Considera que una semana tiene 168 horas: resta horas de sueño (56h), alimentación e higiene (14h), clases presenciales y transporte (15-20h), y lo que queda es tu tiempo disponible." },
                { q: "¿Incluye las horas de clase en el cálculo?", a: "No. Esta calculadora calcula solo las horas de estudio autónomo recomendadas fuera del aula. Las horas de clase son adicionales. Si tienes 15 horas de clase semanales y la herramienta recomienda 22 horas de estudio, tu carga total sería de 37 horas dedicadas a lo académico." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Organiza tu tiempo y mejora tu rendimiento académico.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/planificador-estudio", label: "Planificador semanal", desc: "Distribuye tus horas por día" },
                { href: "/productividad-academica", label: "Productividad académica", desc: "Mide tu índice de rendimiento" },
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
