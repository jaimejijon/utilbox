"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4856A", light: "#E8A88E", bg: "#3D2218", tint: "#1C1210", border: "rgba(212,133,106,0.25)" };

function fmt2(n: number) { return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };
function focusStyle(el: HTMLInputElement | HTMLSelectElement) { el.style.borderColor = NICHO.color; el.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }
function blurStyle(el: HTMLInputElement | HTMLSelectElement) { el.style.borderColor = "#1E2030"; el.style.boxShadow = "none"; }

export default function CalculadoraPintura() {
  const [superficie, setSuperficie] = useState("Interior");
  const [largo, setLargo] = useState("5");
  const [ancho, setAncho] = useState("4");
  const [alto, setAlto] = useState("2.5");
  const [puertas, setPuertas] = useState("1");
  const [ventanas, setVentanas] = useState("2");
  const [manos, setManos] = useState("2");
  const [precioPorGalon, setPrecioPorGalon] = useState("250");
  const [rendimiento, setRendimiento] = useState("35");

  const [resultado, setResultado] = useState<{
    areaNeta: number;
    areaTotal: number;
    litros: number;
    galones: number;
    costo: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const L = parseFloat(largo) || 0;
    const W = parseFloat(ancho) || 0;
    const H = parseFloat(alto) || 2.5;
    const nPuertas = parseInt(puertas) || 0;
    const nVentanas = parseInt(ventanas) || 0;
    const nManos = parseInt(manos) || 2;
    const precio = parseFloat(precioPorGalon) || 0;
    const rend = parseFloat(rendimiento) || 35;

    if (L <= 0 || W <= 0 || H <= 0) return;

    const areaParedesTot = 2 * (L + W) * H;
    const areaPuertas = nPuertas * 1.8;
    const areaVentanas = nVentanas * 1.2;
    const areaNeta = Math.max(0, areaParedesTot - areaPuertas - areaVentanas);
    const areaTotal = areaNeta * nManos;
    const galones = Math.ceil(areaTotal / rend);
    const litros = galones * 3.785;
    const costo = galones * precio;

    setResultado({ areaNeta, areaTotal, litros, galones, costo });
  }, [largo, ancho, alto, puertas, ventanas, manos, precioPorGalon, rendimiento]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/hogar" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Hogar</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de pintura por m²</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Construcción</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de pintura por m²
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula cuánta pintura necesitas y cuánto costará pintar cualquier habitación o fachada.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tipo de superficie</label>
                  <select value={superficie} onChange={e => setSuperficie(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)}>
                    <option>Interior</option>
                    <option>Exterior</option>
                    <option>Cielo raso</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Largo (m)</label>
                    <input type="number" min="0" step="0.1" value={largo} onChange={e => setLargo(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Ancho (m)</label>
                    <input type="number" min="0" step="0.1" value={ancho} onChange={e => setAncho(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Alto (m)</label>
                    <input type="number" min="0" step="0.1" value={alto} onChange={e => setAlto(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>N° de puertas</label>
                    <input type="number" min="0" value={puertas} onChange={e => setPuertas(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>N° de ventanas</label>
                    <input type="number" min="0" value={ventanas} onChange={e => setVentanas(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>N° de manos de pintura</label>
                  <select value={manos} onChange={e => setManos(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)}>
                    <option value="1">1 mano</option>
                    <option value="2">2 manos (recomendado)</option>
                    <option value="3">3 manos</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Precio por galón ($)</label>
                    <input type="number" min="0" step="1" value={precioPorGalon} onChange={e => setPrecioPorGalon(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Rendimiento (m²/galón)</label>
                    <input type="number" min="1" step="1" value={rendimiento} onChange={e => setRendimiento(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                  </div>
                </div>
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular pintura
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Galones necesarios</p>
                  <p style={{ fontSize: "52px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    {resultado.galones}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "4px" }}>
                    ({fmt2(resultado.litros)} litros)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Área neta a pintar", value: `${fmt2(resultado.areaNeta)} m²`, color: NICHO.light },
                    { label: "Área total (con manos)", value: `${fmt2(resultado.areaTotal)} m²`, color: NICHO.light },
                    { label: "Costo total en pintura", value: `$${fmt2(resultado.costo)}`, color: NICHO.color },
                  ].map(item => (
                    <div key={item.label} className="rounded-[10px] p-4" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                      <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: item.color }}>{item.value}</p>
                    </div>
                  ))}
                  <div className="rounded-[10px] p-4" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>Costo total en pintura</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.color }}>${fmt2(resultado.costo)}</p>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Materiales adicionales estimados</p>
                  <div className="space-y-2">
                    {[
                      { item: "Rodillo de pintura (2 piezas)", est: "Incluido en presupuesto" },
                      { item: "Bandeja para pintura", est: "Incluido en presupuesto" },
                      { item: "Cinta de enmascarar", est: "Recomendado" },
                      { item: "Masilla para acabados", est: "Si hay grietas o imperfecciones" },
                      { item: "Lija (grano 120–180)", est: "Para preparar la superficie" },
                    ].map(m => (
                      <div key={m.item} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "0.5px solid #1E2030" }}>
                        <span style={{ fontSize: "12px", color: "#FFFFFF" }}>{m.item}</span>
                        <span style={{ fontSize: "11px", color: "#EEEEEE" }}>{m.est}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>🎨</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa las dimensiones y presiona Calcular pintura</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo calcular la pintura correctamente
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La fórmula resta del área de paredes el área ocupada por puertas (1.8 m² cada una) y ventanas (1.2 m² cada una). Luego multiplica por el número de manos. Siempre compra un 10% extra para retoques futuros.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              El rendimiento estándar de una pintura de buena calidad es 35–40 m² por galón en paredes lisas. En superficies rugosas o porosas, puede bajar a 20–25 m² por galón. Revisa siempre el rendimiento específico en la etiqueta del producto.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Cuántas manos de pintura necesito?", a: "Para paredes previamente pintadas en buen estado: 1–2 manos. Para paredes nuevas o cuando cambias de color oscuro a claro: 2–3 manos. Pintar sobre colores oscuros con colores claros puede requerir un fondo sellador primero." },
                { q: "¿Cuánto tiempo debo esperar entre manos?", a: "La mayoría de las pinturas látex requieren 2–4 horas entre manos. Las pinturas al aceite pueden requerir 24 horas. Consulta siempre las instrucciones del fabricante y asegúrate de que la mano anterior esté completamente seca al tacto." },
                { q: "¿Conviene comprar pintura de primera o segunda calidad?", a: "Las pinturas de primera calidad tienen mayor concentración de pigmentos y mejor adhesión. Cubren en menos manos y duran más tiempo. El ahorro de comprar pintura barata suele eliminarse al necesitar más manos y repasar antes." },
              ].map(item => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Otras herramientas de construcción</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Calcula más materiales para tu obra.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-azulejos", label: "Calculadora de azulejos", desc: "Cajas necesarias con desperdicio incluido" },
                { href: "/presupuesto-remodelacion", label: "Presupuesto de remodelación", desc: "Costo total de tu reforma" },
                { href: "/consumo-electrico", label: "Consumo eléctrico", desc: "Cuánto gastas en electricidad" },
                { href: "/fondo-emergencia-hogar", label: "Fondo de emergencia", desc: "Reserva para imprevistos del hogar" },
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
