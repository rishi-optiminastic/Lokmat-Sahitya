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

/** Thin editorial bar: logo left, centered nav on md+, design switch + lang right. */
export function MagazineHeader({ locale, d }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link =
    "text-[13px] font-medium tracking-wide text-stone-600 transition hover:text-stone-900";

  return (
    <header
      className={`sticky top-0 z-50 border-b border-stone-200/80 transition-[background,box-shadow] duration-300 ${
        scrolled
          ? "bg-[#faf7f2]/95 shadow-[0_8px_30px_rgba(28,25,23,0.06)] backdrop-blur-md"
          : "bg-[#faf7f2]/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link
          href={`/${locale}/ink`}
          className="group flex min-w-0 flex-col leading-tight"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.45em] text-stone-500">
            {d.brand.lokmat}
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
            {d.brand.sahitya}
          </span>
        </Link>

        <nav
          className="order-3 flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-stone-200/60 pt-3 text-center md:order-none md:w-auto md:border-0 md:pt-0"
          aria-label="Primary"
        >
          <a className={link} href="#years-rail">
            {d.nav.years}
          </a>
          <a className={link} href="#gallery">
            {d.nav.gallery}
          </a>
          <a className={link} href="#videos">
            {d.nav.video}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}`}
            className="rounded-full bg-stone-900 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#faf7f2] transition hover:bg-stone-800"
          >
            {d.designSwitch.toAurora}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
