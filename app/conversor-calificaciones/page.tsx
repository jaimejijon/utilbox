"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import ToolSchema from "../components/ToolSchema";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#74AEDD", light: "#9DC4E8", bg: "#152638", tint: "#0E1318", border: "rgba(116,174,221,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type Sistema = "1-10" | "1-20" | "GPA" | "0-100";

interface Conversion {
  sistema: string;
  valor: number;
  clasificacion: string;
  color: string;
}

function toNormalizado(nota: number, sistema: Sistema): number {
  switch (sistema) {
    case "1-10": return (nota - 1) / 9;
    case "1-20": return (nota - 1) / 19;
    case "GPA": return nota / 4;
    case "0-100": return nota / 100;
    default: return 0;
  }
}

function desdeNormalizado(norm: number, sistema: Sistema): number {
  switch (sistema) {
    case "1-10": return Math.round((norm * 9 + 1) * 100) / 100;
    case "1-20": return Math.round((norm * 19 + 1) * 100) / 100;
    case "GPA": return Math.round(norm * 4 * 100) / 100;
    case "0-100": return Math.round(norm * 100 * 100) / 100;
    default: return 0;
  }
}

function getClasificacion(norm: number): { label: string; color: string } {
  if (norm >= 0.9) return { label: "Excelente", color: "#6EC9A0" };
  if (norm >= 0.75) return { label: "Muy bueno", color: "#74AEDD" };
  if (norm >= 0.6) return { label: "Bueno", color: "#9DC4E8" };
  if (norm >= 0.5) return { label: "Aprobado", color: "#D4B85A" };
  return { label: "Reprobado", color: "#E07070" };
}

const sistemaLabels: Record<Sistema, string> = {
  "1-10": "Escala 1 – 10",
  "1-20": "Escala 1 – 20",
  "GPA": "GPA (0 – 4)",
  "0-100": "Porcentual (0 – 100%)",
};

const sistemas: Sistema[] = ["1-10", "1-20", "GPA", "0-100"];

