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

const actividadLabels: Record<string, string> = {
  sedentario: "Sedentario (sin ejercicio)",
  ligero: "Ligero (1–3 días/semana)",
  moderado: "Moderado (3–5 días/semana)",
  activo: "Activo (6–7 días/semana)",
  muy_activo: "Muy activo (doble sesión)",
};

export default function GastoCalóricoDiario() {
  const [peso, setPeso] = useState("70");
  const [altura, setAltura] = useState("170");
  const [edad, setEdad] = useState("30");
  const [sexo, setSexo] = useState("masculino");
  const [actividad, setActividad] = useState("moderado");
  const [resultado, setResultado] = useState<{
    tmb: number;
    tdee: number;
    perderPeso: number;
    ganarPeso: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const p = parseFloat(peso) || 0;
    const h = parseFloat(altura) || 0;
    const e = parseInt(edad) || 0;
    if (p <= 0 || h <= 0 || e <= 0) return;
    const tmb = sexo === "masculino"
      ? 10 * p + 6.25 * h - 5 * e + 5
      : 10 * p + 6.25 * h - 5 * e - 161;
    const multipliers: Record<string, number> = { sedentario: 1.2, ligero: 1.375, moderado: 1.55, activo: 1.725, muy_activo: 1.9 };
    const tdee = tmb * multipliers[actividad];
    setResultado({ tmb, tdee, perderPeso: tdee - 500, ganarPeso: tdee + 500 });
  }, [peso, altura, edad, sexo, actividad]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/salud" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Salud</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Gasto calórico diario</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Nutrición</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Gasto calórico diario
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula tu tasa metabólica basal (TMB) y gasto calórico total (TDEE) según tu nivel de actividad física.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Peso</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{peso} kg</span>
                  </div>
                  <input type="number" min="20" max="300" step="0.1" value={peso} onChange={(e) => setPeso(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Altura</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{altura} cm</span>
                  </div>
                  <input type="number" min="100" max="250" step="1" value={altura} onChange={(e) => setAltura(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Edad</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{edad} años</span>
                  </div>
                  <input type="number" min="10" max="100" step="1" value={edad} onChange={(e) => setEdad(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Sexo</label>
                  <select value={sexo} onChange={(e) => setSexo(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Nivel de actividad</label>
                  <select value={actividad} onChange={(e) => setActividad(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    {Object.entries(actividadLabels).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Gasto calórico total diario (TDEE)</p>
                  <p style={{ fontSize: "46px", fontWeight: 600, color: NICHO.light, letterSpacing: "-1px", lineHeight: 1 }}>
                    {fmt(resultado.tdee)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "4px" }}>kcal/día</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>TMB (basal)</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF" }}>{fmt(resultado.tmb)}</p>
                    <p style={{ fontSize: "10px", color: "#EEEEEE" }}>kcal</p>
                  </div>
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Perder peso</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "#D4B85A" }}>{fmt(resultado.perderPeso)}</p>
                    <p style={{ fontSize: "10px", color: "#EEEEEE" }}>kcal</p>
                  </div>
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Ganar masa</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "#74AEDD" }}>{fmt(resultado.ganarPeso)}</p>
                    <p style={{ fontSize: "10px", color: "#EEEEEE" }}>kcal</p>
                  </div>
                </div>
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.6" }}>
                    Para perder peso se resta 500 kcal al TDEE (~0.5 kg/semana). Para ganar masa se suman 500 kcal. Ajusta según tus resultados reales cada 2 semanas.
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus datos y presiona Calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Qué es la TMB y el TDEE
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La Tasa Metabólica Basal (TMB) es la cantidad de calorías que tu cuerpo necesita para mantener sus funciones vitales en reposo total: respirar, bombear sangre, mantener la temperatura corporal y hacer funcionar los órganos. Es la energía mínima que tu cuerpo consume sin hacer nada.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El Gasto Energético Total Diario (TDEE, por sus siglas en inglés) multiplica la TMB por un factor que refleja tu nivel de actividad física. Esta calculadora usa la fórmula de Mifflin-St Jeor, la más precisa disponible para la población general según estudios clínicos recientes.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Conocer tu TDEE es el punto de partida para cualquier objetivo nutricional: si consumes menos calorías, perderás peso; si consumes más, ganarás masa. Es el concepto clave en la planificación nutricional basada en evidencia.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo: persona de 28 años, 65 kg, 165 cm</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "TMB (basal)", value: "1,446 kcal", color: "#FFFFFF" },
                { label: "TDEE moderado", value: "2,241 kcal", color: NICHO.light },
                { label: "Perder peso", value: "1,741 kcal", color: "#D4B85A" },
                { label: "Ganar masa", value: "2,741 kcal", color: "#74AEDD" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px", textAlign: "center" }}>
                  <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: item.color }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Qué tan precisa es la fórmula de Mifflin-St Jeor?", a: "Es la más precisa para adultos en condiciones normales, con un margen de error de ±10%. Fue validada en 1990 y es la recomendada por la Academia de Nutrición y Dietética. Las fórmulas de Harris-Benedict (más antigua) y Katch-McArdle (requiere conocer % de grasa) también son usadas, pero Mifflin es el estándar actual." },
                { q: "¿Cada cuánto debo recalcular mi TDEE?", a: "Se recomienda recalcular cada 4–8 semanas, especialmente si tu peso cambia más de 3–4 kg o si cambias significativamente tu nivel de actividad. El cuerpo se adapta con el tiempo, por lo que el TDEE puede cambiar. Si llevas más de 3 semanas sin ver progreso en tu objetivo, es buen momento para recalcular." },
                { q: "¿Por qué el TDEE sedentario es tan alto?", a: "Aunque el multiplicador sedentario (1.2) es el más bajo, incluso personas sin ejercicio formal gastan energía al caminar, cocinar, trabajar y en actividades cotidianas. La TMB representa solo el 60–75% del gasto total; el resto proviene de estas actividades. Por eso el TDEE sedentario siempre es considerablemente mayor que la TMB." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Explora otras herramientas de salud</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Complementa tu plan nutricional con estas calculadoras.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-macronutrientes", label: "Calculadora de macros", desc: "Proteínas, carbos y grasas según tu objetivo" },
                { href: "/calculadora-imc", label: "Calculadora de IMC", desc: "Verifica tu índice de masa corporal" },
                { href: "/calorias-ejercicio", label: "Calorías por ejercicio", desc: "Cuántas calorías quemas al entrenar" },
                { href: "/agua-diaria-ideal", label: "Agua diaria ideal", desc: "Tu hidratación óptima según actividad" },
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
