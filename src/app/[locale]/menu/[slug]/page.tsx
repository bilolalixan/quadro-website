import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getCategoryBySlug, getMenuCategories } from "@/lib/menu";
import { localize } from "@/lib/localized";
import { MenuCategorySection } from "@/components/menu-category-section";
import type { Locale } from "@/i18n/routing";

export async function generateStaticParams() {
  const categories = await getMenuCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return {};

  return {
    title: localize(locale as Locale, {
      ru: category.nameRu,
      uz: category.nameUz,
      en: category.nameEn,
    }),
  };
}

export default async function MenuCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("menu");

  if (!category) {
    notFound();
  }

  return (
    <MenuCategorySection
      category={category}
      locale={locale}
      emptyLabel={t("empty")}
    />
  );
}
