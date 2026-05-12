// monitor-comunidades.js
// Monitorea comunidades buscando preguntas sobre los nichos de utilbox.lat.
// Requiere Node.js v18+ (fetch global). Sin dependencias externas.
// Uso: node monitor-comunidades.js

const { writeFileSync } = require('node:fs');

// ─── CONFIGURACIÓN ───────────────────────────────────────────────────────────

const MAX_PER_NICHE = 5;

// Señales que indican que un título es una pregunta
const QUESTION_SIGNALS = [
  '?', '¿',
  'cómo', 'como',
  'cuánto', 'cuanto', 'cuánta', 'cuanta',
  'qué', 'cuál', 'cual',
  'dónde', 'donde',
  'debería', 'deberia',
  'alguien', 'ayuda', 'consejo', 'recomiendan', 'necesito',
];

const NICHES = {
  FINANZAS: [
    'ahorro', 'inversión', 'inversion', 'préstamo', 'prestamo', 'deuda',
    'jubilación', 'jubilacion', 'roi', 'interés compuesto', 'interes compuesto',
    'hipoteca', 'crédito', 'credito', 'cuota', 'tasa', 'dividendos', 'acciones',
    'bolsa', 'crypto', 'presupuesto', 'retiro', 'pensión', 'pension', 'moneda',
    'tipo de cambio',
  ],
  SALUD: [
    'imc', 'calorías', 'calorias', 'peso', 'dieta', 'ejercicio', 'sueño', 'sueno',
    'presión arterial', 'presion arterial', 'embarazo', 'macros', 'proteína',
    'proteina', 'hidratación', 'hidratacion', 'metabolismo', 'grasa corporal',
    'masa muscular',
  ],
  HOGAR: [
    'hipoteca', 'alquiler', 'remodelación', 'remodelacion', 'electricidad',
    'pintura', 'mudanza', 'mascota', 'energía solar', 'energia solar',
    'mantenimiento', 'metros cuadrados',
  ],
  EDUCACIÓN: [
    'promedio', 'notas', 'universidad', 'posgrado', 'beca', 'deuda estudiantil',
    'carrera', 'productividad', 'horas de estudio',
  ],
  NUTRICIÓN: [
    'ayuno intermitente', 'calorías', 'calorias', 'proteína', 'proteina',
    'déficit calórico', 'deficit calorico', 'índice glucémico', 'indice glucemico',
    'receta', 'porciones', 'alcohol', 'cafeína', 'cafeina',
  ],
  MARKETING: [
    'engagement', 'hashtags', 'roi campaña', 'roi campana', 'tarifa freelancer',
    'seo', 'redes sociales', 'conversión', 'conversion',
  ],
  TECH: [
    'contraseña', 'contrasena', 'json', 'código qr', 'codigo qr', 'qr code',
    'programación', 'programacion', 'api', 'base64', 'dominio',
  ],
  GENERADORES: [
    'nombre empresa', 'nombre de empresa', 'nombre bebé', 'nombre bebe',
    'nombre usuario', 'nombre de usuario', 'ideas de negocio', 'ideas para',
  ],
};

