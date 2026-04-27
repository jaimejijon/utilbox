"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4B85A", light: "#E2CC7D", bg: "#332B0F", tint: "#181408", border: "rgba(212,184,90,0.25)" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type Actividad = "sedentario" | "ligero" | "moderado" | "activo" | "muy_activo";
type MetaObjetivo = "perder" | "ganar";

const ACT_MULT: Record<Actividad, number> = {
  sedentario: 1.2, ligero: 1.375, moderado: 1.55, activo: 1.725, muy_activo: 1.9,
};

export default function DeficitSuperavit() {
  const [peso, setPeso] = useState("75");
  const [altura, setAltura] = useState("170");
  const [edad, setEdad] = useState("28");
  const [sexo, setSexo] = useState("masculino");
  const [actividad, setActividad] = useState<Actividad>("moderado");
  const [metaObjetivo, setMetaObjetivo] = useState<MetaObjetivo>("perder");
  const [kgMeta, setKgMeta] = useState("5");
  const [semanas, setSemanas] = useState("10");

  const [resultado, setResultado] = useState<{
    bmr: number; tdee: number; calorias: number;
    diferencia: number; proyeccion: { semana: number; peso: number }[];
    advertencia: string | null; tipo: MetaObjetivo;
    pesoFinal: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const p = parseFloat(peso) || 0;
    const h = parseFloat(altura) || 0;
    const a = parseFloat(edad) || 0;
    const kg = parseFloat(kgMeta) || 0;
    const sem = parseInt(semanas) || 0;
    if (p <= 0 || h <= 0 || a <= 0 || kg <= 0 || sem <= 0) return;

    const bmr = sexo === "masculino"
      ? 10 * p + 6.25 * h - 5 * a + 5
      : 10 * p + 6.25 * h - 5 * a - 161;
    const tdee = Math.round(bmr * ACT_MULT[actividad]);

    const kcalPorKg = 7700;
    const diferenciaDiaria = Math.round((kg * kcalPorKg) / (sem * 7));
    const calorias = metaObjetivo === "perder"
      ? tdee - diferenciaDiaria
      : tdee + diferenciaDiaria;

    const minKcal = sexo === "masculino" ? 1500 : 1200;
    let advertencia: string | null = null;
    if (metaObjetivo === "perder" && calorias < minKcal) {
      advertencia = `Tu déficit es demasiado agresivo. El mínimo recomendado para ${sexo === "masculino" ? "hombres" : "mujeres"} es ${minKcal} kcal/día. Considera ampliar el plazo o reducir la meta de kg.`;
    }
    if (metaObjetivo === "perder" && diferenciaDiaria > 1000) {
      advertencia = advertencia || "Un déficit mayor a 1000 kcal/día puede causar pérdida de masa muscular. Considera un déficit más moderado (500-750 kcal/día).";
    }
    if (metaObjetivo === "ganar" && diferenciaDiaria > 500) {
      advertencia = "Un superávit mayor a 500 kcal/día favorece el aumento de grasa. Se recomienda un superávit de 200-400 kcal/día para un volumen limpio.";
    }

    const kgPorSemana = (kg / sem) * (metaObjetivo === "perder" ? -1 : 1);
    const proyeccion = Array.from({ length: Math.min(sem, 16) + 1 }, (_, i) => ({
      semana: i,
      peso: parseFloat((p + kgPorSemana * i).toFixed(1)),
    }));

    setResultado({ bmr: Math.round(bmr), tdee, calorias, diferencia: diferenciaDiaria, proyeccion, advertencia, tipo: metaObjetivo, pesoFinal: parseFloat((p + kgPorSemana * sem).toFixed(1)) });
  }, [peso, altura, edad, sexo, actividad, metaObjetivo, kgMeta, semanas]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/nutricion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Nutrición</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Déficit y superávit calórico</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Calorías</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Déficit y superávit calórico
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula tu gasto calórico total (TDEE) y las calorías diarias necesarias para perder o ganar peso según tu meta y plazo.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Peso", unit: "kg", val: peso, set: setPeso, min: "30", max: "250", step: "0.5" },
                  { label: "Altura", unit: "cm", val: altura, set: setAltura, min: "100", max: "250", step: "1" },
                  { label: "Edad", unit: "años", val: edad, set: setEdad, min: "15", max: "90", step: "1" },
                ].map((f) => (
                  <div key={f.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>{f.label}</label>
                      <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{f.val} {f.unit}</span>
                    </div>
                    <input type="number" min={f.min} max={f.max} step={f.step} value={f.val} onChange={(e) => f.set(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Sexo</label>
                  <select value={sexo} onChange={(e) => setSexo(e.target.value)}
                    style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Nivel de actividad</label>
                <select value={actividad} onChange={(e) => setActividad(e.target.value as Actividad)}
                  style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                  <option value="sedentario">Sedentario (sin ejercicio)</option>
                  <option value="ligero">Ligero (1-2 días/sem)</option>
                  <option value="moderado">Moderado (3-4 días/sem)</option>
                  <option value="activo">Activo (5-6 días/sem)</option>
                  <option value="muy_activo">Muy activo (2 veces/día)</option>
                </select>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Objetivo</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setMetaObjetivo("perder")}
                    style={{ padding: "8px", borderRadius: "7px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", background: metaObjetivo === "perder" ? NICHO.color : "#0F1117", color: metaObjetivo === "perder" ? "#0F1117" : "#EEEEEE" }}>
                    Perder peso
                  </button>
                  <button onClick={() => setMetaObjetivo("ganar")}
                    style={{ padding: "8px", borderRadius: "7px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", background: metaObjetivo === "ganar" ? NICHO.color : "#0F1117", color: metaObjetivo === "ganar" ? "#0F1117" : "#EEEEEE" }}>
                    Ganar peso / músculo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>
                      {metaObjetivo === "perder" ? "Kg a perder" : "Kg a ganar"}
                    </label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{kgMeta} kg</span>
                  </div>
                  <input type="number" min="0.5" max="50" step="0.5" value={kgMeta} onChange={(e) => setKgMeta(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>En cuántas semanas</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{semanas} sem</span>
                  </div>
                  <input type="number" min="1" max="52" step="1" value={semanas} onChange={(e) => setSemanas(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>

              <button onClick={calcular} className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#0F1117", border: "none", cursor: "pointer" }}>
                Calcular déficit / superávit
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-3">
                {resultado.advertencia && (
                  <div style={{ background: "#2A1A0F", border: "0.5px solid #E07070", borderRadius: "10px", padding: "12px 14px" }}>
                    <p style={{ fontSize: "12px", color: "#E07070", lineHeight: "1.6" }}>⚠ {resultado.advertencia}</p>
                  </div>
                )}

                <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "16px 20px", textAlign: "center" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Calorías diarias objetivo</p>
                  <p style={{ fontSize: "48px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>{resultado.calorias.toLocaleString("es-MX")}</p>
                  <p style={{ fontSize: "13px", color: NICHO.light }}>kcal / día</p>
                  <p style={{ fontSize: "11px", color: "#888", marginTop: "4px" }}>
                    {resultado.tipo === "perder" ? `${resultado.diferencia} kcal/día menos` : `${resultado.diferencia} kcal/día más`} que tu TDEE
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "TMB / BMR", val: resultado.bmr.toLocaleString("es-MX"), unit: "kcal", desc: "Metabolismo basal" },
                    { label: "TDEE", val: resultado.tdee.toLocaleString("es-MX"), unit: "kcal", desc: "Con tu actividad" },
                    { label: "Peso final", val: resultado.pesoFinal.toString(), unit: "kg", desc: `En ${semanas} semanas` },
                  ].map((f) => (
                    <div key={f.label} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{f.label}</p>
                      <p style={{ fontSize: "16px", fontWeight: 600, color: NICHO.light }}>{f.val}<span style={{ fontSize: "10px", color: "#888" }}> {f.unit}</span></p>
                      <p style={{ fontSize: "10px", color: "#888" }}>{f.desc}</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Proyección de peso</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {resultado.proyeccion.map((p) => {
                      const maxPeso = Math.max(...resultado.proyeccion.map((x) => x.peso));
                      const minPeso = Math.min(...resultado.proyeccion.map((x) => x.peso));
                      const range = maxPeso - minPeso || 1;
                      const barPct = resultado.tipo === "perder"
                        ? ((p.peso - minPeso) / range) * 100
                        : ((p.peso - minPeso) / range) * 100;
                      return (
                        <div key={p.semana} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "10px", color: "#888", width: "48px", textAlign: "right", flexShrink: 0 }}>Sem {p.semana}</span>
                          <div style={{ flex: 1, height: "6px", background: "#0F1117", borderRadius: "999px", overflow: "hidden" }}>
                            <div style={{ width: `${barPct}%`, height: "100%", background: resultado.tipo === "perder" ? "#6EC9A0" : NICHO.color, borderRadius: "999px" }} />
                          </div>
                          <span style={{ fontSize: "10px", color: NICHO.light, fontWeight: 600, width: "48px", flexShrink: 0 }}>{p.peso} kg</span>
                        </div>
                      );
                    })}
                  </div>
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

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              TDEE, déficit y superávit: cómo funciona la pérdida y ganancia de peso
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El gasto energético total diario (TDEE) es la cantidad de calorías que tu cuerpo necesita para mantener su peso actual. Si consumes menos que tu TDEE, creas un déficit calórico y pierdes peso. Si consumes más, creas un superávit y ganas peso. 1 kg de grasa equivale aproximadamente a 7,700 kcal, lo que permite calcular con precisión cuánto tiempo tomará alcanzar tu meta.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              La fórmula de Mifflin-St Jeor, usada en esta calculadora, es considerada la más precisa para calcular el metabolismo basal en la actualidad. Ajusta el resultado según tu nivel de actividad física real para obtener el TDEE más cercano a tu realidad.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Mujer de <strong style={{ color: "#FFFFFF" }}>65 kg, 162 cm, 30 años, actividad moderada, quiere perder 5 kg en 12 semanas</strong>:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "TDEE calculado", value: "2,050 kcal", sub: "mantenimiento" },
                { label: "Déficit diario", value: "456 kcal", sub: "5kg ÷ 84 días" },
                { label: "Meta calórica", value: "1,594 kcal", sub: "por día" },
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
                { q: "¿Es seguro un déficit de 1000 kcal/día para perder peso más rápido?", a: "No se recomienda para la mayoría de las personas. Un déficit mayor a 500-750 kcal/día aumenta el riesgo de perder masa muscular, experimentar fatiga, deficiencias nutricionales y el efecto rebote posterior. La pérdida recomendada es de 0.5-1 kg por semana. Déficits muy agresivos son difíciles de mantener y suelen llevar a ciclos de dieta yo-yo." },
                { q: "¿Por qué mi peso no baja aunque estoy en déficit calórico?", a: "Varias razones: retención de líquidos (especialmente en las primeras semanas), variaciones del ciclo menstrual, mayor consumo real de calorías del que se estima, errores al medir porciones, o un TDEE menor al calculado por la fórmula. El TDEE teórico es una estimación. Si después de 3-4 semanas no hay cambios, considera reducir 100-150 kcal adicionales o aumentar actividad física." },
                { q: "¿Cuántas calorías de superávit necesito para ganar músculo sin engordar?", a: "Un superávit limpio de 200-400 kcal/día es suficiente para ganar músculo minimizando la acumulación de grasa. Ganar más de 0.25-0.5 kg de músculo por semana (sin grasa) no es posible fisiológicamente —el exceso se convierte en grasa. Los principiantes pueden ganar algo más rápido durante los primeros 6-12 meses de entrenamiento." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Complementa tu plan de nutrición.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/proteina-diaria", label: "Proteína diaria necesaria", desc: "Gramos según tu objetivo" },
                { href: "/calorias-por-alimento", label: "Calorías por alimento", desc: "Macros de 80 alimentos comunes" },
                { href: "/porciones-alimenticias", label: "Porciones por grupo alimenticio", desc: "Distribución diaria recomendada" },
                { href: "/ayuno-intermitente", label: "Ayuno intermitente", desc: "Ventanas de ayuno y alimentación" },
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
