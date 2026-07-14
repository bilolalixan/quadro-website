import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createEventAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin-nav";
import { AdminEventForm } from "@/components/admin-event-form";

export default async function NewEventPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <AdminNav active="/admin/events" />

      <h1 className="mt-8 font-sans text-xl font-normal uppercase tracking-[0.02em] text-foreground">
        Новое событие
      </h1>

      <AdminEventForm action={createEventAction} />
    </div>
  );
}
