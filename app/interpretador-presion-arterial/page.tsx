"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#6EC9A0", light: "#8FD9B6", bg: "#1A3D2E", tint: "#101A14", border: "rgba(110,201,160,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

interface Clasificacion {
  clase: string;
  color: string;
  nivel: number;
  descripcion: string;
  recomendacion: string;
}

function clasificarPA(s: number, d: number): Clasificacion {
  if (s > 180 || d > 120) return {
    clase: "Crisis hipertensiva",
    color: "#E07070",
    nivel: 5,
    descripcion: "Presión extremadamente elevada. Riesgo inmediato para la vida.",
    recomendacion: "Busca atención médica de emergencia inmediatamente. No esperes.",
  };
  if (s >= 140 || d >= 90) return {
    clase: "Hipertensión Etapa 2",
    color: "#E07070",
    nivel: 4,
    descripcion: "Presión significativamente elevada que requiere tratamiento médico.",
    recomendacion: "Consulta a tu médico pronto. Probablemente necesites medicación y cambios en el estilo de vida.",
  };
  if (s >= 130 || d >= 80) return {
    clase: "Hipertensión Etapa 1",
    color: "#D4B85A",
    nivel: 3,
    descripcion: "Presión elevada que requiere atención y posiblemente tratamiento.",
    recomendacion: "Habla con tu médico. Reduce sodio, haz ejercicio regularmente y monitorea tu presión.",
  };
  if (s >= 120 && d < 80) return {
    clase: "Presión elevada",
    color: "#D4B85A",
    nivel: 2,
    descripcion: "Presión por encima de lo ideal. Sin síntomas pero con mayor riesgo futuro.",
    recomendacion: "Adopta hábitos saludables: reduce sodio, alcohol, estrés y aumenta la actividad física.",
  };
  return {
    clase: "Normal",
    color: "#6EC9A0",
    nivel: 1,
    descripcion: "Tu presión arterial está en rango óptimo. ¡Excelente!",
    recomendacion: "Mantén tus hábitos saludables y revisa tu presión al menos una vez al año.",
  };
}

const niveles = [
  { label: "Normal", color: "#6EC9A0" },
  { label: "Elevada", color: "#D4B85A" },
  { label: "HTA Etapa 1", color: "#D4B85A" },
  { label: "HTA Etapa 2", color: "#E07070" },
  { label: "Crisis", color: "#E07070" },
];

