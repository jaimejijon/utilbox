"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#6EC9A0", light: "#8FD9B6", bg: "#1A3D2E", tint: "#101A14", border: "rgba(110,201,160,0.25)" };

function fmt(n: number) {
  return Math.round(n).toLocaleString("es-MX");
}

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

const MET: Record<string, { baja: number; media: number; alta: number }> = {
  caminar: { baja: 2.5, media: 3.5, alta: 4.5 },
  correr: { baja: 7.0, media: 9.0, alta: 11.0 },
  ciclismo: { baja: 4.0, media: 6.0, alta: 10.0 },
  natacion: { baja: 5.0, media: 7.0, alta: 9.0 },
  pesas: { baja: 3.0, media: 5.0, alta: 6.0 },
  yoga: { baja: 2.0, media: 3.0, alta: 4.0 },
  hiit: { baja: 7.0, media: 9.0, alta: 12.0 },
  futbol: { baja: 5.0, media: 7.0, alta: 9.0 },
  baloncesto: { baja: 5.0, media: 7.0, alta: 8.0 },
  bailar: { baja: 3.0, media: 5.0, alta: 7.0 },
};

const ejercicioLabels: Record<string, string> = {
  caminar: "Caminar",
  correr: "Correr / Trotar",
  ciclismo: "Ciclismo",
  natacion: "Natación",
  pesas: "Pesas / Gym",
  yoga: "Yoga / Pilates",
  hiit: "HIIT",
  futbol: "Fútbol",
  baloncesto: "Baloncesto",
  bailar: "Bailar / Zumba",
};

function getFoodEquiv(calorias: number): { food: string; qty: string }[] {
  const foods = [];
  if (calorias >= 80) foods.push({ food: "Manzana mediana", qty: `${Math.round(calorias / 80)} unidad(es)` });
  if (calorias >= 250) foods.push({ food: "Tacos de pollo (3)", qty: `${(calorias / 250).toFixed(1)} porción(es)` });
  if (calorias >= 150) foods.push({ food: "Coca-Cola (355ml)", qty: `${Math.round(calorias / 150)} lata(s)` });
  return foods.slice(0, 3);
}

