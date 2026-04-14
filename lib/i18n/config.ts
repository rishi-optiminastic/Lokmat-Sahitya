export const locales = ["mr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "mr";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
