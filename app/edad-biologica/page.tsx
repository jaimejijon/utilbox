"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#6EC9A0", light: "#8FD9B6", bg: "#1A3D2E", tint: "#101A14", border: "rgba(110,201,160,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

export default function EdadBiologica() {
  const [edad, setEdad] = useState("35");
  const [sueno, setSueno] = useState("7");
  const [ejercicio, setEjercicio] = useState("3");
  const [fuma, setFuma] = useState("no");
  const [alcohol, setAlcohol] = useState("ocasional");
  const [alimentacion, setAlimentacion] = useState("regular");
  const [estres, setEstres] = useState("medio");
  const [imc, setImc] = useState("normal");
  const [resultado, setResultado] = useState<{
    edadBiologica: number;
    diferencia: number;
    factoresEnvejecen: string[];
    factoresRejuvenecen: string[];
  } | null>(null);

  const calcular = useCallback(() => {
    let ajuste = 0;
    const envejecen: string[] = [];
    const rejuvenecen: string[] = [];

    const h = parseInt(sueno);
    if (h < 6) { ajuste += 2; envejecen.push("Poco sueño (menos de 6h)"); }
    else if (h >= 7 && h <= 8) { ajuste -= 1; rejuvenecen.push("Sueño óptimo (7–8h)"); }

    const ex = parseInt(ejercicio);
    if (ex === 0) { ajuste += 3; envejecen.push("Sedentarismo total"); }
    else if (ex >= 5) { ajuste -= 2; rejuvenecen.push("Ejercicio frecuente (5+ días)"); }

    if (fuma === "si") { ajuste += 5; envejecen.push("Fumar tabaco"); }
    else { rejuvenecen.push("No fumar"); }

    if (alcohol === "frecuente") { ajuste += 2; envejecen.push("Consumo frecuente de alcohol"); }
    else if (alcohol === "nunca") { rejuvenecen.push("No beber alcohol"); }

    if (alimentacion === "excelente") { ajuste -= 2; rejuvenecen.push("Alimentación excelente"); }
    else if (alimentacion === "muy_mala") { ajuste += 3; envejecen.push("Alimentación muy deficiente"); }
    else if (alimentacion === "mala") { ajuste += 1; envejecen.push("Alimentación deficiente"); }

    if (estres === "alto") { ajuste += 2; envejecen.push("Estrés crónico alto"); }
    else if (estres === "bajo") { ajuste -= 1; rejuvenecen.push("Nivel de estrés bajo"); }

    if (imc === "normal") { ajuste -= 1; rejuvenecen.push("IMC en rango normal"); }
    else if (imc === "obeso") { ajuste += 3; envejecen.push("Obesidad (IMC ≥ 30)"); }
    else if (imc === "sobrepeso") { ajuste += 1; envejecen.push("Sobrepeso (IMC 25–29)"); }

    const edadBiologica = parseInt(edad) + ajuste;
    setResultado({ edadBiologica, diferencia: ajuste, factoresEnvejecen: envejecen, factoresRejuvenecen: rejuvenecen });
  }, [edad, sueno, ejercicio, fuma, alcohol, alimentacion, estres, imc]);

  return (
    <>
      <ToolSchema
        name="Calculadora de edad biológica"
        description="Descubre cuántos años tiene realmente tu cuerpo según tus hábitos de salud, actividad física, dieta y descanso. Compara tu edad biológica con tu edad cronológica."
        url="https://utilbox.lat/edad-biologica"
        category="Salud"
        faqItems={[
          { q: "¿Se puede reducir la edad biológica?", a: "Sí. Estudios recientes como el de Blackburn y Epel (premios Nobel) demuestran que cambios en el estilo de vida pueden revertir marcadores de envejecimiento biológico. Dejar de fumar, empezar a hacer ejercicio regularmente y mejorar la dieta pueden reducir la edad biológica entre 3 y 10 años en un período de 6 meses a 2 años." },
          { q: "¿El estrés realmente envejece?", a: "Sí, y la evidencia científica es sólida. El estrés crónico activa el sistema nervioso simpático de forma persistente, aumenta los niveles de cortisol y promueve la inflamación sistémica. Esto acelera el acortamiento de los telómeros (el reloj biológico de las células) y está asociado con mayor riesgo de enfermedades cardiovasculares, diabetes y deterioro cognitivo." },
          { q: "¿Por qué el sueño afecta tanto el envejecimiento?", a: "Durante el sueño profundo, el cuerpo libera hormona del crecimiento, repara tejidos, consolida la memoria y limpia el cerebro de proteínas tóxicas (el sistema glinfático). La privación crónica de sueño reduce la longitud de los telómeros, aumenta la inflamación y está asociada con mayor riesgo de enfermedades relacionadas con el envejecimiento." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/salud" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Salud</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de edad biológica</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Peso y medidas</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de edad biológica
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Estima tu edad biológica real basada en tus hábitos de salud, sueño, ejercicio y alimentación.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Edad cronológica</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{edad} años</span>
                  </div>
                  <input type="number" min="18" max="100" step="1" value={edad} onChange={(e) => setEdad(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Horas de sueño/noche</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{sueno}h</span>
                  </div>
                  <input type="number" min="3" max="12" step="1" value={sueno} onChange={(e) => setSueno(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Días de ejercicio/semana</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{ejercicio} días</span>
                  </div>
                  <input type="number" min="0" max="7" step="1" value={ejercicio} onChange={(e) => setEjercicio(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>¿Fumas?</label>
                  <select value={fuma} onChange={(e) => setFuma(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="no">No</option>
                    <option value="si">Sí</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Consumo de alcohol</label>
                  <select value={alcohol} onChange={(e) => setAlcohol(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="nunca">Nunca</option>
                    <option value="ocasional">Ocasional</option>
                    <option value="frecuente">Frecuente</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Calidad de alimentación</label>
                  <select value={alimentacion} onChange={(e) => setAlimentacion(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="excelente">Excelente</option>
                    <option value="buena">Buena</option>
                    <option value="regular">Regular</option>
                    <option value="mala">Deficiente</option>
                    <option value="muy_mala">Muy deficiente</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Nivel de estrés</label>
                  <select value={estres} onChange={(e) => setEstres(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="bajo">Bajo</option>
                    <option value="medio">Medio</option>
                    <option value="alto">Alto</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Índice de masa corporal</label>
                  <select value={imc} onChange={(e) => setImc(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="bajo_peso">Bajo peso</option>
                    <option value="normal">Normal (18.5–24.9)</option>
                    <option value="sobrepeso">Sobrepeso (25–29.9)</option>
                    <option value="obeso">Obesidad (30+)</option>
                  </select>
                </div>
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular edad biológica
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Tu edad biológica estimada</p>
                  <p style={{ fontSize: "60px", fontWeight: 600, color: resultado.diferencia <= 0 ? NICHO.light : "#E07070", letterSpacing: "-2px", lineHeight: 1 }}>
                    {resultado.edadBiologica}
                  </p>
                  <p style={{ fontSize: "14px", color: "#EEEEEE", marginTop: "8px" }}>
                    {resultado.diferencia === 0 && "Igual a tu edad cronológica"}
                    {resultado.diferencia < 0 && <span style={{ color: NICHO.light }}>¡{Math.abs(resultado.diferencia)} años menor que tu edad real!</span>}
                    {resultado.diferencia > 0 && <span style={{ color: "#E07070" }}>{resultado.diferencia} años mayor que tu edad real</span>}
                  </p>
                </div>

                {resultado.factoresRejuvenecen.length > 0 && (
                  <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: NICHO.light, marginBottom: "10px" }}>Factores que te rejuvenecen</p>
                    <div className="flex flex-col gap-2">
                      {resultado.factoresRejuvenecen.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ color: NICHO.light, fontSize: "14px", flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: "12px", color: "#EEEEEE" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {resultado.factoresEnvejecen.length > 0 && (
                  <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "#E07070", marginBottom: "10px" }}>Factores que aceleran el envejecimiento</p>
                    <div className="flex flex-col gap-2">
                      {resultado.factoresEnvejecen.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ color: "#E07070", fontSize: "14px", flexShrink: 0 }}>✗</span>
                          <span style={{ fontSize: "12px", color: "#EEEEEE" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Completa el formulario y presiona Calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Qué es la edad biológica y por qué difiere de la cronológica
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La edad biológica refleja el estado real de tu cuerpo a nivel celular, tisular y funcional, independientemente de cuántos años hayas cumplido. Dos personas de 40 años pueden tener edades biológicas muy diferentes: una podría comportarse como un cuerpo de 35, la otra como uno de 50, dependiendo de sus hábitos de vida.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La investigación en epigenética muestra que factores como el ejercicio, el sueño, la alimentación, el estrés y el tabaquismo modifican la expresión genética y aceleran o desaceleran el envejecimiento celular. Los marcadores más estudiados incluyen la longitud de los telómeros, la metilación del ADN y los niveles de inflamación sistémica.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Esta calculadora es una estimación educativa basada en factores de riesgo y protección validados por la ciencia. No sustituye una evaluación médica profesional que incluya análisis de sangre, función cardiovascular y otros marcadores biológicos precisos.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Impacto estimado de los hábitos en la edad biológica</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Fumar", value: "+5 años", color: "#E07070" },
                { label: "Sedentarismo", value: "+3 años", color: "#E07070" },
                { label: "Ejercicio 5+/sem", value: "−2 años", color: NICHO.light },
                { label: "Alimentación excelente", value: "−2 años", color: NICHO.light },
                { label: "Sueño óptimo", value: "−1 año", color: NICHO.light },
                { label: "Estrés crónico", value: "+2 años", color: "#D4B85A" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px", textAlign: "center" }}>
                  <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: item.color }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Se puede reducir la edad biológica?", a: "Sí. Estudios recientes como el de Blackburn y Epel (premios Nobel) demuestran que cambios en el estilo de vida pueden revertir marcadores de envejecimiento biológico. Dejar de fumar, empezar a hacer ejercicio regularmente y mejorar la dieta pueden reducir la edad biológica entre 3 y 10 años en un período de 6 meses a 2 años." },
                { q: "¿El estrés realmente envejece?", a: "Sí, y la evidencia científica es sólida. El estrés crónico activa el sistema nervioso simpático de forma persistente, aumenta los niveles de cortisol y promueve la inflamación sistémica. Esto acelera el acortamiento de los telómeros (el reloj biológico de las células) y está asociado con mayor riesgo de enfermedades cardiovasculares, diabetes y deterioro cognitivo." },
                { q: "¿Por qué el sueño afecta tanto el envejecimiento?", a: "Durante el sueño profundo, el cuerpo libera hormona del crecimiento, repara tejidos, consolida la memoria y limpia el cerebro de proteínas tóxicas (el sistema glinfático). La privación crónica de sueño reduce la longitud de los telómeros, aumenta la inflamación y está asociada con mayor riesgo de enfermedades relacionadas con el envejecimiento." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Más herramientas de bienestar</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Mejora tus hábitos con estas calculadoras.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-sueno", label: "Calculadora de sueño", desc: "Descubre tus horarios óptimos de descanso" },
                { href: "/calculadora-imc", label: "Calculadora de IMC", desc: "Verifica tu índice de masa corporal" },
                { href: "/calorias-ejercicio", label: "Calorías por ejercicio", desc: "Cuántas calorías quemas al entrenar" },
                { href: "/interpretador-presion-arterial", label: "Presión arterial", desc: "Interpreta tus valores según la AHA" },
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
