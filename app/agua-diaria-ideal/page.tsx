"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#6EC9A0", light: "#8FD9B6", bg: "#1A3D2E", tint: "#101A14", border: "rgba(110,201,160,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

export default function AguaDiariaIdeal() {
  const [peso, setPeso] = useState("70");
  const [actividad, setActividad] = useState("moderado");
  const [clima, setClima] = useState("templado");
  const [resultado, setResultado] = useState<{
    litros: number;
    vasos: number;
    manana: number;
    tarde: number;
    noche: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const p = parseFloat(peso) || 0;
    if (p <= 0) return;
    const base = p * 0.033;
    const actividadExtra: Record<string, number> = { sedentario: 0, moderado: 0.5, activo: 1.0, atleta: 1.5 };
    const climaExtra: Record<string, number> = { templado: 0, calido: 0.5, muy_calido: 1.0 };
    const litros = base + (actividadExtra[actividad] || 0) + (climaExtra[clima] || 0);
    const vasos = Math.round(litros / 0.25);
    const manana = Math.round(litros * 0.3 * 10) / 10;
    const tarde = Math.round(litros * 0.5 * 10) / 10;
    const noche = Math.round(litros * 0.2 * 10) / 10;
    setResultado({ litros: Math.round(litros * 10) / 10, vasos, manana, tarde, noche });
  }, [peso, actividad, clima]);

  return (
    <>
      <ToolSchema
        name="Calculadora de agua diaria ideal"
        description="Calcula cuánta agua debes beber al día según tu peso, nivel de actividad física y clima. Hidratación personalizada para México, Colombia, Argentina, Chile y toda Latinoamérica. Gratis."
        url="https://utilbox.lat/agua-diaria-ideal"
        category="Salud"
        faqItems={[
          { q: "¿El café y el té cuentan como hidratación?", a: "Sí, en su mayor parte. Aunque la cafeína tiene efecto diurético, los estudios muestran que el café y el té contribuyen positivamente a la hidratación total cuando se consumen con moderación (menos de 4 tazas diarias). El agua de coco, los jugos naturales sin azúcar añadida y el agua mineral también cuentan. Bebidas con alto contenido de azúcar o alcohol son contraproducentes." },
          { q: "¿Cómo sé si estoy bebiendo suficiente agua?", a: "La forma más sencilla es observar el color de tu orina: debe ser amarillo claro o casi transparente. Si es oscura o tiene olor fuerte, probablemente estás deshidratado. Otros signos de deshidratación incluyen sed, fatiga, dolor de cabeza, poca concentración y labios secos. No esperes a tener sed para beber agua; la sed ya es una señal de deshidratación leve." },
          { q: "¿Es posible beber demasiada agua?", a: "Sí, aunque es poco común en personas sanas. La hiponatremia (exceso de agua que diluye el sodio en sangre) puede ocurrir en deportistas de resistencia que beben grandes cantidades sin reponer electrolitos. Para la mayoría de personas, beber hasta 3–4 litros diarios de agua es completamente seguro y saludable." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/salud" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Salud</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Agua diaria ideal</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Nutrición</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Agua diaria ideal
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula cuánta agua necesitas beber al día según tu peso, nivel de actividad y clima donde vives.
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
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Nivel de actividad</label>
                  <select value={actividad} onChange={(e) => setActividad(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="sedentario">Sedentario (poco movimiento)</option>
                    <option value="moderado">Moderado (ejercicio 3 días/semana)</option>
                    <option value="activo">Activo (ejercicio 5+ días/semana)</option>
                    <option value="atleta">Atleta (entrenamiento intenso diario)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Clima habitual</label>
                  <select value={clima} onChange={(e) => setClima(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="templado">Templado (15–25°C)</option>
                    <option value="calido">Cálido (25–35°C)</option>
                    <option value="muy_calido">Muy cálido (35°C+)</option>
                  </select>
                </div>
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular hidratación
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-6 text-center"
                    style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                    <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Litros al día</p>
                    <p style={{ fontSize: "46px", fontWeight: 600, color: NICHO.light, letterSpacing: "-1px", lineHeight: 1 }}>
                      {resultado.litros}
                    </p>
                    <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "4px" }}>litros</p>
                  </div>
                  <div className="rounded-[10px] p-6 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Vasos de agua</p>
                    <p style={{ fontSize: "46px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-1px", lineHeight: 1 }}>
                      {resultado.vasos}
                    </p>
                    <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "4px" }}>vasos (250ml)</p>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "12px" }}>Distribución recomendada</p>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Mañana (6am–12pm)", value: resultado.manana, pct: 30, color: "#74AEDD" },
                      { label: "Tarde (12pm–7pm)", value: resultado.tarde, pct: 50, color: NICHO.light },
                      { label: "Noche (7pm–10pm)", value: resultado.noche, pct: 20, color: "#D4B85A" },
                    ].map((slot) => (
                      <div key={slot.label}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontSize: "12px", color: "#EEEEEE" }}>{slot.label}</span>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: slot.color }}>{slot.value} L</span>
                        </div>
                        <div style={{ height: "6px", background: "#0F1117", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ width: `${slot.pct}%`, height: "100%", background: slot.color, borderRadius: "999px" }} />
                        </div>
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
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus datos y presiona Calcular hidratación</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cuánta agua necesitas beber al día
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La hidratación adecuada es fundamental para prácticamente todas las funciones del cuerpo: regula la temperatura corporal, transporta nutrientes, elimina toxinas y mantiene la salud de articulaciones y órganos. Sin embargo, la cantidad de agua que necesitas no es la misma para todos.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La fórmula más usada es 33 ml por kilogramo de peso corporal como punto de partida, ajustando según actividad física y temperatura ambiente. En países tropicales y cálidos de Latinoamérica como México, Colombia, Ecuador o Venezuela, el calor y la humedad pueden aumentar las necesidades hasta en 1.5 litros adicionales por día.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Recuerda que el agua también proviene de los alimentos (frutas, verduras, sopas), por lo que no toda tu hidratación necesariamente tiene que venir de vasos de agua pura. Sin embargo, el agua sigue siendo la fuente más eficiente y recomendable.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo: persona de 80 kg en clima cálido con actividad moderada</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Base (80 kg)", value: "2.6 L", sub: "80 × 0.033" },
                { label: "+ Actividad", value: "+0.5 L", sub: "Moderada" },
                { label: "+ Clima cálido", value: "+0.5 L", sub: "25–35°C" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: NICHO.light, marginBottom: "2px" }}>{item.value}</p>
                  <p style={{ fontSize: "10px", color: "#F5F5F5" }}>{item.sub}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "12px" }}>Total recomendado: <strong style={{ color: "#FFFFFF" }}>3.6 litros/día</strong> — equivalente a 14 vasos de 250 ml.</p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿El café y el té cuentan como hidratación?", a: "Sí, en su mayor parte. Aunque la cafeína tiene efecto diurético, los estudios muestran que el café y el té contribuyen positivamente a la hidratación total cuando se consumen con moderación (menos de 4 tazas diarias). El agua de coco, los jugos naturales sin azúcar añadida y el agua mineral también cuentan. Bebidas con alto contenido de azúcar o alcohol son contraproducentes." },
                { q: "¿Cómo sé si estoy bebiendo suficiente agua?", a: "La forma más sencilla es observar el color de tu orina: debe ser amarillo claro o casi transparente. Si es oscura o tiene olor fuerte, probablemente estás deshidratado. Otros signos de deshidratación incluyen sed, fatiga, dolor de cabeza, poca concentración y labios secos. No esperes a tener sed para beber agua; la sed ya es una señal de deshidratación leve." },
                { q: "¿Es posible beber demasiada agua?", a: "Sí, aunque es poco común en personas sanas. La hiponatremia (exceso de agua que diluye el sodio en sangre) puede ocurrir en deportistas de resistencia que beben grandes cantidades sin reponer electrolitos. Para la mayoría de personas, beber hasta 3–4 litros diarios de agua es completamente seguro y saludable." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Cuida tu bienestar con estas calculadoras.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-imc", label: "Calculadora de IMC", desc: "Verifica tu índice de masa corporal" },
                { href: "/gasto-calorico-diario", label: "Gasto calórico diario", desc: "TMB y TDEE según tu actividad" },
                { href: "/calculadora-macronutrientes", label: "Calculadora de macros", desc: "Distribuye tus nutrientes ideales" },
                { href: "/calorias-ejercicio", label: "Calorías por ejercicio", desc: "Cuántas calorías quemas al entrenar" },
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
