import type { Metadata } from "next";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "utilbox.lat — Herramientas financieras gratuitas para Latinoamérica",
  description:
    "Calculadoras y simuladores financieros 100% gratuitos: interés compuesto, préstamos, convertidor de monedas, jubilación y ROI. Sin registro, sin costos.",
};

const tools = [
  {
    href: "/calculadora-interes-compuesto",
    icon: "📈",
    title: "Calculadora de interés compuesto",
    description:
      "Simula el crecimiento de tu inversión en el tiempo con aportaciones periódicas y tasa anual.",
    badge: "Inversión",
  },
  {
    href: "/simulador-prestamo",
    icon: "🏦",
    title: "Simulador de préstamo",
    description:
      "Calcula tu cuota mensual, total de intereses y tabla de amortización completa.",
    badge: "Deudas",
  },
  {
    href: "/convertidor-monedas",
    icon: "💱",
    title: "Convertidor de monedas",
    description:
      "Convierte entre más de 20 monedas latinoamericanas y mundiales al instante.",
    badge: "Divisas",
  },
  {
    href: "/calculadora-jubilacion",
    icon: "🏖️",
    title: "Calculadora de jubilación",
    description:
      "Descubre cuánto necesitas ahorrar hoy para retirarte con tranquilidad financiera.",
    badge: "Retiro",
  },
  {
    href: "/calculadora-roi",
    icon: "📊",
    title: "Calculadora de ROI",
    description:
      "Calcula el retorno sobre inversión de cualquier proyecto o negocio de forma visual.",
    badge: "Negocios",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
            Herramientas financieras
            <br />
            <span className="text-accent">gratuitas para Latinoamérica</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Calculadoras y simuladores para tomar mejores decisiones con tu
            dinero. Sin registros, sin costos, funcionan en tu navegador.
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold text-navy mb-8 text-center">
            Todas las herramientas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:border-accent hover:shadow-lg transition-all duration-200 group flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{tool.icon}</span>
                  <span className="text-xs font-semibold text-accent bg-sky-50 border border-sky-200 rounded-full px-2.5 py-0.5">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-navy mb-2 group-hover:text-accent-dark transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {tool.description}
                </p>
                <div className="mt-4 text-sm font-medium text-accent group-hover:underline">
                  Abrir herramienta →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features strip */}
        <div className="bg-navy-800 bg-[#1e293b] border-y border-[#334155]">
          <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: "🔒", title: "100% privado", desc: "Todos los cálculos son locales en tu navegador" },
              { icon: "⚡", title: "Instantáneo", desc: "Sin esperas ni carga de datos externos" },
              { icon: "🆓", title: "Siempre gratis", desc: "Sin registro, sin publicidad invasiva" },
            ].map((f) => (
              <div key={f.title}>
                <div className="text-3xl mb-2">{f.icon}</div>
                <p className="font-semibold text-white mb-1">{f.title}</p>
                <p className="text-sm text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
