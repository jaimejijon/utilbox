"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4856A", light: "#E8A88E", bg: "#3D2218", tint: "#1C1210", border: "rgba(212,133,106,0.25)" };

function fmtMXN(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };
function focusStyle(el: HTMLInputElement) { el.style.borderColor = NICHO.color; el.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }
function blurStyle(el: HTMLInputElement) { el.style.borderColor = "#1E2030"; el.style.boxShadow = "none"; }

export default function AlquilerVsCompra() {
  const [precio, setPrecio] = useState("2000000");
  const [enganche, setEnganche] = useState("20");
  const [tasa, setTasa] = useState("10");
  const [plazo, setPlazo] = useState("20");
  const [alquiler, setAlquiler] = useState("12000");
  const [incrementoAlquiler, setIncrementoAlquiler] = useState("3");
  const [anios, setAnios] = useState("15");
  const [rendimiento, setRendimiento] = useState("7");

  const [resultado, setResultado] = useState<{
    costoComprar: number;
    costoAlquilar: number;
    diferencia: number;
    puntoEquilibrio: number | null;
    recomendacion: string;
    serie: { year: number; comprar: number; alquilar: number }[];
  } | null>(null);

  const calcular = useCallback(() => {
    const P = parseFloat(precio) || 0;
    const eng = parseFloat(enganche) || 20;
    const tAnual = parseFloat(tasa) || 0;
    const pYears = parseInt(plazo) || 20;
    const rentMes = parseFloat(alquiler) || 0;
    const incAlq = parseFloat(incrementoAlquiler) || 3;
    const N = parseInt(anios) || 15;
    const rend = parseFloat(rendimiento) || 7;

    if (P <= 0 || tAnual <= 0 || rentMes <= 0) return;

    const engMonto = P * (eng / 100);
    const prestamo = P - engMonto;
    const r = tAnual / 12 / 100;
    const n = pYears * 12;
    const cuota = prestamo * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const serie: { year: number; comprar: number; alquilar: number }[] = [];
    let costoComprarAcum = engMonto;
    let costoAlquilarAcum = 0;
    let alquilerActual = rentMes;
    let saldo = prestamo;
    let puntoEquilibrio: number | null = null;

    for (let y = 1; y <= N; y++) {
      for (let m = 0; m < 12; m++) {
        const intMes = saldo * r;
        const capMes = cuota - intMes;
        costoComprarAcum += cuota;
        costoAlquilarAcum += alquilerActual;
        saldo = Math.max(0, saldo - capMes);
      }
      alquilerActual *= (1 + incAlq / 100);

      // opportunity cost: the enganche could have been invested
      const opCost = engMonto * (Math.pow(1 + rend / 100, y) - 1);
      const totalComprar = costoComprarAcum + opCost;

      serie.push({ year: y, comprar: totalComprar, alquilar: costoAlquilarAcum });

      if (puntoEquilibrio === null && costoAlquilarAcum > totalComprar) {
        puntoEquilibrio = y;
      }
    }

    const last = serie[serie.length - 1];
    const diferencia = Math.abs(last.comprar - last.alquilar);
    const recomendacion = last.comprar < last.alquilar ? "Comprar" : "Alquilar";

    setResultado({ costoComprar: last.comprar, costoAlquilar: last.alquilar, diferencia, puntoEquilibrio, recomendacion, serie });
  }, [precio, enganche, tasa, plazo, alquiler, incrementoAlquiler, anios, rendimiento]);

  const maxSerie = resultado ? Math.max(...resultado.serie.map(s => Math.max(s.comprar, s.alquilar))) : 1;

  return (
    <>
      <ToolSchema
        name="Calculadora alquiler vs compra de vivienda"
        description="Compara el costo real de alquilar versus comprar casa o departamento a largo plazo. Análisis financiero para México, Colombia, Argentina, Chile, Perú y toda Latinoamérica."
        url="https://utilbox.lat/alquiler-vs-compra"
        category="Finanzas"
        faqItems={[
          { q: "¿Por qué el punto de equilibrio tarda varios años?", a: "Al inicio de una hipoteca, la mayoría de la cuota son intereses, no capital. Además el enganche tiene un costo de oportunidad. Por eso comprar solo conviene a mediano y largo plazo, generalmente a partir del año 7–15 dependiendo del mercado." },
          { q: "¿Qué pasa si el valor de la vivienda sube?", a: "Esta calculadora no incluye la plusvalía porque es variable e incierta. Si agregas el incremento del valor de tu propiedad, comprar suele ser más conveniente en mercados con alta apreciación inmobiliaria." },
          { q: "¿Cuándo claramente conviene alquilar?", a: "Cuando planeas vivir menos de 5 años en el lugar, cuando el precio de compra es muy alto relativo al alquiler, o cuando tienes inversiones que rinden más que la tasa de tu hipoteca." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/hogar" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Hogar</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora alquiler vs compra</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Financiero</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora alquiler vs compra
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Compara el costo real de alquilar versus comprar una vivienda a largo plazo y descubre qué opción te conviene más.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Precio de compra ($)</label>
                  <input type="number" min="0" step="1000" value={precio} onChange={e => setPrecio(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Enganche</label>
                      <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{enganche}%</span>
                    </div>
                    <input type="range" min="5" max="50" step="1" value={enganche} onChange={e => setEnganche(e.target.value)}
                      style={{ width: "100%", accentColor: NICHO.color }} />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Tasa anual</label>
                      <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{tasa}%</span>
                    </div>
                    <input type="range" min="1" max="20" step="0.5" value={tasa} onChange={e => setTasa(e.target.value)}
                      style={{ width: "100%", accentColor: NICHO.color }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Plazo del crédito</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{plazo} años</span>
                  </div>
                  <input type="range" min="5" max="30" step="1" value={plazo} onChange={e => setPlazo(e.target.value)}
                    style={{ width: "100%", accentColor: NICHO.color }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Alquiler mensual actual ($)</label>
                  <input type="number" min="0" step="100" value={alquiler} onChange={e => setAlquiler(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Inc. alquiler</label>
                      <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{incrementoAlquiler}%/año</span>
                    </div>
                    <input type="range" min="0" max="15" step="0.5" value={incrementoAlquiler} onChange={e => setIncrementoAlquiler(e.target.value)}
                      style={{ width: "100%", accentColor: NICHO.color }} />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Rendimiento inversión</label>
                      <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{rendimiento}%/año</span>
                    </div>
                    <input type="range" min="1" max="20" step="0.5" value={rendimiento} onChange={e => setRendimiento(e.target.value)}
                      style={{ width: "100%", accentColor: NICHO.color }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Años a comparar</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{anios} años</span>
                  </div>
                  <input type="range" min="5" max="30" step="1" value={anios} onChange={e => setAnios(e.target.value)}
                    style={{ width: "100%", accentColor: NICHO.color }} />
                </div>
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Comparar opciones
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-5 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>En {anios} años, conviene más</p>
                  <p style={{ fontSize: "36px", fontWeight: 600, color: NICHO.color, lineHeight: 1 }}>{resultado.recomendacion}</p>
                  {resultado.puntoEquilibrio && (
                    <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "6px" }}>
                      Punto de equilibrio: año {resultado.puntoEquilibrio}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-4" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>Costo total comprando</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.light }}>${fmtMXN(resultado.costoComprar)}</p>
                  </div>
                  <div className="rounded-[10px] p-4" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>Costo total alquilando</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#74AEDD" }}>${fmtMXN(resultado.costoAlquilar)}</p>
                  </div>
                  <div className="rounded-[10px] p-4 col-span-2" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>Diferencia en {anios} años</p>
                    <p style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF" }}>${fmtMXN(resultado.diferencia)} a favor de {resultado.recomendacion.toLowerCase()}</p>
                  </div>
                </div>

                {/* Line chart */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "12px" }}>Costo acumulado por año</p>
                  <svg viewBox={`0 0 ${resultado.serie.length * 20} 80`} style={{ width: "100%", height: "80px", overflow: "visible" }}>
                    <polyline
                      points={resultado.serie.map((s, i) => `${i * 20 + 10},${80 - (s.comprar / maxSerie) * 76}`).join(" ")}
                      fill="none" stroke={NICHO.color} strokeWidth="2" strokeLinejoin="round" />
                    <polyline
                      points={resultado.serie.map((s, i) => `${i * 20 + 10},${80 - (s.alquilar / maxSerie) * 76}`).join(" ")}
                      fill="none" stroke="#74AEDD" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                  <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#EEEEEE" }}>
                      <span style={{ width: "12px", height: "2px", background: NICHO.color, display: "block" }} />Comprar
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#EEEEEE" }}>
                      <span style={{ width: "12px", height: "2px", background: "#74AEDD", display: "block" }} />Alquilar
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>⚖️</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa los datos y presiona Comparar opciones</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              ¿Alquilar o comprar? Los factores que importan
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Esta calculadora compara el costo total de cada opción considerando el costo de oportunidad: si en lugar de pagar el enganche lo invirtieras, ¿cuánto ganarías? Ese rendimiento potencial se suma al costo de comprar para hacer una comparación justa.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              La decisión no es solo financiera. La estabilidad de la propiedad propia, la flexibilidad del alquiler, los impuestos locales, el mantenimiento y tu horizonte de permanencia en la ciudad son factores igualmente importantes.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Por qué el punto de equilibrio tarda varios años?", a: "Al inicio de una hipoteca, la mayoría de la cuota son intereses, no capital. Además el enganche tiene un costo de oportunidad. Por eso comprar solo conviene a mediano y largo plazo, generalmente a partir del año 7–15 dependiendo del mercado." },
                { q: "¿Qué pasa si el valor de la vivienda sube?", a: "Esta calculadora no incluye la plusvalía porque es variable e incierta. Si agregas el incremento del valor de tu propiedad, comprar suele ser más conveniente en mercados con alta apreciación inmobiliaria." },
                { q: "¿Cuándo claramente conviene alquilar?", a: "Cuando planeas vivir menos de 5 años en el lugar, cuando el precio de compra es muy alto relativo al alquiler, o cuando tienes inversiones que rinden más que la tasa de tu hipoteca." },
              ].map(item => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Otras herramientas de hogar</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Más calculadoras para decisiones de vivienda.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/simulador-hipoteca", label: "Simulador de hipoteca", desc: "Cuota, intereses y amortización" },
                { href: "/fondo-emergencia-hogar", label: "Fondo de emergencia", desc: "Cuánto ahorrar para imprevistos" },
                { href: "/calculadora-mudanza", label: "Calculadora de mudanza", desc: "Costo de tu próxima mudanza" },
                { href: "/consumo-electrico", label: "Consumo eléctrico", desc: "Cuánto gastas en electricidad" },
              ].map(tool => (
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
