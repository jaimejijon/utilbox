"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4B85A", light: "#E2CC7D", bg: "#332B0F", tint: "#181408", border: "rgba(212,184,90,0.25)" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type Actividad = "sedentario" | "ligero" | "moderado" | "activo" | "muy_activo";
type Objetivo = "perder_grasa" | "mantener" | "ganar_musculo" | "rendimiento";

const ACTIVIDAD_LABELS: Record<Actividad, string> = {
  sedentario: "Sedentario (sin ejercicio)",
  ligero: "Ligero (1-2 días/sem)",
  moderado: "Moderado (3-4 días/sem)",
  activo: "Activo (5-6 días/sem)",
  muy_activo: "Muy activo (2 veces/día)",
};

const OBJETIVO_LABELS: Record<Objetivo, string> = {
  perder_grasa: "Perder grasa",
  mantener: "Mantener peso",
  ganar_musculo: "Ganar músculo",
  rendimiento: "Rendimiento deportivo",
};

const BASE_FACTOR: Record<Objetivo, number> = {
  perder_grasa: 2.0,
  mantener: 1.4,
  ganar_musculo: 1.8,
  rendimiento: 1.6,
};

const ACT_MULT: Record<Actividad, number> = {
  sedentario: 0.85,
  ligero: 0.90,
  moderado: 1.0,
  activo: 1.05,
  muy_activo: 1.10,
};

