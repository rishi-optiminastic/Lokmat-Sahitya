"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";

const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  mr: "MR",
};

type SwitcherProps = {
  variant?: "default" | "onDark";
};

export function LanguageSwitcher({ variant = "default" }: SwitcherProps) {
  const pathname = usePathname() ?? "/en";

  const { current, restPath } = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    const first = parts[0];
    if (first && locales.includes(first as Locale)) {
      return {
        current: first as Locale,
        restPath: parts.slice(1).join("/"),
      };
    }
    return { current: "en" as Locale, restPath: parts.join("/") };
  }, [pathname]);

  const hrefFor = (locale: Locale) =>
    `/${locale}${restPath ? `/${restPath}` : ""}`;

  const shell =
    variant === "onDark"
      ? "border border-white/35 bg-black/15 shadow-none backdrop-blur-sm"
      : "bg-white/90 shadow-[var(--shadow-sm)] ring-1 ring-slate-200/80 backdrop-blur-sm";

  return (
    <div
      className={`flex max-w-full items-center gap-0.5 rounded-full p-0.5 text-[11px] font-semibold sm:text-xs ${shell}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => {
        const active = locale === current;
        const linkClass =
          variant === "onDark"
            ? active
              ? "bg-white text-[#2a2825]"
              : "text-white/85 hover:bg-white/10"
            : active
              ? "bg-[#0ea5e9] text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900";
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            className={`rounded-full px-2.5 py-1.5 transition sm:px-3 ${linkClass}`}
            aria-current={active ? "true" : undefined}
          >
            {LOCALE_LABEL[locale]}
          </Link>
        );
      })}
    </div>
  );
}
