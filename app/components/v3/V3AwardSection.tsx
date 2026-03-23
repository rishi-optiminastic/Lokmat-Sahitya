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

export function V3AwardSection({ year, awardees, jury, d, locale }: Props) {
  const [activeAwardee, setActiveAwardee] = useState<EditionAwardee | null>(null);

  return (
    <>
      <section id={`year-${year}`} className="scroll-mt-40">
      <div className="mb-10">
        <span className="inline-flex items-center rounded-full bg-[#0ea5e9]/10 px-4 py-1.5 text-sm font-bold tracking-wide text-[#0ea5e9]">
          {year}
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {d.edition.awardeesHeading}
        </h2>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {awardees.map((a) => {
          const primaryBook = a.books[0];
          const heroSrc = primaryBook?.src ?? a.photoSrc;
          const showAuthorPortrait = Boolean(primaryBook && a.photoSrc);

          return (
            <li key={a.photoSrc || primaryBook?.src || a.author}>
              <button
                type="button"
                onClick={() => setActiveAwardee(a)}
                className="block h-full w-full text-left"
                aria-label={d.edition.portraitAlt.replace("{name}", a.author)}
              >
                <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                    {heroSrc ? (
                      <Image
                        src={heroSrc}
                        alt={
                          primaryBook
                            ? d.edition.bookAlt.replace(
                                "{title}",
                                primaryBook.title,
                              )
                            : d.edition.portraitAlt.replace("{name}", a.author)
                        }
                        fill
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      />
                    ) : null}
                  </div>
                  <div className="flex items-center gap-3.5 p-5">
                    {showAuthorPortrait ? (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100 shadow-[0_2px_8px_rgba(15,23,42,0.08)] ring-2 ring-white">
                        <Image
                          src={a.photoSrc}
                          alt={d.edition.portraitAlt.replace("{name}", a.author)}
                          fill
                          className="object-cover object-top"
                          sizes="48px"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-slate-900">
                        {a.author}
                      </p>
                      {primaryBook && (
                        <p className="mt-0.5 truncate text-sm text-slate-500">
                          {primaryBook.title}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Additional book covers */}
      {awardees.some((a) => a.books.length > 1) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {awardees
            .filter((a) => a.books.length > 1)
            .flatMap((a) =>
              a.books.slice(1).map((b) => (
                <div
                  key={b.src}
                  className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-50 shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
                >
                  <Image
                    src={b.src}
                    alt={d.edition.bookAlt.replace("{title}", b.title)}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              )),
            )}
        </div>
      )}

      {/* Jury */}
      <div className="mt-16">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-slate-900">
          {d.edition.juryHeading}
        </h3>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-500">
          {d.edition.juryCaption}
        </p>

        {jury.length === 0 ? (
          <p className="mt-6 rounded-xl bg-slate-50 px-5 py-5 text-slate-500">
            {d.edition.juryEmpty}
          </p>
        ) : (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {jury.map((j) => (
              <li key={j.src}>
                <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition duration-200 hover:shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100">
                    <Image
                      src={j.src}
                      alt={j.title}
                      fill
                      className="object-cover object-top"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800">
                      {j.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {getJuryProfile(j.title, locale)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      </section>

      {activeAwardee && (
        <div
          className="fixed inset-0 z-[110] flex items-end bg-slate-950/70 p-4 md:items-center md:justify-center"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setActiveAwardee(null)}
            aria-label={d.gallery.lightboxClose}
          />
          <div className="relative z-[111] w-full max-w-xl rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.25)] md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0ea5e9]">
                  {year}
                </p>
                <h4 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-slate-900">
                  {activeAwardee.author}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveAwardee(null)}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-200"
              >
                {d.gallery.lightboxClose}
              </button>
            </div>

            <div className="mt-5 space-y-3 text-slate-700">
              {activeAwardee.books[0] ? (
                <p>
                  <span className="font-semibold text-slate-900">{d.edition.bookLabel}:</span>{" "}
                  {activeAwardee.books[0].title}
                </p>
              ) : null}

              {activeAwardee.books.length > 1 ? (
                <div>
                  <p className="font-semibold text-slate-900">More recognised works:</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {activeAwardee.books.slice(1).map((book) => (
                      <li key={book.src}>{book.title}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
