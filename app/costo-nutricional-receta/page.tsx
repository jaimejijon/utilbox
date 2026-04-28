"use client";

import { useState } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4B85A", light: "#E2CC7D", bg: "#332B0F", tint: "#181408", border: "rgba(212,184,90,0.25)" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type FoodDB = { name: string; kcal: number; prot: number; carbs: number; fat: number };
type Entry = { food: FoodDB; grams: number; precio: number };

const DB: FoodDB[] = [
  { name: "Arroz blanco cocido", kcal: 130, prot: 2.7, carbs: 28.2, fat: 0.3 },
  { name: "Frijoles negros cocidos", kcal: 132, prot: 8.9, carbs: 23.7, fat: 0.5 },
  { name: "Frijoles rojos cocidos", kcal: 127, prot: 8.7, carbs: 22.8, fat: 0.5 },
  { name: "Lentejas cocidas", kcal: 116, prot: 9.0, carbs: 20.1, fat: 0.4 },
  { name: "Garbanzo cocido", kcal: 164, prot: 8.9, carbs: 27.0, fat: 2.6 },
  { name: "Pechuga de pollo cocida", kcal: 165, prot: 31.0, carbs: 0.0, fat: 3.6 },
  { name: "Muslo de pollo cocido", kcal: 209, prot: 26.0, carbs: 0.0, fat: 11.0 },
  { name: "Carne de res magra", kcal: 215, prot: 26.1, carbs: 0.0, fat: 12.0 },
  { name: "Carne de cerdo magra", kcal: 242, prot: 27.0, carbs: 0.0, fat: 14.0 },
  { name: "Huevo entero", kcal: 155, prot: 13.0, carbs: 1.1, fat: 11.0 },
  { name: "Leche entera", kcal: 61, prot: 3.2, carbs: 4.8, fat: 3.3 },
  { name: "Queso fresco", kcal: 264, prot: 18.0, carbs: 2.1, fat: 20.0 },
  { name: "Pan blanco", kcal: 265, prot: 9.0, carbs: 49.0, fat: 3.2 },
  { name: "Tortilla de maíz", kcal: 218, prot: 5.7, carbs: 45.0, fat: 2.5 },
  { name: "Pasta cocida", kcal: 158, prot: 5.8, carbs: 31.0, fat: 0.9 },
  { name: "Avena en hojuelas", kcal: 389, prot: 17.0, carbs: 66.0, fat: 7.0 },
  { name: "Papa cocida", kcal: 87, prot: 1.9, carbs: 20.0, fat: 0.1 },
  { name: "Yuca cocida", kcal: 160, prot: 1.4, carbs: 38.0, fat: 0.3 },
  { name: "Plátano / Banana", kcal: 89, prot: 1.1, carbs: 23.0, fat: 0.3 },
  { name: "Tomate", kcal: 18, prot: 0.9, carbs: 3.9, fat: 0.2 },
  { name: "Cebolla", kcal: 40, prot: 1.1, carbs: 9.3, fat: 0.1 },
  { name: "Ajo", kcal: 149, prot: 6.4, carbs: 33.0, fat: 0.5 },
  { name: "Chile / Pimiento", kcal: 31, prot: 1.0, carbs: 6.0, fat: 0.3 },
  { name: "Zanahoria", kcal: 41, prot: 0.9, carbs: 10.0, fat: 0.2 },
  { name: "Brócoli", kcal: 34, prot: 2.8, carbs: 7.0, fat: 0.4 },
  { name: "Atún en agua", kcal: 116, prot: 25.5, carbs: 0.0, fat: 0.8 },
  { name: "Aceite vegetal / oliva", kcal: 884, prot: 0.0, carbs: 0.0, fat: 100.0 },
  { name: "Mantequilla", kcal: 717, prot: 0.9, carbs: 0.1, fat: 81.0 },
  { name: "Azúcar blanca", kcal: 387, prot: 0.0, carbs: 100.0, fat: 0.0 },
  { name: "Harina de trigo", kcal: 364, prot: 10.0, carbs: 76.0, fat: 1.2 },
  { name: "Harina de maíz", kcal: 361, prot: 6.7, carbs: 76.8, fat: 3.9 },
  { name: "Aguacate / Palta", kcal: 160, prot: 2.0, carbs: 9.0, fat: 15.0 },
  { name: "Leche de coco", kcal: 197, prot: 2.0, carbs: 6.0, fat: 21.0 },
  { name: "Crema de leche", kcal: 340, prot: 2.8, carbs: 2.8, fat: 36.0 },
  { name: "Maíz cocido", kcal: 96, prot: 3.4, carbs: 21.0, fat: 1.5 },
  { name: "Quinoa cocida", kcal: 120, prot: 4.4, carbs: 21.3, fat: 1.9 },
  { name: "Jamón cocido", kcal: 145, prot: 17.0, carbs: 1.5, fat: 7.7 },
  { name: "Salchicha", kcal: 301, prot: 11.0, carbs: 2.9, fat: 27.0 },
  { name: "Chorizo", kcal: 455, prot: 24.0, carbs: 1.9, fat: 38.0 },
  { name: "Espinaca", kcal: 23, prot: 2.9, carbs: 3.6, fat: 0.4 },
  { name: "Camote / Batata", kcal: 86, prot: 1.6, carbs: 20.0, fat: 0.1 },
  { name: "Salmón", kcal: 208, prot: 20.0, carbs: 0.0, fat: 13.0 },
  { name: "Sardina en aceite", kcal: 208, prot: 24.6, carbs: 0.0, fat: 11.5 },
  { name: "Miel de abeja", kcal: 304, prot: 0.3, carbs: 82.0, fat: 0.0 },
  { name: "Almendras", kcal: 579, prot: 21.0, carbs: 22.0, fat: 50.0 },
  { name: "Maní / Cacahuete", kcal: 567, prot: 26.0, carbs: 16.0, fat: 49.0 },
  { name: "Tofu", kcal: 76, prot: 8.1, carbs: 1.9, fat: 4.8 },
  { name: "Soya cocida", kcal: 173, prot: 16.6, carbs: 10.0, fat: 9.0 },
];

