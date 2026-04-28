"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4B85A", light: "#E2CC7D", bg: "#332B0F", tint: "#181408", border: "rgba(212,184,90,0.25)" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type GIFood = { name: string; gi: number; carbs: number; portion: number };
type Perfil = "general" | "diabetes" | "perder_peso" | "deportista";

const GI_DB: GIFood[] = [
  { name: "Glucosa pura", gi: 100, carbs: 100, portion: 50 },
  { name: "Arroz blanco cocido", gi: 72, carbs: 28, portion: 150 },
  { name: "Papa cocida", gi: 78, carbs: 20, portion: 150 },
  { name: "Papa al horno", gi: 85, carbs: 22, portion: 150 },
  { name: "Corn flakes / Granola de maíz", gi: 81, carbs: 84, portion: 30 },
  { name: "Pan blanco", gi: 75, carbs: 49, portion: 30 },
  { name: "Sandía", gi: 76, carbs: 8, portion: 120 },
  { name: "Avena instantánea", gi: 83, carbs: 71, portion: 30 },
  { name: "Palomitas de maíz", gi: 72, carbs: 78, portion: 20 },
  { name: "Azúcar blanca (sacarosa)", gi: 65, carbs: 100, portion: 10 },
  { name: "Miel de abeja", gi: 61, carbs: 82, portion: 25 },
  { name: "Piña", gi: 59, carbs: 13, portion: 120 },
  { name: "Uvas", gi: 59, carbs: 18, portion: 120 },
  { name: "Coca-Cola / refresco azucarado", gi: 63, carbs: 11, portion: 250 },
  { name: "Papas fritas (chips)", gi: 63, carbs: 53, portion: 30 },
  { name: "Camote / Batata cocida", gi: 63, carbs: 20, portion: 150 },
  { name: "Granola horneada", gi: 62, carbs: 57, portion: 50 },
  { name: "Pasta muy cocida", gi: 61, carbs: 31, portion: 180 },
  { name: "Papaya", gi: 60, carbs: 11, portion: 120 },
  { name: "Pan de centeno", gi: 41, carbs: 48, portion: 30 },
  { name: "Avena cocida (porridge)", gi: 55, carbs: 12, portion: 250 },
  { name: "Quinoa cocida", gi: 53, carbs: 21, portion: 150 },
  { name: "Maíz cocido", gi: 52, carbs: 21, portion: 150 },
  { name: "Tortilla de maíz", gi: 52, carbs: 45, portion: 50 },
  { name: "Banana / Plátano maduro", gi: 51, carbs: 23, portion: 120 },
  { name: "Mango", gi: 51, carbs: 15, portion: 120 },
  { name: "Helado de vainilla", gi: 51, carbs: 24, portion: 100 },
  { name: "Arroz integral cocido", gi: 50, carbs: 23, portion: 150 },
  { name: "Jugo de naranja natural", gi: 50, carbs: 10, portion: 250 },
  { name: "Pan integral de trigo", gi: 51, carbs: 41, portion: 30 },
  { name: "Pasta cocida (al dente)", gi: 49, carbs: 31, portion: 180 },
  { name: "Kiwi", gi: 50, carbs: 15, portion: 120 },
  { name: "Tortilla de trigo", gi: 30, carbs: 54, portion: 50 },
  { name: "Naranja", gi: 43, carbs: 12, portion: 120 },
  { name: "Durazno / Melocotón", gi: 42, carbs: 10, portion: 120 },
  { name: "Fresa / Frutilla", gi: 41, carbs: 8, portion: 120 },
  { name: "Chocolate negro 70%", gi: 40, carbs: 46, portion: 30 },
  { name: "Plátano verde / macho", gi: 40, carbs: 30, portion: 120 },
  { name: "Zanahoria cruda", gi: 39, carbs: 10, portion: 80 },
  { name: "Leche entera", gi: 39, carbs: 5, portion: 250 },
  { name: "Pera", gi: 38, carbs: 15, portion: 120 },
  { name: "Manzana", gi: 36, carbs: 14, portion: 120 },
  { name: "Leche de soya", gi: 34, carbs: 1, portion: 250 },
  { name: "Yogur natural", gi: 36, carbs: 5, portion: 200 },
  { name: "Lentejas cocidas", gi: 29, carbs: 20, portion: 150 },
  { name: "Garbanzo cocido", gi: 28, carbs: 27, portion: 150 },
  { name: "Frijoles / Porotos cocidos", gi: 29, carbs: 23, portion: 150 },
  { name: "Ciruela", gi: 40, carbs: 12, portion: 120 },
  { name: "Cereza", gi: 22, carbs: 12, portion: 120 },
  { name: "Pomelo / Toronja", gi: 25, carbs: 9, portion: 120 },
  { name: "Yuca cocida", gi: 46, carbs: 38, portion: 150 },
  { name: "Soya cocida", gi: 15, carbs: 10, portion: 150 },
  { name: "Brócoli", gi: 15, carbs: 7, portion: 80 },
  { name: "Lechuga", gi: 15, carbs: 3, portion: 80 },
  { name: "Tomate", gi: 15, carbs: 4, portion: 120 },
  { name: "Espinaca", gi: 15, carbs: 4, portion: 80 },
  { name: "Pepino", gi: 15, carbs: 4, portion: 80 },
  { name: "Cebolla", gi: 10, carbs: 9, portion: 80 },
  { name: "Arroz con leche", gi: 75, carbs: 28, portion: 150 },
  { name: "Galletas de soda / crackers", gi: 74, carbs: 68, portion: 25 },
];

