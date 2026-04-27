"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4B85A", light: "#E2CC7D", bg: "#332B0F", tint: "#181408", border: "rgba(212,184,90,0.25)" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type Bebida = { nombre: string; volumen: number; graduacion: number; descripcion: string };

const BEBIDAS: Bebida[] = [
  { nombre: "Cerveza normal", volumen: 330, graduacion: 5, descripcion: "Lata/botella 330ml, 5%" },
  { nombre: "Cerveza fuerte", volumen: 330, graduacion: 8, descripcion: "Lata/botella 330ml, 8%" },
  { nombre: "Vino de mesa", volumen: 150, graduacion: 12, descripcion: "Copa estándar 150ml, 12%" },
  { nombre: "Vino fuerte", volumen: 150, graduacion: 15, descripcion: "Copa 150ml, 15%" },
  { nombre: "Trago/Shot", volumen: 45, graduacion: 40, descripcion: "Shot 45ml, 40%" },
  { nombre: "Whisky, ron, vodka", volumen: 60, graduacion: 40, descripcion: "Medida doble 60ml, 40%" },
  { nombre: "Tequila/Mezcal", volumen: 45, graduacion: 38, descripcion: "Caballito 45ml, 38%" },
  { nombre: "Aguardiente (Col/Vzla)", volumen: 45, graduacion: 29, descripcion: "Copa 45ml, 29%" },
  { nombre: "Pisco sour (Perú/Chile)", volumen: 120, graduacion: 20, descripcion: "Cóctel 120ml, 20%" },
  { nombre: "Copa de champán", volumen: 150, graduacion: 12, descripcion: "Copa 150ml, 12%" },
  { nombre: "Sangría", volumen: 200, graduacion: 8, descripcion: "Vaso 200ml, 8%" },
  { nombre: "Cóctel estándar", volumen: 200, graduacion: 12, descripcion: "Cóctel 200ml, 12%" },
];

type ConsumoBebida = { bebida: Bebida; cantidad: number };

function calcAlcoholG(beb: Bebida, cant: number) {
  return beb.volumen * (beb.graduacion / 100) * 0.789 * cant;
}

function bacColor(bac: number) {
  if (bac < 0.03) return "#6EC9A0";
  if (bac < 0.08) return "#D4B85A";
  if (bac < 0.15) return "#E07070";
  return "#C62828";
}

function bacLabel(bac: number) {
  if (bac < 0.001) return "Sobrio";
  if (bac < 0.03) return "Efectos mínimos";
  if (bac < 0.08) return "Leve deterioro";
  if (bac < 0.15) return "Deterioro significativo";
  if (bac < 0.25) return "Alto riesgo";
  return "Riesgo de vida";
}

