import Image from "next/image";
import type { PosterTreatment } from "@/content/works";

const COLORS = {
  shadow: "#050308",
  deep: "#241416",
  terracotta: "#7A382E",
  orange: "#EB855C",
  gold: "#FFD993",
  cream: "#FFE9D9",
};

interface Props {
  treatment: PosterTreatment;
}

export default function Poster({ treatment }: Props) {
  switch (treatment) {
    case "meows":
      return <MeowsPoster />;
    case "orrery":
      return <OrreryPoster />;
    case "hilma":
      return <HilmaPoster />;
    case "filaments":
      return <FilamentsPoster />;
    case "space-station-builder":
      return <SpaceStationBuilderPoster />;
    case "watchless":
      return <WatchlessPoster />;
    case "neutral-deep":
      return <NeutralDeepPoster />;
    case "neutral-cream":
      return <NeutralCreamPoster />;
  }
}

const SVG_PROPS = {
  viewBox: "0 0 400 500",
  preserveAspectRatio: "xMidYMid slice" as const,
  className: "absolute inset-0 h-full w-full",
  "aria-hidden": true,
} as const;

function MeowsPoster() {
  return (
    <>
      <Image
        src="/meows/banner.jpg"
        alt=""
        fill
        sizes="(min-width: 768px) 750px, 100vw"
        className="object-cover"
        unoptimized
        priority={false}
      />
      {/* deep vignette — pulls the mosaic into the KODAK palette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 55%, rgba(5,3,8,0) 40%, rgba(5,3,8,0.55) 100%)",
        }}
      />
      {/* folio mark overlay */}
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden
      >
        <text
          x="30"
          y="40"
          fill={COLORS.gold}
          fontFamily="var(--font-jetbrains), monospace"
          fontSize="9"
          letterSpacing="3"
          opacity="0.75"
        >
          I
        </text>
      </svg>
    </>
  );
}

function OrreryPoster() {
  return (
    <>
      <Image
        src="/orrery/banner.png"
        alt=""
        fill
        sizes="(min-width: 768px) 900px, 100vw"
        className="object-cover"
        priority={false}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 55%, rgba(5,3,8,0) 40%, rgba(5,3,8,0.55) 100%)",
        }}
      />
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden
      >
        <text
          x="30"
          y="40"
          fill={COLORS.gold}
          fontFamily="var(--font-jetbrains), monospace"
          fontSize="9"
          letterSpacing="3"
          opacity="0.75"
        >
          II
        </text>
      </svg>
    </>
  );
}

function HilmaPoster() {
  return (
    <>
      <Image
        src="/hilma/banner.avif"
        alt=""
        fill
        sizes="(min-width: 768px) 750px, 100vw"
        className="object-cover"
        unoptimized
        priority={false}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 55%, rgba(5,3,8,0) 40%, rgba(5,3,8,0.55) 100%)",
        }}
      />
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden
      >
        <text
          x="30"
          y="40"
          fill={COLORS.gold}
          fontFamily="var(--font-jetbrains), monospace"
          fontSize="9"
          letterSpacing="3"
          opacity="0.75"
        >
          III
        </text>
      </svg>
    </>
  );
}

function FilamentsPoster() {
  return (
    <>
      <Image
        src="/filaments/banner.jpg"
        alt=""
        fill
        sizes="(min-width: 768px) 900px, 100vw"
        className="object-cover"
        priority={false}
      />
      {/* deep vignette to seat the piece against the shadow-black field */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 55%, rgba(5,3,8,0) 35%, rgba(5,3,8,0.6) 100%)",
        }}
      />
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden
      >
        <text
          x="30"
          y="40"
          fill={COLORS.gold}
          fontFamily="var(--font-jetbrains), monospace"
          fontSize="9"
          letterSpacing="3"
          opacity="0.75"
        >
          IV
        </text>
      </svg>
    </>
  );
}

function SpaceStationBuilderPoster() {
  return (
    <>
      <Image
        src="/space_station_builder/space_builder_banner.png"
        alt=""
        fill
        sizes="(min-width: 768px) 500px, 100vw"
        className="object-cover"
        unoptimized
        priority={false}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 55%, rgba(5,3,8,0) 45%, rgba(5,3,8,0.5) 100%)",
        }}
      />
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden
      >
        <text
          x="30"
          y="40"
          fill={COLORS.gold}
          fontFamily="var(--font-jetbrains), monospace"
          fontSize="9"
          letterSpacing="3"
          opacity="0.75"
        >
          V
        </text>
      </svg>
    </>
  );
}

function NeutralDeepPoster() {
  return (
    <svg {...SVG_PROPS}>
      <rect width="400" height="500" fill={COLORS.deep} />
      {/* centered inset border — the "mullion" doubled */}
      <rect
        x="60"
        y="80"
        width="280"
        height="340"
        fill="none"
        stroke={COLORS.gold}
        strokeWidth="0.5"
        opacity="0.35"
      />
      <line
        x1="200"
        y1="240"
        x2="200"
        y2="260"
        stroke={COLORS.gold}
        strokeWidth="0.5"
        opacity="0.5"
      />
      <text
        x="30"
        y="40"
        fill={COLORS.gold}
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="9"
        letterSpacing="3"
        opacity="0.55"
      >
        V
      </text>
    </svg>
  );
}

function WatchlessPoster() {
  return (
    <>
      <Image
        src="/watchless/banner.avif"
        alt=""
        fill
        sizes="(min-width: 768px) 640px, 100vw"
        className="object-cover"
        priority={false}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 55%, rgba(5,3,8,0) 40%, rgba(5,3,8,0.55) 100%)",
        }}
      />
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden
      >
        <text
          x="30"
          y="40"
          fill={COLORS.gold}
          fontFamily="var(--font-jetbrains), monospace"
          fontSize="9"
          letterSpacing="3"
          opacity="0.75"
        >
          VI
        </text>
      </svg>
    </>
  );
}

function NeutralCreamPoster() {
  return (
    <svg {...SVG_PROPS}>
      <rect width="400" height="500" fill={COLORS.cream} />
      <rect
        x="60"
        y="80"
        width="280"
        height="340"
        fill="none"
        stroke={COLORS.shadow}
        strokeWidth="0.5"
        opacity="0.35"
      />
      <line
        x1="200"
        y1="240"
        x2="200"
        y2="260"
        stroke={COLORS.shadow}
        strokeWidth="0.5"
        opacity="0.5"
      />
      <text
        x="30"
        y="40"
        fill={COLORS.terracotta}
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="9"
        letterSpacing="3"
        opacity="0.7"
      >
        VI
      </text>
    </svg>
  );
}
