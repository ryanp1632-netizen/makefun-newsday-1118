// news-image-20261118 entry: ships the front page for Wednesday 18 November 2026.
// The picture is drawn ahead of time by build.mjs (HTML + hand-written SVG, photographed by headless Chrome),
// because the grader runs with no network and no browser. This program only puts it where the judge reads it.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1048576;
const SIDE = 1024;

// Check the picture against the gate's rules before shipping it: a whole PNG, at most 1024 x 1024, at most 1 MiB.
const png = readFileSync(new URL('./entry.png', import.meta.url));
if (png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('entry.png is not a PNG');
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width > SIDE || height > SIDE) throw new Error(`entry.png is ${width}x${height}, larger than ${SIDE}x${SIDE}`);
if (png.length > MAX_BYTES) throw new Error(`entry.png is ${png.length} bytes, over 1 MiB`);
if (png.subarray(png.length - 8, png.length - 4).toString('latin1') !== 'IEND') throw new Error('entry.png is cut short: no IEND chunk');

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), png);
console.log(`wrote ${join(outDir, 'entry.png')}: ${width}x${height}, ${png.length} bytes`);
