import Image from "next/image";
import Link from "next/link";
import OrreryEmbed from "@/components/OrreryEmbed";
import { works } from "@/content/works";

const work = works.find((w) => w.id === "orrery")!;

export default function Page() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-10">
      {/* top rail — back to index */}
      <header className="flex items-center justify-between">
        <Link
          href="/#orrery"
          className="folio text-cream/60 hover:text-gold transition-colors"
        >
          ← Index
        </Link>
        <span className="folio text-cream/45">{work.roman} / VI</span>
      </header>

      {/* title block — sits in the top third, confident */}
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

      {/* banner — wide letterbox, the promise of the piece */}
      <section className="mt-24 flex justify-center">
        <div className="window-frame relative w-full max-w-[1200px] aspect-[600/244]">
          <Image
            src="/orrery/banner.png"
            alt="A luminous ring of multicolored particles encircling a dark void — a stylized event-horizon rim."
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* the piece — live mechanical solar system, iframed from its GitHub Pages host */}
      <section className="mt-20 flex justify-center">
        <figure className="w-full max-w-[1200px]">
          <OrreryEmbed />
          <figcaption className="mt-5 folio text-cream/45">
            Interactive · let the gears turn.
          </figcaption>
        </figure>
      </section>

      {/* statement — small, first-person */}
      {work.statement && (
        <section className="mt-28 mx-auto max-w-[44rem]">
          <p className="folio text-gold/70 mb-6">Note from MJ</p>
          <p className="display-soft text-cream text-[clamp(1.4rem,2.6vw,2rem)] leading-snug">
            {work.statement}
          </p>
        </section>
      )}

      {/* nav between windows */}
      <nav className="mt-32 border-t border-cream/10 pt-10 flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.28em]">
        <Link
          href="/#minimalistic-meows"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          ← I. Minimalistic Meows
        </Link>
        <Link
          href="/#hilma-ai-klint"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          III. Hilma AI Klint →
        </Link>
      </nav>
    </main>
  );
}
