"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const RAIL_ITEMS = [
  { id: "hero", roman: "·", label: "Index" },
  { id: "minimalistic-meows", roman: "I", label: "Meows" },
  { id: "giverny-phos", roman: "II", label: "Giverny" },
  { id: "hilma-ai-klint", roman: "III", label: "Hilma" },
  { id: "filaments", roman: "IV", label: "Filaments" },
  { id: "space-station-builder", roman: "V", label: "Station" },
  { id: "watchless", roman: "VI", label: "Watchless" },
];

export default function PageChrome() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 120);

      const mid = window.innerHeight * 0.45;
      let bestId = RAIL_ITEMS[0].id;
      let bestDist = Infinity;
      for (const item of RAIL_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          bestId = item.id;
        }
      }
      setActiveId(bestId);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Observe any .reveal element not already wrapped by RevealOnScroll (e.g. server-rendered plates).
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" },
    );

    document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className={`running-head ${scrolled ? "" : "hide"}`}
        aria-hidden={!scrolled}
      >
        <span className="folio mark">MJ · VI</span>
        <nav className="nav folio">
          <a href="#hero">Index</a>
          <Link href="/about">About</Link>
          <a href="mailto:mjonsson1@gmail.com">Contact</a>
        </nav>
      </header>

      <nav className="side-rail" aria-label="Plates">
        {RAIL_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeId === item.id ? "active" : ""}
          >
            {item.roman}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
