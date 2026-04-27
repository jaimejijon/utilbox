"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const NICHO = { color: "#D4B85A", light: "#E2CC7D", bg: "#332B0F", tint: "#181408", border: "rgba(212,184,90,0.25)" };
const inputClass = "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { background: "#0F1117", border: "0.5px solid #1E2030", color: "#FFFFFF" };

type Actividad = "sedentario" | "ligero" | "moderado" | "activo" | "muy_activo";
type Objetivo = "perder" | "mantener" | "ganar";

const ACT_MULT: Record<Actividad, number> = {
  sedentario: 1.2, ligero: 1.375, moderado: 1.55, activo: 1.725, muy_activo: 1.9,
};
const OBJ_MULT: Record<Objetivo, number> = { perder: 0.85, mantener: 1.0, ganar: 1.15 };

type GrupoAlim = {
  nombre: string; porciones: number; icono: string;
  equivalencia: string; color: string;
};

function calcularPorciones(kcal: number): GrupoAlim[] {
  let granos: number, frutas: number, verduras: number, proteinas: number, lacteos: number, grasas: number;

  if (kcal < 1600) {
    granos = 5; frutas = 1.5; verduras = 2; proteinas = 5; lacteos = 3; grasas = 4;
  } else if (kcal < 2000) {
    granos = 6; frutas = 2; verduras = 2.5; proteinas = 5.5; lacteos = 3; grasas = 5;
  } else if (kcal < 2400) {
    granos = 7; frutas = 2; verduras = 3; proteinas = 6; lacteos = 3; grasas = 6;
  } else if (kcal < 2800) {
    granos = 8; frutas = 2.5; verduras = 3.5; proteinas = 6.5; lacteos = 3; grasas = 7;
  } else {
    granos = 10; frutas = 2.5; verduras = 4; proteinas = 7; lacteos = 3; grasas = 8;
  }

  return [
    { nombre: "Cereales y granos", porciones: granos, icono: "🌾", equivalencia: "1 porción = 1 taza de arroz cocido, 1 tortilla mediana, 2 rebanadas de pan", color: "#D4B85A" },
    { nombre: "Frutas", porciones: frutas, icono: "🍎", equivalencia: "1 porción = 1 fruta mediana, ½ taza de fruta picada o 120ml de jugo natural", color: "#E07070" },
    { nombre: "Verduras", porciones: verduras, icono: "🥦", equivalencia: "1 porción = 1 taza de verduras crudas, ½ taza cocida o ½ taza de jugo de verduras", color: "#6EC9A0" },
    { nombre: "Proteínas", porciones: proteinas, icono: "🍗", equivalencia: "1 porción = 30g de carne/pollo/pescado, 1 huevo, ¼ taza de frijoles cocidos, 1 cdta de mantequilla de maní", color: "#74AEDD" },
    { nombre: "Lácteos", porciones: lacteos, icono: "🥛", equivalencia: "1 porción = 240ml de leche, 180ml de yogur, 45g de queso natural", color: "#EEEEEE" },
    { nombre: "Grasas saludables", porciones: grasas, icono: "🥑", equivalencia: "1 porción = 1 cdta de aceite de oliva, ⅓ aguacate mediano, 1 cdta de mayonesa", color: "#D4856A" },
  ];
}

