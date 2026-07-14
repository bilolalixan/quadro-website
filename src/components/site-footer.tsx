import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowCircle } from "@/components/arrow-circle";
import { QuadroLogo } from "@/components/quadro-logo";

const NAV_LINKS = [
  { href: "/about", key: "about" },
  { href: "/menu", key: "menu" },
  { href: "/bar", key: "bar" },
  { href: "/events", key: "events" },
  { href: "/gallery", key: "gallery" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="border-t border-maroon/10 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-[minmax(0,1.3fr)_1fr_1fr] sm:gap-10 sm:px-6 sm:py-20">
        <div className="flex gap-5">
          <div className="relative aspect-[8/15] w-20 shrink-0 overflow-hidden sm:w-24">
            <Image src="/images/beef-skewer-salad.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <p className="max-w-xs text-sm leading-relaxed text-foreground/70 sm:text-base">
              {t("footer.tagline")}
            </p>
            <a
              href="https://www.instagram.com/quadro.tashkent/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-widest text-foreground"
            >
              {t("nav.instagram")}
              <ArrowCircle variant="on-light" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
            {t("footer.navigation")}
          </span>
          <nav className="mt-6 flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm uppercase tracking-wide text-foreground hover:text-terracotta"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
            {t("contact.title")}
          </span>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <a
              href="tel:+998781131338"
              className="text-foreground hover:text-terracotta"
            >
              +998 78 113 13 38
            </a>
            <a
              href="mailto:quadro.b.group@gmail.com"
              className="text-foreground hover:text-terracotta"
            >
              quadro.b.group@gmail.com
            </a>
            <span className="text-foreground/70">{t("footer.hours")}</span>
            <span className="text-foreground/70">{t("contact.addressValue")}</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t border-maroon/10 px-6 pt-8 sm:px-10">
        <QuadroLogo className="mx-auto w-full max-w-3xl text-maroon" />
      </div>

      <div className="flex flex-col items-center justify-between gap-2 border-t border-maroon/10 px-4 py-4 text-xs text-foreground/60 sm:flex-row sm:px-6">
        <span>
          Quadro © {new Date().getFullYear()} — {t("footer.rights")}
        </span>
        <span>{t("footer.hours")}</span>
      </div>
    </footer>
  );
}
