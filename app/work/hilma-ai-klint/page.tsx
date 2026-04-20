import Image from "next/image";
import Link from "next/link";
import { works } from "@/content/works";
import HilmaGallery, { type HilmaEntry } from "@/components/HilmaGallery";
import manifest from "@/content/hilma-manifest.json";

const work = works.find((w) => w.id === "hilma-ai-klint")!;

// Strip blurDataURL on the way to the client — 213 × ~500 bytes adds up.
const entries: HilmaEntry[] = (
  manifest as Array<{ id: string; w: number; h: number; alt: string }>
).map(({ id, w, h, alt }) => ({ id, w, h, alt }));

export default function Page() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-10">
      <header className="flex items-center justify-between">
        <Link
          href="/#hilma-ai-klint"
          className="folio text-cream/60 hover:text-gold transition-colors"
        >
          ← Index
        </Link>
        <span className="folio text-cream/45">{work.roman} / VI</span>
      </header>

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
        <p className="mt-6 max-w-[52ch] text-cream/55 text-[1rem] leading-relaxed">
          Two hundred and thirteen variations, all asking the same question in
          slightly different voices — circles within circles, triangles pointing
          at something the machine can&apos;t quite name.
        </p>
      </section>

      <section className="mt-24 flex justify-center">
        <div className="window-frame relative w-full max-w-[1100px] aspect-[16/9]">
          <Image
            src="/hilma/banner.avif"
            alt="A banner mosaic of Hilma af Klint–style generative paintings."
            fill
            sizes="(min-width: 1100px) 1100px, 100vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(130% 95% at 50% 55%, rgba(5,3,8,0) 45%, rgba(5,3,8,0.5) 100%)",
            }}
          />
        </div>
      </section>

      <section className="mt-24 flex items-baseline gap-4 max-w-[1400px] mx-auto">
        <span className="folio text-gold/70">the plates</span>
        <span className="h-px flex-1 bg-cream/15" />
        <span className="folio text-cream/45">
          {String(entries.length).padStart(3, "0")}
        </span>
      </section>

      <section className="mt-10">
        <HilmaGallery entries={entries} />
      </section>

      <nav className="mt-32 border-t border-cream/10 pt-10 flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.28em]">
        <Link
          href="/#orrery"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          ← II. Orrery
        </Link>
        <Link
          href="/#filaments"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          IV. Filaments →
        </Link>
      </nav>
    </main>
  );
}
