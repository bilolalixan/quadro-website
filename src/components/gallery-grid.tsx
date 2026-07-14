"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { GalleryLightbox } from "@/components/gallery-lightbox";

type GalleryImageItem = {
  id: string;
  imageUrl: string;
  category: string;
};

const CATEGORIES = ["interer", "blyuda", "bar"] as const;
const INITIAL_COUNT = 9;

export function GalleryGrid({ images }: { images: GalleryImageItem[] }) {
  const t = useTranslations("gallery");
  const [filter, setFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? images
        : images.filter((image) => image.category === filter),
    [images, filter],
  );

  const visible = filtered.slice(0, visibleCount);
  const urls = filtered.map((image) => image.imageUrl);

  function selectFilter(next: string) {
    setFilter(next);
    setVisibleCount(INITIAL_COUNT);
  }

  return (
    <div className="grid gap-10 sm:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] lg:gap-16">
      <div className="sm:sticky sm:top-24 sm:self-start">
        <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
          {t("filter")}
        </span>
        <nav className="mt-4 flex flex-row flex-wrap gap-x-5 gap-y-2 sm:flex-col sm:gap-3">
          <button
            type="button"
            onClick={() => selectFilter("all")}
            className={`text-left text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
              filter === "all"
                ? "text-maroon"
                : "text-foreground/60 hover:text-maroon"
            }`}
          >
            {t("all")}
          </button>
          {CATEGORIES.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => selectFilter(key)}
              className={`text-left text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                filter === key
                  ? "text-maroon"
                  : "text-foreground/60 hover:text-maroon"
              }`}
            >
              {t(`categories.${key}`)}
            </button>
          ))}
        </nav>
      </div>

      <div>
        <div className="columns-2 gap-4 sm:columns-3">
          {visible.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative mb-4 block w-full overflow-hidden rounded-sm"
            >
              <Image
                src={image.imageUrl}
                alt=""
                width={600}
                height={800}
                sizes="(min-width: 640px) 33vw, 50vw"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + INITIAL_COUNT)}
              className="text-xs font-medium uppercase tracking-widest text-maroon transition-opacity hover:opacity-70"
            >
              {t("viewMore")}
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={urls}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
