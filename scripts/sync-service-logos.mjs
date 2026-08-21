import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outputDir = path.join(root, 'public', 'services');
const files = [
  ['chatgpt', 'ChatGPT', 'OpenAI_logo_2025_(symbol).svg'],
  ['netflix', 'Netflix', 'Netflix_2015_logo.svg'],
  ['spotify', 'Spotify', 'Spotify_logo_with_text.svg'],
  ['hbo-max', 'HBO Max', 'HBO_Max_(2025).svg'],
  ['crunchyroll', 'Crunchyroll', 'Crunchyroll_2024.svg'],
  ['apple-tv-plus', 'Apple TV+', 'Apple_TV_Plus_Logo.svg'],
  ['disney-plus', 'Disney+', 'Disney+_2024.svg'],
  ['amazon-prime', 'Amazon Prime', 'Amazon_Prime_logo_(2024).svg'],
  ['youtube-music', 'YouTube Music', 'YouTube_Music_full_logo.svg'],
  ['steam', 'Steam', 'Steam_icon_logo.svg'],
  ['nintendo-switch', 'Nintendo Switch', 'Nintendo_Switch_logo.svg'],
  ['playstation', 'PlayStation', 'PlayStation_logo_and_wordmark.svg'],
  ['xbox-game-pass', 'Xbox Game Pass', 'Xbox_Game_Pass_new_logo_-_colored_version.svg'],
];
const userAgent = 'GameMasterCatalog/1.0 (https://game-master-digital-mx.mastr-z3ro.chatgpt.site; visual catalog maintenance)';

await mkdir(outputDir, { recursive: true });
const sources = [];
for (const [slug, name, file] of files) {
  const sourcePage = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
  const downloadUrl = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
  const response = await fetch(downloadUrl, { headers: { 'user-agent': userAgent } });
  if (!response.ok) throw new Error(`${name}: ${response.status} ${response.statusText}`);
  const svg = await response.text();
  if (!svg.includes('<svg')) throw new Error(`${name}: el archivo recibido no es SVG`);
  await writeFile(path.join(outputDir, `${slug}.svg`), svg);
  sources.push({ name, localPath: `/services/${slug}.svg`, sourcePage, downloadUrl: response.url });
  console.log(`OK ${name}`);
}
await writeFile(path.join(outputDir, 'sources.json'), `${JSON.stringify({ generatedAt: new Date().toISOString(), sources }, null, 2)}\n`);
