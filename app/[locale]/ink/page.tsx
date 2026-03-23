import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MagazineAwardYearSection } from "../../components/magazine/MagazineAwardYearSection";
import { MagazineGallery } from "../../components/magazine/MagazineGallery";
import { MagazineHeader } from "../../components/magazine/MagazineHeader";
import { MagazineVideoGrid } from "../../components/magazine/MagazineVideoGrid";
import {
  MagazineYearNavProvider,
  YearNavSpine,
  YearNavStrip,
} from "../../components/magazine/MagazineYearNav";
import { SplitHeroCarousel } from "../../components/magazine/SplitHeroCarousel";
import { getLocalizedCarouselSlides } from "@/lib/carousel-i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import {
  getEditionAwardeesDetailed,
  getJuryByYear,
  getPhotoFeature,
} from "@/lib/editions";
import { SITE_VIDEOS } from "@/lib/site-videos";

const YEARS = [2023, 2024, 2025, 2026] as const;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const d = getDictionary(raw);
  return {
    title: d.metaInk.title,
    description: d.metaInk.description,
  };
}

export default async function InkHome({ params }: PageProps) {
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
    <MagazineYearNavProvider
      ariaLabel={d.yearsBar.aria}
      heading={d.yearsBar.label}
    >
      <div className="min-h-full bg-[#faf7f2] text-stone-900 antialiased">
        <MagazineHeader locale={locale} d={d} />

        <SplitHeroCarousel slides={slides} labels={carouselLabels} />

        <YearNavStrip />

        <div className="mx-auto max-w-[1400px] xl:grid xl:grid-cols-[minmax(160px,200px)_minmax(0,1fr)] xl:gap-14 xl:px-8">
          <aside className="relative hidden xl:block">
            <div className="sticky top-[5.5rem] border-r border-stone-200/60 py-10 pr-8">
              <YearNavSpine />
            </div>
          </aside>

          <main className="min-w-0 space-y-24 px-4 py-14 md:space-y-28 md:px-8 md:py-20 xl:px-0">
            <section className="mx-auto max-w-3xl border-l-2 border-stone-900/90 pl-6 md:pl-8">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-stone-500">
                {d.home.eyebrow}
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                {d.home.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-stone-600 md:text-xl">
                {d.home.subtitle}
              </p>
            </section>

            <div className="space-y-28 md:space-y-36">
              {YEARS.map((year) => (
                <MagazineAwardYearSection
                  key={year}
                  year={year}
                  awardees={getEditionAwardeesDetailed(year)}
                  jury={getJuryByYear(year)}
                  d={d}
                />
              ))}
            </div>

            <MagazineVideoGrid videos={SITE_VIDEOS} d={d} />

            <MagazineGallery images={photoFeature} d={d} />
          </main>
        </div>

        <footer className="border-t border-stone-200/80 bg-[#f0ebe3] py-12 text-center text-sm text-stone-500">
          <p>{d.footer}</p>
        </footer>
      </div>
    </MagazineYearNavProvider>
  );
}
