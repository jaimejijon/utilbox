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
        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div className="border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Qué es el interés compuesto y cómo funciona
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              El interés compuesto es uno de los conceptos más poderosos de las finanzas personales. A diferencia del interés simple, que siempre se calcula sobre el capital original, el interés compuesto se calcula sobre el saldo acumulado: cada período ganas intereses sobre tus intereses anteriores. Este efecto "bola de nieve" hace que el dinero crezca de forma exponencial con el tiempo.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Esta calculadora usa capitalización mensual, que es el esquema más común en fondos de inversión, cuentas de ahorro y planes de retiro. La fórmula aplica la tasa anual dividida entre 12 cada mes, sumando además tus aportaciones periódicas. El resultado es una proyección realista del crecimiento de tu patrimonio.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Es ideal para planificar metas a largo plazo: el fondo universitario de tus hijos, tu retiro, la compra de un inmueble o simplemente construir un colchón financiero. Cuanto antes empieces, más tiempo tiene el interés compuesto para trabajar a tu favor.
            </p>
          </div>

          {/* Practical example */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-navy mb-3">Ejemplo práctico con números reales</h3>
            <p className="text-slate-600 leading-relaxed mb-3">
              Imagina que tienes <strong className="text-navy">$5,000 USD</strong> ahorrados y puedes aportar <strong className="text-navy">$200 al mes</strong> en un fondo indexado con una tasa promedio del <strong className="text-navy">8% anual</strong>. Así quedarían tus números a distintos plazos:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="text-slate-500 mb-1">En 10 años</p>
                <p className="text-lg font-bold text-navy">$41,743</p>
                <p className="text-xs text-slate-400">aportaste $29,000</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="text-slate-500 mb-1">En 20 años</p>
                <p className="text-lg font-bold text-accent">$132,745</p>
                <p className="text-xs text-slate-400">aportaste $53,000</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="text-slate-500 mb-1">En 30 años</p>
                <p className="text-lg font-bold text-green-600">$339,821</p>
                <p className="text-xs text-slate-400">aportaste $77,000</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              A los 30 años, los intereses representan más del 77% del saldo final. Eso es el interés compuesto en acción.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-xl font-bold text-navy mb-4">Preguntas frecuentes</h3>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">¿Cuál es la diferencia entre interés simple e interés compuesto?</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  El interés simple siempre se calcula sobre el capital original, sin importar cuánto tiempo pase. El interés compuesto se calcula sobre el saldo acumulado, incluyendo los intereses ganados en períodos anteriores. Con el paso de los años, la diferencia entre ambos puede ser enorme: un mismo capital al 8% anual durante 30 años crece 2.4 veces con interés simple, pero casi 10 veces con interés compuesto.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">¿Qué tasa anual es realista para una inversión en Latinoamérica?</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Depende del instrumento y el país. Los CETES en México han ofrecido tasas del 9–11% anual en años recientes. Los fondos indexados globales (en dólares) han promediado históricamente entre 7–10% anual. Instrumentos de renta fija como bonos del gobierno de Chile o Colombia suelen ofrecer entre 5–8%. Para planificación conservadora, usar una tasa del 6–7% en dólares es razonable.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">¿Cada cuánto se capitaliza el interés en esta calculadora?</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Esta calculadora usa capitalización mensual, que es el esquema más común en productos de inversión y ahorro. Eso significa que cada mes se aplica 1/12 de la tasa anual sobre el saldo del mes anterior. Si tu producto financiero capitaliza diariamente (como algunas cuentas de ahorro digitales), el rendimiento real será ligeramente mayor al calculado aquí.
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
                { href: "/simulador-prestamo", label: "Simulador de préstamo", desc: "Calcula tu cuota y tabla de amortización" },
                { href: "/convertidor-monedas", label: "Convertidor de monedas", desc: "20 monedas latinoamericanas y mundiales" },
                { href: "/calculadora-jubilacion", label: "Calculadora de jubilación", desc: "¿Cuánto necesitas para retirarte?" },
                { href: "/calculadora-roi", label: "Calculadora de ROI", desc: "Mide la rentabilidad de tu inversión" },
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
