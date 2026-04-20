"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface HilmaEntry {
  id: string;
  w: number;
  h: number;
  alt: string;
}

interface Props {
  entries: HilmaEntry[];
}

export default function HilmaGallery({ entries }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) =>
        i === null ? null : (i + dir + entries.length) % entries.length,
      ),
    [entries.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  return (
    <>
      <div
        className="mx-auto max-w-[1400px] columns-2 gap-3 sm:columns-3 lg:columns-4 xl:columns-5"
        role="list"
      >
        {entries.map((e, i) => (
          <GalleryTile key={e.id} entry={e} onOpen={() => setOpen(i)} />
        ))}
      </div>

      {open !== null && (
        <Lightbox
          entry={entries[open]}
          index={open}
          total={entries.length}
          onClose={close}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </>
  );
}

function GalleryTile({
  entry,
  onOpen,
}: {
  entry: HilmaEntry;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      role="listitem"
      aria-label={`Open ${entry.alt}`}
      className="tile group relative mb-3 block w-full cursor-zoom-in overflow-hidden rounded-[2px] bg-deep focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/60"
      style={{ aspectRatio: `${entry.w} / ${entry.h}` }}
    >
      <Image
        src={`/hilma/thumb/${entry.id}.avif`}
        alt={entry.alt}
        fill
        sizes="(min-width: 1280px) 260px, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
        className="object-cover transition-opacity duration-700 group-hover:opacity-95"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-cream/0 transition-colors duration-500 group-hover:border-gold/25"
      />
    </button>
  );
}

function Lightbox({
  entry,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  entry: HilmaEntry;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={entry.alt}
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-shadow/94 px-4 py-8 backdrop-blur-sm outline-none sm:px-10"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="folio absolute left-4 top-1/2 -translate-y-1/2 px-3 py-2 text-cream/55 transition-colors hover:text-gold sm:left-8"
      >
        ←
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="folio absolute right-4 top-1/2 -translate-y-1/2 px-3 py-2 text-cream/55 transition-colors hover:text-gold sm:right-8"
      >
        →
      </button>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="folio absolute right-4 top-4 px-3 py-2 text-cream/55 transition-colors hover:text-gold sm:right-8 sm:top-6"
      >
        close ✕
      </button>

      <span className="folio absolute left-4 top-4 text-cream/45 sm:left-8 sm:top-6">
        {String(index + 1).padStart(3, "0")} / {String(total).padStart(3, "0")}
      </span>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[86vh] w-auto"
        style={{ aspectRatio: `${entry.w} / ${entry.h}` }}
      >
        <Image
          src={`/hilma/full/${entry.id}.avif`}
          alt={entry.alt}
          width={entry.w}
          height={entry.h}
          sizes="(min-width: 1280px) 80vw, 92vw"
          className="max-h-[86vh] w-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
