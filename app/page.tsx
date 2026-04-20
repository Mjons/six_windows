import Link from "next/link";
import PageChrome from "@/components/PageChrome";
import Plate from "@/components/Plate";
import RevealOnScroll from "@/components/RevealOnScroll";
import { works } from "@/content/works";

const KIND_LABEL: Record<string, string> = {
  cosmic: "Cosmic",
  generative: "Generative",
  gallery: "Gallery",
};

export default function Page() {
  return (
    <main className="relative">
      <div className="vignette" aria-hidden />
      <PageChrome />

      {/* ——————————————————————————————————————
          Hero / Frontispiece
         —————————————————————————————————————— */}
      <section className="hero" id="hero">
        <div className="hero-body">
          <RevealOnScroll className="hero-meta">
            <span className="folio label">MJ &nbsp;·&nbsp; MMXXV</span>
            <span className="rule" />
            <span
              className="folio label"
              style={{ color: "rgba(255,233,217,.45)" }}
            >
              Monograph · VI plates
            </span>
          </RevealOnScroll>

          <RevealOnScroll>
            <h1 className="display-crisp hero-title">
              Six windows,
              <br />
              each onto{" "}
              <em className="display-soft not-italic text-gold">something</em>
              <br />I found worth
              <br />
              keeping.
            </h1>
          </RevealOnScroll>

          <RevealOnScroll slow>
            <div className="hero-sub">
              <p>
                A small monograph of art projects — simulations of stars, little
                generators, chill galleries. Each piece was made for the
                pleasure of making it; if a window catches you, that&apos;s the
                whole point.
              </p>

              <div className="index-table" role="list">
                {works.map((w) => (
                  <a
                    key={w.id}
                    className="index-row"
                    href={`#${w.id}`}
                    role="listitem"
                  >
                    <span className="mono roman">{w.roman}</span>
                    <span className="title">{w.title}</span>
                    <span className="kind">
                      {KIND_LABEL[w.kind]} ·{" "}
                      {w.medium.split("·").slice(1).join("·").trim() ||
                        w.medium}
                    </span>
                    <span className="year">{w.year}</span>
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <div className="hero-foot">
            <span className="folio" style={{ color: "rgba(255,233,217,.35)" }}>
              Scroll to open the first window
            </span>
            <span className="caret" aria-hidden />
            <span className="folio" style={{ color: "rgba(255,233,217,.35)" }}>
              I → VI
            </span>
          </div>
        </div>
      </section>

      {/* ——————————————————————————————————————
          The six plates
         —————————————————————————————————————— */}
      {works.map((work, i) => (
        <div key={work.id}>
          <Plate
            work={work}
            plateNumber={i + 1}
            marginLabel={`Plate ${work.roman} · ${KIND_LABEL[work.kind]}`}
          />
          {i < works.length - 1 && (
            <div className="plate-divider">
              <span className="rule" />
              <span className="mono">
                {work.roman} — {works[i + 1].roman}
              </span>
              <span className="rule" />
            </div>
          )}
        </div>
      ))}

      {/* ——————————————————————————————————————
          Colophon
         —————————————————————————————————————— */}
      <section className="colophon" id="colophon">
        <RevealOnScroll className="colophon-inner">
          <div>
            <span
              className="folio"
              style={{
                color: "rgba(255,217,147,.7)",
                display: "block",
                marginBottom: 20,
              }}
            >
              End of index
            </span>
            <p className="stmt">
              If any window held your eye, I&apos;d be glad to hear about it.
            </p>
          </div>
          <dl>
            <dt>Maker</dt>
            <dd>MJ</dd>
            <dt>Year</dt>
            <dd>MMXXV</dd>
            <dt>Set in</dt>
            <dd>Fraunces · Instrument Sans · JetBrains Mono</dd>
            <dt>Reach</dt>
            <dd>
              <Link href="mailto:mjonsson1@gmail.com">mjonsson1@gmail.com</Link>
            </dd>
          </dl>
        </RevealOnScroll>

        <div className="colophon-foot">
          <span className="mono">Based nowhere in particular</span>
          <span className="mono">End.</span>
        </div>
      </section>
    </main>
  );
}
