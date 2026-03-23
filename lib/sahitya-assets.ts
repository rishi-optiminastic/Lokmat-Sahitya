/** Build a URL-safe path under `/sahitya-assets` for filenames with spaces. */
export function sahityaAsset(...parts: string[]) {
  return "/sahitya-assets/" + parts.map((p) => encodeURIComponent(p)).join("/");
}
