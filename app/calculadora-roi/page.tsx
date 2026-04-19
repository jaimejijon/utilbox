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
      </main>
      <Footer />
    </>
  );
}
