"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isLocale } from "@/lib/i18n/config";

export function HtmlLang() {
  const pathname = usePathname();
  useEffect(() => {
    const seg = pathname?.split("/").filter(Boolean)[0];
    if (seg && isLocale(seg)) {
      document.documentElement.lang = seg === "mr" ? "mr" : "en";
    }
  }, [pathname]);
  return null;
}
