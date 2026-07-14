import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowCircle } from "@/components/arrow-circle";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");
  const heroLines = t("hero_heading").split("\n");
  const ctaLines = t("cta_heading").split("\n");
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    t("addressValue"),
  )}`;

  return (
    <div>
      <section className="relative -mt-20 flex min-h-[640px] flex-col sm:h-screen sm:flex-row">
        <div className="relative h-64 shrink-0 sm:h-auto sm:w-1/2">
          <Image
            src="/images/bar-display.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex shrink-0 flex-col justify-center gap-10 bg-maroon-dark px-6 py-10 text-cream sm:w-1/2 sm:px-12 lg:px-16">
          <div>
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream/70">
              {t("hero_eyebrow")}
            </span>
            <h1 className="mt-4 max-w-lg font-sans text-[clamp(1.75rem,3.5vw,3rem)] font-normal uppercase leading-[0.95] tracking-[0.01em]">
              {heroLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-widest text-cream/50">
                {t("hours")}
              </span>
              <span>{tNav("hoursShort")}</span>
              <a href="tel:+998781131338" className="mt-3 hover:opacity-70">
                +998 78 113 13 38
              </a>
              <a
                href="mailto:quadro.b.group@gmail.com"
                className="hover:opacity-70"
              >
                quadro.b.group@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-widest text-cream/50">
                {t("address")}
              </span>
              <span>{t("addressValue")}</span>
            </div>
          </div>

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-widest"
          >
            {t("directions")}
            <ArrowCircle variant="on-dark" />
          </a>
        </div>
      </section>

      <section className="bg-cream px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <Reveal>
          <h2 className="mx-auto max-w-6xl font-sans text-[clamp(1.5rem,3vw,2.25rem)] font-normal uppercase leading-[0.95] tracking-[0.01em] text-foreground">
            {t("map_title")}
          </h2>
        </Reveal>
        <Reveal
          delay={100}
          className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-sm"
        >
          <iframe
            title="Quadro on map"
            src="https://yandex.uz/map-widget/v1/?ll=69.262519%2C41.329599&z=16&pt=69.262519,41.329599,pm2rdm"
            className="h-[420px] w-full sm:h-[560px]"
            loading="lazy"
          />
        </Reveal>
      </section>

      <section className="relative flex h-screen min-h-[560px] items-center justify-center overflow-hidden bg-maroon-dark">
        <Image
          src="/images/dessert-coffee.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative flex flex-col items-center px-6 text-center text-cream">
          <span className="font-sans text-xs font-medium uppercase tracking-[0.25em]">
            {t("cta_kicker")}
          </span>
          <h2 className="mt-4 font-sans text-[clamp(1.75rem,4.5vw,3.25rem)] font-normal uppercase leading-[1.05] tracking-[0.01em]">
            {ctaLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Link
            href={{ pathname: "/", hash: "booking" }}
            className="mt-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-widest"
          >
            {t("cta_button")}
            <ArrowCircle variant="on-dark" />
          </Link>
        </div>
      </section>
    </div>
  );
}
