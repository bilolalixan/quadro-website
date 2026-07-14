"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { QuadroLogo } from "@/components/quadro-logo";

const SESSION_KEY = "quadro-intro-played";

export function IntroLoader() {
  const t = useTranslations("intro");
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [mounted, setMounted] = useState(isHome);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordmarkRowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isHome) return;

    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (alreadyPlayed || reduceMotion) {
      sessionStorage.setItem(SESSION_KEY, "1");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with sessionStorage/matchMedia on mount
      setMounted(false);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");

    let cancelled = false;

    document.body.style.overflow = "hidden";

    import("gsap").then(({ default: gsap }) => {
      if (cancelled || !overlayRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setMounted(false);
        },
      });

      tl.from(wordmarkRowRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.6,
        ease: "power2.out",
      })
        .to({}, { duration: 0.9 })
        .to(wordmarkRowRef.current, {
          opacity: 0,
          y: -12,
          duration: 0.5,
          ease: "power2.in",
        })
        .to(
          overlayRef.current,
          { opacity: 0, duration: 0.6, ease: "power2.inOut" },
          "<0.1",
        );
    });

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
  }, [isHome]);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-cream"
    >
      <div
        ref={wordmarkRowRef}
        className="flex items-center gap-4 px-6 text-center sm:gap-8"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] text-foreground/60 sm:text-xs">
          {t("left")}
        </span>
        <QuadroLogo className="h-7 w-auto text-maroon sm:h-11" />
        <span className="text-[10px] font-semibold tracking-[0.2em] text-foreground/60 sm:text-xs">
          {t("right")}
        </span>
      </div>
    </div>
  );
}
