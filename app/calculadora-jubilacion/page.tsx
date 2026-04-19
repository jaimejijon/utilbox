"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CalculadoraJubilacion() {
  const [edadActual, setEdadActual] = useState("30");
  const [edadJubilacion, setEdadJubilacion] = useState("65");
  const [ahorroActual, setAhorroActual] = useState("20000");
  const [aportacionMensual, setAportacionMensual] = useState("500");
  const [retorno, setRetorno] = useState("7");
  const [inflacion, setInflacion] = useState("3");
  const [gastoMensual, setGastoMensual] = useState("2000");

  const [resultado, setResultado] = useState<{
    fondoNominal: number;
    fondoReal: number;
    anosAcumulacion: number;
    totalAportado: number;
    interesesGanados: number;
    alcanceAnios: number;
    deficit: boolean;
    aportacionNecesaria: number;
  } | null>(null);

  const calcular = useCallback(() => {
    const ea = parseInt(edadActual) || 0;
    const ej = parseInt(edadJubilacion) || 0;
    const P = parseFloat(ahorroActual) || 0;
    const pmt = parseFloat(aportacionMensual) || 0;
    const r = (parseFloat(retorno) || 0) / 100 / 12;
    const inf = (parseFloat(inflacion) || 0) / 100;
    const gasto = parseFloat(gastoMensual) || 0;

    if (ej <= ea) return;

    const n = (ej - ea) * 12;

    // Fondo nominal al jubilarse
    let fondoNominal: number;
    if (r === 0) {
      fondoNominal = P + pmt * n;
    } else {
      fondoNominal = P * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r);
    }

    // Valor real (ajustado por inflación)
    const fondoReal = fondoNominal / Math.pow(1 + inf, ej - ea);

    const totalAportado = P + pmt * n;
    const interesesGanados = fondoNominal - totalAportado;

    // Cuántos años alcanza el fondo para cubrir el gasto mensual
    // Asumimos retiro del 4% anual (regla del 4%)
    const retiroMensual = gasto;
    const rRetiro = r; // misma tasa durante retiro
    let alcanceAnios = 0;
    if (retiroMensual > 0) {
      if (rRetiro === 0) {
        alcanceAnios = fondoNominal / (retiroMensual * 12);
      } else {
        // n = -ln(1 - (P*r/PMT)) / ln(1+r)
        const ratio = (fondoNominal * rRetiro) / retiroMensual;
        if (ratio >= 1) {
          alcanceAnios = Infinity;
        } else {
          alcanceAnios = -Math.log(1 - ratio) / Math.log(1 + rRetiro) / 12;
        }
      }
    }

    // Aportación mensual necesaria para cubrir 25 años de retiro
    const aniosRetiro = 25;
    const mesesRetiro = aniosRetiro * 12;
    let aportacionNecesaria = 0;
    const fondoNecesario =
      rRetiro === 0
        ? gasto * mesesRetiro
        : (gasto * (1 - Math.pow(1 + rRetiro, -mesesRetiro))) / rRetiro;

    if (r === 0) {
      aportacionNecesaria = (fondoNecesario - P) / n;
    } else {
      const factor = (Math.pow(1 + r, n) - 1) / r;
      aportacionNecesaria = (fondoNecesario - P * Math.pow(1 + r, n)) / factor;
    }

    setResultado({
      fondoNominal,
      fondoReal,
      anosAcumulacion: ej - ea,
      totalAportado,
      interesesGanados,
      alcanceAnios: Math.min(alcanceAnios, 999),
      deficit: alcanceAnios < 20,
      aportacionNecesaria: Math.max(0, aportacionNecesaria),
    });
  }, [edadActual, edadJubilacion, ahorroActual, aportacionMensual, retorno, inflacion, gastoMensual]);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <nav className="text-sm text-slate-400 mb-6">
          <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">Calculadora de jubilación</span>
        </nav>

        <h1 className="text-3xl font-bold text-navy mb-2">
          Calculadora de jubilación
        </h1>
        <p className="text-slate-500 mb-8">
          Proyecta tu fondo de retiro y descubre si tu plan de ahorro actual será suficiente.
        </p>

        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Edad actual</label>
              <input
                type="number"
                min="18"
                max="80"
                value={edadActual}
                onChange={(e) => setEdadActual(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Edad de jubilación</label>
              <input
                type="number"
                min="40"
                max="90"
                value={edadJubilacion}
                onChange={(e) => setEdadJubilacion(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Ahorros actuales ($)</label>
              <input
                type="number"
                min="0"
                value={ahorroActual}
                onChange={(e) => setAhorroActual(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Aportación mensual ($)</label>
              <input
                type="number"
                min="0"
                value={aportacionMensual}
                onChange={(e) => setAportacionMensual(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Retorno anual esperado (%)</label>
              <input
                type="number"
                min="0"
                max="30"
                step="0.5"
                value={retorno}
                onChange={(e) => setRetorno(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Inflación anual (%)</label>
              <input
                type="number"
                min="0"
                max="50"
                step="0.5"
                value={inflacion}
                onChange={(e) => setInflacion(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-navy mb-1.5">
                Gasto mensual deseado en retiro ($)
              </label>
              <input
                type="number"
                min="0"
                value={gastoMensual}
                onChange={(e) => setGastoMensual(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={calcular}
            className="mt-5 w-full bg-accent text-navy font-semibold py-3 rounded-lg hover:bg-accent-dark hover:text-white transition-colors"
          >
            Calcular
          </button>
        </div>

        {resultado && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-navy text-white rounded-xl p-5 text-center">
                <p className="text-sm text-slate-300 mb-1">Fondo al jubilarte (nominal)</p>
                <p className="text-2xl font-bold text-accent">${fmt(resultado.fondoNominal)}</p>
                <p className="text-xs text-slate-400 mt-1">en {resultado.anosAcumulacion} años</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <p className="text-sm text-slate-500 mb-1">Poder adquisitivo actual</p>
                <p className="text-2xl font-bold text-navy">${fmt(resultado.fondoReal)}</p>
                <p className="text-xs text-slate-400 mt-1">ajustado por inflación</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <p className="text-sm text-slate-500 mb-1">Total aportado</p>
                <p className="text-xl font-bold text-navy">${fmt(resultado.totalAportado)}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <p className="text-sm text-slate-500 mb-1">Rendimientos generados</p>
                <p className="text-xl font-bold text-green-600">${fmt(resultado.interesesGanados)}</p>
              </div>
            </div>

            <div
              className={`rounded-xl p-5 border ${
                resultado.deficit
                  ? "bg-red-50 border-red-200"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{resultado.deficit ? "⚠️" : "✅"}</span>
                <div>
                  <p className={`font-semibold ${resultado.deficit ? "text-red-700" : "text-green-700"}`}>
                    {resultado.alcanceAnios === Infinity
                      ? "Tu fondo es perpetuo — los rendimientos cubren los gastos"
                      : resultado.deficit
                      ? `Tu fondo alcanzaría aproximadamente ${resultado.alcanceAnios.toFixed(1)} años`
                      : `Tu fondo alcanzaría aproximadamente ${resultado.alcanceAnios.toFixed(1)} años`}
                  </p>
                  {resultado.deficit && (
                    <p className="text-sm text-red-600 mt-1">
                      Para cubrir 25 años de retiro necesitarías aportar{" "}
                      <strong>${fmt(resultado.aportacionNecesaria)}/mes</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
