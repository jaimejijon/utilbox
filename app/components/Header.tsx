import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-navy text-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity" aria-label="utilbox.lat — inicio">
          <svg width="160" height="44" viewBox="0 0 160 44" aria-hidden="true">
            <polygon points="20,2 36,11 36,31 20,40 4,31 4,11" fill="none" stroke="#38bdf8" strokeWidth="2.2"/>
            <polygon points="20,9 32,16 32,28 20,35 8,28 8,16" fill="#1e3a5f"/>
            <text x="20" y="23" fontFamily="system-ui,-apple-system,sans-serif" fontSize="14" fontWeight="900" fill="#38bdf8" textAnchor="middle" dominantBaseline="middle">U</text>
            <text x="46" y="25" fontFamily="system-ui,-apple-system,sans-serif" fontSize="20" fontWeight="800" fill="#ffffff" letterSpacing="-1">util</text>
            <rect x="83" y="13" width="2" height="20" rx="1" fill="#334155"/>
            <text x="90" y="25" fontFamily="system-ui,-apple-system,sans-serif" fontSize="20" fontWeight="800" fill="#38bdf8" letterSpacing="-1">box</text>
          </svg>
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
