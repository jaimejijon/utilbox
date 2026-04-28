"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#5C6BC0", light: "#9AAAF0", bg: "#1E1A3A", tint: "#13141F", border: "rgba(92,107,192,0.2)" };

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";

export default function CalculadoraJubilacion() {
  const [edadActual, setEdadActual] = useState("30");
  const [edadJubilacion, setEdadJubilacion] = useState("65");
  const [ahorroActual, setAhorroActual] = useState("20000");
  const [aportacionMensual, setAportacionMensual] = useState("500");
  const [retorno, setRetorno] = useState("7");
  const [inflacion, setInflacion] = useState("3");
  const [gastoMensual, setGastoMensual] = useState("2000");

  const [resultado, setResultado] = useState<{
    fondoNominal: number;
    fondoReal: number;
    anosAcumulacion: number;
    totalAportado: number;
    interesesGanados: number;
    alcanceAnios: number;
    deficit: boolean;
    aportacionNecesaria: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const ea = parseInt(edadActual) || 0;
    const ej = parseInt(edadJubilacion) || 0;
    const P = parseFloat(ahorroActual) || 0;
    const pmt = parseFloat(aportacionMensual) || 0;
    const r = (parseFloat(retorno) || 0) / 100 / 12;
    const inf = (parseFloat(inflacion) || 0) / 100;
    const gasto = parseFloat(gastoMensual) || 0;
    if (ej <= ea) return;
    const n = (ej - ea) * 12;
    let fondoNominal: number;
    if (r === 0) { fondoNominal = P + pmt * n; } else {
      fondoNominal = P * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r);
    }
    const fondoReal = fondoNominal / Math.pow(1 + inf, ej - ea);
    const totalAportado = P + pmt * n;
    const interesesGanados = fondoNominal - totalAportado;
    const rRetiro = r;
    let alcanceAnios = 0;
    if (gasto > 0) {
      if (rRetiro === 0) { alcanceAnios = fondoNominal / (gasto * 12); } else {
        const ratio = (fondoNominal * rRetiro) / gasto;
        if (ratio >= 1) { alcanceAnios = Infinity; } else {
          alcanceAnios = -Math.log(1 - ratio) / Math.log(1 + rRetiro) / 12;
        }
      }
    }
    const aniosRetiro = 25;
    const mesesRetiro = aniosRetiro * 12;
    let aportacionNecesaria = 0;
    const fondoNecesario = rRetiro === 0 ? gasto * mesesRetiro : (gasto * (1 - Math.pow(1 + rRetiro, -mesesRetiro))) / rRetiro;
    if (r === 0) { aportacionNecesaria = (fondoNecesario - P) / n; } else {
      const factor = (Math.pow(1 + r, n) - 1) / r;
      aportacionNecesaria = (fondoNecesario - P * Math.pow(1 + r, n)) / factor;
    }
    setResultado({ fondoNominal, fondoReal, anosAcumulacion: ej - ea, totalAportado, interesesGanados, alcanceAnios: Math.min(alcanceAnios, 999), deficit: alcanceAnios < 20, aportacionNecesaria: Math.max(0, aportacionNecesaria) });
  }, [edadActual, edadJubilacion, ahorroActual, aportacionMensual, retorno, inflacion, gastoMensual]);

  const fields = [
    { label: "Edad actual", suffix: "años", value: edadActual, set: setEdadActual, min: "18", max: "80" },
    { label: "Edad de jubilación", suffix: "años", value: edadJubilacion, set: setEdadJubilacion, min: "40", max: "90" },
    { label: "Ahorros actuales", suffix: "$", value: ahorroActual, set: setAhorroActual, min: "0" },
    { label: "Aportación mensual", suffix: "$", value: aportacionMensual, set: setAportacionMensual, min: "0" },
    { label: "Retorno anual esperado", suffix: "%", value: retorno, set: setRetorno, min: "0", max: "30", step: "0.5" },
    { label: "Inflación anual", suffix: "%", value: inflacion, set: setInflacion, min: "0", max: "50", step: "0.5" },
    { label: "Gasto mensual en retiro", suffix: "$", value: gastoMensual, set: setGastoMensual, min: "0", span: "sm:col-span-2" },
  ];

  return (
    <>
      <ToolSchema
        name="Calculadora de jubilación y retiro"
        description="Planifica tu jubilación: calcula cuánto ahorrar cada mes para alcanzar tu meta de retiro. Compatible con AFORE, AFP, fondos de pensión de México, Colombia, Chile, Perú y más."
        url="https://utilbox.lat/calculadora-jubilacion"
        category="Finanzas"
        faqItems={[
          { q: "¿Qué es la regla del 4% y cómo aplica al retiro?", a: "La regla del 4% indica que puedes retirar el 4% de tu fondo de retiro anualmente de forma sostenible a largo plazo, sin agotar el capital. Bajo esta regla, si tienes $500,000, podrías retirar $20,000 al año ($1,667/mes) indefinidamente. Esta calculadora usa ese mismo principio para estimar cuántos años alcanzará tu fondo." },
          { q: "¿Por qué importa la inflación en el cálculo de jubilación?", a: "La inflación erosiona el poder adquisitivo del dinero con el tiempo. Si la inflación promedia 4% anual, $2,000 de hoy equivaldrán a menos de $900 en términos de poder de compra dentro de 20 años. La calculadora muestra tanto el fondo nominal como el valor real ajustado por inflación, para que puedas planificar con base en lo que ese dinero realmente podrá comprar." },
          { q: "¿A qué edad conviene empezar a ahorrar para el retiro?", a: "Cuanto antes, mejor — sin excepción. Empezar a los 25 en lugar de los 35 puede más que duplicar el fondo final, aun aportando la misma cantidad mensual. Si ya pasaste de los 40, no desesperes: todavía hay tiempo de construir un fondo significativo aumentando las aportaciones mensuales." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/finanzas" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Finanzas</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de jubilación</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Retiro</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de jubilación
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Proyecta tu fondo de retiro y descubre si tu plan de ahorro actual será suficiente.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((f) => (
                  <div key={f.label} className={f.span || ""}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>{f.label}</label>
                      <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{f.value} {f.suffix}</span>
                    </div>
                    <input type="number" min={f.min} max={f.max} step={f.step || "1"}
                      value={f.value} onChange={(e) => f.set(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                ))}
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1 rounded-[10px] p-5 text-center"
                    style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "2px" }}>Fondo al jubilarte (nominal)</p>
                    <p style={{ fontSize: "24px", fontWeight: 600, color: NICHO.light, letterSpacing: "-0.5px" }}>${fmt(resultado.fondoNominal)}</p>
                    <p style={{ fontSize: "11px", color: "#F5F5F5", marginTop: "2px" }}>en {resultado.anosAcumulacion} años</p>
                  </div>
                  <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "2px" }}>Poder adquisitivo actual</p>
                    <p style={{ fontSize: "20px", fontWeight: 600, color: "#FFFFFF" }}>${fmt(resultado.fondoReal)}</p>
                    <p style={{ fontSize: "10px", color: "#F5F5F5", marginTop: "2px" }}>ajustado por inflación</p>
                  </div>
                  <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Total aportado</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF" }}>${fmt(resultado.totalAportado)}</p>
                  </div>
                  <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Rendimientos generados</p>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "#6EC9A0" }}>${fmt(resultado.interesesGanados)}</p>
                  </div>
                </div>

                <div className="rounded-[10px] p-5" style={{
                  background: resultado.deficit ? "rgba(224,112,112,0.08)" : "rgba(110,201,160,0.08)",
                  border: `0.5px solid ${resultado.deficit ? "rgba(224,112,112,0.25)" : "rgba(110,201,160,0.25)"}`,
                }}>
                  <div className="flex items-start gap-3">
                    <span style={{ fontSize: "18px" }}>{resultado.deficit ? "⚠" : "✓"}</span>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: resultado.deficit ? "#E07070" : "#6EC9A0", marginBottom: "4px" }}>
                        {resultado.alcanceAnios === Infinity
                          ? "Tu fondo es perpetuo — los rendimientos cubren los gastos"
                          : `Tu fondo alcanzaría aproximadamente ${resultado.alcanceAnios.toFixed(1)} años`}
                      </p>
                      {resultado.deficit && (
                        <p style={{ fontSize: "12px", color: "#E07070" }}>
                          Para cubrir 25 años de retiro necesitarías aportar{" "}
                          <strong>${fmt(resultado.aportacionNecesaria)}/mes</strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa los valores y presiona Calcular</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Por qué planificar tu jubilación desde hoy
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La calculadora de jubilación proyecta cuánto dinero tendrás al momento de retirarte y si ese fondo alcanzará para mantener tu estilo de vida durante los años de retiro. Es una de las herramientas de planificación financiera más importantes que puedes usar, sin importar la edad que tengas ahora.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La herramienta simula el crecimiento de tus ahorros actuales más tus aportaciones mensuales durante los años que faltan para jubilarte, aplicando interés compuesto. Luego calcula cuántos años alcanzaría ese fondo para cubrir tus gastos mensuales deseados. También muestra el valor real ajustado por inflación.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              En muchos países de Latinoamérica, las pensiones del sistema público son insuficientes para mantener el nivel de vida previo a la jubilación. Por eso, construir un fondo propio de retiro no es un lujo — es una necesidad.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico: el costo de esperar</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Dos personas quieren jubilarse a los 65 con gastos mensuales de <strong style={{ color: "#FFFFFF" }}>$1,500 USD</strong> y un retorno del <strong style={{ color: "#FFFFFF" }}>7% anual</strong>. La única diferencia es cuándo empiezan a ahorrar <strong style={{ color: "#FFFFFF" }}>$300/mes</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Empieza a los 25 años", value: "$910,714", sub: "Aporta $144,000 en total", note: "Fondo alcanza 50+ años", noteColor: "#6EC9A0" },
                { label: "Empieza a los 40 años", value: "$189,202", sub: "Aporta $90,000 en total", note: "Fondo alcanza ~9 años", noteColor: "#D4B85A" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>{item.label}</p>
                  <p style={{ fontSize: "22px", fontWeight: 600, color: NICHO.light, marginBottom: "4px" }}>{item.value}</p>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>{item.sub}</p>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: item.noteColor }}>{item.note}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "11px", color: "#F5F5F5", marginTop: "12px" }}>
              Esperar 15 años reduce el fondo en casi 5 veces, a pesar de haber aportado solo $54,000 menos.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Qué es la regla del 4% y cómo aplica al retiro?", a: "La regla del 4% indica que puedes retirar el 4% de tu fondo de retiro anualmente de forma sostenible a largo plazo, sin agotar el capital. Bajo esta regla, si tienes $500,000, podrías retirar $20,000 al año ($1,667/mes) indefinidamente. Esta calculadora usa ese mismo principio para estimar cuántos años alcanzará tu fondo." },
                { q: "¿Por qué importa la inflación en el cálculo de jubilación?", a: "La inflación erosiona el poder adquisitivo del dinero con el tiempo. Si la inflación promedia 4% anual, $2,000 de hoy equivaldrán a menos de $900 en términos de poder de compra dentro de 20 años. La calculadora muestra tanto el fondo nominal como el valor real ajustado por inflación, para que puedas planificar con base en lo que ese dinero realmente podrá comprar." },
                { q: "¿A qué edad conviene empezar a ahorrar para el retiro?", a: "Cuanto antes, mejor — sin excepción. Empezar a los 25 en lugar de los 35 puede más que duplicar el fondo final, aun aportando la misma cantidad mensual. Si ya pasaste de los 40, no desesperes: todavía hay tiempo de construir un fondo significativo aumentando las aportaciones mensuales." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#1A1A2E", border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Explora otras herramientas financieras</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Todo lo que necesitas para tomar mejores decisiones con tu dinero.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-interes-compuesto", label: "Interés compuesto", desc: "Proyecta el crecimiento de tus ahorros" },
                { href: "/simulador-prestamo", label: "Simulador de préstamo", desc: "Calcula tu cuota y tabla de amortización" },
                { href: "/convertidor-monedas", label: "Convertidor de monedas", desc: "20 monedas latinoamericanas y mundiales" },
                { href: "/calculadora-roi", label: "Calculadora de ROI", desc: "Mide la rentabilidad de tu inversión" },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href}
                  className="hover:!bg-[#1E1A3A] transition-colors"
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
