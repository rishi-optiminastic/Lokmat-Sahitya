"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { EditionImage } from "@/lib/editions";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  images: EditionImage[];
  d: Dictionary;
};

/**
 * Full-bleed horizontal filmstrip + lightbox (different from masonry columns).
 */
export function MagazineGallery({ images, d }: Props) {
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
        className="scroll-mt-32 space-y-8"
        aria-label={d.gallery.aria}
      >
        <header className="mx-auto max-w-2xl px-4 text-center md:px-0">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">
            {d.photoFeature.title}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
            {d.gallery.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 md:text-lg">
            {d.photoFeature.body}
          </p>
        </header>

        <div className="relative -mx-4 md:-mx-8">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:gap-6 md:px-8">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActive(i)}
                className="group relative shrink-0 snap-center overflow-hidden bg-stone-200 shadow-[0_16px_48px_rgba(28,25,23,0.12)]"
              >
                <div className="relative h-[min(52vh,420px)] w-[min(72vw,340px)] md:h-[min(56vh,480px)] md:w-[min(38vw,380px)]">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="380px"
                  />
                </div>
                <p className="bg-[#f5f3ef] px-3 py-2.5 text-center text-sm font-medium text-stone-700">
                  {img.title}
                </p>
              </button>
            ))}
          </div>
          <p className="pointer-events-none absolute bottom-1 right-6 hidden text-[10px] uppercase tracking-widest text-stone-400 md:block">
            ← scroll →
          </p>
        </div>
      </section>

      {active !== null && images[active] && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-stone-950/94 backdrop-blur-md"
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
