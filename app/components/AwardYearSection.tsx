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

export function AwardYearSection({ year, awardees, jury, d, locale }: Props) {
  const [activeAwardee, setActiveAwardee] = useState<EditionAwardee | null>(null);

  return (
    <>
      <section
        id={`year-${year}`}
        className="scroll-mt-36 space-y-12 border-t border-slate-200/70 pt-16 first:border-t-0 first:pt-0"
      >
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
            {year}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {d.edition.awardeesHeading}
          </h2>
        </div>
      </header>

      <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
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
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-md)] ring-1 ring-slate-200/40 transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]">
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100">
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
                        className="object-cover transition duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <div className="flex items-center gap-3">
                      {showAuthorPortrait ? (
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100 shadow-[var(--shadow-sm)] ring-2 ring-white">
                          <Image
                            src={a.photoSrc}
                            alt={d.edition.portraitAlt.replace(
                              "{name}",
                              a.author,
                            )}
                            fill
                            className="object-cover object-top"
                            sizes="56px"
                          />
                        </div>
                      ) : null}
                      <p className="text-lg font-semibold leading-snug text-slate-900">
                        {a.author}
                      </p>
                    </div>
                    {a.books.length > 1 && (
                      <div className="flex flex-wrap gap-2">
                        {a.books.slice(1).map((b) => (
                          <div
                            key={b.src}
                            className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-50 shadow-[var(--shadow-sm)]"
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
                    {primaryBook && (
                      <p className="text-sm text-slate-500">{primaryBook.title}</p>
                    )}
                  </div>
                </article>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="space-y-6">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-slate-900">
            {d.edition.juryHeading}
          </h3>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600">
            {d.edition.juryCaption}
          </p>
        </div>
        {jury.length === 0 ? (
          <p className="rounded-2xl bg-slate-100/80 px-5 py-6 text-slate-600">
            {d.edition.juryEmpty}
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {jury.map((j) => (
              <li key={j.src}>
                <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-[var(--shadow-sm)] ring-1 ring-slate-200/50 transition hover:shadow-[var(--shadow-md)]">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
                    <Image
                      src={j.src}
                      alt={j.title}
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-medium leading-snug text-slate-900">
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
          <div className="relative z-[111] w-full max-w-xl rounded-2xl bg-white p-6 shadow-[var(--shadow-lg)] md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
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
