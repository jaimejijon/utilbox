import type { Metadata } from "next";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "utilbox.lat — Herramientas gratuitas para Latinoamérica",
  description:
    "Calculadoras, simuladores y utilidades gratuitas para finanzas, salud, hogar y más. Sin registro, sin costos, todo en tu navegador.",
};

const categories = [
  {
    id: "finanzas",
    href: "/finanzas",
    name: "Finanzas",
    color: "#5C6BC0",
    bg: "#252045",
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="12" width="4" height="9" /><rect x="9.5" y="7" width="4" height="14" /><rect x="16" y="3" width="4" height="18" />
      </svg>
    ),
  },
  {
    id: "salud",
    href: "/salud",
    name: "Salud",
    color: "#6EC9A0",
    bg: "#1A3D2E",
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: "hogar",
    href: "/hogar",
    name: "Hogar",
    color: "#D4856A",
    bg: "#3D2218",
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    id: "educacion",
    href: "/educacion",
    name: "Educación",
    color: "#74AEDD",
    bg: "#152638",
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: "nutricion",
    href: "/nutricion",
    name: "Nutrición",
    color: "#D4B85A",
    bg: "#332B0F",
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a3 3 0 0 0-3 3c0 1.5.5 2.5 1 3.5C8.5 9 7 10.5 7 12.5c0 3 2 5.5 5 5.5s5-2.5 5-5.5c0-2-1.5-3.5-3-4C14.5 7.5 15 6.5 15 5a3 3 0 0 0-3-3z" />
      </svg>
    ),
  },
  {
    id: "proximamente",
    href: "#",
    name: "Más…",
    color: "#FFFFFF",
    bg: "#141520",
    active: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
];

