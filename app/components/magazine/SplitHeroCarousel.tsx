"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { LocalizedSlide } from "@/lib/carousel-i18n";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const INTERVAL_MS = 6000;

type Labels = {
  ariaCarousel: string;
  prev: string;
  next: string;
  indicators: string;
  slideAria: string;
};

type Props = {
  slides: LocalizedSlide[];
  labels: Labels;
};

/**
 * Split-screen hero: editorial left column (typography + controls), image right.
 * Mobile stacks image first, copy below.
 */
export function SplitHeroCarousel({ slides, labels }: Props) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const len = slides.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % len), [len]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + len) % len),
    [len],
  );

  useEffect(() => {
    if (reduceMotion || len <= 1) return;
    const t = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [len, next, reduceMotion]);

  const slide = slides[index];

  return (
    <section
      className="grid min-h-[min(100svh,920px)] grid-cols-1 lg:grid-cols-2"
      aria-roledescription="carousel"
      aria-label={labels.ariaCarousel}
    >
      <div className="relative order-2 flex min-h-[45vh] flex-col justify-between gap-10 bg-[#f0ebe3] px-6 py-10 lg:order-1 lg:min-h-full lg:px-12 lg:py-14">
        <div className="space-y-6">
          <p className="max-w-md text-sm leading-relaxed text-stone-600">
            {slide.subtitle}
          </p>
          <h1 className="max-w-xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label={labels.indicators}>
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={labels.slideAria.replace("{n}", String(i + 1))}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-8 bg-stone-900"
                    : "w-1.5 bg-stone-400/60 hover:bg-stone-600"
                }`}
              />
            ))}
          </div>
          <div className="ml-auto flex gap-2 lg:ml-0">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300/80 text-stone-700 transition hover:bg-stone-200/80"
              aria-label={labels.prev}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300/80 text-stone-700 transition hover:bg-stone-200/80"
              aria-label={labels.next}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="relative order-1 min-h-[min(55vh,560px)] lg:order-2 lg:min-h-full">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-[1000ms] ease-out ${
              i === index ? "z-[1] opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={s.src}
              alt=""
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-stone-900/10 lg:to-[#f0ebe3]/20"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </section>
  );
}
