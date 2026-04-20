# Orrery Integration Plan

Two open items for the Orrery iframe experience:

1. **Mobile default: 4k (lowest) object count** — small viewports should never land on the heavy preset.
2. **Music isn't playing** — tracks live on the wrong origin relative to the iframe.

Both require changes in the **Orrery repo** (`mjons.github.io/Orrery` — the inline-module HTML at that URL), not just this portfolio.

---

## 1. Mobile → default to 4k objects

### Current state

- Orrery is a single-page app at `https://mjons.github.io/Orrery/`, served as inline modules.
- Object count is almost certainly a hard-coded default or a stored preference — there is no URL param or `postMessage` hook today.
- The portfolio embeds it in [components/OrreryEmbed.tsx](components/OrreryEmbed.tsx) with a bare `src="https://mjons.github.io/Orrery/"`.

### Plan

**A. Orrery side (one-time edit in the Orrery repo)**

1. Near the top of the inline module, parse a URL param:
   ```js
   const params = new URLSearchParams(location.search);
   const urlObjects = params.get("objects"); // "4k" | "16k" | "64k" | null
   ```
2. When initializing the object-count state, prefer the URL param over the hard-coded default:
   ```js
   const DEFAULT_OBJECTS = "16k";
   const initialObjects = urlObjects ?? DEFAULT_OBJECTS;
   ```
3. Validate the value before applying (fall back to default if unknown).
4. Commit and push to `mjons.github.io/Orrery`. GitHub Pages redeploys on push.

**B. Portfolio side (this repo)**

Update [components/OrreryEmbed.tsx](components/OrreryEmbed.tsx) so the iframe `src` carries `?objects=4k` when the viewport is mobile:

```tsx
const [src, setSrc] = useState("https://mjons.github.io/Orrery/");

useEffect(() => {
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  setSrc(
    mobile
      ? "https://mjons.github.io/Orrery/?objects=4k"
      : "https://mjons.github.io/Orrery/",
  );
}, []);
```

The `useEffect` runs client-side only, so the SSR'd iframe still has a stable default; the mobile visitor gets re-pointed right after hydration. Breakpoint matches the existing Tailwind `md:` breakpoint used elsewhere.

### Open question

- What param name does the Orrery want? I'm proposing `?objects=4k` — confirm, or specify the existing internal key (e.g. `?quality=low`, `?count=4000`). Whichever it is, the Orrery edit and the embed edit must agree.

---

## 2. Music fix

### Why it's broken

The Orrery's player uses hard-coded relative paths:

```js
const TRACKS = [
  { file: "ssi_tracks/Bough-Bend.mp3", … },
  { file: "ssi_tracks/First Kindling.mp3", … },
  …
];
audio.src = encodeURI(TRACKS[idx].file);
```

Since the iframe's origin is `mjons.github.io`, these resolve to `https://mjons.github.io/Orrery/ssi_tracks/*.mp3` — which don't exist. The 20 mp3s we pushed to this portfolio at `public/orrery/tracks/` are on the wrong domain.

The `<audio>` element is also set with `audio.crossOrigin = "anonymous"`, so any absolute-URL fix needs CORS headers on the host serving the files.

### Three fix paths (pick one)

**Option A — Host the tracks in the Orrery repo** _(recommended)_

- Commit `ssi_tracks/*.mp3` directly to the Orrery repo so the existing relative paths resolve.
- No code change needed; no CORS needed.
- Cost: ~55 MB added to the Orrery repo. GitHub soft-warns at 50 MB/file (fine — each track is 1–4 MB) and caps repos at 5 GB total.
- Then **remove** `public/orrery/tracks/` from this portfolio repo to avoid hosting the same 55 MB twice.

**Option B — Use absolute URLs pointing at the portfolio**

- Edit the Orrery's `TRACKS` array to use full URLs: `"https://<vercel-domain>/orrery/tracks/Bough-Bend.mp3"` etc. (URL-encode the spaces/parens).
- Add CORS headers on this Next.js project so `mjons.github.io` can load them:
  ```ts
  // next.config.ts
  headers: async () => [{
    source: "/orrery/tracks/:path*",
    headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
  }],
  ```
- Keeps the tracks in a single place (this repo) but couples the Orrery to the portfolio's Vercel domain. If the domain changes, the Orrery breaks.

**Option C — Make the Orrery's base URL configurable**

- Add a param read in the Orrery: `?tracksBase=https://six-windows.vercel.app/orrery/tracks`. The player prepends it to each track filename.
- The portfolio appends that param alongside `?objects=4k`.
- Decouples the Orrery from any specific host. More work up-front, cleanest long-term.

### Recommendation

**Start with Option A.** It's the simplest fix, lets us delete the 55 MB from this portfolio (cleaner deploys, smaller git clones), and doesn't require any CORS or domain-coupling. Revisit B/C only if you want the tracks managed alongside the portfolio for some reason.

### Side issue: duplicate `(1)` files

There are 20 mp3s — 10 tracks, each with an alternate `(1)` master (slightly different byte sizes). The Orrery's `TRACKS` array only lists 10. Before committing to either A or B, decide whether to ship the alternates at all, or delete them. If kept, they need entries in `TRACKS` to be reachable.

---

## Sequencing

If you go with the recommended path:

1. Pick a param name for mobile quality (open question above).
2. In the **Orrery repo**: add URL-param parsing for objects, commit `ssi_tracks/*.mp3` into the repo, push.
3. In **this repo**: update `OrreryEmbed.tsx` to append `?objects=4k` on mobile, then `git rm -r public/orrery/tracks/`, commit, push.
4. Verify on a real phone: 4k default kicks in, tracks load from the Orrery's own origin.
