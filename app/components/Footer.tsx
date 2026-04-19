import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-400 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="font-bold text-white">utilbox</span>
              <span className="font-bold text-accent">.lat</span>
            </div>
            <p className="text-sm leading-relaxed">
              Herramientas financieras gratuitas para toda Latinoamérica. Sin
              registros, sin costos.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-3">Herramientas</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculadora-interes-compuesto" className="hover:text-accent transition-colors">
                  Interés compuesto
                </Link>
              </li>
              <li>
                <Link href="/simulador-prestamo" className="hover:text-accent transition-colors">
                  Simulador de préstamo
                </Link>
              </li>
              <li>
                <Link href="/convertidor-monedas" className="hover:text-accent transition-colors">
                  Convertidor de monedas
                </Link>
              </li>
              <li>
                <Link href="/calculadora-jubilacion" className="hover:text-accent transition-colors">
                  Calculadora de jubilación
                </Link>
              </li>
              <li>
                <Link href="/calculadora-roi" className="hover:text-accent transition-colors">
                  Calculadora de ROI
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-3">Acerca de</p>
            <p className="text-sm leading-relaxed">
              Todas las calculadoras funcionan en tu navegador. No almacenamos
              ningún dato personal.
            </p>
          </div>
        </div>
        <div className="border-t border-navy-700 pt-6 text-center text-xs">
          © 2025 utilbox.lat — Herramientas gratuitas para todos
        </div>
      </div>
    </footer>
  );
}
