import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-10 flex flex-col">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="folio text-cream/60 hover:text-gold transition-colors"
        >
          ← Index
        </Link>
        <span className="folio text-cream/45">Contact</span>
      </header>

      <section className="my-auto mx-auto max-w-[44rem] text-center">
        <p className="folio text-gold/70 mb-6">One line, one link</p>
        <h1 className="display-soft text-cream text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] mb-12">
          If a window opened something,
          <br />
          tell me which one.
        </h1>
        <a
          href="mailto:mjonsson1@gmail.com"
          className="font-mono text-[0.95rem] tracking-[0.18em] text-gold border-b border-gold/40 hover:border-gold transition-colors pb-1"
        >
          mjonsson1@gmail.com
        </a>
      </section>

      <footer className="mt-auto pt-24">
        <span className="folio text-cream/35">End.</span>
      </footer>
    </main>
  );
}
