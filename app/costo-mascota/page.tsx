"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4856A", light: "#E8A88E", bg: "#3D2218", tint: "#1C1210", border: "rgba(212,133,106,0.25)" };

function fmtMXN(n: number) { return n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }

const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

// Monthly cost data in MXN
const BASE_COSTS: Record<string, Record<string, { alim: number; vet: number; acc: number; higiene: number; vidaUtil: number; setup: number; adquisicion: number }>> = {
  "Perro": {
    "Pequeño": { alim: 600, vet: 500, acc: 150, higiene: 400, vidaUtil: 14, setup: 3000, adquisicion: 3000 },
    "Mediano": { alim: 900, vet: 600, acc: 200, higiene: 500, vidaUtil: 12, setup: 3500, adquisicion: 5000 },
    "Grande": { alim: 1500, vet: 700, acc: 250, higiene: 600, vidaUtil: 10, setup: 4000, adquisicion: 8000 },
  },
  "Gato": {
    "Pequeño": { alim: 500, vet: 400, acc: 100, higiene: 200, vidaUtil: 15, setup: 2500, adquisicion: 2000 },
    "Mediano": { alim: 600, vet: 450, acc: 120, higiene: 250, vidaUtil: 15, setup: 2800, adquisicion: 3000 },
    "Grande": { alim: 700, vet: 500, acc: 150, higiene: 300, vidaUtil: 15, setup: 3000, adquisicion: 4000 },
  },
  "Ave": {
    "N/A": { alim: 200, vet: 150, acc: 50, higiene: 100, vidaUtil: 10, setup: 1500, adquisicion: 500 },
  },
  "Roedor": {
    "N/A": { alim: 150, vet: 100, acc: 50, higiene: 100, vidaUtil: 3, setup: 800, adquisicion: 300 },
  },
  "Pez": {
    "N/A": { alim: 100, vet: 50, acc: 30, higiene: 50, vidaUtil: 5, setup: 2000, adquisicion: 200 },
  },
  "Reptil": {
    "N/A": { alim: 300, vet: 200, acc: 100, higiene: 150, vidaUtil: 15, setup: 3000, adquisicion: 1500 },
  },
};

