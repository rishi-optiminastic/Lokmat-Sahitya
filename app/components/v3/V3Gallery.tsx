"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { EditionImage } from "@/lib/editions";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  images: EditionImage[];
  d: Dictionary;
};

export function V3Gallery({ images, d }: Props) {
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
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, showNext, showPrev]);

  if (images.length === 0) return null;

  return (
    <>
      <section
        id="gallery"
        className="scroll-mt-40"
        aria-label={d.gallery.aria}
      >
        <header className="mb-10 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#0ea5e9]">
            {d.photoFeature.title}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {d.gallery.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-500">
            {d.photoFeature.body}
          </p>
        </header>

        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl bg-slate-100 shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition duration-300 hover:shadow-[0_8px_28px_rgba(15,23,42,0.1)]"
            >
              <Image
                src={img.src}
                alt={img.title}
                width={800}
                height={1200}
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width:640px) 50vw, 25vw"
              />
            </button>
          ))}
        </div>
      </section>

      {active !== null && images[active] && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-4 md:px-8">
            <p className="truncate text-sm font-medium text-white/80">
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
              className="absolute left-3 z-[102] hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:flex"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="relative max-h-full max-w-5xl">
              <Image
                src={images[active].src}
                alt={images[active].title}
                width={1600}
                height={1200}
                className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
                priority
              />
            </div>

            <button
              type="button"
              aria-label={d.carousel.next}
              onClick={showNext}
              className="absolute right-3 z-[102] hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:flex"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