export default function CaloriasEjercicio() {
  const [peso, setPeso] = useState("70");
  const [ejercicio, setEjercicio] = useState("correr");
  const [duracion, setDuracion] = useState("30");
  const [intensidad, setIntensidad] = useState("media");
  const [resultado, setResultado] = useState<{
    calorias: number;
    tiempoParaQuemar500: number;
    foods: { food: string; qty: string }[];
  } | null>(null);

  const calcular = useCallback(() => {
    const p = parseFloat(peso) || 0;
    const d = parseFloat(duracion) || 0;
    if (p <= 0 || d <= 0) return;
    const met = MET[ejercicio][intensidad as "baja" | "media" | "alta"];
    const calorias = met * p * (d / 60);
    const tiempoParaQuemar500 = Math.ceil(500 / (met * p / 60));
    const foods = getFoodEquiv(calorias);
    setResultado({ calorias, tiempoParaQuemar500, foods });
  }, [peso, ejercicio, duracion, intensidad]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/salud" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Salud</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calorías quemadas por ejercicio</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Actividad</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calorías quemadas por ejercicio
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula las calorías que quemas según el tipo de ejercicio, duración e intensidad.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="flex flex-col gap-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Peso corporal</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{peso} kg</span>
                  </div>
                  <input type="number" min="20" max="300" step="0.1" value={peso} onChange={(e) => setPeso(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tipo de ejercicio</label>
                  <select value={ejercicio} onChange={(e) => setEjercicio(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    {Object.entries(ejercicioLabels).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Duración</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{duracion} min</span>
                  </div>
                  <input type="number" min="1" max="300" step="1" value={duracion} onChange={(e) => setDuracion(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Intensidad</label>
                  <select value={intensidad} onChange={(e) => setIntensidad(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="baja">Baja (conversación fácil)</option>
                    <option value="media">Media (algo de esfuerzo)</option>
                    <option value="alta">Alta (muy exigente)</option>
                  </select>
                </div>
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular calorías
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Calorías quemadas</p>
                  <p style={{ fontSize: "52px", fontWeight: 600, color: NICHO.light, letterSpacing: "-1px", lineHeight: 1 }}>
                    {fmt(resultado.calorias)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "4px" }}>kcal en {duracion} minutos</p>
                </div>

                <div className="rounded-[10px] p-5" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "4px" }}>Para quemar 500 kcal</p>
                  <p style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF" }}>{resultado.tiempoParaQuemar500} minutos</p>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "2px" }}>de {ejercicioLabels[ejercicio]} a intensidad {intensidad}</p>
                </div>

                {resultado.foods.length > 0 && (
                  <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Equivale aproximadamente a</p>
                    <div className="flex flex-col gap-2">
                      {resultado.foods.map((f) => (
                        <div key={f.food} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "12px", color: "#EEEEEE" }}>{f.food}</span>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: NICHO.light }}>{f.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus datos y presiona Calcular calorías</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo se calculan las calorías quemadas al hacer ejercicio
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El cálculo de calorías quemadas durante el ejercicio se basa en los valores MET (Equivalente Metabólico de Tarea), una medida estandarizada internacionalmente que representa la cantidad de energía que consume una actividad en relación al reposo. Un MET equivale a 1 kcal por kilogramo de peso por hora.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La fórmula es: <strong style={{ color: "#FFFFFF" }}>Calorías = MET × peso (kg) × duración (horas)</strong>. Los valores MET de esta calculadora provienen del Compendio de Actividades Físicas de Ainsworth et al., la referencia más usada en investigación en ciencias del deporte.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Ten en cuenta que estas son estimaciones. El gasto calórico real varía según la forma física individual, la eficiencia del movimiento, la temperatura ambiente y otros factores. Los valores son precisos dentro de un margen de ±15–20% para la mayoría de personas.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Comparativa de ejercicios para persona de 70 kg (30 min)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "HIIT (alta)", value: "315 kcal" },
                { label: "Correr (media)", value: "315 kcal" },
                { label: "Natación (media)", value: "245 kcal" },
                { label: "Ciclismo (media)", value: "210 kcal" },
                { label: "Pesas (media)", value: "175 kcal" },
                { label: "Caminar (media)", value: "122 kcal" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px", textAlign: "center" }}>
                  <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: NICHO.light }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Cuántas calorías debo quemar para perder 1 kg?", a: "Un kilogramo de grasa corporal equivale aproximadamente a 7,700 kcal. Para perder 1 kg por semana necesitarías un déficit de 1,100 kcal diarias, lo cual es mucho y no es sostenible. Lo recomendable es un déficit de 300–500 kcal diarias entre dieta y ejercicio, lo que llevaría a perder 0.3–0.5 kg por semana de forma saludable." },
                { q: "¿El HIIT quema más calorías que el cardio tradicional?", a: "Durante la sesión, el HIIT quema calorías a una tasa similar o mayor que el cardio de alta intensidad continuo. Pero el verdadero beneficio del HIIT es el efecto EPOC (Excess Post-Exercise Oxygen Consumption): el cuerpo sigue quemando más calorías hasta 24–48 horas después de la sesión. El cardio moderado continuo quema más calorías durante la sesión pero el efecto post-ejercicio es menor." },
                { q: "¿Las pulsaciones del corazón afectan las calorías quemadas?", a: "Sí. Las zonas de frecuencia cardíaca son otra forma de estimar la intensidad del ejercicio. La zona aeróbica (70–80% de FCmax) quema un alto porcentaje de grasas. La zona anaeróbica (80–90%) quema más calorías totales pero de principalmente glucógeno. Esta calculadora usa los valores MET como proxy de la intensidad, lo cual es equivalente y más fácil de usar sin monitor cardíaco." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Más herramientas de salud</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Complementa tu rutina con estas calculadoras.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/gasto-calorico-diario", label: "Gasto calórico diario", desc: "TMB y TDEE según tu actividad" },
                { href: "/calculadora-macronutrientes", label: "Calculadora de macros", desc: "Distribuye proteínas, carbos y grasas" },
                { href: "/calculadora-imc", label: "Calculadora de IMC", desc: "Verifica tu índice de masa corporal" },
                { href: "/peso-ideal", label: "Calculadora de peso ideal", desc: "Tu peso objetivo según 3 fórmulas" },
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