export default function InterpretadorPresionArterial() {
  const [sistolica, setSistolica] = useState("120");
  const [diastolica, setDiastolica] = useState("80");
  const [resultado, setResultado] = useState<Clasificacion | null>(null);

  const calcular = useCallback(() => {
    const s = parseInt(sistolica) || 0;
    const d = parseInt(diastolica) || 0;
    if (s <= 0 || d <= 0) return;
    setResultado(clasificarPA(s, d));
  }, [sistolica, diastolica]);

  return (
    <>
      <ToolSchema
        name="Interpretador de presión arterial"
        description="Interpreta tu lectura de presión arterial: sistólica y diastólica. Descubre si es normal, alta o baja y qué significa para tu salud cardiovascular. Gratis y sin registro."
        url="https://utilbox.lat/interpretador-presion-arterial"
        category="Salud"
        faqItems={[
          { q: "¿Por qué la presión varía durante el día?", a: "La presión arterial fluctúa constantemente a lo largo del día. Suele ser más baja por la mañana al despertar y sube naturalmente durante la tarde. El estrés, el café, el ejercicio, las emociones y hasta hablar pueden elevarla temporalmente. Por eso se recomienda medir siempre en las mismas condiciones y nunca después de hacer ejercicio o consumir estimulantes." },
          { q: "¿Qué diferencia hay entre hipertensión y presión alta ocasional?", a: "La hipertensión es el diagnóstico de presión arterial crónicamente elevada, confirmado con múltiples mediciones en distintos días y momentos. Un valor elevado aislado no es suficiente para diagnosticar hipertensión. El fenómeno de hipertensión de bata blanca (presión alta solo en el consultorio médico) es común y puede llevar a diagnósticos incorrectos sin el contexto adecuado." },
          { q: "¿Cómo puedo bajar la presión sin medicamentos?", a: "Para presión levemente elevada, los cambios en el estilo de vida pueden ser suficientes: reducir el sodio a menos de 2,300 mg/día, hacer 150 min/semana de ejercicio aeróbico, mantener un peso saludable, reducir el alcohol, dejar de fumar y manejar el estrés. La dieta DASH (rica en frutas, verduras y baja en sodio) ha demostrado reducir la presión sistólica hasta 11 mmHg." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/salud" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Salud</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Interpretador de presión arterial</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Peso y medidas</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Interpretador de presión arterial
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Ingresa tu presión arterial y descubre si está en rango normal según las guías AHA 2017.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Sistólica</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{sistolica} mmHg</span>
                  </div>
                  <input type="number" min="60" max="300" step="1" value={sistolica} onChange={(e) => setSistolica(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "4px" }}>El número mayor (arriba)</p>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Diastólica</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{diastolica} mmHg</span>
                  </div>
                  <input type="number" min="40" max="200" step="1" value={diastolica} onChange={(e) => setDiastolica(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "4px" }}>El número menor (abajo)</p>
                </div>
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Interpretar presión arterial
              </button>
            </div>

            {/* Reference card */}
            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px", marginTop: "12px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Tabla de referencia AHA 2017
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Normal", range: "< 120 / < 80", color: "#6EC9A0" },
                  { label: "Elevada", range: "120–129 / < 80", color: "#D4B85A" },
                  { label: "HTA Etapa 1", range: "130–139 / 80–89", color: "#D4B85A" },
                  { label: "HTA Etapa 2", range: "≥ 140 / ≥ 90", color: "#E07070" },
                  { label: "Crisis", range: "> 180 / > 120", color: "#E07070" },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#EEEEEE" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: row.color, flexShrink: 0, display: "block" }} />
                      {row.label}
                    </span>
                    <span style={{ fontSize: "11px", color: "#F5F5F5", fontFamily: "monospace" }}>{row.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: resultado.nivel >= 4 ? "#2A1A1A" : resultado.nivel >= 3 ? "#2A2510" : NICHO.bg, border: `0.5px solid ${resultado.color}44` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "8px" }}>
                    {sistolica} / {diastolica} mmHg
                  </p>
                  <p style={{ fontSize: "28px", fontWeight: 600, color: resultado.color, lineHeight: 1.2, marginBottom: "10px" }}>
                    {resultado.clase}
                  </p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.5" }}>{resultado.descripcion}</p>
                </div>

                {/* Level indicator */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "12px" }}>Indicador de nivel</p>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {niveles.map((n, i) => (
                      <div key={n.label} style={{ flex: 1 }}>
                        <div style={{
                          height: "10px",
                          borderRadius: "4px",
                          background: i < resultado.nivel ? n.color : "#1E2030",
                          marginBottom: "4px",
                        }} />
                        <p style={{ fontSize: "9px", color: "#EEEEEE", textAlign: "center", lineHeight: 1.2 }}>{n.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "8px" }}>Recomendación</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{resultado.recomendacion}</p>
                </div>

                {/* Disclaimer */}
                <div style={{ background: "#141520", border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.6" }}>
                    <strong style={{ color: "#FFFFFF" }}>Aviso médico:</strong> Esta herramienta es solo de referencia educativa. Para diagnóstico y tratamiento, consulta siempre a un médico. Toma la presión en reposo, sentado, con el brazo al nivel del corazón.
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tu presión y presiona Interpretar</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo interpretar la presión arterial
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La presión arterial se mide con dos números: la presión sistólica (el mayor, cuando el corazón late) y la presión diastólica (el menor, cuando el corazón descansa entre latidos). Se expresa como "sistólica sobre diastólica" en milímetros de mercurio (mmHg), por ejemplo 120/80 mmHg.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Las guías de la American Heart Association (AHA) de 2017 redefinieron los umbrales de hipertensión: ahora se considera hipertensión etapa 1 a partir de 130/80 mmHg (antes el umbral era 140/90). Esta calculadora sigue estos criterios actualizados, los más utilizados en América Latina.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              La hipertensión arterial afecta a más del 30% de los adultos en Latinoamérica y es el principal factor de riesgo para infartos y derrames cerebrales. La mayoría de los hipertensos no tienen síntomas, por lo que el monitoreo regular es fundamental.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Cómo medir correctamente tu presión arterial</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Reposa 5 min", sub: "Antes de medir" },
                { label: "Brazo al corazón", sub: "Posición correcta" },
                { label: "No café previo", sub: "30 min antes" },
                { label: "Mide 2 veces", sub: "Promedia el resultado" },
                { label: "Misma hora", sub: "Para comparar" },
                { label: "Vejiga vacía", sub: "Antes de medir" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px", textAlign: "center" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "2px" }}>{item.label}</p>
                  <p style={{ fontSize: "10px", color: "#EEEEEE" }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Por qué la presión varía durante el día?", a: "La presión arterial fluctúa constantemente a lo largo del día. Suele ser más baja por la mañana al despertar y sube naturalmente durante la tarde. El estrés, el café, el ejercicio, las emociones y hasta hablar pueden elevarla temporalmente. Por eso se recomienda medir siempre en las mismas condiciones y nunca después de hacer ejercicio o consumir estimulantes." },
                { q: "¿Qué diferencia hay entre hipertensión y presión alta ocasional?", a: "La hipertensión es el diagnóstico de presión arterial crónicamente elevada, confirmado con múltiples mediciones en distintos días y momentos. Un valor elevado aislado no es suficiente para diagnosticar hipertensión. El fenómeno de 'hipertensión de bata blanca' (presión alta solo en el consultorio médico) es común y puede llevar a diagnósticos incorrectos sin el contexto adecuado." },
                { q: "¿Cómo puedo bajar la presión sin medicamentos?", a: "Para presión levemente elevada, los cambios en el estilo de vida pueden ser suficientes: reducir el sodio a menos de 2,300 mg/día, hacer 150 min/semana de ejercicio aeróbico, mantener un peso saludable, reducir el alcohol, dejar de fumar y manejar el estrés. La dieta DASH (rica en frutas, verduras y baja en sodio) ha demostrado reducir la presión sistólica hasta 11 mmHg." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Más herramientas de salud cardiovascular</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Monitorea tu salud integralmente.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-imc", label: "Calculadora de IMC", desc: "El sobrepeso es factor de riesgo cardiovascular" },
                { href: "/gasto-calorico-diario", label: "Gasto calórico diario", desc: "Controla tu ingesta calórica" },
                { href: "/edad-biologica", label: "Edad biológica", desc: "Estima el estado real de tu cuerpo" },
                { href: "/peso-ideal", label: "Calculadora de peso ideal", desc: "Descubre tu peso objetivo saludable" },
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
