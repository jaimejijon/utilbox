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

export default function CalculadoraMacronutrientes() {
  const [peso, setPeso] = useState("70");
  const [altura, setAltura] = useState("170");
  const [edad, setEdad] = useState("30");
  const [sexo, setSexo] = useState("masculino");
  const [actividad, setActividad] = useState("moderado");
  const [objetivo, setObjetivo] = useState("mantener");
  const [resultado, setResultado] = useState<{
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
    pctP: number;
    pctC: number;
    pctG: number;
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
    const objetivoCalc: Record<string, number> = { perder: -500, mantener: 0, ganar: 500 };
    const calorias = tdee + (objetivoCalc[objetivo] || 0);
    const distribuciones: Record<string, { P: number; C: number; G: number }> = {
      perder: { P: 0.35, C: 0.40, G: 0.25 },
      mantener: { P: 0.25, C: 0.50, G: 0.25 },
      ganar: { P: 0.30, C: 0.50, G: 0.20 },
    };
    const dist = distribuciones[objetivo];
    const proteinas = (calorias * dist.P) / 4;
    const carbohidratos = (calorias * dist.C) / 4;
    const grasas = (calorias * dist.G) / 9;
    setResultado({ calorias, proteinas, carbohidratos, grasas, pctP: dist.P, pctC: dist.C, pctG: dist.G });
  }, [peso, altura, edad, sexo, actividad, objetivo]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/salud" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Salud</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de macronutrientes</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Nutrición</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de macronutrientes
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula tus proteínas, carbohidratos y grasas diarias según tu objetivo de peso y nivel de actividad.
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
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Actividad</label>
                  <select value={actividad} onChange={(e) => setActividad(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="sedentario">Sedentario</option>
                    <option value="ligero">Ligero (1–3 días)</option>
                    <option value="moderado">Moderado (3–5 días)</option>
                    <option value="activo">Activo (6–7 días)</option>
                    <option value="muy_activo">Muy activo</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Objetivo</label>
                  <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="perder">Perder peso</option>
                    <option value="mantener">Mantener peso</option>
                    <option value="ganar">Ganar masa muscular</option>
                  </select>
                </div>
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular macros
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Calorías diarias objetivo</p>
                  <p style={{ fontSize: "46px", fontWeight: 600, color: NICHO.light, letterSpacing: "-1px", lineHeight: 1 }}>
                    {fmt(resultado.calorias)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "4px" }}>kcal/día</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Proteínas", value: resultado.proteinas, pct: resultado.pctP, color: NICHO.light },
                    { label: "Carbohidratos", value: resultado.carbohidratos, pct: resultado.pctC, color: "#9AAAF0" },
                    { label: "Grasas", value: resultado.grasas, pct: resultado.pctG, color: "#D4B85A" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                      <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>{m.label}</p>
                      <p style={{ fontSize: "20px", fontWeight: 600, color: m.color }}>{fmt(m.value)}g</p>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginTop: "2px" }}>{Math.round(m.pct * 100)}%</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Distribución de macros</p>
                  <div style={{ display: "flex", height: "12px", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{ width: `${resultado.pctP * 100}%`, background: NICHO.light }} />
                    <div style={{ width: `${resultado.pctC * 100}%`, background: "#9AAAF0" }} />
                    <div style={{ width: `${resultado.pctG * 100}%`, background: "#D4B85A" }} />
                  </div>
                  <div style={{ display: "flex", gap: "12px", marginTop: "8px", flexWrap: "wrap" }}>
                    {[
                      { color: NICHO.light, label: `Proteínas (${Math.round(resultado.pctP * 100)}%)` },
                      { color: "#9AAAF0", label: `Carbos (${Math.round(resultado.pctC * 100)}%)` },
                      { color: "#D4B85A", label: `Grasas (${Math.round(resultado.pctG * 100)}%)` },
                    ].map((item) => (
                      <span key={item.label} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#EEEEEE" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: item.color, display: "block" }} />
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus datos y presiona Calcular macros</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Qué son los macronutrientes y por qué importan
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Los macronutrientes son los tres grandes grupos de nutrientes que proporcionan energía al cuerpo: proteínas, carbohidratos y grasas. Cada uno tiene un papel único. Las proteínas construyen y reparan tejidos musculares. Los carbohidratos son la principal fuente de energía rápida. Las grasas regulan hormonas, protegen órganos y facilitan la absorción de vitaminas liposolubles.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La distribución óptima de macros varía según tu objetivo. Para perder grasa, se aumenta la proteína para preservar músculo mientras se está en déficit calórico. Para ganar músculo, se mantiene una proporción balanceada con superávit calórico. Para mantenimiento, una distribución equilibrada de 25/50/25 es el estándar.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Esta calculadora usa la fórmula de Mifflin-St Jeor para estimar tu gasto calórico total y luego aplica distribuciones de macros basadas en las recomendaciones de nutriología deportiva y clínica para cada objetivo.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo: hombre de 75 kg, moderado, objetivo perder peso</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Calorías", value: "1,900 kcal", color: NICHO.light },
                { label: "Proteínas", value: "166 g", color: "#FFFFFF" },
                { label: "Carbohidratos", value: "190 g", color: "#9AAAF0" },
                { label: "Grasas", value: "53 g", color: "#D4B85A" },
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
                { q: "¿Las grasas realmente hacen engordar?", a: "Las grasas tienen 9 kcal por gramo (vs 4 kcal de proteínas y carbos), por lo que son más densas calóricamente. Pero no hacen engordar por sí mismas: el aumento de peso ocurre cuando el total calórico supera tu gasto. Las grasas saludables (aguacate, aceite de oliva, nueces, pescado graso) son esenciales para la salud hormonal y cardiovascular." },
                { q: "¿Cuánta proteína necesito para ganar músculo?", a: "Las investigaciones muestran que para optimizar la síntesis de proteína muscular se necesitan entre 1.6 y 2.2 gramos de proteína por kilogramo de peso corporal al día. Cantidades superiores a 2.2 g/kg no ofrecen beneficios adicionales para la mayoría de personas. Esta calculadora usa el extremo superior de ese rango en el objetivo de ganar masa." },
                { q: "¿Puedo seguir estos macros exactamente todos los días?", a: "No es necesario ser exacto al gramo cada día. Lo que importa es el promedio semanal. Puedes variar ±10–15% diariamente sin problema. El seguimiento rígido puede ser contraproducente para el bienestar mental. Lo más importante es mantener la consistencia en las calorías totales y asegurarte de cumplir con tu objetivo de proteínas." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Complementa tu plan nutricional</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Más herramientas de salud y nutrición.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/gasto-calorico-diario", label: "Gasto calórico diario", desc: "TMB y TDEE según tu actividad" },
                { href: "/calculadora-imc", label: "Calculadora de IMC", desc: "Verifica tu índice de masa corporal" },
                { href: "/calorias-ejercicio", label: "Calorías por ejercicio", desc: "Cuántas calorías quemas al entrenar" },
                { href: "/agua-diaria-ideal", label: "Agua diaria ideal", desc: "Hidratación óptima según tu peso" },
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
