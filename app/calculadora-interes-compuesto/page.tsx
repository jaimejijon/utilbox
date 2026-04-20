"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#5C6BC0", light: "#7F8FE0", bg: "#1E1A3A", tint: "#13141F", border: "rgba(92,107,192,0.2)" };

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface YearRow {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

const inputClass =
  "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 transition-colors";
const inputStyle = {
  background: "#0F1117",
  border: "0.5px solid #1E2030",
  color: "#ECECEC",
};

export default function CalculadoraInteresCompuesto() {
  const [capital, setCapital] = useState("10000");
  const [aportacion, setAportacion] = useState("500");
  const [tasa, setTasa] = useState("8");
  const [plazo, setPlazo] = useState("20");
  const [resultado, setResultado] = useState<{
    total: number;
    capitalAportado: number;
    intereses: number;
    rows: YearRow[];
  } | null>(null);

  const calcular = useCallback(() => {
    const P = parseFloat(capital) || 0;
    const pmt = parseFloat(aportacion) || 0;
    const r = (parseFloat(tasa) || 0) / 100 / 12;
    const n = (parseInt(plazo) || 0) * 12;
    if (P < 0 || r < 0 || n <= 0) return;
    let balance = P;
    const rows: YearRow[] = [];
    for (let year = 1; year <= parseInt(plazo); year++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + r) + pmt;
      }
      rows.push({
        year,
        balance,
        contributions: P + pmt * 12 * year,
        interest: balance - (P + pmt * 12 * year),
      });
    }
    const totalAportado = P + pmt * n;
    setResultado({ total: balance, capitalAportado: totalAportado, intereses: balance - totalAportado, rows });
  }, [capital, aportacion, tasa, plazo]);

  const pct = resultado ? Math.round((resultado.capitalAportado / resultado.total) * 100) : 0;

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: "13px", color: "#555", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#555", textDecoration: "none" }} className="hover:!text-[#888] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/finanzas" style={{ color: "#555", textDecoration: "none" }} className="hover:!text-[#888] transition-colors">Finanzas</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#888" }}>Interés compuesto</span>
        </nav>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: inputs */}
          <div className="lg:w-2/5 flex-shrink-0">
            {/* Badge + title */}
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>
                Inversión
              </span>
            </div>

            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#ECECEC", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de interés compuesto
            </h1>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65", marginBottom: "24px" }}>
              Simula el crecimiento de tu inversión con aportaciones mensuales y capitalización mensual.
            </p>

            {/* Form */}
            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Capital inicial", suffix: "$", value: capital, set: setCapital, min: "0", step: "any" },
                  { label: "Aportación mensual", suffix: "$", value: aportacion, set: setAportacion, min: "0", step: "any" },
                  { label: "Tasa anual", suffix: "%", value: tasa, set: setTasa, min: "0", max: "100", step: "0.1" },
                  { label: "Plazo", suffix: "años", value: plazo, set: setPlazo, min: "1", max: "60", step: "1" },
                ].map((f) => (
                  <div key={f.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#888" }}>{f.label}</label>
                      <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{f.value} {f.suffix}</span>
                    </div>
                    <input
                      type="number"
                      min={f.min}
                      max={f.max}
                      step={f.step}
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      className={inputClass}
                      style={{ ...inputStyle, outline: "none" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={calcular}
                className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}
              >
                Calcular
              </button>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                {/* Stat cards 2x2 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1 rounded-[10px] p-5 text-center"
                    style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                    <p style={{ fontSize: "11px", color: "#666", marginBottom: "4px" }}>Monto final</p>
                    <p style={{ fontSize: "26px", fontWeight: 600, color: NICHO.light, letterSpacing: "-0.5px" }}>${fmt(resultado.total)}</p>
                  </div>
                  <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#666", marginBottom: "4px" }}>Capital aportado</p>
                    <p style={{ fontSize: "20px", fontWeight: 600, color: "#D0D0D0" }}>${fmt(resultado.capitalAportado)}</p>
                  </div>
                  <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#666", marginBottom: "4px" }}>Intereses ganados</p>
                    <p style={{ fontSize: "20px", fontWeight: 600, color: "#6EC9A0" }}>${fmt(resultado.intereses)}</p>
                  </div>
                </div>

                {/* Bar */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#888", marginBottom: "10px" }}>Composición del monto final</p>
                  <div style={{ width: "100%", height: "14px", borderRadius: "999px", overflow: "hidden", display: "flex", background: "#0F1117" }}>
                    <div style={{ width: `${pct}%`, background: NICHO.color, height: "100%", transition: "width 0.4s ease" }} />
                    <div style={{ flex: 1, background: "#6EC9A0", height: "100%" }} />
                  </div>
                  <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#555" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: NICHO.color, display: "block" }} />
                      Aportado ({pct}%)
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#555" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#6EC9A0", display: "block" }} />
                      Intereses ({100 - pct}%)
                    </span>
                  </div>
                </div>

                {/* Table */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", overflow: "hidden" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#888", padding: "14px 16px", borderBottom: "0.5px solid #1E2030" }}>
                    Evolución anual
                  </p>
                  <div style={{ overflowX: "auto", maxHeight: "280px", overflowY: "auto" }}>
                    <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "#0A0B10" }}>
                          {["Año", "Saldo", "Aportado", "Intereses"].map((h, i) => (
                            <th key={h} style={{ padding: "10px 14px", textAlign: i === 0 ? "left" : "right", fontWeight: 600, color: "#555", borderBottom: "0.5px solid #1E2030" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {resultado.rows.map((row) => (
                          <tr key={row.year} style={{ borderBottom: "0.5px solid #1A1A2A" }}>
                            <td style={{ padding: "9px 14px", color: "#888", fontWeight: 600 }}>{row.year}</td>
                            <td style={{ padding: "9px 14px", textAlign: "right", color: NICHO.light, fontWeight: 600 }}>${fmt(row.balance)}</td>
                            <td style={{ padding: "9px 14px", textAlign: "right", color: "#666" }}>${fmt(row.contributions)}</td>
                            <td style={{ padding: "9px 14px", textAlign: "right", color: "#6EC9A0" }}>${fmt(row.interest)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#555" }}>Ingresa los valores y presiona Calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#ECECEC", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Qué es el interés compuesto y cómo funciona
            </h2>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65", marginBottom: "14px" }}>
              El interés compuesto es uno de los conceptos más poderosos de las finanzas personales. A diferencia del interés simple, que siempre se calcula sobre el capital original, el interés compuesto se calcula sobre el saldo acumulado: cada período ganas intereses sobre tus intereses anteriores. Este efecto "bola de nieve" hace que el dinero crezca de forma exponencial con el tiempo.
            </p>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65", marginBottom: "14px" }}>
              Esta calculadora usa capitalización mensual, que es el esquema más común en fondos de inversión, cuentas de ahorro y planes de retiro. La fórmula aplica la tasa anual dividida entre 12 cada mes, sumando además tus aportaciones periódicas. El resultado es una proyección realista del crecimiento de tu patrimonio.
            </p>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65" }}>
              Es ideal para planificar metas a largo plazo: el fondo universitario de tus hijos, tu retiro, la compra de un inmueble o simplemente construir un colchón financiero. Cuanto antes empieces, más tiempo tiene el interés compuesto para trabajar a tu favor.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#ECECEC", marginBottom: "12px" }}>Ejemplo práctico con números reales</h3>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65", marginBottom: "14px" }}>
              Imagina que tienes <strong style={{ color: "#D0D0D0" }}>$5,000 USD</strong> ahorrados y puedes aportar <strong style={{ color: "#D0D0D0" }}>$200 al mes</strong> en un fondo indexado con una tasa promedio del <strong style={{ color: "#D0D0D0" }}>8% anual</strong>. Así quedarían tus números a distintos plazos:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "En 10 años", value: "$41,743", sub: "aportaste $29,000" },
                { label: "En 20 años", value: "$132,745", sub: "aportaste $53,000" },
                { label: "En 30 años", value: "$339,821", sub: "aportaste $77,000" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px" }}>
                  <p style={{ fontSize: "11px", color: "#555", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: NICHO.light, marginBottom: "2px" }}>{item.value}</p>
                  <p style={{ fontSize: "10px", color: "#333" }}>{item.sub}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "11px", color: "#444", marginTop: "12px" }}>
              A los 30 años, los intereses representan más del 77% del saldo final. Eso es el interés compuesto en acción.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#ECECEC", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                {
                  q: "¿Cuál es la diferencia entre interés simple e interés compuesto?",
                  a: "El interés simple siempre se calcula sobre el capital original, sin importar cuánto tiempo pase. El interés compuesto se calcula sobre el saldo acumulado, incluyendo los intereses ganados en períodos anteriores. Con el paso de los años, la diferencia entre ambos puede ser enorme: un mismo capital al 8% anual durante 30 años crece 2.4 veces con interés simple, pero casi 10 veces con interés compuesto.",
                },
                {
                  q: "¿Qué tasa anual es realista para una inversión en Latinoamérica?",
                  a: "Depende del instrumento y el país. Los CETES en México han ofrecido tasas del 9–11% anual en años recientes. Los fondos indexados globales (en dólares) han promediado históricamente entre 7–10% anual. Instrumentos de renta fija como bonos del gobierno de Chile o Colombia suelen ofrecer entre 5–8%. Para planificación conservadora, usar una tasa del 6–7% en dólares es razonable.",
                },
                {
                  q: "¿Cada cuánto se capitaliza el interés en esta calculadora?",
                  a: "Esta calculadora usa capitalización mensual, que es el esquema más común en productos de inversión y ahorro. Eso significa que cada mes se aplica 1/12 de la tasa anual sobre el saldo del mes anterior. Si tu producto financiero capitaliza diariamente (como algunas cuentas de ahorro digitales), el rendimiento real será ligeramente mayor al calculado aquí.",
                },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#D0D0D0", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA other tools */}
          <div style={{ background: "#1A1A2E", border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#ECECEC", marginBottom: "4px" }}>Explora otras herramientas financieras</h3>
            <p style={{ fontSize: "13px", color: "#555", marginBottom: "16px" }}>Todo lo que necesitas para tomar mejores decisiones con tu dinero.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/simulador-prestamo", label: "Simulador de préstamo", desc: "Calcula tu cuota y tabla de amortización" },
                { href: "/convertidor-monedas", label: "Convertidor de monedas", desc: "20 monedas latinoamericanas y mundiales" },
                { href: "/calculadora-jubilacion", label: "Calculadora de jubilación", desc: "¿Cuánto necesitas para retirarte?" },
                { href: "/calculadora-roi", label: "Calculadora de ROI", desc: "Mide la rentabilidad de tu inversión" },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href}
                  className="hover:!bg-[#1E1A3A] transition-colors"
                  style={{ background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "10px 14px", textDecoration: "none", display: "block" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#D0D0D0", marginBottom: "2px" }}>{tool.label}</p>
                  <p style={{ fontSize: "11px", color: "#555" }}>{tool.desc}</p>
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
