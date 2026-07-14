import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowCircle } from "@/components/arrow-circle";
import { localize, formatSum } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bar" });
  return { title: t("title"), description: t("subtitle") };
}

const BAR_SECTIONS = [
  {
    ru: "Коктейли",
    uz: "Kokteyllar",
    en: "Cocktails",
    items: [
      { ru: "Tinto de Verano", uz: "Tinto de Verano", en: "Tinto de Verano", price: 62000 },
      { ru: "Сангрия белая", uz: "Oq sangriya", en: "White sangria", price: 68000 },
      { ru: "Эспрессо мартини", uz: "Espresso martini", en: "Espresso martini", price: 78000 },
    ],
  },
  {
    ru: "Вино",
    uz: "Vino",
    en: "Wine",
    items: [
      { ru: "Риоха, бокал", uz: "Rioha, qadah", en: "Rioja, glass", price: 85000 },
      { ru: "Альбариньо, бокал", uz: "Albarino, qadah", en: "Albariño, glass", price: 90000 },
    ],
  },
  {
    ru: "Безалкогольное",
    uz: "Alkogolsiz",
    en: "Non-alcoholic",
    items: [
      { ru: "Лимонад домашний", uz: "Uy limonadi", en: "Homemade lemonade", price: 32000 },
      { ru: "Мохито безалкогольный", uz: "Alkogolsiz moxito", en: "Virgin mojito", price: 38000 },
    ],
  },
];

export default async function BarPage() {
  const t = await getTranslations("bar");
  const locale = (await getLocale()) as Locale;
  const heroLines = t("hero_heading").split("\n");
  const closingLines = t("closing_heading").split("\n");

  return (
    <div>
      <section className="relative -mt-20 flex h-[55vh] min-h-[380px] items-end justify-center overflow-hidden bg-maroon-dark pb-10 sm:pb-14">
        <Image
          src="/images/bar-display.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative flex flex-col items-center px-6 text-center text-cream">
          <span className="font-sans text-xs font-medium uppercase tracking-[0.25em]">
            {t("hero_kicker")}
          </span>
          <h1 className="mt-3 font-sans text-[clamp(1.5rem,3.2vw,2.75rem)] font-normal uppercase leading-[1.05] tracking-[0.01em]">
            {heroLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <p className="mx-auto max-w-xl font-sans text-[clamp(1.15rem,2vw,1.4rem)] font-normal uppercase leading-[1.15] tracking-[0.01em] text-foreground">
          {t("subtitle")}
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 sm:px-10 lg:px-16">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {BAR_SECTIONS.map((section) => (
            <div key={section.ru}>
              <h2 className="font-sans text-xl font-normal uppercase leading-[0.95] tracking-[0.01em] text-foreground">
                {localize(locale, section)}
              </h2>
              <div className="mt-6 flex flex-col gap-4 border-t border-maroon/10 pt-6">
                {section.items.map((item) => (
                  <div
                    key={item.ru}
                    className="flex items-start justify-between gap-3"
                  >
                    <h3 className="font-sans text-xs font-medium uppercase tracking-wide text-foreground">
                      {localize(locale, item)}
                    </h3>
                    <p className="shrink-0 whitespace-nowrap text-xs font-medium text-foreground">
                      {formatSum(item.price, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative flex h-screen min-h-[560px] items-center justify-center overflow-hidden bg-maroon-dark">
        <Image
          src="/images/steak-wine.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative flex flex-col items-center px-6 text-center text-cream">
          <span className="font-sans text-xs font-medium uppercase tracking-[0.25em]">
            {t("gallery_kicker")}
          </span>
          <h2 className="mt-4 font-sans text-[clamp(1.75rem,4.5vw,3.25rem)] font-normal uppercase leading-[1.05] tracking-[0.01em]">
            {closingLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Link
            href="/gallery"
            className="mt-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-widest"
          >
            {t("gallery_cta")}
            <ArrowCircle variant="on-dark" />
          </Link>
        </div>
      </section>
    </div>
  );
}
