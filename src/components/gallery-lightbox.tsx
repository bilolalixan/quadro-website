"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NavArrow } from "@/components/nav-arrow";

export function GalleryLightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (event.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [images.length, onClose]);

  function go(direction: 1 | -1) {
    setIndex((i) => (i + direction + images.length) % images.length);
  }

  return (
    <div className="fixed inset-0 z-[999] flex flex-col bg-cream sm:flex-row">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-maroon/10 text-maroon transition-colors hover:bg-maroon/20 sm:right-6 sm:top-6"
      >
        ✕
      </button>

      <div className="relative flex-1">
        <Image
          src={images[index]}
          alt=""
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      <div className="hidden w-24 shrink-0 flex-col gap-2 overflow-y-auto p-3 sm:flex">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setIndex(i)}
            className={`relative aspect-square shrink-0 overflow-hidden rounded-sm transition-opacity ${
              i === index ? "opacity-100 ring-2 ring-maroon" : "opacity-50 hover:opacity-80"
            }`}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-5 pb-6 pt-2 sm:absolute sm:bottom-8 sm:left-0 sm:right-24 sm:pb-0">
        <span className="font-sans text-xs font-medium uppercase tracking-widest text-foreground/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(-1)}
          className="flex h-[34px] w-[34px] items-center justify-center text-maroon transition-opacity hover:opacity-60"
        >
          <NavArrow direction="prev" />
        </button>

        <div className="relative h-px w-20 bg-maroon/20">
          <div
            className="absolute inset-y-0 left-0 bg-maroon transition-all"
            style={{
              width: `${Math.max(4, ((index + 1) / images.length) * 100)}%`,
            }}
          />
        </div>

        <button
          type="button"
          aria-label="Next"
          onClick={() => go(1)}
          className="flex h-[34px] w-[34px] items-center justify-center text-maroon transition-opacity hover:opacity-60"
        >
          <NavArrow direction="next" />
        </button>
        <span className="font-sans text-xs font-medium uppercase tracking-widest text-foreground/50">
          {String(images.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
