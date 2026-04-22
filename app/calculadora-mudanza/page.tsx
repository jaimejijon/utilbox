"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4856A", light: "#E8A88E", bg: "#3D2218", tint: "#1C1210", border: "rgba(212,133,106,0.25)" };

function fmtMXN(n: number) { return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };
function focusStyle(el: HTMLInputElement) { el.style.borderColor = NICHO.color; el.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }
function blurStyle(el: HTMLInputElement) { el.style.borderColor = "#1E2030"; el.style.boxShadow = "none"; }

const CHECKLIST = [
  "Notificar al arrendador con el tiempo acordado",
  "Contratar servicio de mudanza (obtener 3 cotizaciones)",
  "Reunir cajas y materiales de embalaje",
  "Etiquetar cajas por habitación y contenido",
  "Desconectar y limpiar electrodomésticos",
  "Hacer inventario fotográfico de artículos de valor",
  "Notificar cambio de domicilio (banco, trabajo, gobierno)",
  "Contratar seguros de mudanza para artículos valiosos",
  "Preparar kit de esenciales para el primer día",
  "Limpiar la vivienda antigua antes de entregar",
  "Revisar la vivienda nueva antes de recibir",
  "Conectar servicios: agua, luz, internet, gas",
];

const CONSEJOS = [
  "Muévete en días de semana — es hasta un 30% más barato que fin de semana.",
  "Desactiva el refrigerador 24h antes y descongelalo completamente.",
  "Embala tus propias cajas para ahorrar en embalaje profesional.",
  "Vende o dona lo que no uses antes de mudarte — pagas por volumen.",
  "Reserva el camión con 2–4 semanas de anticipación para mejores precios.",
];