export default function CostoNutricionalReceta() {
  const [search, setSearch] = useState("");
  const [grams, setGrams] = useState("100");
  const [precio, setPrecio] = useState("");
  const [porciones, setPorciones] = useState("4");
  const [selected, setSelected] = useState<FoodDB | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showSugg, setShowSugg] = useState(false);

  const suggestions = search.length > 1
    ? DB.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())).slice(0, 6)
    : [];

  const selectFood = (f: FoodDB) => {
    setSelected(f);
    setSearch(f.name);
    setShowSugg(false);
  };

  const addEntry = () => {
    const g = parseFloat(grams);
    const p = parseFloat(precio);
    if (!selected || !g || g <= 0 || isNaN(p)) return;
    setEntries((prev) => [...prev, { food: selected, grams: g, precio: p || 0 }]);
    setSearch(""); setSelected(null); setGrams("100"); setPrecio("");
  };

  const removeEntry = (i: number) => setEntries((prev) => prev.filter((_, idx) => idx !== i));

  const macro = (val: number, g: number) => val * g / 100;
  const fmt = (n: number) => n.toFixed(1);
  const fmtCost = (n: number) => n.toFixed(2);

  const por = Math.max(parseInt(porciones) || 1, 1);
  const totals = entries.reduce((acc, e) => ({
    kcal: acc.kcal + macro(e.food.kcal, e.grams),
    prot: acc.prot + macro(e.food.prot, e.grams),
    carbs: acc.carbs + macro(e.food.carbs, e.grams),
    fat: acc.fat + macro(e.food.fat, e.grams),
    costo: acc.costo + e.precio,
  }), { kcal: 0, prot: 0, carbs: 0, fat: 0, costo: 0 });

  return (
    <>
      <ToolSchema
        name="Calculadora de costo nutricional por receta"
        description="Calcula el costo y los macronutrientes de cualquier receta por porción. Agrega ingredientes, ingresa el precio y obtén calorías, proteínas, carbos y grasas con su costo exacto por porción."
        url="https://utilbox.lat/costo-nutricional-receta"
        category="Nutrición"
        faqItems={[
          { q: "¿En qué moneda funciona la calculadora de costo?", a: "La calculadora trabaja con cualquier moneda local —pesos mexicanos, pesos colombianos, soles peruanos, bolívares, guaraníes o dólares— ya que solo requiere el número que pagas por el ingrediente. Tú defines la unidad monetaria; la herramienta calcula el costo proporcional según la cantidad en gramos usada en la receta." },
          { q: "¿Los valores nutricionales son precisos para ingredientes crudos o cocidos?", a: "La base de datos usa valores por 100g del alimento tal como se consume normalmente. Las carnes están calculadas cocidas, el arroz y pasta cocidos, y las verduras crudas. Si tu receta usa ingredientes crudos que luego se cocinan (como el arroz que dobla su peso al cocerse), ajusta la cantidad en gramos al peso final cocido para mayor precisión." },
          { q: "¿Puedo usar esta herramienta para un negocio de comida?", a: "Sí. Para un emprendimiento de comida, el costo nutricional por porción te ayuda a definir precios de venta, calcular márgenes de ganancia y demostrar el valor nutricional de tus platillos a tus clientes. La regla general en restaurantes es que el costo de ingredientes no supere el 30-35% del precio de venta." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/nutricion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Nutrición</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Costo nutricional por receta</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Calorías</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Costo nutricional por receta
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Agrega los ingredientes de tu receta con cantidad y precio. Calcula el costo total, costo por porción y macros por porción.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div style={{ position: "relative", marginBottom: "12px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Ingrediente</label>
                <input type="text" value={search}
                  onChange={(e) => { setSearch(e.target.value); setShowSugg(true); setSelected(null); }}
                  onFocus={(e) => { setShowSugg(true); e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                  onBlur={(e) => { setTimeout(() => setShowSugg(false), 150); e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }}
                  placeholder="Buscar ingrediente…"
                  className={inputClass} style={{ ...inputStyle, outline: "none" }} />
                {showSugg && suggestions.length > 0 && (
                  <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#1A1B2E", border: `0.5px solid ${NICHO.border}`, borderRadius: "8px", zIndex: 20, overflow: "hidden" }}>
                    {suggestions.map((f) => (
                      <button key={f.name} onMouseDown={() => selectFood(f)}
                        style={{ width: "100%", textAlign: "left", padding: "8px 12px", fontSize: "13px", color: "#FFFFFF", background: "transparent", border: "none", cursor: "pointer", display: "block", borderBottom: "0.5px solid #1E2030" }}
                        className="hover:bg-[#252640]">
                        {f.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Cantidad (g)</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{grams}g</span>
                  </div>
                  <input type="number" min="1" max="5000" value={grams} onChange={(e) => setGrams(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Precio pagado</label>
                  <input type="number" min="0" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)}
                    placeholder="0.00"
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Número de porciones que rinde</label>
                  <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{porciones}</span>
                </div>
                <input type="number" min="1" max="50" step="1" value={porciones} onChange={(e) => setPorciones(e.target.value)}
                  className={inputClass} style={{ ...inputStyle, outline: "none" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>

              <button onClick={addEntry} disabled={!selected}
                className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: selected ? NICHO.color : "#1E2030", color: selected ? "#0F1117" : "#555", border: "none", cursor: selected ? "pointer" : "not-allowed" }}>
                + Agregar ingrediente
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {entries.length > 0 ? (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Costo por porción</p>
                    <p style={{ fontSize: "32px", fontWeight: 600, color: NICHO.color, letterSpacing: "-1px", lineHeight: 1 }}>{fmtCost(totals.costo / por)}</p>
                    <p style={{ fontSize: "11px", color: NICHO.light }}>de {fmtCost(totals.costo)} total</p>
                  </div>
                  <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Calorías por porción</p>
                    <p style={{ fontSize: "32px", fontWeight: 600, color: NICHO.light, letterSpacing: "-1px", lineHeight: 1 }}>{Math.round(totals.kcal / por)}</p>
                    <p style={{ fontSize: "11px", color: "#888" }}>kcal</p>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Macros por porción ({por} porciones)</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { label: "Proteínas", val: totals.prot / por, color: "#74AEDD" },
                      { label: "Carbohidratos", val: totals.carbs / por, color: NICHO.light },
                      { label: "Grasas", val: totals.fat / por, color: "#D4856A" },
                    ].map((m) => (
                      <div key={m.label} style={{ background: "#0F1117", borderRadius: "8px", padding: "10px 6px" }}>
                        <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "2px" }}>{m.label}</p>
                        <p style={{ fontSize: "16px", fontWeight: 600, color: m.color }}>{fmt(m.val)}g</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "8px" }}>Ingredientes de la receta</p>
                  <div className="flex flex-col gap-2">
                    {entries.map((e, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", background: "#0F1117", borderRadius: "8px" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: "12px", fontWeight: 600, color: "#FFFFFF", marginBottom: "2px" }}>{e.food.name}</p>
                          <p style={{ fontSize: "11px", color: "#888" }}>{e.grams}g · {Math.round(macro(e.food.kcal, e.grams))} kcal · {e.precio > 0 ? `$${fmtCost(e.precio)}` : "sin precio"}</p>
                        </div>
                        <button onClick={() => removeEntry(i)}
                          style={{ background: "transparent", border: "none", color: "#555", cursor: "pointer", fontSize: "16px", flexShrink: 0 }}
                          className="hover:!text-[#E07070] transition-colors">×</button>
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
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Agrega ingredientes para calcular costo y macros</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Por qué calcular el costo nutricional de tus recetas
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Conocer el costo nutricional de tus recetas te permite tomar decisiones de alimentación más inteligentes y económicas. En países como México, Colombia, Ecuador, Perú y Bolivia —donde el presupuesto familiar destinado a alimentos es variable— preparar comida en casa siempre es más económico que comer fuera, especialmente si sabes qué ingredientes aportan más proteína y nutrientes por peso y precio.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Esta herramienta es especialmente útil para meal prep semanal, planificar dietas con presupuesto limitado o para emprendedores de comida que quieren conocer el costo exacto de sus preparaciones y calcular un precio de venta justo.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Una olla de <strong style={{ color: "#FFFFFF" }}>arroz con pollo para 4 personas</strong> (300g arroz, 500g pollo, 200g verduras, aceite):
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Costo total estimado", value: "$6.50", sub: "ingredientes aprox." },
                { label: "Costo por porción", value: "$1.63", sub: "4 personas" },
                { label: "Proteína por porción", value: "~38g", sub: "fuente: pollo" },
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
                { q: "¿En qué moneda funciona la calculadora de costo?", a: "La calculadora trabaja con cualquier moneda local —pesos mexicanos, pesos colombianos, soles peruanos, bolívares, guaraníes o dólares— ya que solo requiere el número que pagas por el ingrediente. Tú defines la unidad monetaria; la herramienta calcula el costo proporcional según la cantidad en gramos usada en la receta." },
                { q: "¿Los valores nutricionales son precisos para ingredientes crudos o cocidos?", a: "La base de datos usa valores por 100g del alimento tal como se consume normalmente. Las carnes están calculadas cocidas, el arroz y pasta cocidos, y las verduras crudas. Si tu receta usa ingredientes crudos que luego se cocinan (como el arroz que dobla su peso al cocerse), ajusta la cantidad en gramos al peso final cocido para mayor precisión." },
                { q: "¿Puedo usar esta herramienta para un negocio de comida?", a: "Sí. Para un emprendimiento de comida, el costo nutricional por porción te ayuda a definir precios de venta, calcular márgenes de ganancia y demostrar el valor nutricional de tus platillos a tus clientes. La regla general en restaurantes es que el costo de ingredientes no supere el 30-35% del precio de venta." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Herramientas para alimentarte mejor y más barato.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calorias-por-alimento", label: "Calorías por alimento", desc: "Macros de 80 alimentos comunes" },
                { href: "/proteina-diaria", label: "Proteína diaria necesaria", desc: "Gramos de proteína según objetivo" },
                { href: "/deficit-superavit", label: "Déficit y superávit calórico", desc: "Calorías objetivo por meta" },
                { href: "/porciones-alimenticias", label: "Porciones por grupo alimenticio", desc: "Distribución diaria recomendada" },
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
