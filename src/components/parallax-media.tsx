"use client";

import { useEffect, useRef } from "react";

type ParallaxMediaProps = {
  children: React.ReactNode;
  className?: string;
  from?: number;
  to?: number;
  start?: string;
  end?: string;
};

export function ParallaxMedia({
  children,
  className = "",
  from = 1.18,
  to = 1,
  start = "top bottom",
  end = "bottom top",
}: ParallaxMediaProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const media = mediaRef.current;
    if (!trigger || !media) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let cancelled = false;
    let scrollTrigger: import("gsap/ScrollTrigger").ScrollTrigger | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(media, { scale: from });

        scrollTrigger = ScrollTrigger.create({
          trigger,
          start,
          end,
          scrub: true,
          onUpdate: (self) => {
            gsap.set(media, { scale: from + (to - from) * self.progress });
          },
        });
      },
    );

    return () => {
      cancelled = true;
      scrollTrigger?.kill();
    };
  }, [from, to, start, end]);

  return (
    <div ref={triggerRef} className={`overflow-hidden ${className}`}>
      <div ref={mediaRef} className="absolute -inset-[10%] h-[120%] w-[120%]">
        {children}
      </div>
    </div>
  );
}
