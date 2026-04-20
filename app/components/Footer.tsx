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
              <span style={{ fontWeight: 600, color: "#ECECEC", fontSize: "15px", letterSpacing: "-0.3px" }}>
                utilbox
              </span>
              <span style={{ fontWeight: 600, color: "#5C6BC0", fontSize: "15px", letterSpacing: "-0.3px" }}>
                .lat
              </span>
            </div>
            <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#888" }}>
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
                color: "#888",
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
                    style={{ fontSize: "13px", color: "#888" }}
                    className="hover:!text-[#CCCCCC] transition-colors duration-200"
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
                color: "#888",
                marginBottom: "12px",
              }}
            >
              Plataforma
            </p>
            <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#888" }}>
              Todos los cálculos corren directamente en tu navegador. No almacenamos ningún dato personal.
            </p>
          </div>
        </div>

        <div style={{ borderTop: "0.5px solid #1E2030", paddingTop: "20px", textAlign: "center" }}>
          <span style={{ fontSize: "11px", color: "#666" }}>
            © 2025 utilbox.lat — Herramientas gratuitas para todos
          </span>
        </div>
      </div>
    </footer>
  );
}
