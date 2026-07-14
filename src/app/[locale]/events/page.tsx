import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { localize, localizeNullable } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";
import { EventsCarousel } from "@/components/events-carousel";
import { PhotoGalleryStrip } from "@/components/photo-gallery-strip";
import { EventInquiryForm } from "@/components/event-inquiry-form";
import { Reveal } from "@/components/reveal";

const PHOTO_POOL = [
  "/images/bar-display.jpg",
  "/images/steak-wine.jpg",
  "/images/mezze-bowls.jpg",
  "/images/dining-shelves.jpg",
  "/images/steak-closeup.jpg",
  "/images/mezze-spread.jpg",
  "/images/mirrors-lounge.jpg",
  "/images/lounge-statue.jpg",
  "/images/dessert-berries.jpg",
];

const GALLERY_STRIP_IMAGES = [
  "/images/mirrors-lounge.jpg",
  "/images/bar-display.jpg",
  "/images/mezze-bowls.jpg",
  "/images/dining-shelves.jpg",
  "/images/steak-closeup.jpg",
  "/images/dessert-berries.jpg",
  "/images/lounge-statue.jpg",
  "/images/beef-skewer-salad.jpg",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events" });
  return { title: t("title") };
}

export default async function EventsPage() {
  const t = await getTranslations("events");
  const tInquiry = await getTranslations("eventInquiry");
  const locale = (await getLocale()) as Locale;

  const events = await prisma.event.findMany({ orderBy: { order: "asc" } });
  const heroLines = t("hero_heading").split("\n");
  const closingLines = t("closing_heading").split("\n");

  return (
    <div>
      <section className="relative -mt-20 flex h-[100svh] min-h-[560px] items-end justify-center overflow-hidden bg-maroon-dark pb-20 sm:pb-28">
        <Image
          src="/images/dining-window.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative flex flex-col items-center px-6 text-center text-cream">
          <span className="font-sans text-xs font-medium uppercase tracking-[0.25em]">
            {t("hero_kicker")}
          </span>
          <h1 className="mt-4 font-sans text-[clamp(2rem,5.5vw,4rem)] font-normal uppercase leading-[1.05] tracking-[0.01em]">
            {heroLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {events.length === 0 ? (
        <p className="px-6 py-24 text-center text-sm text-foreground/60">
          {t("empty")}
        </p>
      ) : (
        <EventsCarousel
          slides={events.map((event, index) => ({
            kicker: event.date
              ? new Intl.DateTimeFormat(locale, {
                  day: "2-digit",
                  month: "long",
                }).format(event.date)
              : String(index + 1).padStart(2, "0"),
            title: localize(locale, {
              ru: event.titleRu,
              uz: event.titleUz,
              en: event.titleEn,
            }),
            description: localizeNullable(locale, {
              ru: event.descriptionRu,
              uz: event.descriptionUz,
              en: event.descriptionEn,
            }),
            image: PHOTO_POOL[index % PHOTO_POOL.length],
          }))}
        />
      )}

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
            {t("gallery_kicker")}
          </span>
          <h2 className="mt-4 max-w-2xl font-sans text-[clamp(1.75rem,3.5vw,3rem)] font-normal uppercase leading-[0.95] tracking-[0.01em] text-foreground">
            {t("gallery_heading")}
          </h2>
        </div>

        <div className="mt-10">
          <PhotoGalleryStrip images={GALLERY_STRIP_IMAGES} />
        </div>
      </section>

      <section className="bg-cream px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2 sm:gap-16">
          <div>
            <h2 className="max-w-md font-sans text-[clamp(1.75rem,3.2vw,2.8rem)] font-normal uppercase leading-[0.95] tracking-[0.01em] text-foreground">
              {tInquiry("heading")}
            </h2>
            <div className="relative mt-10 aspect-[3/4] w-40 overflow-hidden rounded-sm sm:w-48">
              <Image
                src="/images/mezze-scoop.jpg"
                alt=""
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          </div>

          <EventInquiryForm />
        </div>
      </section>

      <section className="relative flex h-screen min-h-[560px] items-center justify-center overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />

        <Reveal className="relative max-w-4xl px-6 text-center">
          <h2 className="font-sans text-[clamp(1.75rem,4.5vw,3.5rem)] font-normal uppercase leading-[1.05] tracking-[0.01em] text-cream">
            {closingLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>
      </section>
    </div>
  );
}
