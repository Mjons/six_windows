import Link from "next/link";
import type { Work } from "@/content/works";
import Poster from "./Poster";

interface Props {
  work: Work;
}

const DEFAULT_MAX_PX: Record<Work["size"], number> = {
  sm: 360,
  md: 520,
  lg: 720,
};

export default function Window({ work }: Props) {
  const aspect = work.aspect ?? "4/5";
  const maxPx = work.maxPx ?? DEFAULT_MAX_PX[work.size];
  const frameStyle = {
    aspectRatio: aspect,
    maxWidth: `${maxPx}px`,
  };

  const inner = (
    <figure className="group block">
      <div className="window-frame relative w-full mx-0" style={frameStyle}>
        <Poster treatment={work.poster} />
      </div>

      <figcaption className="mt-8 max-w-[44ch] space-y-3">
        <div className="flex items-baseline gap-4">
          <span className="folio">{work.roman} / VI</span>
          <span className="h-px flex-1 bg-cream/15" />
        </div>

        <h2 className="display-soft text-cream text-[clamp(2rem,4vw,3.4rem)] leading-[0.98]">
          {work.title}
        </h2>

        <p className="text-cream/75 text-[1.02rem] leading-relaxed">
          {work.caption}
        </p>

        <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-gold/75">
          {work.medium} &nbsp;·&nbsp; {work.year}
        </p>
      </figcaption>
    </figure>
  );

  if (work.href) {
    return (
      <Link
        href={work.href}
        className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/60"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
