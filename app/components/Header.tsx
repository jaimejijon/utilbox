import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-navy text-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 hover:opacity-90 transition-opacity">
          <span className="text-xl font-bold text-white">utilbox</span>
          <span className="text-xl font-bold text-accent">.lat</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
          <Link href="/calculadora-interes-compuesto" className="hover:text-accent transition-colors">
            Interés compuesto
          </Link>
          <Link href="/simulador-prestamo" className="hover:text-accent transition-colors">
            Préstamos
          </Link>
          <Link href="/calculadora-roi" className="hover:text-accent transition-colors">
            ROI
          </Link>
        </nav>
      </div>
    </header>
  );
}
