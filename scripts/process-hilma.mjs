// Preprocess Hilma gallery source images into small AVIFs + a manifest.
// Run from the project root: `node scripts/process-hilma.mjs`
//
// Inputs  : content/hilma/*.{png,jpg,jpeg,webp,tif,tiff}  + content/hilma_banner.jpg
// Outputs : public/hilma/thumb/<id>.avif  (~800px long edge)
//           public/hilma/full/<id>.avif   (~2400px long edge)
//           public/hilma/banner.avif
//           content/hilma-manifest.json   (id, w, h, blurDataURL per image)

import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "content", "hilma");
const BANNER_SRC = path.join(ROOT, "content", "hilma_banner.jpg");
const OUT_DIR = path.join(ROOT, "public", "hilma");
const OUT_THUMB = path.join(OUT_DIR, "thumb");
const OUT_FULL = path.join(OUT_DIR, "full");
const MANIFEST = path.join(ROOT, "content", "hilma-manifest.json");

const THUMB_MAX = 800;
const FULL_MAX = 2400;
const CONCURRENCY = 4;

await mkdir(OUT_THUMB, { recursive: true });
await mkdir(OUT_FULL, { recursive: true });

// --- banner ---------------------------------------------------------------
{
  const out = path.join(OUT_DIR, "banner.avif");
  await sharp(BANNER_SRC)
    .resize({ width: 2000, withoutEnlargement: true })
    .avif({ quality: 60, effort: 5 })
    .toFile(out);
  const s = await stat(out);
  console.log(`banner  → ${rel(out)}  (${kb(s.size)} KB)`);
}

// --- gallery --------------------------------------------------------------
const files = (await readdir(SRC_DIR))
  .filter((f) => /\.(png|jpe?g|webp|tiff?)$/i.test(f))
  .sort();

console.log(`found ${files.length} source images\n`);

const manifest = [];
let processed = 0;
let bytesThumb = 0;
let bytesFull = 0;

async function processOne(idx) {
  const file = files[idx];
  const id = `hilma-${String(idx + 1).padStart(3, "0")}`;
  const srcPath = path.join(SRC_DIR, file);
  const thumbOut = path.join(OUT_THUMB, `${id}.avif`);
  const fullOut = path.join(OUT_FULL, `${id}.avif`);

  const meta = await sharp(srcPath).metadata();

  await sharp(srcPath)
    .resize({
      width: THUMB_MAX,
      height: THUMB_MAX,
      fit: "inside",
      withoutEnlargement: true,
    })
    .avif({ quality: 55, effort: 4 })
    .toFile(thumbOut);

  await sharp(srcPath)
    .resize({
      width: FULL_MAX,
      height: FULL_MAX,
      fit: "inside",
      withoutEnlargement: true,
    })
    .avif({ quality: 62, effort: 5 })
    .toFile(fullOut);

  // Tiny JPEG data URL for next/image's blur placeholder (widest browser support).
  const blurBuf = await sharp(srcPath)
    .resize(16, 16, { fit: "inside" })
    .jpeg({ quality: 50 })
    .toBuffer();
  const blurDataURL = `data:image/jpeg;base64,${blurBuf.toString("base64")}`;

  const ts = await stat(thumbOut);
  const fs = await stat(fullOut);
  bytesThumb += ts.size;
  bytesFull += fs.size;
  processed++;

  manifest[idx] = {
    id,
    w: meta.width ?? 1,
    h: meta.height ?? 1,
    blurDataURL,
    alt: `Hilma af Klint style — generative painting ${idx + 1}`,
  };

  if (processed % 10 === 0 || processed === files.length) {
    console.log(
      `  [${processed}/${files.length}]  thumb:${kb(bytesThumb)}KB  full:${kb(bytesFull)}KB`,
    );
  }
}

// Simple concurrency pool
let cursor = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (true) {
      const i = cursor++;
      if (i >= files.length) return;
      try {
        await processOne(i);
      } catch (err) {
        console.error(`  ! ${files[i]}:`, err.message);
      }
    }
  }),
);

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`\nmanifest → ${rel(MANIFEST)}  (${manifest.length} entries)`);
console.log(`totals → thumb ${mb(bytesThumb)} MB · full ${mb(bytesFull)} MB`);

// --- helpers --------------------------------------------------------------
function rel(p) {
  return path.relative(ROOT, p).replaceAll("\\", "/");
}
function kb(b) {
  return (b / 1024).toFixed(0);
}
function mb(b) {
  return (b / 1024 / 1024).toFixed(1);
}
