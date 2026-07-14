import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MenuNav } from "@/components/menu-nav";
import { ArrowCircle } from "@/components/arrow-circle";
import { getMenuCategories } from "@/lib/menu";

export default async function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("menu");
  const categories = await getMenuCategories();
  const heroLines = t("hero_heading").split("\n");
  const closingLines = t("closing_heading").split("\n");

  return (
    <div>
      <section className="relative -mt-20 flex h-[55vh] min-h-[380px] items-end justify-center overflow-hidden bg-maroon-dark pb-10 sm:pb-14">
        <Image
          src="/images/steak-closeup.jpg"
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
          {t("intro")}
        </p>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-20 sm:px-10 lg:px-16">
        <MenuNav categories={categories} />
        <div className="mt-12">{children}</div>
      </div>

      <section className="relative flex h-screen min-h-[560px] items-center justify-center overflow-hidden bg-maroon-dark">
        <Image
          src="/images/mezze-spread.jpg"
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
