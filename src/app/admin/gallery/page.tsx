import { redirect } from "next/navigation";
import Image from "next/image";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import {
  createGalleryImageAction,
  deleteGalleryImageAction,
} from "@/app/admin/actions";
import { AdminNav } from "@/components/admin-nav";

const CATEGORY_LABELS: Record<string, string> = {
  interer: "Интерьер",
  blyuda: "Блюда",
  bar: "Бар",
};

export default async function AdminGalleryPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const images = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
  });

  const inputClass =
    "w-full rounded-sm border border-maroon/20 bg-cream px-3 py-2.5 text-sm outline-none transition-colors focus:border-maroon";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <AdminNav active="/admin/gallery" />

      <h1 className="mt-8 font-sans text-xl font-normal uppercase tracking-[0.02em] text-foreground">
        Галерея
      </h1>

      <form
        action={createGalleryImageAction}
        className="mt-8 flex flex-wrap items-end gap-4 rounded-sm border border-maroon/10 bg-cream-soft p-6"
      >
        <div className="flex-1 basis-48">
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Изображение
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className={`mt-1.5 ${inputClass} file:mr-3 file:rounded-sm file:border-0 file:bg-maroon/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:text-maroon`}
          />
        </div>
        <div className="w-40">
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Категория
          </label>
          <select name="category" className={`mt-1.5 ${inputClass}`}>
            <option value="interer">Интерьер</option>
            <option value="blyuda">Блюда</option>
            <option value="bar">Бар</option>
          </select>
        </div>
        <div className="w-24">
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Порядок
          </label>
          <input
            type="number"
            name="order"
            defaultValue={images.length}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-3 border-b border-maroon pb-1 text-xs font-semibold uppercase tracking-widest text-maroon transition-opacity hover:opacity-70"
        >
          Добавить
        </button>
      </form>

      {images.length === 0 ? (
        <p className="mt-10 text-sm text-foreground/60">
          Пока нет изображений
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          {images.map((image) => (
            <div key={image.id} className="group relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={image.imageUrl}
                  alt=""
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-foreground/50">
                  {CATEGORY_LABELS[image.category] ?? image.category}
                </span>
                <form
                  action={deleteGalleryImageAction.bind(null, image.id)}
                >
                  <button
                    type="submit"
                    className="text-xs font-semibold uppercase tracking-wide text-foreground/50 hover:text-red-700"
                  >
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
