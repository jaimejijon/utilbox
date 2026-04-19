"use client";

import { useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

// Tasas estáticas respecto al USD (actualizadas aproximadamente)
const RATES: Record<string, { rate: number; name: string; symbol: string }> = {
  USD: { rate: 1, name: "Dólar estadounidense", symbol: "$" },
  MXN: { rate: 17.5, name: "Peso mexicano", symbol: "$" },
  BRL: { rate: 5.05, name: "Real brasileño", symbol: "R$" },
  ARS: { rate: 920, name: "Peso argentino", symbol: "$" },
  CLP: { rate: 955, name: "Peso chileno", symbol: "$" },
  COP: { rate: 4050, name: "Peso colombiano", symbol: "$" },
  PEN: { rate: 3.75, name: "Sol peruano", symbol: "S/" },
  GTQ: { rate: 7.8, name: "Quetzal guatemalteco", symbol: "Q" },
  CRC: { rate: 528, name: "Colón costarricense", symbol: "₡" },
  BOB: { rate: 6.91, name: "Boliviano boliviano", symbol: "Bs." },
  PYG: { rate: 7600, name: "Guaraní paraguayo", symbol: "₲" },
  UYU: { rate: 39, name: "Peso uruguayo", symbol: "$U" },
  DOP: { rate: 58, name: "Peso dominicano", symbol: "RD$" },
  HNL: { rate: 24.7, name: "Lempira hondureño", symbol: "L" },
  NIO: { rate: 36.7, name: "Córdoba nicaragüense", symbol: "C$" },
  EUR: { rate: 0.92, name: "Euro", symbol: "€" },
  GBP: { rate: 0.79, name: "Libra esterlina", symbol: "£" },
  CAD: { rate: 1.36, name: "Dólar canadiense", symbol: "CA$" },
  JPY: { rate: 149, name: "Yen japonés", symbol: "¥" },
  CNY: { rate: 7.24, name: "Yuan chino", symbol: "¥" },
};

const currencies = Object.keys(RATES);

function fmt(n: number, code: string) {
  if (n >= 1000) return n.toLocaleString("es-MX", { maximumFractionDigits: 2 });
  if (n < 0.01) return n.toFixed(6);
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
}

export default function ConvertidorMonedas() {
  const [cantidad, setCantidad] = useState("100");
  const [de, setDe] = useState("USD");
  const [a, setA] = useState("MXN");
  const [resultado, setResultado] = useState<number | null>(null);
  const [tasa, setTasa] = useState<number | null>(null);

  const convertir = useCallback(() => {
    const val = parseFloat(cantidad) || 0;
    if (val <= 0) return;
    const inUSD = val / RATES[de].rate;
    const converted = inUSD * RATES[a].rate;
    setResultado(converted);
    setTasa(RATES[a].rate / RATES[de].rate);
  }, [cantidad, de, a]);

  const intercambiar = () => {
    setDe(a);
    setA(de);
    setResultado(null);
  };

  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <nav className="text-sm text-slate-400 mb-6">
          <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">Convertidor de monedas</span>
        </nav>

        <h1 className="text-3xl font-bold text-navy mb-2">
          Convertidor de monedas
        </h1>
        <p className="text-slate-500 mb-2">
          Convierte entre 20 monedas latinoamericanas y mundiales al instante.
        </p>
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-8 inline-block">
          ⚠️ Las tasas son referenciales. Para transacciones financieras, consulta tasas oficiales.
        </p>

        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="mb-5">
            <label className="block text-sm font-medium text-navy mb-1.5">Cantidad</label>
            <input
              type="number"
              min="0"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-navy mb-1.5">De</label>
              <select
                value={de}
                onChange={(e) => setDe(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c} — {RATES[c].name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={intercambiar}
              className="px-4 py-2.5 border border-slate-200 rounded-lg text-slate-500 hover:text-accent hover:border-accent transition-colors mb-0.5"
              title="Intercambiar monedas"
            >
              ⇄
            </button>
            <div className="flex-1">
              <label className="block text-sm font-medium text-navy mb-1.5">A</label>
              <select
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c} — {RATES[c].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={convertir}
            className="mt-5 w-full bg-accent text-navy font-semibold py-3 rounded-lg hover:bg-accent-dark hover:text-white transition-colors"
          >
            Convertir
          </button>
        </div>

        {resultado !== null && tasa !== null && (
          <div className="space-y-4">
            <div className="bg-navy text-white rounded-xl p-6 text-center">
              <p className="text-sm text-slate-300 mb-1">
                {cantidad} {de} equivale a
              </p>
              <p className="text-4xl font-bold text-accent">
                {RATES[a].symbol} {fmt(resultado, a)}
              </p>
              <p className="text-sm text-slate-400 mt-1">{a} — {RATES[a].name}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm font-medium text-navy mb-3">Tasas de referencia (base USD)</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                <div className="flex justify-between bg-slate-50 rounded-lg px-3 py-2">
                  <span>1 USD →</span>
                  <span className="font-medium text-navy">{RATES[de].rate} {de}</span>
                </div>
                <div className="flex justify-between bg-slate-50 rounded-lg px-3 py-2">
                  <span>1 USD →</span>
                  <span className="font-medium text-navy">{RATES[a].rate} {a}</span>
                </div>
                <div className="col-span-2 flex justify-between bg-sky-50 border border-sky-100 rounded-lg px-3 py-2">
                  <span>1 {de} →</span>
                  <span className="font-semibold text-accent">
                    {fmt(tasa, a)} {a}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick reference table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <p className="text-sm font-medium text-navy px-5 py-4 border-b border-slate-100">
                Tabla rápida — {de} a {a}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left px-5 py-3 font-medium">{de}</th>
                      <th className="text-right px-5 py-3 font-medium">{a}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[1, 5, 10, 50, 100, 500, 1000].map((v) => (
                      <tr key={v} className="hover:bg-slate-50">
                        <td className="px-5 py-2.5">
                          {RATES[de].symbol} {v.toLocaleString("es-MX")}
                        </td>
                        <td className="px-5 py-2.5 text-right font-medium text-accent">
                          {RATES[a].symbol} {fmt((v / RATES[de].rate) * RATES[a].rate, a)}
                        </td>
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
