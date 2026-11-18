// Hand-written SVG drawing kit for the front page: small flags, pictograms and banner strips.
// Every shape here is plain SVG markup built from strings, so the page needs no image files at all.

const NAVY = '#0f1d3a';
const INK = '#1b2433';

// ---------- flags ----------
// Each flag draws into a w x h box whose top-left corner is (x, y).

function stripesH(x, y, w, h, colours) {
  const s = h / colours.length;
  return colours.map((c, i) => `<rect x="${x}" y="${(y + i * s).toFixed(2)}" width="${w}" height="${(s + 0.3).toFixed(2)}" fill="${c}"/>`).join('');
}

function stripesV(x, y, w, h, colours) {
  const s = w / colours.length;
  return colours.map((c, i) => `<rect x="${(x + i * s).toFixed(2)}" y="${y}" width="${(s + 0.3).toFixed(2)}" height="${h}" fill="${c}"/>`).join('');
}

function star(cx, cy, r, fill, points = 5) {
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const rad = i % 2 === 0 ? r : r * 0.42;
    const a = -Math.PI / 2 + (i * Math.PI) / points;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
}

const FLAGS = {
  us(x, y, w, h) {
    let s = '';
    for (let i = 0; i < 7; i++) s += `<rect x="${x}" y="${(y + (i * 2 * h) / 13).toFixed(2)}" width="${w}" height="${(h / 13).toFixed(2)}" fill="#b22234"/>`;
    s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>` + s;
    const cw = w * 0.42, ch = (h * 7) / 13;
    s += `<rect x="${x}" y="${y}" width="${cw.toFixed(2)}" height="${ch.toFixed(2)}" fill="#3c3b6e"/>`;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
      s += `<circle cx="${(x + cw * (0.12 + c * 0.19)).toFixed(2)}" cy="${(y + ch * (0.15 + r * 0.23)).toFixed(2)}" r="${(h * 0.022).toFixed(2)}" fill="#fff"/>`;
    }
    return s;
  },
  gb(x, y, w, h) {
    const t = h * 0.2;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#012169"/>` +
      `<path d="M${x} ${y}L${x + w} ${y + h}M${x + w} ${y}L${x} ${y + h}" stroke="#fff" stroke-width="${(h * 0.2).toFixed(2)}"/>` +
      `<path d="M${x} ${y}L${x + w} ${y + h}M${x + w} ${y}L${x} ${y + h}" stroke="#c8102e" stroke-width="${(h * 0.07).toFixed(2)}"/>` +
      `<rect x="${x}" y="${(y + h / 2 - t * 0.85).toFixed(2)}" width="${w}" height="${(t * 1.7).toFixed(2)}" fill="#fff"/>` +
      `<rect x="${(x + w / 2 - t * 0.85).toFixed(2)}" y="${y}" width="${(t * 1.7).toFixed(2)}" height="${h}" fill="#fff"/>` +
      `<rect x="${x}" y="${(y + h / 2 - t / 2).toFixed(2)}" width="${w}" height="${t.toFixed(2)}" fill="#c8102e"/>` +
      `<rect x="${(x + w / 2 - t / 2).toFixed(2)}" y="${y}" width="${t.toFixed(2)}" height="${h}" fill="#c8102e"/>`;
  },
  fr: (x, y, w, h) => stripesV(x, y, w, h, ['#002395', '#fff', '#ed2939']),
  it: (x, y, w, h) => stripesV(x, y, w, h, ['#009246', '#fff', '#ce2b37']),
  ie: (x, y, w, h) => stripesV(x, y, w, h, ['#169b62', '#fff', '#ff883e']),
  be: (x, y, w, h) => stripesV(x, y, w, h, ['#111', '#fdda24', '#ef3340']),
  ng: (x, y, w, h) => stripesV(x, y, w, h, ['#008751', '#fff', '#008751']),
  mx(x, y, w, h) { return stripesV(x, y, w, h, ['#006847', '#fff', '#ce1126']) + `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${(h * 0.14).toFixed(2)}" fill="#8c6a2f"/>`; },
  de: (x, y, w, h) => stripesH(x, y, w, h, ['#000', '#dd0000', '#ffce00']),
  ru: (x, y, w, h) => stripesH(x, y, w, h, ['#fff', '#0039a6', '#d52b1e']),
  ua: (x, y, w, h) => stripesH(x, y, w, h, ['#0057b7', '#ffd700']),
  pl: (x, y, w, h) => stripesH(x, y, w, h, ['#fff', '#dc143c']),
  id: (x, y, w, h) => stripesH(x, y, w, h, ['#ce1126', '#fff']),
  nl: (x, y, w, h) => stripesH(x, y, w, h, ['#ae1c28', '#fff', '#21468b']),
  at: (x, y, w, h) => stripesH(x, y, w, h, ['#ed2939', '#fff', '#ed2939']),
  hu: (x, y, w, h) => stripesH(x, y, w, h, ['#ce2939', '#fff', '#477050']),
  bg: (x, y, w, h) => stripesH(x, y, w, h, ['#fff', '#00966e', '#d62612']),
  ee: (x, y, w, h) => stripesH(x, y, w, h, ['#0072ce', '#000', '#fff']),
  co: (x, y, w, h) => stripesH(x, y, w, h, ['#fcd116', '#fcd116', '#003893', '#ce1126']),
  ye: (x, y, w, h) => stripesH(x, y, w, h, ['#ce1126', '#fff', '#000']),
  sy: (x, y, w, h) => stripesH(x, y, w, h, ['#007a3d', '#fff', '#000']) + star(x + w * 0.35, y + h / 2, h * 0.11, '#ce1126') + star(x + w * 0.5, y + h / 2, h * 0.11, '#ce1126') + star(x + w * 0.65, y + h / 2, h * 0.11, '#ce1126'),
  iq: (x, y, w, h) => stripesH(x, y, w, h, ['#ce1126', '#fff', '#000']) + `<rect x="${x + w * 0.3}" y="${y + h * 0.45}" width="${w * 0.4}" height="${h * 0.1}" fill="#007a3d"/>`,
  eg: (x, y, w, h) => stripesH(x, y, w, h, ['#ce1126', '#fff', '#000']) + `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${(h * 0.1).toFixed(2)}" fill="#c09300"/>`,
  ar: (x, y, w, h) => stripesH(x, y, w, h, ['#74acdf', '#fff', '#74acdf']) + `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${(h * 0.1).toFixed(2)}" fill="#f6b40e"/>`,
  in(x, y, w, h) {
    return stripesH(x, y, w, h, ['#ff9933', '#fff', '#138808']) +
      `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${(h * 0.12).toFixed(2)}" fill="none" stroke="#000080" stroke-width="${(h * 0.03).toFixed(2)}"/>`;
  },
  ir(x, y, w, h) {
    return stripesH(x, y, w, h, ['#239f40', '#fff', '#da0000']) +
      `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${(h * 0.1).toFixed(2)}" fill="none" stroke="#da0000" stroke-width="${(h * 0.035).toFixed(2)}"/>`;
  },
  jp: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/><circle cx="${x + w / 2}" cy="${y + h / 2}" r="${(h * 0.3).toFixed(2)}" fill="#bc002d"/>`,
  bd: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#006a4e"/><circle cx="${x + w * 0.45}" cy="${y + h / 2}" r="${(h * 0.3).toFixed(2)}" fill="#f42a41"/>`,
  kr(x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2, r = h * 0.25;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>` +
      `<path d="M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}Z" fill="#cd2e3a"/><path d="M${cx - r} ${cy}A${r} ${r} 0 0 0 ${cx + r} ${cy}Z" fill="#0047a0"/>` +
      [[0.18, 0.2], [0.82, 0.2], [0.18, 0.8], [0.82, 0.8]].map(([a, b]) => `<rect x="${x + w * a - w * 0.06}" y="${y + h * b - h * 0.08}" width="${w * 0.12}" height="${h * 0.16}" fill="#000"/>`).join('');
  },
  kp(x, y, w, h) {
    return stripesH(x, y, w, h, ['#024fa2', '#fff', '#ed1c27', '#ed1c27', '#ed1c27', '#fff', '#024fa2']) +
      `<circle cx="${x + w * 0.35}" cy="${y + h / 2}" r="${h * 0.17}" fill="#fff"/>` + star(x + w * 0.35, y + h / 2, h * 0.15, '#ed1c27');
  },
  cn(x, y, w, h) {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#de2910"/>` + star(x + w * 0.17, y + h * 0.27, h * 0.16, '#ffde00');
    [[0.33, 0.1], [0.4, 0.2], [0.4, 0.35], [0.33, 0.45]].forEach(([a, b]) => { s += star(x + w * a, y + h * b, h * 0.05, '#ffde00'); });
    return s;
  },
  tw: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fe0000"/><rect x="${x}" y="${y}" width="${w / 2}" height="${h / 2}" fill="#000095"/><circle cx="${x + w / 4}" cy="${y + h / 4}" r="${h * 0.12}" fill="#fff"/>`,
  vn: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#da251d"/>` + star(x + w / 2, y + h / 2, h * 0.3, '#ff0'),
  tr(x, y, w, h) {
    const cx = x + w * 0.38, cy = y + h / 2;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e30a17"/><circle cx="${cx}" cy="${cy}" r="${h * 0.25}" fill="#fff"/><circle cx="${cx + h * 0.06}" cy="${cy}" r="${h * 0.2}" fill="#e30a17"/>` + star(cx + h * 0.3, cy, h * 0.1, '#fff');
  },
  pk(x, y, w, h) {
    const cx = x + w * 0.62, cy = y + h / 2;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#01411c"/><rect x="${x}" y="${y}" width="${w * 0.25}" height="${h}" fill="#fff"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${h * 0.27}" fill="#fff"/><circle cx="${cx + h * 0.08}" cy="${cy - h * 0.05}" r="${h * 0.23}" fill="#01411c"/>`;
  },
  il(x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2, r = h * 0.2;
    const tri = (d) => `<polygon points="${cx},${cy - d * r} ${cx + 0.87 * r},${cy + d * 0.5 * r} ${cx - 0.87 * r},${cy + d * 0.5 * r}" fill="none" stroke="#0038b8" stroke-width="${h * 0.04}"/>`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/><rect x="${x}" y="${y + h * 0.1}" width="${w}" height="${h * 0.14}" fill="#0038b8"/><rect x="${x}" y="${y + h * 0.76}" width="${w}" height="${h * 0.14}" fill="#0038b8"/>` + tri(1) + tri(-1);
  },
  ps(x, y, w, h) {
    return stripesH(x, y, w, h, ['#000', '#fff', '#007a3d']) + `<polygon points="${x},${y} ${x + w * 0.38},${y + h / 2} ${x},${y + h}" fill="#ce1126"/>`;
  },
  lb(x, y, w, h) {
    return stripesH(x, y, w, h, ['#ed1c24', '#fff', '#fff', '#ed1c24']) + `<polygon points="${x + w / 2},${y + h * 0.3} ${x + w * 0.6},${y + h * 0.68} ${x + w * 0.4},${y + h * 0.68}" fill="#00a651"/>`;
  },
  sa(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#006c35"/><rect x="${x + w * 0.25}" y="${y + h * 0.35}" width="${w * 0.5}" height="${h * 0.08}" fill="#fff"/><rect x="${x + w * 0.3}" y="${y + h * 0.62}" width="${w * 0.42}" height="${h * 0.04}" fill="#fff"/>`;
  },
  ae: (x, y, w, h) => stripesH(x + w * 0.25, y, w * 0.75, h, ['#00732f', '#fff', '#000']) + `<rect x="${x}" y="${y}" width="${w * 0.25}" height="${h}" fill="#ff0000"/>`,
  qa: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#8a1538"/><rect x="${x}" y="${y}" width="${w * 0.3}" height="${h}" fill="#fff"/>`,
  sd: (x, y, w, h) => stripesH(x, y, w, h, ['#d21034', '#fff', '#000']) + `<polygon points="${x},${y} ${x + w * 0.33},${y + h / 2} ${x},${y + h}" fill="#007229"/>`,
  ss: (x, y, w, h) => stripesH(x, y, w, h, ['#000', '#da121a', '#078930']) + `<polygon points="${x},${y} ${x + w * 0.35},${y + h / 2} ${x},${y + h}" fill="#0f47af"/>`,
  ke(x, y, w, h) { return stripesH(x, y, w, h, ['#000', '#fff', '#bb0000', '#bb0000', '#fff', '#006600']) + `<ellipse cx="${x + w / 2}" cy="${y + h / 2}" rx="${w * 0.08}" ry="${h * 0.3}" fill="#bb0000" stroke="#000" stroke-width="1"/>`; },
  et: (x, y, w, h) => stripesH(x, y, w, h, ['#078930', '#fcdd09', '#da121a']) + `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${h * 0.2}" fill="#0f47af"/>` + star(x + w / 2, y + h / 2, h * 0.15, '#fcdd09'),
  za(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/><rect x="${x}" y="${y}" width="${w}" height="${h * 0.38}" fill="#e03c31"/><rect x="${x}" y="${y + h * 0.62}" width="${w}" height="${h * 0.38}" fill="#001489"/>` +
      `<path d="M${x} ${y}L${x + w * 0.45} ${y + h / 2}L${x} ${y + h}Z" fill="#fff"/><path d="M${x} ${y + h * 0.12}L${x + w * 0.36} ${y + h / 2}L${x} ${y + h * 0.88}Z" fill="#007749"/><path d="M${x} ${y + h * 0.25}L${x + w * 0.25} ${y + h / 2}L${x} ${y + h * 0.75}Z" fill="#000"/>` +
      `<rect x="${x + w * 0.4}" y="${y + h * 0.42}" width="${w * 0.6}" height="${h * 0.16}" fill="#007749"/>`;
  },
  cd(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#007fff"/><path d="M${x} ${y + h}L${x + w} ${y}" stroke="#f7d618" stroke-width="${h * 0.32}"/><path d="M${x} ${y + h}L${x + w} ${y}" stroke="#ce1021" stroke-width="${h * 0.2}"/>` + star(x + w * 0.17, y + h * 0.25, h * 0.15, '#f7d618');
  },
  br(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#009c3b"/><polygon points="${x + w / 2},${y + h * 0.1} ${x + w * 0.92},${y + h / 2} ${x + w / 2},${y + h * 0.9} ${x + w * 0.08},${y + h / 2}" fill="#ffdf00"/><circle cx="${x + w / 2}" cy="${y + h / 2}" r="${h * 0.22}" fill="#002776"/>`;
  },
  ca(x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2, r = h * 0.3;
    return stripesV(x, y, w, h, ['#d52b1e', '#fff', '#fff', '#d52b1e']) +
      `<path d="M${cx} ${cy - r}L${cx + r * 0.3} ${cy - r * 0.3}L${cx + r} ${cy - r * 0.45}L${cx + r * 0.6} ${cy + r * 0.3}L${cx + r * 0.1} ${cy + r * 0.35}L${cx + r * 0.1} ${cy + r}L${cx - r * 0.1} ${cy + r}L${cx - r * 0.1} ${cy + r * 0.35}L${cx - r * 0.6} ${cy + r * 0.3}L${cx - r} ${cy - r * 0.45}L${cx - r * 0.3} ${cy - r * 0.3}Z" fill="#d52b1e"/>`;
  },
  au(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#012169"/>` + FLAGS.gb(x, y, w / 2, h / 2) +
      star(x + w * 0.25, y + h * 0.75, h * 0.12, '#fff', 7) + star(x + w * 0.75, y + h * 0.25, h * 0.06, '#fff', 7) +
      star(x + w * 0.62, y + h * 0.5, h * 0.06, '#fff', 7) + star(x + w * 0.86, y + h * 0.45, h * 0.06, '#fff', 7) + star(x + w * 0.75, y + h * 0.82, h * 0.06, '#fff', 7);
  },
  nz(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#012169"/>` + FLAGS.gb(x, y, w / 2, h / 2) +
      [[0.75, 0.25], [0.65, 0.5], [0.86, 0.45], [0.75, 0.8]].map(([a, b]) => star(x + w * a, y + h * b, h * 0.07, '#cc142b')).join('');
  },
  eu(x, y, w, h) {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#003399"/>`;
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      s += star(x + w / 2 + Math.cos(a) * h * 0.32, y + h / 2 + Math.sin(a) * h * 0.32, h * 0.065, '#ffcc00');
    }
    return s;
  },
  un(x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2, r = h * 0.28;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#4b92db"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-width="${h * 0.05}"/>` +
      `<path d="M${cx - r} ${cy}H${cx + r}M${cx} ${cy - r}V${cy + r}" stroke="#fff" stroke-width="${h * 0.03}"/>`;
  },
  ph(x, y, w, h) {
    return stripesH(x, y, w, h, ['#0038a8', '#ce1126']) + `<polygon points="${x},${y} ${x + w * 0.43},${y + h / 2} ${x},${y + h}" fill="#fff"/><circle cx="${x + w * 0.14}" cy="${y + h / 2}" r="${h * 0.1}" fill="#fcd116"/>`;
  },
  ch: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#d52b1e"/><rect x="${x + w / 2 - h * 0.08}" y="${y + h * 0.2}" width="${h * 0.16}" height="${h * 0.6}" fill="#fff"/><rect x="${x + w / 2 - h * 0.3}" y="${y + h / 2 - h * 0.08}" width="${h * 0.6}" height="${h * 0.16}" fill="#fff"/>`,
  dk: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#c8102e"/><rect x="${x + w * 0.32}" y="${y}" width="${h * 0.14}" height="${h}" fill="#fff"/><rect x="${x}" y="${y + h * 0.43}" width="${w}" height="${h * 0.14}" fill="#fff"/>`,
  se: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#006aa7"/><rect x="${x + w * 0.32}" y="${y}" width="${h * 0.18}" height="${h}" fill="#fecc00"/><rect x="${x}" y="${y + h * 0.41}" width="${w}" height="${h * 0.18}" fill="#fecc00"/>`,
  no: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ba0c2f"/><rect x="${x + w * 0.27}" y="${y}" width="${h * 0.24}" height="${h}" fill="#fff"/><rect x="${x}" y="${y + h * 0.38}" width="${w}" height="${h * 0.24}" fill="#fff"/><rect x="${x + w * 0.31}" y="${y}" width="${h * 0.12}" height="${h}" fill="#00205b"/><rect x="${x}" y="${y + h * 0.44}" width="${w}" height="${h * 0.12}" fill="#00205b"/>`,
  fi: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/><rect x="${x + w * 0.3}" y="${y}" width="${h * 0.22}" height="${h}" fill="#002f6c"/><rect x="${x}" y="${y + h * 0.39}" width="${w}" height="${h * 0.22}" fill="#002f6c"/>`,
  gr(x, y, w, h) {
    let s = '';
    for (let i = 0; i < 9; i++) s += `<rect x="${x}" y="${(y + (i * h) / 9).toFixed(2)}" width="${w}" height="${(h / 9 + 0.3).toFixed(2)}" fill="${i % 2 ? '#fff' : '#0d5eaf'}"/>`;
    return s + `<rect x="${x}" y="${y}" width="${w * 0.37}" height="${(h * 5) / 9}" fill="#0d5eaf"/><rect x="${x + w * 0.15}" y="${y}" width="${w * 0.07}" height="${(h * 5) / 9}" fill="#fff"/><rect x="${x}" y="${y + h * 0.22}" width="${w * 0.37}" height="${h * 0.11}" fill="#fff"/>`;
  },
  es: (x, y, w, h) => stripesH(x, y, w, h, ['#aa151b', '#f1bf00', '#f1bf00', '#aa151b']),
  pt: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w * 0.4}" height="${h}" fill="#046a38"/><rect x="${x + w * 0.4}" y="${y}" width="${w * 0.6}" height="${h}" fill="#da291c"/><circle cx="${x + w * 0.4}" cy="${y + h / 2}" r="${h * 0.2}" fill="#ffe900"/>`,
  ve: (x, y, w, h) => stripesH(x, y, w, h, ['#ffcc00', '#00247d', '#cf142b']),
  cl: (x, y, w, h) => stripesH(x, y, w, h, ['#fff', '#d52b1e']) + `<rect x="${x}" y="${y}" width="${w * 0.33}" height="${h / 2}" fill="#0039a6"/>` + star(x + w * 0.165, y + h / 4, h * 0.13, '#fff'),
  pe: (x, y, w, h) => stripesV(x, y, w, h, ['#d91023', '#fff', '#d91023']),
  ec: (x, y, w, h) => stripesH(x, y, w, h, ['#ffd100', '#ffd100', '#0072ce', '#ef3340']),
  bo: (x, y, w, h) => stripesH(x, y, w, h, ['#d52b1e', '#f9e300', '#007934']),
  ht: (x, y, w, h) => stripesH(x, y, w, h, ['#00209f', '#d21034']) + `<rect x="${x + w * 0.38}" y="${y + h * 0.35}" width="${w * 0.24}" height="${h * 0.3}" fill="#fff"/>`,
  cu(x, y, w, h) {
    return stripesH(x, y, w, h, ['#002a8f', '#fff', '#002a8f', '#fff', '#002a8f']) + `<polygon points="${x},${y} ${x + w * 0.43},${y + h / 2} ${x},${y + h}" fill="#cf142b"/>` + star(x + w * 0.14, y + h / 2, h * 0.13, '#fff');
  },
  af: (x, y, w, h) => stripesV(x, y, w, h, ['#000', '#d32011', '#007a36']),
  th: (x, y, w, h) => stripesH(x, y, w, h, ['#a51931', '#f4f5f8', '#2d2a4a', '#2d2a4a', '#f4f5f8', '#a51931']),
  my(x, y, w, h) {
    let s = '';
    for (let i = 0; i < 14; i++) s += `<rect x="${x}" y="${(y + (i * h) / 14).toFixed(2)}" width="${w}" height="${(h / 14 + 0.3).toFixed(2)}" fill="${i % 2 ? '#fff' : '#cc0001'}"/>`;
    return s + `<rect x="${x}" y="${y}" width="${w / 2}" height="${(h * 8) / 14}" fill="#010066"/>` + star(x + w * 0.3, y + h * 0.28, h * 0.12, '#fc0', 14);
  },
  sg: (x, y, w, h) => stripesH(x, y, w, h, ['#ef3340', '#fff']) + `<circle cx="${x + w * 0.2}" cy="${y + h * 0.25}" r="${h * 0.15}" fill="#fff"/><circle cx="${x + w * 0.24}" cy="${y + h * 0.25}" r="${h * 0.14}" fill="#ef3340"/>`,
  mm: (x, y, w, h) => stripesH(x, y, w, h, ['#fecb00', '#34b233', '#ea2839']) + star(x + w / 2, y + h * 0.55, h * 0.38, '#fff'),
  ml: (x, y, w, h) => stripesV(x, y, w, h, ['#14b53a', '#fcd116', '#ce1126']),
  sn: (x, y, w, h) => stripesV(x, y, w, h, ['#00853f', '#fdef42', '#e31b23']) + star(x + w / 2, y + h / 2, h * 0.17, '#00853f'),
  gh: (x, y, w, h) => stripesH(x, y, w, h, ['#ce1126', '#fcd116', '#006b3f']) + star(x + w / 2, y + h / 2, h * 0.15, '#000'),
  rs: (x, y, w, h) => stripesH(x, y, w, h, ['#c6363c', '#0c4076', '#fff']),
  ge(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/><rect x="${x + w / 2 - h * 0.1}" y="${y}" width="${h * 0.2}" height="${h}" fill="#e00"/><rect x="${x}" y="${y + h * 0.4}" width="${w}" height="${h * 0.2}" fill="#e00"/>`;
  },
  am: (x, y, w, h) => stripesH(x, y, w, h, ['#d90012', '#0033a0', '#f2a800']),
  ro: (x, y, w, h) => stripesV(x, y, w, h, ['#002b7f', '#fcd116', '#ce1126']),
  md: (x, y, w, h) => stripesV(x, y, w, h, ['#0046ae', '#ffd200', '#cc092f']),
  by: (x, y, w, h) => stripesH(x, y, w, h, ['#c8313e', '#c8313e', '#4aa657']),
  so: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#4189dd"/>` + star(x + w / 2, y + h / 2, h * 0.28, '#fff'),
  ly: (x, y, w, h) => stripesH(x, y, w, h, ['#e70013', '#000', '#000', '#239e46']),
  hk: (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#de2910"/>` + star(x + w / 2, y + h / 2, h * 0.28, '#fff'),
  nato(x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2, r = h * 0.32;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#004990"/><polygon points="${cx},${cy - r} ${cx + r * 0.25},${cy} ${cx},${cy + r} ${cx - r * 0.25},${cy}" fill="#fff"/><polygon points="${cx - r},${cy} ${cx},${cy - r * 0.25} ${cx + r},${cy} ${cx},${cy + r * 0.25}" fill="#fff"/>`;
  },
};

export function flag(code, x, y, w, h) {
  const draw = FLAGS[code];
  if (!draw) throw new Error(`no flag drawn for ${code}`);
  const id = `fc${code}${Math.round(x)}${Math.round(y)}`;
  return `<g><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5"/></clipPath><g clip-path="url(#${id})">${draw(x, y, w, h)}</g>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="none" stroke="rgba(0,0,0,.28)" stroke-width=".8"/></g>`;
}

export const flagCodes = Object.keys(FLAGS);

// ---------- pictograms ----------
// Each icon is drawn in a 40 x 40 box; icon(name, x, y, size, colour) scales it into place.

const ICONS = {
  ballot: (c) => `<rect x="7" y="17" width="26" height="19" rx="2" fill="${c}"/><rect x="13" y="16" width="14" height="3" fill="#fff"/><rect x="14" y="4" width="12" height="15" fill="#fff" stroke="${c}" stroke-width="1.6"/><path d="M17 11l2.5 3 4.5-6" stroke="${c}" stroke-width="2" fill="none"/>`,
  chip: (c) => `<rect x="9" y="9" width="22" height="22" rx="2" fill="${c}"/><rect x="14" y="14" width="12" height="12" fill="#9be08f"/>` + [12, 17, 23, 28].map((v) => `<path d="M${v} 4v5M${v} 31v5M4 ${v}h5M31 ${v}h5" stroke="${c}" stroke-width="2"/>`).join(''),
  rocket: (c) => `<path d="M20 3c6 6 7 15 4 24h-8c-3-9-2-18 4-24z" fill="${c}"/><circle cx="20" cy="14" r="3" fill="#fff"/><path d="M16 22l-6 7 1 3 6-4zM24 22l6 7-1 3-6-4z" fill="${c}"/><path d="M17 29l3 9 3-9z" fill="#f59e0b"/>`,
  virus: (c) => `<circle cx="20" cy="20" r="10" fill="${c}"/>` + Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; return `<line x1="${20 + 10 * Math.cos(a)}" y1="${20 + 10 * Math.sin(a)}" x2="${20 + 16 * Math.cos(a)}" y2="${20 + 16 * Math.sin(a)}" stroke="${c}" stroke-width="2.4"/><circle cx="${20 + 16.5 * Math.cos(a)}" cy="${20 + 16.5 * Math.sin(a)}" r="2.4" fill="${c}"/>`; }).join('') + `<circle cx="17" cy="17" r="2.2" fill="#fff" opacity=".7"/><circle cx="23" cy="23" r="1.6" fill="#fff" opacity=".7"/>`,
  factory: (c) => `<path d="M3 36V20l9 5v-5l9 5v-5l9 5V6h6v30z" fill="${c}"/><rect x="8" y="28" width="4" height="4" fill="#fff"/><rect x="17" y="28" width="4" height="4" fill="#fff"/><rect x="26" y="28" width="4" height="4" fill="#fff"/>`,
  plane: (c) => `<path d="M37 18c1 1 1 3 0 4l-12 1-8 13h-4l4-13-8-1-3 4H3l2-6-2-6h3l3 4 8-1-4-13h4l8 13z" fill="${c}"/>`,
  drone: (c) => `<path d="M6 20l14-4 14 4-14 4z" fill="${c}"/><path d="M20 16v-6M20 24v6" stroke="${c}" stroke-width="2.5"/><path d="M12 8h16M12 32h16" stroke="${c}" stroke-width="2.5"/><path d="M34 20h4" stroke="#f59e0b" stroke-width="3"/>`,
  missile: (c) => `<path d="M6 32L28 10l4-4 2 2-4 4-22 22z" fill="${c}"/><path d="M28 10l6-6 2 2-6 6" fill="#c8102e"/><path d="M8 26l-4 1 3 3zM14 32l-1 4-3-3z" fill="${c}"/><path d="M5 35l-3 3" stroke="#f59e0b" stroke-width="3"/>`,
  ship: (c) => `<path d="M3 26h34l-5 9H8z" fill="${c}"/><rect x="12" y="16" width="16" height="10" fill="${c}"/><rect x="15" y="19" width="3" height="3" fill="#fff"/><rect x="22" y="19" width="3" height="3" fill="#fff"/><rect x="18" y="9" width="4" height="7" fill="${c}"/><path d="M2 37q4-2 8 0t8 0 8 0 8 0 6 0" stroke="#4a90c2" stroke-width="1.6" fill="none"/>`,
  gavel: (c) => `<rect x="6" y="9" width="17" height="8" rx="2" transform="rotate(-35 14 13)" fill="${c}"/><path d="M18 18l14 13" stroke="${c}" stroke-width="4" stroke-linecap="round"/><rect x="3" y="32" width="18" height="5" rx="1" fill="${c}"/>`,
  chartUp: (c) => `<path d="M4 36h33M4 36V4" stroke="${INK}" stroke-width="2"/><path d="M7 30l8-8 6 5 13-15" stroke="${c}" stroke-width="3.5" fill="none"/><path d="M27 10h8v8" stroke="${c}" stroke-width="3.5" fill="none"/>`,
  chartDown: (c) => `<path d="M4 36h33M4 36V4" stroke="${INK}" stroke-width="2"/><path d="M7 9l8 9 6-5 13 15" stroke="${c}" stroke-width="3.5" fill="none"/><path d="M27 29h8v-8" stroke="${c}" stroke-width="3.5" fill="none"/>`,
  globe: (c) => `<circle cx="20" cy="20" r="15" fill="#cde7f5" stroke="${c}" stroke-width="2"/><path d="M12 9c4 3 2 6 6 7s2 6-2 8-2 7 1 9M26 8c-2 4 3 5 5 4s4 6 1 9-6 2-6 7" fill="none" stroke="${c}" stroke-width="2"/>`,
  thermo: (c) => `<rect x="16" y="3" width="8" height="24" rx="4" fill="#fff" stroke="${INK}" stroke-width="2"/><rect x="18" y="12" width="4" height="16" fill="${c}"/><circle cx="20" cy="31" r="6.5" fill="${c}" stroke="${INK}" stroke-width="2"/>`,
  ball: (c) => `<circle cx="20" cy="20" r="15" fill="#fff" stroke="${c}" stroke-width="2"/><polygon points="20,13 26.5,17.5 24,25 16,25 13.5,17.5" fill="${c}"/><path d="M20 13V5M26.5 17.5l7-3M24 25l5 6M16 25l-5 6M13.5 17.5l-7-3" stroke="${c}" stroke-width="1.6"/>`,
  trophy: (c) => `<path d="M11 5h18v9a9 9 0 0 1-18 0z" fill="${c}"/><path d="M11 8H5c0 6 3 9 7 9M29 8h6c0 6-3 9-7 9" stroke="${c}" stroke-width="2.2" fill="none"/><rect x="18" y="22" width="4" height="7" fill="${c}"/><rect x="12" y="29" width="16" height="6" rx="1" fill="${c}"/>`,
  money: (c) => `<rect x="3" y="10" width="34" height="20" rx="2" fill="${c}"/><circle cx="20" cy="20" r="6" fill="none" stroke="#fff" stroke-width="2"/><text x="20" y="24" font-size="9" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">$</text><circle cx="8" cy="20" r="1.6" fill="#fff"/><circle cx="32" cy="20" r="1.6" fill="#fff"/>`,
  oil: (c) => `<path d="M20 3c-6 10-11 15-11 22a11 11 0 0 0 22 0c0-7-5-12-11-22z" fill="${c}"/><path d="M15 26a5 5 0 0 0 5 5" stroke="#fff" stroke-width="2" fill="none"/>`,
  parliament: (c) => `<path d="M8 15a12 9 0 0 1 24 0z" fill="${c}"/><rect x="19" y="2" width="2" height="5" fill="${c}"/><rect x="5" y="15" width="30" height="3" fill="${c}"/>` + [8, 14, 20, 26, 32].map((v) => `<rect x="${v - 1.5}" y="19" width="3" height="12" fill="${c}"/>`).join('') + `<rect x="3" y="31" width="34" height="5" fill="${c}"/>`,
  satellite: (c) => `<rect x="15" y="15" width="10" height="10" fill="${c}" transform="rotate(45 20 20)"/><rect x="2" y="16" width="11" height="8" fill="#3b82f6" stroke="${c}" stroke-width="1"/><rect x="27" y="16" width="11" height="8" fill="#3b82f6" stroke="${c}" stroke-width="1"/><path d="M20 27v6M15 36a7 5 0 0 1 10 0" stroke="${c}" stroke-width="2" fill="none"/>`,
  flame: (c) => `<path d="M20 3c2 8 11 11 11 21a11 11 0 0 1-22 0c0-6 4-8 5-13 2 3 2 6 4 7 2-4 2-9 2-15z" fill="${c}"/><path d="M20 22c1 4 5 5 5 9a5 5 0 0 1-10 0c0-3 3-4 5-9z" fill="#fde68a"/>`,
  flood: (c) => `<path d="M8 22l12-11 12 11v6H8z" fill="${INK}"/><rect x="17" y="21" width="6" height="7" fill="#fff"/><path d="M2 27q4.5-3 9 0t9 0 9 0 9 0M2 33q4.5-3 9 0t9 0 9 0 9 0" stroke="${c}" stroke-width="2.5" fill="none"/>`,
  storm: (c) => `<path d="M20 20m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0" fill="${c}"/><path d="M20 4c-9 0-14 6-14 11 3-4 8-5 12-3M20 36c9 0 14-6 14-11-3 4-8 5-12 3M6 26c0 5 6 10 11 9-3-2-5-6-4-10M34 14c0-5-6-10-11-9 3 2 5 6 4 10" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  handshake: (c) => `<path d="M2 15l8-4 6 3 4-2 6 2 8-3 4 4-6 10-3 1-6 5-3-1-3 2-3-2-3 1-3-4-5-3z" fill="${c}"/><path d="M14 20l5 4M18 18l6 5M22 17l5 4" stroke="#fff" stroke-width="1.6"/>`,
  mic: (c) => `<rect x="15" y="4" width="10" height="19" rx="5" fill="${c}"/><path d="M10 18a10 10 0 0 0 20 0M20 28v6M14 35h12" stroke="${c}" stroke-width="2.4" fill="none"/>`,
  shield: (c) => `<path d="M20 3l14 5v10c0 9-6 15-14 19C12 33 6 27 6 18V8z" fill="${c}"/><path d="M13 19l5 5 9-10" stroke="#fff" stroke-width="3" fill="none"/>`,
  pill: (c) => `<rect x="5" y="14" width="30" height="12" rx="6" transform="rotate(-35 20 20)" fill="#fff" stroke="${c}" stroke-width="2"/><path d="M20 20l-8.6 6A6 6 0 0 1 8 15.4L14 11.6z" transform="rotate(0)" fill="${c}"/>`,
  syringe: (c) => `<rect x="10" y="15" width="20" height="8" rx="1" transform="rotate(-45 20 19)" fill="#fff" stroke="${c}" stroke-width="2"/><path d="M27 12l6-6M30 3l7 7M11 28l-6 6" stroke="${c}" stroke-width="2.4"/>`,
  tank: (c) => `<rect x="4" y="22" width="32" height="10" rx="5" fill="${c}"/><rect x="10" y="15" width="18" height="8" rx="2" fill="${c}"/><path d="M27 18h11" stroke="${c}" stroke-width="3"/>` + [10, 16, 22, 28].map((v) => `<circle cx="${v}" cy="27" r="2" fill="#fff"/>`).join(''),
  tent: (c) => `<path d="M3 34L20 7l17 27z" fill="${c}"/><path d="M20 7l-5 27h10z" fill="#fff" opacity=".8"/>`,
  house: (c) => `<path d="M5 19L20 6l15 13v17H5z" fill="${c}"/><rect x="16" y="25" width="8" height="11" fill="#fff"/>`,
  ruin: (c) => `<path d="M5 36V20l7-6 4 4 3-7 5 5v-4l5 3 6 5v16z" fill="${c}"/><rect x="10" y="25" width="5" height="5" fill="#fff"/><rect x="24" y="24" width="5" height="6" fill="#fff"/><circle cx="31" cy="9" r="3" fill="#9ca3af"/><circle cx="35" cy="5" r="2" fill="#9ca3af"/>`,
  train: (c) => `<rect x="9" y="4" width="22" height="26" rx="4" fill="${c}"/><rect x="12" y="8" width="16" height="9" fill="#fff"/><circle cx="14" cy="24" r="2" fill="#fff"/><circle cx="26" cy="24" r="2" fill="#fff"/><path d="M12 30l-4 6M28 30l4 6" stroke="${c}" stroke-width="2.4"/>`,
  car: (c) => `<path d="M4 26l3-9h26l3 9v6H4z" fill="${c}"/><path d="M10 17l3-6h14l3 6z" fill="${c}"/><rect x="12" y="12" width="16" height="5" fill="#fff"/><circle cx="11" cy="32" r="3.5" fill="${INK}"/><circle cx="29" cy="32" r="3.5" fill="${INK}"/>`,
  phone: (c) => `<rect x="11" y="3" width="18" height="34" rx="3" fill="${c}"/><rect x="13.5" y="7" width="13" height="23" fill="#fff"/><circle cx="20" cy="33.5" r="1.6" fill="#fff"/>`,
  cloud: (c) => `<path d="M10 30a7 7 0 0 1 0-14 10 10 0 0 1 19-2 8 8 0 0 1 2 16z" fill="${c}"/>`,
  leaf: (c) => `<path d="M6 34C6 16 16 6 35 5c0 19-10 29-29 29z" fill="${c}"/><path d="M6 34L26 14" stroke="#fff" stroke-width="2"/>`,
  bank: (c) => `<path d="M20 3l17 9H3z" fill="${c}"/>` + [7, 15, 23, 31].map((v) => `<rect x="${v}" y="14" width="3" height="15" fill="${c}"/>`).join('') + `<rect x="3" y="30" width="34" height="6" fill="${c}"/>`,
  scales: (c) => `<path d="M20 4v29M8 9h24M12 36h16" stroke="${c}" stroke-width="2.4"/><path d="M8 9l-5 11h10zM32 9l-5 11h10z" fill="none" stroke="${c}" stroke-width="1.6"/><path d="M3 20a5 4 0 0 0 10 0zM27 20a5 4 0 0 0 10 0z" fill="${c}"/>`,
  warning: (c) => `<path d="M20 4l17 31H3z" fill="${c}"/><rect x="18.5" y="14" width="3" height="11" fill="#fff"/><circle cx="20" cy="29.5" r="2" fill="#fff"/>`,
  cross: (c) => `<rect x="15" y="5" width="10" height="30" fill="${c}"/><rect x="5" y="15" width="30" height="10" fill="${c}"/>`,
  people: (c) => `<circle cx="13" cy="12" r="5" fill="${c}"/><circle cx="27" cy="12" r="5" fill="${c}"/><path d="M4 34c0-8 4-13 9-13s9 5 9 13zM18 34c0-8 4-13 9-13s9 5 9 13z" fill="${c}"/>`,
  sign: (c) => `<rect x="4" y="6" width="32" height="18" rx="2" fill="#fff" stroke="${c}" stroke-width="2.4"/><path d="M9 13h22M9 18h15" stroke="${c}" stroke-width="2.4"/><path d="M20 24v13" stroke="${c}" stroke-width="3"/>`,
  ai: (c) => `<rect x="7" y="9" width="26" height="22" rx="5" fill="${c}"/><circle cx="15" cy="19" r="3" fill="#fff"/><circle cx="25" cy="19" r="3" fill="#fff"/><path d="M15 26h10" stroke="#fff" stroke-width="2"/><path d="M20 9V4" stroke="${c}" stroke-width="2.4"/><circle cx="20" cy="3.5" r="2" fill="${c}"/>`,
  bitcoin: (c) => `<circle cx="20" cy="20" r="16" fill="${c}"/><text x="20" y="27" font-size="20" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">₿</text>`,
  gamepad: (c) => `<path d="M8 13h24a6 6 0 0 1 6 6l-1 10a5 5 0 0 1-9 2l-3-4H15l-3 4a5 5 0 0 1-9-2L2 19a6 6 0 0 1 6-6z" fill="${c}"/><path d="M10 18v8M6 22h8" stroke="#fff" stroke-width="2.4"/><circle cx="27" cy="20" r="2" fill="#fff"/><circle cx="31" cy="24" r="2" fill="#fff"/>`,
  film: (c) => `<rect x="4" y="9" width="32" height="22" rx="2" fill="${c}"/>` + [8, 14, 20, 26, 32].map((v) => `<rect x="${v - 1.5}" y="11" width="3" height="3" fill="#fff"/><rect x="${v - 1.5}" y="26" width="3" height="3" fill="#fff"/>`).join('') + `<path d="M17 16v8l7-4z" fill="#fff"/>`,
  music: (c) => `<path d="M15 30V8l18-4v22" stroke="${c}" stroke-width="3" fill="none"/><circle cx="11" cy="30" r="5" fill="${c}"/><circle cx="29" cy="26" r="5" fill="${c}"/>`,
  bat: (c) => `<rect x="17" y="3" width="6" height="11" rx="2" fill="${INK}"/><path d="M15 14h10l-1 22h-8z" fill="${c}"/><circle cx="32" cy="31" r="4" fill="#c8102e"/>`,
  racket: (c) => `<ellipse cx="17" cy="15" rx="10" ry="12" fill="none" stroke="${c}" stroke-width="3"/><path d="M23 25l10 11" stroke="${c}" stroke-width="4" stroke-linecap="round"/><circle cx="33" cy="9" r="4" fill="#d9f99d" stroke="${INK}" stroke-width="1"/>`,
  medal: (c) => `<path d="M12 3l5 13h6l5-13" fill="none" stroke="#1d4ed8" stroke-width="4"/><circle cx="20" cy="26" r="10" fill="${c}"/>` + star(20, 26, 5, '#fff'),
  quake: (c) => `<path d="M2 22h7l3-9 4 18 4-24 4 20 3-8 3 3h8" stroke="${c}" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`,
  volcano: (c) => `<path d="M2 36l12-20h12l12 20z" fill="${c}"/><path d="M14 16l3-3h6l3 3z" fill="#f97316"/><circle cx="17" cy="7" r="3.5" fill="#9ca3af"/><circle cx="24" cy="5" r="3" fill="#9ca3af"/>`,
  snow: (c) => [0, 60, 120].map((r) => `<path d="M20 3v34M15 7l5 5 5-5M15 33l5-5 5 5" stroke="${c}" stroke-width="2.4" fill="none" transform="rotate(${r} 20 20)"/>`).join(''),
  sun: (c) => `<circle cx="20" cy="20" r="8" fill="${c}"/>` + Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; return `<line x1="${20 + 11 * Math.cos(a)}" y1="${20 + 11 * Math.sin(a)}" x2="${20 + 16 * Math.cos(a)}" y2="${20 + 16 * Math.sin(a)}" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`; }).join(''),
  dove: (c) => `<path d="M5 22c6-1 10-6 12-12 2 5 6 7 11 7l7-4-3 6c0 7-6 12-14 12-5 0-9-2-13-9z" fill="${c}"/><path d="M33 13l4-1-2 3" fill="#f59e0b"/>`,
  key: (c) => `<circle cx="12" cy="20" r="8" fill="none" stroke="${c}" stroke-width="3.5"/><path d="M20 20h16M30 20v6M35 20v5" stroke="${c}" stroke-width="3.5"/>`,
  lock: (c) => `<rect x="8" y="17" width="24" height="19" rx="2" fill="${c}"/><path d="M13 17v-5a7 7 0 0 1 14 0v5" stroke="${c}" stroke-width="3.5" fill="none"/><circle cx="20" cy="26" r="3" fill="#fff"/>`,
  envelope: (c) => `<rect x="4" y="9" width="32" height="22" rx="2" fill="${c}"/><path d="M4 11l16 11 16-11" stroke="#fff" stroke-width="2.2" fill="none"/>`,
  crown: (c) => `<path d="M4 30L6 11l8 9 6-12 6 12 8-9 2 19z" fill="${c}"/><rect x="5" y="31" width="30" height="5" fill="${c}"/>`,
  baby: (c) => `<circle cx="20" cy="15" r="9" fill="${c}"/><circle cx="17" cy="14" r="1.4" fill="#fff"/><circle cx="23" cy="14" r="1.4" fill="#fff"/><path d="M8 37c0-7 5-11 12-11s12 4 12 11z" fill="${c}"/>`,
  brain: (c) => `<path d="M20 7c-3-3-9-2-10 3-4 1-6 6-3 9-2 4 1 8 5 8 1 4 6 5 8 2zM20 7c3-3 9-2 10 3 4 1 6 6 3 9 2 4-1 8-5 8-1 4-6 5-8 2z" fill="${c}"/><path d="M20 7v22" stroke="#fff" stroke-width="1.6"/>`,
  dish: (c) => `<path d="M8 30a14 14 0 0 1 20-20z" fill="${c}"/><path d="M18 20l10-10M25 7l6 6" stroke="${c}" stroke-width="2.4"/><path d="M14 32l-4 5h14l-4-5" fill="${c}"/>`,
};

