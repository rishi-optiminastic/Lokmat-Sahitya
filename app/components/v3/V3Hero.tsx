"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type { LocalizedSlide } from "@/lib/carousel-i18n";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const INTERVAL = 5500;

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

export function V3Hero({ slides, labels }: Props) {
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
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [len, next, reduceMotion]);

  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden bg-slate-200"
      aria-roledescription="carousel"
      aria-label={labels.ariaCarousel}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
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
              className={`object-cover object-center transition-transform duration-[8000ms] ease-out ${
                active ? "scale-105" : "scale-100"
              }`}
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5"
              aria-hidden
            />
          </div>
        );
      })}

      <div className="absolute inset-x-0 bottom-0 z-[2] px-4 pb-32 sm:px-6 md:px-10 md:pb-40 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50 sm:text-xs">
            {slides[index]?.subtitle}
          </p>
          <h1 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {slides[index]?.title}
          </h1>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[3] flex justify-center px-4 pb-10 md:pb-14">
        <div className="flex items-center gap-3 rounded-full bg-white/10 px-3 py-2.5 backdrop-blur-md">
          <button
            type="button"
            onClick={prev}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white"
            aria-label={labels.prev}
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
          <div
            className="flex gap-2"
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
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white"
            aria-label={labels.next}
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
    </section>
  );
}
