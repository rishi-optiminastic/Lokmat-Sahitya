"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const YEARS = [2023, 2024, 2025, 2026] as const;

type YearNavContextValue = {
  active: number;
  scrollToYear: (year: number) => void;
  ariaLabel: string;
  heading: string;
};

const YearNavContext = createContext<YearNavContextValue | null>(null);

function useYearNavContext() {
  const ctx = useContext(YearNavContext);
  if (!ctx) throw new Error("Year nav must be used within MagazineYearNavProvider");
  return ctx;
}

export function MagazineYearNavProvider({
  children,
  ariaLabel,
  heading,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  heading: string;
}) {
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
      { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const value = useMemo(
    () => ({ active, scrollToYear, ariaLabel, heading }),
    [active, scrollToYear, ariaLabel, heading],
  );

  return (
    <YearNavContext.Provider value={value}>{children}</YearNavContext.Provider>
  );
}

/** Mobile / tablet: horizontal snap strip below hero. */
export function YearNavStrip() {
  const { active, scrollToYear, ariaLabel, heading } = useYearNavContext();

  return (
    <div
      id="years-rail"
      className="scroll-mt-[7rem] border-b border-stone-200/80 bg-[#faf7f2] py-5 xl:hidden"
    >
      <p className="mb-3 px-4 text-[10px] font-bold uppercase tracking-[0.35em] text-stone-500 md:px-8">
        {heading}
      </p>
      <div
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 md:gap-4 md:px-8"
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
              className={`snap-center shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                on
                  ? "bg-stone-900 text-[#faf7f2]"
                  : "bg-stone-200/70 text-stone-700 hover:bg-stone-300/80"
              }`}
            >
              {year}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Desktop: vertical spine for sticky sidebar. */
export function YearNavSpine() {
  const { active, scrollToYear, ariaLabel, heading } = useYearNavContext();

  return (
    <nav className="relative pl-6" aria-label={ariaLabel}>
      <span
        className="absolute bottom-1 left-[7px] top-10 w-px bg-stone-300"
        aria-hidden
      />
      <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.35em] text-stone-500">
        {heading}
      </p>
      <ul className="space-y-0" role="tablist">
        {YEARS.map((year) => {
          const on = active === year;
          return (
            <li key={year}>
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => scrollToYear(year)}
                className={`group relative flex w-full items-baseline gap-3 py-3 text-left transition ${
                  on ? "text-stone-900" : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <span
                  className={`relative z-[1] mt-1.5 h-2 w-2 shrink-0 rounded-full transition ${
                    on ? "bg-stone-900" : "bg-stone-300 group-hover:bg-stone-500"
                  }`}
                />
                <span className="font-[family-name:var(--font-display)] text-3xl font-semibold tabular-nums leading-none">
                  {year}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