export default function CalculadoraMudanza() {
  const [tipoMudanza, setTipoMudanza] = useState("Local");
  const [distancia, setDistancia] = useState("20");
  const [tamanioHogar, setTamanioHogar] = useState("2 dormitorios");
  const [servicios, setServicios] = useState<Record<string, boolean>>({});
  const [escaleras, setEscaleras] = useState("No");

  const [resultado, setResultado] = useState<{
    costoFlete: number;
    costoServicios: number;
    total: number;
    minimo: number;
    maximo: number;
  } | null>(null);

  const toggleServicio = (key: string) => {
    setServicios(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calcular = useCallback(() => {
    const dist = parseFloat(distancia) || 0;

    // Base rates by home size (MXN)
    const baseRates: Record<string, number> = {
      "Estudio": 2000,
      "1 dormitorio": 3500,
      "2 dormitorios": 5500,
      "3+ dormitorios": 9000,
    };

    let costoFlete = baseRates[tamanioHogar] ?? 5500;

    // Distance multiplier
    if (tipoMudanza === "Local") {
      costoFlete += dist * 15;
    } else if (tipoMudanza === "Nacional") {
      costoFlete += dist * 8;
      costoFlete = Math.max(costoFlete, 12000);
    } else {
      costoFlete += dist * 25;
      costoFlete = Math.max(costoFlete, 50000);
    }

    // Escaleras surcharge
    if (escaleras === "Sí") costoFlete *= 1.15;

    // Extra services
    const serviciosCostos: Record<string, number> = {
      "Empaque profesional": tamanioHogar === "Estudio" ? 2000 : tamanioHogar === "1 dormitorio" ? 3000 : tamanioHogar === "2 dormitorios" ? 4500 : 7000,
      "Desmontaje y montaje de muebles": 1500,
      "Seguro de mudanza": costoFlete * 0.05,
      "Almacenamiento temporal": 2500,
    };

    let costoServicios = 0;
    for (const [svc, checked] of Object.entries(servicios)) {
      if (checked && serviciosCostos[svc]) costoServicios += serviciosCostos[svc];
    }

    const total = costoFlete + costoServicios;
    const minimo = total * 0.75;
    const maximo = total * 1.25;

    setResultado({ costoFlete, costoServicios, total, minimo, maximo });
  }, [tipoMudanza, distancia, tamanioHogar, servicios, escaleras]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/hogar" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Hogar</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Calculadora de mudanza</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Mudanza</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Calculadora de mudanza
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Estima el costo total de tu mudanza según distancia, volumen de pertenencias y servicios adicionales.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tipo de mudanza</label>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {["Local", "Nacional", "Internacional"].map(t => (
                      <button key={t} onClick={() => setTipoMudanza(t)}
                        style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: tipoMudanza === t ? NICHO.color : "#0F1117", color: tipoMudanza === t ? "#fff" : "#EEEEEE" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Distancia aproximada (km)</label>
                  <input type="number" min="0" step="1" value={distancia} onChange={e => setDistancia(e.target.value)}
                    className={inputClass} style={{ ...inputStyle, outline: "none" }}
                    onFocus={e => focusStyle(e.currentTarget)} onBlur={e => blurStyle(e.currentTarget)} />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tamaño del hogar</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {["Estudio", "1 dormitorio", "2 dormitorios", "3+ dormitorios"].map(t => (
                      <button key={t} onClick={() => setTamanioHogar(t)}
                        style={{ padding: "6px 12px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: tamanioHogar === t ? NICHO.color : "#0F1117", color: tamanioHogar === t ? "#fff" : "#EEEEEE" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "8px" }}>Servicios adicionales</p>
                  <div className="space-y-2">
                    {["Empaque profesional", "Desmontaje y montaje de muebles", "Seguro de mudanza", "Almacenamiento temporal"].map(svc => (
                      <label key={svc} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input type="checkbox" checked={!!servicios[svc]} onChange={() => toggleServicio(svc)}
                          style={{ accentColor: NICHO.color, width: "14px", height: "14px" }} />
                        <span style={{ fontSize: "12px", color: "#FFFFFF" }}>{svc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>¿Hay escaleras o acceso difícil?</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {["Sí", "No"].map(opt => (
                      <button key={opt} onClick={() => setEscaleras(opt)}
                        style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, background: escaleras === opt ? NICHO.color : "#0F1117", color: escaleras === opt ? "#fff" : "#EEEEEE" }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular mudanza
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Total estimado</p>
                  <p style={{ fontSize: "44px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    ${fmtMXN(resultado.total)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "6px" }}>
                    Rango: ${fmtMXN(resultado.minimo)} – ${fmtMXN(resultado.maximo)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-4" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>Costo del flete</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.light }}>${fmtMXN(resultado.costoFlete)}</p>
                  </div>
                  <div className="rounded-[10px] p-4" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>Servicios adicionales</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.light }}>${fmtMXN(resultado.costoServicios)}</p>
                  </div>
                </div>

                {/* Checklist */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Checklist de mudanza</p>
                  <div className="space-y-1">
                    {CHECKLIST.map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "4px 0" }}>
                        <span style={{ color: NICHO.color, fontSize: "12px", flexShrink: 0, marginTop: "1px" }}>☐</span>
                        <span style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.5" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consejos */}
                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Consejos para reducir el costo</p>
                  <div className="space-y-2">
                    {CONSEJOS.map(tip => (
                      <p key={tip} style={{ fontSize: "11px", color: "#EEEEEE", lineHeight: "1.55" }}>
                        💡 {tip}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>🚚</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Configura tu mudanza y presiona Calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Cómo planificar una mudanza sin sorpresas
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El costo de una mudanza depende principalmente del volumen de pertenencias (determinado por el tamaño del hogar) y la distancia. Los servicios adicionales como empaque profesional pueden duplicar el costo base, pero también reducen el riesgo de daños y el estrés del proceso.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Siempre solicita al menos tres cotizaciones escritas. El precio más bajo no siempre es el mejor: verifica que el servicio incluya seguro de responsabilidad y que la empresa esté registrada formalmente.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Cómo se cobra una mudanza local?", a: "Las mudanzas locales generalmente se cobran por hora (número de trabajadores × horas) más el costo del camión. Algunas empresas tienen tarifa mínima de 3–4 horas. El precio puede variar según el día (fin de semana es más caro) y si hay escaleras o acceso difícil." },
                { q: "¿Qué cubre el seguro de mudanza?", a: "El seguro básico cubre daños accidentales durante el transporte. La cobertura estándar del transportista puede ser muy baja (a veces solo el valor declarado de cada artículo por peso). Para artículos valiosos, considera comprar cobertura total o asegurarlos por separado." },
                { q: "¿Es mejor hacer la mudanza solo o contratar servicio?", a: "Para mudanzas de estudio o con pocas pertenencias y buena disponibilidad de amigos con auto, la mudanza propia puede ahorrar dinero. Para mudanzas más grandes, los riesgos de daños a muebles, lesiones personales y el tiempo perdido generalmente justifican contratar profesionales." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Tu nueva vivienda, planificada desde el inicio.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/simulador-hipoteca", label: "Simulador de hipoteca", desc: "Calcula tu cuota mensual" },
                { href: "/alquiler-vs-compra", label: "Alquiler vs Compra", desc: "¿Qué conviene más a largo plazo?" },
                { href: "/calculadora-pintura", label: "Calculadora de pintura", desc: "Cuánta pintura necesitas" },
                { href: "/consumo-electrico", label: "Consumo eléctrico", desc: "Cuánto gastarás en electricidad" },
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
