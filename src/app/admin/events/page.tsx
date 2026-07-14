import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { deleteEventAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin-nav";

export default async function AdminEventsPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const events = await prisma.event.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <AdminNav active="/admin/events" />

      <div className="mt-8 flex items-center justify-between">
        <h1 className="font-sans text-xl font-normal uppercase tracking-[0.02em] text-foreground">
          События
        </h1>
        <Link
          href="/admin/events/new"
          className="text-xs font-medium uppercase tracking-widest text-maroon hover:opacity-70"
        >
          + Добавить событие
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="mt-10 text-sm text-foreground/60">Пока нет событий</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-sm border border-maroon/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-cream-soft text-xs font-medium uppercase tracking-wide text-foreground/50">
              <tr>
                <th className="px-4 py-3">Порядок</th>
                <th className="px-4 py-3">Название (RU)</th>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-t border-maroon/10">
                  <td className="px-4 py-3 text-foreground/70">
                    {event.order}
                  </td>
                  <td className="px-4 py-3 font-medium">{event.titleRu}</td>
                  <td className="px-4 py-3 text-foreground/70">
                    {event.date
                      ? event.date.toLocaleDateString("ru-RU")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-4">
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="text-xs font-semibold uppercase tracking-wide text-maroon hover:opacity-70"
                      >
                        Изменить
                      </Link>
                      <form action={deleteEventAction.bind(null, event.id)}>
                        <button
                          type="submit"
                          className="text-xs font-semibold uppercase tracking-wide text-foreground/50 hover:text-red-700"
                        >
                          Удалить
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