export default function ConversorCalificaciones() {
  const [nota, setNota] = useState("8.5");
  const [sistemaOrigen, setSistemaOrigen] = useState<Sistema>("1-10");
  const [resultado, setResultado] = useState<Conversion[] | null>(null);

  const calcular = useCallback(() => {
    const n = parseFloat(nota);
    if (isNaN(n)) return;
    const norm = toNormalizado(n, sistemaOrigen);
    const conversiones: Conversion[] = sistemas
      .filter(s => s !== sistemaOrigen)
      .map(s => {
        const val = desdeNormalizado(norm, s);
        const { label, color } = getClasificacion(norm);
        return { sistema: sistemaLabels[s], valor: val, clasificacion: label, color };
      });
    const { label, color } = getClasificacion(norm);
    const propiaConv: Conversion = { sistema: sistemaLabels[sistemaOrigen] + " (original)", valor: n, clasificacion: label, color };
    setResultado([propiaConv, ...conversiones]);
  }, [nota, sistemaOrigen]);

  const sufijo = (sistema: Sistema) => sistema === "0-100" ? "%" : sistema === "GPA" ? " pts" : "";

  return (
    <>
      <ToolSchema
        name="Conversor de sistemas de calificación"
        description="Convierte tu nota entre escala 1-10, 1-20, GPA (0-4) y porcentual (0-100%). Equivalencias académicas para México, Colombia, Perú, Venezuela, Argentina, Uruguay y más."
        url="https://utilbox.lat/conversor-calificaciones"
        category="Educación"
        faqItems={[
          { q: "¿La conversión es oficial o aproximada?", a: "Es una conversión basada en normalización proporcional, no una tabla oficial. Las universidades e instituciones pueden usar sus propias equivalencias, que a veces difieren de estas cifras. Para aplicaciones formales, siempre verifica la tabla de equivalencias específica de la institución a la que aplicas." },
          { q: "¿El GPA de 4.0 equivale al 10 perfecto?", a: "En principio sí, pero en la práctica el GPA 4.0 se obtiene con A+ en el sistema americano, que puede ser más o menos exigente que un 10 en escala latinoamericana. Algunos sistemas permiten créditos extra (honor) que suben el GPA por encima de 4.0, aunque esta herramienta no contempla ese caso." },
          { q: "¿Cómo funciona la escala 1-20 en relación al 1-10?", a: "La escala 1-20 es común en Francia y algunos países latinoamericanos como Venezuela y Perú. Una nota de 10/20 no equivale a 5/10 sino que depende del mínimo aprobatorio de cada sistema. En Francia 10/20 es el mínimo aprobatorio, similar a 5/10 en México. Esta herramienta normaliza ambas escalas desde su mínimo (1) hasta su máximo para mantener la proporcionalidad." },
        ]}
      />
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/educacion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Educación</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Conversor de sistemas de calificación</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: inputs */}
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Notas</span>
            </div>

            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Conversor de sistemas de calificación
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Convierte tu nota entre escala 1-10, 1-20, GPA y porcentual al instante.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Sistema de origen</label>
                  <select value={sistemaOrigen} onChange={(e) => setSistemaOrigen(e.target.value as Sistema)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    {sistemas.map(s => (
                      <option key={s} value={s}>{sistemaLabels[s]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Tu nota</label>
                    <span style={{ fontSize: "11px", color: "#EEEEEE" }}>
                      {sistemaOrigen === "1-10" ? "Rango: 1 – 10" : sistemaOrigen === "1-20" ? "Rango: 1 – 20" : sistemaOrigen === "GPA" ? "Rango: 0 – 4" : "Rango: 0 – 100"}
                    </span>
                  </div>
                  <input type="number" step="0.01" value={nota} onChange={(e) => setNota(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, fontSize: "20px", fontWeight: 600, textAlign: "center" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Convertir calificación
              </button>
            </div>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px", marginTop: "16px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#EEEEEE", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: "10px" }}>Tabla de equivalencias</p>
              <div style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.8" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px", marginBottom: "4px" }}>
                  <span style={{ color: NICHO.color, fontWeight: 600 }}>Clasificación</span>
                  <span style={{ color: NICHO.color, fontWeight: 600 }}>1-10</span>
                  <span style={{ color: NICHO.color, fontWeight: 600 }}>GPA</span>
                </div>
                {[
                  ["Excelente", "9.0 – 10", "3.7 – 4.0"],
                  ["Muy bueno", "7.5 – 8.9", "3.0 – 3.6"],
                  ["Bueno", "6.0 – 7.4", "2.5 – 2.9"],
                  ["Aprobado", "5.0 – 5.9", "2.0 – 2.4"],
                  ["Reprobado", "< 5.0", "< 2.0"],
                ].map(([c, s10, gpa]) => (
                  <div key={c} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px" }}>
                    <span>{c}</span><span>{s10}</span><span>{gpa}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: results */}
          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Clasificación</p>
                  <p style={{ fontSize: "32px", fontWeight: 600, color: resultado[0].color, letterSpacing: "-1px", lineHeight: 1 }}>
                    {resultado[0].clasificacion}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "6px" }}>Nota {resultado[0].valor} en {resultado[0].sistema}</p>
                </div>

                <div className="space-y-3">
                  {resultado.slice(1).map((conv) => (
                    <div key={conv.sistema} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "2px" }}>{conv.sistema}</p>
                        <span style={{ fontSize: "11px", color: conv.color, fontWeight: 600 }}>{conv.clasificacion}</span>
                      </div>
                      <p style={{ fontSize: "32px", fontWeight: 600, color: conv.color, letterSpacing: "-1px" }}>
                        {conv.valor}{sufijo(sistemas.find(s => sistemaLabels[s] === conv.sistema) as Sistema)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tu nota y presiona Convertir</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo convertir calificaciones entre diferentes sistemas educativos
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Cada sistema educativo tiene su propia escala de calificaciones. El sistema más extendido en Latinoamérica es la escala 1-10, donde 6 suele ser el mínimo aprobatorio. En Francia y algunos países andinos se usa la escala 1-20. En Estados Unidos y Canadá se utiliza el GPA de 0 a 4. El sistema porcentual (0-100%) es común en educación anglosajona y algunos programas técnicos.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La conversión no es lineal en todos los sistemas. Esta herramienta utiliza una normalización que preserva la posición relativa de la nota dentro de su escala, lo que da conversiones más precisas que las tablas simples de equivalencia. Una nota de 8/10 en México equivale aproximadamente a 3.2 GPA, 15.2/20 en el sistema francés, y 80% en escala porcentual.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Esta conversión es útil al aplicar a universidades extranjeras, becas internacionales, o cuando se necesita validar estudios en otro país. Recuerda que las instituciones pueden tener sus propias tablas de equivalencia oficiales.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Estudiante mexicana con promedio 9.2 en escala 1-10 aplicando a universidad en EE.UU.:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Original (1-10)", value: "9.2", sub: "México/España" },
                { label: "GPA equivalente", value: "3.72", sub: "EE.UU./Canadá" },
                { label: "Clasificación", value: "Excelente", sub: "Top 10% académico" },
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
                { q: "¿La conversión es oficial o aproximada?", a: "Es una conversión basada en normalización proporcional, no una tabla oficial. Las universidades e instituciones pueden usar sus propias equivalencias, que a veces difieren de estas cifras. Para aplicaciones formales, siempre verifica la tabla de equivalencias específica de la institución a la que aplicas." },
                { q: "¿El GPA de 4.0 equivale al 10 perfecto?", a: "En principio sí, pero en la práctica el GPA 4.0 se obtiene con A+ en el sistema americano, que puede ser más o menos exigente que un 10 en escala latinoamericana. Algunos sistemas permiten créditos extra (honor) que suben el GPA por encima de 4.0, aunque esta herramienta no contempla ese caso." },
                { q: "¿Cómo funciona la escala 1-20 en relación al 1-10?", a: "La escala 1-20 es común en Francia y algunos países latinoamericanos como Venezuela y Perú. Una nota de 10/20 no equivale a 5/10 sino que depende del mínimo aprobatorio de cada sistema. En Francia 10/20 es el mínimo aprobatorio, similar a 5/10 en México. Esta herramienta normaliza ambas escalas desde su mínimo (1) hasta su máximo para mantener la proporcionalidad." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Explora otras herramientas de educación</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Herramientas para tu gestión académica.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/promedio-ponderado", label: "Promedio ponderado", desc: "Calcula tu promedio por créditos" },
                { href: "/nota-minima-aprobar", label: "Nota mínima para aprobar", desc: "Qué necesitas en el examen final" },
                { href: "/simulador-beca", label: "Simulador de beca", desc: "Escenarios de financiamiento" },
                { href: "/roi-posgrado", label: "ROI de un posgrado", desc: "¿Vale la pena el máster?" },
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
