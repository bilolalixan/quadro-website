import { localize, localizeNullable, formatSum } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";

type MenuItem = {
  id: string;
  nameRu: string;
  nameUz: string;
  nameEn: string;
  descriptionRu: string | null;
  descriptionUz: string | null;
  descriptionEn: string | null;
  priceSum: number;
  unit: string | null;
};

type MenuCategory = {
  id: string;
  nameRu: string;
  nameUz: string;
  nameEn: string;
  items: MenuItem[];
};

export function MenuCategorySection({
  category,
  locale,
  emptyLabel,
  headingId,
}: {
  category: MenuCategory;
  locale: Locale;
  emptyLabel: string;
  headingId?: string;
}) {
  const half = Math.ceil(category.items.length / 2);
  const columns = [category.items.slice(0, half), category.items.slice(half)];

  return (
    <div>
      <h2
        id={headingId}
        className="font-sans text-[clamp(1.75rem,3vw,2.5rem)] font-normal uppercase leading-[0.95] tracking-[0.01em] text-foreground"
      >
        {localize(locale, {
          ru: category.nameRu,
          uz: category.nameUz,
          en: category.nameEn,
        })}
      </h2>

      {category.items.length === 0 ? (
        <p className="mt-8 text-sm text-foreground/60">{emptyLabel}</p>
      ) : (
        <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-maroon/10 pt-8 sm:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {column.map((item) => {
                const description = localizeNullable(locale, {
                  ru: item.descriptionRu,
                  uz: item.descriptionUz,
                  en: item.descriptionEn,
                });

                return (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3"
                  >
                    <div>
                      <h3 className="font-sans text-xs font-medium uppercase tracking-wide text-foreground">
                        {localize(locale, {
                          ru: item.nameRu,
                          uz: item.nameUz,
                          en: item.nameEn,
                        })}
                      </h3>
                      {description && (
                        <p className="mt-1 text-xs leading-relaxed text-foreground/60">
                          {description}
                        </p>
                      )}
                    </div>
                    <p className="shrink-0 whitespace-nowrap text-xs font-medium text-foreground">
                      {formatSum(item.priceSum, locale)}
                      {item.unit ? ` / ${item.unit}` : ""}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
