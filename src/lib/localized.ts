import type { Locale } from "@/i18n/routing";

export function localize(
  locale: Locale,
  values: { ru: string; uz: string; en: string },
): string {
  if (locale === "uz") return values.uz;
  if (locale === "en") return values.en;
  return values.ru;
}

export function localizeNullable(
  locale: Locale,
  values: { ru: string | null; uz: string | null; en: string | null },
): string | null {
  if (locale === "uz") return values.uz;
  if (locale === "en") return values.en;
  return values.ru;
}

export function formatSum(priceSum: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat("ru-RU").format(priceSum);
  const suffix = locale === "en" ? "UZS" : "сум";
  return `${formatted} ${suffix}`;
}
