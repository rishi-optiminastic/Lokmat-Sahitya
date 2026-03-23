"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { SiteVideo } from "@/lib/site-videos";

type Props = {
  videos: SiteVideo[];
  d: Dictionary;
};

export function V3VideoGrid({ videos, d }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openId, close]);

  return (
    <>
      <section id="videos" className="scroll-mt-40">
        <header className="mb-10 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {d.video.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-500">
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
                  className="group w-full overflow-hidden rounded-2xl bg-white text-left shadow-[0_2px_12px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <Image
                      src={thumb}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width:640px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 transition group-hover:opacity-80"
                      aria-hidden
                    />
                    <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0ea5e9] shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition duration-300 group-hover:scale-110">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M6.5 4.5v11l9-5.5-9-5.5z" />
                      </svg>
                    </span>
                  </div>
                  <div className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{meta.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {meta.detail}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {openId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
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
          <div className="relative z-[101] w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <p className="text-sm font-medium text-white/80">
                {d.video.watchOnYoutube}
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
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
