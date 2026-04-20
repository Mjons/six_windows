export type Kind = "cosmic" | "generative" | "gallery";

export type PosterTreatment =
  | "meows"
  | "orrery"
  | "hilma"
  | "filaments"
  | "space-station-builder"
  | "watchless"
  | "neutral-deep"
  | "neutral-cream";

export interface Work {
  id: string;
  roman: string;
  title: string;
  medium: string;
  year: string;
  kind: Kind;
  caption: string;
  statement?: string;
  poster: PosterTreatment;
  inset: "left" | "right" | "center" | "bleed";
  size: "sm" | "md" | "lg";
  href?: string;
  // Aspect + max width overrides for pieces whose source art isn't 4/5 portrait.
  // Used to avoid cropping or upscaling low-res sources.
  aspect?: string;
  maxPx?: number;
}

export const works: Work[] = [
  {
    id: "minimalistic-meows",
    roman: "I",
    title: "Minimalistic Meows",
    medium: "gallery · ink on pixel",
    year: "2024",
    kind: "gallery",
    caption: "Cats, reduced to the fewest strokes that still purr.",
    poster: "meows",
    inset: "left",
    size: "md",
    href: "/work/minimalistic-meows",
    aspect: "3/1",
    maxPx: 750,
  },
  {
    id: "orrery",
    roman: "II",
    title: "Orrery",
    medium: "cosmic simulation · WebGL",
    year: "2025",
    kind: "cosmic",
    caption: "A mechanical solar system, ticking in warm brass.",
    statement:
      "Six rings, each keeping its own time. The planets are not to scale — nothing ever is — but the gears are honest, and the light falls where it should.",
    poster: "orrery",
    inset: "bleed",
    size: "lg",
    href: "/work/orrery",
    aspect: "4362/1890",
    maxPx: 900,
  },
  {
    id: "hilma-ai-klint",
    roman: "III",
    title: "Hilma AI Klint",
    medium: "gallery · diffusion",
    year: "2025",
    kind: "gallery",
    caption:
      "Spiritualist geometries, rendered by a machine that does not believe.",
    poster: "hilma",
    inset: "right",
    size: "md",
    href: "/work/hilma-ai-klint",
    aspect: "3/1",
    maxPx: 750,
  },
  {
    id: "filaments",
    roman: "IV",
    title: "Filaments",
    medium: "cosmic · canvas",
    year: "2025",
    kind: "cosmic",
    caption: "The cosmic web, pulled taut between unseen masses.",
    poster: "filaments",
    inset: "left",
    size: "lg",
    href: "/work/filaments",
    aspect: "3/1",
    maxPx: 900,
  },
  {
    id: "space-station-builder",
    roman: "V",
    title: "Space Station Builder",
    medium: "generative · canvas",
    year: "2025",
    kind: "generative",
    caption:
      "An orbital colony that grows itself — modules accrete across eras, mesmerizing.",
    poster: "space-station-builder",
    inset: "center",
    size: "md",
    href: "/work/space-station-builder",
    aspect: "955/395",
    maxPx: 500,
  },
  {
    id: "watchless",
    roman: "VI",
    title: "Watchless",
    medium: "interactive · web",
    year: "2025",
    kind: "generative",
    caption:
      "A clock with no hands. Time, but only as much of it as you can bear.",
    poster: "watchless",
    inset: "right",
    size: "md",
    href: "/work/watchless",
    aspect: "1256/599",
    maxPx: 640,
  },
];
