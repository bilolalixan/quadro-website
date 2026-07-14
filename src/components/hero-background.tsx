"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function HeroBackground() {
  const [videoReady, setVideoReady] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with matchMedia on mount
    setAllowVideo(!reduceMotion);
  }, []);

  return (
    <div className="absolute inset-0">
      <Image
        src="/images/mirrors-lounge.jpg"
        alt=""
        fill
        priority
        className={`object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-0" : "opacity-100"
        }`}
      />
      {allowVideo && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
