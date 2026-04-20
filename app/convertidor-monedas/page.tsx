"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#5C6BC0", light: "#9AAAF0", bg: "#1E1A3A", tint: "#13141F", border: "rgba(92,107,192,0.2)" };

const RATES: Record<string, { rate: number; name: string; symbol: string }> = {
  USD: { rate: 1, name: "Dólar estadounidense", symbol: "$" },
  MXN: { rate: 17.5, name: "Peso mexicano", symbol: "$" },
  BRL: { rate: 5.05, name: "Real brasileño", symbol: "R$" },
  ARS: { rate: 920, name: "Peso argentino", symbol: "$" },
  CLP: { rate: 955, name: "Peso chileno", symbol: "$" },
  COP: { rate: 4050, name: "Peso colombiano", symbol: "$" },
  PEN: { rate: 3.75, name: "Sol peruano", symbol: "S/" },
  GTQ: { rate: 7.8, name: "Quetzal guatemalteco", symbol: "Q" },
  CRC: { rate: 528, name: "Colón costarricense", symbol: "₡" },
  BOB: { rate: 6.91, name: "Boliviano boliviano", symbol: "Bs." },
  PYG: { rate: 7600, name: "Guaraní paraguayo", symbol: "₲" },
  UYU: { rate: 39, name: "Peso uruguayo", symbol: "$U" },
  DOP: { rate: 58, name: "Peso dominicano", symbol: "RD$" },
  HNL: { rate: 24.7, name: "Lempira hondureño", symbol: "L" },
  NIO: { rate: 36.7, name: "Córdoba nicaragüense", symbol: "C$" },
  EUR: { rate: 0.92, name: "Euro", symbol: "€" },
  GBP: { rate: 0.79, name: "Libra esterlina", symbol: "£" },
  CAD: { rate: 1.36, name: "Dólar canadiense", symbol: "CA$" },
  JPY: { rate: 149, name: "Yen japonés", symbol: "¥" },
  CNY: { rate: 7.24, name: "Yuan chino", symbol: "¥" },
};

const currencies = Object.keys(RATES);

function fmt(n: number, _code: string) {
  if (n >= 1000) return n.toLocaleString("es-MX", { maximumFractionDigits: 2 });
  if (n < 0.01) return n.toFixed(6);
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
}

const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const selectStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" };

