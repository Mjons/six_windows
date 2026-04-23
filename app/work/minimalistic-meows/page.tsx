import Image from "next/image";
import Link from "next/link";
import { works } from "@/content/works";

const work = works.find((w) => w.id === "minimalistic-meows")!;

// 123 cats, re-encoded to 800px AVIF @ q60 in public/meows/gallery/
const GALLERY_COUNT = 123;
const gallery = Array.from(
  { length: GALLERY_COUNT },
  (_, i) => `meow-${String(i + 1).padStart(3, "0")}.avif`,
);

export default function Page() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-10">
      {/* top rail — back to index */}
      <header className="flex items-center justify-between">
        <Link
          href="/#minimalistic-meows"
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

      {/* banner — the full mosaic, at its native 3:1 aspect.
          Source is 1500×500, so we cap display width at 750px (2× DPR = 1500 = native). */}
      <section className="mt-24 flex justify-center">
        <div className="window-frame relative w-full max-w-[750px] aspect-[3/1]">
          <Image
            src="/meows/banner.jpg"
            alt="A mosaic of minimalist cat illustrations — geometric shapes in muted earth tones and pastels."
            fill
            sizes="(min-width: 768px) 750px, 100vw"
            className="object-cover"
            unoptimized
            priority
          />
        </div>
      </section>

      {/* video — the piece in motion */}
      <section className="mt-20 flex justify-center">
        <figure className="w-full max-w-[1100px]">
          <div className="window-frame relative w-full aspect-video">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/meows/meows.mp4"
              poster="/meows/banner.jpg"
              controls
              playsInline
              preload="metadata"
            />
          </div>
          <figcaption className="mt-5 folio text-cream/45">
            Press play · the mosaic, in motion.
          </figcaption>
        </figure>
      </section>

      {/* gallery — every cat, one to a tile */}
      <section className="mt-24 mx-auto max-w-[1200px]">
        <div className="flex items-baseline gap-4 mb-8">
          <span className="folio text-gold/70">
            The full litter · {GALLERY_COUNT} cats
          </span>
          <span className="h-px flex-1 bg-cream/10" />
        </div>
        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
          {gallery.map((file, i) => (
            <li
              key={file}
              className="window-frame relative aspect-square overflow-hidden"
            >
              <Image
                src={`/meows/gallery/${file}`}
                alt={`Minimalist cat ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 150px, (min-width: 640px) 200px, 33vw"
                className="object-cover"
                unoptimized
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* nav between windows */}
      <nav className="mt-32 border-t border-cream/10 pt-10 flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.28em]">
        <Link
          href="/"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          ← Index
        </Link>
        <Link
          href="/#giverny-phos"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          II. Giverny Phos →
        </Link>
      </nav>
    </main>
  );
}
