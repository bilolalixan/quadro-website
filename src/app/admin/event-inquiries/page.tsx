import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { deleteEventInquiryAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin-nav";

export default async function AdminEventInquiriesPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const inquiries = await prisma.eventInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <AdminNav active="/admin/event-inquiries" />

      <h1 className="mt-8 font-sans text-xl font-normal uppercase tracking-[0.02em] text-foreground">
        Заявки на мероприятия
      </h1>

      {inquiries.length === 0 ? (
        <p className="mt-10 text-sm text-foreground/60">Пока нет заявок</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-sm border border-maroon/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-cream-soft text-xs font-medium uppercase tracking-wide text-foreground/50">
              <tr>
                <th className="px-4 py-3">Имя</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Телефон</th>
                <th className="px-4 py-3">Описание</th>
                <th className="px-4 py-3">Дата заявки</th>
                <th className="px-4 py-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-t border-maroon/10">
                  <td className="px-4 py-3 font-medium">{inquiry.name}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-maroon hover:underline"
                    >
                      {inquiry.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="text-maroon hover:underline"
                    >
                      {inquiry.phone}
                    </a>
                  </td>
                  <td className="max-w-[240px] truncate px-4 py-3 text-foreground/70">
                    {inquiry.description || "—"}
                  </td>
                  <td className="px-4 py-3 text-foreground/70">
                    {inquiry.createdAt.toLocaleDateString("ru-RU")}
                  </td>
                  <td className="px-4 py-3">
                    <form
                      action={deleteEventInquiryAction.bind(null, inquiry.id)}
                    >
                      <button
                        type="submit"
                        className="text-xs font-semibold uppercase tracking-wide text-foreground/50 hover:text-red-700"
                      >
                        Удалить
                      </button>
                    </form>
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
