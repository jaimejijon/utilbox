import type { MetadataRoute } from "next";

const BASE_URL = "https://www.utilbox.lat";
const now = new Date();

const categories = [
  "/finanzas",
  "/salud",
  "/hogar",
  "/educacion",
  "/nutricion",
];

const tools = [
  // Finanzas
  "/calculadora-interes-compuesto",
  "/simulador-prestamo",
  "/convertidor-monedas",
  "/calculadora-jubilacion",
  "/calculadora-roi",
  "/simulador-hipoteca",
  "/alquiler-vs-compra",
  "/fondo-emergencia-hogar",
  // Salud
  "/calculadora-imc",
  "/gasto-calorico-diario",
  "/agua-diaria-ideal",
  "/calculadora-macronutrientes",
  "/calculadora-sueno",
  "/calorias-ejercicio",
  "/fecha-probable-parto",
  "/edad-biologica",
  "/interpretador-presion-arterial",
  "/peso-ideal",
  // Hogar (excluyendo /alquiler-vs-compra y /fondo-emergencia-hogar ya listados)
  "/calculadora-pintura",
  "/calculadora-azulejos",
  "/consumo-electrico",
  "/calculadora-mudanza",
  "/presupuesto-remodelacion",
  "/costo-mascota",
  "/ahorro-energia-solar",
  // Educación
  "/promedio-ponderado",
  "/nota-minima-aprobar",
  "/simulador-beca",
  "/tiempo-estudio",
  "/costo-carrera",
  "/roi-posgrado",
  "/conversor-calificaciones",
  "/deuda-estudiantil",
  "/planificador-estudio",
  "/productividad-academica",
  // Nutrición
  "/calorias-por-alimento",
  "/indice-glucemico",
  "/proteina-diaria",
  "/hidratacion-deportiva",
  "/deficit-superavit",
  "/ayuno-intermitente",
  "/porciones-alimenticias",
  "/costo-nutricional-receta",
  "/alcohol-en-sangre",
  "/metabolismo-cafeina",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...categories.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...tools.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
