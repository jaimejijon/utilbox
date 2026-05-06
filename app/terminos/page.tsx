import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description:
    "Términos y condiciones de uso de utilbox.lat. Conoce las reglas, limitaciones de responsabilidad y derechos de propiedad intelectual del sitio.",
};

const sections = [
  {
    id: "descripcion",
    title: "1. Descripción del servicio",
    content: (
      <p>
        utilbox.lat es una plataforma gratuita de herramientas en línea que incluye calculadoras
        financieras, de salud, hogar, educación y nutrición, así como artículos y guías
        informativas. El servicio está disponible sin necesidad de registro de usuario ni pago.
        Todas las herramientas funcionan directamente en el navegador del usuario; los datos
        introducidos no se almacenan ni se transmiten a servidores externos.
      </p>
    ),
  },
  {
    id: "uso-aceptable",
    title: "2. Uso aceptable",
    content: (
      <>
        <p>Al acceder y utilizar utilbox.lat, aceptas que:</p>
        <ul style={{ marginTop: "12px", paddingLeft: "20px", listStyleType: "disc" }} className="space-y-2">
          <li>No usarás el sitio para actividades ilegales o que vulneren derechos de terceros.</li>
          <li>
            No intentarás comprometer la seguridad, disponibilidad o integridad del servicio
            mediante ataques, inyecciones de código u otras técnicas maliciosas.
          </li>
          <li>
            No realizarás scraping masivo del contenido sin autorización escrita previa.
          </li>
          <li>
            No reproducirás el código, diseño o contenido del sitio con fines comerciales sin
            autorización expresa.
          </li>
          <li>
            Eres mayor de 13 años, o cuentas con el consentimiento de un tutor legal si eres menor
            de esa edad.
          </li>
        </ul>
        <p style={{ marginTop: "12px" }}>
          Nos reservamos el derecho de bloquear el acceso a usuarios que incumplan estas
          condiciones.
        </p>
      </>
    ),
  },
  {
    id: "responsabilidad",
    title: "3. Limitación de responsabilidad",
    content: (
      <>
        <p>
          <strong style={{ color: "#FFFFFF" }}>
            Las herramientas y calculadoras de utilbox.lat tienen carácter exclusivamente
            orientativo e informativo.
          </strong>{" "}
          Los resultados que ofrecen son aproximaciones basadas en los datos introducidos por el
          usuario y no constituyen:
        </p>
        <ul style={{ marginTop: "12px", paddingLeft: "20px", listStyleType: "disc" }} className="space-y-2">
          <li>Asesoría financiera, de inversión ni de gestión patrimonial.</li>
          <li>Diagnóstico, consejo médico ni recomendación de tratamiento.</li>
          <li>Plan nutricional ni indicación dietética personalizada.</li>
          <li>Consejo legal, fiscal ni de ningún otro tipo.</li>
        </ul>
        <p style={{ marginTop: "12px" }}>
          Antes de tomar cualquier decisión importante basándote en los resultados de nuestras
          herramientas, consulta siempre con un profesional certificado (asesor financiero, médico,
          nutricionista, abogado, etc.).
        </p>
        <p style={{ marginTop: "12px" }}>
          utilbox.lat no garantiza la exactitud, completitud ni actualización permanente de los
          cálculos. No somos responsables de ninguna pérdida, daño o perjuicio —directo o
          indirecto— derivado del uso o de la imposibilidad de uso de las herramientas del sitio.
          El uso de utilbox.lat es bajo tu propia responsabilidad.
        </p>
      </>
    ),
  },
  {
    id: "propiedad-intelectual",
    title: "4. Propiedad intelectual",
    content: (
      <>
        <p>
          El código fuente, diseño visual, logotipos, textos, artículos y cualquier otro contenido
          publicado en utilbox.lat son propiedad de sus respectivos autores o de utilbox.lat, salvo
          que se indique expresamente lo contrario.
        </p>
        <p style={{ marginTop: "12px" }}>
          Se permite el uso personal y no comercial de las herramientas. Queda prohibida la
          reproducción, distribución, modificación o explotación comercial de cualquier parte del
          sitio sin autorización escrita previa. Las citas y referencias con atribución correcta
          están permitidas para artículos periodísticos y académicos.
        </p>
      </>
    ),
  },
  {
    id: "modificaciones",
    title: "5. Modificaciones al servicio",
    content: (
      <p>
        Nos reservamos el derecho de modificar, suspender o discontinuar cualquier parte del
        servicio —incluyendo herramientas específicas, contenido o funciones— en cualquier
        momento, con o sin previo aviso. No somos responsables ante ti ni ante terceros por
        ninguna modificación, suspensión o discontinuación del servicio. Asimismo, podemos
        actualizar estos Términos de Uso en cualquier momento; la versión vigente siempre estará
        disponible en esta página.
      </p>
    ),
  },
  {
    id: "legislacion",
    title: "6. Legislación aplicable",
    content: (
      <p>
        Estos Términos de Uso se rigen por las leyes de la República Mexicana. Para cualquier
        controversia derivada del uso del sitio, ambas partes se someten a la jurisdicción de los
        tribunales competentes, renunciando a cualquier otro fuero que pudiera corresponderles.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "7. Contacto",
    content: (
      <p>
        Si tienes preguntas sobre estos Términos de Uso, puedes escribirnos a:{" "}
        <span style={{ color: "#9AAAF0" }}>hola@utilbox.lat</span>. Intentaremos responder en un
        plazo máximo de 30 días hábiles.
      </p>
    ),
  },
];

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px 64px" }}>
          <div style={{ marginBottom: "40px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#8B8FA8",
                marginBottom: "12px",
              }}
            >
              Legal
            </p>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 600,
                color: "#FFFFFF",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
                marginBottom: "12px",
              }}
            >
              Términos de Uso
            </h1>
            <p style={{ fontSize: "13px", color: "#8B8FA8" }}>
              Última actualización: mayo de 2025
            </p>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.75",
                color: "#EEEEEE",
                marginTop: "16px",
              }}
            >
              Al acceder y utilizar utilbox.lat, aceptas los presentes Términos de Uso. Si no
              estás de acuerdo con alguno de ellos, te pedimos que no uses el sitio.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                style={{
                  background: "#141520",
                  border: "0.5px solid #1E2030",
                  borderRadius: "10px",
                  padding: "24px",
                }}
              >
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "14px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {section.title}
                </h2>
                <div
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.75",
                    color: "#EEEEEE",
                  }}
                >
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
