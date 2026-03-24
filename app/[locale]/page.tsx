import { notFound } from "next/navigation";
import { AwardYearSection } from "../components/AwardYearSection";
import { HeroCarousel } from "../components/HeroCarousel";
import { PhotoGallery } from "../components/PhotoGallery";
import { SiteHeader } from "../components/SiteHeader";
import { VideoSection } from "../components/VideoSection";
import { YearPills } from "../components/YearPills";
import { getLocalizedCarouselSlides } from "@/lib/carousel-i18n";
import { EDITION_YEARS } from "@/lib/edition-years";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import {
  getEditionAwardeesDetailed,
  getJuryByYear,
  getPhotoFeature,
} from "@/lib/editions";
import { SITE_VIDEOS } from "@/lib/site-videos";

type PageProps = { params: Promise<{ locale: string }> };

export default async function Home({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const d = getDictionary(locale);
  const slides = getLocalizedCarouselSlides(d);

  const carouselLabels = {
    ariaCarousel: d.carousel.ariaCarousel,
    prev: d.carousel.prev,
    next: d.carousel.next,
    indicators: d.carousel.indicators,
    slideAria: d.carousel.slideAria,
  };

  const photoFeature = getPhotoFeature();

  return (
    <div className="min-h-full bg-[#faf9f6] text-stone-900 antialiased">
      <SiteHeader locale={locale} d={d} />

      <div className="relative">
        <HeroCarousel slides={slides} labels={carouselLabels} />
      </div>

      <YearPills ariaLabel={d.yearsBar.aria} heading={d.yearsBar.label} />

      <main className="mx-auto max-w-6xl space-y-24 px-4 py-16 md:space-y-28 md:px-8 md:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
            {d.home.eyebrow}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-stone-900 md:text-5xl">
            {d.home.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-600 md:text-xl">
            {d.home.subtitle}
          </p>
        </section>

        <div className="space-y-24 md:space-y-32">
          {EDITION_YEARS.map((year) => (
            <AwardYearSection
              key={year}
              year={year}
              awardees={getEditionAwardeesDetailed(year, locale)}
              jury={getJuryByYear(year)}
              d={d}
              locale={locale}
            />
          ))}
        </div>

        <VideoSection videos={SITE_VIDEOS} d={d} />

        <PhotoGallery images={photoFeature} d={d} />
      </main>

      <footer className="border-t border-stone-200/80 bg-[#f5f4f0] py-12 text-center text-sm text-stone-500">
        <p>{d.footer}</p>
      </footer>
    </div>
  );
}
