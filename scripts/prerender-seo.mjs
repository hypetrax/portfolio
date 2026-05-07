import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const siteUrl = 'https://www.bartpullen.nl';
const defaultImage = `${siteUrl}/portfolio.png`;

const routes = [
  {
    path: '/',
    title: 'Bart Pullen | Security Officer, Webdesigner & Data Analist',
    description: 'Portfolio van Bart Pullen: Senior Information Security Officer, webdesigner en data analist met werk rond ISO 27001, Cyber Resilience Act, React websites en trading research.',
  },
  {
    path: '/web',
    title: 'Webdesign & React Websites | Bart Pullen',
    description: 'Moderne, snelle websites voor MKB en lokale organisaties. Bart Pullen bouwt React websites met heldere structuur, mobile-first UX, performance en technische SEO.',
  },
  {
    path: '/security',
    title: 'Security Officer & Compliance | Bart Pullen',
    description: 'Senior Information Security Officer met focus op ISO 27001:2022, ISMS inrichting, Cyber Resilience Act compliance en werkbare security governance.',
  },
  {
    path: '/security/cra',
    title: 'Cyber Resilience Act (CRA) Impact Analyse | Bart Pullen',
    description: 'Diepgaande analyse van de Cyber Resilience Act voor digitale producten. SBOM beheer, kwetsbaarheidsrapportage en compliance strategie.',
  },
  {
    path: '/security/iso27001',
    title: 'ISO 27001:2022 Implementatie & ISMS Management | Bart Pullen',
    description: 'Pragmatische implementatie van ISO 27001:2022. Van nulmeting en risicoanalyse tot certificering en continue verbetering van informatiebeveiliging.',
  },
  {
    path: '/labs',
    title: 'Labs & Trading Research | Bart Pullen',
    description: 'Exploratie van systematische trading strategieen, SPX optie backtests en institutionele orderflow analyse (ICT). Data-gedreven financiele inzichten.',
  },
  {
    path: '/labs/spx',
    title: 'SPX Options Backtest Study - 45 DTE Optimization | Bart Pullen',
    description: "Kwantitatief onderzoek naar SPX Credit Spreads. Analyse van DTE, winstratio's en mechanisch trade management.",
  },
  {
    path: '/labs/squeeze',
    title: 'Stacked Probabilities Swing Playbook - Systematic Trading | Bart Pullen',
    description: 'Een systematisch trading framework gebaseerd op de TTM Squeeze, EMA stacks en optie credit spreads. Focus op probabilistische groei.',
  },
  {
    path: '/labs/turtlesoup',
    title: 'ICT Turtle Soup Strategy Simulator - Liquidity Sweeps | Bart Pullen',
    description: 'Interactieve simulator voor de Turtle Soup strategie. Leer hoe je liquidity raids, stop hunts en market structure shifts herkent in grafieken.',
  },
  {
    path: '/labs/ict',
    title: 'ICT Trading Strategy & Smart Money Concepts Masterclass | Bart Pullen',
    description: 'Diepgaande gids over de Inner Circle Trader (ICT) methodologie. Leer over Liquidity Pools, Order Blocks, Fair Value Gaps en institutional orderflow.',
  },
];

const templatePath = path.join(distDir, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const routeUrl = (routePath) => `${siteUrl}${routePath === '/' ? '/' : routePath}`;

const renderMeta = (route) => {
  const canonical = routeUrl(route.path);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  return `<!-- SEO_META_START -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="Bart Pullen" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="nl_NL" />
    <meta property="og:site_name" content="Bart Pullen" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${defaultImage}" />
    <meta property="og:image:alt" content="Bart Pullen portfolio" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${defaultImage}" />
    <!-- SEO_META_END -->`;
};

const replaceMeta = (html, route) =>
  html.replace(/<!-- SEO_META_START -->[\s\S]*?<!-- SEO_META_END -->/, renderMeta(route));

for (const route of routes) {
  const html = replaceMeta(template, route);
  if (route.path === '/') {
    fs.writeFileSync(templatePath, html);
    continue;
  }

  const routeDir = path.join(distDir, route.path.slice(1));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
  fs.writeFileSync(path.join(distDir, `${route.path.slice(1)}.html`), html);
}

console.log(`Generated static SEO HTML for ${routes.length} routes.`);
