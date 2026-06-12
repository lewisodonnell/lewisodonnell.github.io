// Generates public/og.png (1200×630 OpenGraph card) and
// public/apple-touch-icon.png (180×180 monogram). Run `npm run og` after
// changing the name or tagline; the PNGs are committed so the build itself
// never depends on this script.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const BG = '#FCFCFA';
const INK = '#16181D';
const SECONDARY = '#5A5F6A';
const HAIRLINE = '#E4E5E2';
const ACCENT = '#C9356B';

const NAME = 'Lewis O’Donnell';
const TAGLINE = 'I build time-series foundation models for fusion.';

// Newsreader wght-500 TTF instance (satori needs ttf/otf, not woff2).
// Refresh the URL if it ever 404s:
//   curl 'https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@36,500'
const FONT_URL =
  'https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBv4ByzBDXXD9JVF438wSo_ADA.ttf';
const fontPath = new URL('./.fonts/newsreader-500.ttf', import.meta.url);

if (!existsSync(fontPath)) {
  await mkdir(new URL('./.fonts/', import.meta.url), { recursive: true });
  const res = await fetch(FONT_URL);
  if (!res.ok) throw new Error(`Font download failed: ${res.status}`);
  await writeFile(fontPath, Buffer.from(await res.arrayBuffer()));
}
const fontData = await readFile(fontPath);

// Same motif as the site's section dividers: a quiet baseline with one
// brief burst of activity. Deterministic — no randomness.
function tracePaths(x0, x1, mid, scale = 1) {
  const burstStart = x0 + (x1 - x0) * 0.18;
  const burstLen = (x1 - x0) * 0.12;
  const pts = [];
  for (let x = x0; x <= x1; x += 6) {
    let y;
    if (x >= burstStart && x <= burstStart + burstLen) {
      const t = (x - burstStart) / burstLen;
      const env = Math.min(1, t / 0.15) * Math.exp(-2.4 * t);
      y = mid - env * 16 * scale * Math.sin(t * Math.PI * 5) - env * 3 * scale;
    } else {
      y = mid + Math.sin(x * 12.9898) * 1.2 * scale;
    }
    pts.push([x, +y.toFixed(2)]);
  }
  const toPath = (p) =>
    p.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
  const burst = pts.filter(
    ([x]) => x >= burstStart - 6 && x <= burstStart + burstLen + 6,
  );
  return { base: toPath(pts), burst: toPath(burst) };
}

async function renderPng(element, width, height, extraSvg = '') {
  let svg = await satori(element, {
    width,
    height,
    fonts: [{ name: 'Newsreader', data: fontData, weight: 500, style: 'normal' }],
  });
  if (extraSvg) svg = svg.replace('</svg>', `${extraSvg}</svg>`);
  return new Resvg(svg).render().asPng();
}

const og = {
  type: 'div',
  props: {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 100px 60px',
      backgroundColor: BG,
      color: INK,
      fontFamily: 'Newsreader',
    },
    children: [
      { type: 'div', props: { style: { fontSize: 84 }, children: NAME } },
      {
        type: 'div',
        props: {
          style: { fontSize: 37, marginTop: 26, color: SECONDARY },
          children: TAGLINE,
        },
      },
    ],
  },
};

const { base, burst } = tracePaths(100, 1100, 500);
await writeFile(
  new URL('../public/og.png', import.meta.url),
  await renderPng(
    og,
    1200,
    630,
    `<path d="${base}" fill="none" stroke="${HAIRLINE}" stroke-width="2"/>` +
      `<path d="${burst}" fill="none" stroke="${ACCENT}" stroke-width="2" opacity="0.9"/>`,
  ),
);

const icon = {
  type: 'div',
  props: {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: BG,
      color: INK,
      fontFamily: 'Newsreader',
      fontSize: 88,
      letterSpacing: '-3px',
    },
    children: 'LO',
  },
};
await writeFile(
  new URL('../public/apple-touch-icon.png', import.meta.url),
  await renderPng(icon, 180, 180),
);

console.log('Wrote public/og.png and public/apple-touch-icon.png');
