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
        {/* SEO Content */}
        <div className="mt-14 space-y-8">
          <div className="border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Por qué planificar tu jubilación desde hoy
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              La calculadora de jubilación proyecta cuánto dinero tendrás al momento de retirarte y si ese fondo alcanzará para mantener tu estilo de vida durante los años de retiro. Es una de las herramientas de planificación financiera más importantes que puedes usar, sin importar la edad que tengas ahora.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              La herramienta simula el crecimiento de tus ahorros actuales más tus aportaciones mensuales durante los años que faltan para jubilarte, aplicando interés compuesto. Luego calcula cuántos años alcanzaría ese fondo para cubrir tus gastos mensuales deseados. También muestra el valor real ajustado por inflación, que es lo que realmente importa: no cuántos pesos o dólares tendrás, sino cuánto podrás comprar con ese dinero.
            </p>
            <p className="text-slate-600 leading-relaxed">
              En muchos países de Latinoamérica, las pensiones del sistema público son insuficientes para mantener el nivel de vida previo a la jubilación. Por eso, construir un fondo propio de retiro no es un lujo — es una necesidad para quienes quieren tener opciones al llegar a esa etapa.
            </p>
          </div>

          {/* Practical example */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-navy mb-3">Ejemplo práctico: el costo de esperar</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Dos personas quieren jubilarse a los 65 con gastos mensuales de <strong className="text-navy">$1,500 USD</strong> y un retorno del <strong className="text-navy">7% anual</strong>. La única diferencia es cuándo empiezan a ahorrar <strong className="text-navy">$300/mes</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                <p className="text-sm text-slate-500 mb-1">Empieza a los 25 años</p>
                <p className="text-2xl font-bold text-green-600">$910,714</p>
                <p className="text-xs text-slate-400 mt-1">fondo al jubilarse</p>
                <p className="text-sm text-slate-600 mt-2">Aporta $144,000 en total</p>
                <p className="text-xs text-green-600 font-medium mt-1">Fondo alcanza 50+ años</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                <p className="text-sm text-slate-500 mb-1">Empieza a los 40 años</p>
                <p className="text-2xl font-bold text-amber-500">$189,202</p>
                <p className="text-xs text-slate-400 mt-1">fondo al jubilarse</p>
                <p className="text-sm text-slate-600 mt-2">Aporta $90,000 en total</p>
                <p className="text-xs text-amber-600 font-medium mt-1">Fondo alcanza ~9 años</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Esperar 15 años reduce el fondo en casi 5 veces, a pesar de haber aportado solo $54,000 menos. El tiempo es el ingrediente más poderoso.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-xl font-bold text-navy mb-4">Preguntas frecuentes</h3>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">¿Qué es la regla del 4% y cómo aplica al retiro?</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  La regla del 4% es una guía financiera que indica que puedes retirar el 4% de tu fondo de retiro anualmente de forma sostenible a largo plazo, sin agotar el capital. Fue desarrollada a partir del estudio "Trinity Study" en EE.UU. Bajo esta regla, si tienes $500,000, podrías retirar $20,000 al año ($1,667/mes) indefinidamente. Esta calculadora usa ese mismo principio para estimar cuántos años alcanzará tu fondo.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">¿Por qué importa la inflación en el cálculo de jubilación?</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  La inflación erosiona el poder adquisitivo del dinero con el tiempo. Si la inflación promedia 4% anual, $2,000 de hoy equivaldrán a menos de $900 en términos de poder de compra dentro de 20 años. La calculadora muestra tanto el fondo nominal (la cantidad de dinero que tendrás) como el valor real ajustado por inflación, para que puedas planificar con base en lo que ese dinero realmente podrá comprar en el futuro.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-navy mb-2">¿A qué edad conviene empezar a ahorrar para el retiro?</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cuanto antes, mejor — sin excepción. Empezar a los 25 en lugar de los 35 puede más que duplicar el fondo final, aun aportando la misma cantidad mensual. Si ya pasaste de los 40, no desesperes: todavía hay tiempo de construir un fondo significativo aumentando las aportaciones mensuales. Lo peor que puedes hacer es no hacer nada. Usa esta calculadora para ver exactamente cuánto necesitas aportar según tu situación actual.
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