export default function PorcionesAlimenticias() {
  const [peso, setPeso] = useState("70");
  const [altura, setAltura] = useState("165");
  const [edad, setEdad] = useState("30");
  const [sexo, setSexo] = useState("femenino");
  const [actividad, setActividad] = useState<Actividad>("moderado");
  const [objetivo, setObjetivo] = useState<Objetivo>("mantener");

  const [resultado, setResultado] = useState<{ kcal: number; grupos: GrupoAlim[] } | null>(null);

  const calcular = useCallback(() => {
    const p = parseFloat(peso) || 0;
    const h = parseFloat(altura) || 0;
    const a = parseFloat(edad) || 0;
    if (p <= 0 || h <= 0 || a <= 0) return;

    const bmr = sexo === "masculino"
      ? 10 * p + 6.25 * h - 5 * a + 5
      : 10 * p + 6.25 * h - 5 * a - 161;
    const tdee = bmr * ACT_MULT[actividad];
    const kcal = Math.round(tdee * OBJ_MULT[objetivo]);
    const grupos = calcularPorciones(kcal);
    setResultado({ kcal, grupos });
  }, [peso, altura, edad, sexo, actividad, objetivo]);

  return (
    <>
      <Header />
      <main className="flex-1 w-full" style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px 48px" }}>

        <nav style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Inicio</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/nutricion" style={{ color: "#EEEEEE", textDecoration: "none" }} className="hover:!text-[#FFFFFF] transition-colors">Nutrición</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#EEEEEE" }}>Porciones por grupo alimenticio</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "999px", padding: "4px 12px 4px 8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: NICHO.color, display: "block" }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: NICHO.color }}>Macros</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", lineHeight: 1.2, marginBottom: "8px" }}>
              Porciones por grupo alimenticio
            </h1>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "24px" }}>
              Calcula cuántas porciones diarias necesitas de cada grupo de alimentos según tu perfil y objetivo. Incluye equivalencias prácticas.
            </p>

            <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Peso", unit: "kg", val: peso, set: setPeso, min: "30", max: "200", step: "0.5" },
                  { label: "Altura", unit: "cm", val: altura, set: setAltura, min: "100", max: "250", step: "1" },
                  { label: "Edad", unit: "años", val: edad, set: setEdad, min: "10", max: "90", step: "1" },
                ].map((f) => (
                  <div key={f.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE" }}>{f.label}</label>
                      <span style={{ fontSize: "12px", color: NICHO.light, fontWeight: 600 }}>{f.val} {f.unit}</span>
                    </div>
                    <input type="number" min={f.min} max={f.max} step={f.step} value={f.val} onChange={(e) => f.set(e.target.value)}
                      className={inputClass} style={{ ...inputStyle, outline: "none" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = NICHO.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${NICHO.color}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#1E2030"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Sexo</label>
                  <select value={sexo} onChange={(e) => setSexo(e.target.value)}
                    style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Nivel de actividad</label>
                <select value={actividad} onChange={(e) => setActividad(e.target.value as Actividad)}
                  style={{ ...inputStyle, borderRadius: "8px", padding: "10px 12px", width: "100%", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                  <option value="sedentario">Sedentario (sin ejercicio)</option>
                  <option value="ligero">Ligero (1-2 días/sem)</option>
                  <option value="moderado">Moderado (3-4 días/sem)</option>
                  <option value="activo">Activo (5-6 días/sem)</option>
                  <option value="muy_activo">Muy activo (2 veces/día)</option>
                </select>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#EEEEEE", display: "block", marginBottom: "6px" }}>Objetivo</label>
                <div className="grid grid-cols-3 gap-2">
                  {([["perder", "Perder peso"], ["mantener", "Mantener"], ["ganar", "Ganar músculo"]] as [Objetivo, string][]).map(([val, label]) => (
                    <button key={val} onClick={() => setObjetivo(val)}
                      style={{ padding: "8px 4px", borderRadius: "7px", fontSize: "11px", fontWeight: 600, border: "none", cursor: "pointer", background: objetivo === val ? NICHO.color : "#0F1117", color: objetivo === val ? "#0F1117" : "#EEEEEE" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={calcular} className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: NICHO.color, color: "#0F1117", border: "none", cursor: "pointer" }}>
                Calcular porciones
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {resultado ? (
              <div className="flex flex-col gap-3">
                <div style={{ background: NICHO.bg, border: `0.5px solid ${NICHO.border}`, borderRadius: "10px", padding: "14px 18px", textAlign: "center" }}>
                  <p style={{ fontSize: "11px", color: "#EEEEEE", marginBottom: "4px" }}>Calorías diarias estimadas</p>
                  <p style={{ fontSize: "40px", fontWeight: 600, color: NICHO.color, letterSpacing: "-2px", lineHeight: 1 }}>{resultado.kcal.toLocaleString("es-MX")}</p>
                  <p style={{ fontSize: "12px", color: NICHO.light }}>kcal / día</p>
                </div>

                <div className="flex flex-col gap-2">
                  {resultado.grupos.map((g) => (
                    <div key={g.nombre} style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "20px" }}>{g.icono}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>{g.nombre}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontSize: "20px", fontWeight: 600, color: g.color, lineHeight: 1 }}>{g.porciones}</p>
                          <p style={{ fontSize: "10px", color: "#888" }}>porciones</p>
                        </div>
                      </div>
                      <p style={{ fontSize: "11px", color: "#888", lineHeight: "1.5", paddingLeft: "30px" }}>{g.equivalencia}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center justify-center h-64"
                style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px" }}>
                <div className="text-center">
                  <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>◈</div>
                  <p style={{ fontSize: "13px", color: "#EEEEEE" }}>Ingresa tus datos y presiona Calcular porciones</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-8">
          <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.3px", marginBottom: "16px" }}>
              Por qué contar porciones es más práctico que contar calorías
            </h2>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              El sistema de porciones por grupos alimenticios es el método recomendado por la OPS (Organización Panamericana de la Salud) y los ministerios de salud de México, Colombia, Chile y Argentina en sus guías alimentarias nacionales. A diferencia de contar calorías, el sistema de porciones es visual e intuitivo: no necesitas una báscula para estimar tu consumo diario.
            </p>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65" }}>
              Cada grupo alimenticio cumple una función específica: los cereales y granos proveen energía sostenida, las proteínas construyen y reparan tejidos, las frutas y verduras aportan micronutrientes y fibra, los lácteos son fuente de calcio, y las grasas saludables son esenciales para la absorción de vitaminas y la salud hormonal.
            </p>
          </div>

          <div style={{ background: "#141520", border: "0.5px solid #1E2030", borderRadius: "10px", padding: "20px 24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "12px" }}>Ejemplo práctico</h3>
            <p style={{ fontSize: "13px", color: "#EEEEEE", lineHeight: "1.65", marginBottom: "14px" }}>
              Mujer de <strong style={{ color: "#FFFFFF" }}>60 kg, moderadamente activa, objetivo mantener</strong> (≈1,900 kcal/día):
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Cereales/granos", value: "6 porciones", sub: "6 tortillas o 3 tazas arroz" },
                { label: "Proteínas", value: "5.5 porciones", sub: "165g pollo + 1 huevo" },
                { label: "Frutas + verduras", value: "4.5 porciones", sub: "2 frutas + 2.5 verduras" },
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
                { q: "¿Debo comer exactamente las porciones recomendadas todos los días?", a: "Las porciones son una guía de referencia, no una regla estricta. Pueden variar de un día a otro siempre que el promedio semanal sea equilibrado. Lo más importante es la consistencia general: priorizar alimentos naturales, limitar ultraprocesados y mantener una distribución aproximada entre los grupos." },
                { q: "¿Qué pasa con los alimentos mixtos como una sopa o un guiso?", a: "Para preparaciones combinadas, identifica los ingredientes principales y los contabilizas en sus grupos correspondientes. Un arroz con pollo y verduras podría contar como 2 porciones de cereal, 1.5 porciones de proteína y 1 porción de verdura. No necesitas ser exacto, el sistema busca desarrollar intuición, no perfección matemática." },
                { q: "¿Las legumbres cuentan como proteína o como cereal?", a: "Las legumbres (frijoles, lentejas, garbanzos) son únicas porque aportan tanto proteínas como carbohidratos complejos. Se clasifican principalmente en el grupo de proteínas, pero por su contenido de carbohidratos puedes contarlas parcialmente en ambos grupos. Son altamente recomendadas por su aporte de fibra, hierro y zinc, fundamentales en la dieta latinoamericana." },
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
            <p style={{ fontSize: "13px", color: "#EEEEEE", marginBottom: "16px" }}>Complementa tu plan de alimentación.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { href: "/deficit-superavit", label: "Déficit y superávit calórico", desc: "TDEE y calorías objetivo por meta" },
                { href: "/calorias-por-alimento", label: "Calorías por alimento", desc: "Macros de 80 alimentos comunes" },
                { href: "/proteina-diaria", label: "Proteína diaria necesaria", desc: "Gramos de proteína según objetivo" },
                { href: "/indice-glucemico", label: "Índice glucémico", desc: "Impacto de cada alimento en glucosa" },
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
