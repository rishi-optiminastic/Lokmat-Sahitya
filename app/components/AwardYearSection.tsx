import Image from "next/image";
import type { EditionAwardee, EditionImage } from "@/lib/editions";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  year: number;
  awardees: EditionAwardee[];
  jury: EditionImage[];
  d: Dictionary;
};

export function AwardYearSection({ year, awardees, jury, d }: Props) {
  return (
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
                    <p className="text-sm text-slate-500">
                      {/* <span className="font-medium text-slate-700">
                        {d.edition.bookLabel}
                      </span> */}
                      {/* {" · "}
                      {primaryBook.title} */}
                    </p>
                  )}
                </div>
              </article>
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
                  <p className="text-base font-medium leading-snug text-slate-900">
                    {j.title}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
