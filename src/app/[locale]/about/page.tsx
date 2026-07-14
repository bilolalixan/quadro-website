import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowCircle } from "@/components/arrow-circle";
import { Reveal } from "@/components/reveal";
import { ParallaxMedia } from "@/components/parallax-media";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("p1") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const heroLines = t("hero_heading").split("\n");
  const closingLines = t("closing_heading").split("\n");

  return (
    <div>
      <section className="relative -mt-20 flex h-[55vh] min-h-[380px] items-end justify-center overflow-hidden bg-maroon-dark pb-10 sm:pb-14">
        <Image
          src="/images/lounge-statue.jpg"
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

      <section className="relative h-screen min-h-[560px] w-full overflow-hidden">
        <ParallaxMedia className="absolute inset-0 h-full w-full">
          <Image
            src="/images/dining-window.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </ParallaxMedia>
      </section>

      <section className="bg-cream px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2 sm:gap-16">
          <Reveal>
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
              {t("hero_kicker")}
            </span>
            <h2 className="mt-4 max-w-md font-sans text-[clamp(1.75rem,3.2vw,2.8rem)] font-normal uppercase leading-[0.95] tracking-[0.01em] text-foreground">
              {t("heading")}
            </h2>
            <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-foreground/75 sm:text-base">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
              <p>{t("p4")}</p>
            </div>
          </Reveal>

          <Reveal delay={150} className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
            <Image
              src="/images/mirrors-lounge.jpg"
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="relative flex h-screen min-h-[560px] items-center overflow-hidden bg-maroon-dark">
        <ParallaxMedia className="absolute inset-0 h-full w-full">
          <Image
            src="/images/beef-skewer-salad.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </ParallaxMedia>
        <div className="absolute inset-0 bg-black/45" />

        <Reveal className="relative mx-auto max-w-3xl px-6 text-center text-cream">
          <p className="font-sans text-[clamp(1.5rem,3.5vw,2.75rem)] font-normal uppercase leading-[1.15] tracking-[0.01em]">
            {t("p5")}
          </p>
        </Reveal>
      </section>

      <section className="relative flex h-screen min-h-[560px] items-center justify-center overflow-hidden bg-maroon-dark">
        <Image
          src="/images/dessert-berries.jpg"
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