export const iconNames = Object.keys(ICONS);

export function icon(name, x, y, size, colour = NAVY) {
  const draw = ICONS[name];
  if (!draw) throw new Error(`no icon drawn for ${name}`);
  const k = size / 40;
  return `<g transform="translate(${x} ${y}) scale(${k.toFixed(4)})">${draw(colour)}</g>`;
}

// ---------- banner strip for the second-tier cards ----------
// A 190 x 58 band: soft tinted ground, up to three flags on the left and up to two icons on the right,
// with an optional big figure. The caption bar is drawn by the page in HTML so its text stays crisp.

export function banner(spec, w = 190, h = 52) {
  const { flags = [], icons = [], tint = '#e8eef7', figure, figureColour = '#0f1d3a' } = spec;
  let s = `<rect width="${w}" height="${h}" fill="${tint}"/>`;
  s += `<path d="M0 ${h - 9}H${w}" stroke="rgba(15,29,58,.12)" stroke-width="18"/>`;
  const fw = 36, fh = 24;
  flags.forEach((code, i) => { s += flag(code, 10 + i * (fw + 6), (h - fh) / 2 - 3, fw, fh); });
  let ix = w - 10;
  const iconSize = figure ? 34 : 38;
  [...icons].reverse().forEach((spec2) => {
    const [name, colour] = Array.isArray(spec2) ? spec2 : [spec2, NAVY];
    ix -= iconSize;
    s += icon(name, ix, (h - iconSize) / 2 - 2, iconSize, colour);
    ix -= 6;
  });
  if (figure) {
    const fx = flags.length ? 10 + flags.length * (fw + 6) + 2 : 12;
    s += `<text x="${fx}" y="${h / 2 + 7}" font-family="Georgia, serif" font-size="21" font-weight="700" fill="${figureColour}">${figure}</text>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
}

export { star, NAVY, INK };
