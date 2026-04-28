"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4B85A", light: "#E2CC7D", bg: "#332B0F", tint: "#181408", border: "rgba(212,184,90,0.25)" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type Fuente = { nombre: string; mg: number; descripcion: string };

const FUENTES: Fuente[] = [
  { nombre: "Café espresso (30ml)", mg: 63, descripcion: "Shot simple de espresso" },
  { nombre: "Café americano / filtrado (240ml)", mg: 95, descripcion: "Taza grande estándar" },
  { nombre: "Café negro fuerte (200ml)", mg: 95, descripcion: "Taza de preparación casera" },
  { nombre: "Café instantáneo (240ml)", mg: 60, descripcion: "Sobre o cuchara estándar" },
  { nombre: "Nespresso / cápsula", mg: 65, descripcion: "Cápsula estándar 40ml" },
  { nombre: "Café con leche / cortado", mg: 63, descripcion: "Espresso con leche" },
  { nombre: "Té verde (240ml)", mg: 28, descripcion: "Taza preparada al gusto" },
  { nombre: "Té negro (240ml)", mg: 47, descripcion: "Taza preparada fuerte" },
  { nombre: "Té matcha (240ml)", mg: 70, descripcion: "Té de polvo de matcha" },
  { nombre: "Red Bull (250ml)", mg: 80, descripcion: "Lata estándar 250ml" },
  { nombre: "Monster Energy (473ml)", mg: 160, descripcion: "Lata grande 473ml" },
  { nombre: "Coca-Cola (355ml)", mg: 34, descripcion: "Lata estándar" },
  { nombre: "Coca-Cola Zero/Light (355ml)", mg: 34, descripcion: "Lata estándar" },
  { nombre: "Pepsi (355ml)", mg: 38, descripcion: "Lata estándar" },
  { nombre: "Chocolate negro 70% (30g)", mg: 22, descripcion: "Barra pequeña de chocolate" },
  { nombre: "Pre-entrenamiento (1 scoop)", mg: 200, descripcion: "Suplemento deportivo estándar" },
];

type ConsumoItem = { fuente: Fuente; cantidad: number };

function nivelEn(mgInicial: number, horas: number): number {
  const halfLife = 5;
  return mgInicial * Math.pow(0.5, horas / halfLife);
}

function nivelColor(pct: number): string {
  if (pct > 0.5) return "#E07070";
  if (pct > 0.25) return "#D4B85A";
  if (pct > 0.1) return "#E2CC7D";
  return "#6EC9A0";
}

