"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4856A", light: "#E8A88E", bg: "#3D2218", tint: "#1C1210", border: "rgba(212,133,106,0.25)" };

function fmt2(n: number) { return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmt0(n: number) { return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };
function focusStyle(el: HTMLInputElement | HTMLSelectElement) { el.style.borderColor = NICHO.color; el.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }
function blurStyle(el: HTMLInputElement | HTMLSelectElement) { el.style.borderColor = "#1E2030"; el.style.boxShadow = "none"; }

const APARATOS_PRESET: { nombre: string; watts: number }[] = [
  { nombre: "Refrigerador", watts: 150 },
  { nombre: "Aire acondicionado", watts: 1500 },
  { nombre: "Lavadora", watts: 500 },
  { nombre: "Secadora", watts: 3000 },
  { nombre: "TV 50\"", watts: 100 },
  { nombre: "Computadora de escritorio", watts: 200 },
  { nombre: "Laptop", watts: 50 },
  { nombre: "Microondas", watts: 1200 },
  { nombre: "Plancha", watts: 1000 },
  { nombre: "Ducha eléctrica", watts: 5500 },
  { nombre: "Foco LED", watts: 10 },
  { nombre: "Ventilador", watts: 60 },
  { nombre: "Otro", watts: 100 },
];

interface Aparato {
  id: number;
  nombre: string;
  watts: string;
  horas: string;
  dias: string;
}

let nextId = 1;

export default function ConsumoElectrico() {
  const [tarifa, setTarifa] = useState("2.5");
  const [aparatos, setAparatos] = useState<Aparato[]>([
    { id: nextId++, nombre: "Refrigerador", watts: "150", horas: "24", dias: "30" },
    { id: nextId++, nombre: "TV 50\"", watts: "100", horas: "5", dias: "30" },
  ]);

  const [resultado, setResultado] = useState<{
    items: { nombre: string; kwh: number; costo: number }[];
    totalKwh: number;
    totalMes: number;
    totalAnual: number;
    top3: { nombre: string; costo: number }[];
  } | null>(null);

  const addAparato = () => {
    setAparatos(prev => [...prev, { id: nextId++, nombre: "Refrigerador", watts: "150", horas: "8", dias: "30" }]);
  };

  const removeAparato = (id: number) => {
    setAparatos(prev => prev.filter(a => a.id !== id));
  };

  const updateAparato = (id: number, field: keyof Aparato, value: string) => {
    setAparatos(prev => prev.map(a => {
      if (a.id !== id) return a;
      const updated = { ...a, [field]: value };
      if (field === "nombre") {
        const preset = APARATOS_PRESET.find(p => p.nombre === value);
        if (preset) updated.watts = String(preset.watts);
      }
      return updated;
    }));
  };

  const calcular = useCallback(() => {
    const tar = parseFloat(tarifa) || 0;
    const items = aparatos.map(a => {
      const w = parseFloat(a.watts) || 0;
      const h = parseFloat(a.horas) || 0;
      const d = parseFloat(a.dias) || 0;
      const kwh = (w * h * d) / 1000;
      const costo = kwh * tar;
      return { nombre: a.nombre, kwh, costo };
    }).filter(i => i.kwh > 0);

    if (items.length === 0) return;

    const totalKwh = items.reduce((s, i) => s + i.kwh, 0);
    const totalMes = items.reduce((s, i) => s + i.costo, 0);
    const totalAnual = totalMes * 12;
    const top3 = [...items].sort((a, b) => b.costo - a.costo).slice(0, 3);

    setResultado({ items, totalKwh, totalMes, totalAnual, top3 });
  }, [tarifa, aparatos]);

  const maxCosto = resultado ? Math.max(...resultado.items.map(i => i.costo)) : 1;

  return (
    <>
      <ToolSchema
        name="Calculadora de consumo eléctrico del hogar"
        description="Calcula cuánto consume cada electrodoméstico y cuánto pagas al mes en tu recibo de luz. Para tarifas de CFE, EPM, Enel y distribuidoras de toda Latinoamérica."
        url="https://utilbox.lat/consumo-electrico"
        category="Hogar"
        faqItems={[
          { q: "¿Cómo sé la potencia de mis electrodomésticos?", a: "La potencia en watts está indicada en la etiqueta o placa del aparato, generalmente en la parte trasera o inferior. También puedes buscar el modelo del aparato en internet para encontrar sus especificaciones técnicas." },
          { q: "¿El refrigerador consume más si está lleno o vacío?", a: "Un refrigerador bien lleno (pero no sobrecargado) es más eficiente. Los alimentos actúan como masa térmica y ayudan a mantener la temperatura estable. Un refrigerador vacío tiene que trabajar más para enfriar aire caliente cada vez que abres la puerta." },
          { q: "¿Vale la pena cambiar focos incandescentes por LED?", a: "Un foco LED de 10W reemplaza a uno incandescente de 60W, consumiendo un 83% menos de electricidad. Si usas 10 focos 8 horas al día, el cambio a LED puede ahorrarte más de $100 al mes dependiendo de tu tarifa." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/hogar" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Hogar</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de consumo eléctrico</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Energía</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de consumo eléctrico
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula cuánto consumen tus electrodomésticos y cuánto pagas al mes de electricidad.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tarifa eléctrica ($/kWh)</label>
                <input type="number" min="0" step="0.01" value={tarifa} onChange={e => setTarifa(e.target.value)}
                  className={inputClass} style={{ ...inputStyle, outline: "none" }}
                  onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
              </div>

              <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Electrodomésticos</p>

              <div className="space-y-3 mb-3" style={{ maxHeight: "340px", overflowY: "auto" }}>
                {aparatos.map(a => (
                  <div key={a.id} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "10px 12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <select value={a.nombre} onChange={e => updateAparato(a.id, "nombre", e.target.value)}
                        style={{ background: "transparent", border: "none", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer", outline: "none", flex: 1 }}>
                        {APARATOS_PRESET.map(p => <option key={p.nombre} value={p.nombre}>{p.nombre}</option>)}
                      </select>
                      <button onClick={() => removeAparato(a.id)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "16px", padding: "0 0 0 8px" }}>×</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label style={{ fontSize: "10px", color: "#EEEEEE", display: "block", marginBottom: "3px" }}>Watts</label>
                        <input type="number" min="0" value={a.watts} onChange={e => updateAparato(a.id, "watts", e.target.value)}
                          className={inputClass} style={{ ...inputStyle, outline: "none", padding: "6px 8px" }}
                          onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                      </div>
                      <div>
                        <label style={{ fontSize: "10px", color: "#EEEEEE", display: "block", marginBottom: "3px" }}>Horas/día</label>
                        <input type="number" min="0" max="24" step="0.5" value={a.horas} onChange={e => updateAparato(a.id, "horas", e.target.value)}
                          className={inputClass} style={{ ...inputStyle, outline: "none", padding: "6px 8px" }}
                          onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                      </div>
                      <div>
                        <label style={{ fontSize: "10px", color: "#EEEEEE", display: "block", marginBottom: "3px" }}>Días/mes</label>
                        <input type="number" min="0" max="30" value={a.dias} onChange={e => updateAparato(a.id, "dias", e.target.value)}
                          className={inputClass} style={{ ...inputStyle, outline: "none", padding: "6px 8px" }}
                          onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={addAparato} className="w-full mb-4 rounded-lg py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: "transparent", border: `0.5px solid ${NICHO.color}`, color: NICHO.color, cursor: "pointer" }}>
                + Agregar aparato
              </button>

              <button onClick={calcular} className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular consumo
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-5 text-center" style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Consumo total/mes</p>
                    <p style={{ fontSize: "28px", fontWeight: 600, color: NICHO.color, lineHeight: 1 }}>{fmt2(resultado.totalKwh)}</p>
                    <p style={{ fontSize: "11px", color: "#EEEEEE" }}>kWh</p>
                  </div>
                  <div className="rounded-[10px] p-5 text-center" style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Costo mensual</p>
                    <p style={{ fontSize: "28px", fontWeight: 600, color: NICHO.color, lineHeight: 1 }}>${fmt2(resultado.totalMes)}</p>
                    <p style={{ fontSize: "11px", color: "#EEEEEE" }}>Anual: ${fmt0(resultado.totalAnual)}</p>
                  </div>
                </div>

                {/* Top 3 */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "8px" }}>Top 3 que más consumen</p>
                  <div className="space-y-2">
                    {resultado.top3.map((item, i) => (
                      <div key={item.nombre} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: NICHO.color, width: "20px" }}>{i + 1}</span>
                        <span style={{ fontSize: "13px", color: "#FFFFFF", flex: 1 }}>{item.nombre}</span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: NICHO.light }}>${fmt2(item.costo)}/mes</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bar chart */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "12px" }}>Costo mensual por aparato</p>
                  <div className="space-y-2">
                    {resultado.items.map(item => (
                      <div key={item.nombre}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#EEEEEE", marginBottom: "3px" }}>
                          <span>{item.nombre}</span>
                          <span style={{ color: NICHO.light }}>${fmt2(item.costo)}</span>
                        </div>
                        <div style={{ height: "6px", background: "#0F1117", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(item.costo / maxCosto) * 100}%`, background: NICHO.color, borderRadius: "3px" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>⚡</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Agrega tus aparatos y presiona Calcular consumo</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo reducir tu factura eléctrica
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El consumo eléctrico del hogar depende principalmente de 3–5 aparatos: el aire acondicionado, la ducha eléctrica, el refrigerador, la secadora y el calentador de agua. Optimizar el uso de estos aparatos puede reducir tu factura hasta un 40%.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Los aparatos en modo standby (TV, microondas, cargadores conectados) pueden representar hasta el 10% del consumo total. Desenchufar los aparatos que no usas es una medida simple y efectiva.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Cómo sé la potencia de mis electrodomésticos?", a: "La potencia en watts está indicada en la etiqueta o placa del aparato, generalmente en la parte trasera o inferior. También puedes buscar el modelo del aparato en internet para encontrar sus especificaciones técnicas." },
                { q: "¿El refrigerador consume más si está lleno o vacío?", a: "Un refrigerador bien lleno (pero no sobrecargado) es más eficiente. Los alimentos actúan como masa térmica y ayudan a mantener la temperatura estable. Un refrigerador vacío tiene que trabajar más para enfriar aire caliente cada vez que abres la puerta." },
                { q: "¿Vale la pena cambiar focos incandescentes por LED?", a: "Un foco LED de 10W reemplaza a uno incandescente de 60W, consumiendo un 83% menos de electricidad. Si usas 10 focos 8 horas al día, el cambio a LED puede ahorrarte más de $100 al mes dependiendo de tu tarifa." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Optimiza más aspectos de tu vivienda.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/ahorro-energia-solar", label: "Ahorro en energía solar", desc: "¿Cuándo recuperas la inversión?" },
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
