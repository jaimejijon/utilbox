"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4B85A", light: "#E2CC7D", bg: "#332B0F", tint: "#181408", border: "rgba(212,184,90,0.25)" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type Food = { name: string; kcal: number; prot: number; carbs: number; fat: number; fiber: number };
type Entry = { food: Food; grams: number };

const DB: Food[] = [
  { name: "Arroz blanco cocido", kcal: 130, prot: 2.7, carbs: 28.2, fat: 0.3, fiber: 0.4 },
  { name: "Arroz integral cocido", kcal: 111, prot: 2.6, carbs: 23.0, fat: 0.9, fiber: 1.8 },
  { name: "Frijoles negros cocidos", kcal: 132, prot: 8.9, carbs: 23.7, fat: 0.5, fiber: 8.7 },
  { name: "Frijoles rojos cocidos", kcal: 127, prot: 8.7, carbs: 22.8, fat: 0.5, fiber: 7.4 },
  { name: "Lentejas cocidas", kcal: 116, prot: 9.0, carbs: 20.1, fat: 0.4, fiber: 7.9 },
  { name: "Garbanzo cocido", kcal: 164, prot: 8.9, carbs: 27.0, fat: 2.6, fiber: 7.6 },
  { name: "Pechuga de pollo cocida", kcal: 165, prot: 31.0, carbs: 0.0, fat: 3.6, fiber: 0 },
  { name: "Muslo de pollo cocido", kcal: 209, prot: 26.0, carbs: 0.0, fat: 11.0, fiber: 0 },
  { name: "Carne de res magra", kcal: 215, prot: 26.1, carbs: 0.0, fat: 12.0, fiber: 0 },
  { name: "Carne de cerdo magra", kcal: 242, prot: 27.0, carbs: 0.0, fat: 14.0, fiber: 0 },
  { name: "Huevo entero", kcal: 155, prot: 13.0, carbs: 1.1, fat: 11.0, fiber: 0 },
  { name: "Clara de huevo", kcal: 52, prot: 11.0, carbs: 0.7, fat: 0.2, fiber: 0 },
  { name: "Leche entera", kcal: 61, prot: 3.2, carbs: 4.8, fat: 3.3, fiber: 0 },
  { name: "Leche descremada", kcal: 34, prot: 3.4, carbs: 4.9, fat: 0.1, fiber: 0 },
  { name: "Yogur natural", kcal: 59, prot: 3.5, carbs: 4.7, fat: 3.3, fiber: 0 },
  { name: "Queso fresco", kcal: 264, prot: 18.0, carbs: 2.1, fat: 20.0, fiber: 0 },
  { name: "Queso cheddar", kcal: 403, prot: 25.0, carbs: 1.3, fat: 33.0, fiber: 0 },
  { name: "Pan blanco", kcal: 265, prot: 9.0, carbs: 49.0, fat: 3.2, fiber: 2.7 },
  { name: "Pan integral", kcal: 247, prot: 13.0, carbs: 41.0, fat: 4.2, fiber: 6.0 },
  { name: "Tortilla de maíz", kcal: 218, prot: 5.7, carbs: 45.0, fat: 2.5, fiber: 4.0 },
  { name: "Tortilla de trigo", kcal: 312, prot: 8.0, carbs: 54.0, fat: 7.3, fiber: 3.2 },
  { name: "Pasta cocida", kcal: 158, prot: 5.8, carbs: 31.0, fat: 0.9, fiber: 1.8 },
  { name: "Avena cocida", kcal: 68, prot: 2.5, carbs: 12.0, fat: 1.4, fiber: 1.7 },
  { name: "Avena en hojuelas (cruda)", kcal: 389, prot: 17.0, carbs: 66.0, fat: 7.0, fiber: 10.6 },
  { name: "Plátano / Banana maduro", kcal: 89, prot: 1.1, carbs: 23.0, fat: 0.3, fiber: 2.6 },
  { name: "Plátano verde / macho", kcal: 122, prot: 1.3, carbs: 32.0, fat: 0.4, fiber: 2.3 },
  { name: "Manzana", kcal: 52, prot: 0.3, carbs: 14.0, fat: 0.2, fiber: 2.4 },
  { name: "Naranja", kcal: 47, prot: 0.9, carbs: 12.0, fat: 0.1, fiber: 2.4 },
  { name: "Mango", kcal: 60, prot: 0.8, carbs: 15.0, fat: 0.4, fiber: 1.6 },
  { name: "Papaya", kcal: 43, prot: 0.5, carbs: 11.0, fat: 0.3, fiber: 1.7 },
  { name: "Piña", kcal: 50, prot: 0.5, carbs: 13.0, fat: 0.1, fiber: 1.4 },
  { name: "Sandía", kcal: 30, prot: 0.6, carbs: 7.6, fat: 0.2, fiber: 0.4 },
  { name: "Aguacate / Palta", kcal: 160, prot: 2.0, carbs: 9.0, fat: 15.0, fiber: 7.0 },
  { name: "Uvas", kcal: 69, prot: 0.7, carbs: 18.0, fat: 0.2, fiber: 0.9 },
  { name: "Fresa / Frutilla", kcal: 32, prot: 0.7, carbs: 7.7, fat: 0.3, fiber: 2.0 },
  { name: "Durazno / Melocotón", kcal: 39, prot: 0.9, carbs: 10.0, fat: 0.3, fiber: 1.5 },
  { name: "Pera", kcal: 57, prot: 0.4, carbs: 15.0, fat: 0.1, fiber: 3.1 },
  { name: "Papa cocida", kcal: 87, prot: 1.9, carbs: 20.0, fat: 0.1, fiber: 1.8 },
  { name: "Camote / Batata cocida", kcal: 86, prot: 1.6, carbs: 20.0, fat: 0.1, fiber: 3.0 },
  { name: "Yuca cocida", kcal: 160, prot: 1.4, carbs: 38.0, fat: 0.3, fiber: 1.8 },
  { name: "Maíz cocido", kcal: 96, prot: 3.4, carbs: 21.0, fat: 1.5, fiber: 2.4 },
  { name: "Tomate", kcal: 18, prot: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 },
  { name: "Lechuga", kcal: 15, prot: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3 },
  { name: "Zanahoria", kcal: 41, prot: 0.9, carbs: 10.0, fat: 0.2, fiber: 2.8 },
  { name: "Cebolla", kcal: 40, prot: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7 },
  { name: "Ajo", kcal: 149, prot: 6.4, carbs: 33.0, fat: 0.5, fiber: 2.1 },
  { name: "Chile / Pimiento", kcal: 31, prot: 1.0, carbs: 6.0, fat: 0.3, fiber: 2.1 },
  { name: "Brócoli", kcal: 34, prot: 2.8, carbs: 7.0, fat: 0.4, fiber: 2.6 },
  { name: "Espinaca", kcal: 23, prot: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
  { name: "Pepino", kcal: 16, prot: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5 },
  { name: "Calabaza / Zapallo", kcal: 26, prot: 1.0, carbs: 6.5, fat: 0.1, fiber: 0.5 },
  { name: "Atún en agua", kcal: 116, prot: 25.5, carbs: 0.0, fat: 0.8, fiber: 0 },
  { name: "Sardina en aceite", kcal: 208, prot: 24.6, carbs: 0.0, fat: 11.5, fiber: 0 },
  { name: "Salmón", kcal: 208, prot: 20.0, carbs: 0.0, fat: 13.0, fiber: 0 },
  { name: "Aceite vegetal / oliva", kcal: 884, prot: 0.0, carbs: 0.0, fat: 100.0, fiber: 0 },
  { name: "Mantequilla / Margarina", kcal: 717, prot: 0.9, carbs: 0.1, fat: 81.0, fiber: 0 },
  { name: "Azúcar blanca", kcal: 387, prot: 0.0, carbs: 100.0, fat: 0.0, fiber: 0 },
  { name: "Miel de abeja", kcal: 304, prot: 0.3, carbs: 82.0, fat: 0.0, fiber: 0.2 },
  { name: "Café negro (infusión)", kcal: 2, prot: 0.3, carbs: 0.0, fat: 0.0, fiber: 0 },
  { name: "Leche de coco", kcal: 197, prot: 2.0, carbs: 6.0, fat: 21.0, fiber: 0 },
  { name: "Chícharos / Arvejas", kcal: 81, prot: 5.4, carbs: 14.5, fat: 0.4, fiber: 5.1 },
  { name: "Soya cocida", kcal: 173, prot: 16.6, carbs: 10.0, fat: 9.0, fiber: 6.0 },
  { name: "Tofu", kcal: 76, prot: 8.1, carbs: 1.9, fat: 4.8, fiber: 0.3 },
  { name: "Almendras", kcal: 579, prot: 21.0, carbs: 22.0, fat: 50.0, fiber: 12.5 },
  { name: "Nuez / Nogal", kcal: 654, prot: 15.0, carbs: 14.0, fat: 65.0, fiber: 6.7 },
  { name: "Maní / Cacahuete", kcal: 567, prot: 26.0, carbs: 16.0, fat: 49.0, fiber: 8.5 },
  { name: "Semillas de chía", kcal: 486, prot: 17.0, carbs: 42.0, fat: 31.0, fiber: 34.0 },
  { name: "Granola", kcal: 489, prot: 10.0, carbs: 57.0, fat: 25.0, fiber: 6.6 },
  { name: "Chocolate negro 70%", kcal: 598, prot: 8.0, carbs: 46.0, fat: 43.0, fiber: 11.0 },
  { name: "Jugo de naranja natural", kcal: 45, prot: 0.7, carbs: 10.4, fat: 0.2, fiber: 0.2 },
  { name: "Harina de trigo", kcal: 364, prot: 10.0, carbs: 76.0, fat: 1.2, fiber: 2.7 },
  { name: "Harina de maíz", kcal: 361, prot: 6.7, carbs: 76.8, fat: 3.9, fiber: 7.3 },
  { name: "Jamón cocido", kcal: 145, prot: 17.0, carbs: 1.5, fat: 7.7, fiber: 0 },
  { name: "Salchicha", kcal: 301, prot: 11.0, carbs: 2.9, fat: 27.0, fiber: 0 },
  { name: "Chorizo", kcal: 455, prot: 24.0, carbs: 1.9, fat: 38.0, fiber: 0 },
  { name: "Mayonesa", kcal: 680, prot: 1.0, carbs: 0.6, fat: 75.0, fiber: 0 },
  { name: "Crema de leche", kcal: 340, prot: 2.8, carbs: 2.8, fat: 36.0, fiber: 0 },
  { name: "Quinoa cocida", kcal: 120, prot: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8 },
  { name: "Arracacha / Arracacia", kcal: 96, prot: 1.0, carbs: 23.0, fat: 0.3, fiber: 2.7 },
];

export default function CaloriasPorAlimento() {
  const [search, setSearch] = useState("");
  const [grams, setGrams] = useState("100");
  const [selected, setSelected] = useState<Food | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showSugg, setShowSugg] = useState(false);

  const suggestions = search.length > 1
    ? DB.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())).slice(0, 6)
    : [];

  const selectFood = (f: Food) => {
    setSelected(f);
    setSearch(f.name);
    setShowSugg(false);
  };

  const addEntry = () => {
    const g = parseFloat(grams);
    if (!selected || !g || g <= 0) return;
    setEntries((prev) => [...prev, { food: selected, grams: g }]);
    setSearch("");
    setSelected(null);
    setGrams("100");
  };

  const removeEntry = (i: number) => setEntries((prev) => prev.filter((_, idx) => idx !== i));

  const macro = (val: number, g: number) => val * g / 100;
  const fmt = (n: number) => n.toFixed(1);

  const totals = entries.reduce(
    (acc, e) => ({
      kcal: acc.kcal + macro(e.food.kcal, e.grams),
      prot: acc.prot + macro(e.food.prot, e.grams),
      carbs: acc.carbs + macro(e.food.carbs, e.grams),
      fat: acc.fat + macro(e.food.fat, e.grams),
      fiber: acc.fiber + macro(e.food.fiber, e.grams),
    }),
    { kcal: 0, prot: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  const previewG = parseFloat(grams) || 0;

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/nutricion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Nutrición</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calorías por alimento</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Calorías</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de calorías por alimento
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Busca el alimento, indica la cantidad en gramos y agrégalo. Acumula múltiples alimentos para ver el total nutricional del día.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div style={{ position: "relative", marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Buscar alimento</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setShowSugg(true); setSelected(null); }}
                  onFocus={(e) => { setShowSugg(true); e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                  onBlur={(e) => { setTimeout(() => setShowSugg(false), 150); e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }}
                  placeholder="Ej: arroz, pollo, plátano…"
                  className={inputClass}
                  style={{ ...inputStyle, outline: "none" }}
                />
                {showSugg && suggestions.length > 0 && (
                  <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#1A1B2E", border: `0.5px solid ${NICHO.border}`, borderRadius: "8px", zIndex: 20, overflow: "hidden" }}>
                    {suggestions.map((f) => (
                      <button key={f.name} onMouseDown={() => selectFood(f)}
                        style={{ width: "100%", textAlign: "left", padding: "8px 12px", fontSize: "13px", color: "#FFFFFF", background: "transparent", border: "none", cursor: "pointer", display: "block", borderBottom: "0.5px solid #1E2030" }}
                        className="hover:bg-[#252640]">
                        {f.name} <span style={{ color: "#888", fontSize: "11px" }}>— {f.kcal} kcal/100g</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Cantidad (gramos)</label>
                  <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{grams} g</span>
                </div>
                <input type="number" min="1" max="2000" value={grams} onChange={(e) => setGrams(e.target.value)}
                  className={inputClass} style={{ ...inputStyle, outline: "none" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>

              {selected && previewG > 0 && (
                <div style={{ background: "#0F1117", borderRadius: "8px", padding: "10px 12px", marginBottom: "14px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "6px" }}>Vista previa — {grams}g de {selected.name}:</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { label: "Calorías", val: macro(selected.kcal, previewG), unit: "kcal" },
                      { label: "Proteínas", val: macro(selected.prot, previewG), unit: "g" },
                      { label: "Carbos", val: macro(selected.carbs, previewG), unit: "g" },
                    ].map((m) => (
                      <div key={m.label}>
                        <p style={{ fontSize: "10px", color: "#EEEEEE" }}>{m.label}</p>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.light }}>{fmt(m.val)}<span style={{ fontSize: "10px" }}> {m.unit}</span></p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={addEntry} disabled={!selected}
                className="w-full mt-1 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: selected ? NICHO.color : "#1E2030", color: selected ? "#0F1117" : "#555", border: "none", cursor: selected ? "pointer" : "not-allowed" }}>
                + Agregar al registro
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {entries.length > 0 ? (
              <div className="flex flex-col gap-3">
                <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Total del día</p>
                  <p style={{ fontSize: "44px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>{Math.round(totals.kcal)}</p>
                  <p style={{ fontSize: "12px", color: NICHO.light, marginBottom: "12px" }}>kcal</p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[
                      { label: "Proteínas", val: totals.prot },
                      { label: "Carbos", val: totals.carbs },
                      { label: "Grasas", val: totals.fat },
                      { label: "Fibra", val: totals.fiber },
                    ].map((m) => (
                      <div key={m.label} style={{ background: "rgba(0,0,0,0.25)", borderRadius: "6px", padding: "8px 4px" }}>
                        <p style={{ fontSize: "9px", color: "#EEEEEE", marginBottom: "2px" }}>{m.label}</p>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>{fmt(m.val)}<span style={{ fontSize: "9px", color: "#EEEEEE" }}>g</span></p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {entries.map((e, i) => (
                    <div key={i} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "2px" }}>{e.food.name}</p>
                        <p style={{ fontSize: "11px", color: "#EEEEEE" }}>
                          {e.grams}g · <strong style={{ color: NICHO.light }}>{Math.round(macro(e.food.kcal, e.grams))} kcal</strong> · P: {fmt(macro(e.food.prot, e.grams))}g · C: {fmt(macro(e.food.carbs, e.grams))}g · G: {fmt(macro(e.food.fat, e.grams))}g
                        </p>
                      </div>
                      <button onClick={() => removeEntry(i)}
                        style={{ background: "transparent", border: "none", color: "#555", cursor: "pointer", fontSize: "18px", padding: "4px", flexShrink: 0, lineHeight: 1 }}
                        className="hover:!text-[#E07070] transition-colors">×</button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Busca un alimento y agrégalo al registro</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo contar calorías por alimento correctamente
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Contar calorías es la base de cualquier plan nutricional. La clave está en conocer el peso exacto de la porción, ya que los valores calóricos varían significativamente entre alimentos similares. La herramienta usa tablas nutricionales estandarizadas con valores por 100g del alimento tal como se consume habitualmente —cocido en el caso de arroz, pasta y carnes, y crudo en frutas y verduras.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              En México, Colombia, Perú, Ecuador, Bolivia y Argentina, los alimentos base de la dieta —arroz, frijoles, tortillas, yuca, papa— son altamente accesibles y nutritivos. Conocer sus macros te permite construir una dieta equilibrada y económica sin depender de alimentos importados.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Un almuerzo típico de <strong style={{ color: "#FFFFFF" }}>200g de arroz + 150g de pechuga + 50g de aguacate</strong> contiene:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Calorías totales", value: "~615 kcal", sub: "del almuerzo" },
                { label: "Proteínas", value: "~53g", sub: "fuente: pollo" },
                { label: "Carbohidratos", value: "~65g", sub: "fuente: arroz" },
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
                { q: "¿Los valores son para alimento crudo o cocido?", a: "Los valores están indicados para el alimento tal como se consume. El arroz, pasta y carnes aparecen cocidos. Las frutas y verduras, crudas. Esto refleja cómo se pesa la porción en la práctica diaria sin necesidad de hacer conversiones adicionales." },
                { q: "¿Puedo usarlo para calcular mis macros del día completo?", a: "Sí, puedes agregar todos los alimentos que consumes durante el día y la herramienta acumulará el total de calorías, proteínas, carbohidratos, grasas y fibra. Es ideal para llevar un registro diario sin apps complicadas ni registro de cuenta." },
                { q: "¿Qué pasa si no encuentro el alimento que busco?", a: "La base de datos contiene los 80 alimentos más consumidos en Latinoamérica. Si no encuentras un alimento específico, busca el ingrediente principal o el más similar. Para preparaciones compuestas, busca cada ingrediente por separado y suma los resultados." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Herramientas para optimizar tu alimentación.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/deficit-superavit", label: "Déficit y superávit calórico", desc: "Cuántas kcal comer según tu meta" },
                { href: "/proteina-diaria", label: "Proteína diaria necesaria", desc: "Gramos de proteína según tu objetivo" },
                { href: "/indice-glucemico", label: "Índice glucémico", desc: "IG y carga glucémica por alimento" },
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
