"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4B85A", light: "#E2CC7D", bg: "#332B0F", tint: "#181408", border: "rgba(212,184,90,0.25)" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type Intensidad = "baja" | "media" | "alta";
type Temperatura = "fresca" | "templada" | "calida" | "muy_calida";

export default function HidratacionDeportiva() {
  const [peso, setPeso] = useState("70");
  const [duracion, setDuracion] = useState("60");
  const [intensidad, setIntensidad] = useState<Intensidad>("media");
  const [temperatura, setTemperatura] = useState<Temperatura>("templada");
  const [deporte, setDeporte] = useState("cardio");

  const [resultado, setResultado] = useState<{
    preEjercicio1: number; preEjercicio2: number;
    duranteCada: number; intervalMin: number;
    postTotal: number; electrolitos: boolean;
    sodio: number; potasio: number; total: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const p = parseFloat(peso) || 0;
    const min = parseFloat(duracion) || 0;
    if (p <= 0 || min <= 0) return;

    const mlPorHora: Record<Intensidad, number> = { baja: 300, media: 500, alta: 750 };
    const tempMult: Record<Temperatura, number> = { fresca: 1.0, templada: 1.1, calida: 1.2, muy_calida: 1.35 };
    const deporteMult: Record<string, number> = { cardio: 1.0, pesas: 0.8, crossfit: 1.15, ciclismo: 1.2, natacion: 0.9, futbol: 1.1 };

    const baseHora = mlPorHora[intensidad];
    const horas = min / 60;
    const durant = Math.round(baseHora * horas * tempMult[temperatura] * (deporteMult[deporte] ?? 1));
    const intervalMin = intensidad === "alta" ? 10 : intensidad === "media" ? 15 : 20;
    const duranteCada = Math.round((durant / (min / intervalMin)));

    const preEjercicio1 = 500;
    const preEjercicio2 = 250;
    const postEstimado = Math.round(p * (intensidad === "alta" ? 0.015 : 0.01) * 1000 * 1.5);
    const postTotal = Math.round(Math.max(postEstimado, 400));

    const electrolitos = min > 60;
    const sodio = electrolitos ? Math.round(300 * horas) : 0;
    const potasio = electrolitos ? Math.round(100 * horas) : 0;
    const total = preEjercicio1 + preEjercicio2 + durant + postTotal;

    setResultado({ preEjercicio1, preEjercicio2, duranteCada, intervalMin, postTotal, electrolitos, sodio, potasio, total });
  }, [peso, duracion, intensidad, temperatura, deporte]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/nutricion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Nutrición</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Plan de hidratación deportiva</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Hidratación</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Plan de hidratación deportiva
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula cuánto líquido necesitas antes, durante y después del ejercicio según tu peso, intensidad y condiciones ambientales.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Peso corporal</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{peso} kg</span>
                  </div>
                  <input type="number" min="30" max="200" step="0.5" value={peso} onChange={(e) => setPeso(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Duración</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{duracion} min</span>
                  </div>
                  <input type="number" min="15" max="300" step="5" value={duracion} onChange={(e) => setDuracion(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tipo de deporte</label>
                <select value={deporte} onChange={(e) => setDeporte(e.target.value)}
                  style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                  <option value="cardio">Cardio (correr, elíptica)</option>
                  <option value="pesas">Pesas / Gym</option>
                  <option value="crossfit">CrossFit / HIIT</option>
                  <option value="ciclismo">Ciclismo</option>
                  <option value="natacion">Natación</option>
                  <option value="futbol">Fútbol / deportes de equipo</option>
                </select>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Intensidad</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["baja", "media", "alta"] as Intensidad[]).map((i) => (
                    <button key={i} onClick={() => setIntensidad(i)}
                      style={{ padding: "8px", borderRadius: "7px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", background: intensidad === i ? NICHO.color : "#0F1117", color: intensidad === i ? "#0F1117" : "#EEEEEE", textTransform: "capitalize" as const }}>
                      {i.charAt(0).toUpperCase() + i.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Temperatura ambiente</label>
                <select value={temperatura} onChange={(e) => setTemperatura(e.target.value as Temperatura)}
                  style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                  <option value="fresca">Fresca (menos de 15°C)</option>
                  <option value="templada">Templada (15–25°C)</option>
                  <option value="calida">Cálida (25–35°C)</option>
                  <option value="muy_calida">Muy cálida (más de 35°C)</option>
                </select>
              </div>

              <button onClick={calcular} className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#0F1117", border: "none", cursor: "pointer" }}>
                Generar plan de hidratación
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-3">
                <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "16px 20px", textAlign: "center" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Hidratación total estimada</p>
                  <p style={{ fontSize: "44px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>{(resultado.total / 1000).toFixed(1)}</p>
                  <p style={{ fontSize: "13px", color: NICHO.light }}>litros totales</p>
                </div>

                <div className="flex flex-col gap-2">
                  {[
                    {
                      fase: "Antes (2h antes)",
                      icon: "⏱",
                      color: "#74AEDD",
                      ml: resultado.preEjercicio1,
                      detalle: "Hidratación de base para el entrenamiento",
                    },
                    {
                      fase: "Antes (15–30 min antes)",
                      icon: "🚰",
                      color: "#74AEDD",
                      ml: resultado.preEjercicio2,
                      detalle: "Última carga de líquido pre-ejercicio",
                    },
                    {
                      fase: `Durante (cada ${resultado.intervalMin} min)`,
                      icon: "💧",
                      color: NICHO.color,
                      ml: resultado.duranteCada,
                      detalle: "Reponer pérdida por sudoración continua",
                    },
                    {
                      fase: "Después del ejercicio",
                      icon: "🔄",
                      color: "#6EC9A0",
                      ml: resultado.postTotal,
                      detalle: "Recuperación de líquidos perdidos",
                    },
                  ].map((e) => (
                    <div key={e.fase} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "20px", flexShrink: 0 }}>{e.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "2px" }}>{e.fase}</p>
                        <p style={{ fontSize: "11px", color: "#EEEEEE" }}>{e.detalle}</p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p style={{ fontSize: "16px", fontWeight: 600, color: e.color }}>{e.ml} ml</p>
                        <p style={{ fontSize: "10px", color: "#888" }}>{(e.ml / 1000).toFixed(2)} L</p>
                      </div>
                    </div>
                  ))}
                </div>

                {resultado.electrolitos && (
                  <div style={{ background: "#141520", border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "14px 16px" }}>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: NICHO.color, marginBottom: "8px" }}>⚡ Electrolitos recomendados (ejercicio &gt; 60 min)</p>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div style={{ background: "#0F1117", borderRadius: "8px", padding: "10px" }}>
                        <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "2px" }}>Sodio</p>
                        <p style={{ fontSize: "16px", fontWeight: 600, color: NICHO.light }}>{resultado.sodio} mg</p>
                      </div>
                      <div style={{ background: "#0F1117", borderRadius: "8px", padding: "10px" }}>
                        <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "2px" }}>Potasio</p>
                        <p style={{ fontSize: "16px", fontWeight: 600, color: NICHO.light }}>{resultado.potasio} mg</p>
                      </div>
                    </div>
                    <p style={{ fontSize: "11px", color: "#888", marginTop: "8px" }}>Fuentes: bebida isotónica, agua de coco o plátano post-ejercicio</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus datos y presiona Generar plan</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo hidratarse correctamente durante el ejercicio
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La deshidratación de apenas el 2% del peso corporal ya reduce el rendimiento deportivo un 10–20%. Para un deportista de 70 kg, eso representa solo 1.4 litros de líquido perdido —algo que puede suceder en menos de una hora de entrenamiento intenso en clima cálido. En climas tropicales de Colombia, Venezuela, Ecuador o el Caribe, la hidratación es aún más crítica.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              No esperes tener sed para beber: la sed es un indicador tardío de deshidratación. La estrategia correcta es hidratarse de forma preventiva antes del ejercicio, mantener un ritmo regular durante el entrenamiento (cada 10–20 minutos según intensidad), y reponer adecuadamente al terminar.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Una persona de <strong style={{ color: "#FFFFFF" }}>75 kg corriendo 90 minutos a intensidad media en clima cálido (28°C)</strong> necesita:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Antes del ejercicio", value: "750 ml", sub: "500 + 250 ml" },
                { label: "Durante (cada 15 min)", value: "200 ml", sub: "6 tomas totales" },
                { label: "Después del ejercicio", value: "600 ml", sub: "recuperación" },
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
                { q: "¿Agua o bebida isotónica durante el ejercicio?", a: "Para ejercicios de menos de 60 minutos, el agua es suficiente. Para sesiones de más de una hora —especialmente en calor o con alta sudoración— las bebidas isotónicas ayudan a reponer electrolitos (sodio, potasio, magnesio) perdidos con el sudor, previniendo calambres y fatiga. Una alternativa económica es agua de coco o agua con una pizca de sal y jugo de limón." },
                { q: "¿Cómo sé si estoy bien hidratado antes de entrenar?", a: "El indicador más práctico es el color de la orina: amarillo pálido indica buena hidratación; amarillo oscuro o ámbar indica déficit de líquidos. Otra señal es el peso corporal en ayunas: si hay una diferencia mayor al 1-2% respecto al día anterior, puede indicar deshidratación. Toma agua antes del entrenamiento aunque no sientas sed." },
                { q: "¿Es posible tomar demasiada agua durante el ejercicio?", a: "Sí, aunque es poco frecuente. La hiponatremia —exceso de agua que diluye el sodio en sangre— puede ocurrir en atletas de larga distancia que beben agua en exceso sin reponer electrolitos. Para ejercicios normales de 1-2 horas, beber entre 150-300 ml cada 15-20 minutos es una guía segura para la mayoría de las personas." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Complementa tu entrenamiento con nutrición precisa.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/proteina-diaria", label: "Proteína diaria necesaria", desc: "Gramos según tu peso y objetivo" },
                { href: "/deficit-superavit", label: "Déficit y superávit calórico", desc: "TDEE y calorías objetivo" },
                { href: "/metabolismo-cafeina", label: "Metabolización de cafeína", desc: "Cuándo tomar cafeína antes de entrenar" },
                { href: "/calorias-por-alimento", label: "Calorías por alimento", desc: "Macros de 80 alimentos comunes" },
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
