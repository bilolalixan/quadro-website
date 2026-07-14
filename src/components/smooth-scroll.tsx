"use client";

import { useEffect } from "react";
import type LenisType from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let lenis: LenisType | undefined;
    let cancelled = false;
    let tickerFn: ((time: number) => void) | undefined;

    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelled = true;
      lenis?.destroy();
      if (tickerFn) {
        import("gsap").then(({ default: gsap }) => {
          gsap.ticker.remove(tickerFn!);
        });
      }
    };
  }, []);

  return null;
}
