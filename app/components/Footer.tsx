import Link from "next/link";

const tools = [
  { href: "/calculadora-interes-compuesto", label: "Interés compuesto" },
  { href: "/simulador-prestamo", label: "Simulador de préstamo" },
  { href: "/convertidor-monedas", label: "Convertidor de monedas" },
  { href: "/calculadora-jubilacion", label: "Calculadora de jubilación" },
  { href: "/calculadora-roi", label: "Calculadora de ROI" },
];

export default function Footer() {
  return (
    <footer
      style={{ background: "#0F1117", borderTop: "0.5px solid #1E2030" }}
      className="mt-auto"
    >
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span style={{ fontWeight: 600, color: "#FFFFFF", fontSize: "15px", letterSpacing: "-0.3px" }}>
                utilbox
              </span>
              <span style={{ fontWeight: 600, color: "#5C6BC0", fontSize: "15px", letterSpacing: "-0.3px" }}>
                .lat
              </span>
            </div>
            <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#EEEEEE" }}>
              Plataforma de herramientas gratuitas para toda Latinoamérica. Sin registro, sin costos.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#EEEEEE",
                marginBottom: "12px",
              }}
            >
              Finanzas
            </p>
            <ul className="space-y-2">
              {tools.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    style={{ fontSize: "13px", color: "#EEEEEE" }}
                    className="hover:!text-[#FFFFFF] transition-colors duration-200"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#EEEEEE",
                marginBottom: "12px",
              }}
            >
              Plataforma
            </p>
            <ul className="space-y-2">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/privacidad", label: "Política de Privacidad" },
                { href: "/terminos", label: "Términos de Uso" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: "13px", color: "#EEEEEE" }}
                    className="hover:!text-[#FFFFFF] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "20px", textAlign: "center" }}>
          <span style={{ fontSize: "11px", color: "#F5F5F5" }}>
            © 2025 utilbox.lat — Herramientas gratuitas para todos
          </span>
        </div>
      </div>
    </footer>
  );
}