// type: 'atom'    → <entry> (Reddit, YouTube)
// type: 'rss2'   → <item>  (Google News, forocoches, hipertextual)
// type: 'sitemap'→ <url>   (Quora)
const SOURCES = [
  // ── Reddit ──────────────────────────────────────────────────────────────
  { url: 'https://www.reddit.com/r/ecuador/new/.rss',              name: 'r/ecuador',              type: 'atom' },
  { url: 'https://www.reddit.com/r/mexico/new/.rss',               name: 'r/mexico',               type: 'atom' },
  { url: 'https://www.reddit.com/r/colombia/new/.rss',             name: 'r/colombia',             type: 'atom' },
  { url: 'https://www.reddit.com/r/latinoamerica/new/.rss',        name: 'r/latinoamerica',        type: 'atom' },
  { url: 'https://www.reddit.com/r/personalfinance/new/.rss',      name: 'r/personalfinance',      type: 'atom' },
  { url: 'https://www.reddit.com/r/fitness/new/.rss',              name: 'r/fitness',              type: 'atom' },
  { url: 'https://www.reddit.com/r/homeimprovement/new/.rss',      name: 'r/homeimprovement',      type: 'atom' },
  { url: 'https://www.reddit.com/r/education/new/.rss',            name: 'r/education',            type: 'atom' },
  { url: 'https://www.reddit.com/r/nutrition/new/.rss',            name: 'r/nutrition',            type: 'atom' },
  { url: 'https://www.reddit.com/r/digitalnomad/new/.rss',         name: 'r/digitalnomad',         type: 'atom' },
  { url: 'https://www.reddit.com/r/AskLatAm/new/.rss',             name: 'r/AskLatAm',             type: 'atom' },
  { url: 'https://www.reddit.com/r/personalfinancemexico/new/.rss', name: 'r/pfmexico',             type: 'atom' },
  { url: 'https://www.reddit.com/r/SpanishAskReddit/new/.rss',     name: 'r/SpanishAskReddit',     type: 'atom' },
  { url: 'https://www.reddit.com/r/losangeles/new/.rss',           name: 'r/losangeles',           type: 'atom' },
  { url: 'https://www.reddit.com/r/NoStupidQuestions/new/.rss',    name: 'r/NoStupidQuestions',    type: 'atom' },
  { url: 'https://www.reddit.com/r/HealthyFood/new/.rss',          name: 'r/HealthyFood',          type: 'atom' },
  { url: 'https://www.reddit.com/r/DIY/new/.rss',                  name: 'r/DIY',                  type: 'atom' },
  { url: 'https://www.reddit.com/r/Frugal/new/.rss',               name: 'r/Frugal',               type: 'atom' },
  // ── Quora vía Google News ────────────────────────────────────────────────
  {
    url: 'https://news.google.com/rss/search?q=quora+finanzas+personales+site:quora.com&hl=es&gl=EC&ceid=EC:es',
    name: 'Quora/finanzas',
    type: 'rss2',
  },
  {
    url: 'https://news.google.com/rss/search?q=quora+salud+ejercicio+site:quora.com&hl=es&gl=EC&ceid=EC:es',
    name: 'Quora/salud',
    type: 'rss2',
  },
  {
    url: 'https://news.google.com/rss/search?q=quora+hogar+remodelacion+site:quora.com&hl=es&gl=EC&ceid=EC:es',
    name: 'Quora/hogar',
    type: 'rss2',
  },
  // ── YouTube ──────────────────────────────────────────────────────────────
  { url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCeYcihvPCEqjMZe-sMTqo2A', name: 'YT/finanzas-1', type: 'atom' },
  { url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCBcRF18a7Qf58cCRy5xuWwQ', name: 'YT/finanzas-2', type: 'atom' },
  // ── Foros públicos ────────────────────────────────────────────────────────
  { url: 'https://www.forocoches.com/foro/external.php?type=RSS2', name: 'ForoCoches',    type: 'rss2' },
  { url: 'https://feeds.feedburner.com/hipertextual',              name: 'Hipertextual',  type: 'rss2' },
];

const FETCH_TIMEOUT_MS = 12000;

// ─── FETCH ───────────────────────────────────────────────────────────────────

async function fetchSource(source) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; utilbox-monitor/1.0; +https://utilbox.lat)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    return { source, text };
  } catch (err) {
    return { source, error: err.message };
  } finally {
    clearTimeout(timer);
  }
}

// ─── PARSERS ─────────────────────────────────────────────────────────────────

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

