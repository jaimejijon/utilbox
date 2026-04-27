"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#74AEDD", light: "#9DC4E8", bg: "#152638", tint: "#0E1318", border: "rgba(116,174,221,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type Escala = "1-10" | "1-20" | "GPA" | "0-100";

interface Materia {
  id: number;
  nombre: string;
  nota: string;
  creditos: string;
}

function getClasificacion(promedio: number, escala: Escala): string {
  if (escala === "1-10") {
    if (promedio >= 9) return "Excelente";
    if (promedio >= 7) return "Bueno";
    if (promedio >= 6) return "Aprobado";
    return "Reprobado";
  }
  if (escala === "1-20") {
    if (promedio >= 18) return "Excelente";
    if (promedio >= 14) return "Bueno";
    if (promedio >= 11) return "Aprobado";
    return "Reprobado";
  }
  if (escala === "GPA") {
    if (promedio >= 3.7) return "Excelente";
    if (promedio >= 3.0) return "Bueno";
    if (promedio >= 2.0) return "Aprobado";
    return "Reprobado";
  }
  if (promedio >= 90) return "Excelente";
  if (promedio >= 70) return "Bueno";
  if (promedio >= 60) return "Aprobado";
  return "Reprobado";
}

function getMinAprobacion(escala: Escala): number {
  if (escala === "1-10") return 6;
  if (escala === "1-20") return 11;
  if (escala === "GPA") return 2.0;
  return 60;
}

