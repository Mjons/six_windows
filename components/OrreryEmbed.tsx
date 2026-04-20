"use client";

import { useEffect, useRef, useState } from "react";

const ORRERY_URL = "https://mjons.github.io/Orrery/";

export default function OrreryEmbed() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isFs, setIsFs] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setSrc(mobile ? `${ORRERY_URL}?objects=4k` : ORRERY_URL);
  }, []);

  const enter = async () => {
    const el = wrapRef.current;
    if (!el) return;
    try {
      await el.requestFullscreen();
      setIsFs(true);
      const onChange = () => {
        if (!document.fullscreenElement) {
          setIsFs(false);
          document.removeEventListener("fullscreenchange", onChange);
        }
      };
      document.addEventListener("fullscreenchange", onChange);
    } catch {
      /* user-dismissed or unsupported; leave state as-is */
    }
  };

  const exit = async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
  };

  return (
    <div
      ref={wrapRef}
      className="window-frame relative w-full aspect-[16/10] group bg-shadow"
    >
      {src && (
        <iframe
          src={src}
          title="Orrery — a mechanical solar system"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allow="fullscreen; accelerometer; gyroscope"
        />
      )}
      <button
        type="button"
        onClick={isFs ? exit : enter}
        aria-label={isFs ? "Exit fullscreen" : "Enter fullscreen"}
        className="absolute top-3 right-3 z-10 flex items-center gap-2 rounded-sm border border-cream/20 bg-shadow/70 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-cream/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:text-gold hover:border-gold/40"
      >
        <FsIcon open={isFs} />
        <span>{isFs ? "Exit" : "Fullscreen"}</span>
      </button>
    </div>
  );
}

function FsIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M4.5 1.5 H1.5 V4.5" />
          <path d="M7.5 1.5 H10.5 V4.5" />
          <path d="M4.5 10.5 H1.5 V7.5" />
          <path d="M7.5 10.5 H10.5 V7.5" />
        </>
      ) : (
        <>
          <path d="M1.5 4.5 V1.5 H4.5" />
          <path d="M10.5 4.5 V1.5 H7.5" />
          <path d="M1.5 7.5 V10.5 H4.5" />
          <path d="M10.5 7.5 V10.5 H7.5" />
        </>
      )}
    </svg>
  );
}
