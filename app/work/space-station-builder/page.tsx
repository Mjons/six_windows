import Image from "next/image";
import Link from "next/link";
import SpaceStationBuilderEmbed from "@/components/SpaceStationBuilderEmbed";
import { works } from "@/content/works";

const work = works.find((w) => w.id === "space-station-builder")!;

export default function Page() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-10">
      {/* top rail */}
      <header className="flex items-center justify-between">
        <Link
          href="/#space-station-builder"
          className="folio text-cream/60 hover:text-gold transition-colors"
        >
          ← Index
        </Link>
        <span className="folio text-cream/45">{work.roman} / VI</span>
      </header>

      {/* title block */}
      <section className="mt-[14vh] max-w-[60rem]">
        <p className="folio text-gold/70 mb-6">
          {work.medium} &nbsp;·&nbsp; {work.year}
        </p>
        <h1 className="display-crisp text-cream text-[clamp(3.5rem,12vw,9rem)] leading-[0.9]">
          {work.title}
        </h1>
        <p className="mt-10 max-w-[44ch] text-cream/75 text-[1.15rem] leading-relaxed">
          {work.caption}
        </p>
      </section>

      {/* banner — still from the piece, at native 955×395 aspect (cap at 500px so 2× DPR = native) */}
      <section className="mt-24 flex justify-center">
        <div className="window-frame relative w-full max-w-[500px] aspect-[955/395]">
          <Image
            src="/space_station_builder/space_builder_banner.png"
            alt="Modules of a growing space station arcing over a green planet rim, against a deep-blue starfield."
            fill
            sizes="(min-width: 768px) 500px, 100vw"
            className="object-cover"
            unoptimized
            priority
          />
        </div>
      </section>

      {/* the piece — live, embedded */}
      <section className="mt-20 flex justify-center">
        <figure className="w-full max-w-[1200px]">
          <SpaceStationBuilderEmbed />
          <figcaption className="mt-5 folio text-cream/45">
            Interactive · let the colony grow.
          </figcaption>
        </figure>
      </section>

      {/* nav between windows */}
      <nav className="mt-32 border-t border-cream/10 pt-10 flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.28em]">
        <Link
          href="/#filaments"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          ← IV. Filaments
        </Link>
        <Link
          href="/#watchless"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          VI. Watchless →
        </Link>
      </nav>
    </main>
  );
}
