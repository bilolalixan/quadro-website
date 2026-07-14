"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "up" | "scale" | "fade";
  delay?: number;
};

export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenClass =
    variant === "scale"
      ? "scale-[1.08] opacity-0"
      : variant === "fade"
        ? "opacity-0"
        : "translate-y-10 opacity-0";

  const shownClass =
    variant === "scale"
      ? "scale-100 opacity-100"
      : "translate-y-0 opacity-100";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1100ms] ease-out ${
        visible ? shownClass : hiddenClass
      } ${className}`}
    >
      {children}
    </div>
  );
}