export default function AlcoholEnSangre() {
  const [peso, setPeso] = useState("70");
  const [sexo, setSexo] = useState("masculino");
  const [horas, setHoras] = useState("1");
  const [consumos, setConsumos] = useState<ConsumoBebida[]>([]);
  const [bebidaSel, setBebidaSel] = useState(BEBIDAS[0].nombre);
  const [cantSel, setCantSel] = useState("1");

  const [resultado, setResultado] = useState<{
    bac: number; bacColor: string; bacLabel: string;
    horasParaCero: number; alcoholTotal: number;
  } | null>(null);

  const addBebida = () => {
    const beb = BEBIDAS.find((b) => b.nombre === bebidaSel);
    if (!beb) return;
    const cant = parseInt(cantSel) || 1;
    setConsumos((prev) => [...prev, { bebida: beb, cantidad: cant }]);
  };

  const removeBebida = (i: number) => setConsumos((prev) => prev.filter((_, idx) => idx !== i));

  const calcular = useCallback(() => {
    const p = parseFloat(peso) || 0;
    const h = parseFloat(horas) || 0;
    if (p <= 0 || consumos.length === 0) return;

    const alcoholTotal = consumos.reduce((acc, c) => acc + calcAlcoholG(c.bebida, c.cantidad), 0);
    const r = sexo === "masculino" ? 0.68 : 0.55;
    const bacBruto = (alcoholTotal / (p * r * 1000)) * 100;
    const bacActual = Math.max(0, bacBruto - 0.015 * h);
    const horasParaCero = bacActual > 0 ? Math.ceil(bacActual / 0.015) : 0;

    setResultado({
      bac: bacActual,
      bacColor: bacColor(bacActual),
      bacLabel: bacLabel(bacActual),
      horasParaCero,
      alcoholTotal,
    });
  }, [peso, sexo, horas, consumos]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/nutricion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Nutrición</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Alcohol en sangre</span>
        </nav>

        <div style={{ background: "#2A1A0F", border: "0.5px solid #E07070", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px" }}>
          <p style={{ fontSize: "12px", color: "#E07070", lineHeight: "1.6" }}>
            ⚠ Esta calculadora es solo orientativa. No sustituye criterio médico ni determina si es seguro conducir. <strong>Nunca conduzcas bajo los efectos del alcohol.</strong>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Calorías</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de alcohol en sangre
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Estima tu nivel de alcohol en sangre (BAC) usando la fórmula de Widmark. Ingresa tu peso, las bebidas consumidas y el tiempo transcurrido.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Peso corporal</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{peso} kg</span>
                  </div>
                  <input type="number" min="30" max="200" step="0.5" value={peso} onChange={(e) => setPeso(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Sexo biológico</label>
                  <select value={sexo} onChange={(e) => setSexo(e.target.value)}
                    style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Horas transcurridas desde el inicio</label>
                  <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{horas}h</span>
                </div>
                <input type="number" min="0" max="24" step="0.5" value={horas} onChange={(e) => setHoras(e.target.value)}
                  className={inputClass} style={{ ...inputStyle, outline: "none" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>

              <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "8px" }}>Agregar bebida</p>
              <div style={{ marginBottom: "8px" }}>
                <select value={bebidaSel} onChange={(e) => setBebidaSel(e.target.value)}
                  style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "12px", cursor: "pointer", outline: "none", marginBottom: "8px" }}>
                  {BEBIDAS.map((b) => <option key={b.nombre} value={b.nombre}>{b.nombre} — {b.descripcion}</option>)}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label style={{ fontSize: "11px", color: "#EEEEEE", display: "block", marginBottom: "4px" }}>Cantidad</label>
                    <input type="number" min="1" max="20" step="1" value={cantSel} onChange={(e) => setCantSel(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <button onClick={addBebida} className="w-full rounded-lg py-2.5 text-xs font-semibold transition-opacity hover:opacity-90"
                      style={{ background: NICHO.color, color: "#0F1117", border: "none", cursor: "pointer" }}>
                      + Agregar
                    </button>
                  </div>
                </div>
              </div>

              {consumos.length > 0 && (
                <div style={{ background: "#0F1117", borderRadius: "8px", padding: "8px 10px", marginBottom: "12px" }}>
                  {consumos.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 0", borderBottom: i < consumos.length - 1 ? "0.5px solid #1E2030" : "none" }}>
                      <span style={{ fontSize: "12px", color: "#EEEEEE" }}>{c.cantidad}× {c.bebida.nombre}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "11px", color: "#888" }}>{(calcAlcoholG(c.bebida, c.cantidad)).toFixed(1)}g alcohol</span>
                        <button onClick={() => removeBebida(i)} style={{ background: "transparent", border: "none", color: "#555", cursor: "pointer", fontSize: "14px" }} className="hover:!text-[#E07070]">×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={calcular} disabled={consumos.length === 0}
                className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: consumos.length > 0 ? NICHO.color : "#1E2030", color: consumos.length > 0 ? "#0F1117" : "#555", border: "none", cursor: consumos.length > 0 ? "pointer" : "not-allowed" }}>
                Calcular nivel de alcohol
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div style={{ background: resultado.bac < 0.03 ? "#0F1A14" : "#1A0F0F", border: `0.5px solid ${resultado.bacColor}44`, borderRadius: "10px", padding: "20px", textAlign: "center" }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Nivel de alcohol en sangre (BAC)</p>
                  <p style={{ fontSize: "52px", fontWeight: 600, color: resultado.bacColor, letterSpacing: "-2px", lineHeight: 1 }}>
                    {resultado.bac.toFixed(3)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>g/dL</p>
                  <span style={{ display: "inline-block", background: resultado.bacColor + "22", border: `0.5px solid ${resultado.bacColor}44`, borderRadius: "999px", padding: "3px 14px", fontSize: "12px", fontWeight: 600, color: resultado.bacColor }}>
                    {resultado.bacLabel}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Tiempo para llegar a 0.0</p>
                    <p style={{ fontSize: "24px", fontWeight: 600, color: NICHO.light, lineHeight: 1 }}>
                      {resultado.horasParaCero === 0 ? "Ya en 0.0" : `~${resultado.horasParaCero}h`}
                    </p>
                    <p style={{ fontSize: "10px", color: "#888", marginTop: "4px" }}>El cuerpo elimina ~0.015 g/dL/hora</p>
                  </div>
                  <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Alcohol total consumido</p>
                    <p style={{ fontSize: "24px", fontWeight: 600, color: NICHO.light, lineHeight: 1 }}>{resultado.alcoholTotal.toFixed(1)}g</p>
                    <p style={{ fontSize: "10px", color: "#888", marginTop: "4px" }}>{(resultado.alcoholTotal * 7).toFixed(0)} kcal vacías</p>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "8px" }}>Referencia legal en Latinoamérica</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { pais: "México", limite: "0.08", ley: "NOM-127" },
                      { pais: "Colombia", limite: "0.04", ley: "Ley 769" },
                      { pais: "Chile", limite: "0.03", ley: "Ley de Tránsito" },
                      { pais: "Argentina", limite: "0.05", ley: "Ley Nacional" },
                      { pais: "Perú", limite: "0.05", ley: "Reglamento Tránsito" },
                    ].map((p) => (
                      <div key={p.pais} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 8px", background: "#0F1117", borderRadius: "6px" }}>
                        <span style={{ fontSize: "12px", color: "#FFFFFF" }}>{p.pais}</span>
                        <span style={{ fontSize: "11px", color: "#888" }}>{p.ley}</span>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: resultado.bac > parseFloat(p.limite) ? "#E07070" : "#6EC9A0" }}>
                          Límite: {p.limite}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Agrega bebidas y presiona Calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo funciona la fórmula de Widmark para el alcohol en sangre
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La fórmula de Widmark (1932) es el modelo más utilizado mundialmente para estimar el nivel de alcohol en sangre (BAC, Blood Alcohol Content). Considera el peso corporal, el sexo biológico (que determina el factor de distribución r: 0.68 en hombres, 0.55 en mujeres) y la cantidad de alcohol en gramos. A mayor peso corporal, menor BAC para la misma cantidad de alcohol; las mujeres tienden a tener un BAC más alto que los hombres del mismo peso por menor proporción de agua corporal.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              El cuerpo elimina alcohol a una tasa constante de aproximadamente 0.015 g/dL por hora. Esta tasa es relativamente fija —no se acelera bebiendo agua, café o comiendo— aunque una buena hidratación y alimentos grasos sí pueden reducir la absorción inicial del alcohol.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Hombre de <strong style={{ color: "#FFFFFF" }}>75 kg que consume 3 cervezas 330ml 5% en 2 horas</strong>:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Alcohol total", value: "~39g", sub: "3 × 13g" },
                { label: "BAC estimado", value: "~0.055", sub: "leve deterioro" },
                { label: "Tiempo a 0.0", value: "~2-3h", sub: "después de la última" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.light, marginBottom: "2px" }}>{item.value}</p>
                  <p style={{ fontSize: "10px", color: "#F5F5F5" }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿El café o el agua ayudan a eliminar el alcohol más rápido?", a: "No. El hígado metaboliza el alcohol a una tasa constante de aproximadamente 0.015 g/dL por hora y no se puede acelerar. El café solo te mantendrá despierto pero no reducirá tu nivel de alcohol en sangre. La única forma de bajar el BAC es esperar el tiempo necesario para que el cuerpo lo procese de forma natural." },
                { q: "¿Por qué las mujeres se emborrachan más rápido con la misma cantidad de alcohol?", a: "Principalmente por dos razones: las mujeres tienen mayor porcentaje de grasa corporal y menor de agua, lo que significa que el alcohol se distribuye en un menor volumen de agua y alcanza mayor concentración. Además, las mujeres producen menos cantidad de la enzima alcohol deshidrogenasa que metaboliza el alcohol en el estómago, por lo que absorben mayor proporción." },
                { q: "¿Cuándo es legal conducir según el BAC en Latinoamérica?", a: "Los límites varían por país: Chile tiene uno de los más estrictos (0.03 g/dL), seguido por Colombia (0.04 g/dL). México y Perú establecen 0.08 g/dL como límite general, aunque algunos estados/regiones tienen límites menores. En varios países, conductores de transporte público y menores de edad tienen límite 0.00. Lo más seguro es no conducir si has consumido cualquier cantidad de alcohol." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Explora otras herramientas de nutrición</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Más herramientas para tu salud y bienestar.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/metabolismo-cafeina", label: "Metabolismo de cafeína", desc: "Cuándo se elimina la cafeína" },
                { href: "/hidratacion-deportiva", label: "Hidratación deportiva", desc: "Plan de hidratación por ejercicio" },
                { href: "/deficit-superavit", label: "Déficit y superávit calórico", desc: "Calorías objetivo por meta" },
                { href: "/calorias-por-alimento", label: "Calorías por alimento", desc: "Macros de 80 alimentos" },
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
