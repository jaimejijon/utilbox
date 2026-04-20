import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-navy text-white min-h-[64px]">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity flex-shrink-0" aria-label="utilbox.lat — inicio">
          <svg width="180" height="52" viewBox="0 0 180 52" aria-hidden="true">
            <polygon points="23,2 42,12 42,34 23,44 4,34 4,12" fill="none" stroke="#38bdf8" strokeWidth="2.5"/>
            <polygon points="23,10 38,19 38,31 23,40 8,31 8,19" fill="#1e3a5f"/>
            <text x="23" y="26" fontFamily="system-ui,-apple-system,sans-serif" fontSize="15" fontWeight="900" fill="#38bdf8" textAnchor="middle" dominantBaseline="middle">U</text>
            <text x="52" y="29" fontFamily="system-ui,-apple-system,sans-serif" fontSize="22" fontWeight="800" fill="#ffffff" letterSpacing="-1">util</text>
            <rect x="93" y="15" width="2" height="22" rx="1" fill="#334155"/>
            <text x="100" y="29" fontFamily="system-ui,-apple-system,sans-serif" fontSize="22" fontWeight="800" fill="#38bdf8" letterSpacing="-1">box</text>
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
