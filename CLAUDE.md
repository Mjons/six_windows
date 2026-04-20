# MJ Personal Portfolio

A showcase site for MJ's art projects. Each piece lives in its own "window" — a framed view into something MJ made and thought was pretty enough to share.

## Goals

- **Beautiful, simple, unique.** Not a template. Not a dev portfolio. A gallery.
- **The work is the hero.** Chrome recedes, art dominates.
- **Fast, chill, tactile.** Feels hand-made, not generated.

## Aesthetic direction

The word **window** is load-bearing — treat it literally. Each project is a framed aperture into a world, not a card in a grid.

- **Layout:** asymmetric, spacious, slightly off-kilter. Avoid bootstrap-style rows and even grids. Think gallery wall, not Pinterest.
- **Type:** one expressive display face (serif or experimental sans) + one neutral body face. Big type. Confident scale jumps.
- **Color:** KODAK palette — a warm, film-stock range. Reads like a darkroom print or Voyager golden record, not a cold space-black screensaver.
  - `#050308` shadow black
  - `#241416` deep brown
  - `#7A382E` terracotta
  - `#EB855C` warm orange
  - `#FFD993` creamy gold (clamped)
  - `#FFE9D9` warm white (clamped)

  Default background sits in the dark end (shadow black → deep brown); type and accents pull from the warm end. Terracotta and warm orange are the emotional accents, used sparingly. No gradients by default; if used, only within-palette.

- **Motion:** subtle, physical. Entrances, not flourishes. Hover states that feel like lifting paper or opening a shutter. Respect `prefers-reduced-motion`.
- **Texture:** embrace grain, imperfection, hand-drawn edges where it fits. Avoid the flat-glass AI-default look.

### Anti-patterns (avoid)

- Glassmorphism, neon gradients, generic "hero + 3-column features + CTA" scaffolding
- Stock shadcn card grids presented as-is
- Parallax for its own sake, animated blob backgrounds, "scroll-jacking"
- Emoji decoration, sparkles, "✨ welcome to my portfolio ✨"

## Structure

- **Landing** — a **index that reveals on scroll.** MJ's name and a single line of intent sit in near-silence at the top. The 6 windows unveil one at a time as the visitor descends, each given room to breathe. No navbar bloat, no "view all" grid dump.
- **Windows** — 6 pieces total, three archetypes:
  - **Cosmic simulations** — stars, galaxies; interactive canvas/WebGL
  - **Generative art generators** — interactive, parameterized
  - **Static galleries** — curated imagery
    Each window has a **poster state** (framed preview, inviting) and an **active state** (the piece itself runs, mounted as a React island). Some windows full-bleed, others inset.
- **About** — short, first-person, human.
- **Contact** — one line, one link.

## Tech (confirmed)

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS with a tight custom theme keyed to the KODAK palette above
- **Interactive pieces:** mounted as client-side React islands, lazy-loaded so they don't block the landing page
- **Media:** `next/image` for stills, `<video>` with posters for motion work
- **Deploy:** Vercel
- **No CMS** to start — content lives in typed TS/MDX files per project.

## Working agreements

- Edit existing files over creating new ones. No scaffolding for hypothetical future pages.
- Test visually in a browser before calling UI work done — type-checks ≠ design-checks.
- Keep dependencies lean. Every package added must earn its place.

## Open questions (for MJ)

1. Typefaces — any preferences, or want me to pick a pairing that sits well with the KODAK palette?
2. Domain / hosting already set up, or start fresh?
3. For each of the 6 windows: titles, a short description, and any existing code/assets ready to drop in?
