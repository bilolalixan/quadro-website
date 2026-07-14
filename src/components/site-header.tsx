"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { QuadroLogo } from "@/components/quadro-logo";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/events", key: "events" },
  { href: "/menu", key: "menu" },
  { href: "/bar", key: "bar" },
  { href: "/gallery", key: "gallery" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const dark = (pathname === "/" || pathname === "/events") && !open;

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = inner.querySelectorAll("[data-menu-item]");

    if (reduceMotion) {
      panel.style.height = open ? "auto" : "0px";
      panel.style.opacity = open ? "1" : "0";
      items.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
      });
      return;
    }

    let cancelled = false;

    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;

      if (open) {
        gsap.set(items, { opacity: 0, y: 10 });
        gsap.to(panel, {
          height: inner.offsetHeight,
          duration: 0.7,
          ease: "power3.inOut",
        });
        gsap.to(panel, { opacity: 1, duration: 0.35, ease: "power1.out" });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.045,
          delay: 0.2,
          ease: "power2.out",
        });
      } else {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [open]);

  return (
    <div className="fixed inset-x-0 top-3 z-50 flex justify-center px-4">
      <header
        className={`w-full max-w-[620px] rounded-[6px] backdrop-blur-xl transition-colors ${
          dark
            ? "bg-black/20 text-cream"
            : "bg-cream/80 text-maroon shadow-sm"
        }`}
      >
        <div className="flex h-[52px] items-center justify-between px-2">
          <Link
            href={{ pathname: "/", hash: "booking" }}
            className={`rounded-[3px] border px-4 py-2 text-[10px] font-medium uppercase tracking-wider transition-opacity hover:opacity-70 ${
              dark ? "border-cream/25" : "border-maroon/25"
            }`}
          >
            {t("bookTableShort")}
          </Link>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Quadro"
            className="text-current"
          >
            <QuadroLogo className="h-[15px] w-auto" />
          </Link>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-[38px] w-[46px] flex-col items-center justify-center gap-[5px]"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            {open ? (
              <>
                <span className="absolute h-px w-[22px] rotate-45 bg-current" />
                <span className="absolute h-px w-[22px] -rotate-45 bg-current" />
              </>
            ) : (
              <>
                <span className="h-px w-[22px] bg-current" />
                <span className="h-px w-[22px] bg-current" />
                <span className="h-px w-[22px] bg-current" />
              </>
            )}
          </button>
        </div>
      </header>

      <div
        ref={panelRef}
        style={{ height: 0, opacity: 0 }}
        className={`absolute left-4 right-4 top-[68px] mx-auto max-w-[620px] overflow-hidden rounded-[6px] bg-cream text-foreground shadow-lg ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <div ref={innerRef}>
          <nav className="flex flex-col items-center gap-[10px] px-4 pb-2 pt-8">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  data-menu-item
                  onClick={() => setOpen(false)}
                  className={`py-[3px] text-xs font-medium uppercase tracking-wider transition-colors ${
                    active
                      ? "text-terracotta"
                      : "text-foreground hover:text-terracotta"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 flex flex-col items-center gap-2 pb-8">
            <a
              href="https://www.instagram.com/quadro.tashkent/"
              target="_blank"
              rel="noopener noreferrer"
              data-menu-item
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground/70 hover:text-terracotta"
            >
              {t("instagram")}
              <span aria-hidden>↗</span>
            </a>
            <a
              href="tel:+998781131338"
              data-menu-item
              className="text-xs font-medium uppercase tracking-wider text-foreground/70 hover:text-terracotta"
            >
              +998 78 113 13 38
            </a>
            <div className="mt-2" data-menu-item>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
