import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return { title: t("title") };
}

export default async function GalleryPage() {
  const t = await getTranslations("gallery");
  const images = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
  });
  const heroLines = t("hero_heading").split("\n");

  return (
    <div>
      <section className="relative -mt-20 flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden bg-maroon-dark">
        <Image
          src="/images/dining-shelves.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

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

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <GalleryGrid images={images} />
      </section>
    </div>
  );
}
