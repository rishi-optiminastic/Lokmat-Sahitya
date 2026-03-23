"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

type Props = {
  locale: Locale;
  d: Dictionary;
};

export function V3Header({ locale, d }: Props) {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight - 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase = "font-medium transition-colors duration-300";
  const linkColor = pastHero
    ? "text-slate-500 hover:text-slate-900"
    : "text-white/70 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        pastHero
          ? "bg-white/90 shadow-[0_1px_3px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/v3`}
          className="group flex flex-col leading-none"
        >
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.35em] transition-colors duration-300 ${
              pastHero
                ? "text-slate-400 group-hover:text-[#0ea5e9]"
                : "text-white/50 group-hover:text-white/80"
            }`}
          >
            {d.brand.lokmat}
          </span>
          <span
            className={`font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight transition-colors duration-300 md:text-2xl ${
              pastHero ? "text-slate-900" : "text-white"
            }`}
          >
            {d.brand.sahitya}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-5">
          <nav
            className="flex items-center gap-3 text-xs sm:gap-6 sm:text-sm"
            aria-label="Primary"
          >
            <a className={`${linkBase} ${linkColor}`} href="#years-anchor">
              {d.nav.years}
            </a>
            <a className={`${linkBase} ${linkColor}`} href="#videos">
              {d.nav.video}
            </a>
            <a className={`${linkBase} ${linkColor}`} href="#gallery">
              {d.nav.gallery}
            </a>
          </nav>
          <LanguageSwitcher variant={pastHero ? "default" : "onDark"} />
        </div>
      </div>
    </header>
  );
}
