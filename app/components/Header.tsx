import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-navy text-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity" aria-label="utilbox.lat — inicio">
          <svg width="160" height="40" viewBox="0 0 200 48" aria-hidden="true">
            <polygon points="22,3 38,13 38,33 22,43 6,33 6,13" fill="none" stroke="#38bdf8" strokeWidth="2"/>
            <polygon points="22,11 34,18 34,30 22,37 10,30 10,18" fill="#1e3a5f"/>
            <text x="22" y="24" fontFamily="system-ui,-apple-system,sans-serif" fontSize="13" fontWeight="900" fill="#38bdf8" textAnchor="middle" dominantBaseline="middle">U</text>
            <text x="50" y="26" fontFamily="system-ui,-apple-system,sans-serif" fontSize="18" fontWeight="800" fill="#ffffff" letterSpacing="-1">util</text>
            <rect x="86" y="14" width="1.5" height="18" rx="1" fill="#334155"/>
            <text x="92" y="26" fontFamily="system-ui,-apple-system,sans-serif" fontSize="18" fontWeight="800" fill="#38bdf8" letterSpacing="-1">box</text>
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