const tools = [
  {
    href: "/calculadora-interes-compuesto",
    category: "Inversión",
    name: "Calculadora de interés compuesto",
    description: "Simula el crecimiento de tu inversión con aportaciones mensuales y capitalización mensual.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9AAAF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    href: "/simulador-prestamo",
    category: "Crédito",
    name: "Simulador de préstamo",
    description: "Calcula tu cuota mensual, total de intereses y tabla de amortización completa.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9AAAF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    href: "/convertidor-monedas",
    category: "Divisas",
    name: "Convertidor de monedas",
    description: "Convierte entre más de 20 monedas latinoamericanas y mundiales al instante.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9AAAF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    href: "/calculadora-jubilacion",
    category: "Retiro",
    name: "Calculadora de jubilación",
    description: "Descubre cuánto necesitas ahorrar hoy para retirarte con tranquilidad financiera.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9AAAF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    href: "/calculadora-roi",
    category: "Negocios",
    name: "Calculadora de ROI",
    description: "Calcula el retorno sobre inversión de cualquier proyecto o negocio de forma visual.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9AAAF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const badges = [
  {
    color: "#5C6BC0",
    title: "100% privado",
    sub: "Todo corre en tu navegador",
  },
  {
    color: "#6EC9A0",
    title: "Siempre gratis",
    sub: "Sin registro ni publicidad",
  },
  {
    color: "#74AEDD",
    title: "Instantáneo",
    sub: "Sin esperas ni datos externos",
  },
];

export default function Home() {
  return (
    <>
      <style>{`
        .tool-card-fin {
          border-left-color: transparent !important;
          background: #141520 !important;
          transition: border-left-color 0.22s ease, background 0.22s ease;
        }
        .tool-card-fin:hover {
          border-left-color: #5C6BC0 !important;
          background: #13141F !important;
        }
        .tool-card-fin:hover .tool-arrow {
          color: #5C6BC0 !important;
          transform: translateX(3px);
        }
        .tool-arrow {
          transition: color 0.22s ease, transform 0.22s ease;
        }
        .tool-card-fin:last-child:nth-child(3n-1) {
          grid-column: span 2;
        }

        .categoria-card {
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.18s ease;
          cursor: pointer;
        }
        .categoria-card .categoria-nombre {
          transition: color 0.2s ease;
        }
        .categoria-card .categoria-bar {
          transition: opacity 0.2s ease;
        }
        .categoria-card:hover .categoria-bar {
          opacity: 1 !important;
          background: currentColor;
        }
        .categoria-card:hover { transform: translateY(-2px); }

        .categoria-finanzas:hover { background: #1E1A3A !important; border-color: #5C6BC0 !important; }
        .categoria-finanzas:hover .categoria-nombre { color: #5C6BC0 !important; }

        .categoria-salud:hover { background: #1A3D2E !important; border-color: #6EC9A0 !important; }
        .categoria-salud:hover .categoria-nombre { color: #6EC9A0 !important; }

        .categoria-hogar:hover { background: #3D2218 !important; border-color: #D4856A !important; }
        .categoria-hogar:hover .categoria-nombre { color: #D4856A !important; }

        .categoria-educacion:hover { background: #152638 !important; border-color: #74AEDD !important; }
        .categoria-educacion:hover .categoria-nombre { color: #74AEDD !important; }

        .categoria-nutricion:hover { background: #332B0F !important; border-color: #D4B85A !important; }
        .categoria-nutricion:hover .categoria-nombre { color: #D4B85A !important; }

        .categoria-proximamente:hover { background: #1E2030 !important; border-color: #444466 !important; }
        .categoria-proximamente:hover .categoria-nombre { color: #AAAACC !important; }
      `}</style>
      <Header />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-14 text-center">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <span
            style={{
              display: "block",
              width: "44px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #5C6BC0)",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#5C6BC0",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Plataforma de herramientas para Latinoamérica
          </span>
          <span
            style={{
              display: "block",
              width: "44px",
              height: "1px",
              background: "linear-gradient(90deg, #5C6BC0, transparent)",
            }}
          />
        </div>

        <h1
          style={{
            fontSize: "38px",
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1.15,
            letterSpacing: "-0.7px",
            marginBottom: "20px",
          }}
        >
          Una caja de herramientas
          <br />
          <em style={{ fontStyle: "normal", color: "#5C6BC0" }}>para cada decisión</em>
        </h1>

        <p
          style={{
            fontSize: "14px",
            color: "#F5F5F5",
            lineHeight: "1.65",
            maxWidth: "480px",
            margin: "0 auto 28px",
          }}
        >
          Calculadoras, simuladores y utilidades gratuitas para finanzas,
          salud, hogar y más. Sin registro, sin costos, todo en tu navegador.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/finanzas"
            style={{
              background: "#5C6BC0",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              padding: "10px 22px",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            className="hover:opacity-90"
          >
            Explorar herramientas →
          </Link>
          <a
            href="#acerca"
            style={{
              background: "transparent",
              color: "#F5F5F5",
              fontSize: "13px",
              border: "0.5px solid #2A2A40",
              padding: "10px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
            className="hover:!text-[#FFFFFF] hover:!border-[#3A3A55]"
          >
            ¿Qué es utilbox?
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#F5F5F5",
            marginBottom: "14px",
          }}
        >
          Categorías
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`flex-shrink-0 flex flex-col items-center gap-2 relative overflow-hidden categoria-card categoria-${cat.id}`}
              style={{
                background: "#1A1B2E",
                border: "0.5px solid #2A2B45",
                borderRadius: "10px",
                padding: "14px 8px 16px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: cat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                {cat.icon}
              </div>
              <span
                className="categoria-nombre"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                  textAlign: "center",
                }}
              >
                {cat.name}
              </span>
              {/* bottom color bar */}
              <span
                className="categoria-bar"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: cat.color,
                  opacity: 0.15,
                }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Tools */}
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 mb-10">
          <div className="flex items-center justify-between mb-5">
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#F5F5F5",
              }}
            >
              Finanzas — 5 herramientas
            </p>
            <Link
              href="/finanzas"
              style={{ fontSize: "12px", color: "#5C6BC0" }}
              className="hover:opacity-80 transition-opacity"
            >
              Ver todas →
            </Link>
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="tool-card-fin relative overflow-hidden flex flex-col"
                style={{
                  borderTop: "0.5px solid #1E2030",
                  borderRight: "0.5px solid #1E2030",
                  borderBottom: "0.5px solid #1E2030",
                  borderLeft: "2px solid transparent",
                  borderRadius: "10px",
                  padding: "16px",
                  textDecoration: "none",
                }}
              >
                {/* Top accent */}
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2.5px",
                    background: "#5C6BC0",
                  }}
                />

                {/* Icon + category */}
                <div className="flex items-center gap-2.5 mb-3 mt-1">
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "#1E1A3A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {tool.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#5C6BC0",
                    }}
                  >
                    {tool.category}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "6px",
                    lineHeight: "1.35",
                  }}
                >
                  {tool.name}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#F5F5F5",
                    lineHeight: "1.55",
                    flex: 1,
                  }}
                >
                  {tool.description}
                </p>

                {/* Arrow */}
                <span
                  className="tool-arrow"
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    right: "14px",
                    fontSize: "13px",
                    color: "#FFFFFF",
                  }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile list */}
          <div className="flex sm:hidden flex-col gap-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-3 transition-colors duration-200"
                style={{
                  background: "#141520",
                  borderTop: "0.5px solid #1E2030",
                  borderRight: "0.5px solid #1E2030",
                  borderBottom: "0.5px solid #1E2030",
                  borderLeft: "2px solid #5C6BC0",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    background: "#1E1A3A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#5C6BC0",
                      display: "block",
                      marginBottom: "2px",
                    }}
                  >
                    {tool.category}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      display: "block",
                      marginBottom: "2px",
                    }}
                  >
                    {tool.name}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#F5F5F5",
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {tool.description}
                  </span>
                </div>
                <span style={{ color: "#FFFFFF", fontSize: "14px", flexShrink: 0 }}>→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Badges */}
        <section
          style={{ borderTop: "0.5px solid #1E2030", borderBottom: "0.5px solid #1E2030" }}
          className="mb-0"
          id="acerca"
        >
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {badges.map((b) => (
                <div
                  key={b.title}
                  className="flex items-center gap-3"
                  style={{
                    background: "#1A1B2E",
                    border: "0.5px solid #2A2B45",
                    borderRadius: "8px",
                    padding: "12px 14px",
                  }}
                >
                  <span
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: b.color,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "#FFFFFF", marginBottom: "2px" }}>
                      {b.title}
                    </p>
                    <p style={{ fontSize: "11px", color: "#F5F5F5" }}>{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="sm:hidden sticky bottom-0 flex"
        style={{ background: "#0A0B10", borderTop: "0.5px solid #1E2030", zIndex: 40 }}
      >
        {[
          {
            href: "/",
            label: "Inicio",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            ),
          },
          {
            href: "/finanzas",
            label: "Categorías",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
            ),
          },
          {
            href: "/#acerca",
            label: "Acerca",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            ),
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center gap-1"
            style={{ padding: "10px 4px 14px", color: "#EEEEEE", textDecoration: "none" }}
          >
            {item.icon}
            <span style={{ fontSize: "9px" }}>{item.label}</span>
          </Link>
        ))}
      </nav>

      <Footer />
    </>
  );
}
