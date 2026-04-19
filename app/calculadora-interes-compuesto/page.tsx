"use client";

import type { Metadata } from "next";
import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

// Metadata must be in a server component — exported here for use from a wrapper if needed.
// For client pages we set the title via a static export from a layout, or use next/head.
// Since this is a client component, SEO is handled via the sibling layout.

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface YearRow {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

export default function CalculadoraInteresCompuesto() {
  const [capital, setCapital] = useState("10000");
  const [aportacion, setAportacion] = useState("500");
  const [tasa, setTasa] = useState("8");
  const [plazo, setPlazo] = useState("20");
  const [resultado, setResultado] = useState<{
    total: number;
    capitalAportado: number;
    intereses: number;
    rows: YearRow[];
  } | null>(null);

  const calcular = useCallback(() => {
    const P = parseFloat(capital) || 0;
    const pmt = parseFloat(aportacion) || 0;
    const r = (parseFloat(tasa) || 0) / 100 / 12;
    const n = (parseInt(plazo) || 0) * 12;

    if (P < 0 || r < 0 || n <= 0) return;

    let balance = P;
    const rows: YearRow[] = [];

    for (let year = 1; year <= parseInt(plazo); year++) {
      const startBalance = balance;
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + r) + pmt;
      }
      const contributions = startBalance + pmt * 12;
      rows.push({
        year,
        balance,
        contributions: P + pmt * 12 * year,
        interest: balance - (P + pmt * 12 * year),
      });
    }

    const totalAportado = P + pmt * n;
    setResultado({
      total: balance,
      capitalAportado: totalAportado,
      intereses: balance - totalAportado,
      rows,
    });
  }, [capital, aportacion, tasa, plazo]);

  const pct = resultado
    ? Math.round((resultado.capitalAportado / resultado.total) * 100)
    : 0;

  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-400 mb-6">
          <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">Interés compuesto</span>
        </nav>

        <h1 className="text-3xl font-bold text-navy mb-2">
          Calculadora de interés compuesto
        </h1>
        <p className="text-slate-500 mb-8">
          Simula el crecimiento de tu inversión con aportaciones mensuales y capitalización mensual.
        </p>

        {/* Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Capital inicial ($)
              </label>
              <input
                type="number"
                min="0"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Aportación mensual ($)
              </label>
              <input
                type="number"
                min="0"
                value={aportacion}
                onChange={(e) => setAportacion(e.target.value)}
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
                max="100"
                step="0.1"
                value={tasa}
                onChange={(e) => setTasa(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Plazo (años)
              </label>
              <input
                type="number"
                min="1"
                max="60"
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

        {/* Results */}
        {resultado && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-navy text-white rounded-xl p-5 text-center">
                <p className="text-sm text-slate-300 mb-1">Monto final</p>
                <p className="text-2xl font-bold text-accent">${fmt(resultado.total)}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <p className="text-sm text-slate-500 mb-1">Capital aportado</p>
                <p className="text-2xl font-bold text-navy">${fmt(resultado.capitalAportado)}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <p className="text-sm text-slate-500 mb-1">Intereses ganados</p>
                <p className="text-2xl font-bold text-green-600">${fmt(resultado.intereses)}</p>
              </div>
            </div>

            {/* Visual bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm font-medium text-navy mb-3">Composición del monto final</p>
              <div className="w-full h-5 rounded-full overflow-hidden flex">
                <div
                  className="bg-accent h-full transition-all"
                  style={{ width: `${pct}%` }}
                />
                <div className="bg-green-500 h-full flex-1" />
              </div>
              <div className="flex gap-4 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-accent" />
                  Aportado ({pct}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-green-500" />
                  Intereses ({100 - pct}%)
                </span>
              </div>
            </div>

            {/* Year table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <p className="text-sm font-medium text-navy px-5 py-4 border-b border-slate-100">
                Evolución anual
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left px-5 py-3 font-medium">Año</th>
                      <th className="text-right px-5 py-3 font-medium">Saldo</th>
                      <th className="text-right px-5 py-3 font-medium">Aportado</th>
                      <th className="text-right px-5 py-3 font-medium">Intereses</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {resultado.rows.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50">
                        <td className="px-5 py-3 font-medium text-navy">{row.year}</td>
                        <td className="px-5 py-3 text-right text-accent font-semibold">${fmt(row.balance)}</td>
                        <td className="px-5 py-3 text-right text-slate-600">${fmt(row.contributions)}</td>
                        <td className="px-5 py-3 text-right text-green-600">${fmt(row.interest)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
