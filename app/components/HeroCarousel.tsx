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

const INTERVAL_MS = 5500;

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

export function HeroCarousel({ slides, labels }: Props) {
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

  return (
    <div
      className="relative min-h-[100svh] w-full overflow-hidden bg-slate-200"
      aria-roledescription="carousel"
      aria-label={labels.ariaCarousel}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
              active
                ? "z-[1] opacity-100"
                : "pointer-events-none z-0 opacity-0"
            }`}
            aria-hidden={!active}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              className="object-cover"
              style={{ objectPosition: slide.objectPosition ?? "center 50%" }}
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-slate-950/15"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 z-[2] px-4 pb-28 pt-24 md:px-10 md:pb-36">
              <div className="mx-auto max-w-6xl">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/75">
                  {slide.subtitle}
                </p>
                <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  {slide.title}
                </h2>
              </div>
            </div>
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex justify-center px-4 pb-8 md:pb-10">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-white/10 px-2 py-2 shadow-[var(--shadow-lg)] backdrop-blur-md">
          <button
            type="button"
            onClick={prev}
            className="rounded-full px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15"
            aria-label={labels.prev}
          >
            ‹
          </button>
          <div
            className="flex gap-1.5 px-1"
            role="tablist"
            aria-label={labels.indicators}
          >
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={labels.slideAria.replace("{n}", String(i + 1))}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-sky-400"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="rounded-full px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15"
            aria-label={labels.next}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
