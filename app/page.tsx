export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">utilbox</span>
            <span className="text-xl font-bold text-blue-600">.lat</span>
          </div>
          <p className="text-sm text-gray-500">Herramientas gratuitas online</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Herramientas financieras gratuitas
          </h1>
          <p className="text-lg text-gray-600">
            Calculadoras y simuladores para tomar mejores decisiones con tu dinero
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/calculadora-interes-compuesto" className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-400 hover:shadow-md transition-all group">
            <div className="text-3xl mb-3">📈</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
              Calculadora de interés compuesto
            </h2>
            <p className="text-sm text-gray-500">
              Simula el crecimiento de tu inversión en el tiempo con aportaciones periódicas.
            </p>
          </a>

          <a href="/simulador-prestamo" className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-400 hover:shadow-md transition-all group">
            <div className="text-3xl mb-3">🏦</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
              Simulador de préstamo
            </h2>
            <p className="text-sm text-gray-500">
              Calcula tu cuota mensual, total de intereses y tabla de amortización.
            </p>
          </a>

          <a href="/convertidor-monedas" className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-400 hover:shadow-md transition-all group">
            <div className="text-3xl mb-3">💱</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
              Convertidor de monedas
            </h2>
            <p className="text-sm text-gray-500">
              Convierte entre más de 30 monedas con tasas de cambio actualizadas.
            </p>
          </a>

          <a href="/calculadora-jubilacion" className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-400 hover:shadow-md transition-all group">
            <div className="text-3xl mb-3">🏖️</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
              Calculadora de jubilación
            </h2>
            <p className="text-sm text-gray-500">
              Descubre cuánto necesitas ahorrar hoy para retirarte con tranquilidad.
            </p>
          </a>

          <a href="/calculadora-roi" className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-400 hover:shadow-md transition-all group">
            <div className="text-3xl mb-3">📊</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
              Calculadora de ROI
            </h2>
            <p className="text-sm text-gray-500">
              Calcula el retorno de cualquier inversión de forma rápida y visual.
            </p>
          </a>
        </div>
      </div>

      <footer className="border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-400">
        © 2025 utilbox.lat — Herramientas gratuitas para todos
      </footer>
    </main>
  )
}