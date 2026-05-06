import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Conoce cómo utilbox.lat maneja la información de sus usuarios: qué datos recopilamos, uso de cookies, Google Analytics y publicidad.",
};

const sections = [
  {
    id: "datos",
    title: "1. Qué datos recopilamos",
    content: (
      <>
        <p>
          utilbox.lat no recopila datos personales identificables. No existe registro de usuarios,
          inicio de sesión ni formularios que soliciten nombre, correo o información personal.
          Todas las herramientas funcionan directamente en tu navegador: los datos que ingresas
          nunca se envían a nuestros servidores.
        </p>
        <p style={{ marginTop: "12px" }}>
          Como cualquier sitio web, nuestro servidor de hosting recibe automáticamente datos
          técnicos básicos: dirección IP (anonimizada), tipo de navegador, sistema operativo,
          páginas visitadas y duración de la sesión. Estos datos se procesan de forma agregada
          y anónima, y no permiten identificar a una persona concreta.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "2. Uso de cookies",
    content: (
      <>
        <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo. Utilizamos los siguientes tipos:</p>
        <ul style={{ marginTop: "12px", paddingLeft: "20px", listStyleType: "disc" }} className="space-y-2">
          <li>
            <strong style={{ color: "#FFFFFF" }}>Cookies analíticas (Google Analytics 4):</strong>{" "}
            Miden el tráfico de forma anónima. La dirección IP se anonimiza antes de enviarse
            a los servidores de Google.
          </li>
          <li>
            <strong style={{ color: "#FFFFFF" }}>Cookies publicitarias (futuras):</strong>{" "}
            Actualmente no están activas. Cuando integremos Google AdSense, informaremos de
            este cambio y actualizaremos esta política.
          </li>
        </ul>
        <p style={{ marginTop: "12px" }}>
          Puedes bloquear o eliminar cookies desde la configuración de tu navegador. Ten en cuenta
          que deshabilitar ciertas cookies puede afectar la experiencia de navegación.
        </p>
      </>
    ),
  },
  {
    id: "analytics",
    title: "3. Google Analytics",
    content: (
      <>
        <p>
          Usamos Google Analytics 4 (GA4) para entender cómo se usa el sitio: qué páginas son
          más visitadas, de dónde proviene el tráfico y cuánto tiempo permanecen los usuarios.
          Esta información nos ayuda a mejorar las herramientas y el contenido.
        </p>
        <p style={{ marginTop: "12px" }}>
          GA4 no nos permite identificar a usuarios individuales. Los datos se recopilan de
          forma anonimizada y agregada. Google puede procesar estos datos según su propia
          política de privacidad. Si prefieres no ser rastreado, puedes instalar el{" "}
          <span style={{ color: "#9AAAF0" }}>complemento de inhabilitación de Google Analytics</span>{" "}
          disponible para los principales navegadores.
        </p>
      </>
    ),
  },
  {
    id: "publicidad",
    title: "4. Publicidad",
    content: (
      <p>
        Planeamos integrar Google AdSense en el futuro para mostrar publicidad y sostener el sitio
        como servicio gratuito. Cuando esto ocurra, Google podría usar cookies para mostrar
        anuncios relevantes según el historial de navegación del usuario. Actualizaremos esta
        política y agregaremos un aviso de consentimiento antes de activar cualquier servicio
        publicitario. Para más información sobre cómo Google usa los datos publicitarios, consulta
        la Política de Privacidad y Términos de Google.
      </p>
    ),
  },
  {
    id: "derechos",
    title: "5. Derechos del usuario",
    content: (
      <>
        <p>
          Dado que no recopilamos datos personales identificables, no existe un perfil de usuario
          que eliminar o modificar. Sin embargo, si tienes dudas sobre qué datos técnicos pudieran
          estar asociados a tu uso del sitio, tienes derecho a:
        </p>
        <ul style={{ marginTop: "12px", paddingLeft: "20px", listStyleType: "disc" }} className="space-y-2">
          <li>Solicitar información sobre los datos que se hayan podido recopilar.</li>
          <li>Solicitar la eliminación de cualquier dato asociado a tu actividad.</li>
          <li>Optar por no participar en cookies analíticas mediante la configuración de tu navegador.</li>
        </ul>
        <p style={{ marginTop: "12px" }}>
          Para ejercer estos derechos, contáctanos en la dirección indicada en la sección de
          Contacto.
        </p>
      </>
    ),
  },
  {
    id: "cambios",
    title: "6. Cambios a esta política",
    content: (
      <p>
        Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento.
        Los cambios entrarán en vigor en el momento de su publicación. Te recomendamos revisar
        esta página periódicamente. La fecha de la última actualización aparece al inicio del
        documento.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "7. Contacto",
    content: (
      <p>
        Para cualquier consulta relacionada con la privacidad de tus datos, puedes escribirnos a:{" "}
        <span style={{ color: "#9AAAF0" }}>hola@utilbox.lat</span>. Intentaremos responder en un
        plazo máximo de 30 días hábiles.
      </p>
    ),
  },
];

export default function PrivacidadPage() {
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
              Política de Privacidad
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
              En utilbox.lat nos tomamos en serio tu privacidad. Esta política explica qué
              información recopilamos, cómo la usamos y qué derechos tienes sobre ella.
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
