"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowCircle } from "@/components/arrow-circle";
import { NavArrow } from "@/components/nav-arrow";

type CarouselItem = {
  key: string;
  title: string;
  caption: string;
  image: string;
  href: string;
};

export function CardCarousel({ items }: { items: CarouselItem[] }) {
  const t = useTranslations("home");
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateProgress() {
      const track = trackRef.current;
      if (!track) return;
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
    }

    updateProgress();
    track.addEventListener("scroll", updateProgress, { passive: true });
    return () => track.removeEventListener("scroll", updateProgress);
  }, []);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 320) + 16;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="group relative aspect-[4/5] w-[82vw] shrink-0 snap-start overflow-hidden rounded-md sm:w-[420px] lg:w-[460px]"
          >
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-between p-4 text-center sm:p-5">
              <span className="font-sans text-xl font-normal uppercase tracking-wide text-cream">
                {item.title}
              </span>
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm leading-snug text-cream/90">
                  {item.caption}
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-cream">
                  {t("carousel_explore")}
                  <ArrowCircle variant="on-dark" className="h-6 w-6" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByCard(-1)}
          className="flex h-[34px] w-[34px] items-center justify-center text-maroon transition-opacity hover:opacity-60"
        >
          <NavArrow direction="prev" />
        </button>

        <div className="relative h-px w-20 bg-maroon/20">
          <div
            className="absolute inset-y-0 left-0 bg-maroon"
            style={{ width: `${Math.max(4, progress * 100)}%` }}
          />
        </div>

        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByCard(1)}
          className="flex h-[34px] w-[34px] items-center justify-center text-maroon transition-opacity hover:opacity-60"
        >
          <NavArrow direction="next" />
        </button>
      </div>
    </div>
  );
}
