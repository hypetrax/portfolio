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

async function readRequired(filePath) {
  try {
    return await readFile(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Missing required file: ${path.relative(root, filePath)}`);
  }
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

await stat(path.join(distDir, 'llms.txt')).catch(() => {
  throw new Error('dist/llms.txt is missing');
});

const vercelConfig = JSON.parse(await readRequired(path.join(root, 'vercel.json')));
const assetHeader = vercelConfig.headers?.find((entry) => entry.source === '/assets/(.*)');
const cacheHeader = assetHeader?.headers?.find((header) => header.key.toLowerCase() === 'cache-control');

if (!cacheHeader?.value.includes('immutable')) {
  throw new Error('vercel.json is missing immutable Cache-Control headers for /assets/(.*)');
}

console.log('SEO build verification passed');
