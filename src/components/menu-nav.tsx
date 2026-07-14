"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localize } from "@/lib/localized";

type CategoryNavItem = {
  slug: string;
  nameRu: string;
  nameUz: string;
  nameEn: string;
};

export function MenuNav({ categories }: { categories: CategoryNavItem[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("menu");
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-2 border-b border-maroon/10 pb-8">
      <Link
        href="/menu"
        className={`text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
          pathname === "/menu"
            ? "text-maroon"
            : "text-foreground/60 hover:text-maroon"
        }`}
      >
        {t("all")}
      </Link>
      {categories.map((category) => {
        const href = `/menu/${category.slug}`;
        const active = pathname === href;

        return (
          <Link
            key={category.slug}
            href={href}
            className={`text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
              active
                ? "text-maroon"
                : "text-foreground/60 hover:text-maroon"
            }`}
          >
            {localize(locale, {
              ru: category.nameRu,
              uz: category.nameUz,
              en: category.nameEn,
            })}
          </Link>
        );
      })}
    </nav>
  );
}
