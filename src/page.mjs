// Lays one day's stories out as a 1024 x 1024 front page: masthead, figures strip, three drawn leads,
// ten banner cards, a pinned world map beside the numbered short list, and a footer.

import { banner } from './art.mjs';
import { makeProjection, landPaths, spreadPins, pinLayer } from './worldmap.mjs';
import { scene } from './scenes.mjs';

export const CATEGORIES = {
  war: { colour: '#c8102e', label: 'War & security' },
  politics: { colour: '#1d4ed8', label: 'Politics' },
  economy: { colour: '#15803d', label: 'Economy & tech' },
  planet: { colour: '#0e7490', label: 'Health, climate, science' },
  culture: { colour: '#c2610c', label: 'Sport & culture' },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Text fields may carry <b> and <i> on purpose; everything else is escaped.
const rich = (s) => esc(s).replace(/&lt;(\/?)(b|i)&gt;/g, '<$1$2>');

function colourOf(story) {
  const cat = CATEGORIES[story.cat];
  if (!cat) throw new Error(`unknown category ${story.cat} on "${story.head ?? story.text}"`);
  return cat.colour;
}

function numberBadge(n, colour, size = 18) {
  return `<span class="num" style="background:${colour};width:${size}px;height:${size}px;font-size:${Math.round(size * 0.6)}px">${n}</span>`;
}

function mapPanel(stories, w, h) {
  // Equirectangular, cropped to where people live; vertical scale 1.3x the horizontal so the panel stays wide.
  const p = makeProjection({ width: w, height: h, lonMin: -125, lonMax: 157, latMin: -46, latMax: 70 });
  const radius = 6.6;
  const pins = stories.filter((s) => s.lon != null).map((s) => ({ n: s.n, cat: s.cat, hx: p.x(s.lon), hy: p.y(s.lat) }));
  // Draw low numbers last so the leads sit on top when pins still touch.
  const placed = spreadPins(pins, { radius, width: w, height: h }).sort((a, b) => b.n - a.n);
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">` +
    landPaths(p) + pinLayer(placed, radius, (pin) => CATEGORIES[pin.cat].colour) + '</svg>';
}

// Rough continent boxes, checked in order; enough to count which continents the day's pins touch.
function continentOf(lon, lat) {
  if (lon == null || lat == null) return null;
  if (lat < -10 && lon > 110) return 'Oceania';
  if (lon < -30) return lat > 12 ? 'North America' : 'South America';
  if (lon >= -25 && lon < 45 && lat >= 35) return 'Europe';
  if (lon >= -20 && lon < 52 && lat < 35 && !(lon > 34 && lat > 12)) return 'Africa';
  return 'Asia';
}
function continents(day) {
  const all = [...day.leads, ...day.cards, ...day.briefs];
  return new Set(all.map((s) => continentOf(s.lon, s.lat)).filter(Boolean)).size;
}

export function renderPage(day) {
  const leads = day.leads.map((s, i) => ({ ...s, n: i + 1 }));
  const cards = day.cards.map((s, i) => ({ ...s, n: i + 1 + leads.length }));
  const briefs = day.briefs.map((s, i) => ({ ...s, n: i + 1 + leads.length + cards.length }));
  const all = [...leads, ...cards, ...briefs];
  const total = all.length;

  const figures = day.figures.map((f) => `<span class="fig"><b>${esc(f.n)}</b> ${esc(f.t)}</span>`).join('<span class="sep">|</span>');

  const leadHtml = leads.map((s) => `
    <article class="lead">
      <div class="scene">${scene(s.scene)}<span class="place">${esc(s.place)}</span></div>
      <div class="tag" style="color:${colourOf(s)}">${numberBadge(s.n, colourOf(s), 19)}${esc(s.region)}</div>
      <h2>${rich(s.head)}</h2>
      <p>${rich(s.sum)}</p>
    </article>`).join('');

  const cardHtml = cards.map((s) => `
    <article class="card">
      <div class="band">${banner(s.banner)}<span class="cap">${esc(s.caption)}</span></div>
      <div class="tag" style="color:${colourOf(s)}">${numberBadge(s.n, colourOf(s), 15)}${esc(s.region)}</div>
      <h3>${rich(s.head)}</h3>
      <p>${rich(s.sum)}</p>
    </article>`).join('');

  const half = Math.ceil(briefs.length / 2);
  const col = (items) => items.map((s) => `<li>${numberBadge(s.n, colourOf(s), 15)}<span><b>${esc(s.place)}:</b> ${rich(s.text)}</span></li>`).join('');

  const legend = Object.values(CATEGORIES).map((c) => `<span><i style="background:${c.colour}"></i>${esc(c.label)}</span>`).join('');

  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${esc(day.dateLine)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1024px; height: 1024px; overflow: hidden; }
  body { background: #f5f1e8; color: #182132; font-family: "Segoe UI", Arial, sans-serif; position: relative; }
  .mast { position: absolute; left: 0; top: 0; width: 1024px; height: 116px; background: #0f1d3a; color: #fff; padding: 10px 18px 0; border-bottom: 4px solid #d4a72c; }
  .kicker { display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 700; letter-spacing: 2.4px; color: #e9c46a; text-transform: uppercase; }
  .date { font-family: Georgia, "Times New Roman", serif; font-weight: 700; font-size: 54px; line-height: 58px; margin-top: 1px; letter-spacing: -.5px; }
  .strap { font-family: Georgia, serif; font-style: italic; font-size: 13.5px; color: #d7deeb; line-height: 17px; }
  .figs { position: absolute; left: 0; top: 116px; width: 1024px; overflow: hidden; height: 27px; background: #b5121b; color: #fff; font-size: 12.5px; display: flex; align-items: center; justify-content: center; gap: 9px; white-space: nowrap; }
  .figs b { font-weight: 800; }
  .figs .sep { opacity: .45; }
  .leads { position: absolute; left: 16px; top: 151px; width: 992px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .lead { background: #fff; border: 1px solid #e0d9c8; height: 236px; overflow: hidden; }
  .scene { position: relative; height: 124px; overflow: hidden; }
  .scene svg { display: block; }
  .place { position: absolute; left: 0; top: 0; background: #0f1d3a; color: #fff; font-size: 10.5px; font-weight: 700; letter-spacing: 1.2px; padding: 3px 8px; text-transform: uppercase; }
  .tag { display: flex; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
  .lead .tag { margin: 7px 11px 0; }
  .num { display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; color: #fff; font-weight: 800; letter-spacing: 0; flex: none; font-family: "Segoe UI", Arial, sans-serif; }
  h2 { font-family: Georgia, serif; font-size: 19.5px; line-height: 22px; font-weight: 700; margin: 4px 11px 0; color: #111827; }
  .lead p { font-size: 12.3px; line-height: 15.5px; margin: 4px 11px 0; color: #334155; }
  .cards { position: absolute; left: 16px; top: 397px; width: 992px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 9px 10px; }
  .card { background: #fff; border: 1px solid #e0d9c8; height: 150px; overflow: hidden; }
  .band { position: relative; height: 66px; }
  .band svg { display: block; width: 100%; height: 52px; }
  .cap { position: absolute; left: 0; right: 0; bottom: 0; height: 14px; background: #0f1d3a; color: #fff; font-size: 8.6px; font-weight: 700; letter-spacing: .9px; text-align: center; line-height: 14px; text-transform: uppercase; white-space: nowrap; overflow: hidden; }
  .card .tag { margin: 5px 8px 0; font-size: 9px; gap: 5px; letter-spacing: .7px; }
  h3 { font-family: Georgia, serif; font-size: 14px; line-height: 16px; font-weight: 700; margin: 3px 8px 0; color: #111827; }
  .card p { font-size: 10.6px; line-height: 13px; margin: 3px 8px 0; color: #3b4658; }
  .bottom { position: absolute; left: 16px; top: 711px; width: 992px; height: 285px; display: flex; gap: 12px; }
  .map { width: 352px; background: #fff; border: 1px solid #e0d9c8; padding: 7px 8px 0; }
  .map .hd, .list .hd { font-size: 11px; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; color: #0f1d3a; display: flex; justify-content: space-between; align-items: baseline; }
  .map .hd small { font-weight: 600; letter-spacing: 0; text-transform: none; color: #6b7280; font-size: 10px; }
  .map svg { display: block; margin-top: 5px; border: 1px solid #d6dde3; }
  .legend { display: flex; flex-wrap: wrap; gap: 2px 10px; font-size: 9.6px; color: #374151; margin-top: 5px; }
  .legend i { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 4px; vertical-align: 0; }
  .list { flex: 1; min-width: 0; background: #fff; border: 1px solid #e0d9c8; padding: 7px 11px 0; }
  .list .hd { border-bottom: 2px solid #b5121b; padding-bottom: 4px; }
  .cols { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0 14px; margin-top: 3px; }
  .cols ul { list-style: none; }
  .cols li { display: flex; align-items: center; gap: 6px; font-size: 11.2px; line-height: 13px; height: 17.4px; border-bottom: 1px dotted #d9d3c4; white-space: nowrap; overflow: hidden; }
  .cols li b { color: #0f1d3a; }
  .foot { position: absolute; left: 16px; right: 16px; top: 1001px; display: flex; justify-content: space-between; font-size: 10px; color: #4b5563; }
  .foot i { color: #111827; }
</style></head>
<body>
  <header class="mast">
    <div class="kicker"><span>The world's news in one picture</span><span>${total} stories · ${continents(day)} continents · one day</span></div>
    <div class="date">${esc(day.dateLine)}</div>
    <div class="strap">${rich(day.strap)}</div>
  </header>
  <div class="figs">${figures}</div>
  <section class="leads">${leadHtml}</section>
  <section class="cards">${cardHtml}</section>
  <section class="bottom">
    <div class="map">
      <div class="hd"><span>Where it happened</span><small>Pins carry the story numbers</small></div>
      ${mapPanel(all, 334, 204)}
      <div class="legend">${legend}</div>
    </div>
    <div class="list">
      <div class="hd"><span>Also on ${esc(day.dateLine)}</span></div>
      <div class="cols"><ul>${col(briefs.slice(0, half))}</ul><ul>${col(briefs.slice(half))}</ul></div>
    </div>
  </section>
  <footer class="foot"><i>${rich(day.footnote)}</i><span>${esc(day.sources)}</span></footer>
</body></html>`;
}
