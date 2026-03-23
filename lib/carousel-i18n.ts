import type { Dictionary } from "@/lib/i18n/dictionaries";
import { CAROUSEL_SLIDES, type CarouselSlide } from "@/lib/carousel-data";

export type LocalizedSlide = CarouselSlide & {
  title: string;
  subtitle: string;
};

export function getLocalizedCarouselSlides(d: Dictionary): LocalizedSlide[] {
  return CAROUSEL_SLIDES.map((slide, i) => {
    const slideData = d.carousel.slides[i];
    return {
      ...slide,
      title: slideData?.title ?? "",
      subtitle: slideData?.subtitle ?? "",
    };
  });
}