const igColor = (gi: number) => gi < 55 ? "#6EC9A0" : gi <= 70 ? "#D4B85A" : "#E07070";
const igLabel = (gi: number) => gi < 55 ? "Bajo" : gi <= 70 ? "Medio" : "Alto";

const glColor = (gl: number) => gl < 10 ? "#6EC9A0" : gl <= 19 ? "#D4B85A" : "#E07070";
const glLabel = (gl: number) => gl < 10 ? "Baja" : gl <= 19 ? "Media" : "Alta";

const RECOMENDACIONES: Record<Perfil, Record<string, string>> = {
  general: {
    Bajo: "Excelente elección. Los alimentos de IG bajo liberan energía de forma gradual y mantienen la saciedad más tiempo.",
    Medio: "Consumo moderado recomendado. Combínalo con proteínas o grasas saludables para reducir la respuesta glucémica.",
    Alto: "Consumo ocasional. Prefiere versiones integrales o acompáñalo con fibra, proteína y grasa para moderar el impacto.",
  },
  diabetes: {
    Bajo: "Ideal para personas con diabetes. Produce un aumento lento y controlado de la glucosa en sangre.",
    Medio: "Consumir con precaución. Controla la porción y combina con proteínas o vegetales de hoja verde.",
    Alto: "Evitar o limitar significativamente. Este alimento puede causar picos de glucosa peligrosos en personas con diabetes.",
  },
  perder_peso: {
    Bajo: "Excelente para perder peso. Los alimentos de IG bajo aumentan la saciedad y reducen el apetito entre comidas.",
    Medio: "Aceptable en cantidades moderadas. Controla la porción y prioriza alimentos de IG bajo en tu dieta habitual.",
    Alto: "Limitar su consumo. Los alimentos de IG alto pueden provocar hambre poco tiempo después de comer.",
  },
  deportista: {
    Bajo: "Ideal antes del entrenamiento (2-3h antes) para energía sostenida durante el ejercicio prolongado.",
    Medio: "Buena opción pre-entrenamiento. También útil durante ejercicios de larga duración.",
    Alto: "Consumo estratégico post-entrenamiento para reponer glucógeno muscular rápidamente después de ejercicio intenso.",
  },
};

