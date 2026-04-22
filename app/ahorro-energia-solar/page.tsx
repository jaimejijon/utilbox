"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4856A", light: "#E8A88E", bg: "#3D2218", tint: "#1C1210", border: "rgba(212,133,106,0.25)" };

function fmtMXN(n: number) { return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }
function fmt2(n: number) { return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };
function focusStyle(el: HTMLInputElement) { el.style.borderColor = NICHO.color; el.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }
function blurStyle(el: HTMLInputElement) { el.style.borderColor = "#1E2030"; el.style.boxShadow = "none"; }

export default function AhorroEnergiaSolar() {
  const [consumo, setConsumo] = useState("300");
  const [tarifa, setTarifa] = useState("2.5");
  const [inversion, setInversion] = useState("80000");
  const [horasSol, setHorasSol] = useState("5");
  const [incrementoTarifa, setIncrementoTarifa] = useState("5");

  const [resultado, setResultado] = useState<{
    potencia: number;
    ahorroMensual: number;
    ahorroAnual: number;
    payback: number;
    ahorro10: number;
    ahorro25: number;
    co2: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const cons = parseFloat(consumo) || 0;
    const tar = parseFloat(tarifa) || 0;
    const inv = parseFloat(inversion) || 0;
    const sol = parseFloat(horasSol) || 5;
    const incTar = parseFloat(incrementoTarifa) || 5;

    if (cons <= 0 || tar <= 0 || inv <= 0) return;

    const potencia = cons / (sol * 30);
    const generacionMensual = potencia * sol * 30 * 0.8;
    const energiaCubierta = Math.min(generacionMensual, cons);
    const ahorroMensual = energiaCubierta * tar;
    const ahorroAnual = ahorroMensual * 12;
    const payback = ahorroAnual > 0 ? inv / ahorroAnual : 999;

    // 10-year savings with tariff increase
    let ahorro10 = 0;
    let tarifaActual = tar;
    for (let y = 0; y < 10; y++) {
      ahorro10 += energiaCubierta * tarifaActual * 12;
      tarifaActual *= (1 + incTar / 100);
    }

    // 25-year savings
    tarifaActual = tar;
    let ahorro25 = 0;
    for (let y = 0; y < 25; y++) {
      ahorro25 += energiaCubierta * tarifaActual * 12;
      tarifaActual *= (1 + incTar / 100);
    }

    // CO2: avg 0.5 kg CO2/kWh
    const co2 = energiaCubierta * 12 * 0.5;

    setResultado({ potencia, ahorroMensual, ahorroAnual, payback, ahorro10, ahorro25, co2 });
  }, [consumo, tarifa, inversion, horasSol, incrementoTarifa]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/hogar" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Hogar</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Ahorro en energía solar</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Energía</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de ahorro en energía solar
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Estima cuánto ahorrarías al instalar paneles solares y en cuánto tiempo recuperas la inversión.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Consumo eléctrico mensual (kWh)</label>
                  <input type="number" min="0" step="10" value={consumo} onChange={e => setConsumo(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tarifa eléctrica actual ($/kWh)</label>
                  <input type="number" min="0" step="0.01" value={tarifa} onChange={e => setTarifa(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Costo estimado de instalación ($)</label>
                  <input type="number" min="0" step="1000" value={inversion} onChange={e => setInversion(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Horas de sol al día</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{horasSol} h</span>
                  </div>
                  <input type="range" min="3" max="8" step="0.5" value={horasSol} onChange={e => setHorasSol(e.target.value)}
                    style={{ width: "100%", accentColor: NICHO.color }} />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Incremento anual de tarifa</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{incrementoTarifa}%</span>
                  </div>
                  <input type="range" min="0" max="20" step="0.5" value={incrementoTarifa} onChange={e => setIncrementoTarifa(e.target.value)}
                    style={{ width: "100%", accentColor: NICHO.color }} />
                </div>
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular ahorro solar
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Recuperación de inversión</p>
                  <p style={{ fontSize: "48px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    {resultado.payback < 50 ? `${fmt2(resultado.payback)} años` : "50+ años"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Potencia del sistema", value: `${fmt2(resultado.potencia)} kWp`, color: NICHO.light },
                    { label: "Ahorro mensual", value: `$${fmt2(resultado.ahorroMensual)}`, color: NICHO.light },
                    { label: "Ahorro anual", value: `$${fmtMXN(resultado.ahorroAnual)}`, color: NICHO.color },
                    { label: "CO₂ evitado/año", value: `${fmtMXN(resultado.co2)} kg`, color: "#6EC9A0" },
                  ].map(item => (
                    <div key={item.label} className="rounded-[10px] p-4" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: item.color }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Ahorro en 10 años</p>
                    <p style={{ fontSize: "22px", fontWeight: 600, color: NICHO.color }}>${fmtMXN(resultado.ahorro10)}</p>
                  </div>
                  <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Ahorro en 25 años</p>
                    <p style={{ fontSize: "22px", fontWeight: 600, color: NICHO.color }}>${fmtMXN(resultado.ahorro25)}</p>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.6" }}>
                    💡 Los paneles solares tienen una vida útil garantizada de 25 años con degradación menor al 20%. El sistema se paga solo en promedio a los {fmt2(resultado.payback)} años, generando ahorro neto por los años restantes.
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>☀️</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus datos y presiona Calcular ahorro solar</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Energía solar: ¿cuándo conviene instalar paneles?
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La energía solar es más rentable cuanto mayor es tu consumo eléctrico, más alta tu tarifa y más horas de sol tiene tu zona. México, Colombia, Perú y Chile tienen excelentes condiciones de irradiación solar, con 4–7 horas de sol pico al día en promedio.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              El costo de los sistemas solares ha bajado un 90% en la última década. En 2024, un sistema de 3 kWp cuesta entre $50,000 y $100,000 MXN instalado, con un período de recuperación típico de 5–8 años en México.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Funciona la energía solar en días nublados?", a: "Sí, aunque con menor eficiencia. Los paneles generan electricidad con luz difusa, no solo con sol directo. En días muy nublados pueden producir entre el 10–25% de su capacidad máxima. La planificación asume un factor de eficiencia del 80% para compensar esto." },
                { q: "¿Qué sucede con el exceso de energía generada?", a: "Si tienes un sistema interconectado a la red (lo más común), el exceso se inyecta a la red eléctrica y se acredita en tu factura como saldo a favor. Si tienes baterías, se almacena para uso nocturno. Los sistemas con baterías cuestan más pero dan mayor independencia energética." },
                { q: "¿Necesito permiso para instalar paneles solares?", a: "En México puedes instalar hasta 30 kWp sin permisos de la CFE si estás en tarifa doméstica. Para sistemas mayores se requiere tramitar la interconexión. En otros países los requisitos varían, pero la mayoría tiene incentivos y procesos simplificados para instalaciones residenciales." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Optimiza tus gastos del hogar.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/consumo-electrico", label: "Consumo eléctrico", desc: "Cuánto gasta cada aparato al mes" },
                { href: "/fondo-emergencia-hogar", label: "Fondo de emergencia", desc: "Reserva para imprevistos del hogar" },
                { href: "/simulador-hipoteca", label: "Simulador de hipoteca", desc: "Calcula tu cuota mensual" },
                { href: "/presupuesto-remodelacion", label: "Presupuesto de remodelación", desc: "Estima el costo de tu reforma" },
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
