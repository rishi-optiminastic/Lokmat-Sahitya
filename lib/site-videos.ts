/**
 * Replace `youtubeId` with clips from your channel when ready.
 * Thumbnails load from i.ytimg.com (allowed in next.config.ts).
 */
export type SiteVideo = {
  youtubeId: string;
};

/** Demo-friendly embeds; swap for your ceremony or interview IDs. */
export const SITE_VIDEOS: SiteVideo[] = [
  { youtubeId: "aqz-KE-bpKQ" },
  { youtubeId: "jNQXAC9IVRw" },
  { youtubeId: "M7lc1UVf-VE" },
];
