/**
 * Generates the PWA / app icons in public/icons with zero dependencies.
 *
 *   node scripts/generate-icons.mjs
 *
 * The mark mirrors the site's hero stamp: a copper "G" ring on forest green.
 * Pure Node (zlib only) so it can run anywhere without image tooling.
 */
import { deflateSync } from 'node:zlib';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const OUT_DIR = fileURLToPath(new URL('../public/icons/', import.meta.url));

const FOREST = [23, 63, 59];
const COPPER = [182, 111, 66];
const LAKE = [143, 196, 189];

/** @param {number} value */
const clamp01 = (value) => Math.min(1, Math.max(0, value));

/**
 * Signed distance helpers (all values in normalised 0..1 units).
 * @param {number} x
 * @param {number} y
 * @param {number} cx
 * @param {number} cy
 */
const distance = (x, y, cx, cy) => Math.hypot(x - cx, y - cy);

/** Rounded-square background coverage. */
function background(x, y, radius) {
  const half = 0.5;
  const dx = Math.abs(x - half) - (half - radius);
  const dy = Math.abs(y - half) - (half - radius);
  const outside = Math.hypot(Math.max(dx, 0), Math.max(dy, 0));
  const inside = Math.min(Math.max(dx, dy), 0);
  const d = outside + inside - radius;
  return clamp01(0.5 - d / 0.0025);
}

/** Ring with a gap in the upper right plus the crossbar of the letter G. */
function glyph(x, y, scale) {
  const cx = 0.5;
  const cy = 0.5;
  const outer = 0.31 * scale;
  const inner = 0.2 * scale;
  const r = distance(x, y, cx, cy);
  const ring = clamp01((outer - r) / 0.0022) * clamp01((r - inner) / 0.0022);

  // Angle measured clockwise from 3 o'clock (screen coordinates, y grows downward).
  const angle = (Math.atan2(y - cy, x - cx) * 180) / Math.PI;
  const inGap = angle > -72 && angle < 5;
  const ringMask = inGap ? 0 : 1;

  // Crossbar: from the centre out to the ring, just below the 3 o'clock position.
  const barStart = cx + 0.02 * scale;
  const barEnd = cx + outer;
  const barTop = cy + 0.015 * scale;
  const barBottom = cy + 0.095 * scale;
  const bar =
    x < barStart || x > barEnd
      ? 0
      : clamp01(
          Math.min(Math.min(x - barStart, barEnd - x), Math.min(y - barTop, barBottom - y)) / 0.0022,
        );

  return clamp01(Math.max(ring * ringMask, bar));
}

/** Lake disc behind the ring, for a touch of hill-country colour. */
function lake(x, y) {
  const d = distance(x, y, 0.5, 0.5);
  return clamp01((0.372 - d) / 0.0025) * 0.22;
}

/** @param {number} width @param {number} height @param {number} radius @param {number} scale */
function render(width, height, radius, scale) {
  const pixels = Buffer.alloc(width * height * 4);
  const samples = 3;
  for (let py = 0; py < height; py += 1) {
    for (let px = 0; px < width; px += 1) {
      let bg = 0;
      let gl = 0;
      let lk = 0;
      for (let sy = 0; sy < samples; sy += 1) {
        for (let sx = 0; sx < samples; sx += 1) {
          const x = (px + (sx + 0.5) / samples) / width;
          const y = (py + (sy + 0.5) / samples) / height;
          bg += background(x, y, radius);
          gl += glyph(x, y, scale);
          lk += lake(x, y);
        }
      }
      const total = samples * samples;
      const bgA = bg / total;
      const glA = gl / total;
      const lkA = lk / total;

      // lake disc, then copper glyph, both over the forest background
      let r = FOREST[0];
      let g = FOREST[1];
      let b = FOREST[2];
      r = r * (1 - lkA) + LAKE[0] * lkA;
      g = g * (1 - lkA) + LAKE[1] * lkA;
      b = b * (1 - lkA) + LAKE[2] * lkA;
      r = r * (1 - glA) + COPPER[0] * glA;
      g = g * (1 - glA) + COPPER[1] * glA;
      b = b * (1 - glA) + COPPER[2] * glA;

      const offset = (py * width + px) * 4;
      pixels[offset] = Math.round(r);
      pixels[offset + 1] = Math.round(g);
      pixels[offset + 2] = Math.round(b);
      pixels[offset + 3] = Math.round(bgA * 255);
    }
  }
  return pixels;
}

/** @param {Buffer} data @param {number} width @param {number} height */
function toPng(data, width, height) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (width * 4 + 1)] = 0; // filter: none
    data.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }

  const chunk = (type, body) => {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(body.length, 0);
    const typeBuffer = Buffer.from(type, 'ascii');
    const crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crcTable[n] = c >>> 0;
    }
    let crc = 0xffffffff;
    for (const byte of Buffer.concat([typeBuffer, body])) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    const crcBuffer = Buffer.alloc(4);
    crcBuffer.writeUInt32BE((crc ^ 0xffffffff) >>> 0, 0);
    return Buffer.concat([length, typeBuffer, body, crcBuffer]);
  };

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type: RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const targets = [
  { file: 'icon-32.png', size: 32, radius: 0.18, scale: 1 },
  { file: 'icon-192.png', size: 192, radius: 0.2, scale: 1 },
  { file: 'icon-512.png', size: 512, radius: 0.2, scale: 1 },
  { file: 'apple-touch-icon.png', size: 180, radius: 0, scale: 1 },
  { file: 'icon-maskable-512.png', size: 512, radius: 0, scale: 0.72 },
];

await mkdir(OUT_DIR, { recursive: true });
for (const target of targets) {
  const png = toPng(render(target.size, target.size, target.radius, target.scale), target.size, target.size);
  await writeFile(join(OUT_DIR, target.file), png);
  console.log(`wrote public/icons/${target.file} (${target.size}x${target.size}, ${png.length} bytes)`);
}
