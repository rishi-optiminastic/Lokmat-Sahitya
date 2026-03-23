export type CarouselSlide = {
  src: string;
  /** CSS object-position value for the hero image — use to pin portrait subjects */
  objectPosition?: string;
};

/** Curated hero slides with pinned opening photos */
export const CAROUSEL_SLIDES: CarouselSlide[] = [
  { src: "/gallery/Shri Vijay J Darda.png",    objectPosition: "center 20%" },
  { src: "/gallery/Rajendra Darda.png",          objectPosition: "center 20%" },
  { src: "/gallery/Shri Devendra Darda.jpg",    objectPosition: "center 20%" },
  { src: "/hero-1/2023.jpg" },
  { src: "/hero-1/Korum Mall.jpg" },
  { src: "/hero-1/2025 Award.jpg" },
  { src: "/hero-1/Gadkari Rangayatan Thane 2023.jpg" },
  { src: "/hero-1/2024.jpg" },
  { src: "/hero-1/Tip Top Plaza Thane.jpg" },
];
