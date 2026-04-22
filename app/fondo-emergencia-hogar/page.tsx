"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4856A", light: "#E8A88E", bg: "#3D2218", tint: "#1C1210", border: "rgba(212,133,106,0.25)" };

function fmtMXN(n: number) { return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }
function fmt0(n: number) { return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };
function focusStyle(el: HTMLInputElement | HTMLSelectElement) { el.style.borderColor = NICHO.color; el.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }
function blurStyle(el: HTMLInputElement | HTMLSelectElement) { el.style.borderColor = "#1E2030"; el.style.boxShadow = "none"; }

export default function FondoEmergenciaHogar() {
  const [valorVivienda, setValorVivienda] = useState("1500000");
  const [tipoVivienda, setTipoVivienda] = useState("Casa propia");
  const [antiguedad, setAntiguedad] = useState("10");
  const [gastosMensuales, setGastosMensuales] = useState("15000");
  const [tieneSeguro, setTieneSeguro] = useState("Sí");

  const [resultado, setResultado] = useState<{
    fondoTotal: number;
    reparaciones: number;
    electrodomesticos: number;
    imprevistos: number;
    colchon3m: number;
    colchon6m: number;
    plan12: number;
    plan24: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const valor = parseFloat(valorVivienda) || 0;
    const ant = parseInt(antiguedad) || 0;
    const gastos = parseFloat(gastosMensuales) || 0;
    const esPropia = tipoVivienda !== "Alquilada";
    const conSeguro = tieneSeguro === "Sí";

    if (valor <= 0 || gastos <= 0) return;

    // Reparaciones: 1% valor/año para nueva, hasta 3% para antigua (>20 años)
    const pctRep = esPropia ? Math.min(0.01 + (ant / 20) * 0.02, 0.03) : 0.005;
    const reparaciones = valor * pctRep;

    // Electrodomésticos: fijo según tamaño estimado
    const electrodomesticos = esPropia ? 15000 : 8000;

    // Imprevistos: 0.5% del valor
    const imprevistos = valor * 0.005;

    // Colchón operativo
    const colchon3m = gastos * 3;
    const colchon6m = gastos * 6;

    // Si tiene seguro, reducir reparaciones estructurales un 40%
    const repFinal = conSeguro ? reparaciones * 0.6 : reparaciones;
    const fondoTotal = repFinal + electrodomesticos + imprevistos + colchon3m;

    const plan12 = fondoTotal / 12;
    const plan24 = fondoTotal / 24;

    setResultado({ fondoTotal, reparaciones: repFinal, electrodomesticos, imprevistos, colchon3m, colchon6m, plan12, plan24 });
  }, [valorVivienda, tipoVivienda, antiguedad, gastosMensuales, tieneSeguro]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/hogar" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Hogar</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Fondo de emergencia del hogar</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Financiero</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Fondo de emergencia del hogar
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula cuánto deberías tener ahorrado para cubrir emergencias del hogar según el valor de tu vivienda.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Valor de la vivienda ($)</label>
                  <input type="number" min="0" step="10000" value={valorVivienda} onChange={e => setValorVivienda(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tipo de vivienda</label>
                  <select value={tipoVivienda} onChange={e => setTipoVivienda(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)}>
                    <option>Casa propia</option>
                    <option>Apartamento propio</option>
                    <option>Alquilada</option>
                  </select>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Antigüedad de la vivienda</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{antiguedad} años</span>
                  </div>
                  <input type="range" min="0" max="50" step="1" value={antiguedad} onChange={e => setAntiguedad(e.target.value)}
                    style={{ width: "100%", accentColor: NICHO.color }} />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Gastos mensuales del hogar ($)</label>
                  <input type="number" min="0" step="500" value={gastosMensuales} onChange={e => setGastosMensuales(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>¿Tienes seguro de hogar?</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {["Sí", "No"].map(opt => (
                      <button key={opt} onClick={() => setTieneSeguro(opt)}
                        style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, background: tieneSeguro === opt ? NICHO.color : "#0F1117", color: tieneSeguro === opt ? "#fff" : "#EEEEEE" }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular fondo de emergencia
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Fondo de emergencia recomendado</p>
                  <p style={{ fontSize: "44px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    ${fmtMXN(resultado.fondoTotal)}
                  </p>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Desglose por categoría</p>
                  <div className="space-y-2">
                    {[
                      { label: "Reparaciones estructurales (anual)", value: resultado.reparaciones },
                      { label: "Electrodomésticos y equipos", value: resultado.electrodomesticos },
                      { label: "Imprevistos generales", value: resultado.imprevistos },
                      { label: "Colchón operativo (3 meses)", value: resultado.colchon3m },
                    ].map(item => (
                      <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "0.5px solid #1E2030" }}>
                        <span style={{ fontSize: "12px", color: "#EEEEEE" }}>{item.label}</span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: NICHO.light }}>${fmt0(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Plan de ahorro mensual</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-4" style={{ background: "#0F1117", borderRadius: "8px" }}>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>Para lograrlo en 12 meses</p>
                      <p style={{ fontSize: "18px", fontWeight: 600, color: NICHO.color }}>${fmtMXN(resultado.plan12)}/mes</p>
                    </div>
                    <div className="text-center p-4" style={{ background: "#0F1117", borderRadius: "8px" }}>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>Para lograrlo en 24 meses</p>
                      <p style={{ fontSize: "18px", fontWeight: 600, color: NICHO.color }}>${fmtMXN(resultado.plan24)}/mes</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>🛡️</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa los datos y presiona Calcular fondo</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Por qué necesitas un fondo de emergencia del hogar
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Los expertos en finanzas personales recomiendan apartar entre el 1% y el 3% del valor de tu vivienda cada año para mantenimiento y reparaciones. Una vivienda nueva puede estar en el límite inferior; una de más de 20 años puede necesitar el doble.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Los electrodomésticos tienen vida útil finita: refrigeradores (10–15 años), lavadoras (8–12 años), calentadores de agua (8–12 años). Planificar su reemplazo evita gastos de emergencia que desestabilizan las finanzas del hogar.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Dónde guardar el fondo de emergencia?", a: "El fondo debe estar en un lugar seguro, líquido y separado de tu cuenta de gastos diarios. Una cuenta de ahorro de alta liquidez o un fondo de inversión con rendimiento es lo ideal. Evita invertirlo en activos ilíquidos como bienes raíces o acciones de largo plazo." },
                { q: "¿El seguro de hogar reemplaza al fondo de emergencia?", a: "No. El seguro cubre eventos catastróficos (incendio, inundación, robo) con un deducible. No cubre el mantenimiento rutinario, la reparación de electrodomésticos ni los imprevistos menores. El fondo y el seguro son complementarios, no sustitutos." },
                { q: "¿Cuánto debe ser el fondo para viviendas antiguas?", a: "Las viviendas de más de 20 años requieren el mayor presupuesto. Las instalaciones eléctricas, plomería, impermeabilización y estructura tienen una probabilidad mucho mayor de requerir intervención. Para una casa de 30 años, el 2–3% del valor anual es una estimación conservadora." },
              ].map(item => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Otras herramientas financieras</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Planifica tu economía del hogar.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/simulador-hipoteca", label: "Simulador de hipoteca", desc: "Cuota, intereses y amortización" },
                { href: "/alquiler-vs-compra", label: "Alquiler vs Compra", desc: "¿Qué conviene más a largo plazo?" },
                { href: "/costo-mascota", label: "Costo de tener mascota", desc: "Presupuesto real para tu mascota" },
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
