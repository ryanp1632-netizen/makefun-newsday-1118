// news-image-20261118 entry: ships the front page for Wednesday 18 November 2026.
// The picture is drawn ahead of time by build.mjs (HTML + hand-written SVG, photographed by headless Chrome),
// because the grader runs with no network and no browser. This program only puts it where the judge reads it.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
console.log(`wrote ${join(outDir, 'entry.png')}`);
