"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#6EC9A0", light: "#8FD9B6", bg: "#1A3D2E", tint: "#101A14", border: "rgba(110,201,160,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

function timeToMins(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minsToTime(m: number): string {
  const total = ((m % 1440) + 1440) % 1440;
  const h = Math.floor(total / 60);
  const min = total % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

interface Opcion {
  hora: string;
  ciclos: number;
  horas: number;
  minutos: number;
}

export default function CalculadoraSueno() {
  const [modo, setModo] = useState<"despertar" | "acostar">("despertar");
  const [horaDespertar, setHoraDespertar] = useState("07:00");
  const [horaAcostar, setHoraAcostar] = useState("23:00");
  const [minutosDormirse, setMinutosDormirse] = useState("14");
  const [resultado, setResultado] = useState<Opcion[] | null>(null);

  const calcular = useCallback(() => {
    const mDormirse = parseInt(minutosDormirse) || 14;
    const opciones: Opcion[] = [];
    if (modo === "despertar") {
      const despMins = timeToMins(horaDespertar);
      for (const ciclos of [6, 5, 4, 3]) {
        const totalMin = ciclos * 90 + mDormirse;
        const horaAcostarse = minsToTime(despMins - totalMin);
        const durMin = ciclos * 90;
        opciones.push({ hora: horaAcostarse, ciclos, horas: Math.floor(durMin / 60), minutos: durMin % 60 });
      }
    } else {
      const acostMins = timeToMins(horaAcostar);
      for (const ciclos of [3, 4, 5, 6]) {
        const totalMin = ciclos * 90 + mDormirse;
        const horaDespertarse = minsToTime(acostMins + totalMin);
        const durMin = ciclos * 90;
        opciones.push({ hora: horaDespertarse, ciclos, horas: Math.floor(durMin / 60), minutos: durMin % 60 });
      }
    }
    setResultado(opciones);
  }, [modo, horaDespertar, horaAcostar, minutosDormirse]);

  return (
    <>
      <ToolSchema
        name="Calculadora de sueño y ciclos de descanso"
        description="Calcula a qué hora dormir o despertar para completar ciclos de sueño completos de 90 minutos y descansar mejor. Basada en fases de sueño REM. Gratis."
        url="https://utilbox.lat/calculadora-sueno"
        category="Salud"
        faqItems={[
          { q: "¿Por qué exactamente 90 minutos por ciclo?", a: "El ciclo de 90 minutos es un promedio observado en estudios de polisomnografía. En la práctica, los ciclos pueden variar entre 70 y 120 minutos según la persona y la noche. Los primeros ciclos de la noche tienen más sueño profundo (restaurador); los últimos tienen más REM (importante para memoria y creatividad). Ambos son esenciales." },
          { q: "¿Qué pasa si no puedo cumplir los horarios exactos?", a: "Un margen de 10–15 minutos no afecta significativamente. Lo más importante es la consistencia: dormir y despertar a la misma hora todos los días (incluyendo fines de semana) fortalece el ritmo circadiano, hace más fácil quedarte dormido y te ayuda a despertar con mayor energía naturalmente." },
          { q: "¿Las siestas afectan los ciclos nocturnos?", a: "Las siestas cortas de 10–20 minutos son beneficiosas y no interfieren con el sueño nocturno. Las siestas de 30–90 minutos pueden reducir la presión del sueño y dificultar conciliar el sueño nocturno. Evita dormir siesta después de las 3pm y limita la duración a 20 minutos para el máximo beneficio sin efectos negativos." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/salud" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Salud</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de sueño</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Sueño</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de sueño
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "20px" }}>
              Descubre los mejores horarios para dormir o despertar basados en tus ciclos de sueño de 90 minutos.
            </p>

            <div className="flex gap-2 mb-5">
              {(["despertar", "acostar"] as const).map((m) => (
                <button key={m} onClick={() => { setModo(m); setResultado(null); }}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                  style={{
                    background: modo === m ? NICHO.bg : "#141520",
                    color: modo === m ? NICHO.color : "#FFFFFF",
                    border: `0.5px solid ${modo === m ? NICHO.border : "#1E2030"}`,
                  }}>
                  {m === "despertar" ? "Quiero despertar a..." : "Quiero acostarme a..."}
                </button>
              ))}
            </div>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="flex flex-col gap-4">
                {modo === "despertar" ? (
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>
                      Hora de despertar
                    </label>
                    <input type="time" value={horaDespertar} onChange={(e) => setHoraDespertar(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                ) : (
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>
                      Hora de acostarse
                    </label>
                    <input type="time" value={horaAcostar} onChange={(e) => setHoraAcostar(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                )}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Minutos para dormirse</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{minutosDormirse} min</span>
                  </div>
                  <input type="number" min="0" max="60" step="1" value={minutosDormirse} onChange={(e) => setMinutosDormirse(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular horarios
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-3">
                <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "4px" }}>
                  {modo === "despertar" ? "Acuéstate a una de estas horas:" : "Despierta a una de estas horas:"}
                </p>
                {resultado.map((op) => {
                  const esRecomendado = op.ciclos === 5 || op.ciclos === 6;
                  return (
                    <div key={op.ciclos}
                      style={{
                        background: esRecomendado ? NICHO.bg : "#141520",
                        border: `0.5px solid ${esRecomendado ? NICHO.border : "#1E2030"}`,
                        borderRadius: "10px",
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}>
                      <div>
                        <p style={{ fontSize: "28px", fontWeight: 600, color: esRecomendado ? NICHO.light : "#FFFFFF", letterSpacing: "-0.5px" }}>
                          {op.hora}
                        </p>
                        <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "2px" }}>
                          {op.horas}h {op.minutos > 0 ? `${op.minutos}min` : ""} · {op.ciclos} ciclos
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        {esRecomendado && (
                          <span style={{ display: "inline-block", background: NICHO.color + "22", border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "3px 10px", fontSize: "10px", fontWeight: 600, color: NICHO.color, marginBottom: "4px" }}>
                            Recomendado
                          </span>
                        )}
                        <p style={{ fontSize: "11px", color: "#EEEEEE" }}>
                          {op.ciclos} × 90 min
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tu horario y presiona Calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Los ciclos de sueño y por qué importan
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El sueño no es un estado uniforme: ocurre en ciclos de aproximadamente 90 minutos, cada uno compuesto por fases de sueño ligero, sueño profundo (REM y no-REM). Despertar al final de un ciclo, cuando el sueño es más ligero, hace que te sientas descansado y alerta. Despertar en medio de un ciclo de sueño profundo produce el fenómeno de "inercia del sueño" — esa sensación pesada y confusa que a veces persiste horas.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Esta calculadora toma en cuenta los ~14 minutos promedio que tarda una persona en dormirse y planifica los horarios para que despiertes al final de un ciclo completo. Los 5–6 ciclos (7.5–9 horas) son los más recomendados por la National Sleep Foundation para adultos de 18–64 años.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Dormir bien tiene impacto directo en el metabolismo, el sistema inmune, la memoria, el estado de ánimo y la salud cardiovascular. La privación crónica de sueño está asociada con mayor riesgo de obesidad, diabetes tipo 2 e hipertensión.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo: quiero despertar a las 6:30 am</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "6 ciclos (9h)", value: "21:16", color: NICHO.light, rec: true },
                { label: "5 ciclos (7.5h)", value: "22:46", color: NICHO.light, rec: true },
                { label: "4 ciclos (6h)", value: "00:16", color: "#FFFFFF", rec: false },
                { label: "3 ciclos (4.5h)", value: "01:46", color: "#EEEEEE", rec: false },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px", textAlign: "center" }}>
                  <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "18px", fontWeight: 600, color: item.color }}>{item.value}</p>
                  {item.rec && <p style={{ fontSize: "9px", color: NICHO.color, marginTop: "2px" }}>Recomendado</p>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Por qué exactamente 90 minutos por ciclo?", a: "El ciclo de 90 minutos es un promedio observado en estudios de polisomnografía. En la práctica, los ciclos pueden variar entre 70 y 120 minutos según la persona y la noche. Los primeros ciclos de la noche tienen más sueño profundo (restaurador); los últimos tienen más REM (importante para memoria y creatividad). Ambos son esenciales." },
                { q: "¿Qué pasa si no puedo cumplir los horarios exactos?", a: "Un margen de 10–15 minutos no afecta significativamente. Lo más importante es la consistencia: dormir y despertar a la misma hora todos los días (incluyendo fines de semana) fortalece el ritmo circadiano, hace más fácil quedarte dormido y te ayuda a despertar con mayor energía naturalmente." },
                { q: "¿Las siestas afectan los ciclos nocturnos?", a: "Las siestas cortas de 10–20 minutos (\"power naps\") son beneficiosas y no interfieren con el sueño nocturno. Las siestas de 30–90 minutos pueden reducir la presión del sueño y dificultar conciliar el sueño nocturno. Evita dormir siesta después de las 3pm y limita la duración a 20 minutos para el máximo beneficio sin efectos negativos." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Cuida todos los aspectos de tu salud.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-imc", label: "Calculadora de IMC", desc: "Verifica tu índice de masa corporal" },
                { href: "/gasto-calorico-diario", label: "Gasto calórico diario", desc: "Cuántas calorías necesitas al día" },
                { href: "/edad-biologica", label: "Edad biológica", desc: "Estima tu edad real según tus hábitos" },
                { href: "/agua-diaria-ideal", label: "Agua diaria ideal", desc: "Hidratación óptima según tu peso" },
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
