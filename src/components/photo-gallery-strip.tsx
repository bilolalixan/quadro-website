"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NavArrow } from "@/components/nav-arrow";

export function PhotoGalleryStrip({ images }: { images: string[] }) {
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
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:px-10 lg:px-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div
            key={src + i}
            className="relative aspect-[3/4] w-[70vw] shrink-0 snap-start overflow-hidden rounded-md sm:w-[320px] lg:w-[360px]"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 320px, 70vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
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
