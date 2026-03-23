"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { EditionImage } from "@/lib/editions";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  images: EditionImage[];
  d: Dictionary;
};

export function PhotoGallery({ images, d }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  const showNext = useCallback(() => {
    if (active === null || images.length === 0) return;
    setActive((active + 1) % images.length);
  }, [active, images.length]);

  const showPrev = useCallback(() => {
    if (active === null || images.length === 0) return;
    setActive((active - 1 + images.length) % images.length);
  }, [active, images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, showNext, showPrev]);

  useEffect(() => {
    if (active !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  if (images.length === 0) return null;

  return (
    <>
      <section
        id="gallery"
        className="scroll-mt-36 space-y-8"
        aria-label={d.gallery.aria}
      >
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
            {d.photoFeature.title}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {d.gallery.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            {d.photoFeature.body}
          </p>
        </header>

        <div className="columns-2 gap-3 sm:columns-3 md:gap-4 lg:columns-4">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              className="group mb-3 w-full break-inside-avoid overflow-hidden rounded-xl bg-slate-100 shadow-[var(--shadow-sm)] ring-1 ring-slate-200/40 md:mb-4"
            >
              <div className="relative">
                <Image
                  src={img.src}
                  alt={img.title}
                  width={800}
                  height={1200}
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:640px) 50vw, 25vw"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {active !== null && images[active] && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-slate-950/92 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-4 md:px-8">
            <p className="truncate text-sm font-medium text-white/90">
              {images[active].title}
            </p>
            <button
              type="button"
              onClick={close}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            >
              {d.gallery.lightboxClose}
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-8">
            <button
              type="button"
              aria-label={d.carousel.prev}
              onClick={showPrev}
              className="absolute left-2 z-[102] hidden rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20 md:block"
            >
              ‹
            </button>
            <div className="relative max-h-full max-w-5xl">
              <Image
                src={images[active].src}
                alt={images[active].title}
                width={1600}
                height={1200}
                className="max-h-[80vh] w-auto max-w-full object-contain"
                priority
              />
            </div>
            <button
              type="button"
              aria-label={d.carousel.next}
              onClick={showNext}
              className="absolute right-2 z-[102] hidden rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20 md:block"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
