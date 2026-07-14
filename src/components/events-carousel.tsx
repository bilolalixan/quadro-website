"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type EventSlide = {
  kicker: string;
  title: string;
  description: string | null;
  image: string;
};

export function EventsCarousel({ slides }: { slides: EventSlide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  function go(direction: 1 | -1) {
    setIndex((i) => (i + direction + slides.length) % slides.length);
  }

  return (
    <section className="flex flex-col sm:h-screen sm:min-h-[640px] sm:flex-row">
      <div className="relative h-64 shrink-0 overflow-hidden sm:h-auto sm:w-1/2">
        {slides.map((slide, i) => (
          <Image
            key={slide.image + i}
            src={slide.image}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            priority={i === 0}
            className={`object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {slides.length > 1 && (
          <div className="absolute bottom-6 left-6 flex items-center gap-3 sm:bottom-8 sm:left-8">
            <button
              type="button"
              aria-label="Previous event"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-cream backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next event"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-cream backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              →
            </button>
          </div>
        )}
      </div>

      <div className="relative shrink-0 overflow-hidden bg-maroon-dark sm:w-1/2">
        {slides.map((slide, i) => (
          <div
            key={slide.title + i}
            className={`absolute inset-0 flex flex-col justify-center gap-6 px-6 py-10 text-cream transition-opacity duration-1000 sm:px-12 lg:px-16 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div>
              <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream/60">
                {slide.kicker}
              </span>
              <h2 className="mt-4 max-w-lg font-sans text-[clamp(1.75rem,3.5vw,3rem)] font-normal uppercase leading-[0.95] tracking-[0.01em]">
                {slide.title}
              </h2>
            </div>
            {slide.description && (
              <p className="max-w-md text-sm leading-relaxed text-cream/80 sm:text-base">
                {slide.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