export default function ProteinaDiaria() {
  const [peso, setPeso] = useState("70");
  const [altura, setAltura] = useState("170");
  const [edad, setEdad] = useState("28");
  const [sexo, setSexo] = useState("masculino");
  const [actividad, setActividad] = useState<Actividad>("moderado");
  const [objetivo, setObjetivo] = useState<Objetivo>("mantener");

  const [resultado, setResultado] = useState<{
    oms: number; recomendado: number; issn: number;
    pollo: number; huevos: number; atun: number; legumbres: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const p = parseFloat(peso) || 0;
    if (p <= 0) return;
    const oms = Math.round(0.8 * p);
    const factor = BASE_FACTOR[objetivo] * ACT_MULT[actividad];
    const recomendado = Math.round(factor * p);
    const issnMax = Math.round(factor * p * 1.1);
    const pollo = Math.round((recomendado / 31) * 100);
    const huevos = Math.round(recomendado / 6);
    const atun = Math.round((recomendado / 25.5) * 100);
    const legumbres = Math.round((recomendado / 8.9) * 100);
    setResultado({ oms, recomendado, issn: issnMax, pollo, huevos, atun, legumbres });
  }, [peso, altura, edad, sexo, actividad, objetivo]);

  const fmt = (n: number) => n.toLocaleString("es-MX");

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/nutricion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Nutrición</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Proteína diaria necesaria</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Macros</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Proteína diaria necesaria
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula cuántos gramos de proteína necesitas cada día según tu peso, nivel de actividad y objetivo. Incluye equivalencias prácticas en alimentos.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Peso</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{peso} kg</span>
                  </div>
                  <input type="number" min="30" max="250" step="0.5" value={peso} onChange={(e) => setPeso(e.target.value)}
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
                  <input type="number" min="15" max="90" step="1" value={edad} onChange={(e) => setEdad(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
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
                  {(Object.entries(ACTIVIDAD_LABELS) as [Actividad, string][]).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Objetivo</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(OBJETIVO_LABELS) as [Objetivo, string][]).map(([val, label]) => (
                    <button key={val} onClick={() => setObjetivo(val)}
                      style={{ padding: "8px 6px", borderRadius: "7px", fontSize: "11px", fontWeight: 600, border: "none", cursor: "pointer", background: objetivo === val ? NICHO.color : "#0F1117", color: objetivo === val ? "#0F1117" : "#EEEEEE", transition: "all 0.15s", lineHeight: 1.3 }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={calcular} className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#0F1117", border: "none", cursor: "pointer" }}>
                Calcular proteína
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "20px", textAlign: "center" }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Tu meta diaria de proteína</p>
                  <p style={{ fontSize: "52px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>{resultado.recomendado}</p>
                  <p style={{ fontSize: "14px", color: NICHO.light, marginTop: "4px" }}>gramos / día</p>
                  <p style={{ fontSize: "11px", color: "#888", marginTop: "6px" }}>
                    {(resultado.recomendado / (parseFloat(peso) || 1)).toFixed(1)} g por kg de peso corporal
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Mínimo OMS", val: resultado.oms, desc: "0.8 g/kg", color: "#888" },
                    { label: "Recomendado", val: resultado.recomendado, desc: "Tu objetivo", color: NICHO.color },
                    { label: "Máximo ISSN", val: resultado.issn, desc: "Deportistas élite", color: "#74AEDD" },
                  ].map((f) => (
                    <div key={f.label} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{f.label}</p>
                      <p style={{ fontSize: "18px", fontWeight: 600, color: f.color }}>{f.val}g</p>
                      <p style={{ fontSize: "10px", color: "#888" }}>{f.desc}</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "12px" }}>Equivale aproximadamente a…</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { icon: "🍗", label: "Pechuga de pollo cocida", val: resultado.pollo, unit: "g", sub: `~${Math.round(resultado.pollo / 150)} pechugas medianas` },
                      { icon: "🥚", label: "Huevos enteros", val: resultado.huevos, unit: "huevos", sub: `(~6g proteína c/u)` },
                      { icon: "🐟", label: "Atún en agua", val: resultado.atun, unit: "g", sub: `~${Math.round(resultado.atun / 140)} latas de 140g` },
                      { icon: "🫘", label: "Frijoles cocidos", val: resultado.legumbres, unit: "g", sub: `(para vegetarianos)` },
                    ].map((e) => (
                      <div key={e.label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", background: "#0F1117", borderRadius: "8px" }}>
                        <span style={{ fontSize: "18px", flexShrink: 0 }}>{e.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: "12px", color: "#FFFFFF", fontWeight: 600 }}>{e.label}</p>
                          <p style={{ fontSize: "11px", color: "#888" }}>{e.sub}</p>
                        </div>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: NICHO.light, flexShrink: 0 }}>{fmt(e.val)} {e.unit}</p>
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
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus datos y presiona Calcular proteína</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Por qué la proteína es el macronutriente más importante
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La proteína es esencial para construir y reparar tejidos, producir enzimas y hormonas, y mantener el sistema inmunológico. A diferencia de los carbohidratos y las grasas, el cuerpo no almacena proteína de reserva, por lo que necesita obtenerla diariamente de la dieta. La cantidad necesaria varía según el peso corporal, nivel de actividad y objetivo personal.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              La OMS establece un mínimo de 0.8 g por kg de peso corporal para adultos sedentarios. Sin embargo, la ciencia deportiva moderna —representada por el ISSN (International Society of Sports Nutrition)— recomienda entre 1.6 y 2.2 g/kg para personas que buscan ganar músculo o mejorar su composición corporal. En México, Colombia, Chile, Perú y Argentina, las fuentes de proteína más accesibles incluyen frijoles, pollo, huevo, atún y lácteos.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Una persona de <strong style={{ color: "#FFFFFF" }}>75 kg, activa, con objetivo de ganar músculo</strong> necesita:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Meta de proteína", value: "135g/día", sub: "1.8 g/kg × 75 kg" },
                { label: "En pechuga de pollo", value: "435g", sub: "≈ 3 pechugas med." },
                { label: "En huevos (solo)", value: "22 huevos", sub: "no recomendado solo" },
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
                { q: "¿Puedo obtener suficiente proteína siendo vegetariano?", a: "Sí, pero requiere planificación. Las mejores fuentes vegetales son soya, tofu, tempeh, legumbres (frijoles, lentejas, garbanzos), quinoa, seitan y lácteos. La clave es combinar diferentes fuentes para obtener todos los aminoácidos esenciales. Los vegetarianos pueden necesitar un 10-20% más de proteína total porque las fuentes vegetales tienen menor digestibilidad que las animales." },
                { q: "¿Qué pasa si como demasiada proteína?", a: "En personas sanas con riñones funcionando correctamente, el exceso de proteína se convierte en energía o se excreta. No existen evidencias de daño renal en personas sanas consumiendo hasta 3g/kg/día. Sin embargo, consumir proteína en exceso por encima de las necesidades no genera beneficio adicional y puede desplazar otros macronutrientes importantes de la dieta." },
                { q: "¿La proteína de suplemento (whey) es mejor que la de alimentos naturales?", a: "No necesariamente. El whey es una fuente conveniente con alto valor biológico, pero no es superior a fuentes enteras como pechuga de pollo o clara de huevo en términos de ganancia muscular cuando la ingesta total de proteína es la misma. Los alimentos enteros tienen el beneficio adicional de aportar vitaminas, minerales y otros nutrientes." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Completa tu plan nutricional.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/deficit-superavit", label: "Déficit y superávit calórico", desc: "Calorías totales según tu meta" },
                { href: "/calorias-por-alimento", label: "Calorías por alimento", desc: "Macros completos de 80 alimentos" },
                { href: "/porciones-alimenticias", label: "Porciones por grupo alimenticio", desc: "Distribución diaria recomendada" },
                { href: "/costo-nutricional-receta", label: "Costo nutricional por receta", desc: "Precio y macros de tus recetas" },
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
