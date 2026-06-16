import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const distDir = path.resolve('dist');
const serverEntry = path.resolve('dist-ssr/entry-server.js');
const siteUrl = 'https://www.bartpullen.nl';
const socialImage = `${siteUrl}/portfolio.png`;
const { render } = await import(pathToFileURL(serverEntry).href);

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Bart Pullen',
  url: siteUrl,
  jobTitle: 'Webdesigner & Information Security Officer',
  sameAs: [
    'https://www.linkedin.com/in/bartpullen/',
    'https://github.com/hypetrax',
  ],
  description: 'Het persoonlijke portfolio van Bart Pullen, met focus op webdesign, cybersecurity en kwantitatieve analyse.',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Bart Pullen Portfolio',
  url: siteUrl,
  inLanguage: 'nl-NL',
  publisher: {
    '@type': 'Person',
    name: 'Bart Pullen',
  },
};

const securityServiceSchema = (pathName, name, description) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name,
  url: `${siteUrl}${pathName}`,
  areaServed: 'NL',
  provider: {
    '@type': 'Person',
    name: 'Bart Pullen',
    url: siteUrl,
  },
  description,
  serviceType: 'Information security and compliance',
});

const routes = [
  {
    path: '/',
    title: 'Bart Pullen | Security Officer, Designer, Data analyst',
    description: 'Senior Information Security Officer en Webdesigner. Expert in ISO 27001, Cyber Resilience Act en data-gedreven web development.',
    schema: [personSchema, websiteSchema],
  },
  {
    path: '/web',
    title: 'Websites die simpelweg werken | Bart Pullen',
    description: 'Moderne, snelle websites zonder overbodige ballast. Expert in React, Vite en performance optimalisatie voor MKB.',
  },
  {
    path: '/contact',
    title: 'Contact | Bart Pullen',
    description: 'Neem contact op met Bart Pullen over security, websites, data-analyse of portfolio-projecten.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact | Bart Pullen',
      url: `${siteUrl}/contact`,
      about: {
        '@type': 'Person',
        name: 'Bart Pullen',
        url: siteUrl,
      },
    },
  },
  {
    path: '/security',
    title: 'Security Officer & Compliance | Bart Pullen',
    description: 'Senior Security Officer diensten: ISO 27001:2022 implementatie en Cyber Resilience Act compliance voor digitale producten.',
    schema: securityServiceSchema('/security', 'Security Officer en compliance ondersteuning', 'Pragmatische ondersteuning voor informatiebeveiliging, ISO 27001 en Cyber Resilience Act compliance.'),
  },
  {
    path: '/security/cra',
    title: 'Cyber Resilience Act (CRA) Impact Analyse | Bart Pullen',
    description: 'Diepgaande analyse van de Cyber Resilience Act voor digitale producten. SBOM beheer, kwetsbaarheidsrapportage en compliance strategie.',
    schema: securityServiceSchema('/security/cra', 'Cyber Resilience Act impact analyse', 'Analyse en implementatie-aanpak voor Cyber Resilience Act compliance, SBOM-beheer en kwetsbaarheidsrapportage.'),
  },
  {
    path: '/security/iso27001',
    title: 'ISO 27001 Implementatie Aanpak | Bart Pullen',
    description: 'Pragmatische ISO 27001:2022 implementatie met focus op risicomanagement, ISMS-inrichting en werkbare security governance.',
    schema: securityServiceSchema('/security/iso27001', 'ISO 27001 implementatie ondersteuning', 'Ondersteuning bij ISO 27001:2022 implementatie, ISMS-inrichting, risicomanagement en security governance.'),
  },
  {
    path: '/labs',
    title: 'Labs & Quantitative Research | Bart Pullen',
    description: 'Exploratie van systematische trading strategieën, SPX optie backtests en institutionele orderflow analyse (ICT). Data-gedreven financiële inzichten.',
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
    title: 'ICT Turtle Soup Setup Masterclass | Bart Pullen',
    description: 'Interactieve masterclass over ICT Turtle Soup, liquiditeits-sweeps, market structure shifts en fair value gaps.',
  },
  {
    path: '/labs/ict',
    title: 'ICT Trading Strategy Masterclass | Bart Pullen',
    description: 'Gids over ICT trading concepten, institutionele orderflow, liquidity sweeps, fair value gaps en order blocks.',
  },
];

const notFoundRoute = {
  path: '/404',
  title: 'Pagina niet gevonden | Bart Pullen',
  description: 'Deze pagina bestaat niet of is verplaatst.',
  noindex: true,
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function removeExistingSeo(html) {
  return html
    .replace(/\s*<title>.*?<\/title>/is, '')
    .replace(/\s*<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, '')
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/\s*<meta\s+property=["']og:(title|description|type|url|image|site_name)["'][^>]*>/gi, '')
    .replace(/\s*<meta\s+name=["']twitter:(card|title|description|image)["'][^>]*>/gi, '')
    .replace(/\s*<script\s+type=["']application\/ld\+json["'][^>]*>.*?<\/script>/gis, '');
}

function seoHead(route) {
  const canonical = route.path === '/404' ? `${siteUrl}/404` : `${siteUrl}${route.path === '/' ? '/' : route.path}`;
  const schema = route.schema ? (Array.isArray(route.schema) ? route.schema : [route.schema]) : [];

  return [
    `    <title>${escapeHtml(route.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(route.description)}" />`,
    route.noindex ? '    <meta name="robots" content="noindex,follow" />' : '',
    `    <link rel="canonical" href="${canonical}" />`,
    '    <meta property="og:type" content="website" />',
    `    <meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(route.description)}" />`,
    '    <meta property="og:site_name" content="Bart Pullen" />',
    `    <meta property="og:url" content="${canonical}" />`,
    `    <meta property="og:image" content="${socialImage}" />`,
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `    <meta name="twitter:image" content="${socialImage}" />`,
    ...schema.map((item) => `    <script type="application/ld+json">${JSON.stringify(item)}</script>`),
  ].filter(Boolean).join('\n');
}

function withSeo(html, route) {
  const stripped = removeExistingSeo(html);
  const htmlWithSeo = stripped.replace('  </head>', `${seoHead(route)}\n  </head>`);
  return htmlWithSeo.replace('<div id="root"></div>', `<div id="root">${renderBody(route.path)}</div>`);
}

function renderBody(pathName) {
  return render(pathName)
    .replace(/\s*<title>.*?<\/title>/gis, '')
    .replace(/\s*<meta\s+[^>]*>/gi, '')
    .replace(/\s*<link\s+[^>]*>/gi, '')
    .replace(/\s*<script\s+type=["']application\/ld\+json["'][^>]*>.*?<\/script>/gis, '');
}

async function writeRoute(html, route) {
  const relativePath = route.path === '/' ? 'index.html' : path.join(route.path.slice(1), 'index.html');
  const target = path.join(distDir, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, withSeo(html, route), 'utf8');
}

const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');

for (const route of routes) {
  await writeRoute(baseHtml, route);
}

await writeFile(path.join(distDir, '404.html'), withSeo(baseHtml, notFoundRoute), 'utf8');
