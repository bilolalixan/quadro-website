import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

const NAV_ITEMS = [
  { href: "/admin/bookings", label: "Брони" },
  { href: "/admin/events", label: "События" },
  { href: "/admin/gallery", label: "Галерея" },
  { href: "/admin/event-inquiries", label: "Заявки на мероприятия" },
] as const;

export function AdminNav({ active }: { active: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-maroon/10 pb-6">
      <nav className="flex flex-wrap gap-x-6 gap-y-2">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-xs font-medium uppercase tracking-widest transition-colors ${
              active === item.href
                ? "text-maroon"
                : "text-foreground/60 hover:text-maroon"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <form action={logoutAction}>
        <button
          type="submit"
          className="text-xs font-medium uppercase tracking-widest text-foreground/60 hover:text-maroon"
        >
          Выйти
        </button>
      </form>
    </div>
  );
}
