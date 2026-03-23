"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { SiteVideo } from "@/lib/site-videos";

type Props = {
  videos: SiteVideo[];
  d: Dictionary;
};

export function VideoSection({ videos, d }: Props) {
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
      <section id="videos" className="scroll-mt-36 space-y-8">
        <header className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {d.video.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            {d.video.body}
          </p>
        </header>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => {
            const thumb = `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`;
            const meta = d.video.items[i] ?? d.video.items[0];
            return (
              <li key={`${v.youtubeId}-${i}`}>
                <button
                  type="button"
                  onClick={() => setOpenId(v.youtubeId)}
                  aria-label={`${d.video.play}: ${meta.title}`}
                  className="group relative w-full overflow-hidden rounded-2xl bg-white text-left shadow-[var(--shadow-md)] ring-1 ring-slate-200/50 transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <Image
                      src={thumb}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width:640px) 100vw, 33vw"
                    />
                    <span
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent opacity-80 transition group-hover:opacity-90"
                      aria-hidden
                    />
                    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-sky-500 shadow-[var(--shadow-lg)] ring-4 ring-white/30 transition group-hover:scale-105">
                      ▶
                    </span>
                  </div>
                  <div className="space-y-1 px-5 py-5">
                    <p className="text-lg font-semibold text-slate-900">
                      {meta.title}
                    </p>
                    <p className="text-sm text-slate-600">{meta.detail}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {openId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
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
          <div className="relative z-[101] w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-[var(--shadow-lg)] ring-1 ring-white/10">
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
