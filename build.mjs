// Build step (run on a desktop, not in the grader): lay the stories out as HTML, then let headless Chrome
// photograph the page at exactly 1024 x 1024 into entry.png. main.ts only ships the finished picture.
//
//   node build.mjs            -> out/page.html and entry.png
//   CHROME=/path/to/chrome node build.mjs

import { writeFileSync, mkdirSync, existsSync, statSync, copyFileSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { renderPage } from './src/page.mjs';
import { day } from './src/stories.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'out');
mkdirSync(out, { recursive: true });

const html = renderPage(day);
const pagePath = join(out, 'page.html');
writeFileSync(pagePath, html);

const candidates = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found: set CHROME to its path');

const shot = join(out, 'shot.png');
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--window-size=1024,1024', '--default-background-color=00000000', `--user-data-dir=${join(out, 'chrome-profile')}`,
  `--screenshot=${shot}`, 'file:///' + resolve(pagePath).replace(/\\/g, '/'),
], { stdio: 'ignore', timeout: 60000 });

// Sanity checks the gate will make: PNG signature, 1024 x 1024 from the IHDR chunk, at most 1 MiB.
const png = readFileSync(shot);
const signature = png.subarray(0, 8).toString('hex');
if (signature !== '89504e470d0a1a0a') throw new Error('screenshot is not a PNG');
const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
if (width !== 1024 || height !== 1024) throw new Error(`screenshot is ${width}x${height}, not 1024x1024`);
if (statSync(shot).size > 1048576) throw new Error(`screenshot is ${statSync(shot).size} bytes, over 1 MiB`);

// Text that runs past its box is clipped silently on the page, so ask Chrome where every block ends and
// stop the build if any card's content, list line or the footer spills out of its frame.
const probe = html.replace('</body>', `<script>
  const bad = [];
  const outOf = (el, box) => el.getBoundingClientRect().bottom > box.getBoundingClientRect().bottom + 0.5;
  document.querySelectorAll('.lead, .card').forEach((box, i) => {
    const last = box.lastElementChild;
    if (outOf(last, box)) bad.push((box.className) + ' ' + (i + 1) + ': ' + box.querySelector('h2, h3').textContent);
  });
  document.querySelectorAll('.cols li span').forEach((s) => { if (s.scrollWidth > s.parentElement.clientWidth - 18) bad.push('list: ' + s.textContent); });
  document.querySelectorAll('.list, .map').forEach((box) => { [...box.querySelectorAll('li, .legend')].forEach((el) => { if (outOf(el, box)) bad.push('bottom: ' + el.textContent); }); });
  const foot = document.querySelector('.foot');
  if (foot.getBoundingClientRect().bottom > 1024 || foot.scrollWidth > foot.clientWidth) bad.push('footer');
  document.body.setAttribute('data-overflow', JSON.stringify(bad));
</script></body>`);
const probePath = join(out, 'probe.html');
writeFileSync(probePath, probe);
const dom = execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--window-size=1024,1024', `--user-data-dir=${join(out, 'chrome-profile')}`,
  '--dump-dom', 'file:///' + resolve(probePath).replace(/\\/g, '/'),
], { encoding: 'utf8', timeout: 60000 });
const found = dom.match(/data-overflow="([^"]*)"/);
const overflow = found ? JSON.parse(found[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&')) : ['probe did not run'];
if (overflow.length) {
  console.error('text spills out of its box:\n  ' + overflow.join('\n  '));
  if (!process.env.ALLOW_OVERFLOW) process.exit(1);
}

copyFileSync(shot, join(root, 'entry.png'));
const count = day.leads.length + day.cards.length + day.briefs.length;
console.log(`entry.png ${width}x${height}, ${statSync(shot).size} bytes, ${count} stories`);
