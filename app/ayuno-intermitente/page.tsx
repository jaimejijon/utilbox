"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4B85A", light: "#E2CC7D", bg: "#332B0F", tint: "#181408", border: "rgba(212,184,90,0.25)" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type Protocolo = "16:8" | "18:6" | "20:4" | "OMAD" | "5:2";

const PROTOCOLOS: Record<Protocolo, { ayuno: number; comer: number; descripcion: string }> = {
  "16:8": { ayuno: 16, comer: 8, descripcion: "El más popular. 8 horas para comer, ideal para principiantes." },
  "18:6": { ayuno: 18, comer: 6, descripcion: "Mayor beneficio metabólico. Ventana de 6 horas para comer." },
  "20:4": { ayuno: 20, comer: 4, descripcion: "Protocolo Warrior. Una o dos comidas en 4 horas." },
  "OMAD": { ayuno: 23, comer: 1, descripcion: "Una sola comida al día. Solo para personas experimentadas." },
  "5:2": { ayuno: 0, comer: 0, descripcion: "5 días normal + 2 días con solo 500-600 kcal. No requiere horario de ayuno." },
};

const CONSEJOS: Record<Protocolo, string[]> = {
  "16:8": [
    "Elige una ventana de alimentación que se ajuste a tu vida social (ej: 13:00–21:00).",
    "Puedes tomar café negro, té sin azúcar o agua durante el ayuno.",
    "Los primeros 5-7 días son los más difíciles; el hambre matutina desaparece con el tiempo.",
  ],
  "18:6": [
    "Ideal combinar con ejercicio en ayunas al final del período de ayuno.",
    "Prioriza alimentos densos en nutrientes durante las 6 horas.",
    "Evita empezar directamente con 18:8; llega progresivamente desde 16:8.",
  ],
  "20:4": [
    "Consume una comida principal grande y un snack dentro de las 4 horas.",
    "Este protocolo demanda mayor control del apetito; no recomendado para principiantes.",
    "Enfócate en proteínas y grasas saludables para mantener saciedad.",
  ],
  "OMAD": [
    "Come una comida completa y nutritiva que cubra todos tus macros.",
    "No recomendado sin supervisión médica si tienes condiciones de salud.",
    "Asegura suficiente proteína (mínimo 1.6 g/kg) para preservar músculo.",
  ],
  "5:2": [
    "Elige los 2 días de restricción calórica no consecutivos (ej: lunes y jueves).",
    "En días de restricción: prioriza proteína, verduras y agua.",
    "No necesitas contar calorías los 5 días normales, pero evita compensar en exceso.",
  ],
};

function fmtHora(h: number): string {
  const hh = Math.floor(((h % 24) + 24) % 24);
  return `${hh.toString().padStart(2, "0")}:00`;
}