export default function MetabolismoCafeina() {
  const [peso, setPeso] = useState("70");
  const [horaConsumo, setHoraConsumo] = useState("8");
  const [consumos, setConsumos] = useState<ConsumoItem[]>([]);
  const [fuenteSel, setFuenteSel] = useState(FUENTES[0].nombre);
  const [cantSel, setCantSel] = useState("1");

  const [resultado, setResultado] = useState<{
    mgTotal: number; curva: { hora: number; mg: number; pct: number }[];
    horaDebajo10: number; horaDebajo25: number; inicioHora: number;
  } | null>(null);

  const addConsumo = () => {
    const f = FUENTES.find((fu) => fu.nombre === fuenteSel);
    if (!f) return;
    setConsumos((prev) => [...prev, { fuente: f, cantidad: parseInt(cantSel) || 1 }]);
  };

  const removeConsumo = (i: number) => setConsumos((prev) => prev.filter((_, idx) => idx !== i));

  const calcular = useCallback(() => {
    if (consumos.length === 0) return;
    const mgTotal = consumos.reduce((acc, c) => acc + c.fuente.mg * c.cantidad, 0);
    const inicio = parseInt(horaConsumo) || 8;

    const curva = Array.from({ length: 13 }, (_, i) => {
      const mg = nivelEn(mgTotal, i);
      return { hora: (inicio + i) % 24, mg, pct: mg / mgTotal };
    });

    const horaDebajo10 = Math.ceil(Math.log(0.10) / Math.log(0.5) * 5);
    const horaDebajo25 = Math.ceil(Math.log(0.25) / Math.log(0.5) * 5);

    setResultado({ mgTotal, curva, horaDebajo10, horaDebajo25, inicioHora: inicio });
  }, [consumos, horaConsumo, peso]);

  const fmtHora = (h: number) => `${(((h % 24) + 24) % 24).toString().padStart(2, "0")}:00`;

  return (
    <>
      <ToolSchema
        name="Calculadora de metabolismo de cafeína"
        description="Calcula cómo tu cuerpo metaboliza la cafeína de café, té, energéticas y suplementos a lo largo del día. Basado en la vida media de 5 horas. Descubre cuándo es seguro dormir."
        url="https://utilbox.lat/metabolismo-cafeina"
        category="Nutrición"
        faqItems={[
          { q: "¿La tolerancia a la cafeína cambia su velocidad de metabolización?", a: "No directamente. La tolerancia significa que tu cuerpo produce más receptores de adenosina para compensar el bloqueo de la cafeína, por lo que necesitas más para sentir el mismo efecto. Pero la velocidad de metabolización (vida media de ~5 horas) no cambia significativamente con la tolerancia. Un consumidor habitual y uno casual eliminan la cafeína a una tasa similar." },
          { q: "¿El té tiene menos cafeína que el café?", a: "Generalmente sí, pero depende de la preparación. Un té verde preparado tiene 25-45mg de cafeína, un té negro 40-70mg. El café filtrado tiene 80-150mg por taza. Sin embargo, el té contiene L-teanina, un aminoácido que modera el efecto estimulante de la cafeína produciendo una energía más sostenida y sin el pico brusco y caída que a veces produce el café solo." },
          { q: "¿La cafeína descafeinada tiene cero cafeína?", a: "No, el café descafeinado no es cero cafeína. Tiene aproximadamente 2-15mg por taza (vs 80-150mg del café regular). Para la mayoría de las personas, esta cantidad es insignificante, pero personas muy sensibles a la cafeína o con metabolismo lento pueden notar efectos incluso con descafeinado, especialmente si consumen varias tazas." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/nutricion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Nutrición</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Metabolismo de cafeína</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Hidratación</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Velocidad de metabolización de cafeína
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula cuándo se eliminará la cafeína de tu cuerpo hora a hora. Ideal para saber a qué hora tomar café sin afectar tu sueño.
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
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Hora de consumo</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{horaConsumo.padStart(2, "0")}:00</span>
                  </div>
                  <select value={horaConsumo} onChange={(e) => setHoraConsumo(e.target.value)}
                    style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{i.toString().padStart(2, "0")}:00</option>
                    ))}
                  </select>
                </div>
              </div>

              <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "8px" }}>Fuente de cafeína</p>
              <select value={fuenteSel} onChange={(e) => setFuenteSel(e.target.value)}
                style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "12px", cursor: "pointer", outline: "none", marginBottom: "8px" }}>
                {FUENTES.map((f) => <option key={f.nombre} value={f.nombre}>{f.nombre} — {f.mg}mg</option>)}
              </select>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <label style={{ fontSize: "11px", color: "#EEEEEE", display: "block", marginBottom: "4px" }}>Cantidad</label>
                  <input type="number" min="1" max="10" step="1" value={cantSel} onChange={(e) => setCantSel(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <button onClick={addConsumo} className="w-full rounded-lg py-2.5 text-xs font-semibold transition-opacity hover:opacity-90"
                    style={{ background: NICHO.color, color: "#0F1117", border: "none", cursor: "pointer" }}>
                    + Agregar
                  </button>
                </div>
              </div>

              {consumos.length > 0 && (
                <div style={{ background: "#0F1117", borderRadius: "8px", padding: "8px 10px", marginBottom: "12px" }}>
                  {consumos.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 0", borderBottom: i < consumos.length - 1 ? "0.5px solid #1E2030" : "none" }}>
                      <span style={{ fontSize: "12px", color: "#EEEEEE" }}>{c.cantidad}× {c.fuente.nombre}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "11px", color: NICHO.light, fontWeight: 600 }}>{c.fuente.mg * c.cantidad}mg</span>
                        <button onClick={() => removeConsumo(i)} style={{ background: "transparent", border: "none", color: "#555", cursor: "pointer", fontSize: "14px" }} className="hover:!text-[#E07070]">×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={calcular} disabled={consumos.length === 0}
                className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: consumos.length > 0 ? NICHO.color : "#1E2030", color: consumos.length > 0 ? "#0F1117" : "#555", border: "none", cursor: consumos.length > 0 ? "pointer" : "not-allowed" }}>
                Calcular curva de cafeína
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-3">
                <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "16px 20px" }}>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Cafeína total</p>
                      <p style={{ fontSize: "28px", fontWeight: 600, color: NICHO.color, lineHeight: 1 }}>{resultado.mgTotal}</p>
                      <p style={{ fontSize: "10px", color: "#888" }}>mg</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Debajo del 25%</p>
                      <p style={{ fontSize: "28px", fontWeight: 600, color: NICHO.light, lineHeight: 1 }}>{fmtHora(resultado.inicioHora + resultado.horaDebajo25)}</p>
                      <p style={{ fontSize: "10px", color: "#888" }}>~{resultado.horaDebajo25}h después</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Debajo del 10%</p>
                      <p style={{ fontSize: "28px", fontWeight: 600, color: "#6EC9A0", lineHeight: 1 }}>{fmtHora(resultado.inicioHora + resultado.horaDebajo10)}</p>
                      <p style={{ fontSize: "10px", color: "#888" }}>seguro para dormir</p>
                    </div>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Curva de eliminación (vida media: 5h)</p>
                  <div className="flex flex-col gap-1.5">
                    {resultado.curva.map((p, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "10px", color: "#888", width: "44px", textAlign: "right", flexShrink: 0 }}>{fmtHora(p.hora)}</span>
                        <div style={{ flex: 1, height: "8px", background: "#0F1117", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ width: `${p.pct * 100}%`, height: "100%", background: nivelColor(p.pct), borderRadius: "999px", transition: "width 0.3s" }} />
                        </div>
                        <span style={{ fontSize: "10px", fontWeight: 600, color: nivelColor(p.pct), width: "44px", flexShrink: 0 }}>{Math.round(p.mg)}mg</span>
                        <span style={{ fontSize: "10px", color: "#555", width: "32px", flexShrink: 0 }}>{Math.round(p.pct * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#141520", border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "12px 14px" }}>
                  <p style={{ fontSize: "12px", color: NICHO.light, lineHeight: "1.6" }}>
                    💡 Para un sueño de calidad, toma tu último café al menos <strong style={{ color: NICHO.color }}>{resultado.horaDebajo10}h antes de dormir</strong>. Si duermes a las 23:00, tu última taza debería ser antes de las {fmtHora(23 - resultado.horaDebajo10)}.
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Agrega fuentes de cafeína y presiona Calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo el cuerpo metaboliza la cafeína y por qué afecta el sueño
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La cafeína tiene una vida media de aproximadamente 5 horas en adultos sanos, aunque esto puede variar entre 3 y 7 horas según factores genéticos, medicamentos, tabaquismo y embarazo. Esto significa que si tomas 200mg de cafeína a las 2pm, todavía tendrás aproximadamente 100mg activos a las 7pm. La cafeína bloquea los receptores de adenosina —la hormona que induce el sueño— incluso cuando su nivel en sangre es bajo.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              La dosis segura diaria para adultos saludables es de hasta 400mg (roughly 4 tazas de café). En el contexto latinoamericano, el café es central en la cultura de México, Colombia, Venezuela, Brasil y Ecuador. Entender cómo metabolizas la cafeína te permite disfrutar del café sin sacrificar la calidad de tu sueño.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Persona que toma <strong style={{ color: "#FFFFFF" }}>2 cafés americanos (190mg total) a las 14:00</strong> y quiere dormir a las 23:00:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "A las 19:00 (5h)", value: "~95mg", sub: "50% restante" },
                { label: "A las 23:00 (9h)", value: "~30mg", sub: "16% — puede afectar" },
                { label: "Último café ideal", value: "14:00", sub: "tope para dormir 23h" },
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
                { q: "¿La tolerancia a la cafeína cambia su velocidad de metabolización?", a: "No directamente. La tolerancia significa que tu cuerpo produce más receptores de adenosina para compensar el bloqueo de la cafeína, por lo que necesitas más para sentir el mismo efecto. Pero la velocidad de metabolización (vida media de ~5 horas) no cambia significativamente con la tolerancia. Un consumidor habitual y uno casual eliminan la cafeína a una tasa similar." },
                { q: "¿El té tiene menos cafeína que el café?", a: "Generalmente sí, pero depende de la preparación. Un té verde preparado tiene 25-45mg de cafeína, un té negro 40-70mg. El café filtrado tiene 80-150mg por taza. Sin embargo, el té contiene L-teanina, un aminoácido que modera el efecto estimulante de la cafeína produciendo una energía más sostenida y sin el pico brusco y caída que a veces produce el café solo." },
                { q: "¿La cafeína descafeinada tiene cero cafeína?", a: "No, el café descafeinado no es cero cafeína. Tiene aproximadamente 2-15mg por taza (vs 80-150mg del café regular). Para la mayoría de las personas, esta cantidad es insignificante, pero personas muy sensibles a la cafeína o con metabolismo lento pueden notar efectos incluso con descafeinado, especialmente si consumen varias tazas." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Complementa tu rutina de bienestar.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/hidratacion-deportiva", label: "Hidratación deportiva", desc: "Plan de hidratación por ejercicio" },
                { href: "/ayuno-intermitente", label: "Ayuno intermitente", desc: "Ventanas de ayuno y alimentación" },
                { href: "/alcohol-en-sangre", label: "Alcohol en sangre", desc: "Nivel BAC y tiempo de eliminación" },
                { href: "/deficit-superavit", label: "Déficit y superávit calórico", desc: "TDEE y calorías según tu meta" },
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
