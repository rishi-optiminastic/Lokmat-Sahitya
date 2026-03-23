import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { getLocalizedCarouselSlides } from "@/lib/carousel-i18n";
import {
  getEditionAwardeesDetailed,
  getJuryByYear,
  getPhotoFeature,
} from "@/lib/editions";
import { SITE_VIDEOS } from "@/lib/site-videos";
import { V3Header } from "../../components/v3/V3Header";
import { V3Hero } from "../../components/v3/V3Hero";
import { V3YearSelector } from "../../components/v3/V3YearSelector";
import { V3AwardSection } from "../../components/v3/V3AwardSection";
import { V3VideoGrid } from "../../components/v3/V3VideoGrid";
import { V3Gallery } from "../../components/v3/V3Gallery";

const YEARS = [2023, 2024, 2025, 2026] as const;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const d = getDictionary(raw);
  return {
    title: d.meta.title,
    description: d.meta.description,
  };
}

export default async function V3Page({ params }: PageProps) {
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
    <div className="min-h-full bg-[#f8fafc] text-slate-900 antialiased">
      <V3Header locale={locale} d={d} />

      <V3Hero slides={slides} labels={carouselLabels} />

      <V3YearSelector ariaLabel={d.yearsBar.aria} heading={d.yearsBar.label} />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Intro */}
        <section className="mb-20 max-w-3xl border-l-2 border-[#0ea5e9] pl-6 md:mb-28 md:pl-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0ea5e9]">
            {d.home.eyebrow}
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {d.home.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-500 md:text-xl">
            {d.home.subtitle}
          </p>
        </section>

        {/* Year sections */}
        <div className="space-y-24 md:space-y-32">
          {YEARS.map((year) => (
            <V3AwardSection
              key={year}
              year={year}
              awardees={getEditionAwardeesDetailed(year)}
              jury={getJuryByYear(year)}
              d={d}
            />
          ))}
        </div>

        {/* Videos */}
        <div className="mt-24 md:mt-32">
          <V3VideoGrid videos={SITE_VIDEOS} d={d} />
        </div>

        {/* Gallery */}
        <div className="mt-24 md:mt-32">
          <V3Gallery images={photoFeature} d={d} />
        </div>
      </main>

      <footer className="mt-16 border-t border-slate-100 bg-slate-50/80 py-12 text-center">
        <p className="text-sm text-slate-400">{d.footer}</p>
      </footer>
    </div>
  );
}
