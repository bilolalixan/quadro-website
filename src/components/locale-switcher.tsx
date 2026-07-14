"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";

const LABELS: Record<string, string> = {
  ru: "Рус",
  uz: "O'zb",
  en: "Eng",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center divide-x divide-maroon/20 rounded-[3px] border border-maroon/25">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(() => {
              router.replace(pathname, { locale: loc });
            })
          }
          className={`px-3 py-2 text-[10px] font-medium uppercase tracking-wider transition-colors ${
            loc === locale
              ? "text-maroon"
              : "text-foreground/50 hover:text-maroon"
          }`}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
