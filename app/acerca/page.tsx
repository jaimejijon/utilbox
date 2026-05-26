import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de utilbox.lat",
  description:
    "Conoce qué es utilbox.lat, quién lo crea, cuál es su misión y cómo funciona la plataforma de herramientas gratuitas para Latinoamérica.",
};

const ACCENT = "#5C6BC0";
const ACCENT_BG = "#1E1A3A";
const ACCENT_BORDER = "rgba(92,107,192,0.25)";

const categories = [
  {
    name: "Finanzas",
    href: "/finanzas",
    color: "#5C6BC0",
    bg: "#1E1A3A",
    description:
      "Calculadoras de interés compuesto, simuladores de préstamo, convertidor de monedas, planificación del retiro y análisis de ROI para tomar mejores decisiones económicas.",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    name: "Salud",
    href: "/salud",
    color: "#6EC9A0",
    bg: "#132A1E",
    description:
      "IMC, gasto calórico, hidratación, macronutrientes, sueño y más. Herramientas basadas en evidencia para entender y cuidar tu cuerpo.",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: "Hogar",
    href: "/hogar",
    color: "#D4856A",
    bg: "#2A1A14",
    description:
      "Compara alquilar vs. comprar, calcula el consumo eléctrico, presupuesta remodelaciones y gestiona los gastos del hogar con claridad.",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "Educación",
    href: "/educacion",
    color: "#74AEDD",
    bg: "#141F2A",
    description:
      "Promedio ponderado, ROI de posgrado, simulador de becas, costo de carrera y herramientas para tomar decisiones educativas informadas.",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    name: "Nutrición",
    href: "/nutricion",
    color: "#D4B85A",
    bg: "#2A2214",
    description:
      "Calorías por alimento, índice glucémico, proteínas diarias, ayuno intermitente y más utilidades para una alimentación consciente.",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: ACCENT,
        marginBottom: "8px",
      }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "20px",
        fontWeight: 600,
        color: "#FFFFFF",
        letterSpacing: "-0.3px",
        lineHeight: 1.25,
        marginBottom: "14px",
      }}
    >
      {children}
    </h2>
  );
}