export default function PromedioPonderado() {
  const [materias, setMaterias] = useState<Materia[]>([
    { id: 1, nombre: "Matemáticas", nota: "8.5", creditos: "4" },
    { id: 2, nombre: "Física", nota: "7.0", creditos: "3" },
    { id: 3, nombre: "Programación", nota: "9.2", creditos: "5" },
  ]);
  const [escala, setEscala] = useState<Escala>("1-10");
  const [resultado, setResultado] = useState<{
    promedio: number;
    totalCreditos: number;
    aprobadas: number;
    reprobadas: number;
    clasificacion: string;
    detalles: { nombre: string; nota: number; creditos: number; aprobada: boolean }[];
  } | null>(null);

  const agregar = () => {
    setMaterias(prev => [...prev, { id: Date.now(), nombre: "", nota: "", creditos: "" }]);
  };

  const eliminar = (id: number) => {
    setMaterias(prev => prev.filter(m => m.id !== id));
  };

  const actualizar = (id: number, campo: keyof Materia, valor: string) => {
    setMaterias(prev => prev.map(m => m.id === id ? { ...m, [campo]: valor } : m));
  };

  const calcular = useCallback(() => {
    const min = getMinAprobacion(escala);
    const detalles = materias
      .filter(m => m.nombre.trim() && m.nota && m.creditos)
      .map(m => ({
        nombre: m.nombre,
        nota: parseFloat(m.nota),
        creditos: parseFloat(m.creditos),
        aprobada: parseFloat(m.nota) >= min,
      }));
    if (detalles.length === 0) return;
    const totalCreditos = detalles.reduce((s, m) => s + m.creditos, 0);
    const sumaProductos = detalles.reduce((s, m) => s + m.nota * m.creditos, 0);
    const promedio = totalCreditos > 0 ? sumaProductos / totalCreditos : 0;
    const aprobadas = detalles.filter(m => m.aprobada).length;
    const reprobadas = detalles.length - aprobadas;
    setResultado({ promedio, totalCreditos, aprobadas, reprobadas, clasificacion: getClasificacion(promedio, escala), detalles });
  }, [materias, escala]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/educacion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Educación</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de promedio ponderado</span>
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
              Calculadora de promedio ponderado
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Ingresa tus materias con nota y créditos para calcular tu promedio académico ponderado.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Escala de calificación</label>
                <select value={escala} onChange={(e) => setEscala(e.target.value as Escala)}
                  style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                  <option value="1-10">Escala 1 – 10</option>
                  <option value="1-20">Escala 1 – 20</option>
                  <option value="GPA">GPA (0 – 4)</option>
                  <option value="0-100">Porcentual (0 – 100%)</option>
                </select>
              </div>

              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#EEEEEE", marginBottom: "10px" }}>Materias</p>

              <div className="space-y-3">
                {materias.map((m, i) => (
                  <div key={m.id} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px" }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontSize: "11px", color: NICHO.light, fontWeight: 600 }}>Materia {i + 1}</span>
                      {materias.length > 1 && (
                        <button onClick={() => eliminar(m.id)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "14px", lineHeight: 1 }}>×</button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <input placeholder="Nombre de la materia" value={m.nombre} onChange={(e) => actualizar(m.id, "nombre", e.target.value)}
                        className={inputClass} style={{ ...inputStyle }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="number" placeholder="Nota" value={m.nota} onChange={(e) => actualizar(m.id, "nota", e.target.value)}
                          className={inputClass} style={{ ...inputStyle }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                        <input type="number" placeholder="Créditos" value={m.creditos} onChange={(e) => actualizar(m.id, "creditos", e.target.value)}
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
                + Agregar materia
              </button>

              <button onClick={calcular} className="w-full mt-3 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular promedio
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Promedio ponderado</p>
                  <p style={{ fontSize: "52px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    {resultado.promedio.toFixed(2)}
                  </p>
                  <span style={{ display: "inline-block", marginTop: "8px", background: NICHO.color + "22", border: `0.5px solid ${NICHO.color}44`, borderRadius: "999px", padding: "3px 12px", fontSize: "12px", fontWeight: 600, color: NICHO.color }}>
                    {resultado.clasificacion}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Total créditos</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: NICHO.light }}>{resultado.totalCreditos}</p>
                  </div>
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Aprobadas</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "#6EC9A0" }}>{resultado.aprobadas}</p>
                  </div>
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Reprobadas</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: resultado.reprobadas > 0 ? "#E07070" : "#6EC9A0" }}>{resultado.reprobadas}</p>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Detalle por materia</p>
                  <div className="space-y-2">
                    {resultado.detalles.map((m) => (
                      <div key={m.nombre} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "#0F1117", borderRadius: "6px" }}>
                        <span style={{ fontSize: "12px", color: "#FFFFFF" }}>{m.nombre}</span>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                          <span style={{ fontSize: "11px", color: "#EEEEEE" }}>{m.creditos} cr.</span>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: m.aprobada ? "#6EC9A0" : "#E07070" }}>{m.nota}</span>
                        </div>
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
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Agrega tus materias y presiona Calcular promedio</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Qué es el promedio ponderado y cómo se calcula
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El promedio ponderado es una medida estadística que asigna mayor importancia a ciertas materias según su peso o créditos académicos. A diferencia del promedio simple, no trata todas las materias de forma igualitaria, sino que refleja el esfuerzo académico proporcional a la carga de cada asignatura.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La fórmula es: Promedio = Σ(nota × créditos) ÷ Σ(créditos). Esto significa que una materia de 5 créditos con nota 9 tiene mayor impacto que una materia de 2 créditos con nota 10. La mayoría de universidades latinoamericanas y europeas utilizan este sistema para calcular el rendimiento académico oficial del estudiante.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Conocer tu promedio ponderado es fundamental para aplicar a becas, intercambios académicos, posgrados o empleos que solicitan un mínimo de rendimiento. Esta calculadora admite las escalas más usadas internacionalmente: 1-10, 1-20, GPA (0-4) y porcentual (0-100%).
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Un estudiante con tres materias: Cálculo (4 cr, nota 7.5), Inglés (2 cr, nota 9.0) y Programación (5 cr, nota 8.2):
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Promedio simple", value: "8.23", sub: "Sin ponderar" },
                { label: "Promedio ponderado", value: "8.13", sub: "Con créditos" },
                { label: "Total créditos", value: "11 cr.", sub: "Carga semestral" },
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
                { q: "¿En qué se diferencia el promedio ponderado del promedio simple?", a: "El promedio simple suma todas las notas y las divide entre el número de materias, dando el mismo peso a todas. El promedio ponderado multiplica cada nota por sus créditos antes de dividir, por lo que las materias con más créditos influyen más en el resultado final." },
                { q: "¿Cómo afectan los créditos al promedio?", a: "Una materia con más créditos tiene mayor peso en el promedio. Si tienes una nota baja en una materia de 5 créditos, impacta más que una nota baja en una materia de 2 créditos. Por eso es importante enfocarse más en las materias de mayor carga crediticia." },
                { q: "¿Qué escala debo usar según mi país?", a: "En México, Colombia y España se usa mayormente escala 1-10. En Perú, Bolivia y Venezuela es común la escala 1-20. Estados Unidos y Canadá usan GPA (0-4). El sistema porcentual (0-100%) es común en algunos programas latinoamericanos y anglosajones. Consulta el reglamento de tu institución para confirmar." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Todo lo que necesitas para tu vida académica.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/nota-minima-aprobar", label: "Nota mínima para aprobar", desc: "Calcula qué necesitas en el final" },
                { href: "/conversor-calificaciones", label: "Conversor de calificaciones", desc: "Pasa tu nota entre escalas" },
                { href: "/tiempo-estudio", label: "Tiempo de estudio por materia", desc: "Planifica tus horas de estudio" },
                { href: "/planificador-estudio", label: "Planificador semanal", desc: "Distribuye tus horas disponibles" },
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
