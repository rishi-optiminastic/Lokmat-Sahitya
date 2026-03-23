"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { SiteVideo } from "@/lib/site-videos";

type Props = {
  videos: SiteVideo[];
  d: Dictionary;
};

/**
 * Asymmetric grid: first tile spans two columns on md+.
 */
export function MagazineVideoGrid({ videos, d }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (openId) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openId]);

  return (
    <>
      <section id="videos" className="scroll-mt-32 space-y-10">
        <header className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
            {d.video.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 md:text-lg">
            {d.video.body}
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:grid-rows-2 md:gap-4 md:min-h-[380px]">
          {videos.map((v, i) => {
            const thumb = `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`;
            const meta = d.video.items[i] ?? d.video.items[0];
            const featured = i === 0;
            return (
              <li
                key={`${v.youtubeId}-${i}`}
                className={featured ? "md:row-span-2" : "md:min-h-[180px]"}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(v.youtubeId)}
                  aria-label={`${d.video.play}: ${meta.title}`}
                  className="group relative flex h-full min-h-[200px] w-full overflow-hidden bg-stone-200 text-left shadow-[0_20px_50px_rgba(28,25,23,0.1)] transition hover:shadow-[0_24px_60px_rgba(28,25,23,0.14)] md:min-h-0"
                >
                  <Image
                    src={thumb}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes={
                      featured
                        ? "(max-width:768px) 100vw, 100vw"
                        : "(max-width:768px) 100vw, 50vw"
                    }
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent"
                    aria-hidden
                  />
                  <span className="absolute left-1/2 top-[42%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#faf7f2]/95 text-xl text-stone-900 shadow-lg ring-4 ring-white/20 transition group-hover:scale-105">
                    ▶
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                    <span className="block font-[family-name:var(--font-display)] text-xl font-semibold text-white md:text-2xl">
                      {meta.title}
                    </span>
                    <span className="mt-1 block text-sm text-white/85">
                      {meta.detail}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {openId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={d.video.title}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label={d.video.close}
            onClick={close}
          />
          <div className="relative z-[101] w-full max-w-4xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <p className="truncate text-sm font-medium text-white">
                {d.video.watchOnYoutube}
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                {d.video.close}
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                title={d.video.play}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${openId}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
