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

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState("70");
  const [altura, setAltura] = useState("170");
  const [edad, setEdad] = useState("30");
  const [sexo, setSexo] = useState("masculino");
  const [resultado, setResultado] = useState<{
    imc: number;
    clasificacion: string;
    color: string;
    pesoMinimo: number;
    pesoMaximo: number;
    diferencia: number;
    direccion: string;
  } | null>(null);

  const calcular = useCallback(() => {
    const p = parseFloat(peso) || 0;
    const h = parseFloat(altura) || 0;
    if (p <= 0 || h <= 0) return;
    const altM = h / 100;
    const imc = p / (altM * altM);
    let clasificacion = "";
    let color = "";
    if (imc < 18.5) { clasificacion = "Bajo peso"; color = "#74AEDD"; }
    else if (imc < 25) { clasificacion = "Normal"; color = "#6EC9A0"; }
    else if (imc < 30) { clasificacion = "Sobrepeso"; color = "#D4B85A"; }
    else if (imc < 35) { clasificacion = "Obesidad I"; color = "#E07070"; }
    else if (imc < 40) { clasificacion = "Obesidad II"; color = "#E07070"; }
    else { clasificacion = "Obesidad III"; color = "#E07070"; }
    const pesoMinimo = 18.5 * altM * altM;
    const pesoMaximo = 24.9 * altM * altM;
    let diferencia = 0;
    let direccion = "";
    if (imc >= 25) { diferencia = p - pesoMaximo; direccion = "bajar"; }
    else if (imc < 18.5) { diferencia = pesoMinimo - p; direccion = "subir"; }
    setResultado({ imc, clasificacion, color, pesoMinimo, pesoMaximo, diferencia, direccion });
  }, [peso, altura, edad, sexo]);

  const imcPos = resultado ? Math.min(Math.max((resultado.imc - 10) / (45 - 10) * 100, 0), 100) : 0;

  return (
    <>
      <ToolSchema
        name="Calculadora de IMC — Índice de Masa Corporal"
        description="Calcula tu IMC gratis: ingresa tu peso y altura para conocer tu clasificación (bajo peso, normal, sobrepeso u obesidad) y tu rango de peso saludable. Sin registro."
        url="https://utilbox.lat/calculadora-imc"
        category="Salud"
        faqItems={[
          { q: "¿El IMC es igual para hombres y mujeres?", a: "La fórmula del IMC es la misma para ambos sexos, pero la interpretación puede variar ligeramente. Las mujeres tienden a tener más porcentaje de grasa corporal que los hombres con el mismo IMC, lo cual es fisiológicamente normal. Algunos expertos sugieren umbrales ligeramente distintos, pero los rangos de la OMS son los más utilizados internacionalmente." },
          { q: "¿A qué edad deja de ser preciso el IMC?", a: "En adultos mayores de 65 años, el IMC puede subestimar el riesgo de salud porque con la edad se pierde masa muscular y el peso disminuye, pero el porcentaje de grasa puede seguir siendo elevado. En personas mayores, un IMC entre 22 y 27 puede ser más saludable que el rango estándar de 18.5–24.9." },
          { q: "¿Un IMC normal garantiza buena salud?", a: "No necesariamente. Puedes tener un IMC normal pero seguir siendo metabólicamente poco saludable si no haces ejercicio, tienes malos hábitos alimenticios o tienes grasa acumulada en la zona abdominal (grasa visceral). El IMC es solo un indicador, no un certificado de salud. La cintura abdominal, la presión arterial y los niveles de glucosa son complementos importantes." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/salud" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Salud</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de IMC</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: inputs */}
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>
                Peso y medidas
              </span>
            </div>

            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de IMC
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula tu índice de masa corporal y descubre tu rango de peso saludable según tu altura.
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
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular IMC
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                {/* Main IMC */}
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Tu IMC</p>
                  <p style={{ fontSize: "52px", fontWeight: 600, color: resultado.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    {fmt(resultado.imc)}
                  </p>
                  <span style={{ display: "inline-block", marginTop: "8px", background: resultado.color + "22", border: `0.5px solid ${resultado.color}44`, borderRadius: "999px", padding: "3px 12px", fontSize: "12px", fontWeight: 600, color: resultado.color }}>
                    {resultado.clasificacion}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Peso saludable</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#6EC9A0" }}>{fmt(resultado.pesoMinimo)}–{fmt(resultado.pesoMaximo)} kg</p>
                  </div>
                  {resultado.diferencia > 0 && (
                    <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                      <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Para {resultado.direccion}</p>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: resultado.direccion === "bajar" ? "#E07070" : "#74AEDD" }}>{fmt(resultado.diferencia)} kg</p>
                    </div>
                  )}
                </div>

                {/* Visual bar */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Escala de IMC</p>
                  <div style={{ position: "relative", height: "14px", borderRadius: "999px", overflow: "hidden", display: "flex" }}>
                    <div style={{ flex: 1, background: "#74AEDD" }} />
                    <div style={{ flex: 1.3, background: "#6EC9A0" }} />
                    <div style={{ flex: 1, background: "#D4B85A" }} />
                    <div style={{ flex: 2, background: "#E07070" }} />
                  </div>
                  <div style={{ position: "relative", marginTop: "6px" }}>
                    <div style={{ position: "absolute", left: `${imcPos}%`, transform: "translateX(-50%)", top: 0 }}>
                      <div style={{ width: "2px", height: "8px", background: "#FFFFFF", margin: "0 auto" }} />
                      <span style={{ fontSize: "10px", color: "#FFFFFF", fontWeight: 600, whiteSpace: "nowrap" }}>{fmt(resultado.imc)}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#EEEEEE", marginTop: "18px" }}>
                    <span>10</span><span>18.5</span><span>25</span><span>30</span><span>45+</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", marginTop: "10px", flexWrap: "wrap" }}>
                    {[
                      { color: "#74AEDD", label: "Bajo peso" },
                      { color: "#6EC9A0", label: "Normal" },
                      { color: "#D4B85A", label: "Sobrepeso" },
                      { color: "#E07070", label: "Obesidad" },
                    ].map((item) => (
                      <span key={item.label} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#EEEEEE" }}>
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
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus datos y presiona Calcular IMC</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Qué es el IMC y cómo se interpreta
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El Índice de Masa Corporal (IMC) es una medida internacional utilizada para evaluar si el peso de una persona es adecuado en relación a su altura. Se calcula dividiendo el peso en kilogramos entre el cuadrado de la altura en metros. Es una herramienta de diagnóstico rápido usada por médicos, nutriólogos y organizaciones de salud pública en todo el mundo.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La Organización Mundial de la Salud (OMS) clasifica el IMC en cuatro rangos principales: bajo peso (menos de 18.5), normal (18.5–24.9), sobrepeso (25–29.9) y obesidad (30 o más). Un IMC en rango normal está asociado a menor riesgo de enfermedades cardiovasculares, diabetes tipo 2 e hipertensión arterial.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Es importante recordar que el IMC es una herramienta de orientación, no un diagnóstico definitivo. No distingue entre masa muscular y grasa corporal, por lo que atletas con mucha masa muscular pueden tener un IMC elevado sin exceso de grasa. Para una evaluación completa, siempre consulta a un profesional de salud.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Una persona de <strong style={{ color: "#FFFFFF" }}>35 años</strong>, con <strong style={{ color: "#FFFFFF" }}>75 kg</strong> y <strong style={{ color: "#FFFFFF" }}>168 cm</strong> de altura tendría:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "IMC calculado", value: "26.6", sub: "Sobrepeso leve" },
                { label: "Peso saludable", value: "52–70 kg", sub: "Para su altura" },
                { label: "A bajar", value: "~5 kg", sub: "Para rango normal" },
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
                { q: "¿El IMC es igual para hombres y mujeres?", a: "La fórmula del IMC es la misma para ambos sexos, pero la interpretación puede variar ligeramente. Las mujeres tienden a tener más porcentaje de grasa corporal que los hombres con el mismo IMC, lo cual es fisiológicamente normal. Algunos expertos sugieren umbrales ligeramente distintos, pero los rangos de la OMS son los más utilizados internacionalmente." },
                { q: "¿A qué edad deja de ser preciso el IMC?", a: "En adultos mayores de 65 años, el IMC puede subestimar el riesgo de salud porque con la edad se pierde masa muscular y el peso disminuye, pero el porcentaje de grasa puede seguir siendo elevado. En personas mayores, un IMC entre 22 y 27 puede ser más saludable que el rango estándar de 18.5–24.9." },
                { q: "¿Un IMC normal garantiza buena salud?", a: "No necesariamente. Puedes tener un IMC normal pero seguir siendo metabólicamente poco saludable si no haces ejercicio, tienes malos hábitos alimenticios o tienes grasa acumulada en la zona abdominal (grasa visceral). El IMC es solo un indicador, no un certificado de salud. La cintura abdominal, la presión arterial y los niveles de glucosa son complementos importantes." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Explora otras herramientas de salud</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Todo lo que necesitas para cuidar tu bienestar.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/gasto-calorico-diario", label: "Gasto calórico diario", desc: "Calcula tu TMB y TDEE según actividad" },
                { href: "/calculadora-macronutrientes", label: "Calculadora de macros", desc: "Proteínas, carbos y grasas ideales" },
                { href: "/peso-ideal", label: "Calculadora de peso ideal", desc: "Tres fórmulas para tu peso objetivo" },
                { href: "/agua-diaria-ideal", label: "Agua diaria ideal", desc: "Hidratación según tu peso y clima" },
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
