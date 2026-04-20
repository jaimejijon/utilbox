"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#6EC9A0", light: "#8FD9B6", bg: "#1A3D2E", tint: "#101A14", border: "rgba(110,201,160,0.25)" };

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

function formatDate(d: Date): string {
  return d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
}

export default function FechaProbableParto() {
  const [fum, setFum] = useState("");
  const [duracionCiclo, setDuracionCiclo] = useState("28");
  const [resultado, setResultado] = useState<{
    fechaParto: string;
    semanasEmbarazo: number;
    trimestre: string;
    diasRestantes: number;
    fechaConcepcion: string;
  } | null>(null);

  const calcular = useCallback(() => {
    if (!fum) return;
    const fumDate = new Date(fum + "T12:00:00");
    const ajuste = parseInt(duracionCiclo) - 28;
    const fechaPartoDate = new Date(fumDate);
    fechaPartoDate.setDate(fechaPartoDate.getDate() + 280 + ajuste);
    const fechaConcepcionDate = new Date(fumDate);
    fechaConcepcionDate.setDate(fechaConcepcionDate.getDate() + 14 + ajuste);
    const hoy = new Date();
    const diffMs = hoy.getTime() - fumDate.getTime();
    const semanas = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
    const trimestre = semanas <= 13 ? "1°" : semanas <= 26 ? "2°" : "3°";
    const diasRestantes = Math.ceil((fechaPartoDate.getTime() - hoy.getTime()) / (24 * 60 * 60 * 1000));
    setResultado({
      fechaParto: formatDate(fechaPartoDate),
      semanasEmbarazo: Math.max(0, semanas),
      trimestre,
      diasRestantes,
      fechaConcepcion: formatDate(fechaConcepcionDate),
    });
  }, [fum, duracionCiclo]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/salud" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Salud</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de fecha de parto</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Peso y medidas</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de fecha de parto
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula la fecha estimada de parto y semanas de embarazo desde tu última menstruación.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="flex flex-col gap-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>
                    Primer día de tu última menstruación (FUM)
                  </label>
                  <input type="date" value={fum} onChange={(e) => setFum(e.target.value)}
                    style={{ background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF", borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>Duración del ciclo menstrual</label>
                    <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{duracionCiclo} días</span>
                  </div>
                  <input type="number" min="20" max="45" step="1" value={duracionCiclo} onChange={(e) => setDuracionCiclo(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginTop: "4px" }}>El ciclo promedio es 28 días.</p>
                </div>
              </div>
              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular fecha de parto
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                {/* Main date */}
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "8px" }}>Fecha probable de parto</p>
                  <p style={{ fontSize: "22px", fontWeight: 600, color: NICHO.light, lineHeight: 1.2 }}>
                    {resultado.fechaParto}
                  </p>
                  {resultado.diasRestantes > 0 && (
                    <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "8px" }}>
                      Faltan <strong style={{ color: NICHO.light }}>{resultado.diasRestantes}</strong> días
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Semanas</p>
                    <p style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF" }}>{resultado.semanasEmbarazo}</p>
                    <p style={{ fontSize: "10px", color: "#EEEEEE" }}>de gestación</p>
                  </div>
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Trimestre</p>
                    <p style={{ fontSize: "22px", fontWeight: 600, color: NICHO.light }}>{resultado.trimestre}</p>
                    <p style={{ fontSize: "10px", color: "#EEEEEE" }}>trimestre</p>
                  </div>
                  <div className="rounded-[10px] p-4 text-center" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Días restantes</p>
                    <p style={{ fontSize: "22px", fontWeight: 600, color: resultado.diasRestantes > 0 ? "#FFFFFF" : "#E07070" }}>
                      {Math.abs(resultado.diasRestantes)}
                    </p>
                    <p style={{ fontSize: "10px", color: "#EEEEEE" }}>
                      {resultado.diasRestantes > 0 ? "días" : "días pasados"}
                    </p>
                  </div>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "4px" }}>Fecha aproximada de concepción</p>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF" }}>{resultado.fechaConcepcion}</p>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.6" }}>
                    Esta es una estimación basada en la Regla de Naegele. La fecha real puede variar ±2 semanas. Consulta a tu médico o ginecóloga para confirmación con ultrasonido.
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa la fecha de tu última menstruación</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo se calcula la fecha probable de parto
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              La fecha probable de parto (FPP) se calcula usando la Regla de Naegele: se suman 280 días (40 semanas) al primer día de la última menstruación (FUM). Esta fórmula asume un ciclo menstrual de 28 días. Si tu ciclo es más largo o más corto, la calculadora ajusta automáticamente la fecha sumando o restando los días de diferencia.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El embarazo se divide en tres trimestres: el primero abarca las semanas 1–13, el segundo las semanas 14–26 y el tercero las semanas 27–40. Cada trimestre tiene hitos de desarrollo fetal específicos y diferentes necesidades de cuidado prenatal.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Solo el 5% de los bebés nacen exactamente en la fecha probable de parto. La mayoría nacen entre las semanas 37 y 42. El ultrasonido del primer trimestre es el método más preciso para establecer la edad gestacional y la fecha esperada de parto.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Hitos del embarazo por trimestre</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "1er Trimestre", value: "Sem 1–13", sub: "Formación de órganos" },
                { label: "2do Trimestre", value: "Sem 14–26", sub: "Crecimiento rápido" },
                { label: "3er Trimestre", value: "Sem 27–40", sub: "Maduración final" },
              ].map((item) => (
                <div key={item.label} style={{ background: "#0F1117", border: "0.5px solid #1E2030", borderRadius: "8px", padding: "12px 8px", textAlign: "center" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: NICHO.light, marginBottom: "2px" }}>{item.value}</p>
                  <p style={{ fontSize: "10px", color: "#F5F5F5" }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Qué tan precisa es la calculadora de fecha de parto?", a: "La Regla de Naegele tiene una precisión de ±2 semanas para la mayoría de mujeres con ciclos regulares. El ultrasonido del primer trimestre (entre semanas 8–13) es más preciso y puede confirmar o ajustar la fecha estimada. Si tu ciclo es irregular, la calculadora puede ser menos precisa." },
                { q: "¿Por qué se cuentan las semanas desde la última menstruación si el bebé aún no existía?", a: "Es una convención médica establecida históricamente porque la fecha de la última menstruación es fácil de recordar, mientras que la fecha exacta de concepción rara vez se conoce con certeza. Los 280 días incluyen las aproximadamente 2 semanas antes de la ovulación/concepción real, por lo que el bebé tiene realmente ~38 semanas de desarrollo." },
                { q: "¿Qué hacer si no recuerdo la fecha exacta de mi última menstruación?", a: "Si no recuerdas la fecha exacta, puedes estimar basándote en el mes aproximado. Tu médico realizará un ultrasonido para medir el bebé y establecer una fecha más precisa. La longitud cráneo-caudal (CRL) medida en el primer trimestre es el indicador más confiable de la edad gestacional." },
              ].map((item) => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Más herramientas de salud</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Cuida tu bienestar durante y después del embarazo.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/calculadora-imc", label: "Calculadora de IMC", desc: "Controla tu peso durante el embarazo" },
                { href: "/agua-diaria-ideal", label: "Agua diaria ideal", desc: "Hidratación correcta en el embarazo" },
                { href: "/gasto-calorico-diario", label: "Gasto calórico diario", desc: "Necesidades nutricionales ajustadas" },
                { href: "/calculadora-macronutrientes", label: "Calculadora de macros", desc: "Nutrición adecuada para tu objetivo" },
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