export default function ConvertidorMonedas() {
  const [cantidad, setCantidad] = useState("100");
  const [de, setDe] = useState("USD");
  const [a, setA] = useState("MXN");
  const [resultado, setResultado] = useState<number | null>(null);
  const [tasa, setTasa] = useState<number | null>(null);

  const convertir = useCallback(() => {
    const val = parseFloat(cantidad) || 0;
    if (val <= 0) return;
    const inUSD = val / RATES[de].rate;
    const converted = inUSD * RATES[a].rate;
    setResultado(converted);
    setTasa(RATES[a].rate / RATES[de].rate);
  }, [cantidad, de, a]);

  const intercambiar = () => {
    setDe(a);
    setA(de);
    setResultado(null);
  };

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/finanzas" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Finanzas</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Convertidor de monedas</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Divisas</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Convertidor de monedas
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "6px" }}>
              Convierte entre 20 monedas latinoamericanas y mundiales al instante.
            </p>
            <p style={{ fontSize: "11px", color: "#D4B85A", background: "rgba(212,184,90,0.08)", border: "0.5px solid rgba(212,184,90,0.2)", borderRadius: "6px", padding: "6px 10px", display: "inline-block", marginBottom: "20px" }}>
              ⚠ Las tasas son referenciales. Para transacciones financieras, consulta tasas oficiales.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Cantidad</label>
                  <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{cantidad}</span>
                </div>
                <input type="number" min="0" value={cantidad} onChange={(e) => setCantidad(e.target.value)}
                  className={inputClass} style={{ ...inputStyle, fontSize: "16px", fontWeight: 600, outline: "none" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>

              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>De</label>
                  <select value={de} onChange={(e) => setDe(e.target.value)} style={selectStyle}>
                    {currencies.map((c) => (
                      <option key={c} value={c}>{c} — {RATES[c].name}</option>
                    ))}
                  </select>
                </div>
                <button onClick={intercambiar}
                  style={{ padding: "10px 12px", borderRadius: "8px", border: "0.5px solid #1E2030", background: "#0F1117", color: "#EEEEEE", cursor: "pointer", fontSize: "16px", marginBottom: "1px", transition: "color 0.2s ease" }}
                  className="hover:!text-[#7F8FE0] hover:!border-[#5C6BC0]"
                  title="Intercambiar monedas">
                  ⇄
                </button>
                <div className="flex-1">
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>A</label>
                  <select value={a} onChange={(e) => setA(e.target.value)} style={selectStyle}>
                    {currencies.map((c) => (
                      <option key={c} value={c}>{c} — {RATES[c].name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button onClick={convertir} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Convertir
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado !== null && tasa !== null ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "8px" }}>
                    {cantidad} {de} equivale a
                  </p>
                  <p style={{ fontSize: "38px", fontWeight: 600, color: NICHO.light, letterSpacing: "-1px", lineHeight: 1 }}>
                    {RATES[a].symbol} {fmt(resultado, a)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "6px" }}>{a} — {RATES[a].name}</p>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Tasas de referencia (base USD)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: `1 USD →`, value: `${RATES[de].rate} ${de}` },
                      { label: `1 USD →`, value: `${RATES[a].rate} ${a}` },
                    ].map((item, i) => (
                      <div key={i} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "6px", padding: "8px 10px", display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                        <span style={{ color: "#EEEEEE" }}>{item.label}</span>
                        <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{item.value}</span>
                      </div>
                    ))}
                    <div className="col-span-2" style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "6px", padding: "8px 10px", display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                      <span style={{ color: "#EEEEEE" }}>1 {de} →</span>
                      <span style={{ color: NICHO.light, fontWeight: 600 }}>{fmt(tasa, a)} {a}</span>
                    </div>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", overflow: "hidden" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", padding: "12px 14px", borderBottom: "0.5px solid #1E2030" }}>
                    Tabla rápida — {de} a {a}
                  </p>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "#0A0B10" }}>
                          <th style={{ padding: "9px 14px", textAlign: "left", fontWeight: 600, color: "#EEEEEE", borderBottom: "0.5px solid #1E2030" }}>{de}</th>
                          <th style={{ padding: "9px 14px", textAlign: "right", fontWeight: 600, color: "#EEEEEE", borderBottom: "0.5px solid #1E2030" }}>{a}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 5, 10, 50, 100, 500, 1000].map((v) => (
                          <tr key={v} style={{ borderBottom: "0.5px solid #1A1A2A" }}>
                            <td style={{ padding: "8px 14px", color: "#EEEEEE" }}>{RATES[de].symbol} {v.toLocaleString("es-MX")}</td>
                            <td style={{ padding: "8px 14px", textAlign: "right", fontWeight: 600, color: NICHO.light }}>
                              {RATES[a].symbol} {fmt((v / RATES[de].rate) * RATES[a].rate, a)}
                            </td>
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
                <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Selecciona las monedas y presiona Convertir</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo funciona el convertidor de monedas
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Este convertidor te permite transformar cantidades entre 20 monedas de Latinoamérica y el mundo de forma inmediata. Cubre las divisas más usadas en la región: peso mexicano, real brasileño, peso colombiano, sol peruano, peso argentino, colón costarricense y muchas más, además de monedas globales como el dólar, el euro y el yen.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El mecanismo es simple: todas las conversiones pasan por el dólar estadounidense como moneda puente. Tu cantidad se convierte primero a USD usando la tasa de la moneda origen, y luego se multiplica por la tasa de la moneda destino. Este es el mismo sistema que usan la mayoría de plataformas financieras internacionales.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Es útil para comparar precios en tiendas internacionales, entender el valor de un salario en otro país, planificar un viaje, o simplemente tener una referencia rápida antes de hacer una transferencia internacional.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico: comparar salarios en la región</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Supón que recibes una oferta de trabajo de <strong style={{ color: "#FFFFFF" }}>$25,000 MXN al mes</strong> y quieres saber cómo se compara con salarios en otros países de la región:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { pais: "México (origen)", valor: "$25,000 MXN", color: NICHO.light },
                { pais: "En dólares USD", valor: "~$1,429 USD", color: "#FFFFFF" },
                { pais: "En reales BRL", valor: "~R$7,218 BRL", color: "#EEEEEE" },
                { pais: "En colones CRC", valor: "~₡754,285 CRC", color: "#EEEEEE" },
                { pais: "En soles PEN", valor: "~S/5,357 PEN", color: "#EEEEEE" },
                { pais: "En pesos COP", valor: "~$5.7M COP", color: "#EEEEEE" },
              ].map((item) => (
                <div key={item.pais} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "10px" }}>
                  <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "3px" }}>{item.pais}</p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: item.color }}>{item.valor}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Las tasas de cambio son en tiempo real?", a: "Las tasas mostradas son referenciales y se actualizan periódicamente, pero no son datos en tiempo real de los mercados financieros. Para consultas rápidas y educativas son muy útiles. Sin embargo, si vas a realizar una transferencia internacional o cambiar divisas en una casa de cambio, siempre verifica la tasa exacta con tu banco o plataforma de pago." },
                { q: "¿Por qué el tipo de cambio del banco es diferente al de esta herramienta?", a: "Los bancos y casas de cambio aplican un margen (llamado spread) sobre la tasa interbancaria de referencia. Esa diferencia es su ganancia y puede variar entre el 1% y el 5% según la institución y la moneda. Plataformas como Wise o Remitly suelen ofrecer spreads menores para transferencias internacionales." },
                { q: "¿Por qué el peso argentino tiene una tasa tan alta respecto al dólar?", a: "Argentina ha atravesado períodos prolongados de alta inflación y devaluación de su moneda. La tasa mostrada es la oficial de referencia; en la práctica, Argentina ha tenido históricamente múltiples tipos de cambio simultáneos. La situación cambia con frecuencia, por lo que para cualquier operación con pesos argentinos es fundamental verificar las condiciones actuales con fuentes locales." },
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
                { href: "/calculadora-jubilacion", label: "Calculadora de jubilación", desc: "¿Cuánto necesitas para retirarte?" },
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
