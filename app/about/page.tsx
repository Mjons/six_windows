import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-10">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="folio text-cream/60 hover:text-gold transition-colors"
        >
          ← Index
        </Link>
        <span className="folio text-cream/45">About</span>
      </header>

      <section className="mt-[18vh] mx-auto max-w-[44rem]">
        <p className="folio text-gold/70 mb-6">MJ</p>
        <h1 className="display-crisp text-cream text-[clamp(3rem,8vw,6rem)] leading-[0.92] mb-14">
          I make small, stubborn things.
        </h1>
        <div className="space-y-6 text-cream/75 text-[1.1rem] leading-[1.7]">
          <p>
            I grew up squinting at the night sky and drawing cats in the margins
            of school notebooks. This site is, more or less, the long-form
            version of that.
          </p>
          <p>
            The work here is split between cosmic simulations, little generative
            tools I've built for my own amusement, and the occasional quiet
            gallery. Each piece was made for the pleasure of making it. If a
            window catches you, that's the whole point.
          </p>
        </div>

        <p className="mt-14 folio text-cream/50">
          Based nowhere in particular &nbsp;·&nbsp; 2025
        </p>
      </section>
    </main>
  );
}
