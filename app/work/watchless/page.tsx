import Image from "next/image";
import Link from "next/link";
import { works } from "@/content/works";

const work = works.find((w) => w.id === "watchless")!;
const LAUNCH_URL = "https://www.watchless.space/app";
const YT_ID = "wezeN2dC5as";

export default function Page() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-10">
      <header className="flex items-center justify-between">
        <Link
          href="/#watchless"
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
      </section>

      <section className="mt-24 flex justify-center">
        <div className="window-frame relative w-full max-w-[1100px] aspect-[1256/599]">
          <Image
            src="/watchless/banner.avif"
            alt="Watchless — a handless clock face in the warm KODAK palette."
            fill
            sizes="(min-width: 1100px) 1100px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="mt-20 flex justify-center">
        <figure className="w-full max-w-[1100px]">
          <div className="window-frame relative w-full aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${YT_ID}?rel=0&modestbranding=1`}
              title="Watchless — walkthrough"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <figcaption className="mt-5 folio text-cream/45">
            A short walkthrough · two minutes.
          </figcaption>
        </figure>
      </section>

      <section className="mt-24 flex justify-center">
        <a
          href={LAUNCH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-baseline gap-5 border border-gold/35 px-10 py-6 transition-all duration-500 hover:border-gold hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-30px_rgba(235,133,92,0.6)] focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/70"
        >
          <span className="folio text-gold/80 group-hover:text-gold transition-colors">
            Launch
          </span>
          <span className="display-soft text-cream text-[clamp(1.5rem,3vw,2.4rem)] leading-none">
            watchless.space
          </span>
          <span
            aria-hidden
            className="text-gold/70 transition-transform duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </section>

      <nav className="mt-32 border-t border-cream/10 pt-10 flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.28em]">
        <Link
          href="/#untitled-v"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          ← V. Untitled V
        </Link>
        <Link
          href="/"
          className="text-cream/60 hover:text-gold transition-colors"
        >
          Index →
        </Link>
      </nav>
    </main>
  );
}
