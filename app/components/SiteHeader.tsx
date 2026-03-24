"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import Image from "next/image";

type Props = {
  locale: Locale;
  d: Dictionary;
};

export function SiteHeader({ locale, d }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link =
    "text-sm font-medium text-slate-600 transition-colors hover:text-slate-900";

  const headerBg = scrolled
    ? "bg-[#f8fafc]/92 shadow-[var(--shadow-md)] backdrop-blur-md"
    : "bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50  duration-300 ${headerBg}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 md:px-6">
        {/* <Image src="./icon.svg" alt="Lokmat Sahitya" width={30} height={30} /> */}
        <Link href={`/${locale}`} className="group flex min-w-0 flex-col leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500 transition-colors group-hover:text-sky-600">
            {d.brand.lokmat}
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            {d.brand.sahitya}
          </span> 
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 md:gap-4">
          <nav
            className="flex max-w-[42vw] items-center gap-2 overflow-x-auto sm:max-w-none sm:gap-6"
            aria-label="Primary"
          >
            <a className={link} href="#years-anchor">
              {d.nav.years}
            </a>
            <a className={link} href="#gallery">
              {d.nav.gallery}
            </a>
            <a className={link} href="#videos">
              {d.nav.video}
            </a>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
