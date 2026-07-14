import { redirect, notFound } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { updateEventAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin-nav";
import { AdminEventForm } from "@/components/admin-event-form";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <AdminNav active="/admin/events" />

      <h1 className="mt-8 font-sans text-xl font-normal uppercase tracking-[0.02em] text-foreground">
        Изменить событие
      </h1>

      <AdminEventForm
        action={updateEventAction.bind(null, event.id)}
        initial={event}
      />
    </div>
  );
}
