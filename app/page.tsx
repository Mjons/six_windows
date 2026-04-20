import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import Window from "@/components/Window";
import { works } from "@/content/works";

// Asymmetric placement per window — varies which column band each sits in.
// 12-column grid at md+, single column below.
const PLACEMENT: Record<string, { col: string; align: string }> = {
  "minimalistic-meows": {
    col: "md:col-start-2 md:col-end-8",
    align: "md:justify-self-start",
  },
  orrery: {
    col: "md:col-start-3 md:col-end-12",
    align: "md:justify-self-center",
  },
  "hilma-ai-klint": {
    col: "md:col-start-6 md:col-end-12",
    align: "md:justify-self-end",
  },
  filaments: {
    col: "md:col-start-1 md:col-end-10",
    align: "md:justify-self-start",
  },
  "space-station-builder": {
    col: "md:col-start-5 md:col-end-10",
    align: "md:justify-self-center",
  },
  watchless: {
    col: "md:col-start-7 md:col-end-12",
    align: "md:justify-self-end",
  },
};

export default function Page() {
  return (
    <main className="relative">
      {/* ——————————————————————————————————————
          Opening: the index.
          Near silence — a folio mark, a name, a line of intent.
         —————————————————————————————————————— */}
      <section className="min-h-[92vh] px-6 md:px-16 pt-16 pb-40 flex flex-col">
        <header className="flex items-center justify-between">
          <span className="folio">Index · VI windows</span>
          <nav className="flex gap-8 text-[0.72rem] uppercase tracking-[0.28em] font-mono text-cream/50">
            <Link href="/about" className="hover:text-gold transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-gold transition-colors">
              Contact
            </Link>
          </nav>
        </header>

        <div className="mt-[22vh] md:mt-[30vh] max-w-[44rem]">
          <RevealOnScroll>
            <p className="folio mb-8 text-gold/70">MJ &nbsp;·&nbsp; MMXXV</p>
            <h1 className="display-crisp text-cream text-[clamp(3rem,9vw,7.5rem)] leading-[0.92]">
              Six windows,
              <br />
              each onto{" "}
              <em className="display-soft not-italic text-gold">
                something
              </em>{" "}
              <br />I found worth
              <br />
              keeping.
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delayMs={320} slow>
            <p className="mt-14 max-w-[36ch] text-cream/60 text-[1.02rem] leading-relaxed">
              A small monograph of art projects — simulations of stars, little
              generators, chill galleries.
            </p>
          </RevealOnScroll>
        </div>

        {/* faint scroll indicator, pinned to the bottom — no animation jitter */}
        <div className="mt-auto pt-24 flex items-end justify-between">
          <span className="folio text-cream/35">Scroll to enter</span>
          <span className="folio text-cream/35">I → VI</span>
        </div>
      </section>

      {/* ——————————————————————————————————————
          The six windows. Each in its own breathing room.
         —————————————————————————————————————— */}
      {works.map((work, i) => {
        const place = PLACEMENT[work.id];
        return (
          <section
            key={work.id}
            id={work.id}
            className="px-6 md:px-16 py-28 md:py-40 border-t border-cream/5"
            aria-labelledby={`${work.id}-title`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">
              {/* the window itself */}
              <RevealOnScroll
                className={`${place.col} ${place.align} w-full`}
                slow={work.size === "lg"}
              >
                <Window work={work} />
              </RevealOnScroll>
            </div>

            {/* folio separator between sections, centered — like a page edge */}
            {i < works.length - 1 && (
              <div className="mt-28 flex items-center gap-6 justify-center opacity-60">
                <span className="h-px w-24 bg-cream/15" />
                <span className="folio text-cream/40">
                  {work.roman} &nbsp;—&nbsp; {romanAfter(work.roman)}
                </span>
                <span className="h-px w-24 bg-cream/15" />
              </div>
            )}
          </section>
        );
      })}

      {/* ——————————————————————————————————————
          Closing — small, grounded. Not a CTA.
         —————————————————————————————————————— */}
      <footer className="px-6 md:px-16 py-32 border-t border-cream/5">
        <div className="max-w-[44rem]">
          <RevealOnScroll>
            <p className="folio text-gold/70 mb-6">End of index</p>
            <p className="display-soft text-cream text-[clamp(1.6rem,3vw,2.4rem)] leading-snug max-w-[26ch]">
              If any window held your eye, I'd be glad to hear about it.
            </p>
            <div className="mt-10 flex gap-10 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-cream/60">
              <Link href="/about" className="hover:text-gold transition-colors">
                About →
              </Link>
              <Link
                href="/contact"
                className="hover:text-gold transition-colors"
              >
                Contact →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </footer>
    </main>
  );
}

function romanAfter(r: string): string {
  const order = ["I", "II", "III", "IV", "V", "VI"];
  const i = order.indexOf(r);
  return order[i + 1] ?? "—";
}
