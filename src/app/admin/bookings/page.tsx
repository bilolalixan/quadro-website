import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import {
  updateBookingStatusAction,
  deleteBookingAction,
} from "@/app/admin/actions";
import { AdminNav } from "@/components/admin-nav";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Ожидает",
  CONFIRMED: "Подтверждено",
  CANCELLED: "Отменено",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default async function AdminBookingsPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    redirect("/admin/login");
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <AdminNav active="/admin/bookings" />

      <h1 className="mt-8 font-sans text-xl font-normal uppercase tracking-[0.02em] text-foreground">
        Бронирования
      </h1>

      {bookings.length === 0 ? (
        <p className="mt-10 text-sm text-foreground/60">
          Пока нет бронирований
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-sm border border-maroon/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-cream-soft text-xs font-medium uppercase tracking-wide text-foreground/50">
              <tr>
                <th className="px-4 py-3">Имя</th>
                <th className="px-4 py-3">Телефон</th>
                <th className="px-4 py-3">Дата / время</th>
                <th className="px-4 py-3">Гостей</th>
                <th className="px-4 py-3">Комментарий</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-maroon/10">
                  <td className="px-4 py-3 font-medium">{booking.name}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`tel:${booking.phone}`}
                      className="text-maroon hover:underline"
                    >
                      {booking.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    {booking.date.toLocaleDateString("ru-RU")} · {booking.time}
                  </td>
                  <td className="px-4 py-3">{booking.partySize}</td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-foreground/70">
                    {booking.comment || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[booking.status]}`}
                    >
                      {STATUS_LABELS[booking.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <form
                        action={updateBookingStatusAction.bind(
                          null,
                          booking.id,
                          "CONFIRMED",
                        )}
                      >
                        <button
                          type="submit"
                          className="rounded-full bg-green-600/10 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-600/20"
                        >
                          Подтвердить
                        </button>
                      </form>
                      <form
                        action={updateBookingStatusAction.bind(
                          null,
                          booking.id,
                          "CANCELLED",
                        )}
                      >
                        <button
                          type="submit"
                          className="rounded-full bg-red-600/10 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-600/20"
                        >
                          Отменить
                        </button>
                      </form>
                      <form action={deleteBookingAction.bind(null, booking.id)}>
                        <button
                          type="submit"
                          className="rounded-full px-3 py-1.5 text-xs font-semibold text-foreground/50 hover:text-maroon"
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
