import { getTranslations, getLocale } from "next-intl/server";
import { getMenuCategoriesWithItems } from "@/lib/menu";
import { MenuCategorySection } from "@/components/menu-category-section";
import type { Locale } from "@/i18n/routing";

export default async function MenuIndexPage() {
  const categories = await getMenuCategoriesWithItems();
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("menu");

  return (
    <div className="flex flex-col gap-16">
      {categories.map((category) => (
        <MenuCategorySection
          key={category.id}
          category={category}
          locale={locale}
          emptyLabel={t("empty")}
        />
      ))}
    </div>
  );
}
