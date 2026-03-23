import type { Dictionary } from "@/lib/i18n/dictionaries";
import { CAROUSEL_SLIDES, type CarouselSlide } from "@/lib/carousel-data";

export type LocalizedSlide = CarouselSlide & {
  title: string;
  subtitle: string;
};

function titleFromSrc(src: string): string {
  const file = src.split("/").pop() ?? "";
  const decoded = decodeURIComponent(file).replace(/\.[^.]+$/, "");
  return decoded.replace(/[-_]/g, " ").trim();
}

export function getLocalizedCarouselSlides(d: Dictionary): LocalizedSlide[] {
  return CAROUSEL_SLIDES.map((slide, i) => {
    const slideData = d.carousel.slides[i];
    return {
      ...slide,
      title: slideData?.title ?? titleFromSrc(slide.src),
      subtitle: slideData?.subtitle ?? d.carousel.subtitles[i] ?? d.home.eyebrow,
    };
  });
}
