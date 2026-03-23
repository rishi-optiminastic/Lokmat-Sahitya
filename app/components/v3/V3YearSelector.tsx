"use client";

import { useCallback, useEffect, useState } from "react";

const YEARS = [2023, 2024, 2025, 2026] as const;

type Props = {
  ariaLabel: string;
  heading: string;
};

export function V3YearSelector({ ariaLabel, heading }: Props) {
  const [active, setActive] = useState<number>(YEARS[0]);

  const scrollToYear = useCallback((year: number) => {
    const el = document.getElementById(`year-${year}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(year);
  }, []);

  useEffect(() => {
    const nodes = YEARS.map((y) =>
      document.getElementById(`year-${y}`),
    ).filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id?.startsWith("year-")) {
          const y = Number(visible[0].target.id.replace("year-", ""));
          if (!Number.isNaN(y)) setActive(y);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      id="years-anchor"
      className="sticky top-[3.75rem] z-30 scroll-mt-24 border-b border-slate-200/50 bg-[#f8fafc]/90 py-4 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
          {heading}
        </p>
        <div
          className="flex gap-2 overflow-x-auto"
          role="tablist"
          aria-label={ariaLabel}
        >
          {YEARS.map((year) => {
            const on = active === year;
            return (
              <button
                key={year}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => scrollToYear(year)}
                className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
                  on
                    ? "bg-[#0ea5e9] text-white shadow-[0_4px_14px_rgba(14,165,233,0.3)]"
                    : "bg-white text-slate-500 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:text-slate-800 hover:shadow-[0_2px_8px_rgba(15,23,42,0.08)]"
                }`}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
