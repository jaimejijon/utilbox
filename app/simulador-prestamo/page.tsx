"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface AmoRow {
  mes: number;
  cuota: number;
  interes: number;
  capital: number;
  saldo: number;
}

export default function SimuladorPrestamo() {
  const [monto, setMonto] = useState("100000");
  const [tasa, setTasa] = useState("12");
  const [plazo, setPlazo] = useState("36");
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [resultado, setResultado] = useState<{
    cuota: number;
    totalPagado: number;
    totalIntereses: number;
    tabla: AmoRow[];
  } | null>(null);

  const calcular = useCallback(() => {
    const P = parseFloat(monto) || 0;
    const r = (parseFloat(tasa) || 0) / 100 / 12;
    const n = parseInt(plazo) || 0;

    if (P <= 0 || n <= 0) return;

    let cuota: number;
    if (r === 0) {
      cuota = P / n;
    } else {
      cuota = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const tabla: AmoRow[] = [];
    let saldo = P;
    for (let mes = 1; mes <= n; mes++) {
      const interes = saldo * r;
      const capitalMes = cuota - interes;
      saldo -= capitalMes;
      tabla.push({
        mes,
        cuota,
        interes,
        capital: capitalMes,
        saldo: Math.max(0, saldo),
      });
    }

    setResultado({
      cuota,
      totalPagado: cuota * n,
      totalIntereses: cuota * n - P,
      tabla,
    });
    setMostrarTabla(false);
  }, [monto, tasa, plazo]);

  const pctInteres = resultado
    ? Math.round((resultado.totalIntereses / resultado.totalPagado) * 100)
    : 0;

  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <nav className="text-sm text-slate-400 mb-6">
          <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">Simulador de préstamo</span>
        </nav>

        <h1 className="text-3xl font-bold text-navy mb-2">
          Simulador de préstamo
        </h1>
        <p className="text-slate-500 mb-8">
          Calcula tu cuota mensual, costo total y tabla de amortización completa con sistema francés.
        </p>

        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Monto del préstamo ($)
              </label>
              <input
                type="number"
                min="0"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Tasa anual (%)
              </label>
              <input
                type="number"
                min="0"
                max="200"
                step="0.1"
                value={tasa}
                onChange={(e) => setTasa(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Plazo (meses)
              </label>
              <input
                type="number"
                min="1"
                max="360"
                value={plazo}
                onChange={(e) => setPlazo(e.target.value)}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-navy text-white rounded-xl p-5 text-center">
                <p className="text-sm text-slate-300 mb-1">Cuota mensual</p>
                <p className="text-2xl font-bold text-accent">${fmt(resultado.cuota)}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <p className="text-sm text-slate-500 mb-1">Total a pagar</p>
                <p className="text-2xl font-bold text-navy">${fmt(resultado.totalPagado)}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <p className="text-sm text-slate-500 mb-1">Total en intereses</p>
                <p className="text-2xl font-bold text-red-500">${fmt(resultado.totalIntereses)}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm font-medium text-navy mb-3">Composición del costo total</p>
              <div className="w-full h-5 rounded-full overflow-hidden flex">
                <div
                  className="bg-accent h-full transition-all"
                  style={{ width: `${100 - pctInteres}%` }}
                />
                <div className="bg-red-400 h-full flex-1" />
              </div>
              <div className="flex gap-4 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-accent" />
                  Capital ({100 - pctInteres}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-red-400" />
                  Intereses ({pctInteres}%)
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setMostrarTabla((v) => !v)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-navy hover:bg-slate-50 transition-colors border-b border-slate-100"
              >
                <span>Tabla de amortización completa ({plazo} cuotas)</span>
                <span className="text-slate-400">{mostrarTabla ? "▲" : "▼"}</span>
              </button>
              {mostrarTabla && (
                <div className="overflow-x-auto max-h-80 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 sticky top-0">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium">Mes</th>
                        <th className="text-right px-4 py-3 font-medium">Cuota</th>
                        <th className="text-right px-4 py-3 font-medium">Interés</th>
                        <th className="text-right px-4 py-3 font-medium">Capital</th>
                        <th className="text-right px-4 py-3 font-medium">Saldo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {resultado.tabla.map((row) => (
                        <tr key={row.mes} className="hover:bg-slate-50">
                          <td className="px-4 py-2.5 font-medium text-navy">{row.mes}</td>
                          <td className="px-4 py-2.5 text-right">${fmt(row.cuota)}</td>
                          <td className="px-4 py-2.5 text-right text-red-500">${fmt(row.interes)}</td>
                          <td className="px-4 py-2.5 text-right text-accent">${fmt(row.capital)}</td>
                          <td className="px-4 py-2.5 text-right text-slate-600">${fmt(row.saldo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
