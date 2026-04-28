"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#6EC9A0", light: "#8FD9B6", bg: "#1A3D2E", tint: "#101A14", border: "rgba(110,201,160,0.25)" };

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

export default function PesoIdeal() {
  const [altura, setAltura] = useState("170");
  const [sexo, setSexo] = useState("masculino");
  const [complexion, setComplexion] = useState("mediana");
  const [resultado, setResultado] = useState<{
    devine: number;
    robinson: number;
    miller: number;
    promedio: number;
    pesoMin: number;
    pesoMax: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const h = parseFloat(altura) || 0;
    if (h <= 0) return;
    const pulgadas = h / 2.54;
    const factorComplexion: Record<string, number> = { pequeña: 0.9, mediana: 1.0, grande: 1.1 };
    const f = factorComplexion[complexion];
    let devine: number, robinson: number, miller: number;
    if (sexo === "masculino") {
      devine = (50 + 2.3 * (pulgadas - 60)) * f;
      robinson = (52 + 1.9 * (pulgadas - 60)) * f;
      miller = (56.2 + 1.41 * (pulgadas - 60)) * f;
    } else {
      devine = (45.5 + 2.3 * (pulgadas - 60)) * f;
      robinson = (49 + 1.7 * (pulgadas - 60)) * f;
      miller = (53.1 + 1.36 * (pulgadas - 60)) * f;
    }
    const promedio = (devine + robinson + miller) / 3;
    const altM = h / 100;
    const pesoMin = 18.5 * altM * altM;
    const pesoMax = 24.9 * altM * altM;
    setResultado({ devine, robinson, miller, promedio, pesoMin, pesoMax });
  }, [altura, sexo, complexion]);

  return (
    <>
      <ToolSchema
        name="Calculadora de peso ideal"
        description="Calcula tu peso ideal según tres fórmulas médicas reconocidas: Devine, Robinson y Miller. Descubre tu rango de peso saludable según tu altura y sexo. Gratis."
        url="https://utilbox.lat/peso-ideal"
        category="Salud"
        faqItems={[
          { q: "¿Cuál de las tres fórmulas es la más precisa?", a: "Depende del contexto. La fórmula de Devine es la más antigua (1974) y fue desarrollada para dosificación de medicamentos, por lo que es conservadora. Robinson (1983) tiende a dar valores ligeramente menores, más orientados a composición corporal saludable. Miller (1983) da valores intermedios. Para la mayoría de personas, el promedio de las tres es el punto de referencia más equilibrado." },
          { q: "¿Es posible estar en peso ideal pero no saludable?", a: "Sí. El peso ideal es un rango de referencia, no una garantía de salud. Una persona puede estar en su peso ideal pero tener alto porcentaje de grasa corporal (obesidad sarcopénica), presión arterial elevada, glucosa alterada o niveles de colesterol problemáticos. La salud metabólica es más importante que el número en la báscula." },
          { q: "¿Qué es la complexión corporal y cómo afecta al peso ideal?", a: "La complexión se refiere al tamaño del esqueleto y la estructura ósea. Personas con complexión grande tienen huesos más densos y anchos, por lo que un mismo peso ideal sería insuficiente para ellas. El ajuste por complexión en estas fórmulas es del 10% arriba o abajo, lo cual puede significar 5–8 kg de diferencia en el resultado final." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/salud" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Salud</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de peso ideal</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Peso y medidas</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de peso ideal
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Descubre tu peso ideal según tu altura, sexo y complexión corporal usando tres fórmulas científicas.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="flex flex-col gap-4">
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
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Sexo</label>
                  <select value={sexo} onChange={(e) => setSexo(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Complexión corporal</label>
                  <select value={complexion} onChange={(e) => setComplexion(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="pequeña">Pequeña (huesos finos)</option>
                    <option value="mediana">Mediana (promedio)</option>
                    <option value="grande">Grande (huesos anchos)</option>
                  </select>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "4px" }}>Mide tu muñeca: pequeña &lt;15cm, grande &gt;17cm</p>
                </div>
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular peso ideal
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                {/* Main result */}
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Peso ideal promedio</p>
                  <p style={{ fontSize: "52px", fontWeight: 600, color: NICHO.light, letterSpacing: "-2px", lineHeight: 1 }}>
                    {fmt(resultado.promedio)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "4px" }}>kg (promedio de 3 fórmulas)</p>
                </div>

                {/* 3 formulas */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Fórmula Devine", value: resultado.devine, desc: "Clínica" },
                    { label: "Fórmula Robinson", value: resultado.robinson, desc: "Deportiva" },
                    { label: "Fórmula Miller", value: resultado.miller, desc: "Moderada" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                      <p style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF" }}>{fmt(item.value)} kg</p>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginTop: "2px" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* IMC range */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "8px" }}>Rango IMC normal para tu altura ({altura} cm)</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "2px" }}>Mínimo saludable</p>
                      <p style={{ fontSize: "20px", fontWeight: 600, color: NICHO.light }}>{fmt(resultado.pesoMin)} kg</p>
                    </div>
                    <div style={{ fontSize: "24px", color: "#EEEEEE" }}>—</div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "2px" }}>Máximo saludable</p>
                      <p style={{ fontSize: "20px", fontWeight: 600, color: NICHO.light }}>{fmt(resultado.pesoMax)} kg</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "10px" }}>IMC 18.5–24.9 (Organización Mundial de la Salud)</p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus datos y presiona Calcular peso ideal</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo se calcula el peso ideal
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              No existe un único "peso ideal": distintas fórmulas científicas ofrecen diferentes perspectivas. Esta calculadora combina tres de las más reconocidas en nutrición clínica: la fórmula de Devine (usada en farmacología para dosificación de medicamentos), la de Robinson (orientada a deportes) y la de Miller (un balance entre ambas). El promedio de las tres es el resultado más robusto.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La complexión corporal ajusta el resultado porque personas con la misma altura y sexo pueden tener esqueletos muy diferentes. Una forma sencilla de estimar tu complexión es medir la circunferencia de la muñeca: menos de 15 cm indica complexión pequeña, entre 15–17 cm complexión mediana, y más de 17 cm complexión grande.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Además de las fórmulas, mostramos el rango de peso saludable según el IMC (18.5–24.9), que es el criterio de la OMS para adultos. Lo ideal es que tu peso esté dentro de ambos rangos, pero recuerda que la composición corporal (músculo vs. grasa) importa tanto como el número en la báscula.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo: mujer de 162 cm, complexión mediana</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Fórmula Devine", value: "54.1 kg", color: "#FFFFFF" },
                { label: "Fórmula Robinson", value: "53.0 kg", color: "#FFFFFF" },
                { label: "Fórmula Miller", value: "57.6 kg", color: "#FFFFFF" },
                { label: "Promedio", value: "54.9 kg", color: NICHO.light },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px", textAlign: "center" }}>
                  <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: item.color }}>{item.value}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "12px" }}>Rango IMC normal para 162 cm: <strong style={{ color: "#FFFFFF" }}>48.5 – 65.4 kg</strong></p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Cuál de las tres fórmulas es la más precisa?", a: "Depende del contexto. La fórmula de Devine es la más antigua (1974) y fue desarrollada para dosificación de medicamentos, por lo que es conservadora. Robinson (1983) tiende a dar valores ligeramente menores, más orientados a composición corporal saludable. Miller (1983) da valores intermedios. Para la mayoría de personas, el promedio de las tres es el punto de referencia más equilibrado." },
                { q: "¿Es posible estar en peso ideal pero no saludable?", a: "Sí. El peso \"ideal\" es un rango de referencia, no una garantía de salud. Una persona puede estar en su peso ideal pero tener alto porcentaje de grasa corporal (obesidad sarcopénica), presión arterial elevada, glucosa alterada o niveles de colesterol problemáticos. La salud metabólica es más importante que el número en la báscula." },
                { q: "¿Qué es la complexión corporal y cómo afecta al peso ideal?", a: "La complexión se refiere al tamaño del esqueleto y la estructura ósea. Personas con complexión grande tienen huesos más densos y anchos, por lo que un mismo \"peso ideal\" sería insuficiente para ellas. El ajuste por complexión en estas fórmulas es del 10% arriba o abajo, lo cual puede significar 5–8 kg de diferencia en el resultado final." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Complementa tu plan de salud con estas calculadoras.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-imc", label: "Calculadora de IMC", desc: "Verifica tu índice de masa corporal" },
                { href: "/gasto-calorico-diario", label: "Gasto calórico diario", desc: "Cuántas calorías necesitas según tu objetivo" },
                { href: "/calculadora-macronutrientes", label: "Calculadora de macros", desc: "Distribuye proteínas, carbos y grasas" },
                { href: "/calorias-ejercicio", label: "Calorías por ejercicio", desc: "Cuánto quemas en cada tipo de actividad" },
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