export default function IndiceGlucemico() {
  const [selectedName, setSelectedName] = useState("");
  const [portion, setPortion] = useState("");
  const [perfil, setPerfil] = useState<Perfil>("general");
  const [resultado, setResultado] = useState<{
    food: GIFood; gl: number; igColor: string; igLabel: string; glColor: string; glLabel: string; recomendacion: string; porcionUsada: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const food = GI_DB.find((f) => f.name === selectedName);
    if (!food) return;
    const g = parseFloat(portion) || food.portion;
    const gl = (food.gi * food.carbs * g) / 10000;
    const col = igColor(food.gi);
    const lbl = igLabel(food.gi);
    setResultado({
      food, gl, igColor: col, igLabel: lbl,
      glColor: glColor(gl), glLabel: glLabel(gl),
      recomendacion: RECOMENDACIONES[perfil][lbl],
      porcionUsada: g,
    });
  }, [selectedName, portion, perfil]);

  return (
    <>
      <ToolSchema
        name="Índice glucémico y carga glucémica por alimento"
        description="Consulta el índice glucémico y la carga glucémica de 60+ alimentos. Ajusta la porción y descubre el impacto real en tu glucosa según tu objetivo: diabetes, perder peso o rendimiento deportivo."
        url="https://utilbox.lat/indice-glucemico"
        category="Nutrición"
        faqItems={[
          { q: "¿El índice glucémico cambia al cocinar los alimentos?", a: "Sí, significativamente. La pasta cocida al dente tiene IG de 49, mientras que la misma pasta muy cocida puede llegar a 61. El arroz recalentado después de refrigerado tiene menor IG que el recién cocido porque se forma almidón resistente. El método de cocción también importa: la papa al horno tiene IG de 85, pero una papa cocida entera tiene 78." },
          { q: "¿Sirve de algo combinar alimentos de IG alto con otros alimentos?", a: "Sí, mucho. Añadir proteínas (pollo, huevo), grasas saludables (aguacate, aceite de oliva) o fibra (verduras) a un alimento de IG alto reduce significativamente la respuesta glucémica total de la comida. Por eso un plato completo —arroz, pollo y ensalada— tiene un impacto glucémico mucho menor que comer solo el arroz." },
          { q: "¿Debo evitar todos los alimentos de IG alto?", a: "No necesariamente. El contexto importa: los deportistas pueden beneficiarse de alimentos de IG alto inmediatamente después del ejercicio para reponer glucógeno muscular. En personas sanas sin problemas metabólicos, priorizar alimentos de IG bajo es una guía útil, no una regla absoluta. La carga glucémica total del día es lo que más impacta en la salud." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/nutricion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Nutrición</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Índice glucémico</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Macros</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Índice glucémico de alimentos
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Consulta el índice glucémico (IG) y la carga glucémica (CG) de los alimentos más comunes. Obtén recomendaciones según tu objetivo.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Alimento</label>
                <select value={selectedName} onChange={(e) => setSelectedName(e.target.value)}
                  style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; }}>
                  <option value="">— Selecciona un alimento —</option>
                  {GI_DB.sort((a, b) => a.name.localeCompare(b.name)).map((f) => (
                    <option key={f.name} value={f.name}>{f.name} (IG: {f.gi})</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Porción (gramos)</label>
                  {selectedName && (
                    <span style={{ fontSize: "11px", color: "#888" }}>
                      Estándar: {GI_DB.find((f) => f.name === selectedName)?.portion}g
                    </span>
                  )}
                </div>
                <input type="number" min="1" max="1000" value={portion}
                  onChange={(e) => setPortion(e.target.value)}
                  placeholder={selectedName ? `${GI_DB.find((f) => f.name === selectedName)?.portion || 100}g por defecto` : ""}
                  className={inputClass} style={{ ...inputStyle, outline: "none" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Mi objetivo</label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { val: "general", label: "General" },
                    { val: "diabetes", label: "Diabetes" },
                    { val: "perder_peso", label: "Perder peso" },
                    { val: "deportista", label: "Deportista" },
                  ] as { val: Perfil; label: string }[]).map((o) => (
                    <button key={o.val} onClick={() => setPerfil(o.val)}
                      style={{ padding: "8px", borderRadius: "7px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", background: perfil === o.val ? NICHO.color : "#0F1117", color: perfil === o.val ? "#0F1117" : "#EEEEEE", transition: "all 0.15s" }}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={calcular} disabled={!selectedName}
                className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: selectedName ? NICHO.color : "#1E2030", color: selectedName ? "#0F1117" : "#555", border: "none", cursor: selectedName ? "pointer" : "not-allowed" }}>
                Ver índice glucémico
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "20px", textAlign: "center" }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>{resultado.food.name}</p>
                  <p style={{ fontSize: "56px", fontWeight: 600, color: resultado.igColor, letterSpacing: "-2px", lineHeight: 1 }}>{resultado.food.gi}</p>
                  <span style={{ display: "inline-block", marginTop: "8px", background: resultado.igColor + "22", border: `0.5px solid ${resultado.igColor}44`, borderRadius: "999px", padding: "3px 14px", fontSize: "12px", fontWeight: 600, color: resultado.igColor }}>
                    IG {resultado.igLabel}
                  </span>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Escala de índice glucémico</p>
                  <div style={{ position: "relative", height: "14px", borderRadius: "999px", overflow: "hidden", display: "flex" }}>
                    <div style={{ flex: 55, background: "#6EC9A0" }} />
                    <div style={{ flex: 15, background: "#D4B85A" }} />
                    <div style={{ flex: 30, background: "#E07070" }} />
                  </div>
                  <div style={{ position: "relative", marginTop: "4px", height: "16px" }}>
                    <div style={{ position: "absolute", left: `${Math.min(resultado.food.gi, 100)}%`, transform: "translateX(-50%)" }}>
                      <div style={{ width: "2px", height: "8px", background: "#FFFFFF", margin: "0 auto" }} />
                      <span style={{ fontSize: "10px", color: "#FFFFFF", fontWeight: 600, whiteSpace: "nowrap" }}>{resultado.food.gi}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#EEEEEE", marginTop: "14px" }}>
                    <span>0</span><span>55 (bajo)</span><span>70 (medio)</span><span>100+</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Carga glucémica</p>
                    <p style={{ fontSize: "24px", fontWeight: 600, color: resultado.glColor, lineHeight: 1 }}>{resultado.gl.toFixed(1)}</p>
                    <span style={{ fontSize: "11px", color: resultado.glColor, fontWeight: 600 }}>CG {resultado.glLabel}</span>
                    <p style={{ fontSize: "10px", color: "#888", marginTop: "4px" }}>por {resultado.porcionUsada}g</p>
                  </div>
                  <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Carbos en porción</p>
                    <p style={{ fontSize: "24px", fontWeight: 600, color: NICHO.light, lineHeight: 1 }}>{(resultado.food.carbs * resultado.porcionUsada / 100).toFixed(1)}g</p>
                    <p style={{ fontSize: "10px", color: "#888", marginTop: "4px" }}>de {resultado.food.carbs}g /100g</p>
                  </div>
                </div>

                <div style={{ background: "#141520", border: `0.5px solid ${resultado.igColor}44`, borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: resultado.igColor, marginBottom: "8px" }}>Recomendación para ti</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{resultado.recomendacion}</p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Selecciona un alimento y presiona Ver índice glucémico</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Qué es el índice glucémico y cómo afecta tu salud
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El índice glucémico (IG) mide qué tan rápido eleva un alimento la glucosa en sangre comparado con la glucosa pura (IG=100). Un IG bajo (menos de 55) indica digestión lenta y liberación gradual de energía. Un IG alto (más de 70) provoca picos rápidos de insulina que pueden llevar a mayor almacenamiento de grasa y hambre más frecuente.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              La carga glucémica (CG) es aún más precisa: considera el IG y la cantidad real de carbohidratos en la porción. Una sandía tiene IG alto (76) pero CG baja porque contiene poca cantidad de carbohidratos por porción normal. Para personas con diabetes tipo 2 en México, Colombia, Chile, Argentina o Perú, monitorear la CG es tan importante como el IG.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Comparación de <strong style={{ color: "#FFFFFF" }}>150g de arroz blanco vs 150g de lentejas</strong> como fuente de carbohidratos:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Arroz blanco IG", value: "72 (alto)", sub: "CG: 30.2" },
                { label: "Lentejas IG", value: "29 (bajo)", sub: "CG: 8.7" },
                { label: "Diferencia en glucosa", value: "~148%", sub: "mayor pico con arroz" },
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
                { q: "¿El índice glucémico cambia al cocinar los alimentos?", a: "Sí, significativamente. La pasta cocida al dente tiene IG de 49, mientras que la misma pasta muy cocida puede llegar a 61. El arroz recalentado después de refrigerado tiene menor IG que el recién cocido porque se forma almidón resistente. El método de cocción también importa: la papa al horno tiene IG de 85, pero una papa cocida entera tiene 78." },
                { q: "¿Sirve de algo combinar alimentos de IG alto con otros alimentos?", a: "Sí, mucho. Añadir proteínas (pollo, huevo), grasas saludables (aguacate, aceite de oliva) o fibra (verduras) a un alimento de IG alto reduce significativamente la respuesta glucémica total de la comida. Por eso un plato completo —arroz, pollo y ensalada— tiene un impacto glucémico mucho menor que comer solo el arroz." },
                { q: "¿Debo evitar todos los alimentos de IG alto?", a: "No necesariamente. El contexto importa: los deportistas pueden beneficiarse de alimentos de IG alto inmediatamente después del ejercicio para reponer glucógeno muscular. En personas sanas sin problemas metabólicos, priorizar alimentos de IG bajo es una guía útil, no una regla absoluta. La carga glucémica total del día es lo que más impacta en la salud." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Optimiza tu alimentación con datos precisos.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calorias-por-alimento", label: "Calorías por alimento", desc: "Macros completos de 80 alimentos" },
                { href: "/deficit-superavit", label: "Déficit y superávit calórico", desc: "TDEE y calorías objetivo por meta" },
                { href: "/proteina-diaria", label: "Proteína diaria necesaria", desc: "Gramos según peso y objetivo" },
                { href: "/porciones-alimenticias", label: "Porciones por grupo alimenticio", desc: "Distribución diaria por grupos" },
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
