import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');

const requiredRouteChecks = [
  { file: 'index.html', text: 'Ik regel' },
  { file: path.join('web', 'index.html'), text: 'Websites die simpelweg werken' },
  { file: path.join('security', 'index.html'), text: 'Security Officer' },
  { file: path.join('labs', 'index.html'), text: 'Labs' },
];

const canonicalHost = 'https://www.bartpullen.nl';

const requiredSeoFiles = [
  'index.html',
  path.join('web', 'index.html'),
  path.join('security', 'index.html'),
  path.join('labs', 'index.html'),
];

const requiredRouteTitles = [
  {
    file: path.join('web', 'index.html'),
    title: 'Websites die simpelweg werken | Bart Pullen',
  },
  {
    file: path.join('security', 'index.html'),
    title: 'Security Officer & Compliance | Bart Pullen',
  },
  {
    file: path.join('labs', 'index.html'),
    title: 'Labs & Quantitative Research | Bart Pullen',
  },
];

async function readRequired(filePath) {
  try {
    return await readFile(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Missing required file: ${path.relative(root, filePath)}`);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

for (const check of requiredRouteChecks) {
  const html = await readRequired(path.join(distDir, check.file));
  if (!html.includes(check.text)) {
    throw new Error(`${check.file} does not contain prerendered body text: ${check.text}`);
  }
  if (html.includes('<div id="root"></div>')) {
    throw new Error(`${check.file} still has an empty root element`);
  }
}

for (const file of requiredSeoFiles) {
  const html = await readRequired(path.join(distDir, file));
  if (!html.includes(`rel="canonical" href="${canonicalHost}`)) {
    throw new Error(`${file} is missing a www canonical URL`);
  }
  if (!html.includes(`property="og:url" content="${canonicalHost}`)) {
    throw new Error(`${file} is missing a www OpenGraph URL`);
  }
  if (!html.includes(`property="og:image" content="${canonicalHost}/portfolio.png"`)) {
    throw new Error(`${file} is missing a www OpenGraph image URL`);
  }
}

for (const check of requiredRouteTitles) {
  const html = await readRequired(path.join(distDir, check.file));
  if (!html.includes(`<title>${escapeHtml(check.title)}</title>`)) {
    throw new Error(`${check.file} does not contain the expected route title: ${check.title}`);
  }
}

await stat(path.join(distDir, 'llms.txt')).catch(() => {
  throw new Error('dist/llms.txt is missing');
});

const sitemap = await readRequired(path.join(distDir, 'sitemap.xml'));
if (!sitemap.includes(`<loc>${canonicalHost}/</loc>`) || sitemap.includes('https://bartpullen.nl')) {
  throw new Error('dist/sitemap.xml must use only www canonical URLs');
}

const robots = await readRequired(path.join(distDir, 'robots.txt'));
if (!robots.includes(`Sitemap: ${canonicalHost}/sitemap.xml`)) {
  throw new Error('dist/robots.txt must point to the www sitemap URL');
}

const llms = await readRequired(path.join(distDir, 'llms.txt'));
if (!llms.includes(`Site: ${canonicalHost}`) || llms.includes('https://bartpullen.nl')) {
  throw new Error('dist/llms.txt must use only www canonical URLs');
}

const vercelConfig = JSON.parse(await readRequired(path.join(root, 'vercel.json')));
const assetHeader = vercelConfig.headers?.find((entry) => entry.source === '/assets/(.*)');
const cacheHeader = assetHeader?.headers?.find((header) => header.key.toLowerCase() === 'cache-control');

if (!cacheHeader?.value.includes('immutable')) {
  throw new Error('vercel.json is missing immutable Cache-Control headers for /assets/(.*)');
}

console.log('SEO build verification passed');
