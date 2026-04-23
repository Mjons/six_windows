import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/content/works";

interface Props {
  work: Work;
  plateNumber: number;
  marginLabel: string;
}

const BANNERS: Record<
  Work["id"],
  { src: string; alt: string; unoptimized?: boolean }
> = {
  "minimalistic-meows": {
    src: "/meows/banner.jpg",
    alt: "A mosaic of minimal cat drawings, each reduced to the fewest strokes that still read as a cat.",
    unoptimized: true,
  },
  "giverny-phos": {
    src: "/giverny-phos/banner.png",
    alt: "Banner for Giverny Phos.",
  },
  "hilma-ai-klint": {
    src: "/hilma/banner.avif",
    alt: "A banner mosaic of Hilma af Klint–style generative paintings.",
    unoptimized: true,
  },
  filaments: {
    src: "/filaments/banner.jpg",
    alt: "A field of circular bead-chain compositions — concentric rings of dots, like charts of star fields.",
  },
  "space-station-builder": {
    src: "/space_station_builder/space_builder_banner.png",
    alt: "Modules of a growing space station arcing over a green planet rim, against a deep-blue starfield.",
    unoptimized: true,
  },
  watchless: {
    src: "/watchless/banner.avif",
    alt: "A soft gradient clock face with no hands — a placeholder for a handless timepiece.",
  },
};

const POS_CLASS: Record<Work["inset"], string> = {
  left: "pos-left",
  right: "pos-right",
  center: "pos-center",
  bleed: "pos-bleed",
};

export default function Plate({ work, plateNumber, marginLabel }: Props) {
  const banner = BANNERS[work.id];
  const href = work.href ?? `#${work.id}`;
  const stamp = `Plate No. ${String(plateNumber).padStart(2, "0")}`;

  return (
    <section
      className="plate-section"
      id={work.id}
      aria-labelledby={`${work.id}-title`}
    >
      <div className="plate-container">
        <div className="margin-tick">{marginLabel}</div>
        <div className={`plate ${POS_CLASS[work.inset]} reveal`}>
          <Link
            href={href}
            className="plate-frame"
            aria-label={`Open ${work.title}`}
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              sizes="(min-width: 900px) 900px, 100vw"
              className="object-cover"
              unoptimized={banner.unoptimized}
            />
            <div className="vignette-local" aria-hidden />
            <span className="plate-roman">{work.roman} / VI</span>
            <span className="plate-stamp">{stamp}</span>
          </Link>
          <figcaption className="plate-caption">
            <div className="num-rule">
              <span className="folio">{work.roman} / VI</span>
              <span className="rule" />
            </div>
            <h2 id={`${work.id}-title`}>
              <Link href={href}>{work.title}</Link>
            </h2>
            <p className="lede">{work.caption}</p>
            {work.statement && <p className="statement">{work.statement}</p>}
            <div className="meta">
              <span className="m">{work.medium}</span>
              <span className="m muted">{work.year}</span>
              <Link href={href} className="open">
                Open →
              </Link>
            </div>
          </figcaption>
        </div>
        <div />
      </div>
    </section>
  );
}
