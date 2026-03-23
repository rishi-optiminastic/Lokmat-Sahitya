import Image from "next/image";
import type { EditionAwardee, EditionImage } from "@/lib/editions";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  year: number;
  awardees: EditionAwardee[];
  jury: EditionImage[];
  d: Dictionary;
};

export function V3AwardSection({ year, awardees, jury, d }: Props) {
  return (
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
                  <p className="text-sm font-medium text-slate-800">
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