export default function CostoMascota() {
  const [tipo, setTipo] = useState("Perro");
  const [tamanio, setTamanio] = useState("Mediano");
  const [yaTiene, setYaTiene] = useState("No");
  const [paseador, setPaseador] = useState("No");
  const [guarderia, setGuarderia] = useState("Nunca");
  const [alimentPremium, setAlimentPremium] = useState("No");

  const [resultado, setResultado] = useState<{
    costoInicial: number;
    alimentacion: number;
    veterinario: number;
    accesorios: number;
    servicios: number;
    higiene: number;
    totalMensual: number;
    totalAnual: number;
    total10: number;
    totalVida: number;
    vidaUtil: number;
  } | null>(null);

  const tieneTamanio = tipo === "Perro" || tipo === "Gato";
  const tamanioKey = tieneTamanio ? tamanio : "N/A";

  const calcular = useCallback(() => {
    const costsForTipo = BASE_COSTS[tipo]?.[tamanioKey];
    if (!costsForTipo) return;

    const multAlim = alimentPremium === "Sí" ? 1.6 : 1;
    const alimentacion = costsForTipo.alim * multAlim;
    const veterinario = costsForTipo.vet;
    const accesorios = costsForTipo.acc;
    const higiene = costsForTipo.higiene;

    let servicios = 0;
    if (tipo === "Perro") {
      if (paseador === "Sí") servicios += 1200;
      if (guarderia === "A veces") servicios += 400;
      else if (guarderia === "Frecuente") servicios += 1000;
    }

    const totalMensual = alimentacion + veterinario + accesorios + servicios + higiene;
    const totalAnual = totalMensual * 12;
    const total10 = totalAnual * 10;

    const costoInicial = (yaTiene === "No" ? costsForTipo.adquisicion : 0) + costsForTipo.setup;
    const totalVida = costoInicial + totalAnual * costsForTipo.vidaUtil;

    setResultado({ costoInicial, alimentacion, veterinario, accesorios, servicios, higiene, totalMensual, totalAnual, total10, totalVida, vidaUtil: costsForTipo.vidaUtil });
  }, [tipo, tamanioKey, yaTiene, paseador, guarderia, alimentPremium]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/hogar" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-white transition-colors">Hogar</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Costo real de tener una mascota</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Financiero</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Costo real de tener una mascota
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula el costo mensual y anual de tener una mascota según el tipo, tamaño y tus hábitos de cuidado.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tipo de mascota</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {Object.keys(BASE_COSTS).map(t => (
                      <button key={t} onClick={() => { setTipo(t); if (t !== "Perro" && t !== "Gato") { setPaseador("No"); setGuarderia("Nunca"); } }}
                        style={{ padding: "6px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, background: tipo === t ? NICHO.color : "#0F1117", color: tipo === t ? "#fff" : "#EEEEEE" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {tieneTamanio && (
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Tamaño</label>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {["Pequeño", "Mediano", "Grande"].map(t => (
                        <button key={t} onClick={() => setTamanio(t)}
                          style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, background: tamanio === t ? NICHO.color : "#0F1117", color: tamanio === t ? "#fff" : "#EEEEEE" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>¿Ya tienes la mascota?</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {["Sí", "No"].map(opt => (
                      <button key={opt} onClick={() => setYaTiene(opt)}
                        style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, background: yaTiene === opt ? NICHO.color : "#0F1117", color: yaTiene === opt ? "#fff" : "#EEEEEE" }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>¿Alimentación premium?</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {["Sí", "No"].map(opt => (
                      <button key={opt} onClick={() => setAlimentPremium(opt)}
                        style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, background: alimentPremium === opt ? NICHO.color : "#0F1117", color: alimentPremium === opt ? "#fff" : "#EEEEEE" }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {tipo === "Perro" && (
                  <>
                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>¿Contratas paseador?</label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {["Sí", "No"].map(opt => (
                          <button key={opt} onClick={() => setPaseador(opt)}
                            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, background: paseador === opt ? NICHO.color : "#0F1117", color: paseador === opt ? "#fff" : "#EEEEEE" }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>¿Guardería / hotel?</label>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {["Nunca", "A veces", "Frecuente"].map(opt => (
                          <button key={opt} onClick={() => setGuarderia(opt)}
                            style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: guarderia === opt ? NICHO.color : "#0F1117", color: guarderia === opt ? "#fff" : "#EEEEEE" }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button onClick={calcular} className="w-full mt-5 rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#fff", border: "none", cursor: "pointer" }}>
                Calcular costos
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-[10px] p-6 text-center"
                  style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}` }}>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginBottom: "6px" }}>Costo mensual total</p>
                  <p style={{ fontSize: "44px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>
                    ${fmtMXN(resultado.totalMensual)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#EEEEEE", marginTop: "4px" }}>
                    ${fmtMXN(resultado.totalAnual)} al año
                  </p>
                </div>

                <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", marginBottom: "10px" }}>Desglose mensual</p>
                  {[
                    { label: "Alimentación", value: resultado.alimentacion },
                    { label: "Veterinario (promedio)", value: resultado.veterinario },
                    { label: "Accesorios y juguetes", value: resultado.accesorios },
                    ...(resultado.servicios > 0 ? [{ label: "Paseador / guardería", value: resultado.servicios }] : []),
                    { label: "Higiene y grooming", value: resultado.higiene },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #1E2030" }}>
                      <span style={{ fontSize: "12px", color: "#EEEEEE" }}>{item.label}</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: NICHO.light }}>${fmtMXN(item.value)}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] p-4" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>Costo inicial</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.light }}>${fmtMXN(resultado.costoInicial)}</p>
                  </div>
                  <div className="rounded-[10px] p-4" style={{ background: "#141520", border: "0.5px solid #1E2030" }}>
                    <p style={{ fontSize: "10px", color: "#EEEEEE", marginBottom: "4px" }}>En 10 años</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: NICHO.color }}>${fmtMXN(resultado.total10)}</p>
                  </div>
                </div>

                <div className="rounded-[10px] p-5 text-center" style={{ background: "#141520", border: `1px solid ${NICHO.color}40` }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Costo total en vida útil (~{resultado.vidaUtil} años)</p>
                  <p style={{ fontSize: "28px", fontWeight: 600, color: NICHO.color }}>${fmtMXN(resultado.totalVida)}</p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>🐾</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Configura tu mascota y presiona Calcular costos</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              El costo real de una mascota va más allá de la comida
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Muchas personas subestiman el costo de tener una mascota porque solo consideran la comida. Los gastos veterinarios, incluyendo vacunas anuales, desparasitación, consultas de rutina y emergencias imprevistas, representan entre el 30% y el 40% del costo total.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Los costos de un perro grande pueden ser hasta 3 veces mayores que los de un perro pequeño: come más, necesita vacunas de mayor dosis, su grooming es más costoso y los servicios de guardería cobran más por su tamaño.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "14px" }}>Preguntas frecuentes</h3>
            <div className="space-y-3">
              {[
                { q: "¿Conviene el seguro médico para mascotas?", a: "Depende del tipo de mascota y tu tolerancia al riesgo. Los seguros para mascotas en Latinoamérica están creciendo pero siguen siendo limitados. Para perros de razas propensas a enfermedades genéticas o de alto costo, puede ser una buena inversión. Para mascotas pequeñas y sanas, el ahorro propio puede ser más eficiente." },
                { q: "¿Cuál es la mascota más económica?", a: "Los roedores (hámsters, conejos enanos) tienen el costo mensual más bajo. Los peces también son económicos si ya tienes el acuario. Los gatos son generalmente más económicos que los perros porque no necesitan paseador ni entrenamiento formal." },
                { q: "¿Cómo reducir los costos veterinarios?", a: "Mantén las vacunas y desparasitaciones al día (previene enfermedades costosas). Usa clínicas veterinarias universitarias o de bajo costo para consultas de rutina. Consulta el costo de cirugías en múltiples clínicas antes de proceder. Nunca postpongas problemas menores que pueden volverse emergencias costosas." },
              ].map(item => (
                <div key={item.q} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>{item.q}</p>
                  <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: NICHO.tint, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>Otras herramientas financieras de hogar</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Planifica mejor tus finanzas del hogar.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/fondo-emergencia-hogar", label: "Fondo de emergencia", desc: "Cuánto ahorrar para imprevistos" },
                { href: "/simulador-hipoteca", label: "Simulador de hipoteca", desc: "Calcula tu cuota mensual" },
                { href: "/alquiler-vs-compra", label: "Alquiler vs Compra", desc: "¿Qué conviene más a largo plazo?" },
                { href: "/calculadora-mudanza", label: "Calculadora de mudanza", desc: "Costo de tu próxima mudanza" },
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
