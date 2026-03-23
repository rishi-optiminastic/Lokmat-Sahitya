"use client";

import Image from "next/image";
import { useState } from "react";
import type { EditionAwardee, EditionImage } from "@/lib/editions";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getJuryProfile } from "@/lib/jury-profiles";

type Props = {
  year: number;
  awardees: EditionAwardee[];
  jury: EditionImage[];
  d: Dictionary;
  locale: string;
};

/**
 * Paired book + author layout (same data as Aurora). Book cover and portrait
 * share one card so neither floats in empty space.
 */
export function MagazineAwardYearSection({
  year,
  awardees,
  jury,
  d,
  locale,
}: Props) {
  const [activeAwardee, setActiveAwardee] = useState<EditionAwardee | null>(null);

  return (
    <>
      <section
        id={`year-${year}`}
        className="scroll-mt-32 space-y-12 border-t border-stone-200/80 pt-16 first:border-t-0 first:pt-0"
      >
      <div className="relative overflow-hidden">
        <p
          className="pointer-events-none select-none font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,7.5rem)] font-bold leading-none text-stone-100"
          aria-hidden
        >
          {year}
        </p>
        <div className="relative -mt-8 max-w-2xl space-y-1 md:-mt-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-stone-500">
            {year}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
            {d.edition.awardeesHeading}
          </h2>
        </div>
      </div>

      <div className="space-y-12 md:space-y-16">
        {awardees.map((a, idx) => {
          const hasBooks = a.books.length > 0;
          const hasPortrait = Boolean(a.photoSrc);
          const reverse = idx % 2 === 1;

          return (
            <button
              key={a.photoSrc || a.books[0]?.src || a.author}
              type="button"
              onClick={() => setActiveAwardee(a)}
              className="mx-auto block w-full max-w-5xl overflow-hidden rounded-2xl bg-white text-left shadow-[0_20px_50px_rgba(28,25,23,0.07)] ring-1 ring-stone-200/70"
              aria-label={d.edition.portraitAlt.replace("{name}", a.author)}
            >
              {hasBooks && hasPortrait ? (
                <div className="grid md:grid-cols-2 md:gap-0">
                  <div
                    className={`relative bg-[#f4f1ec] p-3 sm:p-4 md:p-5 ${
                      reverse ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <div className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden shadow-[0_12px_40px_rgba(28,25,23,0.12)]">
                      <Image
                        src={a.books[0].src}
                        alt={d.edition.bookAlt.replace("{title}", a.books[0].title)}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 50vw"
                        priority={idx === 0}
                      />
                    </div>
                    {a.books.length > 1 && (
                      <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                        {a.books.slice(1).map((b) => (
                          <div
                            key={b.src}
                            className="relative h-24 w-16 overflow-hidden bg-white shadow-sm ring-1 ring-stone-200/50"
                          >
                            <Image
                              src={b.src}
                              alt={d.edition.bookAlt.replace("{title}", b.title)}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex flex-col justify-center gap-6 p-6 sm:p-8 md:p-10 ${
                      reverse ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-xl bg-stone-200 shadow-[inset_0_0_0_1px_rgba(28,25,23,0.06)] md:mx-0 md:max-w-none">
                      <Image
                        src={a.photoSrc}
                        alt={d.edition.portraitAlt.replace("{name}", a.author)}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width:768px) 280px, 50vw"
                        priority={idx === 0}
                      />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                      {/* <p className="text-xs font-bold uppercase tracking-[0.25em] text-stone-500">
                        {d.edition.bookLabel}
                      </p> */}
                      <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold uppercase text-stone-900 md:text-4xl">
                        {a.author}
                      </h3>
                      <p className="text-lg text-stone-600">{a.books[0].title}</p>
                    </div>
                  </div>
                </div>
              ) : hasBooks ? (
                <div className="space-y-6 p-6 sm:p-8 md:p-10">
                  <div className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden bg-[#f4f1ec] shadow-[0_12px_40px_rgba(28,25,23,0.12)]">
                    <Image
                      src={a.books[0].src}
                      alt={d.edition.bookAlt.replace("{title}", a.books[0].title)}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 50vw"
                      priority={idx === 0}
                    />
                  </div>
                  {a.books.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-2">
                      {a.books.slice(1).map((b) => (
                        <div
                          key={b.src}
                          className="relative h-24 w-16 overflow-hidden bg-white shadow-sm ring-1 ring-stone-200/50"
                        >
                          <Image
                            src={b.src}
                            alt={d.edition.bookAlt.replace("{title}", b.title)}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="space-y-2 text-center md:text-left">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-stone-500">
                      {d.edition.bookLabel}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold uppercase text-stone-900 md:text-4xl">
                      {a.author}
                    </h3>
                    <p className="text-lg text-stone-600">{a.books[0].title}</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="relative aspect-[2/3] bg-stone-100">
                    <Image
                      src={a.photoSrc}
                      alt={d.edition.portraitAlt.replace("{name}", a.author)}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width:768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-10">
                    <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold uppercase text-stone-900 md:text-4xl">
                      {a.author}
                    </h3>
                    <p className="mt-3 text-base text-stone-500">
                      {d.edition.bookLabel}
                    </p>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-5xl space-y-5 rounded-2xl bg-[#f4f1ec]/60 p-6 md:p-8">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">
            {d.edition.juryHeading}
          </h3>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-stone-600">
            {d.edition.juryCaption}
          </p>
        </div>

        {jury.length === 0 ? (
          <p className="rounded-xl bg-white/80 px-4 py-4 text-sm text-stone-600 ring-1 ring-stone-200/60">
            {d.edition.juryEmpty}
          </p>
        ) : (
          <div className="-mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 pb-1 md:gap-4">
            {jury.map((j) => (
              <div
                key={j.src}
                className="w-[min(200px,70vw)] shrink-0 snap-start space-y-2"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-200 shadow-sm ring-1 ring-stone-200/40">
                  <Image
                    src={j.src}
                    alt={j.title}
                    fill
                    className="object-cover object-top"
                    sizes="200px"
                  />
                </div>
                <p className="text-center text-sm font-medium leading-snug text-stone-800">
                  {j.title}
                </p>
                <p className="text-center text-xs leading-relaxed text-stone-600">
                  {getJuryProfile(j.title, locale)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      </section>

      {activeAwardee && (
        <div
          className="fixed inset-0 z-[110] flex items-end bg-stone-950/70 p-4 md:items-center md:justify-center"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setActiveAwardee(null)}
            aria-label={d.gallery.lightboxClose}
          />
          <div className="relative z-[111] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-[0_30px_70px_rgba(28,25,23,0.3)] md:max-h-[85vh]">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-2xl bg-white px-6 pb-4 pt-6 md:px-8 md:pt-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                  {year}
                </p>
                <h4 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900 md:text-3xl">
                  {activeAwardee.author}
                </h4>
                {activeAwardee.category && (
                  <span className="mt-2 inline-block rounded-full bg-stone-100 px-3 py-0.5 text-xs font-semibold text-stone-700 ring-1 ring-stone-300">
                    {activeAwardee.category}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveAwardee(null)}
                className="shrink-0 rounded-full bg-stone-100 px-3 py-1.5 text-sm text-stone-700 hover:bg-stone-200"
              >
                {d.gallery.lightboxClose}
              </button>
            </div>

            <div className="space-y-4 px-6 pb-6 text-stone-700 md:px-8 md:pb-8">
              {activeAwardee.books[0] ? (
                <p className="text-sm">
                  <span className="font-semibold text-stone-900">{d.edition.bookLabel}:</span>{" "}
                  {activeAwardee.books[0].title}
                </p>
              ) : null}

              {activeAwardee.books.length > 1 ? (
                <div className="text-sm">
                  <p className="font-semibold text-stone-900">More recognised works:</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {activeAwardee.books.slice(1).map((book) => (
                      <li key={book.src}>{book.title}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {activeAwardee.description && (
                <p className="text-base leading-relaxed">{activeAwardee.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
