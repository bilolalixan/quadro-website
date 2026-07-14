type EventFormValues = {
  titleRu: string;
  titleUz: string;
  titleEn: string;
  descriptionRu: string | null;
  descriptionUz: string | null;
  descriptionEn: string | null;
  date: Date | null;
  order: number;
  imageUrl: string | null;
};

export function AdminEventForm({
  action,
  initial,
}: {
  action: (formData: FormData) => void;
  initial?: EventFormValues;
}) {
  const inputClass =
    "w-full rounded-sm border border-maroon/20 bg-cream px-3 py-2.5 text-sm outline-none transition-colors focus:border-maroon";
  const dateValue = initial?.date
    ? initial.date.toISOString().slice(0, 10)
    : "";

  return (
    <form action={action} className="mt-8 flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Название (RU)
          </label>
          <input
            name="titleRu"
            required
            defaultValue={initial?.titleRu}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Название (UZ)
          </label>
          <input
            name="titleUz"
            required
            defaultValue={initial?.titleUz}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Название (EN)
          </label>
          <input
            name="titleEn"
            required
            defaultValue={initial?.titleEn}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Описание (RU)
          </label>
          <textarea
            name="descriptionRu"
            rows={3}
            defaultValue={initial?.descriptionRu ?? ""}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Описание (UZ)
          </label>
          <textarea
            name="descriptionUz"
            rows={3}
            defaultValue={initial?.descriptionUz ?? ""}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Описание (EN)
          </label>
          <textarea
            name="descriptionEn"
            rows={3}
            defaultValue={initial?.descriptionEn ?? ""}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Дата (необязательно)
          </label>
          <input
            type="date"
            name="date"
            defaultValue={dateValue}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Порядок
          </label>
          <input
            type="number"
            name="order"
            defaultValue={initial?.order ?? 0}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Изображение
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className={`mt-1.5 ${inputClass} file:mr-3 file:rounded-sm file:border-0 file:bg-maroon/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:text-maroon`}
          />
          {initial?.imageUrl && (
            <p className="mt-1 text-xs text-foreground/50">
              Текущее: {initial.imageUrl}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex w-fit items-center gap-3 border-b border-maroon pb-1 text-xs font-semibold uppercase tracking-widest text-maroon transition-opacity hover:opacity-70"
      >
        Сохранить
      </button>
    </form>
  );
}
