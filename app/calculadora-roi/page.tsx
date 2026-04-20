"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CalculadoraROI() {
  const [modo, setModo] = useState<"simple" | "detallado">("simple");

  // Modo simple
  const [inversion, setInversion] = useState("10000");
  const [ganancia, setGanancia] = useState("15000");

  // Modo detallado
  const [ingresos, setIngresos] = useState("25000");
  const [costos, setCostos] = useState("10000");
  const [meses, setMeses] = useState("12");

  const [resultado, setResultado] = useState<{
    roi: number;
    gananciaNet: number;
    roiAnual: number | null;
    mesesRecuperacion: number | null;
  } | null>(null);

  const calcular = useCallback(() => {
    let costoInicial: number;
    let retorno: number;
    let duracionMeses: number | null = null;

    if (modo === "simple") {
      costoInicial = parseFloat(inversion) || 0;
      retorno = parseFloat(ganancia) || 0;
    } else {
      costoInicial = parseFloat(costos) || 0;
      retorno = parseFloat(ingresos) || 0;
      duracionMeses = parseInt(meses) || 12;
    }

    if (costoInicial <= 0) return;

    const gananciaNet = retorno - costoInicial;
    const roi = (gananciaNet / costoInicial) * 100;
    const roiAnual = duracionMeses ? (roi / duracionMeses) * 12 : null;
    const mesesRecuperacion = gananciaNet > 0 && duracionMeses
      ? (costoInicial / (gananciaNet / duracionMeses))
      : null;

    setResultado({ roi, gananciaNet, roiAnual, mesesRecuperacion });
  }, [modo, inversion, ganancia, ingresos, costos, meses]);

  const getRoiColor = (roi: number) => {
    if (roi > 50) return "text-green-600";
    if (roi > 10) return "text-accent-dark";
    if (roi > 0) return "text-yellow-600";
    return "text-red-500";
  };

  const getRoiBg = (roi: number) => {
    if (roi > 50) return "bg-green-50 border-green-200";
    if (roi > 10) return "bg-sky-50 border-sky-200";
    if (roi > 0) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getRoiLabel = (roi: number) => {
    if (roi > 100) return "Excelente retorno";
    if (roi > 50) return "Muy buen retorno";
    if (roi > 20) return "Buen retorno";
    if (roi > 0) return "Retorno positivo";
    if (roi === 0) return "Punto de equilibrio";
    return "Pérdida neta";
  };

  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <nav className="text-sm text-slate-400 mb-6">
          <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">Calculadora de ROI</span>
        </nav>

        <h1 className="text-3xl font-bold text-navy mb-2">
          Calculadora de ROI
        </h1>
        <p className="text-slate-500 mb-8">
          Calcula el retorno sobre la inversión (ROI) de cualquier proyecto, negocio o campaña.
        </p>

        {/* Mode selector */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setModo("simple"); setResultado(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              modo === "simple"
                ? "bg-navy text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:border-accent"
            }`}
          >
            Cálculo simple
          </button>
          <button
            onClick={() => { setModo("detallado"); setResultado(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              modo === "detallado"
                ? "bg-navy text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:border-accent"
            }`}
          >
            Con período de tiempo
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          {modo === "simple" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Inversión inicial ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inversion}
                  onChange={(e) => setInversion(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Valor final / Retorno total ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={ganancia}
                  onChange={(e) => setGanancia(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Ingresos / Retorno ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={ingresos}
                  onChange={(e) => setIngresos(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Costo / Inversión total ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={costos}
                  onChange={(e) => setCostos(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">
                  Duración (meses)
                </label>
                <input
                  type="number"
                  min="1"
                  value={meses}
                  onChange={(e) => setMeses(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          )}
          <button
            onClick={calcular}
            className="mt-5 w-full bg-accent text-navy font-semibold py-3 rounded-lg hover:bg-accent-dark hover:text-white transition-colors"
          >
            Calcular ROI
          </button>
        </div>

        {resultado && (
          <div className="space-y-5">
            {/* Main ROI card */}
            <div className={`rounded-xl p-6 border text-center ${getRoiBg(resultado.roi)}`}>
              <p className="text-sm font-medium text-slate-600 mb-1">{getRoiLabel(resultado.roi)}</p>
              <p className={`text-5xl font-bold mb-1 ${getRoiColor(resultado.roi)}`}>
                {resultado.roi >= 0 ? "+" : ""}{fmt(resultado.roi)}%
              </p>
              <p className="text-sm text-slate-500">ROI total</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <p className="text-sm text-slate-500 mb-1">Ganancia neta</p>
                <p className={`text-2xl font-bold ${resultado.gananciaNet >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {resultado.gananciaNet >= 0 ? "+" : ""}${fmt(resultado.gananciaNet)}
                </p>
              </div>
              {resultado.roiAnual !== null && (
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                  <p className="text-sm text-slate-500 mb-1">ROI anualizado</p>
                  <p className={`text-2xl font-bold ${getRoiColor(resultado.roiAnual)}`}>
                    {resultado.roiAnual >= 0 ? "+" : ""}{fmt(resultado.roiAnual)}%
                  </p>
                </div>
              )}
              {resultado.mesesRecuperacion !== null && resultado.gananciaNet > 0 && (
                <div className={`bg-white border border-slate-200 rounded-xl p-5 text-center ${resultado.roiAnual === null ? "sm:col-span-2" : ""}`}>
                  <p className="text-sm text-slate-500 mb-1">Período de recuperación</p>
                  <p className="text-2xl font-bold text-navy">
                    {resultado.mesesRecuperacion.toFixed(1)} meses
                  </p>
                </div>
              )}
            </div>

            {/* Visual gauge */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm font-medium text-navy mb-3">Indicador de rentabilidad</p>
              <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                    resultado.roi >= 0 ? "bg-gradient-to-r from-accent to-green-500" : "bg-red-400"
                  }`}
                  style={{
                    width: `${Math.min(Math.abs(resultado.roi), 200) / 2}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%+</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Un ROI del 10–15% anual se considera bueno en inversiones diversificadas.
              </p>
            </div>
          </div>
        )}
        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div className="border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Qué es el ROI y para qué sirve
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              El ROI (Return on Investment, o Retorno sobre la Inversión) es una de las métricas financieras más utilizadas en el mundo de los negocios. Mide la eficiencia de una inversión expresando la ganancia neta como porcentaje del costo inicial. Un ROI positivo significa que ganaste más de lo que invertiste; uno negativo, que tuviste pérdidas.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              La fórmula es sencilla: <strong className="text-navy">ROI = (Ganancia neta / Costo de inversión) × 100</strong>. Lo que hace poderosa a esta métrica es su universalidad: puedes aplicarla a una campaña de publicidad digital, a la compra de una máquina para tu negocio, a un curso de capacitación, o a cualquier otra inversión donde puedas medir el retorno.
            </p>
            <p className="text-slate-600 leading-relaxed">
              El modo detallado de esta calculadora además calcula el <strong className="text-navy">ROI anualizado</strong>, que te permite comparar inversiones de distinta duración en igualdad de condiciones, y el <strong className="text-navy">período de recuperación</strong>, que indica en cuántos meses recuperarás lo invertido.
            </p>
          </div>

          {/* Practical example */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-navy mb-3">Ejemplo práctico: evaluar una campaña de marketing</h3>
            <p className="text-slate-600 leading-relaxed mb-3">
              Una tienda en línea invierte <strong className="text-navy">$8,000 USD</strong> en publicidad en redes sociales durante <strong className="text-navy">6 meses</strong> y genera ventas atribuibles de <strong className="text-navy">$26,000 USD</strong>:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-center">
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Ganancia neta</p>
                <p className="font-bold text-green-600">+$18,000</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">ROI total</p>
                <p className="font-bold text-accent">+225%</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">ROI anualizado</p>
                <p className="font-bold text-navy">+450%</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Recuperación</p>
                <p className="font-bold text-navy">2.7 meses</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Un ROI de 225% significa que por cada dólar invertido, se generaron $2.25 de ganancia neta además de recuperar la inversión inicial.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-xl font-bold text-navy mb-4">Preguntas frecuentes</h3>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">¿Cuál es un ROI "bueno"?</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Depende completamente del contexto. En campañas de marketing digital, un ROI de 3:1 (es decir, 200%) es considerado un buen resultado. En inversiones financieras diversificadas como fondos indexados, un 10–15% anual es muy sólido. Para negocios físicos, un ROI de 25–50% anual puede ser excelente. Lo más importante es compararlo con el costo de oportunidad: ¿qué más podrías haber hecho con ese dinero?
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">¿El ROI considera el factor tiempo?</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  El ROI básico no considera el tiempo: un 100% de ROI en 1 mes es muy diferente a un 100% de ROI en 10 años. Por eso es importante usar el ROI anualizado cuando comparas inversiones de distinta duración. Esta calculadora lo calcula automáticamente en el modo "Con período de tiempo": divide el ROI total entre los meses de duración y lo multiplica por 12 para expresarlo en base anual.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">¿Qué limitaciones tiene el ROI como métrica?</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  El ROI es una métrica poderosa pero incompleta. No considera el riesgo asociado a la inversión, la liquidez (qué tan fácil es recuperar el dinero si lo necesitas), ni factores cualitativos como el impacto en la reputación de marca o el aprendizaje organizacional. Para decisiones financieras complejas, conviene complementarlo con otras métricas como el VPN (Valor Presente Neto), la TIR (Tasa Interna de Retorno) y un análisis de riesgos.
                </p>
              </div>
            </div>
          </div>

          {/* CTA to other tools */}
          <div className="bg-navy rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-1">Explora otras herramientas financieras</h3>
            <p className="text-slate-400 text-sm mb-5">Todo lo que necesitas para tomar mejores decisiones con tu dinero.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/calculadora-interes-compuesto", label: "Interés compuesto", desc: "Proyecta el crecimiento de tus ahorros" },
                { href: "/simulador-prestamo", label: "Simulador de préstamo", desc: "Calcula tu cuota y tabla de amortización" },
                { href: "/convertidor-monedas", label: "Convertidor de monedas", desc: "20 monedas latinoamericanas y mundiales" },
                { href: "/calculadora-jubilacion", label: "Calculadora de jubilación", desc: "¿Cuánto necesitas para retirarte?" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3 transition-colors group"
                >
                  <p className="font-medium text-white group-hover:text-accent transition-colors text-sm">{tool.label}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{tool.desc}</p>
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
