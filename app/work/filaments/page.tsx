import Image from "next/image";
import Link from "next/link";
import { works } from "@/content/works";

const work = works.find((w) => w.id === "filaments")!;

export default function Page() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-10">
      {/* top rail */}
      <header className="flex items-center justify-between">
        <Link
          href="/#filaments"
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

      {/* banner — wide letterbox of the mosaic */}
      <section className="mt-24 flex justify-center">
        <div className="window-frame relative w-full max-w-[1200px] aspect-[600/195]">
          <Image
            src="/filaments/banner.jpg"
            alt="A field of circular bead-chain compositions — concentric rings of dots on deep black, like charts of star fields."
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* the interactive piece — embedded self-contained HTML */}
      <section className="mt-20 flex justify-center">
        <figure className="w-full max-w-[1200px]">
          <div className="window-frame relative w-full aspect-[16/10]">
            <iframe
              src="/filaments/filament.html"
              title="Filaments — flow-field bead chains"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
          <figcaption className="mt-5 folio text-cream/45">
            Interactive · drag, scroll, let it run.
          </figcaption>
        </figure>
      </section>

      {/* nav between windows */}
      <nav className="mt-32 border-t border-cream/10 pt-10 flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.28em]">
        <Link
          href="/#hilma-ai-klint"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          ← III. Hilma AI Klint
        </Link>
        <Link
          href="/#untitled-v"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          V. Untitled →
        </Link>
      </nav>
    </main>
  );
}