// Atom feeds: Reddit, YouTube
function parseAtom(text) {
  const items = [];
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = entryRe.exec(text)) !== null) {
    const block = m[1];
    const titleM = block.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
    if (!titleM) continue;
    const title = decodeEntities(titleM[1].trim());

    const linkM =
      block.match(/<link[^>]+rel=["']alternate["'][^>]+href=["']([^"']+)["']/) ||
      block.match(/<link[^>]+href=["']([^"']+)["']/);
    if (!linkM) continue;

    if (title && linkM[1]) items.push({ title, link: linkM[1] });
  }
  return items;
}

// RSS 2.0 feeds: Google News, forocoches, hipertextual
function parseRSS2(text) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(text)) !== null) {
    const block = m[1];
    const titleM = block.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
    if (!titleM) continue;
    const title = decodeEntities(titleM[1].trim());

    // <link> in RSS 2.0 contains the URL as text content
    const linkM = block.match(/<link[^>]*>(?:<!\[CDATA\[)?(https?:\/\/[^\s<\]]+?)(?:\]\]>)?<\/link>/);
    if (!linkM) continue;

    if (title && linkM[1]) items.push({ title, link: linkM[1].trim() });
  }
  return items;
}

// Sitemap feeds: Quora (fallback, may 403)
function parseSitemap(text) {
  const items = [];
  const urlRe = /<url>([\s\S]*?)<\/url>/g;
  let m;
  while ((m = urlRe.exec(text)) !== null) {
    const block = m[1];
    const locM = block.match(/<loc>([\s\S]*?)<\/loc>/);
    if (!locM) continue;
    const link = decodeEntities(locM[1].trim());
    try {
      const path = decodeURIComponent(new URL(link).pathname);
      const title = path.replace(/^\//, '').replace(/-/g, ' ').replace(/\?/g, '¿').trim();
      if (title) items.push({ title, link });
    } catch {
      // skip malformed URLs
    }
  }
  return items;
}

function parse(source, text) {
  if (source.type === 'sitemap') return parseSitemap(text);
  if (source.type === 'rss2') return parseRSS2(text);
  return parseAtom(text);
}

// ─── FILTROS ─────────────────────────────────────────────────────────────────

function isQuestion(title) {
  const lower = title.toLowerCase();
  return QUESTION_SIGNALS.some((s) => lower.includes(s));
}

function matchNiches(title) {
  const lower = title.toLowerCase();
  const hits = {};
  for (const [niche, keywords] of Object.entries(NICHES)) {
    for (const kw of keywords) {
      if (lower.includes(kw.toLowerCase())) {
        (hits[niche] = hits[niche] || []).push(kw);
      }
    }
  }
  return hits;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  const now = new Date();
  const stamp = now.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });

  console.log(`\n  utilbox — Monitor de Comunidades`);
  console.log(`  ${stamp}`);
  console.log(`  Consultando ${SOURCES.length} fuentes en paralelo...\n`);

  const results = await Promise.all(SOURCES.map(fetchSource));

  // ── Fetch status ───────────────────────────────────────────────────────────
  let okCount = 0;
  for (const r of results) {
    if (r.error) {
      console.log(`  ✗  ${r.source.name.padEnd(22)} ${r.error}`);
    } else {
      console.log(`  ✓  ${r.source.name.padEnd(22)} OK`);
      okCount++;
    }
  }

  // ── Parse, filter, group ──────────────────────────────────────────────────
  // grouped stores ALL matches (not limited); limit applied at display time
  const grouped = {}; // { NICHE: [{ title, link, source, keywords }] }
  let totalQuestions = 0;

  for (const r of results) {
    if (!r.text) continue;
    const items = parse(r.source, r.text);
    for (const item of items) {
      if (!isQuestion(item.title)) continue;
      const hits = matchNiches(item.title);
      for (const [niche, keywords] of Object.entries(hits)) {
        (grouped[niche] = grouped[niche] || []).push({
          title: item.title,
          link: item.link,
          source: r.source.name,
          keywords,
        });
      }
      if (Object.keys(hits).length > 0) totalQuestions++;
    }
  }

  // ── Summary stats ─────────────────────────────────────────────────────────
  const topNiches = Object.entries(grouped)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3);

  // ── Build file output (all results, no truncation) ────────────────────────
  const nicheOrder = Object.keys(NICHES);

  let fileOut = '';
  fileOut += `${'═'.repeat(72)}\n`;
  fileOut += `UTILBOX — MONITOR DE COMUNIDADES\n`;
  fileOut += `Fecha           : ${stamp}\n`;
  fileOut += `Fuentes OK      : ${okCount} / ${SOURCES.length}\n`;
  fileOut += `Preguntas totales: ${totalQuestions}\n`;
  fileOut += `Top nichos      : ${topNiches.map(([n, a]) => `${n} (${a.length})`).join('  ·  ') || '—'}\n`;
  fileOut += `${'═'.repeat(72)}\n\n`;

  for (const niche of nicheOrder) {
    const items = grouped[niche];
    if (!items || items.length === 0) continue;
    fileOut += `${'─'.repeat(72)}\n`;
    fileOut += `▶  ${niche}  (${items.length} pregunta${items.length !== 1 ? 's' : ''})\n`;
    fileOut += `${'─'.repeat(72)}\n`;
    for (const item of items) {
      fileOut += `\n  Título   : ${item.title}\n`;
      fileOut += `  Fuente   : ${item.source}\n`;
      fileOut += `  Keywords : ${item.keywords.join(', ')}\n`;
      fileOut += `  Link     : ${item.link}\n`;
    }
    fileOut += '\n';
  }

  fileOut += `${'═'.repeat(72)}\n`;
  fileOut += `Fin del reporte — ${stamp}\n`;
  fileOut += `${'═'.repeat(72)}\n`;

  // ── Console output (max MAX_PER_NICHE por nicho) ──────────────────────────
  console.log();

  if (totalQuestions === 0) {
    console.log('  Sin preguntas que coincidan con las keywords configuradas.\n');
  } else {
    for (const niche of nicheOrder) {
      const items = grouped[niche];
      if (!items || items.length === 0) continue;

      const shown = items.slice(0, MAX_PER_NICHE);
      const hidden = items.length - shown.length;

      console.log(`\n${'─'.repeat(64)}`);
      console.log(`  ${niche}  (${items.length} pregunta${items.length !== 1 ? 's' : ''})`);
      console.log(`${'─'.repeat(64)}`);

      for (const item of shown) {
        console.log(`\n  ${item.title}`);
        console.log(`  ${item.source}  ·  ${item.keywords.join(', ')}`);
        console.log(`  ${item.link}`);
      }

      if (hidden > 0) {
        console.log(`\n  ... y ${hidden} más — ver resultados-comunidades.txt`);
      }
    }
  }

  // ── Resumen final ─────────────────────────────────────────────────────────
  console.log(`\n${'═'.repeat(64)}`);
  console.log(`  RESUMEN`);
  console.log(`${'═'.repeat(64)}`);
  console.log(`  Fuentes consultadas : ${SOURCES.length}  (OK: ${okCount})`);
  console.log(`  Preguntas encontradas: ${totalQuestions}`);
  if (topNiches.length > 0) {
    console.log(`  Top nichos del día  :`);
    topNiches.forEach(([niche, arr], i) => {
      console.log(`    ${i + 1}. ${niche.padEnd(14)} ${arr.length} pregunta${arr.length !== 1 ? 's' : ''}`);
    });
  }
  console.log(`${'═'.repeat(64)}\n`);

  // ── Guardar archivo ────────────────────────────────────────────────────────
  const filename = 'resultados-comunidades.txt';
  writeFileSync(filename, fileOut, 'utf8');
  console.log(`  Resultados completos guardados en: ${filename}\n`);
}

main().catch((err) => {
  console.error('Error fatal:', err.message);
  process.exit(1);
});
