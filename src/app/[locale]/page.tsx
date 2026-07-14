import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BookingForm } from "@/components/booking-form";
import { HeroBackground } from "@/components/hero-background";
import { ArrowCircle } from "@/components/arrow-circle";
import { CardCarousel } from "@/components/card-carousel";
import { Reveal } from "@/components/reveal";
import { ParallaxMedia } from "@/components/parallax-media";

export default async function HomePage() {
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  const heroLines = t("hero_title").split("\n");

  const carouselItems = [
    {
      key: "menu",
      title: tNav("menu"),
      caption: t("carousel_menu_caption"),
      image: "/images/mezze-spread.jpg",
      href: "/menu",
    },
    {
      key: "bar",
      title: tNav("bar"),
      caption: t("carousel_bar_caption"),
      image: "/images/steak-wine.jpg",
      href: "/bar",
    },
    {
      key: "events",
      title: tNav("events"),
      caption: t("carousel_events_caption"),
      image: "/images/dining-window.jpg",
      href: "/events",
    },
    {
      key: "gallery",
      title: tNav("gallery"),
      caption: t("carousel_gallery_caption"),
      image: "/images/bar-display.jpg",
      href: "/gallery",
    },
  ];

  return (
    <div>
      <section className="relative -mt-20 flex h-[100svh] min-h-[560px] items-center overflow-hidden bg-maroon-dark">
        <HeroBackground />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative mx-auto w-full max-w-6xl px-6 text-cream sm:px-10 lg:px-16">
          <div className="max-w-full sm:max-w-2xl lg:max-w-5xl">
            <span className="font-sans text-sm font-medium uppercase tracking-[0.2em] sm:text-base">
              {t("hero_kicker")}
            </span>
            <h1 className="mt-4 font-sans text-[clamp(2rem,5.5vw,4rem)] font-normal uppercase leading-[0.95] tracking-[0.01em]">
              {heroLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-8 text-[11px] font-medium uppercase tracking-widest">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 border-b border-cream/50 pb-1 transition-colors hover:border-cream"
              >
                {t("menuBtn")}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/bar"
                className="group inline-flex items-center gap-2 border-b border-cream/50 pb-1 transition-colors hover:border-cream"
              >
                {t("barBtn")}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Full-viewport split Menu section, Ballena "FLAVORS THAT HOLD THE MOMENT" pattern */}
      <section className="flex flex-col sm:h-screen sm:min-h-[640px] sm:flex-row">
        <div className="relative h-64 shrink-0 overflow-hidden sm:h-auto sm:w-1/2">
          <Reveal variant="scale" className="absolute inset-0 h-full w-full">
            <Image
              src="/images/mirrors-lounge.jpg"
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
        <div className="flex shrink-0 flex-col justify-between bg-terracotta px-6 py-10 text-cream sm:w-1/2 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <Reveal>
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream/80">
              {t("story_kicker")}
            </span>
            <h2 className="mt-4 max-w-lg font-sans text-[clamp(1.75rem,3.5vw,3rem)] font-normal uppercase leading-[0.95] tracking-[0.01em]">
              {t("story_title")}
            </h2>
          </Reveal>

          <Reveal delay={150} className="max-w-md">
            <p className="text-sm leading-relaxed text-cream/90 sm:text-base">
              {t("story_text")}
            </p>
            <Link
              href="/menu"
              className="mt-6 inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-widest"
            >
              {t("story_cta")}
              <ArrowCircle variant="on-dark" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Full-viewport ambiance section, Ballena "SEA AND DESERT" pattern */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <ParallaxMedia className="absolute inset-0 h-full w-full">
          <Image
            src="/images/dining-shelves.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </ParallaxMedia>
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative flex h-full flex-col px-6 py-24 text-cream sm:px-10 sm:py-28 lg:px-16">
          <Reveal>
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em]">
              {t("ambiance_kicker")}
            </span>
            <h2 className="mt-4 max-w-3xl font-sans text-[clamp(1.75rem,4.5vw,3.5rem)] font-normal uppercase leading-[0.95] tracking-[0.01em]">
              {t("ambiance_heading")}
            </h2>
          </Reveal>

          <Reveal delay={150} className="ml-auto mt-auto max-w-xs">
            <p className="text-sm leading-relaxed text-cream/90">
              {t("ambiance_text")}
            </p>
            <Link
              href="/gallery"
              className="mt-6 inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-widest"
            >
              {t("ambiance_cta")}
              <ArrowCircle variant="on-dark" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Simple full-screen photo, no text */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <ParallaxMedia className="absolute inset-0 h-full w-full">
          <Image
            src="/images/lounge-statue.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </ParallaxMedia>
      </section>

      {/* Nature Retreat pattern: plain cream text section, no photo */}
      <section className="bg-cream px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[200px_1fr] lg:gap-16">
          <Reveal>
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              {t("retreat_kicker")}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="max-w-3xl font-sans text-[clamp(1.5rem,3.2vw,2.5rem)] font-normal uppercase leading-[1] tracking-[0.01em] text-foreground">
              {t("retreat_heading")}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base">
              {t("retreat_text")}
            </p>
            <Link
              href="/gallery"
              className="mt-8 inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-widest text-maroon"
            >
              {t("retreat_cta")}
              <ArrowCircle variant="on-light" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Card carousel: Menu / Bar / Events / Gallery */}
      <section className="bg-cream py-4 sm:py-6">
        <Reveal>
          <CardCarousel items={carouselItems} />
        </Reveal>
      </section>

      {/* About teaser, Ballena "block-media-intro" three-column pattern */}
      <section className="bg-cream px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:gap-10 lg:gap-16">
          <Reveal className="sm:w-28 sm:shrink-0">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              {t("about_kicker")}
            </span>
          </Reveal>

          <div className="relative aspect-[2/3] w-full overflow-hidden sm:w-1/3 sm:shrink-0">
            <ParallaxMedia className="absolute inset-0 h-full w-full">
              <Image
                src="/images/mezze-scoop.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </ParallaxMedia>
          </div>

          <Reveal delay={150} className="flex flex-col sm:w-1/3 sm:shrink-0">
            <h2 className="font-sans text-[clamp(1.75rem,3.2vw,2.8rem)] font-normal uppercase leading-[0.95] tracking-[0.02em] text-foreground">
              {t("about_heading")}
            </h2>
            <div className="mt-10 flex flex-col gap-8 sm:mt-auto">
              <p className="max-w-xs text-sm font-medium leading-relaxed text-foreground/80">
                {t("about_text")}
              </p>
              <Link
                href="/about"
                className="inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-widest text-maroon"
              >
                {t("about_cta")}
                <ArrowCircle variant="on-light" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact / Location, Ballena "block-card-content" video + floating card pattern */}
      <section className="relative flex h-screen min-h-[640px] items-end overflow-hidden pb-6 sm:pb-8">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/contact-teaser.svg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/contact.mp4" type="video/mp4" />
        </video>

        <Reveal className="relative mx-4 w-full max-w-[613px] rounded-[6px] bg-gold px-5 py-5 text-cream sm:mx-auto sm:px-6 sm:py-7">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <span className="font-sans text-xs font-medium uppercase tracking-[0.2em]">
                {t("contact_kicker")}
              </span>
              <h2 className="mt-4 max-w-[16ch] font-sans text-2xl font-normal uppercase leading-[0.95] tracking-[0.01em]">
                {t("contact_heading")}
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-1 text-xs sm:text-right">
              <p>{tNav("hoursShort")}</p>
              <p>+998 78 113 13 38</p>
              <p>{t("contact_address")}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="booking" className="mx-auto max-w-4xl px-6 py-20 sm:px-10 sm:py-28">
        <Reveal>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
            {t("contact_kicker")}
          </span>
          <h2 className="mt-4 max-w-xl font-sans text-[clamp(1.75rem,3.2vw,2.8rem)] font-normal uppercase leading-[0.95] tracking-[0.01em] text-foreground">
            {t("booking_title")}
          </h2>
          <p className="mt-4 max-w-xl text-sm text-foreground/70 sm:text-base">
            {t("booking_subtitle")}
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-12">
          <BookingForm />
        </Reveal>
      </section>
    </div>
  );
}
