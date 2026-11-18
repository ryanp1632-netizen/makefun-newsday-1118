// Drawn scenes for the three lead stories, each 323 x 124. One function per scene, plain SVG.

import { flag, icon, star } from './art.mjs';

const W = 323, H = 124;
const wrap = (body, bg = '#e9eef5') => `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="${bg}"/>${body}</svg>`;

function skyline(y, colour, seed = 3) {
  let s = '', x = 0, k = seed;
  while (x < W) {
    k = (k * 9301 + 49297) % 233280;
    const w = 14 + (k % 22);
    const h = 18 + ((k >> 3) % 46);
    s += `<rect x="${x}" y="${y - h}" width="${w - 2}" height="${h}" fill="${colour}"/>`;
    for (let wy = y - h + 5; wy < y - 6; wy += 8) for (let wx = x + 3; wx < x + w - 5; wx += 6) {
      if (((wx * 7 + wy * 3 + k) % 5) < 2) s += `<rect x="${wx}" y="${wy}" width="2.4" height="3" fill="#fde68a" opacity=".85"/>`;
    }
    x += w;
  }
  return s;
}

const SCENES = {
  // APEC leaders gather in Shenzhen: skyline at dusk, a summit stage with the host's banner and leaders' flags.
  apec() {
    const flags = ['cn', 'us', 'ru', 'jp', 'kr', 'au', 'id'];
    let s = `<defs><linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs>`;
    s += `<rect width="${W}" height="${H}" fill="url(#dusk)"/>`;
    s += skyline(92, '#172554', 7);
    s += `<rect x="0" y="92" width="${W}" height="32" fill="#0f1d3a"/>`;
    s += `<rect x="62" y="70" width="200" height="22" rx="2" fill="#b91c1c"/><text x="162" y="85" text-anchor="middle" font-family="Segoe UI, Arial" font-size="11" font-weight="800" letter-spacing="2" fill="#fff">APEC 2026 · SHENZHEN</text>`;
    flags.forEach((c, i) => {
      const x = 34 + i * 40;
      s += `<path d="M${x} 120V96" stroke="#cbd5e1" stroke-width="1.6"/>` + flag(c, x + 1, 96, 26, 17);
    });
    return wrap(s);
  },

  // UK inflation: a price tag line climbing to 3.6%, with a fuel pump for the petrol and diesel push.
  inflation() {
    let s = `<rect width="${W}" height="${H}" fill="#f1f5f9"/>`;
    const pts = [[20, 92], [62, 88], [104, 84], [146, 86], [188, 74], [230, 62], [262, 40]];
    s += `<path d="M14 104H300" stroke="#94a3b8" stroke-width="1"/>`;
    s += `<path d="${pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('')}" stroke="#b5121b" stroke-width="4" fill="none" stroke-linejoin="round"/>`;
    s += `<path d="${pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('')}L262 104L20 104Z" fill="#b5121b" opacity=".1"/>`;
    s += `<circle cx="262" cy="40" r="6" fill="#b5121b"/>`;
    s += `<rect x="196" y="12" width="66" height="22" rx="3" fill="#0f1d3a"/><text x="229" y="28" text-anchor="middle" font-family="Georgia" font-size="16" font-weight="700" fill="#fff">3.6%</text>`;
    s += flag('gb', 20, 14, 40, 26);
    s += icon('oil', 280, 50, 36, '#0f1d3a');
    s += `<text x="20" y="118" font-family="Segoe UI, Arial" font-size="9.5" fill="#475569">CPI, 12-month rate · October</text>`;
    return wrap(s);
  },

  // Voyager 1 one light-day out: the Sun and Earth at left, the probe far right, a dashed light path between.
  voyager() {
    let s = `<rect width="${W}" height="${H}" fill="#020617"/>`;
    for (let i = 0; i < 70; i++) {
      const x = (i * 97) % W, y = (i * 53) % H;
      s += `<circle cx="${x}" cy="${y}" r="${(i % 3) * 0.4 + 0.4}" fill="#fff" opacity="${0.3 + (i % 4) * 0.15}"/>`;
    }
    s += `<circle cx="22" cy="62" r="12" fill="#fbbf24"/><circle cx="48" cy="70" r="4.5" fill="#3b82f6"/>`;
    s += `<path d="M54 68L246 52" stroke="#fde68a" stroke-width="1.6" stroke-dasharray="5 4"/>`;
    s += `<text x="150" y="50" text-anchor="middle" font-family="Segoe UI, Arial" font-size="11" font-weight="700" fill="#fde68a">1 light-day · 25.9 bn km</text>`;
    // the probe: dish, bus and booms
    s += `<g transform="translate(262 52)"><path d="M-14 -10a16 16 0 0 1 0 20z" fill="#e5e7eb"/><rect x="-6" y="-4" width="12" height="8" fill="#9ca3af"/><path d="M6 0h26M0 4l12 18M0 -4l10 -16" stroke="#d1d5db" stroke-width="1.4"/></g>`;
    return wrap(s, '#020617');
  },
};

export function scene(name) {
  const draw = SCENES[name];
  if (!draw) throw new Error(`no scene drawn for ${name}`);
  return draw();
}

export const sceneNames = Object.keys(SCENES);
export { star };
