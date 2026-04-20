# Hilma af Klint — image hosting plan

**Problem.** ~100 source images at 1–2 MB each ≈ **100–200 MB** for one window. Dropping them into [public/](public/) would bloat the git repo, slow every clone, push the Vercel deploy bundle past the Hobby-tier 100 MB limit, and ship full-resolution files to every visitor regardless of viewport.

**Goal.** Keep the gallery feeling generous and high-fidelity without paying for it on cold loads, in git history, or in CI/deploy time.

---

## Principle

Two levers matter, in this order:

1. **Preprocess.** Most of the weight is fat, not pixels. A 1.5 MB camera JPEG becomes a ~250 KB AVIF at 2400 px with no visible loss. That alone takes 200 MB → ~25 MB before any hosting decision.
2. **Tier by intent.** A visitor browsing the grid needs a 400-px thumbnail (~20 KB). Only the zoom/lightbox view needs the 2400-px hero. Never ship the hero to someone who only sees the thumb.

Host choice is the smaller decision. Do (1) and (2) first.

---

## Pipeline

### Stage 1 — Preprocess (local, one-time per batch)

Add `sharp` as a dev-only dep. Script under [scripts/process-hilma.ts](scripts/process-hilma.ts):

- Input: `~/source/hilma/*.{jpg,png,tif}` (off-repo, MJ's working folder)
- Output: two derivatives per image
  - `thumb` — 800 px on long edge, AVIF q=55 + WebP q=72 fallback (~20–40 KB)
  - `full` — 2400 px on long edge, AVIF q=62 + WebP q=80 fallback (~150–350 KB)
- Emit a `hilma-manifest.json` with `{ id, w, h, blurDataURL, alt }` per image
- Generate `blurDataURL` via `sharp().resize(16).blur()` → base64 — used for `next/image` placeholder

Expected total after preprocess: **~30–50 MB across both tiers combined** for 100 images.

### Stage 2 — Host off-repo

Two viable options. Pick one.

|                                 | Vercel Blob                     | Cloudflare R2                                            |
| ------------------------------- | ------------------------------- | -------------------------------------------------------- |
| Setup                           | `npx vercel blob` — zero config | Create bucket, bind custom domain or use `pub-*.r2.dev`  |
| Cost at ~50 MB + modest traffic | ~$0–1/mo                        | **$0** (10 GB storage + zero egress on free tier)        |
| `next/image` integration        | Native, same-origin             | Add `remotePatterns` in [next.config.ts](next.config.ts) |
| Lock-in                         | Vercel-only                     | S3-compatible, portable                                  |

**Recommendation: Cloudflare R2.** Zero egress fees matter if the gallery ever gets traffic, and the setup cost is one afternoon. If MJ wants the absolute shortest path and doesn't mind a small bill, Vercel Blob is fine.

Upload step: one-shot script using `@aws-sdk/client-s3` pointed at R2. Keys: `hilma/thumb/<id>.avif`, `hilma/full/<id>.avif`, etc.

### Stage 3 — Serve

- Store only the **manifest JSON** in the repo ([content/hilma-manifest.json](content/hilma-manifest.json)) — ~15 KB, source of truth for the gallery component
- Gallery component reads manifest, renders `next/image` with:
  - `src` pointing at R2 thumb URL
  - `placeholder="blur"` + `blurDataURL` from manifest
  - `loading="lazy"` (default) + `sizes` set to actual rendered width
- Lightbox/zoom swaps to full-tier URL on click — lazy-imported, so the zoom bundle never loads unless a visitor asks for it
- Add R2 host to [next.config.ts](next.config.ts):
  ```ts
  images: {
    remotePatterns: [{ protocol: "https", hostname: "<your-r2-domain>" }];
  }
  ```

---

## Guardrails

- **Don't commit source files.** Add `/source-images/` (or wherever raw masters live) to [.gitignore](.gitignore). The repo holds the manifest and the processing script — nothing binary.
- **Keep the manifest deterministic.** Sort by filename so diffs are readable when new images land.
- **Budget.** If a page loads all 100 thumbs eagerly, that's still ~2–4 MB of images on one scroll. Virtualize or paginate the grid once the count climbs past ~40 visible at once — use `IntersectionObserver`, not a library.
- **Respect the aesthetic.** The existing [Poster.tsx](components/Poster.tsx) and [Window.tsx](components/Window.tsx) treat each piece as a framed aperture. The Hilma gallery should reveal the grid _inside_ its window, not break out of it. Full-bleed lightbox on click is the escape hatch.

---

## Execution order

1. Write `scripts/process-hilma.ts` and run it against MJ's source folder
2. Eyeball a handful of AVIFs at 2400 px — tune quality if anything looks mushy
3. Stand up R2 bucket, upload derivatives + manifest
4. Add `remotePatterns` to [next.config.ts](next.config.ts)
5. Build the gallery component inside the Hilma window (active state), keeping the poster state untouched
6. Measure: Lighthouse on `/work/hilma-ai-klint`, target LCP < 2.0s on 4G

## Open questions for MJ

- Are the 100 images a fixed set, or will more land over time? (Affects whether the script needs incremental-upload logic or a full re-sync is fine.)
- Is there a zoom/full-res expectation (pinch-zoom on mobile, click-to-enlarge on desktop), or is the grid the whole experience?
- Any images that need special treatment — transparent PNGs, sequences, anything with text that shouldn't be re-encoded?