export default function AyunoIntermitente() {
  const [protocolo, setProtocolo] = useState<Protocolo>("16:8");
  const [horaInicio, setHoraInicio] = useState("22");

  const [resultado, setResultado] = useState<{
    inicioAyuno: number; finAyuno: number; inicioComer: number; finComer: number;
    horasAyuno: number; horasComer: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const p = PROTOCOLOS[protocolo];
    if (protocolo === "5:2") {
      setResultado({ inicioAyuno: -1, finAyuno: -1, inicioComer: -1, finComer: -1, horasAyuno: 0, horasComer: 0 });
      return;
    }
    const inicio = parseInt(horaInicio) || 22;
    const finAyuno = inicio + p.ayuno;
    const inicioComer = finAyuno;
    const finComer = inicioComer + p.comer;
    setResultado({ inicioAyuno: inicio, finAyuno, inicioComer, finComer, horasAyuno: p.ayuno, horasComer: p.comer });
  }, [protocolo, horaInicio]);

  const esAyuno = (h: number, ini: number, hor: number): boolean => {
    const normalizedH = ((h - ini) % 24 + 24) % 24;
    return normalizedH < hor;
  };

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/nutricion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Nutrición</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Ayuno intermitente</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Ayuno</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de ayuno intermitente
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Selecciona tu protocolo y la hora en que planeas comenzar el ayuno. Calcula tu ventana de alimentación y visualiza tu reloj de 24 horas.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "8px" }}>Protocolo de ayuno</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {(["16:8", "18:6", "20:4"] as Protocolo[]).map((p) => (
                    <button key={p} onClick={() => setProtocolo(p)}
                      style={{ padding: "8px 4px", borderRadius: "7px", fontSize: "13px", fontWeight: 700, border: "none", cursor: "pointer", background: protocolo === p ? NICHO.color : "#0F1117", color: protocolo === p ? "#0F1117" : "#EEEEEE" }}>
                      {p}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(["OMAD", "5:2"] as Protocolo[]).map((p) => (
                    <button key={p} onClick={() => setProtocolo(p)}
                      style={{ padding: "8px", borderRadius: "7px", fontSize: "13px", fontWeight: 700, border: "none", cursor: "pointer", background: protocolo === p ? NICHO.color : "#0F1117", color: protocolo === p ? "#0F1117" : "#EEEEEE" }}>
                      {p}
                    </button>
                  ))}
                </div>
                <div style={{ background: "#0F1117", borderRadius: "8px", padding: "8px 10px", marginTop: "8px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.5" }}>{PROTOCOLOS[protocolo].descripcion}</p>
                </div>
              </div>

              {protocolo !== "5:2" && (
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Hora de inicio del ayuno</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{horaInicio.padStart(2, "0")}:00</span>
                  </div>
                  <select value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)}
                    style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{i.toString().padStart(2, "0")}:00</option>
                    ))}
                  </select>
                </div>
              )}

              <button onClick={calcular} className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#0F1117", border: "none", cursor: "pointer" }}>
                Calcular ventana de ayuno
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                {protocolo === "5:2" ? (
                  <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "20px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Protocolo 5:2</p>
                    <div className="flex flex-col gap-3">
                      {[
                        { icon: "📅", label: "Días normales", val: "5 días/semana", desc: "Sin restricción calórica" },
                        { icon: "🔒", label: "Días de ayuno", val: "2 días/semana", desc: "500–600 kcal máximo" },
                        { icon: "⚡", label: "Distribución", val: "No consecutivos", desc: "Ej: lunes y jueves" },
                      ].map((e) => (
                        <div key={e.label} style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", padding: "10px 12px" }}>
                          <span style={{ fontSize: "20px" }}>{e.icon}</span>
                          <div>
                            <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "2px" }}>{e.label}</p>
                            <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.color }}>{e.val}</p>
                            <p style={{ fontSize: "10px", color: "#888" }}>{e.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "16px 20px" }}>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Inicio del ayuno</p>
                          <p style={{ fontSize: "28px", fontWeight: 600, color: "#888" }}>{fmtHora(resultado.inicioAyuno)}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Romper el ayuno</p>
                          <p style={{ fontSize: "28px", fontWeight: 600, color: NICHO.color }}>{fmtHora(resultado.inicioComer)}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Fin de alimentación</p>
                          <p style={{ fontSize: "28px", fontWeight: 600, color: "#74AEDD" }}>{fmtHora(resultado.finComer)}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Próximo ayuno</p>
                          <p style={{ fontSize: "28px", fontWeight: 600, color: "#888" }}>{fmtHora(resultado.finComer)}</p>
                        </div>
                      </div>
                    </div>

                    <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Reloj de 24 horas</p>
                      <div style={{ display: "flex", gap: "2px", marginBottom: "6px" }}>
                        {Array.from({ length: 24 }, (_, h) => {
                          const ayuno = esAyuno(h, resultado.inicioAyuno, resultado.horasAyuno);
                          return (
                            <div key={h} style={{ flex: 1, height: "28px", background: ayuno ? "#1A1A2E" : NICHO.bg, borderRadius: "2px", border: `0.5px solid ${ayuno ? "#1E2030" : NICHO.border}` }} title={`${h}:00 — ${ayuno ? "Ayuno" : "Alimentación"}`} />
                          );
                        })}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#888" }}>
                        {[0, 6, 12, 18, 24].map((h) => <span key={h}>{h}h</span>)}
                      </div>
                      <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#EEEEEE" }}>
                          <span style={{ width: "12px", height: "12px", background: "#1A1A2E", border: "0.5px solid #1E2030", borderRadius: "2px", display: "block" }} />
                          Ayuno ({resultado.horasAyuno}h)
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#EEEEEE" }}>
                          <span style={{ width: "12px", height: "12px", background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "2px", display: "block" }} />
                          Alimentación ({resultado.horasComer}h)
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: NICHO.color, marginBottom: "8px" }}>Consejos para el protocolo {protocolo}</p>
                  <div className="flex flex-col gap-2">
                    {CONSEJOS[protocolo].map((c, i) => (
                      <p key={i} style={{ fontSize: "12px", color: "#EEEEEE", lineHeight: "1.6", paddingLeft: "12px", borderLeft: `2px solid ${NICHO.border}` }}>{c}</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Selecciona un protocolo y presiona Calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Qué es el ayuno intermitente y cómo elegir tu protocolo
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El ayuno intermitente (AI) no es una dieta sino un patrón de alimentación que alterna períodos de ingesta con períodos de ayuno. Durante el ayuno, el cuerpo agota las reservas de glucosa y comienza a quemar grasa como combustible. También se observan beneficios en sensibilidad a la insulina, reducción de la inflamación y mejora en marcadores metabólicos. Su popularidad en México, Argentina, Colombia y Chile ha crecido enormemente en los últimos años.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              El protocolo 16:8 es el más accesible para comenzar: simplemente omites el desayuno y comes entre mediodía y las 8pm. Para personas con más experiencia, el 18:6 o 20:4 pueden ofrecer mayores beneficios metabólicos. El protocolo 5:2 es ideal para quienes prefieren no restringir horarios diariamente.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Con protocolo <strong style={{ color: "#FFFFFF" }}>16:8 iniciando ayuno a las 21:00</strong>:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Inicio del ayuno", value: "21:00", sub: "última comida" },
                { label: "Romper el ayuno", value: "13:00", sub: "primera comida" },
                { label: "Ventana de comer", value: "13:00–21:00", sub: "8 horas" },
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
                { q: "¿El café con leche rompe el ayuno?", a: "El café negro, té sin azúcar y agua no rompen el ayuno. El café con leche, cremas, azúcar o cualquier bebida con calorías sí lo interrumpe. Una taza de café negro tiene prácticamente 0 calorías y no activa la respuesta insulínica, por lo que es compatible con todos los protocolos de ayuno." },
                { q: "¿Puedo hacer ejercicio en ayunas?", a: "Sí, y muchas personas lo prefieren para maximizar la quema de grasa. El ejercicio en ayunas es seguro para la mayoría de las personas. Sin embargo, si realizas entrenamientos de alta intensidad o de fuerza, considera entrenar justo antes de romper el ayuno para poder consumir proteína post-entrenamiento rápidamente." },
                { q: "¿El ayuno intermitente funciona igual para mujeres?", a: "Existe evidencia de que algunas mujeres, especialmente en edad reproductiva, pueden ser más sensibles a patrones de ayuno prolongados, experimentando alteraciones en el ciclo menstrual. Se recomienda que las mujeres comiencen con protocolos más suaves (12:12 o 14:10) y ajusten gradualmente. Mujeres embarazadas o en período de lactancia no deben practicar ayuno intermitente." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Explora otras herramientas de nutrición</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Complementa tu protocolo de ayuno.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/deficit-superavit", label: "Déficit y superávit calórico", desc: "Cuántas kcal comer en tu ventana" },
                { href: "/proteina-diaria", label: "Proteína diaria necesaria", desc: "Cubre tus macros en menos horas" },
                { href: "/calorias-por-alimento", label: "Calorías por alimento", desc: "Qué comer para romper el ayuno" },
                { href: "/metabolismo-cafeina", label: "Metabolización de cafeína", desc: "Cafeína durante el ayuno" },
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
