"use client";

import { useCallback, useEffect, useState } from "react";
import { EDITION_YEARS } from "@/lib/edition-years";

const YEARS = EDITION_YEARS;

type Props = {
  ariaLabel: string;
  heading: string;
};

export function YearPills({ ariaLabel, heading }: Props) {
  const [active, setActive] = useState<number>(YEARS[0]);

  const scrollToYear = useCallback((year: number) => {
    const el = document.getElementById(`year-${year}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(year);
  }, []);

  useEffect(() => {
    const nodes = YEARS.map((y) => document.getElementById(`year-${y}`)).filter(
      Boolean,
    ) as HTMLElement[];
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
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      id="years-anchor"
      className="sticky top-[4.25rem] z-30 scroll-mt-[5.5rem] border-b border-slate-200/80 bg-[#f9fafb]/95 py-5 shadow-[var(--shadow-sm)] backdrop-blur-sm"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          {heading}
        </p>
        <div
          className="-mx-1 flex gap-2 overflow-x-auto pb-1"
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
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  on
                    ? "bg-[#0ea5e9] text-white shadow-[var(--shadow-md)]"
                    : "bg-white text-slate-600 shadow-[var(--shadow-sm)] hover:bg-slate-50 hover:text-slate-900"
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
