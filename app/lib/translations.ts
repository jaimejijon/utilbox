export type Lang = "es" | "en";

export const translations = {
  es: {
    nav: {
      tools: "Herramientas",
      categories: "Categorías",
      blog: "Blog",
      about: "Acerca de",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      label: "Plataforma de herramientas para Latinoamérica",
      title1: "Una caja de herramientas",
      title2: "para cada decisión",
      desc: "Calculadoras, simuladores y utilidades gratuitas para finanzas, salud, hogar y más. Sin registro, sin costos, todo en tu navegador.",
      cta1: "Explorar herramientas →",
      cta2: "¿Qué es utilbox?",
    },
    home: {
      categoriesLabel: "Categorías",
      toolsLabel: "Herramientas por categoría",
      toolsCountSuffix: "herramientas",
      viewAll: "Ver todas →",
    },
    badges: [
      { title: "100% privado", sub: "Todo corre en tu navegador" },
      { title: "Siempre gratis", sub: "Sin registro ni publicidad" },
      { title: "Instantáneo", sub: "Sin esperas ni datos externos" },
    ],
    mobileNav: {
      home: "Inicio",
      categories: "Categorías",
      about: "Acerca",
    },
    footer: {
      desc: "Plataforma de herramientas gratuitas para toda Latinoamérica. Sin registro, sin costos.",
      financeSection: "Finanzas",
      platformSection: "Plataforma",
      privacy: "Política de Privacidad",
      terms: "Términos de Uso",
      copyright: "© 2025 utilbox.lat — Herramientas gratuitas para todos",
    },
    categories: {
      finanzas: "Finanzas",
      salud: "Salud",
      hogar: "Hogar",
      educacion: "Educación",
      nutricion: "Nutrición",
      proximamente: "Más…",
    } as Record<string, string>,
  },
  en: {
    nav: {
      tools: "Tools",
      categories: "Categories",
      blog: "Blog",
      about: "About",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      label: "Tool platform for Latin America",
      title1: "A toolbox",
      title2: "for every decision",
      desc: "Free calculators, simulators and utilities for finance, health, home and more. No sign-up, no cost, all in your browser.",
      cta1: "Explore tools →",
      cta2: "What is utilbox?",
    },
    home: {
      categoriesLabel: "Categories",
      toolsLabel: "Tools by category",
      toolsCountSuffix: "tools",
      viewAll: "View all →",
    },
    badges: [
      { title: "100% private", sub: "Everything runs in your browser" },
      { title: "Always free", sub: "No sign-up, no ads" },
      { title: "Instant", sub: "No waiting, no external data" },
    ],
    mobileNav: {
      home: "Home",
      categories: "Categories",
      about: "About",
    },
    footer: {
      desc: "Free tools platform for all of Latin America. No sign-up, no costs.",
      financeSection: "Finance",
      platformSection: "Platform",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      copyright: "© 2025 utilbox.lat — Free tools for everyone",
    },
    categories: {
      finanzas: "Finance",
      salud: "Health",
      hogar: "Home",
      educacion: "Education",
      nutricion: "Nutrition",
      proximamente: "More…",
    } as Record<string, string>,
  },
};