function BodyText({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      style={{
        fontSize: "14px",
        color: "#EEEEEE",
        lineHeight: "1.75",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#141520",
  border: "0.5px solid #1E2030",
  borderRadius: "12px",
  padding: "28px 32px",
};

export default function AcercaPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section
        style={{ borderBottom: "0.5px solid #1E2030" }}
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-30px",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.04,
            fontSize: "220px",
            fontWeight: 700,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          □
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          <div
            className="inline-flex items-center gap-2 mb-5"
            style={{
              background: ACCENT_BG,
              border: `0.5px solid ${ACCENT_BORDER}`,
              borderRadius: "999px",
              padding: "5px 12px 5px 8px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: ACCENT,
                display: "block",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              Acerca de
            </span>
          </div>

          <h1
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.4px",
              lineHeight: 1.2,
              marginBottom: "14px",
              maxWidth: "580px",
            }}
          >
            Herramientas que toda Latinoamérica necesita
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#EEEEEE",
              lineHeight: "1.75",
              maxWidth: "540px",
            }}
          >
            utilbox.lat es una plataforma de calculadoras y simuladores gratuitos diseñada
            para cualquier persona en América Latina que quiera tomar mejores decisiones:
            sobre su dinero, su salud, su hogar y su educación. Sin cuentas. Sin
            formularios. Sin datos que guardar.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-10 w-full">
        <div className="flex flex-col gap-8">

          {/* Misión */}
          <section style={cardStyle}>
            <Label>Nuestra misión</Label>
            <SectionTitle>Acceso libre al conocimiento práctico</SectionTitle>
            <BodyText>
              En gran parte de Latinoamérica, las herramientas financieras y de salud de
              calidad están detrás de apps de pago, registros obligatorios o servicios
              pensados para mercados europeos o norteamericanos. utilbox.lat existe para
              cerrar esa brecha: ofrecer calculadoras precisas, en español, orientadas a
              la realidad latinoamericana —tasas locales, pesos, soles, pesos
              colombianos— sin que el usuario tenga que dar ningún dato personal.
            </BodyText>
            <BodyText style={{ marginTop: "12px" }}>
              Cada herramienta es gratuita para siempre, no requiere registro y no
              recopila ninguna información de los inputs que ingresas. La privacidad no
              es una promesa de marketing: es la consecuencia directa de cómo está
              construido el sitio.
            </BodyText>
            <div className="flex flex-wrap gap-8 mt-7">
              {[
                { value: "100%", label: "gratuito" },
                { value: "0", label: "datos recopilados" },
                { value: "0", label: "registro requerido" },
                { value: "+50", label: "herramientas" },
              ].map((s) => (
                <div key={s.label}>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 600,
                      color: ACCENT,
                      display: "block",
                      lineHeight: 1,
                      marginBottom: "3px",
                    }}
                  >
                    {s.value}
                  </span>
                  <span style={{ fontSize: "12px", color: "#EEEEEE" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Quién lo hace */}
          <section style={cardStyle}>
            <Label>Quién lo hace</Label>
            <SectionTitle>Un proyecto independiente desde Quito, Ecuador</SectionTitle>
            <BodyText>
              utilbox.lat es creado y mantenido por un marketero digital independiente
              basado en Quito, Ecuador. No es una startup con inversores ni un equipo
              corporativo: es un proyecto personal nacido de la convicción de que
              herramientas de calidad no deberían estar detrás de un paywall ni requerir
              que entregues tu correo electrónico para usarlas.
            </BodyText>
            <BodyText style={{ marginTop: "12px" }}>
              Cada calculadora es diseñada con atención a la precisión matemática, la
              usabilidad en móvil y la relevancia para el contexto de cada país
              latinoamericano. Si encuentras un error de cálculo o tienes una sugerencia
              de nueva herramienta, escríbenos. Este sitio mejora gracias a quien lo usa.
            </BodyText>
          </section>

          {/* Categorías */}
          <section>
            <Label>Las categorías</Label>
            <SectionTitle>Cinco áreas para las decisiones que más importan</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  style={{
                    background: "#141520",
                    border: "0.5px solid #1E2030",
                    borderRadius: "10px",
                    padding: "18px 20px",
                    textDecoration: "none",
                    display: "block",
                  }}
                  className="hover:!border-[#2A2B40] transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        background: cat.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: cat.color,
                        flexShrink: 0,
                      }}
                    >
                      {cat.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: cat.color,
                      }}
                    >
                      {cat.name}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#EEEEEE",
                      lineHeight: "1.65",
                    }}
                  >
                    {cat.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Tecnología */}
          <section style={cardStyle}>
            <Label>Tecnología</Label>
            <SectionTitle>Todo corre en tu navegador</SectionTitle>
            <BodyText>
              utilbox.lat está construido con{" "}
              <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>Next.js</strong>,
              hosteado en{" "}
              <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>Vercel</strong> y se
              entrega como páginas estáticas de carga instantánea. Todos los cálculos se
              ejecutan directamente en el navegador del usuario: ningún número que
              ingreses sale de tu dispositivo ni llega a ningún servidor. No hay base de
              datos de usuarios. No hay telemetría de inputs.
            </BodyText>
            <div className="flex flex-wrap gap-2.5 mt-5">
              {["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel", "MDX"].map(
                (tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: ACCENT,
                      background: ACCENT_BG,
                      border: `0.5px solid ${ACCENT_BORDER}`,
                      borderRadius: "6px",
                      padding: "5px 11px",
                    }}
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </section>

          {/* Contacto */}
          <section
            style={{
              background: ACCENT_BG,
              border: `0.5px solid ${ACCENT_BORDER}`,
              borderRadius: "12px",
              padding: "28px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: "200px" }}>
              <Label>Contacto</Label>
              <SectionTitle>¿Sugerencias o encontraste un error?</SectionTitle>
              <BodyText>
                Escríbenos directamente. Respondemos a sugerencias de nuevas
                herramientas, reportes de errores de cálculo y cualquier duda sobre el
                sitio.
              </BodyText>
            </div>
            <a
              href="mailto:owner@utilbox.lat"
              style={{
                background: ACCENT,
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                padding: "11px 22px",
                borderRadius: "8px",
                textDecoration: "none",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
              className="hover:opacity-90 transition-opacity duration-200"
            >
              owner@utilbox.lat →
            </a>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
